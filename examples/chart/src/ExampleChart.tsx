import { Chart, Series } from '@chartext/chart';
import {
  ActionIcon,
  Drawer,
  Group,
  MantineProvider,
  ScrollArea,
  Stack,
} from '@mantine/core';
import {
  useDebouncedValue,
  useDisclosure,
  useViewportSize,
} from '@mantine/hooks';
import { useState } from 'react';
import { TbDatabase } from 'react-icons/tb';
import { Form } from '@/components/Form';
import { ExampleChartContext } from '@/ExampleChart.context';

const sidebarWidth = 36;
const drawerSize = 250;
const minChartWidth = 640;

export function ExampleChart() {
  const [series, setSeries] = useState<Series[]>([]);
  const { height: viewportHeight, width: viewportWidth } = useViewportSize();
  const [height] = useDebouncedValue<number>(viewportHeight, 500);
  const [width] = useDebouncedValue<number>(viewportWidth, 500);

  const [opened, { open, close }] = useDisclosure(true);

  const chartWidth =
    width - sidebarWidth < minChartWidth ? minChartWidth : width - sidebarWidth;

  const scrollAreaWidth = width - sidebarWidth;

  // const onSubmit = useCallback(() => close(), [close]);

  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ExampleChartContext.Provider value={{ series, setSeries }}>
        <Drawer
          size={drawerSize}
          padding={5}
          opened={opened}
          onClose={close}
          keepMounted={true}
          title={<TbDatabase />}
        >
          <Form w={drawerSize - 10} />
        </Drawer>
        <Group spacing={0}>
          <Stack
            h={height}
            w={sidebarWidth}
          >
            <ActionIcon
              onClick={open}
              w={sidebarWidth}
            >
              <TbDatabase />
            </ActionIcon>
          </Stack>
          <ScrollArea w={scrollAreaWidth}>
            <Chart
              height={height}
              width={chartWidth}
              series={series}
              xAxis={{
                label: 'X Axis',
              }}
              yAxis={{
                label: 'Y Axis',
              }}
            />
          </ScrollArea>
        </Group>
      </ExampleChartContext.Provider>
    </MantineProvider>
  );
}
