import { createContext, useContext } from 'react';
import { Surface } from 'canvaskit-wasm';

export const CkSurfaceContext = createContext<Surface>({} as Surface);
export const useCkSurfaceContext = () => useContext(CkSurfaceContext);
