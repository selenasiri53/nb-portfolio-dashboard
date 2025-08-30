import type { PeerPerformance } from "./PeerPerformance";

export type PeerFund = {
    peer_fund_id: number;
    name: string;
    strategy: string;
    performances?: PeerPerformance[];
  };

