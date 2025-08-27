import { useState, useEffect } from "react";

interface FundsData {
  funds: string[];
}

function App() {
  const [data, setData] = useState<FundsData>({ funds: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/funds")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json() as Promise<FundsData>; // type the JSON
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching funds:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      {data.funds.length === 0 ? (
        <p>No funds available</p>
      ) : (
        data.funds.map((fund, i) => (
          <p key={i} className="mb-2 text-blue-600 font-medium">
            {fund}
          </p>
        ))
      )}
      <h1 className="text-red-500">Hello world</h1>
    </div>
  );
}

export default App;
