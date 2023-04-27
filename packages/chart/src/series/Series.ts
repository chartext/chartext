import { Series, SeriesData } from '@/series/Series.types';

export function sortedSeriesData(series: Series): SeriesData {
  return series.data.sort((xy1, xy2) => {
    const x1 = xy1.x;
    const x2 = xy2.x;

    if (x1 === x2) {
      const y1 = xy1.y;
      const y2 = xy2.y;

      if (y1 === y2) return 0;

      return y1 < y2 ? -1 : 1;
    }

    return x1 < x2 ? -1 : 1;
  });
}
