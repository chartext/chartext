import { AxisConfig, AxisTickLayout } from '@/axis/Axis.types';
import { DateTickLayout } from '@/axis/DateTickLayout';
import { NumberTickLayout } from '@/axis/NumberTickLayout';
import { CoordType, CoordTypeName, XYTuple } from '@/coord/Coord.types';
import { Series } from '@/series/Series.types';

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
  series: Series[],
  xyTypeName: XYTuple<CoordTypeName>,
  xyMaxTicks: XYTuple<number>,
): XYTuple<AxisTickLayout> {
  const xValues: CoordType[] = [];
  const yValues: CoordType[] = [];

  series.forEach(({ data }) => {
    data.forEach(({ x, y }) => {
      /* if ('x' in item) {
        xValues.push((item as XY).x);
      } else {
        xValues.push(xProps.)
      } */

      xValues.push(x);
      yValues.push(y);
    });
  });

  const [xTypeName, yTypeName] = xyTypeName;
  const [xMaxTicks, yMaxTicks] = xyMaxTicks;

  const xAxisTickLayout = buildAxisTickLayout(xTypeName, xMaxTicks, xValues);

  const yAxisTickLayout = buildAxisTickLayout(yTypeName, yMaxTicks, yValues);

  return [xAxisTickLayout, yAxisTickLayout];
}

function buildAxisColors(axisConfig: AxisConfig): string[] {
  return [
    axisConfig.labelColor,
    axisConfig.tickLabelColor,
    axisConfig.tickColor,
    axisConfig.tickZeroColor,
  ];
}

export function buildXYAxisColors(xyAxisConfig: XYTuple<AxisConfig>): string[] {
  const [xAxisConfig, yAxisConfig] = xyAxisConfig;

  return [...buildAxisColors(xAxisConfig), ...buildAxisColors(yAxisConfig)];
}
