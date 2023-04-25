import { CoordProps } from '@/coord/Coord.types';
import { Series } from '@/series/Series.types';

export type Plot = {
  readonly xProps?: CoordProps;
  readonly yProps?: CoordProps;
  readonly series: Series[];
};
