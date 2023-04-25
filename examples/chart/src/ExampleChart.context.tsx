import { Plot } from '@chartext/chart';
import { createContext, useContext } from 'react';

type ExampleChartContextProps = {
  plot: Plot | undefined;
  setPlot: (plot: Plot) => void;
};

export const ExampleChartContext = createContext<ExampleChartContextProps>(
  {} as ExampleChartContextProps,
);

export const useExampleChartContext = () => useContext(ExampleChartContext);
