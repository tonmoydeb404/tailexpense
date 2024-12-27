import countries from "~/data/countries.json";

const nameKey = "TAILEXPENSE_APP_NAME";
const currencyKey = "TAILEXPENSE_APP_CURRENCY";

export const getData = () => {
  const name = localStorage.getItem(nameKey);
  let currency = localStorage.getItem(currencyKey);

  if (countries.findIndex((item) => item.currency === currency) === -1) {
    currency = null;
  }

  return { name: name || null, currency };
};

export const setData = (nameData: string, currencyData: string) => {
  localStorage.setItem(nameKey, nameData);
  localStorage.setItem(currencyKey, currencyData);

  return getData();
};
