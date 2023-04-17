import { CkGraphics } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Rect } from '@/Chart.types';
import { AxisProps } from '@/axis/Axis.types';
import { CoordDisplay } from '@/display/CoordDisplay';
import { CoordType } from '@/series/Series.types';

export default class Axis {
  private readonly tickParagraphs: [number, Paragraph][];

  private readonly tickColorName: string;

  private readonly zeroTickColorName: string;

  constructor(
    readonly props: AxisProps,
    readonly coordDisplay: CoordDisplay<CoordType>,
    ckGraphics: CkGraphics,
  ) {
    const { min, max, spacing } = coordDisplay;
    const { fontSize = 12, position, theme } = props;

    if (!theme) {
      throw new Error('Axis theme is not present');
    }

    const { tickColor, zeroTickColor } = theme;

    this.tickColorName = `${tickColor}-Stroke`;
    this.zeroTickColorName = `${zeroTickColor}-Stroke`;

    const {
      CK: {
        TextAlign: { Left, Right, Center },
      },
    } = ckGraphics;

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

    this.tickParagraphs = [];

    for (let value = min; value <= max; value += spacing) {
      const color = value === 0 ? zeroTickColor : tickColor;

      const tickParagraph = ckGraphics.createParagraph({
        text: `${value}`,
        fontSize,
        color,
        textAlign,
      });

      this.tickParagraphs.push([value, tickParagraph]);
    }
  }

  draw(canvas: Canvas, plotRect: Rect<number>, paints: Map<string, Paint>) {
    const { coordDisplay, tickParagraphs, props } = this;

    const { fontSize = 12, position } = props;

    const tickPaint = paints.get(this.tickColorName);
    const zeroTickPaint = paints.get(this.zeroTickColorName);

    if (tickPaint && zeroTickPaint) {
      tickParagraphs.forEach(([value, tickParagraph]) => {
        const paint: Paint = value === 0 ? zeroTickPaint : tickPaint;

        switch (position) {
          case 'left':
            {
              const y = coordDisplay.valueToViewCoord(value, plotRect);
              const x0 = plotRect.left - 7;

              canvas.drawLine(x0, y, plotRect.right, y, paint);

              CkGraphics.drawParagraph({
                canvas,
                paragraph: tickParagraph,
                width: x0 - 5,
                x: 0,
                y: y - Math.round(fontSize / 2),
              });
            }
            break;
          case 'bottom':
            {
              const x = coordDisplay.valueToViewCoord(value, plotRect);
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
            throw new Error('AxisPosition is not implemented', { cause: position });
          default:
            throw new Error('Invalid position', { cause: position });
        }
      });
    }
  }

  delete() {
    const { tickParagraphs } = this;
    const tps: Paragraph[] = tickParagraphs.map(([, p]) => p);
    CkGraphics.delete(...tps);
  }
}
