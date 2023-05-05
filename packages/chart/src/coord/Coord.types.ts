export type CoordType = number | bigint | string | Date;

export type CoordTypeName = 'integer' | 'float' | 'string' | 'date';

export type CoordFormatter<C extends CoordType> = {
  format(value: C): string;
};

export type CoordParser<C extends CoordType> = {
  parse(value: C | object): C;
};

export type CoordConfig = {
  formatter?: CoordFormatter<CoordType>;
  parser?: CoordParser<CoordType>;
};

export type XY = {
  x: CoordType;
  y: CoordType;
};

export type Box = {
  readonly one: CoordType;
  readonly q0: number;
  readonly q1: number;
  readonly q2: number;
  readonly q3: number;
  readonly q4: number;
  readonly outliers?: number[];
};
