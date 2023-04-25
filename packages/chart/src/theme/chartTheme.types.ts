import { Paint } from 'canvaskit-wasm';

export type AxisTheme = {
  tickColor: string;
  zeroTickColor: string;
};

export type SeriesTheme = {
  colors: string[];
};

export type SeriesPaint = {
  fillPaint: Paint;
  strokePaint: Paint;
};
