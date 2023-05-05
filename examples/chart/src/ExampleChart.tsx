import { Chart, Series } from '@chartext/chart';
import { Group, MantineProvider } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';
import { Form } from '@/components/Form';
import { ExampleChartContext } from '@/ExampleChart.context';

const sidebarWidth = 175;

export function ExampleChart() {
  const [series, setSeries] = useState<Series[]>([]);
  const { height, width } = useViewportSize();

  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ExampleChartContext.Provider value={{ series, setSeries }}>
        <Group spacing={0}>
          <Form
            height={height}
            width={sidebarWidth}
          />
          <Chart
            size={{ height: height, width: width - sidebarWidth }}
            series={series}
            xAxis={{
              label: 'X Axis',
            }}
            yAxis={{
              label: 'Y Axis',
            }}
          />
        </Group>
      </ExampleChartContext.Provider>
    </MantineProvider>
  );
}
