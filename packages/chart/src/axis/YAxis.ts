import { CkGraphics, CkPaintRepository } from '@chartext/canvaskit';
import { Canvas, Paint, Paragraph, TextAlign } from 'canvaskit-wasm';
import { Axis } from '@/axis/Axis';
import { YAxisProps } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

export class YAxis<Y extends CoordType> extends Axis<Y> {
  constructor(
    axisProps: YAxisProps,
    ckGraphics: CkGraphics,
    coordLayout: CoordLayout<Y>,
    paintRepository: CkPaintRepository,
  ) {
    const { labelColor, labelFontSize } = axisProps;

    const textAlign: TextAlign =
      axisProps.position === 'left'
        ? ckGraphics.CK.TextAlign.Right
        : ckGraphics.CK.TextAlign.Left;

    const labelParagraph = axisProps.label
      ? ckGraphics.createParagraph({
          text: axisProps.label,
          fontSize: labelFontSize,
          color: labelColor,
          textAlign: ckGraphics.CK.TextAlign.Center,
        })
      : null;

    super(
      ckGraphics,
      coordLayout,
      labelParagraph,
      axisProps,
      paintRepository,
      textAlign,
    );
  }

  protected override drawLabel(
    canvas: Canvas,
    seriesSurfaceRect: RectLayout,
  ): void {
    if (!this.labelParagraph) return;

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
    value: Y,
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
