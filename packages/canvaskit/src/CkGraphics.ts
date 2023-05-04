import {
  CanvasKit,
  EmbindObject,
  Font,
  FontMgr,
  Paint,
  Paragraph,
  ParagraphBuilder,
  Path,
  Surface,
  WebGPUCanvasContext,
  WebGPUDeviceContext,
} from 'canvaskit-wasm';
import tinycolor, { Instance as Color } from 'tinycolor2';
import {
  CkDrawParagraphProps,
  CkFontProps,
  CkPaintProps,
  CkParagraphProps,
  CkTypeface,
} from '@/CkGraphics.types';

export class CkGraphics {
  constructor(
    readonly CK: CanvasKit,
    readonly fontMgr: FontMgr,
    readonly typefaces: CkTypeface,
    readonly gpuDeviceContext?: WebGPUDeviceContext,
  ) {}

  static drawParagraph(props: CkDrawParagraphProps) {
    const { canvas, paragraph, width, x, y } = props;
    paragraph.layout(width);
    canvas.drawParagraph(paragraph, x, y);
  }

  createParagraph(props: CkParagraphProps): Paragraph {
    const {
      text,
      fontSize = 10,
      fontFamilies = ['Roboto'],
      textAlign = this.CK.TextAlign.Left,
      color = '#000',
    } = props;

    const pStyle = new this.CK.ParagraphStyle({
      textStyle: {
        color: this.color(color),
        fontFamilies,
        fontSize,
      },
      textAlign,
    });

    const pBuilder: ParagraphBuilder = this.CK.ParagraphBuilder.Make(
      pStyle,
      this.fontMgr,
    );

    try {
      pBuilder.addText(text);
      const paragraph = pBuilder.build();
      return paragraph;
    } finally {
      CkGraphics.delete(pBuilder);
    }
  }

  path(pathCallback: (path: Path) => void) {
    const path = new this.CK.Path();

    try {
      pathCallback(path);
    } finally {
      CkGraphics.delete(path);
    }
  }

  createPath(): Path {
    return new this.CK.Path();
  }

  color(color: string): Float32Array {
    const parsedColor: Color = tinycolor(color);

    return this.CK.Color(
      parsedColor.toRgb().r,
      parsedColor.toRgb().g,
      parsedColor.toRgb().b,
      parsedColor.toRgb().a,
    );
  }

  createPaint(props?: CkPaintProps): Paint {
    const {
      color = '#000',
      style = this.CK.PaintStyle.Stroke,
      strokeWidth = 1.0,
    } = props ?? {};

    const paint = new this.CK.Paint();
    paint.setAntiAlias(true);
    paint.setColor(this.color(color));
    paint.setStyle(style);

    if (style === this.CK.PaintStyle.Stroke) {
      paint.setStrokeWidth(strokeWidth);
    }

    return paint;
  }

  createTextPaint(props?: CkPaintProps): Paint {
    return this.createPaint({ ...props, style: this.CK.PaintStyle.Fill });
  }

  createFont(props?: CkFontProps): Font {
    const { size = 10, family = 'roboto' } = props ?? {};

    return new this.CK.Font(this.typefaces[family], size);
  }

  createSurface(canvas: HTMLCanvasElement): Surface | null {
    const { CK, gpuDeviceContext } = this;

    if (gpuDeviceContext) {
      const gpuCanvasContext: WebGPUCanvasContext | null =
        CK.MakeGPUCanvasContext(gpuDeviceContext, canvas);

      if (gpuCanvasContext) {
        return CK.MakeGPUCanvasSurface(
          gpuCanvasContext,
          CK.ColorSpace.SRGB,
        ) as Surface | null;
      }
    }

    return CK.MakeWebGLCanvasSurface(
      canvas,
      CK.ColorSpace.SRGB,
    ) as Surface | null;
  }

  static delete<T extends EmbindObject<T>>(
    ...objects: (EmbindObject<T> | null)[]
  ) {
    objects.forEach((obj) => obj?.delete());
  }
}
