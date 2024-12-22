import { useEffect, useState } from "react";

const useDeviceWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

export default useDeviceWidth;
