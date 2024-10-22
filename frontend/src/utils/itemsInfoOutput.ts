import { BazaarProducts } from "./types";

export const totalItemsCalculated = (items: BazaarProducts[]) => {
  return items.length.toString();
};

export const totalProfitCalculated = (items: BazaarProducts[]): string => {
  return items.reduce((acc, item) => acc + item.profit, 0).toString();
};
