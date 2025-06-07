import { useMemo } from "react";
import useDeviceWidth from "./use-device-width";

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
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
