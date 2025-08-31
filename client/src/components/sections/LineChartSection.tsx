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
  latest_performance?: PeerPerformance;
}

const getPeerFunds = async (): Promise<PeerFund[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/peer-funds");
  if (!res.ok) throw new Error("Failed to collect peer funds.");

  const peerFunds: PeerFund[] = await res.json();

  // Pick the most recent performance for each fund
  return peerFunds.map((fund: any) => {
    let latestPerformance: PeerPerformance | undefined;
    if (fund.performances && fund.performances.length > 0) {
      latestPerformance = fund.performances.reduce(
        (latest: PeerPerformance, current: PeerPerformance) =>
          new Date(current.date) > new Date(latest.date) ? current : latest,
        fund.performances[0]
      );
    }

    return {
      peer_fund_id: fund.peer_fund_id,
      name: fund.name,
      strategy: fund.strategy,
      latest_performance: latestPerformance,
    };
  });
};

// Main component
const LineChartSection: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["peerData"],
    queryFn: getPeerFunds,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching peer funds</div>;
  if (!data || data.length === 0) return <div>No peer fund data available</div>;

  // Prepare Chart.js data
  const chartData = {
    labels: data.map((fund) => fund.name), // fund names as labels
    datasets: [
      {
        label: "Return %",
        data: data.map((fund) => fund.latest_performance?.return_percentage ?? 0),
        borderColor: "#fbbf24",
        backgroundColor: "rgba(251, 191, 36, 0.3)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#fbbf24",
        pointRadius: 5,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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
        text: "Peer Performance Comparison",
        color: "#fff",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: { color: "#fff" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: { color: "#fff" },
      },
    },
  };

  return (
    <div>
      <div className="card rounded-2xl p-6 bg-[#0a1f44] shadow-lg h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChartSection;
