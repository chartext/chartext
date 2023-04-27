import { generatePlot, randomInt } from '@chartext/chart';
import { Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { SeriesControl, SeriesControlValues } from '@/components/SeriesControl';
import { CoordControl, CoordControlValues } from '@/components/CoordControl';
import { useExampleChartContext } from '@/ExampleChart.context';

type RandomPlotFormProps = {
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

function randomCoordValues(): CoordControlValues {
  return {
    coordType: 'number',
    range: {
      min: randomInt(-100, -1),
      max: randomInt(0, 100),
    },
  };
}

function randomSeriesValues(): SeriesControlValues {
  return {
    count: randomInt(1, 5),
    dataCount: randomInt(10, 100),
  };
}

export function Sidebar(props: SidebarProps) {
  const { height, width, padding = 10 } = props;
  const { setPlot } = useExampleChartContext();

  const form = useForm<RandomPlotFormProps>({
    initialValues: {
      xCoord: randomCoordValues(),
      yCoord: randomCoordValues(),
      lineSeries: randomSeriesValues(),
      scatterSeries: randomSeriesValues(),
    },
  });

  const onSubmit = useCallback(
    (randomPlotFormProps: RandomPlotFormProps) => {
      const { xCoord, yCoord, lineSeries, scatterSeries } = randomPlotFormProps;
      const plot = generatePlot([
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
      setPlot(plot);
    },
    [setPlot],
  );

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
