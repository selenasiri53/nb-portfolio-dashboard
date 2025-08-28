import { Pie } from "react-chartjs-2";
import DashboardLayout from "../components/DashboardLayout";
import FundsTable from "../components/charts/FundsTable";
import FundDetail from "../components/FundDetail";

const Funds = () => {
  const data = {
    labels: ["Apple", "Microsoft", "Amazon", "Tesla", "Google"],
    datasets: [
      {
        label: "Fund Allocation",
        data: [25, 20, 15, 10, 30], // Example percentages
        backgroundColor: [
          "#f59e0b", // amber-500
          "#3b82f6", // blue-500
          "#10b981", // emerald-500
          "#ef4444", // red-500
          "#8b5cf6", // violet-500
        ],
        borderColor: "#0a1f44", // deep navy background
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Fund Allocation Across Stocks",
        color: "#fff",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  };
  
  return (
    <DashboardLayout>
        <div>
          <h1 className="text-3xl font-thin text-neutral-100">Funds</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            Select a fund to see more details and stats.
          </h3>
          <div className="space-y-3">
          <div className="lg:grid lg:grid-cols-2 space-x-2">
             <div className="lg:col-span-1 card rounded-2xl p-2 bg-white max-h-64 overflow-scroll">
             <FundsTable />
          </div>
          <div className="card rounded-2xl p-2 bg-[#0a1f44] h-64">
            <Pie data={data} options={options} />
          </div>
          </div>
          {/* bottom-- fund details */}
            <FundDetail />
          </div>
        </div>
    </DashboardLayout>
  );
};

export default Funds;
