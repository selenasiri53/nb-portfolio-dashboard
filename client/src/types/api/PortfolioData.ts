import type { Fund } from "./Fund";
import type { FundPerformance } from "./FundPerformance";
import type { Holding } from "./Holding";
import type { PeerFund } from "./PeerFund";
import type { PeerPerformance } from "./PeerPerformance";
import type { PortfolioManager } from "./PortfolioManager";
import type { StockPrice } from "./StockPrice";

export type PortfolioData = {
    managers: PortfolioManager[];
    funds: Fund[];
    holdings: Holding[];
    stockPrices: StockPrice[];
    fundPerformances: FundPerformance[];
    peerFunds: PeerFund[];
    peerPerformances: PeerPerformance[];
  };