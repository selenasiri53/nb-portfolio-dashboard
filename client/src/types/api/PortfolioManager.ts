import type { Fund } from "./Fund";

export type PortfolioManager = {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    department?: string | null;
    funds_managed: number;
    funds?: Fund[]; // related_name="funds"
  };

