import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { CkGraphics, useCkGraphicsContext } from '@chartext/canvaskit';
import { Paint, PaintStyle } from 'canvaskit-wasm';
import { useChartContext } from '@/Chart.context';
import { Margin } from '@/Chart.types';
import { AxisTheme } from '@/theme/ChartTheme.types';

export type ChartThemeContextProps = {
  blackFillPaint: Paint;
  blackStrokePaint: Paint;
  paints: Map<string, Paint>;
  getPaint(color: string | undefined, paintStyle: PaintStyle): Paint;
};

export type ChartThemeProviderProps = {
  /* axisSurfaceProps: Margin<AxisProps>;
  seriesTheme: SeriesTheme; */
};

const ChartThemeContext = createContext<ChartThemeContextProps>({} as ChartThemeContextProps);
export const useChartThemeContext = () => useContext(ChartThemeContext);

function addPaint(color: string, ckGraphics: CkGraphics, paints: Map<string, Paint>) {
  const fillName = `${color}-Fill`;
  const strokeName = `${color}-Stroke`;

  if (!paints.has(fillName)) {
    paints.set(fillName, ckGraphics.createPaint({ color, style: ckGraphics.CK.PaintStyle.Fill }));
  }

  if (!paints.has(strokeName)) {
    paints.set(
      strokeName,
      ckGraphics.createPaint({ color, style: ckGraphics.CK.PaintStyle.Stroke }),
    );
  }
}

export function ChartThemeProvider(props: PropsWithChildren<ChartThemeProviderProps>) {
  const ckGraphics = useCkGraphicsContext();
  const { axis, seriesTheme } = useChartContext();
  const {
    CK: {
      PaintStyle: { Fill, Stroke },
    },
  } = ckGraphics;
  const { children } = props;

  const blackFillPaint: Paint = useMemo(
    () => ckGraphics.createPaint({ color: '#000', style: Fill }),
    [Fill, ckGraphics],
  );

  const blackStrokePaint: Paint = useMemo(
    () => ckGraphics.createPaint({ color: '#000', style: Stroke }),
    [Stroke, ckGraphics],
  );

  const axisThemes = useMemo(
    () =>
      ({
        left: axis.left?.theme,
        bottom: axis.bottom?.theme,
        top: axis.top?.theme,
        right: axis.right?.theme,
      } as Margin<AxisTheme>),
    [axis],
  );

  const paints: Map<string, Paint> = useMemo(() => {
    const paintMap: Map<string, Paint> = new Map<string, Paint>();

    seriesTheme.colors.forEach((color) => {
      addPaint(color, ckGraphics, paintMap);
    });

    if (axisThemes.bottom) {
      addPaint(axisThemes.bottom.tickColor, ckGraphics, paintMap);
      addPaint(axisThemes.bottom.zeroTickColor, ckGraphics, paintMap);
    }

    if (axisThemes.left) {
      addPaint(axisThemes.left.tickColor, ckGraphics, paintMap);
      addPaint(axisThemes.left.zeroTickColor, ckGraphics, paintMap);
    }

    if (axisThemes.top) {
      addPaint(axisThemes.top.tickColor, ckGraphics, paintMap);
      addPaint(axisThemes.top.zeroTickColor, ckGraphics, paintMap);
    }

    if (axisThemes.right) {
      addPaint(axisThemes.right.tickColor, ckGraphics, paintMap);
      addPaint(axisThemes.right.zeroTickColor, ckGraphics, paintMap);
    }

    return paintMap;
  }, [axisThemes, ckGraphics, seriesTheme]);

  const getPaint: (color: string | undefined, paintStyle: PaintStyle) => Paint = useCallback(
    (color: string | undefined, paintStyle: PaintStyle) => {
      switch (paintStyle) {
        case Fill:
          return color ? paints.get(`${color}-Fill`) ?? blackFillPaint : blackFillPaint;
        case Stroke:
          return color ? paints.get(`${color}-Stroke`) ?? blackStrokePaint : blackStrokePaint;
        default:
          throw new Error('');
      }
    },
    [Fill, Stroke, blackFillPaint, blackStrokePaint, paints],
  );

  useEffect(() => {
    return () => {
      CkGraphics.delete(blackFillPaint, blackStrokePaint);
      paints.forEach((paint) => CkGraphics.delete(paint));
    };
  });

  const context: ChartThemeContextProps = useMemo(
    () => ({
      axisThemes,
      seriesTheme,
      paints,
      blackFillPaint,
      blackStrokePaint,
      getPaint,
    }),
    [axisThemes, blackFillPaint, blackStrokePaint, getPaint, paints, seriesTheme],
  );

  return <ChartThemeContext.Provider value={context}>{children}</ChartThemeContext.Provider>;
}
