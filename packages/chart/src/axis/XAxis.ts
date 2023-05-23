import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph } from 'canvaskit-wasm';
import { Axis } from '@chartext/chart/axis/Axis';
import { AxisConfig, AxisTickLayout } from '@chartext/chart/axis/Axis.types';
import { CoordType } from '@chartext/chart/coord/Coord.types';
import { CoordLayout } from '@chartext/chart/coord/CoordLayout';
import { Margin, RectLayout } from '@chartext/chart/layout/ChartLayout.types';
import { AxisStyle } from '@chartext/chart/theme/ChartTheme.types';

export class XAxis<X extends CoordType> extends Axis<X> {
  constructor(
    axisConfig: AxisConfig,
    axisStyle: AxisStyle,
    axisTickLayout: AxisTickLayout<X>,
    chartMargin: Margin,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<X>,
    paintRepository: CkPaintRepository,
  ) {
    const { label = 'X-Axis' } = axisConfig;

    super(
      axisTickLayout,
      chartMargin,
      ckGraphics,
      coordLayout,
      label,
      axisStyle,
      paintRepository,
      ckGraphics.TextAlign.Center,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    labelParagraph: Paragraph,
    seriesSurfaceRect: RectLayout,
  ): void {
    const {
      labelStyle: { fontSize },
    } = this.style;

    CkGraphics.drawParagraph({
      canvas,
      paragraph: labelParagraph,
      width: seriesSurfaceRect.width,
      x: seriesSurfaceRect.x0,
      y: seriesSurfaceRect.y1 + fontSize + this.chartMargin.bottom,
    });
  }

  protected override drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    tickParagraph: Paragraph,
    value: number,
    spacing: number,
  ) {
    const x = this.coordLayout.getSurfaceCoord(value, seriesSurfaceRect);
    const y1 = seriesSurfaceRect.y1 + 7;

    canvas.drawLine(x, seriesSurfaceRect.y0, x, y1, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: spacing,
      x: x - Math.round(spacing / 2),
      y: y1 + 5,
    });
  }
}
