import { useQuery } from "@tanstack/react-query";
import Table from "@mui/joy/Table";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/joy";
import { Eye } from "lucide-react";
import { CACHE_TIME, STALE_TIME } from "../../commons/constants";

interface Performance {
  performance_id: number;
  date: string;
  net_asset_value: number;
  return_percentage: number;
}

interface Holding {
  holding_id: number;
  ticker_symbol: string;
  shares: number;
  purchase_price: number;
  purchase_date: string;
}

interface Fund {
  fund_id: number;
  name: string;
  strategy: string;
  inception_date: string;
  performances: Performance[];
  holdings: Holding[];
}

const getFunds = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/portfolio-managers/2");
  if (!res.ok) throw new Error("Could not retrieve funds.");
  const managerData = await res.json();
  return managerData.funds as Fund[];
};

const FundsTable = () => {
  const { data, isLoading, error } = useQuery<Fund[]>({
    queryKey: ["funds"],
    queryFn: getFunds,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching funds</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Funds Table</h2>

      <Table variant="plain">
        <thead>
          <tr>
            <th style={{ width: "33%" }}>Fund</th>
            <th style={{ width: "20%" }}>Strategy</th>
            <th style={{ width: "10%" }}>Inception Date</th>
            {/* <th style={{ width: "10%" }}>View</th> */}
          </tr>
        </thead>
        <tbody>
  {data.map((fund) => (
    <tr key={fund.fund_id} className="hover:bg-gray-100 transition-all">
      <td className="w-2/5">
        <Accordion>
          <AccordionSummary>
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold">{fund.name}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <p><strong>Strategy:</strong> {fund.strategy}</p>
            <p><strong>Inception:</strong> {new Date(fund.inception_date).toLocaleDateString()}</p>
            <h3 className="font-semibold mt-2 mb-1">Performances:</h3>
            <ul>
              {fund.performances.map((p) => (
                <li key={p.performance_id}>
                  {p.date}: NAV ${p.net_asset_value.toLocaleString()} ({p.return_percentage}%)
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mt-2 mb-1">Holdings:</h3>
            <ul>
              {fund.holdings.map((h) => (
                <li key={h.holding_id}>
                  {h.ticker_symbol}: {h.shares} shares @ ${h.purchase_price}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </td>
      <td className="w-1/3">{fund.strategy}</td>
      <td className="w-1/3">{new Date(fund.inception_date).toLocaleDateString()}</td>
    </tr>
  ))}
</tbody>

      </Table>
    </div>
  );
};

export default FundsTable;
