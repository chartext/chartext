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
    super(
      axisProps,
      ckGraphics,
      coordLayout,
      paintRepository,
      ckGraphics.CK.TextAlign.Center,
    );
  }

  protected override drawTick(
    canvas: Canvas,
    paint: Paint,
    seriesSurfaceRect: RectLayout,
    tickParagraph: Paragraph,
    value: CoordType,
  ) {
    const x = this.coordLayout.getScreenCoord(value, seriesSurfaceRect);
    const y1 = seriesSurfaceRect.bottom + 7;

    canvas.drawLine(x, seriesSurfaceRect.top, x, y1, paint);

    // @todo width is a hack. need to find the paragraph width

    CkGraphics.drawParagraph({
      canvas,
      paragraph: tickParagraph,
      width: 30,
      x: x - 15,
      y: y1 + 5,
    });
  }
}
