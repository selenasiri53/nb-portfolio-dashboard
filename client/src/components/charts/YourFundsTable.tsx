import Table from '@mui/joy/Table';
import { useFunds } from '../../hooks/useFunds'; 
import type { Fund } from '../../types/api';
import { Eye } from 'lucide-react';

export default function YourFundsTable() {

  const { data, isLoading, error } = useFunds(); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching funds</div>;
  if (!data || !data.managers || data.managers.length === 0) return <div>No data available</div>

  const [firstManager] = data.managers;

  return (
    <Table className="bg-white overflow-scroll">
      <thead>
        <tr>
          <th style={{ width: '45%' }}>Fund</th>
          <th style={{ width: '25%' }}>Strategy</th>
          <th style={{ width: '23%' }}>Inception Date</th>
        </tr>
      </thead>
      <tbody>
        {firstManager?.funds.map((fund: Fund) => (
          <tr key={fund.fund_id} className="cursor-pointer transition-all">
            <td>{fund.name}</td>
            <td>{fund.strategy}</td>
            <td>{fund.inception_date}</td>
            <td>
              <a href={`/fund-detail/${fund.fund_id}`}>
                <Eye size={18} />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
