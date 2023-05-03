import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { XAxisProps, YAxisProps } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

export abstract class Axis {
  protected readonly fontSize: number;
  readonly #tickPaint: Paint;
  readonly #tickParagraphs: [value: CoordType, p: Paragraph][];
  readonly #zeroTickPaint: Paint;

  #isDeleted = false;

  constructor(
    axisProps: XAxisProps | YAxisProps,
    ckGraphics: CkGraphics,
    protected readonly coordLayout: CoordLayout<CoordType>,
    paintRepository: CkPaintRepository,
    textAlign: TextAlign,
  ) {
    const { fontSize, tickColor, zeroTickColor } = axisProps;
    const { ticks } = coordLayout;

    this.#tickPaint = paintRepository.getPaintSet(tickColor).stroke;
    this.#zeroTickPaint = paintRepository.getPaintSet(zeroTickColor).stroke;
    this.fontSize = fontSize;

    this.#tickParagraphs = [];

    ticks.forEach((tick) => {
      const color = tick === 0 ? zeroTickColor : tickColor;

      const tickParagraph = ckGraphics.createParagraph({
        text: `${tick}`,
        fontSize,
        color,
        textAlign,
      });

      this.#tickParagraphs.push([tick, tickParagraph]);
    });
  }

  protected abstract drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    tickParagraph: Paragraph,
    value: CoordType,
  ): void;

  draw(canvas: Canvas, seriesSurfaceRect: RectLayout) {
    if (this.#isDeleted) return;

    this.#tickParagraphs.forEach(([value, tickParagraph]) => {
      const paint: Paint = value === 0 ? this.#zeroTickPaint : this.#tickPaint;

      this.drawTick(canvas, paint, seriesSurfaceRect, tickParagraph, value);
    });
  }

  get isDeleted(): boolean {
    return this.#isDeleted;
  }

  delete(): void {
    this.#isDeleted = true;
    this.#tickParagraphs.forEach(([, p]) => CkGraphics.delete(p));
  }
}
