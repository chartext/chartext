import { Series, generateSeriesArr } from '@chartext/chart';
import { Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useEffect } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { SeriesControl, SeriesControlValues } from '@/components/SeriesControl';
import { CoordControl, CoordControlValues } from '@/components/CoordControl';
import { useExampleChartContext } from '@/ExampleChart.context';

type RandomSeriesFormProps = {
  xCoord: CoordControlValues;
  yCoord: CoordControlValues;
  lineSeries: SeriesControlValues;
  scatterSeries: SeriesControlValues;
};

type SidebarProps = {
  height: number;
  width: number;
  padding?: number;
};

function initialCoordValues(): CoordControlValues {
  return {
    coordType: 'number',
    range: {
      min: -1000,
      max: 1000,
    },
  };
}

function initialSeriesValues(): SeriesControlValues {
  return {
    count: 4,
    dataCount: 50,
  };
}

export function Form(props: SidebarProps) {
  const { height, width, padding = 10 } = props;
  const { setSeries } = useExampleChartContext();

  const form = useForm<RandomSeriesFormProps>({
    initialValues: {
      xCoord: initialCoordValues(),
      yCoord: initialCoordValues(),
      lineSeries: initialSeriesValues(),
      scatterSeries: initialSeriesValues(),
    },
  });

  const onSubmit = useCallback(
    (randomSeriesFormProps: RandomSeriesFormProps) => {
      const { xCoord, yCoord, lineSeries, scatterSeries } =
        randomSeriesFormProps;
      const series: Series[] = generateSeriesArr([
        {
          xRange: xCoord.range,
          yRange: yCoord.range,
          type: 'line',
          count: lineSeries.count,
          dataCount: lineSeries.dataCount,
        },
        {
          xRange: xCoord.range,
          yRange: yCoord.range,
          type: 'scatter',
          count: scatterSeries.count,
          dataCount: scatterSeries.dataCount,
        },
      ]);
      setSeries(series);
    },
    [setSeries],
  );

  useEffect(() => {
    onSubmit({
      xCoord: initialCoordValues(),
      yCoord: initialCoordValues(),
      lineSeries: initialSeriesValues(),
      scatterSeries: initialSeriesValues(),
    });
  }, [onSubmit]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack
        w={width}
        h={height}
        justify="flex-start"
        p={padding}
      >
        <CoordControl
          label="x"
          minProps={form.getInputProps('xCoord.range.min')}
          maxProps={form.getInputProps('xCoord.range.max')}
          coordTypeProps={form.getInputProps('xCoord.coordType')}
        />
        <CoordControl
          label="y"
          minProps={form.getInputProps('yCoord.range.min')}
          maxProps={form.getInputProps('yCoord.range.max')}
          coordTypeProps={form.getInputProps('yCoord.coordType')}
        />
        <SeriesControl
          label="line"
          dataCountProps={form.getInputProps('lineSeries.dataCount')}
          seriesCountProps={form.getInputProps('lineSeries.count')}
        />
        <SeriesControl
          label="scatter"
          dataCountProps={form.getInputProps('scatterSeries.dataCount')}
          seriesCountProps={form.getInputProps('scatterSeries.count')}
        />
        <Button
          variant="outline"
          size="xs"
          leftIcon={<FaChartLine />}
          type="submit"
        >
          Load
        </Button>
      </Stack>
    </form>
  );
}
