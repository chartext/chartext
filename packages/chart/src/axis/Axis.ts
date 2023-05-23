import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { AxisTickLayout } from '@chartext/chart/axis/Axis.types';
import { CoordType } from '@chartext/chart/coord/Coord.types';
import { CoordLayout } from '@chartext/chart/coord/CoordLayout';
import { Margin, RectLayout } from '@chartext/chart/layout/ChartLayout.types';
import { AxisStyle, LabelStyle } from '@chartext/chart/theme/ChartTheme.types';

type TickParagraph = {
  value: number;
  paragraph: Paragraph;
};

export abstract class Axis<C extends CoordType> {
  readonly #labelParagraph: Paragraph | null;
  readonly #tickPaint: Paint;
  readonly #tickParagraphs: TickParagraph[];
  readonly #zeroTickPaint: Paint;

  #isDeleted = false;

  protected constructor(
    protected readonly axisTickLayout: AxisTickLayout<C>,
    protected readonly chartMargin: Margin,
    protected readonly ckGraphics: CkGraphics,
    protected readonly coordLayout: CoordLayout<C>,
    protected readonly label: string | undefined,
    protected readonly style: AxisStyle,
    paintRepository: CkPaintRepository,
    tickTextAlign: TextAlign,
  ) {
    const { ticks } = axisTickLayout;

    const {
      labelStyle,
      tickStyle: { labelStyle: tickLabelStyle },
    } = style;

    this.#labelParagraph = label
      ? this.createParagraph(label, labelStyle)
      : null;

    this.#tickPaint = paintRepository.getPaintSet(style.tickStyle.color).stroke;
    this.#zeroTickPaint = paintRepository.getPaintSet(
      style.tickStyle.zeroColor,
    ).stroke;

    this.#tickParagraphs = [];

    ticks.forEach(({ plotValue, display }) => {
      const paragraph = this.createParagraph(
        display,
        tickLabelStyle,
        tickTextAlign,
      );

      this.#tickParagraphs.push({
        value: plotValue,
        paragraph,
      });
    });
  }

  private createParagraph(
    text: string,
    labelStyle: LabelStyle,
    textAlign?: TextAlign,
  ) {
    const { fontColor, fontSize } = labelStyle;

    return this.ckGraphics.createParagraph({
      style: {
        textAlign: textAlign ?? this.ckGraphics.TextAlign.Center,
        textStyle: {
          color: this.ckGraphics.color(fontColor),
          fontSize,
        },
      },
      text,
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
    labelParagraph: Paragraph,
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

    if (this.#labelParagraph) {
      this.drawLabel(canvas, this.#labelParagraph, seriesSurfaceRect);
    }

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
    this.#tickParagraphs.forEach(({ paragraph }) => paragraph.delete());
    this.#labelParagraph?.delete();
  }
}
