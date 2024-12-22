import { useMemo } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import useDeviceWidth from "./use-device-width";

const fullConfig = resolveConfig(tailwindConfig);
const breakpoints = fullConfig.theme.screens;
export type Breakpoint = keyof typeof breakpoints;

const useBreakpoint = () => {
  const width = useDeviceWidth();

  const breakpoint = useMemo<Breakpoint>(() => {
    for (const [key, value] of Object.entries(breakpoints)) {
      const minWidth = parseInt(value, 10);

      if (width < minWidth) {
        return key as Breakpoint;
      }
    }
    return "2xl";
  }, [width]);

  return breakpoint;
};

export default useBreakpoint;
