import { createContext, useContext } from 'react';
import { CkPaintSet } from '@/CkPaintRepository';

type CkPaintContextProps = {
  addColor(color: string): void;
  removeColor(color: string): void;
  getPaintSet(color: string): CkPaintSet;
};

const CkPaintContext = createContext<CkPaintContextProps>(
  {} as CkPaintContextProps,
);
export const useCkPaintContext = () => useContext(CkPaintContext);

export type CkPaintProviderProps = {
  colors: string[];
};

export function CkPaintProvider() {
  return <></>;
}
