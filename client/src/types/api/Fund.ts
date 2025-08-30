import type { FundPerformance } from "./FundPerformance";
import type { Holding } from "./Holding";
import type { PortfolioManager } from "./PortfolioManager";

export type Fund = {
    fund_id: number;
    manager: PortfolioManager;
    name: string;
    strategy: string;
    inception_date: string; 
    holdings?: Holding[];
    performances?: FundPerformance[];
  };

