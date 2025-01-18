import { formatISO } from "date-fns";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AppContext, defaultValue, type IAppContext } from "./context";
import { getData, setData } from "./helpers";

type Props = { children: ReactNode };

export const AppContextProvider = (props: Props) => {
  const [name, setName] = useState(defaultValue.name);
  const [currency, setCurrency] = useState(defaultValue.name);
  const [date, setDate] = useState(defaultValue.date);
  const [isOnboarded, setIsOnboarded] = useState(defaultValue.isOnboarded);
  const [isLoading, setIsLoading] = useState(defaultValue.isLoading);

  const loadData = () => {
    try {
      const { name, currency } = getData();

      setName(name);
      setCurrency(currency);

      setIsOnboarded(!name || !currency);
    } catch (error) {
      console.error("Load Data ERROR: ", error);
      setName(null);
      setCurrency(null);
      setIsOnboarded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData: IAppContext["saveData"] = (props) => {
    try {
      const { currency, name } = setData(props.name, props.currency);

      setName(name);
      setCurrency(currency);
    } catch (error) {
      console.error("Save Data Error: ", error);
    }
  };

  const updateDate = (value: string) => {
    setDate(formatISO(value));
  };

  useEffect(() => {
    loadData();
  }, []);

  const value = useMemo<IAppContext>(
    () => ({
      name,
      currency,
      isOnboarded,
      isLoading,
      saveData,
      date,
      updateDate,
    }),
    [name, currency, isOnboarded, isLoading, date]
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
