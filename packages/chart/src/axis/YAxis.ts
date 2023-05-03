import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Axis } from '@/axis/Axis';
import { YAxisProps } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

export class YAxis extends Axis {
  constructor(
    axisProps: YAxisProps,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<CoordType>,
    paintRepository: CkPaintRepository,
  ) {
    const textAlign: TextAlign =
      axisProps.position === 'left'
        ? ckGraphics.CK.TextAlign.Right
        : ckGraphics.CK.TextAlign.Left;

    super(axisProps, ckGraphics, coordLayout, paintRepository, textAlign);
  }

  protected override drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    tickParagraph: Paragraph,
    value: CoordType,
  ) {
    const y = this.coordLayout.getScreenCoord(value, seriesSurfaceRect);
    const x0 = seriesSurfaceRect.left - 7;

    canvas.drawLine(x0, y, seriesSurfaceRect.right, y, paint);

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: x0 - 5,
      x: 0,
      y: y - Math.round(this.fontSize / 2),
    });
  }
}
