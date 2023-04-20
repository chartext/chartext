import { useCkGraphics } from '@chartext/canvaskit';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('useCkGraphics', () => {
  it('should initialize the ckGraphics', async () => {
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
