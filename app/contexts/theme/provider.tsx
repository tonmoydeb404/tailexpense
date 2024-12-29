import React, { useEffect, useState } from "react";
import { ThemeContext } from "./context";
import { getStoredTheme, setStoredTheme } from "./helpers";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await getStoredTheme();
      setTheme(storedTheme);
    };
    fetchTheme();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleSetTheme = async (newTheme: string) => {
    await setStoredTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
