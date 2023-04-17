import { createContext, useContext } from 'react';
import { ChartProps } from '@/Chart.types';

export const ChartContext = createContext<ChartProps>({} as ChartProps);
export const useChartContext = () => useContext(ChartContext);
