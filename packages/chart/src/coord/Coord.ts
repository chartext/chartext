import { CoordPlotValue } from '@/coord/Coord.types';

export const DatePlotValue: CoordPlotValue<Date> = (date: Date) =>
  date.getTime();
