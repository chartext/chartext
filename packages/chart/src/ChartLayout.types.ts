export type Rect<T> = {
  left: T;
  top: T;
  right: T;
  bottom: T;
};

export type Margin<T> = Partial<Rect<T | undefined>>;

export type Size = {
  height: number;
  width: number;
};
