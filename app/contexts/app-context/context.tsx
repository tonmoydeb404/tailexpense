import { createContext, useContext } from "react";

export interface IAppContext {
  name: string | null;
  currency: string | null;
  isOnboarded: boolean;
  isLoading: boolean;
  saveData: (props: { name: string; currency: string }) => void;
}

export const defaultValue: IAppContext = {
  name: null,
  currency: null,
  isOnboarded: false,
  isLoading: true,
  saveData: () => {},
};
export const AppContext = createContext(defaultValue);

// ----------------------------------------------------------------------

export const useAppContext = () => {
  const data = useContext(AppContext);
  if (!data) {
    throw new Error("Invalid context access");
  }

  return data;
};