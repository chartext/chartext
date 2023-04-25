import { Canvas, Paint, PaintStyle, Paragraph, ParagraphStyle, Typeface } from 'canvaskit-wasm';

export type CkRect = [left: number, top: number, right: number, bottom: number];

export type CkDrawLineParams = [x0: number, x1: number, y0: number, y1: number, paint: Paint];

export type CkPaintProps = {
  color?: string | undefined;
  style?: PaintStyle | undefined;
  strokeWidth?: number | undefined;
};

export type CkFontFamily = 'roboto';
export type CkTypeface = Record<CkFontFamily, Typeface>;

export type CkFontProps = {
  size?: number | undefined;
  family?: CkFontFamily | undefined;
};

export type CkParagraphProps = ParagraphStyle & {
  text: string;
  fontSize?: number;
  fontFamilies?: string[] | undefined;
  color?: string | undefined;
};

export type CkDrawParagraphProps = {
  canvas: Canvas;
  paragraph: Paragraph;
  width: number;
  x: number;
  y: number;
};

export type CkEmbindObject = {
  delete(): void;
  isDeleted(): void;
};
