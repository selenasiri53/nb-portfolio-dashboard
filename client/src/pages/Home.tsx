import PieSection from "../components/sections/PieSection";
// import QuadraCardSection from "../components/QuadraCardSection";
import FundsTableSection from "../components/sections/FundsTableSection";
import BarChartSection from "../components/sections/BarChartSection"
import { useState } from "react";
import type { Fund } from "../types/api";

const Home = () => {
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  return (
    <div>
        <div>
          <h1 className="text-2xl font-thin text-neutral-100">Dashboard Analytics</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            Your top stocks increased 12% this week
          </h3>
          <div className="space-y-3">
            {/* <QuadraCardSection /> */}
            <div className="lg:flex space-y-3 lg:space-y-0 gap-4">
              <PieSection selectedFund={selectedFund} />
              <div className="h-80 rounded-2xl overflow-y-scroll">
                <FundsTableSection 
                selectedFund={selectedFund} 
                onSelectFund={setSelectedFund}
                />
              </div>
            </div>
            {/* Section 2 */}
            <div>
              <h1 className="text-2xl font-thin text-neutral-100">Your Fund Comparison</h1>
            <h3 className="text-sm font-thin text-indigo-200">
            See how your funds compare side by side.
          </h3>
            </div>
            
            <BarChartSection />
          </div>
        </div>
    </div>
  );
};

export default Home;
