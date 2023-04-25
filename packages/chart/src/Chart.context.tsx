import { createContext, useContext } from 'react';
import { ChartProps } from '@/chart.types';

export const ChartContext = createContext<ChartProps>({} as ChartProps);
export const useChartContext = () => useContext(ChartContext);
