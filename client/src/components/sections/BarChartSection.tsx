import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Performance {
  performance_id: number;
  date: string;
  net_asset_value: number;
  return_percentage: number;
}

interface Fund {
  fund_id: number;
  name: string;
  strategy: string;
  inception_date: string;
  performances: Performance[];
}

// Fetch all funds for manager 2
const getFunds = async (): Promise<Fund[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/portfolio-managers/2");
  if (!res.ok) throw new Error("Failed to collect funds.");

  const managerData = await res.json();
  return managerData.funds; // the funds array is inside the manager object
};

const BasicChart: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fundData"],
    queryFn: getFunds,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching funds</div>;
  if (!data || data.length === 0) return <div>No fund data available</div>;

  // Extract labels (fund names) and latest net_asset_value
  const labels = data.map(fund => fund.name);
  const navData = data.map(fund => {
    if (fund.performances && fund.performances.length > 0) {
      // Get the latest performance by date
      const latestPerf = fund.performances.reduce((latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest
      );
      return latestPerf.net_asset_value;
    }
    return 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Net Asset Value",
        data: navData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#fff" } },
      title: { display: true, text: "Funds NAV", color: "#fff" },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return (
    <div className="bg-blue-950 p-4 rounded-xl shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BasicChart;
