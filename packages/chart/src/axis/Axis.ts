import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { AxisTickLayout, XAxisConfig, YAxisConfig } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { Margin, RectLayout } from '@/layout/ChartLayout.types';

type TickParagraph = {
  value: number;
  paragraph: Paragraph;
};

export abstract class Axis<C extends CoordType> {
  protected readonly labelFontSize: number;
  protected readonly tickFontSize: number;
  readonly #tickPaint: Paint;
  readonly #tickParagraphs: TickParagraph[];
  readonly #zeroTickPaint: Paint;

  #isDeleted = false;

  protected constructor(
    protected readonly axisTickLayout: AxisTickLayout<C>,
    protected readonly chartMargin: Margin,
    protected readonly ckGraphics: CkGraphics,
    protected readonly coordLayout: CoordLayout<C>,
    protected readonly labelParagraph: Paragraph | null,
    axisConfig: XAxisConfig | YAxisConfig,
    paintRepository: CkPaintRepository,
    textAlign: TextAlign,
  ) {
    const {
      labelFontSize,
      tickFontSize,
      tickLabelColor,
      tickColor,
      tickZeroColor,
    } = axisConfig;

    const { ticks } = axisTickLayout;

    this.labelFontSize = labelFontSize;
    this.tickFontSize = tickFontSize;

    this.#tickPaint = paintRepository.getPaintSet(tickColor).stroke;
    this.#zeroTickPaint = paintRepository.getPaintSet(tickZeroColor).stroke;

    this.#tickParagraphs = [];

    ticks.forEach(({ plotValue, display }) => {
      const paragraph = ckGraphics.createParagraph({
        text: display,
        fontSize: tickFontSize,
        color: tickLabelColor,
        textAlign,
      });

      this.#tickParagraphs.push({
        value: plotValue,
        paragraph,
      });
    });
  }

  protected abstract drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    tickParagraph: Paragraph,
    value: number,
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

    const firstTickCoord = this.coordLayout.getSurfaceCoord(
      firstTickParagraph.value,
      seriesSurfaceRect,
    );

    const secondTickCoord = this.coordLayout.getSurfaceCoord(
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
