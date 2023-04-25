import { CkGraphics, useCkGraphicsContext, useCkSurfaceContext } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';
import { useChartDisplayContext } from '@/ChartDisplay.context';

export function PlotSurface() {
  const ckGraphics: CkGraphics = useCkGraphicsContext();
  const surface: Surface = useCkSurfaceContext();
  const { seriesDisplays } = useChartDisplayContext();

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
