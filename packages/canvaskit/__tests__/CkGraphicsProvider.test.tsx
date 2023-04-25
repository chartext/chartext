import { CkGraphicsProvider } from '@/CkGraphicsProvider';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

function CkGraphicsLoaded() {
  return <span>CkGraphics loaded</span>;
}

describe('CkGraphicsProvider test', () => {
  it('should initialize ckGraphics', async () => {
    const { getByText } = render(
      <CkGraphicsProvider>
        <CkGraphicsLoaded />
      </CkGraphicsProvider>,
    );

    await waitFor(() => expect(getByText('CkGraphics loaded')).toBeInTheDocument());
  });
});
