import { useChartDisplay } from '@/ChartDisplayProvider';
import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';

export function PlotSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface = useCkSurface();
  const { seriesDisplays } = useChartDisplay();

  const {
    CK: { TRANSPARENT },
  } = ckGraphics;

  useLayoutEffect(() => {
    surface.requestAnimationFrame((canvas: Canvas) => {
      canvas.clear(TRANSPARENT);
      seriesDisplays.filter((sd) => !sd.isDeleted).forEach((sd) => sd.draw(canvas));
    });
  }, [surface, TRANSPARENT, seriesDisplays]);

  return null;
}
