import { Surface } from 'canvaskit-wasm';
import { createContext, useContext } from 'react';

export const CkSurfaceContext = createContext<Surface>({} as Surface);
export const useCkSurfaceContext = () => useContext(CkSurfaceContext);
