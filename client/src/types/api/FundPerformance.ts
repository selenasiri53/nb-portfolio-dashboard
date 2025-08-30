import type { Fund } from "./Fund";

export type FundPerformance = {
    performance_id: number;
    fund: Fund;
    date: string; 
    net_asset_value: number;
    return_percentage: number;
  };
