import "@fontsource/inter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Funds from "./pages/Funds";
import Peers from "./pages/Peers";
import FundDetail from "./components/FundDetail";
import Navbar from "./components/Navbar";
// import axios from "axios";
// import { useEffect, useState } from "react";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/api/hello/")
  //     .then((res) => setMessage(res.data.message))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <Router>
      <div className="my-2 mx-2 md:mx-8 lg:mx-16">
      {/* <h1 className="text-white">{message}</h1> */}
        <Header />
        {/* Router */}

        <div className="lg:min-h-[88vh] border-[0.5px] border-neutral-500 rounded-4xl">
      <div className="lg:flex">
        {/* desktop */}
        <div className="hidden lg:block">
          <Navbar />
        </div>
        
        {/* Content */}
        <div className="lg:w-full bg-white/15 rounded-l-4xl lg:rounded-l-none rounded-r-4xl p-2 py-6 md:px-8 lg:rounded-r-4xl space-y-4">
           
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/fund/:fundId" element={<FundDetail />} />
          <Route path="/peers" element={<Peers />} />
          
          {/* default path */}
          <Route path="*" element={<Home />} />
        </Routes>
        </div>
        </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
