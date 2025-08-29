import Table from '@mui/joy/Table';
import { useState } from 'react';
import { Eye } from 'lucide-react';

function createData(fund: string, strategy: string, fundReturn: string) {
  return { fund, strategy, fundReturn };
}

const rows = [
  createData('Tech Growth Fund', 'Focus on Tech', '5.00%'),
  createData('Safe Bonds Fund', 'Government Bonds', '3.50%'),
  createData('Sales Fund', 'Revenue Growth', '4.20%'),
  createData('Energy Fund', 'Focus on Energy', '6.10%'),
  createData('Healthcare Fund', 'Healthcare Sector', '4.75%'),
  createData('Tech Growth Fund', 'Focus on Tech', '5.00%'),
  createData('Safe Bonds Fund', 'Government Bonds', '3.50%'),
  createData('Sales Fund', 'Revenue Growth', '4.20%'),
  createData('Energy Fund', 'Focus on Energy', '6.10%'),
  createData('Healthcare Fund', 'Healthcare Sector', '4.75%'),
  createData('Tech Growth Fund', 'Focus on Tech', '5.00%'),
  createData('Safe Bonds Fund', 'Government Bonds', '3.50%'),
  createData('Sales Fund', 'Revenue Growth', '4.20%'),
  createData('Energy Fund', 'Focus on Energy', '6.10%'),
  createData('Healthcare Fund', 'Healthcare Sector', '4.75%'),
];

export default function TableHover() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (fund: string) => {
    setSelected((prev) =>
      prev.includes(fund) ? prev.filter((f) => f !== fund) : [...prev, fund]
    );
  };

  return (
    <Table className="bg-white overflow-scroll">
      <thead>
        <tr>
          <th style={{ width: '50%' }}>Fund</th>
          <th  style={{ width: '25%' }}>Strategy</th>
          <th  style={{ width: '20%' }}>Return</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const isSelected = selected.includes(row.fund);

          return (
            <tr
              key={row.fund}
              onClick={() => toggleSelect(row.fund)}
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
              <td>{row.fund}</td>
              <td>{row.strategy}</td>
              <td>{row.fundReturn}</td>
              <td>
              <a
                href="/fund-detail">
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
