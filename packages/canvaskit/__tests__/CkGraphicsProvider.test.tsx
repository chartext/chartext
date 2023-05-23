import { RenderResult, render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  CkGraphicsProvider,
  useCkGraphics,
} from '@chartext/canvaskit/CkGraphicsProvider';

const graphicsLoadedBody = 'ckGraphics: true';

function CkGraphicsLoaded() {
  const ckGraphics = useCkGraphics();
  const body = `ckGraphics: ${!!ckGraphics.CK}`;
  return <span>{body}</span>;
}

describe('CkGraphicsProvider test', () => {
  it('should initialize CkGraphicsProvider', async () => {
    const renderResult: RenderResult = render(
      <CkGraphicsProvider>
        <CkGraphicsLoaded />
      </CkGraphicsProvider>,
    );

    await waitFor(
      () =>
        expect(renderResult.getByText(graphicsLoadedBody).innerHTML).toEqual(
          graphicsLoadedBody,
        ),
      {
        timeout: 10000,
        onTimeout: (error: Error) => {
          console.error('Timed out: ', error);
          return error;
        },
      },
    );
  });
});
