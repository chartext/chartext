import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph } from 'canvaskit-wasm';
import { Axis } from '@/axis/Axis';
import { XAxisProps } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

export class XAxis extends Axis {
  constructor(
    axisProps: XAxisProps,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<CoordType>,
    paintRepository: CkPaintRepository,
  ) {
    const { labelColor, labelFontSize } = axisProps;

    const labelParagraph = ckGraphics.createParagraph({
      text: coordLayout.label,
      fontSize: labelFontSize,
      color: labelColor,
      textAlign: ckGraphics.CK.TextAlign.Center,
    });

    super(
      axisProps,
      ckGraphics,
      coordLayout,
      labelParagraph,
      paintRepository,
      ckGraphics.CK.TextAlign.Center,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    seriesSurfaceRect: RectLayout,
  ): void {
    CkGraphics.drawParagraph({
      canvas,
      paragraph: this.labelParagraph,
      width: seriesSurfaceRect.right - seriesSurfaceRect.left,
      x: seriesSurfaceRect.left,
      y: seriesSurfaceRect.bottom + this.tickFontSize + 25,
    });
  }

  protected override drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    paragraph: Paragraph,
    value: CoordType,
    spacing: number,
  ) {
    const x = this.coordLayout.getScreenCoord(value, seriesSurfaceRect);
    const y1 = seriesSurfaceRect.bottom + 7;

    canvas.drawLine(x, seriesSurfaceRect.top, x, y1, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph,
      width: spacing,
      x: x - Math.round(spacing / 2),
      y: y1 + 5,
    });
  }
}
