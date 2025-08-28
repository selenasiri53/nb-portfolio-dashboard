import "@fontsource/inter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Funds from "./pages/Funds";
import Peers from "./pages/Peers";

function App() {
  return (
    <Router>
      <div className="my-2 mx-2 md:mx-8 lg:mx-16">
        <Header />
        {/* Router */}
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard-detail" element={<Funds />} />
          <Route path="/peers" element={<Peers />} />
          {/* default path */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
