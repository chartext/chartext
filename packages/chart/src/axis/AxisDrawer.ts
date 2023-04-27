import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Rect } from '@/ChartLayout.types';
import { AxisPosition, AxisTheme } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordDisplay } from '@/coord/CoordDisplay';

type AxisDrawProps = {
  canvas: Canvas;
  plotRect: Rect<number>;
  tickParagraph: Paragraph;
  paint: Paint;
  value: CoordType;
};

type AxisSurfaceRendererProps = {
  ckGraphics: CkGraphics;
  coordDisplay: CoordDisplay<CoordType>;
  paintRepository: CkPaintRepository;
  position: AxisPosition;
  theme: AxisTheme;
};

export class AxisDrawer {
  readonly #coordDisplay: CoordDisplay<CoordType>;
  readonly #fontSize: number;
  readonly #position: AxisPosition;
  readonly #tickPaint: Paint;
  readonly #tickParagraphs: [number, Paragraph][];
  readonly #zeroTickPaint: Paint;

  #isDeleted = false;

  constructor(props: AxisSurfaceRendererProps) {
    const {
      position,
      paintRepository,
      ckGraphics,
      coordDisplay,
      theme: { fontSize, tickColor, zeroTickColor },
    } = props;

    const {
      CK: {
        TextAlign: { Left, Right, Center },
      },
    } = ckGraphics;

    const { min, max, spacing } = coordDisplay;

    this.#tickPaint = paintRepository.getPaintSet(tickColor).stroke;
    this.#zeroTickPaint = paintRepository.getPaintSet(zeroTickColor).stroke;
    this.#position = position;
    this.#coordDisplay = coordDisplay;
    this.#fontSize = fontSize;

    const textAlign: TextAlign = (() => {
      switch (position) {
        case 'top':
        case 'bottom':
          return Center;
        case 'right':
          return Left;
        case 'left':
          return Right;
        default:
          throw new Error('Invalid position', { cause: position });
      }
    })();

    this.#tickParagraphs = [];

    for (let value = min; value <= max; value += spacing) {
      const color = value === 0 ? zeroTickColor : tickColor;

      const tickParagraph = ckGraphics.createParagraph({
        text: `${value}`,
        fontSize,
        color,
        textAlign,
      });

      this.#tickParagraphs.push([value, tickParagraph]);
    }
  }

  private drawLeft(props: AxisDrawProps) {
    const { canvas, paint, plotRect, tickParagraph, value } = props;

    const y = this.#coordDisplay.valueToViewCoord(value, plotRect);
    const x0 = plotRect.left - 7;

    canvas.drawLine(x0, y, plotRect.right, y, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: x0 - 5,
      x: 0,
      y: y - Math.round(this.#fontSize / 2),
    });
  }

  private drawBottom(props: AxisDrawProps) {
    const { canvas, paint, plotRect, tickParagraph, value } = props;

    const x = this.#coordDisplay.valueToViewCoord(value, plotRect);
    const y1 = plotRect.bottom + 7;

    canvas.drawLine(x, plotRect.top, x, y1, paint);

    // @todo width is a hack. need to find the paragraph width

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: 30,
      x: x - 15,
      y: y1 + 5,
    });
  }

  draw(canvas: Canvas, plotRect: Rect<number>) {
    if (this.#isDeleted) return;

    this.#tickParagraphs.forEach(([value, tickParagraph]) => {
      const paint: Paint = value === 0 ? this.#zeroTickPaint : this.#tickPaint;

      const axisDrawProps: AxisDrawProps = {
        canvas,
        paint,
        plotRect,
        tickParagraph,
        value,
      };

      switch (this.#position) {
        case 'left':
          this.drawLeft(axisDrawProps);
          break;
        case 'bottom':
          this.drawBottom(axisDrawProps);
          break;
        case 'top':
        case 'right':
          throw new Error('AxisPosition is not implemented', { cause: this.#position });
      }
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
