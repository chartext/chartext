import CanvasKitInit, { CanvasKit, FontMgr, Typeface } from 'canvaskit-wasm';
import { useEffect, useState } from 'react';
import { CkGraphics } from '@/CkGraphics';

export async function fontFetch(url: string): Promise<ArrayBuffer> {
  return fetch(url).then((response) => response.arrayBuffer());
}

export async function webGpu(CK: CanvasKit) {
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
    console.log('webGpu', ex);
  }
  return undefined;
}

export async function initCanvasKit(): Promise<CanvasKit> {
  return CanvasKitInit({
    locateFile: (file: string) => `https://unpkg.com/canvaskit-wasm@0.38.0/bin/${file}`,
    // locateFile: () => CanvasKitWasm as string,
  }).then((CK: CanvasKit) => CK);
}

export function useCkGraphics(): CkGraphics | null {
  const [ckGraphics, setCkGraphics] = useState<CkGraphics | null>(null);

  useEffect(() => {
    const fontFetchPromise = fontFetch(
      'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
    );
    const canvasKitInit: Promise<CanvasKit> = initCanvasKit();

    Promise.all([canvasKitInit, fontFetchPromise])
      .then(([CK, fontData]: [CanvasKit, ArrayBuffer]) => {
        const fontMgr: FontMgr | null = CK.FontMgr.FromData(fontData);
        const robotoTypeface: Typeface | null = CK.Typeface.MakeFreeTypeFaceFromData(fontData);

        if (!fontMgr || !robotoTypeface) {
          throw new Error('Failed to load font.');
        }

        const typefaces = {
          roboto: robotoTypeface,
        };

        webGpu(CK)
          .then((gpuDeviceContext) => {
            setCkGraphics(new CkGraphics(CK, fontMgr, typefaces, gpuDeviceContext));
          })
          .catch(() => {
            setCkGraphics(null);
          });
      })
      .catch(() => {
        setCkGraphics(null);
      });
  }, []);

  return ckGraphics;
}
