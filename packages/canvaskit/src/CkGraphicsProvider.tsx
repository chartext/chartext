import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import CanvasKitInit, { CanvasKit, FontMgr, Typeface } from 'canvaskit-wasm';
import { CkGraphics } from '@/CkGraphics';

async function fontFetch(url: string): Promise<ArrayBuffer> {
  return fetch(url).then((response) => response.arrayBuffer());
}

async function webGpu(CK: CanvasKit) {
  try {
    const adapter = await navigator.gpu.requestAdapter();

    if (adapter) {
      const device = await adapter.requestDevice();
      const gpu = CK.MakeGPUDeviceContext(device);

      if (gpu) {
        return gpu;
      }
    }
  } catch (ex) {
    // eslint-disable-next-line no-console
    // console.log('webGpu', ex);
  }
  return undefined;
}

async function initCanvasKit(): Promise<CanvasKit> {
  return CanvasKitInit({
    locateFile: (file: string) =>
      `https://unpkg.com/canvaskit-wasm@0.38.1/bin/${file}`,
    // `node_modules/canvaskit-wasm/bin/${file}`,
    // locateFile: () => CanvasKitWasm as string,
  }).then((CK: CanvasKit) => CK);
}

export const CkGraphicsContext = createContext<CkGraphics>({} as CkGraphics);
export const useCkGraphics = () => useContext(CkGraphicsContext);

export function CkGraphicsProvider(props: { children: ReactElement }) {
  const { children } = props;

  const [ckGraphics, setCkGraphics] = useState<CkGraphics | null>(null);

  useEffect(() => {
    const fontFetchPromise = fontFetch(
      'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
    );
    const canvasKitInit: Promise<CanvasKit> = initCanvasKit();

    Promise.all([canvasKitInit, fontFetchPromise])
      .then(([CK, fontData]: [CanvasKit, ArrayBuffer]) => {
        const fontMgr: FontMgr | null = CK.FontMgr.FromData(fontData);
        const robotoTypeface: Typeface | null =
          CK.Typeface.MakeFreeTypeFaceFromData(fontData);

        if (!fontMgr || !robotoTypeface) {
          throw new Error('Failed to load font.');
        }

        const typefaces = {
          roboto: robotoTypeface,
        };

        webGpu(CK)
          .then((gpuDeviceContext) => {
            setCkGraphics(
              new CkGraphics(CK, fontMgr, typefaces, gpuDeviceContext),
            );
          })
          .catch(() => {
            setCkGraphics(null);
          });
      })
      .catch(() => {
        setCkGraphics(null);
      });
  }, []);

  return ckGraphics ? (
    <CkGraphicsContext.Provider value={ckGraphics}>
      {children}
    </CkGraphicsContext.Provider>
  ) : null;
}
