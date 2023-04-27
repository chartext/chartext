import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { ChartProps } from '@/Chart.types';
import { AxisProps } from '@/axis/Axis.types';
import { Plot } from '@/plot/Plot.types';
import { Margin, Rect, Size } from '@/ChartLayout.types';

export type ChartContextProps = {
  axis: Margin<Partial<AxisProps>>;
  plot: Plot | undefined;
  plotRect: Rect<number>;
  scale: number;
  size: Size;
};

export const ChartContext = createContext<ChartContextProps>({} as ChartContextProps);
export const useChartContext = () => useContext(ChartContext);

export function ChartProvider(props: PropsWithChildren<ChartProps>) {
  const { axis, plot, scale, size, children } = props;

  const plotRect: Rect<number> = useMemo(() => {
    const { height, width } = size;
    const topMargin: number = axis.top?.size ?? 25;
    const rightMargin: number = axis.right?.size ?? 25;
    const bottomMargin: number = axis.bottom?.size ?? 25;
    const leftMargin: number = axis.left?.size ?? 25;

    const plotHeight: number = height - topMargin - bottomMargin;
    const plotWidth: number = width - leftMargin - rightMargin;

    return {
      left: leftMargin,
      right: leftMargin + plotWidth,
      top: topMargin,
      bottom: topMargin + plotHeight,
    };
  }, [axis, size]);

  return (
    <ChartContext.Provider value={{ axis, plot, plotRect, scale, size }}>
      {children}
    </ChartContext.Provider>
  );
}
