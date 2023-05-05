import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { XAxisProps, YAxisProps } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

type TickParagraph<C extends CoordType> = {
  value: C;
  paragraph: Paragraph;
};

export abstract class Axis<C extends CoordType> {
  protected readonly labelFontSize: number;
  protected readonly tickFontSize: number;
  readonly #tickPaint: Paint;
  readonly #tickParagraphs: TickParagraph<C>[];
  readonly #zeroTickPaint: Paint;

  #isDeleted = false;

  protected constructor(
    protected readonly ckGraphics: CkGraphics,
    protected readonly coordLayout: CoordLayout<C>,
    protected readonly labelParagraph: Paragraph | null,
    axisProps: XAxisProps | YAxisProps,
    paintRepository: CkPaintRepository,
    textAlign: TextAlign,
  ) {
    const {
      labelFontSize,
      tickFontSize,
      tickLabelColor,
      tickColor,
      tickZeroColor,
    } = axisProps;

    const { ticks, formatter } = coordLayout;

    this.labelFontSize = labelFontSize;
    this.tickFontSize = tickFontSize;

    this.#tickPaint = paintRepository.getPaintSet(tickColor).stroke;
    this.#zeroTickPaint = paintRepository.getPaintSet(tickZeroColor).stroke;

    this.#tickParagraphs = [];

    ticks.forEach((value) => {
      const paragraph = ckGraphics.createParagraph({
        text: formatter.format(value),
        fontSize: tickFontSize,
        color: tickLabelColor,
        textAlign,
      });

      this.#tickParagraphs.push({
        value,
        paragraph,
      });
    });
  }

  protected abstract drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    tickParagraph: Paragraph,
    value: C,
    spacing: number,
  ): void;

  protected abstract drawLabel(
    canvas: Canvas,
    seriesSurfaceRect: RectLayout,
  ): void;

  draw(canvas: Canvas, seriesSurfaceRect: RectLayout) {
    if (this.#isDeleted) return;

    const firstTickParagraph = this.#tickParagraphs[0];
    const secondTickParagraph = this.#tickParagraphs[1];

    if (!firstTickParagraph || !secondTickParagraph) return;

    const firstTickCoord = this.coordLayout.getScreenCoord(
      firstTickParagraph.value,
      seriesSurfaceRect,
    );

    const secondTickCoord = this.coordLayout.getScreenCoord(
      secondTickParagraph.value,
      seriesSurfaceRect,
    );

    const tickSpacing = secondTickCoord - firstTickCoord;

    this.drawLabel(canvas, seriesSurfaceRect);

    this.#tickParagraphs.forEach(({ value, paragraph }) => {
      const paint: Paint = value === 0 ? this.#zeroTickPaint : this.#tickPaint;

      this.drawTick(
        canvas,
        paint,
        seriesSurfaceRect,
        paragraph,
        value,
        tickSpacing,
      );
    });
  }

  get isDeleted(): boolean {
    return this.#isDeleted;
  }

  delete(): void {
    this.#isDeleted = true;
    this.#tickParagraphs.forEach(({ paragraph }) =>
      CkGraphics.delete(paragraph),
    );
    CkGraphics.delete(this.labelParagraph);
  }
}
