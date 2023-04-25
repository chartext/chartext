import { CoordType } from '@/coord/Coord.types';
import { SeriesType } from '@/series/Series.types';

export type DataType = 'int' | 'number' | 'currency' | 'date';

type MinMax<T extends CoordType> = [min: T, max: T];

export type RandomSeriesProps<X extends CoordType, Y extends CoordType> = {
  dataCount: number;
  index: number;
  type: SeriesType;
  xMinMax: MinMax<X>;
  yMinMax: MinMax<Y>;
};

export type RandomSeriesConfig<X extends CoordType, Y extends CoordType> = {
  count: number;
  dataCount: number;
  type: SeriesType;
  xMinMax: MinMax<X>;
  yMinMax: MinMax<Y>;
};
