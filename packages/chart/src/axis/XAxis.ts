import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph } from 'canvaskit-wasm';
import { Axis } from '@/axis/Axis';
import { AxisTickLayout, XAxisConfig } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { Margin, RectLayout } from '@/layout/ChartLayout.types';

export class XAxis<X extends CoordType> extends Axis<X> {
  constructor(
    axisConfig: XAxisConfig,
    axisTickLayout: AxisTickLayout<X>,
    chartMargin: Margin,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<X>,
    paintRepository: CkPaintRepository,
  ) {
    const { labelColor, labelFontSize } = axisConfig;

    const labelParagraph = axisConfig.label
      ? ckGraphics.createParagraph({
          text: axisConfig.label,
          fontSize: labelFontSize,
          color: labelColor,
          textAlign: ckGraphics.TextAlign.Center,
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
      ckGraphics.TextAlign.Center,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    seriesSurfaceRect: RectLayout,
  ): void {
    if (this.labelParagraph) {
      CkGraphics.drawParagraph({
        canvas,
        paragraph: this.labelParagraph,
        width: seriesSurfaceRect.width,
        x: seriesSurfaceRect.x0,
        y: seriesSurfaceRect.y1 + this.tickFontSize + this.chartMargin.bottom,
      });
    }
  }

  protected override drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    paragraph: Paragraph,
    value: number,
    spacing: number,
  ) {
    const x = this.coordLayout.getSurfaceCoord(value, seriesSurfaceRect);
    const y1 = seriesSurfaceRect.y1 + 7;

    canvas.drawLine(x, seriesSurfaceRect.y0, x, y1, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph,
      width: spacing,
      x: x - Math.round(spacing / 2),
      y: y1 + 5,
    });
  }
}
