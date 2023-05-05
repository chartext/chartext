import { Series } from '@chartext/chart';
import { createContext, useContext } from 'react';

type ExampleChartContextProps = {
  series: Series[];
  setSeries(series: Series[]): void;
};

export const ExampleChartContext = createContext<ExampleChartContextProps>(
  {} as ExampleChartContextProps,
);

export const useExampleChartContext = () => useContext(ExampleChartContext);
