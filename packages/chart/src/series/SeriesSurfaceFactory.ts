import { ChartStyle } from '@/Chart.types';
import { XAxisConfig, YAxisConfig } from '@/axis/Axis.types';
import { XYTuple } from '@/coord/Coord.types';
import { RectLayout, Size } from '@/layout/ChartLayout.types';

export function buildSeriesSurfaceLayout(
  size: Size,
  style: ChartStyle,
  xyAxisConfig: XYTuple<XAxisConfig, YAxisConfig>,
): RectLayout {
  const [
    { position: xAxisPosition, size: xAxisSize },
    { position: yAxisPosition, size: yAxisSize },
  ] = xyAxisConfig;

  const { height, width } = size;
  const {
    margin: { top, right, bottom, left },
  } = style;

  const topMargin: number = xAxisPosition === 'top' ? xAxisSize : top;
  const bottomMargin: number = xAxisPosition === 'bottom' ? xAxisSize : bottom;

  const rightMargin: number = yAxisPosition === 'right' ? yAxisSize : right;
  const leftMargin: number = yAxisPosition === 'left' ? yAxisSize : left;

  const seriesSurfaceHeight: number = height - topMargin - bottomMargin;
  const seriesSurfaceWidth: number = width - leftMargin - rightMargin;

  return {
    x0: leftMargin,
    x1: leftMargin + seriesSurfaceWidth,
    y0: topMargin,
    y1: topMargin + seriesSurfaceHeight,
    height: seriesSurfaceHeight,
    width: seriesSurfaceWidth,
  };
}
