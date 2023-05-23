import { AxisTickLayout } from '@chartext/chart/axis/Axis.types';
import { DateTickLayout } from '@chartext/chart/axis/DateTickLayout';
import { NumberTickLayout } from '@chartext/chart/axis/NumberTickLayout';
import {
  CoordType,
  CoordTypeName,
  XYTuple,
} from '@chartext/chart/coord/Coord.types';
import { Series } from '@chartext/chart/series/Series.types';
import { AxisStyle } from '@chartext/chart/theme/ChartTheme.types';

function buildAxisTickLayout(
  coordTypeName: CoordTypeName,
  maxTicks: number,
  values: CoordType[],
): AxisTickLayout {
  switch (coordTypeName) {
    case 'integer':
    case 'decimal':
      return new NumberTickLayout(values as number[], maxTicks);
    case 'date':
      return new DateTickLayout(values as Date[], maxTicks);
    case 'string':
    default:
      throw new Error(`Coord type not supported: ${coordTypeName}`);
  }
}

export function buildXYAxisTickLayout(
  seriesArr: Series[],
  xyTypeName: XYTuple<CoordTypeName>,
  xyMaxTicks: XYTuple<number>,
): XYTuple<AxisTickLayout> {
  const xValues: CoordType[] = [];
  const yValues: CoordType[] = [];

  seriesArr.forEach(({ data }) =>
    data.forEach(({ x, y }) => {
      xValues.push(x);
      yValues.push(y);
    }),
  );

  const [xTypeName, yTypeName] = xyTypeName;
  const [xMaxTicks, yMaxTicks] = xyMaxTicks;

  const xAxisTickLayout = buildAxisTickLayout(xTypeName, xMaxTicks, xValues);
  const yAxisTickLayout = buildAxisTickLayout(yTypeName, yMaxTicks, yValues);

  return [xAxisTickLayout, yAxisTickLayout];
}

function buildAxisColors(axisStyle: AxisStyle): string[] {
  return [
    axisStyle.labelStyle.fontColor,
    axisStyle.tickStyle.color,
    axisStyle.tickStyle.zeroColor,
    axisStyle.tickStyle.labelStyle.fontColor,
  ];
}

export function buildXYAxisColors(xyAxisStyle: XYTuple<AxisStyle>): string[] {
  const [xAxisStyle, yAxisStyle] = xyAxisStyle;

  return [...buildAxisColors(xAxisStyle), ...buildAxisColors(yAxisStyle)];
}
