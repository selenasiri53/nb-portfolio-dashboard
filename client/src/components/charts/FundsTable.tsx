import Table from '@mui/joy/Table';
import { useState } from 'react';
import { Eye } from 'lucide-react';

type Fund = {
  fund_id: string; 
  name: string;
  strategy: string;
  manager: string;
  inception_date: string;
}

// new React + Tanstack
import { useQuery } from '@tanstack/react-query'

const fetchFunds = async () => {
  const res = await fetch('localhost:8000/portfolio/funds');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json(); 
};

export default function TableHover() {
  const { data: funds, isLoading, error } = useQuery<Fund[], Error>({
    queryKey: ['funds'],
    queryFn: fetchFunds,
  });

  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (fundName: string) => {
    setSelected((prev) =>
      prev.includes(fundName) ? prev.filter((f) => f !== fundName) : [...prev, fundName]
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching funds</div>;
  if (!funds || funds.length === 0) return <div>No funds available</div>

  return (
    <Table className="bg-white overflow-scroll">
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Fund</th>
          <th  style={{ width: '20%' }}>Strategy</th>
          <th  style={{ width: '20%' }}>Manager</th>
          <th  style={{ width: '20%' }}>Inception Date</th>
        </tr>
      </thead>
      <tbody>
        {funds?.map((fund: Fund) => {
          const isSelected = selected.includes(fund.fund_id);

          return (
            <tr
              key={fund.fund_id}
              onClick={() => toggleSelect(fund.fund_id)}
              className={`
                cursor-pointer
                transition-all
                ${
                  isSelected
                    ? 'bg-teal-100 rounded-2xl' // selected style
                    : 'hover:bg-teal-50 hover:rounded-2xl' // hover style
                }
              `}
            >
              <td>{fund.name}</td>
              <td>{fund.strategy}</td>
              <td>{fund.manager}</td>
              <td>{fund.inception_date}</td>
              <td>
              <a
                href="/fund-detail">
                  {/* href="/fund-detail/${fund.fund_id}" */}
                <Eye size={18} />
              </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
