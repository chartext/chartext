import { useExampleChartContext } from '@/ExampleChart.context';
import { CoordTypeControl } from '@/components/CoordTypeControl';
import { SeriesControl } from '@/components/SeriesControl';
import { CoordType, RandomSeriesConfig, generatePlot } from '@chartext/chart';
import { Button, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { FaChartLine } from 'react-icons/fa';

type RandomPlotFormProps = {
  lineSeries: RandomSeriesConfig<CoordType, CoordType>;
  // scatterSeries: RandomSeriesConfig<CoordType, CoordType>;
};

type SidebarProps = {
  height: number;
  width: number;
  padding?: number;
};

export function Sidebar(props: SidebarProps) {
  const { height, width, padding = 10 } = props;
  const { setPlot } = useExampleChartContext();

  const form = useForm<RandomPlotFormProps>({
    initialValues: {
      lineSeries: {
        count: 1,
        dataCount: 100,
        type: 'line',
        xMinMax: [-1000, 1000],
        yMinMax: [-1000, 1000],
      },
    },
  });

  const onSubmit = useCallback(
    (randomPlotFormProps: RandomPlotFormProps) => {
      const { lineSeries } = randomPlotFormProps;
      const plot = generatePlot([lineSeries]);
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
        <Group
          grow
          spacing={5}
        >
          <CoordTypeControl
            label="x"
            {...form.getInputProps('xType')}
          />
          <CoordTypeControl
            label="y"
            {...form.getInputProps('yType')}
          />
        </Group>
        <SeriesControl
          label="Line"
          dataCountProps={form.getInputProps('lineSeries.dataCount')}
          seriesCountProps={form.getInputProps('lineSeries.count')}
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
