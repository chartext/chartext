/* import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Plot } from '@/plot/Plot.types';

type PlotProviderProps = {
  plot: Plot;
};

type PlotContextProps = PlotProviderProps & {
  setPlot(plot: Plot): void;
};

const PlotContext = createContext<PlotContextProps>({} as PlotContextProps);
export const usePlotContext = () => useContext(PlotContext);

export function PlotProvider(props: PropsWithChildren<PlotProviderProps>) {
  // console.log('PlotProvider', props);
  const { plot, children } = props;

  const [plot, setPlot] = useState<Plot | undefined>(props.plot);

  return (
    <PlotContext.Provider
      value={{
        plot,
        setPlot,
      }}
    >
      {children}
    </PlotContext.Provider>
  );
}
 */
