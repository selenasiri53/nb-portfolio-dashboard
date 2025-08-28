import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
  } from "chart.js";
  import { Pie } from "react-chartjs-2";
  
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  
  const PieChartComponent = () => {
    const data = {
      labels: ["Apple", "Microsoft", "Amazon", "Tesla", "Google"],
      datasets: [
        {
          label: "Fund Allocation",
          data: [25, 20, 15, 10, 30], // Percentage allocation
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
      <div className="p-4">
        <div className="card rounded-2xl p-6 bg-[#0a1f44] shadow-lg h-80">
          <Pie data={data} options={options} />
        </div>
      </div>
    );
  };
  
  export default PieChartComponent;
  