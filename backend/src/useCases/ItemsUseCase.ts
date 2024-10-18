import { injectable } from "inversify";
import {
  BazaarData,
  BazaarProducts,
  FilterCondition,
  FilterParams,
  Item,
  Items,
  Products,
} from "../types/ItemTypes";
import axios from "../utils/axios";

@injectable()
export class ItemsUseCase {
  private ITEMS_API_ENDPOINT = "/v2/resources/skyblock/items";
  private BAZAAE_API_ENDPOINT = "/v2/skyblock/bazaar";

  private async fetchItems(): Promise<Item[] | null> {
    try {
      const itemsResponse = await axios.get<Items>(this.ITEMS_API_ENDPOINT);
      return itemsResponse.data.items;
    } catch (error) {
      console.error("Unexpected error:", error);
      return null;
    }
  }

  private async fetchBazaarData(): Promise<Products | null> {
    try {
      const bazaarResponse = await axios.get<BazaarData>(
        this.BAZAAE_API_ENDPOINT
      );
      return bazaarResponse.data.products;
    } catch (error) {
      console.error("Unexpected error:", error);
      return null;
    }
  }

  private async extractItemNames(
    bazaarData: Products
  ): Promise<Map<string, string> | null> {
    const items = await this.fetchItems();
    if (!items) return null;

    const validProductIds = new Set(Object.keys(bazaarData));
    const result = new Map<string, string>();

    for (const item of items) {
      if (validProductIds.has(item.id)) {
        result.set(item.id, item.name);
      }
    }

    return result;
  }

  private formatEnchanted(input: string): string {
    return input
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\bEnchantment\b/i, "Enchanted");
  }

  private async getBazaarProducts(): Promise<BazaarProducts[] | null> {
    const bazaarData = await this.fetchBazaarData();
    if (!bazaarData) return null;

    const itemNames = await this.extractItemNames(bazaarData);
    if (!itemNames) return null;

    const result: BazaarProducts[] = [];

    for (const [productId, product] of Object.entries(bazaarData)) {
      const buyPrice = product.sell_summary[0]?.pricePerUnit ?? 0;
      const sellPrice = product.buy_summary[0]?.pricePerUnit ?? 0;
      const profit = sellPrice - buyPrice;
      const profitMargin = sellPrice !== 0 ? (profit / sellPrice) * 100 : 0;

      result.push({
        productId,
        skin: `https://skykings.net/item-images/${productId}`,
        productName:
          itemNames.get(productId) ??
          this.formatEnchanted(productId) ??
          "Undefined",
        buyPrice: +buyPrice.toFixed(1),
        sellPrice: +sellPrice.toFixed(1),
        buyVolume: product.quick_status.sellVolume,
        sellVolume: product.quick_status.buyVolume,
        weekBuyTransactionVolume: product.quick_status.buyMovingWeek,
        weekSellTransactionVolume: product.quick_status.sellMovingWeek,
        profit: +profit.toFixed(1),
        profitMargin: +profitMargin.toFixed(2),
      });
    }

    return result;
  }

  private compareValues(
    productValue: number,
    filterCondition: FilterCondition
  ): boolean {
    switch (filterCondition.comparison) {
      case "<=":
        return productValue <= filterCondition.value;
      case ">=":
        return productValue >= filterCondition.value;
      case "==":
        return Math.abs(productValue - filterCondition.value) < Number.EPSILON;
      default:
        return true;
    }
  }

  public async getFilteredBazaarProducts(
    filters: FilterParams
  ): Promise<BazaarProducts[] | null> {
    const products = await this.getBazaarProducts();
    if (!products) return null;

    return products.filter(
      (product) =>
        this.compareValues(product.buyPrice, filters.buyPriceFilter) &&
        this.compareValues(product.sellPrice, filters.sellPriceFilter) &&
        this.compareValues(product.sellVolume, filters.sellVolumeFilter) &&
        this.compareValues(product.buyVolume, filters.buyVolumeFilter) &&
        this.compareValues(
          product.weekBuyTransactionVolume,
          filters.weekBuyTransactionVolumeFilter
        ) &&
        this.compareValues(
          product.weekSellTransactionVolume,
          filters.weekSellTransactionVolumeFilter
        ) &&
        this.compareValues(product.profit, filters.profitFilter) &&
        this.compareValues(product.profitMargin, filters.profitMarginFilter)
    );
  }
}
