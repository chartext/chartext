import { Chart, Plot } from '@chartext/chart';
import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { generatePlot } from '@chartext/utils';

const plotEnabled = true;
const strictMode = false;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const randomPlot: Plot | undefined = plotEnabled ? generatePlot() : undefined;
const chart: ReactNode = <Chart plot={randomPlot} />;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const reactNode: ReactNode = strictMode ? <StrictMode>{chart}</StrictMode> : chart;
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(reactNode);
}
