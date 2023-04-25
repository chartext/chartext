import { CoordProps } from '@/coord/coord.types';
import { Series } from '@/series/series.types';

export type Plot = {
  readonly xProps?: CoordProps;
  readonly yProps?: CoordProps;
  readonly series: Series[];
};
