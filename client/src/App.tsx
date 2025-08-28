// import { useState, useEffect } from "react";
import DashboardContainer from "./components/DashboardContainer";
import Header from "./components/Header"

// interface FundsData {
//   funds: string[];
// }

function App() {
  // const [data, setData] = useState<FundsData>({ funds: [] });
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   fetch("/funds")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       return res.json() as Promise<FundsData>; // type the JSON
  //     })
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching funds:", err);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="my-2 mx-2 md:mx-8 lg:mx-32">
      {/* {data.funds.length === 0 ? (
        <p>No funds available</p>
      ) : (
        data.funds.map((fund, i) => (
          <p key={i} className="mb-2 text-blue-600 font-medium">
            {fund}
          </p>
        ))
      )} */}
      <Header />
      <DashboardContainer />
    </div>
  );
}

export default App;
