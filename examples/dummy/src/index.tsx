import { Chart, Plot, generatePlot } from '@chartext/chart';
import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const dummyPlotEnabled = true;
const strictMode = false;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const dummyPlot: Plot | undefined = dummyPlotEnabled ? generatePlot() : undefined;

/**
 * @todo display is fucky with 1-2 pieces of small data
 * plot: {
        xType: 'number',
        yType: 'number',
        series: [
          {
            name: 'foo',
            type: 'scatter',
            data: [
              [1, 2],
              [5, -1],
              [10, 5],
            ],
          },
        ],
      },
 */
const chart: ReactNode = <Chart plot={dummyPlot} />;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const reactNode: ReactNode = strictMode ? <StrictMode>{chart}</StrictMode> : chart;
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<>{reactNode}</>);
}
