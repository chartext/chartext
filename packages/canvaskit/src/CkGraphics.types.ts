import {
  Canvas,
  PaintStyle,
  Paragraph,
  ParagraphStyle,
  Typeface,
} from 'canvaskit-wasm';

export type CkRect = [left: number, top: number, right: number, bottom: number];

export type CkCreatePaintParams = {
  color?: string | undefined;
  style?: PaintStyle | undefined;
  strokeWidth?: number | undefined;
};

export type CkFontFamily = 'roboto';
export type CkTypeface = Record<CkFontFamily, Typeface>;

export type CkCreateFontParams = {
  size?: number | undefined;
  family?: CkFontFamily | undefined;
};

export type CkCreateParagraphParams = {
  text: string;
  style?: ParagraphStyle;
};

export type CkDrawParagraphParams = {
  canvas: Canvas;
  paragraph: Paragraph;
  width: number;
  x: number;
  y: number;
};
