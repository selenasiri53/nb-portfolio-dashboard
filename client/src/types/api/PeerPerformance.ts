import type { PeerFund } from "./PeerFund";

export type PeerPerformance = {
    performance_id: number;
    peer_fund: PeerFund;
    date: string; 
    net_asset_value: number;
    return_percentage: number;
  };

