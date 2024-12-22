import { useMemo } from "react";
import type { Breakpoint } from "./use-breakpoint";
import useBreakpoint from "./use-breakpoint";

type Value = Partial<Record<Breakpoint, string | number>>;

const breakpointsOrder: Breakpoint[] = ["sm", "md", "lg", "xl", "2xl"]; // Define your breakpoint order here

const useResponsiveValue = (values: Value, def?: string | number) => {
  const breakpoint = useBreakpoint();

  const resolvedValue = useMemo(() => {
    const currentIndex = breakpointsOrder.indexOf(breakpoint);

    if (currentIndex === -1) return def;

    // Traverse backward from the current breakpoint to find the closest available value
    for (let i = currentIndex; i >= 0; i--) {
      const key = breakpointsOrder[i];
      if (values[key] !== undefined) return values[key];
    }

    // Traverse forward if no match was found backward
    for (let i = currentIndex + 1; i < breakpointsOrder.length; i++) {
      const key = breakpointsOrder[i];
      if (values[key] !== undefined) return values[key];
    }

    return def; // Fallback to default if no value is found
  }, [breakpoint, values, def]);

  return resolvedValue;
};

export default useResponsiveValue;
