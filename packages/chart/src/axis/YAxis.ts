import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Axis } from '@chartext/chart/axis/Axis';
import { AxisTickLayout, YAxisConfig } from '@chartext/chart/axis/Axis.types';
import { CoordType } from '@chartext/chart/coord/Coord.types';
import { CoordLayout } from '@chartext/chart/coord/CoordLayout';
import { Margin, RectLayout } from '@chartext/chart/layout/ChartLayout.types';
import { AxisStyle } from '@chartext/chart/theme/ChartTheme.types';

export class YAxis<Y extends CoordType> extends Axis<Y> {
  constructor(
    axisConfig: YAxisConfig,
    axisStyle: AxisStyle,
    axisTickLayout: AxisTickLayout<Y>,
    chartMargin: Margin,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<Y>,
    paintRepository: CkPaintRepository,
  ) {
    const { label } = axisConfig;

    const tickTextAlign: TextAlign =
      axisConfig.position === 'left'
        ? ckGraphics.TextAlign.Right
        : ckGraphics.TextAlign.Left;

    super(
      axisTickLayout,
      chartMargin,
      ckGraphics,
      coordLayout,
      label,
      axisStyle,
      paintRepository,
      tickTextAlign,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    labelParagraph: Paragraph,
    seriesSurfaceLayout: RectLayout,
  ): void {
    const { y0, height, width } = seriesSurfaceLayout;
    const { left } = this.chartMargin;

    canvas.save();
    canvas.translate(0, Math.round(height / 2));
    canvas.rotate(-90, 0, 0);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: labelParagraph,
      width: width,
      x: -1 * Math.round(width / 2) - y0,
      y: left,
    });

    canvas.restore();
  }

  protected override drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceLayout: RectLayout,
    tickParagraph: Paragraph,
    value: number,
  ) {
    const { x0, x1 } = seriesSurfaceLayout;
    const y = this.coordLayout.getSurfaceCoord(value, seriesSurfaceLayout);
    const {
      tickStyle: {
        labelStyle: { fontSize },
      },
    } = this.style;

    canvas.drawLine(x0 - 7, y, x1, y, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: x0 - 5,
      x: 0,
      y: y - Math.round(fontSize / 2),
    });
  }
}
