import DashboardLayout from "../components/DashboardLayout";
import LineChartSection from "../components/sections/LineChartSection";
import PieSection from "../components/sections/PieSection";
import QuadraCardSection from "../components/QuadraCardSection";
import FundsTableSection from "../components/sections/FundsTableSection";

const Home = () => {
  return (
    <DashboardLayout>
        <div>
          <h1 className="text-3xl font-thin text-neutral-100">Dashboard</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            Your top stocks increased 12% this week
          </h3>
          <div className="space-y-3">
            <QuadraCardSection />
            <LineChartSection />
            <div className="lg:flex gap-4">
              <PieSection />
              <div className="h-80 rounded-2xl overflow-y-scroll">
                <FundsTableSection />
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default Home;
