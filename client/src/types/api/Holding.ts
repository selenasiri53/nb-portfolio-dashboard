import type { Fund } from "./Fund";
import type { StockPrice } from "./StockPrice";

export type Holding = {
    holding_id: number;
    fund: Fund;
    ticker_symbol: string;
    shares: number;
    purchase_price: number;
    purchase_date: string; // ISO date
    logo_url?: string | null;
    stockPrices?: StockPrice[];
  };

