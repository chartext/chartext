import { CkPaintRepository, useCkGraphicsContext } from '@chartext/canvaskit';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { AxisTheme, SeriesTheme } from '@/theme/chartTheme.types';
import { Margin } from '@/chart.types';

export type ChartThemeContextProps = {
  paintRepository: CkPaintRepository;
  axisThemes: Margin<AxisTheme>;
  seriesTheme: SeriesTheme;
};

export type ChartThemeProviderProps = {
  axisThemes: Margin<AxisTheme>;
  seriesTheme: SeriesTheme;
};

const ChartThemeContext = createContext<ChartThemeContextProps>({} as ChartThemeContextProps);
export const useChartThemeContext = () => useContext(ChartThemeContext);

export function ChartThemeProvider(props: PropsWithChildren<ChartThemeProviderProps>) {
  const ckGraphics = useCkGraphicsContext();

  const { axisThemes, seriesTheme, children } = props;

  const contextProps: ChartThemeContextProps = useMemo(() => {
    const colors: string[] = [];

    colors.push(...seriesTheme.colors);

    if (axisThemes.left) {
      colors.push(axisThemes.left.tickColor);
      colors.push(axisThemes.left.zeroTickColor);
    }

    if (axisThemes.right) {
      colors.push(axisThemes.right.tickColor);
      colors.push(axisThemes.right.zeroTickColor);
    }

    if (axisThemes.top) {
      colors.push(axisThemes.top.tickColor);
      colors.push(axisThemes.top.zeroTickColor);
    }

    if (axisThemes.bottom) {
      colors.push(axisThemes.bottom.tickColor);
      colors.push(axisThemes.bottom.zeroTickColor);
    }

    const paintRepository = new CkPaintRepository(ckGraphics, colors);

    return {
      paintRepository,
      axisThemes,
      seriesTheme,
    };
  }, [axisThemes, ckGraphics, seriesTheme]);

  return <ChartThemeContext.Provider value={contextProps}>{children}</ChartThemeContext.Provider>;
}
