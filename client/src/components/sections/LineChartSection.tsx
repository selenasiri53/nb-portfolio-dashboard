import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import type { PeerFund } from "../../types/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PeerPerformance {
  performance_id: number;
  date: string;
  net_asset_value: number;
  return_percentage: number;
}

interface PeerFund {
  peer_fund_id: number;
  name: string;
  strategy: string;
  performances: PeerPerformance[];
}

// Fetch all peer funds
const getPeerFunds = async (): Promise<PeerFund[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/peer-funds");
  if (!res.ok) throw new Error("Failed to collect peer funds.");

  const peerFunds: any[] = await res.json();
  return peerFunds.map((fund) => ({
    peer_fund_id: fund.peer_fund_id,
    name: fund.name,
    strategy: fund.strategy,
    performances: fund.performances ?? [],
  }));
};

const colors = [
  "#fbbf24",
  "#34d399",
  "#60a5fa",
  "#f87171",
  "#a78bfa",
  "#fcd34d",
];

const LineChartSection: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["peerData"],
    queryFn: getPeerFunds,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching peer funds</div>;
  if (!data || data.length === 0) return <div>No peer fund data available</div>;

  // Get all unique dates across all funds, sorted ascending
  const allDates = Array.from(
    new Set(data.flatMap((fund) => fund.performances.map((p) => p.date)))
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Build datasets: each fund is a separate line
  const datasets = data.map((fund, index) => {
    const fundData = allDates.map((date) => {
      const perf = fund.performances.find((p) => p.date === date);
      return perf ? perf.return_percentage : null; // null for missing dates
    });

    return {
      label: fund.name,
      data: fundData,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length] + "33", // semi-transparent fill
      fill: false,
      tension: 0.3,
      pointRadius: 4,
    };
  });

  const chartData = {
    labels: allDates,
    datasets: datasets,
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff", font: { size: 14, family: "Inter, sans-serif" } },
      },
      title: {
        display: true,
        text: "Peer Performance Over Time",
        color: "#fff",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.1)" }, ticks: { color: "#fff" } },
      y: { grid: { color: "rgba(255,255,255,0.1)" }, ticks: { color: "#fff" } },
    },
  };

  return (
    <div>
      <div className="card rounded-2xl p-6 bg-[#0a1f44] shadow-lg h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChartSection;
