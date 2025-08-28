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
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const LineChartComponent = () => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Revenue ($)",
          data: [1200, 1900, 3000, 2500, 3400, 2800, 4000],
          borderColor: "#fbbf24", // amber-400
          backgroundColor: "rgba(251, 191, 36, 0.3)",
          fill: true,
          tension: 0.4, // curve smoothness
          pointBackgroundColor: "#fff",
          pointBorderColor: "#fbbf24",
          pointRadius: 5,
        },
      ],
    };
  
    const options = {
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
          text: "Monthly Revenue",
          color: "#fff",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            color: "#fff",
          },
        },
        y: {
          grid: {
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            color: "#fff",
          },
        },
      },
    };
  
    return (
      <div>
        <div className="card rounded-2xl p-6 bg-[#0a1f44] shadow-lg h-80">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };
  
  export default LineChartComponent;