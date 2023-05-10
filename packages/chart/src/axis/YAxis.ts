import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Axis } from '@/axis/Axis';
import { AxisTickLayout, YAxisConfig } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { Margin, RectLayout } from '@/layout/ChartLayout.types';

export class YAxis<Y extends CoordType> extends Axis<Y> {
  constructor(
    axisConfig: YAxisConfig,
    axisTickLayout: AxisTickLayout<Y>,
    chartMargin: Margin,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<Y>,
    paintRepository: CkPaintRepository,
  ) {
    const { labelColor, labelFontSize } = axisConfig;

    const textAlign: TextAlign =
      axisConfig.position === 'left'
        ? ckGraphics.CK.TextAlign.Right
        : ckGraphics.CK.TextAlign.Left;

    const labelParagraph = axisConfig.label
      ? ckGraphics.createParagraph({
          text: axisConfig.label,
          fontSize: labelFontSize,
          color: labelColor,
          textAlign: ckGraphics.CK.TextAlign.Center,
        })
      : null;

    super(
      axisTickLayout,
      chartMargin,
      ckGraphics,
      coordLayout,
      labelParagraph,
      axisConfig,
      paintRepository,
      textAlign,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    seriesSurfaceLayout: RectLayout,
  ): void {
    if (!this.labelParagraph) return;

    const { y0, height, width } = seriesSurfaceLayout;
    const { left } = this.chartMargin;

    canvas.save();
    canvas.translate(0, Math.round(height / 2));
    canvas.rotate(-90, 0, 0);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: this.labelParagraph,
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

    canvas.drawLine(x0 - 7, y, x1, y, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: x0 - 5,
      x: 0,
      y: y - Math.round(this.tickFontSize / 2),
    });
  }
}
