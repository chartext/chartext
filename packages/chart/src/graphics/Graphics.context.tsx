import { createContext, useContext } from 'react';
import { Graphics } from '@/graphics/Graphics';

export const GraphicsContext = createContext<Graphics>({} as Graphics);
export const useGraphicsContext = () => useContext(GraphicsContext);
