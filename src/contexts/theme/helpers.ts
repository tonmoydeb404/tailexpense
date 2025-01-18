export const getStoredTheme = async () => {
  const theme = localStorage.getItem("APP_THEME");
  return theme || "light";
};

export const setStoredTheme = async (theme: string) => {
  localStorage.setItem("APP_THEME", theme);

  return getStoredTheme();
};
