import { createContext, useContext } from 'react';
import { ChartProps, Rect } from '@/Chart.types';
import PlotDisplay from '@/display/PlotDisplay';

export type ChartContextProps = ChartProps & {
  plotDisplay: PlotDisplay;
  plotRect: Rect<number>;
};
export const ChartContext = createContext<ChartContextProps>({} as ChartContextProps);
export const useChartContext = () => useContext(ChartContext);
