import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ExampleChart } from '@/ExampleChart';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ExampleChart />
    </StrictMode>,
  );
}
