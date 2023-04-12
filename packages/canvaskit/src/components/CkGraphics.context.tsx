import { createContext, ReactElement, useContext } from 'react';
import useCkGraphics from '@/hooks/useCkGraphics';
import CkGraphics from '@/CkGraphics';

export const CkGraphicsContext = createContext<CkGraphics>({} as CkGraphics);
export const useCkGraphicsContext = () => useContext(CkGraphicsContext);

export function CkGraphicsProvider(props: { children: ReactElement }) {
  const ckGraphics: CkGraphics | null = useCkGraphics();
  const { children } = props;

  return ckGraphics ? (
    <CkGraphicsContext.Provider value={ckGraphics}>{children}</CkGraphicsContext.Provider>
  ) : null;
}
