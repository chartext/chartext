export type CoordType = number | bigint | string | Date;

export type CoordTypeName = 'integer' | 'decimal' | 'string' | 'date';

export type CoordMinMax<C extends CoordType> = [min: C, max: C];

export type CoordFormatter<C extends CoordType = CoordType> = {
  format(value: C): string;
};

export type NumberFormatter = CoordFormatter<number>;
export type DateFormatter = CoordFormatter<Date>;

export type CoordParser<C extends CoordType> = {
  parse(value: C | object): C;
};

export type CoordPlotValue<C extends CoordType> = (coord: C) => number;

export type CoordConfig = {
  formatter?: CoordFormatter;
  parser?: CoordParser<CoordType>;
};

export type XY<
  X extends CoordType = CoordType,
  Y extends CoordType = CoordType,
> = {
  x: X;
  y: Y;
};

export type XYTuple<X, Y = X> = [x: X, y: Y];

export type Box<O extends CoordType = CoordType> = {
  readonly one: O;
  readonly q0: number;
  readonly q1: number;
  readonly q2: number;
  readonly q3: number;
  readonly q4: number;
  readonly outliers?: number[];
};
