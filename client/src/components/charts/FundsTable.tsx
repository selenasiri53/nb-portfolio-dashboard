import { useQuery } from "@tanstack/react-query";
import Table from "@mui/joy/Table";
import { Eye } from "lucide-react";
import { CACHE_TIME, STALE_TIME } from "../../commons/constants";

interface Fund {
  fund_id: number;
  name: string;
  strategy: string;
  inception_date: string;
  manager: number;
}

const getFunds = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/funds");
  if (!res.ok) throw new Error("Could not retrieve funds.");
  return res.json();
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
      <Table
        variant="plain"
      >
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Fund</th>
            <th style={{ width: "20%" }}>Strategy</th>
            <th style={{ width: "20%" }}>Inception Date</th>
            <th style={{ width: "15%" }}>Manager</th>
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
              <td>{fund.manager}</td>
              <td>
                <a href={`/fund-detail/${fund.fund_id}`}>
                  <Eye size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FundsTable;
