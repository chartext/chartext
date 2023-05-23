import { defaultNumberFormatter } from '@chartext/chart/ChartDefaults';
import { AxisTickLayout } from '@chartext/chart/axis/Axis.types';
import {
  CoordConfig,
  CoordFormatter,
  CoordTypeName,
  XYTuple,
} from '@chartext/chart/coord/Coord.types';
import { CoordLayout } from '@chartext/chart/coord/CoordLayout';
import { DateCoordLayout } from '@chartext/chart/coord/DateCoordLayout';
import { NumberCoordLayout } from '@chartext/chart/coord/NumberCoordLayout';
import { Direction } from '@chartext/chart/layout/ChartLayout.types';
import { Series } from '@chartext/chart/series/Series.types';
import { coordTypeName } from '@chartext/chart/utils/dataParsers';

export function buildXYTypeName(
  series: Series[],
): XYTuple<CoordTypeName> | null {
  const firstSeries = series.find(Boolean);
  const firstXY = firstSeries?.data.find(Boolean);

  if (firstXY) {
    const xTypeName = coordTypeName(firstXY.x);
    const yTypeName = coordTypeName(firstXY.y);

    if (xTypeName && yTypeName) {
      return [xTypeName, yTypeName];
    }
  }

  return null;
}

function buildCoordLayout(
  axisTickLayout: AxisTickLayout,
  coordTypeName: CoordTypeName,
  direction: Direction,
  formatter?: CoordFormatter,
): CoordLayout {
  switch (coordTypeName) {
    case 'integer':
    case 'decimal':
      return new NumberCoordLayout(
        axisTickLayout as AxisTickLayout<number>,
        direction,
        formatter
          ? (formatter as CoordFormatter<number>)
          : defaultNumberFormatter,
      ) as CoordLayout;
    case 'date':
      return new DateCoordLayout(
        axisTickLayout as AxisTickLayout<Date>,
        direction,
        formatter as CoordFormatter<Date>,
      );
    default:
      throw new Error(`Coord type not supported: ${coordTypeName}`);
  }
}

export function buildXYCoordLayout(
  xyAxisTickLayout: XYTuple<AxisTickLayout>,
  xyTypeName: XYTuple<CoordTypeName>,
  xyConfig: XYTuple<CoordConfig | undefined>,
): XYTuple<CoordLayout> {
  const [xAxisTickLayout, yAxisTickLayout] = xyAxisTickLayout;
  const [xTypeName, yTypeName] = xyTypeName;
  const [xConfig, yConfig] = xyConfig;

  const xCoordLayout = buildCoordLayout(
    xAxisTickLayout,
    xTypeName,
    'horizontal',
    xConfig?.formatter,
  );

  const yCoordLayout = buildCoordLayout(
    yAxisTickLayout,
    yTypeName,
    'vertical',
    yConfig?.formatter,
  );

  return [xCoordLayout as CoordLayout, yCoordLayout as CoordLayout];
}
