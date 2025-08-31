import { useQuery } from "@tanstack/react-query";

const getPeerFunds = async() => {
  const res = await fetch('http://127.0.0.1:8000/api/peer-funds');
  if (!res.ok) throw new Error('Failed to collect stock prices.');
  return res.json(); 

  const data = await res.json();
  console.log('Fetched peer data', data)
  return data;
}

const PeerDataChart = () => {
  const { data } = useQuery({
    queryKey: ["peerData"],
    queryFn: getPeerFunds,
  })

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default PeerDataChart;


// import { Line } from "react-chartjs-2";
// import { usePeerFunds } from "../../hooks/usePeerFunds";
// import type { PeerFund } from "../../types/api";
// // import { useQuery } from "@tanstack/react-query";

// const LineChartSection = () => {
//   const { data, isLoading, error } = usePeerFunds();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching peer funds</div>;
//   if (!data || !data.managers || data.managers.length === 0) return <div>No data available</div>;

//   // Filter peerFunds for manager with ID 1
// const managerId = 1;
// const managerPeerFunds: PeerFund[] = data.peerFunds.filter(
//   (pf: any) => pf.managerId === managerId
// );

// // Prepare labels (fund names) and dataset values (return_percentage)
// const labels = managerPeerFunds.map((pf) => pf.name);

// // Use the first performance entry for each peer fund (or pick the latest)
// const datasetValues = managerPeerFunds.map((pf) => {
//   if (pf.performances && pf.performances.length > 0) {
//     return pf.performances[0].return_percentage; // or use .at(-1) for latest
//   }
//   return 0; // fallback if no performances
// });

// // Chart data
// const chartData = {
//   labels,
//   datasets: [
//     {
//       label: "Return %",
//       data: datasetValues,
//       borderColor: "#fbbf24",
//       backgroundColor: "rgba(251, 191, 36, 0.3)",
//       fill: true,
//       tension: 0.4,
//       pointBackgroundColor: "#fff",
//       pointBorderColor: "#fbbf24",
//       pointRadius: 5,
//     },
//   ],
// };


//   const options: any = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: "#fff",
//           font: {
//             size: 14,
//             family: "Inter, sans-serif",
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: "Peer Performance Comparison",
//         color: "#fff",
//         font: {
//           size: 18,
//           weight: "bold",
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: { color: "rgba(255,255,255,0.1)" },
//         ticks: { color: "#fff" },
//       },
//       y: {
//         grid: { color: "rgba(255,255,255,0.1)" },
//         ticks: { color: "#fff" },
//       },
//     },
//   };

//   return (
//     <div>
//       <div className="card rounded-2xl p-6 bg-[#0a1f44] shadow-lg h-80">
//         <Line data={chartData} options={options} />
//       </div>
//     </div>
//   );
// };


// export default LineChartSection;