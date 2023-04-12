import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
// import CanvasKitWasm from 'canvaskit-wasm/bin/canvaskit.wasm';
// import * as canvasKitInit from 'canvaskit-wasm/bin/canvaskit.wasm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import CanvasKitInit from 'canvaskit-wasm/bin/canvaskit.js';
// import { Canvas, CanvasKit } from 'canvaskit-wasm';

import useCkGraphics, { fontFetch } from '@/hooks/useCkGraphics';

describe('useCkGraphics', () => {
  it.skip('should fetch roboto', async () => {
    const robotoFetch: Promise<ArrayBuffer> = fontFetch(
      'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
    ).then((response) => {
      console.log({
        'typeof response': typeof response,
        response,
      });
      return response;
    });

    await expect(robotoFetch).resolves.toBeDefined();
  });

  it.skip('should web gpu', async () => {
    //
  });

  it.skip('should init CanvasKit', async () => {
    /* const canvasKit = CanvasKitInit({ locateFile: () => CanvasKitWasm }).then((CK: CanvasKit) => {
      console.log('CanvasKit loaded', !!CK);
      return CK;
    });

    await expect(canvasKit).resolves.toBeDefined(); */
    // await expect(canvasKit).resolves.toBeDefined();
    /* const canvasKitInit: Promise<CanvasKit> = CanvasKitInit({
      locateFile: () => CanvasKitWasm, // `https://unpkg.com/canvaskit-wasm@0.38.0/bin/${ckWasm}`,
    }).then((CK: CanvasKit) => {
      console.log('CanvasKit loaded', !!CK);
      return CK;
    }); */
    /* const canvasKitInit: Promise<CanvasKit> = CanvasKitInit(CanvasKitWasm).then((CK: CanvasKit) => {
      console.log('CanvasKit loaded', !!CK);
      return CK;
    }); */
    // await expect(canvasKitInit).resolves.toBeDefined();
  });

  it.only('should initialize the ckGraphics', async () => {
    const { result } = renderHook(() => useCkGraphics());

    await waitFor(
      () => {
        expect(result.current).toBeDefined();
        console.log('result.current', result.current);
      },
      { timeout: 5000 },
    );
  });
});
