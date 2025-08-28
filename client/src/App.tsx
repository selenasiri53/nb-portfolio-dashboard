import "@fontsource/inter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import FundDetailPage from "./pages/FundDetailPage";

function App() {
  return (
    <Router>
      <div className="my-2 mx-2 md:mx-8 lg:mx-16">
        <Header />
        {/* Router */}
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard-detail" element={<FundDetailPage />} />
          <Route path="/peers" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
