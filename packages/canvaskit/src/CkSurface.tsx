import { Canvas, Surface, WebGPUCanvasContext } from 'canvaskit-wasm';
import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { CkGraphics } from '@/CkGraphics';
import { useCkGraphics } from '@/CkGraphicsProvider';

type CkSurfaceProps = {
  height: number;
  width: number;
  scale?: number;
  zIndex?: number;
};

function createSurface(ckGraphics: CkGraphics, canvas: HTMLCanvasElement): Surface | null {
  const { CK, gpuDeviceContext } = ckGraphics;

  if (gpuDeviceContext) {
    const gpuCanvasContext: WebGPUCanvasContext | null = CK.MakeGPUCanvasContext(
      gpuDeviceContext,
      canvas,
    );

    if (gpuCanvasContext) {
      return CK.MakeGPUCanvasSurface(gpuCanvasContext, CK.ColorSpace.SRGB) as Surface | null;
    }
  }

  return CK.MakeWebGLCanvasSurface(canvas, CK.ColorSpace.SRGB) as Surface | null;
}

const CkSurfaceContext = createContext<Surface>({} as Surface);
export const useCkSurface = () => useContext(CkSurfaceContext);

const defaultCkSurfaceProps = {
  scale: window.devicePixelRatio,
  zIndex: 1,
};

export function CkSurface(props: PropsWithChildren<CkSurfaceProps>) {
  const {
    height,
    width,
    scale = defaultCkSurfaceProps.scale,
    zIndex = defaultCkSurfaceProps.zIndex,
    children,
  } = props;

  const ckGraphics = useCkGraphics();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [surface, setSurface] = useState<Surface>();

  useEffect(() => {
    if (canvasRef.current) {
      const { current: canvas } = canvasRef;

      const draftSurface: Surface | null = createSurface(ckGraphics, canvas);

      if (draftSurface && !draftSurface.isDeleted()) {
        const ckCanvas: Canvas = draftSurface.getCanvas();
        ckCanvas.scale(scale, scale);
        setSurface(draftSurface);
      }
      return () => {
        CkGraphics.delete(draftSurface);
      };
    }

    return () => {
      // no cleanup necessary
    };
  }, [scale, height, width, canvasRef, ckGraphics]);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={height * scale}
        width={width * scale}
        style={{ height, width, zIndex, position: 'absolute' }}
      />
      {surface ? (
        <CkSurfaceContext.Provider value={surface}>{children}</CkSurfaceContext.Provider>
      ) : null}
    </>
  );
}

CkSurface.defaultProps = defaultCkSurfaceProps;
