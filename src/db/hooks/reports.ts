import useSWR from "swr";
import {
  getCategoryStats,
  getExpenseStats,
  getStats,
  getYearlyStats,
} from "../services/reports";

export const useStats = (date: string) => {
  return useSWR(date ? `stats/${date}` : null, () => getStats(date));
};

export const useCategoryStats = (month: string) => {
  return useSWR(month ? `stats/category/${month}` : null, () =>
    getCategoryStats(month)
  );
};

export const useYearlyStats = (year: number) => {
  return useSWR(year ? `stats/year/${year}` : null, () => getYearlyStats(year));
};

export const useExpenseStats = (start: string) => {
  return useSWR(start ? `stats/expense/${start}` : null, () =>
    getExpenseStats(start)
  );
};
