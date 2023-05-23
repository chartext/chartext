import {
  CanvasKit,
  Font,
  FontMgr,
  Paint,
  PaintStyleEnumValues,
  Paragraph,
  ParagraphBuilder,
  ParagraphStyle,
  Path,
  Surface,
  TextAlignEnumValues,
  WebGPUCanvasContext,
  WebGPUDeviceContext,
} from 'canvaskit-wasm';
import tinycolor, { Instance as Color } from 'tinycolor2';
import {
  CkCreatePaintParams,
  CkCreateParagraphParams,
  CkDrawParagraphParams,
  CkCreateFontParams,
  CkTypeface,
} from '@chartext/canvaskit/CkGraphics.types';

export class CkGraphics {
  constructor(
    readonly CK: CanvasKit,
    readonly fontMgr: FontMgr,
    readonly typefaces: CkTypeface,
    readonly gpuDeviceContext?: WebGPUDeviceContext,
  ) {}

  static drawParagraph(params: CkDrawParagraphParams) {
    const { canvas, paragraph, width, x, y } = params;
    paragraph.layout(width);
    canvas.drawParagraph(paragraph, x, y);
  }

  MakeImage(params: Parameters<CanvasKit['MakeImage']>) {
    this.CK.MakeImage(...params);
  }

  createParagraph(params: CkCreateParagraphParams): Paragraph {
    const { text, style } = params;

    const pStyleDefaults: ParagraphStyle = {
      textStyle: {
        color: this.color('#000'),
        fontFamilies: ['Roboto'],
        fontSize: 10,
      },
      textAlign: this.TextAlign.Left,
    };

    const pStyle = new this.CK.ParagraphStyle({
      ...pStyleDefaults,
      ...style,
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
      pBuilder.delete();
    }
  }

  path(pathCallback: (path: Path) => void) {
    const path = this.createPath();

    try {
      pathCallback(path);
    } finally {
      path.delete();
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

  createPaint(params?: CkCreatePaintParams): Paint {
    const {
      color = '#000',
      style = this.CK.PaintStyle.Stroke,
      strokeWidth = 1.0,
    } = params ?? {};

    const paint = new this.CK.Paint();
    paint.setAntiAlias(true);
    paint.setColor(this.color(color));
    paint.setStyle(style);

    if (style === this.CK.PaintStyle.Stroke) {
      paint.setStrokeWidth(strokeWidth);
    }

    return paint;
  }

  createTextPaint(params?: CkCreatePaintParams): Paint {
    return this.createPaint({ ...params, style: this.CK.PaintStyle.Fill });
  }

  createFont(params?: CkCreateFontParams): Font {
    const { size = 10, family = 'roboto' } = params ?? {};

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

  get TRANSPARENT() {
    return this.CK.TRANSPARENT;
  }

  get TextAlign(): TextAlignEnumValues {
    return this.CK.TextAlign;
  }

  get PaintStyle(): PaintStyleEnumValues {
    return this.CK.PaintStyle;
  }
}
