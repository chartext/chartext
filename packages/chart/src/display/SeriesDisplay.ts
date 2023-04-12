import tinycolor, { Instance as Color } from 'tinycolor2';
import { Series } from '@/series/Series.types';

export type SeriesDisplayProps = {
  series: Series;
  color: Color | string;
};

export class SeriesDisplay {
  readonly color: Color;

  readonly series: Series;

  constructor(props: SeriesDisplayProps) {
    const { color, series } = props;

    this.series = series;

    if (typeof color === 'string') {
      this.color = tinycolor(color);
    } else {
      this.color = color;
    }
  }
}
