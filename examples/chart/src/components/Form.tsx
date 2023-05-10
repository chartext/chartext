import {
  CoordRange,
  CoordType,
  Series,
  generateSeriesArr,
} from '@chartext/chart';
import { Button, Stack } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
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
    typeName: 'number',
    numberRange: {
      min: -1000,
      max: 1000,
    },
    dateRange: {
      min: new Date('2020-01-01'),
      max: new Date('2021-01-01'),
    },
  };
}

function initialSeriesValues(): SeriesControlValues {
  return {
    count: 4,
    dataCount: 50,
  };
}

function FormCoordControl(props: {
  coordName: 'x' | 'y';
  form: UseFormReturnType<RandomSeriesFormProps>;
}) {
  const { coordName, form } = props;
  return (
    <CoordControl
      label={coordName}
      coordTypeProps={form.getInputProps(`${coordName}Coord.typeName`)}
      dateRangeProps={{
        minProps: form.getInputProps(`${coordName}Coord.dateRange.min`),
        maxProps: form.getInputProps(`${coordName}Coord.dateRange.max`),
      }}
      numberRangeProps={{
        minProps: form.getInputProps(`${coordName}Coord.numberRange.min`),
        maxProps: form.getInputProps(`${coordName}Coord.numberRange.max`),
      }}
    />
  );
}

function FormSeriesControl(props: {
  seriesType: 'line' | 'scatter';
  form: UseFormReturnType<RandomSeriesFormProps>;
}) {
  const { seriesType, form } = props;
  return (
    <SeriesControl
      label={seriesType}
      dataCountProps={form.getInputProps(`${seriesType}Series.dataCount`)}
      seriesCountProps={form.getInputProps(`${seriesType}Series.count`)}
    />
  );
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

      const xRange: CoordRange<CoordType> =
        xCoord.typeName === 'date' ? xCoord.dateRange : xCoord.numberRange;
      const yRange: CoordRange<CoordType> =
        yCoord.typeName === 'date' ? yCoord.dateRange : yCoord.numberRange;

      const series: Series[] = generateSeriesArr([
        {
          xRange,
          yRange,
          type: 'line',
          count: lineSeries.count,
          dataCount: lineSeries.dataCount,
        },
        {
          xRange,
          yRange,
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
        <FormCoordControl
          coordName="x"
          form={form}
        />
        <FormCoordControl
          coordName="y"
          form={form}
        />
        <FormSeriesControl
          seriesType="line"
          form={form}
        />
        <FormSeriesControl
          seriesType="scatter"
          form={form}
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
