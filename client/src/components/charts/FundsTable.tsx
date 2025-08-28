import Table from '@mui/joy/Table';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Tech Growth Fund', 159, 6.0, 24, 4.0),
  createData('Safe Bonds Fund', 237, 9.0, 37, 4.3),
  createData('Sales Fund', 262, 16.0, 24, 6.0),
  createData('Meta', 305, 3.7, 67, 4.3),
  createData('Disney', 356, 16.0, 49, 3.9),
];

export default function TableHover() {
  return (
    <Table hoverRow>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Fund(40%)</th>
          <th>Strategy</th>
          <th>Return</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.calories}</td>
            <td>{row.fat}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
