import { CkGraphics } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Rect } from '@/Chart.types';
import { AxisProps } from '@/axis/Axis.types';
import { CoordDisplay } from '@/display/CoordDisplay';
import { CoordType } from '@/series/Series.types';
import { AxisTheme } from '@/theme/ChartTheme.types';

export default class Axis {
  private readonly tickParagraphs: [number, Paragraph][];

  private readonly theme: AxisTheme;

  private readonly tickPaint: Paint;

  private readonly zeroTickPaint: Paint;

  constructor(
    readonly props: AxisProps,
    private readonly paints: Map<string, Paint>,
    readonly coordDisplay: CoordDisplay<CoordType>,
    ckGraphics: CkGraphics,
  ) {
    const { min, max, spacing } = coordDisplay;
    const { fontSize = 12, position, theme } = props;

    if (!theme) {
      throw new Error('Axis theme is not present');
    }

    this.theme = theme;

    const { tickColor, zeroTickColor } = theme;

    const tickColorName = `${tickColor}-Stroke`;
    const tickPaint = paints.get(tickColorName);

    if (!tickPaint) {
      throw new Error(`Invalid tickColorName: ${tickColorName}`);
    }

    this.tickPaint = tickPaint;

    const zeroTickColorName = `${zeroTickColor}-Stroke`;
    const zeroTickPaint = paints.get(tickColorName);

    if (!zeroTickPaint) {
      throw new Error(`Invalid zeroTickColorName: ${zeroTickColorName}`);
    }

    this.zeroTickPaint = zeroTickPaint;

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

  draw(canvas: Canvas, plotRect: Rect<number>) {
    const { coordDisplay, tickParagraphs, props, tickPaint, zeroTickPaint } = this;

    const { fontSize = 12, position } = props;

    tickParagraphs.forEach(([value, tickParagraph]) => {
      const paint: Paint = value === 0 ? zeroTickPaint : tickPaint;

      switch (position) {
        case 'left':
          {
            const y = coordDisplay.toViewCoord(value, plotRect);
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
            const x = coordDisplay.toViewCoord(value, plotRect);
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

  delete() {
    const { tickParagraphs } = this;
    const tps: Paragraph[] = tickParagraphs.map(([, p]) => p);
    CkGraphics.delete(...tps);
  }
}
