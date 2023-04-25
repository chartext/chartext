import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { ChartSurfaceRenderer, Rect } from '@/Chart.types';
import { AxisPosition } from '@/axis/Axis.types';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { AxisTheme } from '@/theme/ChartTheme.types';
import { CoordType } from '@/coord/Coord.types';

type AxisSurfaceRendererProps = {
  ckGraphics: CkGraphics;
  coordDisplay: CoordDisplay<CoordType>;
  fontSize: number;
  paintRepository: CkPaintRepository;
  position: AxisPosition;
  theme: AxisTheme;
};
export class Axis implements ChartSurfaceRenderer {
  readonly #coordDisplay: CoordDisplay<CoordType>;
  readonly #fontSize: number;
  readonly #position: AxisPosition;
  readonly #tickPaint: Paint;
  readonly #tickParagraphs: [number, Paragraph][];
  readonly #zeroTickPaint: Paint;

  #isDeleted = false;

  constructor(props: AxisSurfaceRendererProps) {
    const {
      fontSize,
      position,
      paintRepository,
      ckGraphics,
      coordDisplay,
      theme: { tickColor, zeroTickColor },
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

  draw(canvas: Canvas, plotRect: Rect<number>) {
    if (this.isDeleted) return;

    this.#tickParagraphs.forEach(([value, tickParagraph]) => {
      const paint: Paint = value === 0 ? this.#zeroTickPaint : this.#tickPaint;

      switch (this.#position) {
        case 'left':
          {
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
          break;
        case 'bottom':
          {
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
          break;
        case 'top':
        case 'right':
          throw new Error('AxisPosition is not implemented', { cause: this.#position });
        default:
          throw new Error('Invalid position', { cause: this.#position });
      }
    });
  }

  public get isDeleted() {
    return this.#isDeleted;
  }

  delete() {
    this.#isDeleted = true;
    this.#tickParagraphs.forEach(([, p]) => CkGraphics.delete(p));
  }
}
