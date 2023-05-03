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
    const { labelColor, labelFontSize } = axisProps;

    const textAlign: TextAlign =
      axisProps.position === 'left'
        ? ckGraphics.CK.TextAlign.Right
        : ckGraphics.CK.TextAlign.Left;

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
      textAlign,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    seriesSurfaceRect: RectLayout,
  ): void {
    const height = seriesSurfaceRect.bottom - seriesSurfaceRect.top;
    const width = seriesSurfaceRect.right - seriesSurfaceRect.left;

    canvas.save();
    canvas.rotate(-90, width / 2, height / 2);

    const rotatedY = canvas.getLocalToDevice()[3] ?? 0;

    CkGraphics.drawParagraph({
      canvas,
      paragraph: this.labelParagraph,
      width: width,
      x: 0,
      y: (rotatedY / 2) * -1 + 20,
    });

    canvas.restore();
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
      y: y - Math.round(this.tickFontSize / 2),
    });
  }
}
