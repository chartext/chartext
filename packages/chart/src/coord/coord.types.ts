import { DatePart } from '@/data/dates.types';

export type CoordType = number | string | Date;

export type CoordTypeName = 'integer' | 'float' | 'string' | 'date';

export type CoordProps = {
  formatter?: string | ((coord: CoordType) => string);
  parser?: (val: CoordType | object) => CoordType;
  spacing?: number | DatePart;
  name?: string;
};

export type XY = {
  x: CoordType;
  y: CoordType;
};
