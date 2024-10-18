export interface BazaarData {
  success: boolean;
  lastUpdated: number;
  products: Products;
}

export interface Products {
  [key: string]: Product;
}

export interface Product {
  product_id: string;
  sell_summary: Summary[];
  buy_summary: Summary[];
  quick_status: QuickStatus;
}

interface QuickStatus {
  productId: string;
  sellPrice: number;
  sellVolume: number;
  sellMovingWeek: number;
  sellOrders: number;
  buyPrice: number;
  buyVolume: number;
  buyMovingWeek: number;
  buyOrders: number;
}

interface Summary {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

interface ItemStats {
  DEFENSE: number;
  HEALTH: number;
}

export interface Item {
  material: string;
  color: string;
  name: string;
  category: string;
  tier: string;
  stats: ItemStats;
  npc_sell_price: number;
  id: string;
  skin: string;
}

export interface Items {
  success: boolean;
  lastUpdated: number;
  items: Item[];
}

export interface BazaarProducts {
  productId: string;
  skin: string;
  productName: string;
  buyPrice: number;
  sellPrice: number;
  buyVolume: number;
  sellVolume: number;
  weekBuyTransactionVolume: number;
  weekSellTransactionVolume: number;
  profit: number;
  profitMargin: number;
}

export interface FilterParams {
  buyPriceFilter: FilterCondition;
  sellPriceFilter: FilterCondition;
  sellVolumeFilter: FilterCondition;
  buyVolumeFilter: FilterCondition;
  weekBuyTransactionVolumeFilter: FilterCondition;
  weekSellTransactionVolumeFilter: FilterCondition;
  profitFilter: FilterCondition;
  profitMarginFilter: FilterCondition;
}

type ComparisonType = "<=" | ">=" | "==";

export interface FilterCondition {
  value: number;
  comparison: ComparisonType;
}
