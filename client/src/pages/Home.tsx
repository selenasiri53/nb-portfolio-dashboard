// import PieSection from "../components/sections/PieSection";
import BarChartSection from "../components/sections/BarChartSection";
import LineChartSection from "../components/sections/LineChartSection";
import FundsTableSection from "../components/sections/FundsTableSection";

const Home = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-thin text-neutral-100">
          Dashboard Analytics
        </h1>
        <h3 className="text-sm font-thin text-indigo-200 pb-3">
          See performances of similar funds
        </h3>
        <div className="space-y-3">
          <div className="lg:grid lg:grid-cols-3 space-y-3 lg:space-y-0 gap-4"> 
            <div className="lg:col-span-3"> 
              <LineChartSection />
            </div>
          </div>
          {/* Section 2 */}
          <div>
            <h1 className="text-2xl font-thin text-neutral-100">
              My Fund Comparison
            </h1>
            <h3 className="text-sm font-thin text-indigo-200">
              See how your funds compare side by side.
            </h3>
          </div>
          <BarChartSection />
          {/* Section 3 */}
          <div>
            <h1 className="text-2xl font-thin text-neutral-100">
              My Funds
            </h1>
            <h3 className="text-sm font-thin text-indigo-200">
              View details for each fund
            </h3>
          </div>
          <div className="overflow-y-scroll">
          <div className="space-y-3 lg:space-y-0 gap-4">
            <div className="rounded-2xl">
            <FundsTableSection />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
