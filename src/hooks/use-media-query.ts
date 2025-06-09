import { useEffect, useState } from "react";

function useMediaQuery(query: string): boolean {
  // On SSR the window is undefined, so default to false
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Listen for changes
    mql.addEventListener("change", onChange);

    // Sync in case something changed between render & effect
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
