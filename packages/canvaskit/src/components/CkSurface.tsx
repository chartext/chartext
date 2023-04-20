import { CkGraphics } from '@/CkGraphics';
import { useCkGraphicsContext } from '@/components/CkGraphics.context';
import { CkSurfaceContext } from '@/components/CkSurface.context';
import { Surface, WebGPUCanvasContext } from 'canvaskit-wasm';
import {
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from 'react';

type CkSurfaceProps = {
  height: number;
  width: number;
  scale?: number;
  zIndex?: number;
};

export function createSurface(ckGraphics: CkGraphics, canvas: HTMLCanvasElement): Surface | null {
  const { CK, gpuDeviceContext } = ckGraphics;

  if (gpuDeviceContext) {
    const gpuCanvasContext: WebGPUCanvasContext | null = CK.MakeGPUCanvasContext(
      gpuDeviceContext,
      canvas,
    );

    if (gpuCanvasContext) {
      return CK.MakeGPUCanvasSurface(gpuCanvasContext, CK.ColorSpace.SRGB);
    }
  }

  return CK.MakeWebGLCanvasSurface(canvas, CK.ColorSpace.SRGB);
}

export function CkSurface(props: PropsWithChildren<CkSurfaceProps>) {
  console.log('CkSurface', props);

  const ckGraphics = useCkGraphicsContext();

  const { children, height, width, scale = window.devicePixelRatio, zIndex } = props;
  const [surface, setSurface] = useState<Surface | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { current: canvas } = canvasRef;

      const draftSurface: Surface | null = createSurface(ckGraphics, canvas);

      if (draftSurface) {
        draftSurface.getCanvas().scale(scale, scale);
        setSurface(draftSurface);
      }
      return () => {
        CkGraphics.delete(draftSurface);
      };
    }

    return () => {};
  }, [scale, height, width, canvasRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={height * scale}
        width={width * scale}
        style={{ height, width, zIndex, position: 'absolute' }}
      />
      {surface && !surface.isDeleted() ? (
        <CkSurfaceContext.Provider value={surface}>{children}</CkSurfaceContext.Provider>
      ) : null}
    </>
  );
}

CkSurface.defaultProps = {
  scale: window.devicePixelRatio,
  zIndex: 1,
};
