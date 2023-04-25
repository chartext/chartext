import { ExampleChartContext } from '@/ExampleChart.context';
import { Sidebar } from '@/components/Sidebar';
import { Chart, Plot } from '@chartext/chart';
import { Group, MantineProvider } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';

const sidebarWidth = 175;

export function ExampleChart() {
  const [plot, setPlot] = useState<Plot>();
  const { height, width } = useViewportSize();

  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ExampleChartContext.Provider value={{ plot, setPlot }}>
        <Group spacing={0}>
          <Sidebar
            height={height}
            width={sidebarWidth}
          />
          <Chart
            size={{ height: height, width: width - sidebarWidth }}
            plot={plot}
          />
        </Group>
      </ExampleChartContext.Provider>
    </MantineProvider>
  );
}
