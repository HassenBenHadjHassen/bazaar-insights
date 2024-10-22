import { priceFormatUpdate } from "./priceFormatUpdate";
import { BazaarProducts } from "./types";

export const totalItemsCalculated = (items: BazaarProducts[]) => {
  return items.length.toString();
};

export const totalProfitCalculated = (items: BazaarProducts[]): string => {
  return priceFormatUpdate(items.reduce((acc, item) => acc + item.profit, 0));
};
