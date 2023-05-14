import { Canvas, Surface } from 'canvaskit-wasm';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCkGraphics } from '@/CkGraphicsProvider';

type CkSurfaceProps = {
  height: number;
  width: number;
  scale?: number;
  zIndex?: number;
};

const CkSurfaceContext = createContext<Surface | null>(null);
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
  const [surface, setSurface] = useState<Surface | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const { current: canvas } = canvasRef;

      const draftSurface: Surface | null = ckGraphics.createSurface(canvas);

      if (draftSurface && !draftSurface.isDeleted()) {
        const ckCanvas: Canvas = draftSurface.getCanvas();
        ckCanvas.scale(scale, scale);
        setSurface(draftSurface);
      }
      return () => {
        draftSurface?.deleteLater();
        setSurface(null);
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
      <CkSurfaceContext.Provider value={surface}>
        {children}
      </CkSurfaceContext.Provider>
    </>
  );
}

CkSurface.defaultProps = defaultCkSurfaceProps;
