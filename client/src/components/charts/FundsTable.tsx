import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from "@mui/joy/Table";
import { Sheet } from "@mui/joy";
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

  const [openFund, setOpenFund] = useState<Fund | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching funds</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Funds Table</h2>
      <Table variant="plain">
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Fund</th>
            <th style={{ width: "20%" }}>Strategy</th>
            <th style={{ width: "20%" }}>Inception Date</th>
            <th style={{ width: "10%" }}>View</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fund) => (
            <tr
              key={fund.fund_id}
              className="cursor-pointer transition-all hover:bg-gray-100"
            >
              <td>{fund.name}</td>
              <td>{fund.strategy}</td>
              <td>{new Date(fund.inception_date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setOpenFund(fund)}>
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Sheet
  sx={{
    position: "fixed",
    right: 0,
    top: 0,
    height: "100%",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 3,
    transform: openFund ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1500,
  }}
>
  {openFund && (
    <>
      <h1 className="text-xl font-bold mb-2">{openFund.name}</h1>
      <p className="mb-1"><strong>Strategy:</strong> {openFund.strategy}</p>
      <p className="mb-2">
        <strong>Inception Date:</strong> {new Date(openFund.inception_date).toLocaleDateString()}
      </p>
      <hr />
      <h3 className="mt-2 mb-1">Performances:</h3>
      <ul>
        {openFund.performances.map((p) => (
          <li key={p.performance_id}>
            {p.date}: NAV ${p.net_asset_value.toLocaleString()} ({p.return_percentage}%)
          </li>
        ))}
      </ul>
      <hr />
      <h3 className="mt-2 mb-1">Holdings:</h3>
      <ul>
        {openFund.holdings.map((h) => (
          <li key={h.holding_id}>
            {h.ticker_symbol}: {h.shares} shares @ ${h.purchase_price}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setOpenFund(null)}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Close
      </button>
    </>
  )}
</Sheet>
    </div>
  );
};

export default FundsTable;
