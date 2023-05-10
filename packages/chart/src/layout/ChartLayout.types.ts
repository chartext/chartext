export type Direction = 'horizontal' | 'vertical';

export type Position = 'center' | 'top' | 'right' | 'bottom' | 'left';

export type RectLayout = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  height: number;
  width: number;
};

export type Margin = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type Size = {
  height: number;
  width: number;
  scale: number;
};
