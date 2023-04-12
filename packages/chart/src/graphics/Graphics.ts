import { PropsWithChildren, ReactElement } from 'react';
import { Instance as Color } from 'tinycolor2';

export type SurfaceProps = {
  height: number;
  width: number;
  scale?: number;
  zIndex?: number;
};

export type Graphics = {
  surface(props: PropsWithChildren<SurfaceProps>): ReactElement<SurfaceProps>;
};

export type ChartCanvas = {
  clear(color?: Color): void;
};
