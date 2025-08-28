import TrioCardSection from "../components/TrioCardSection";
// import LineChartComponent from "../components/LineChartComponent";
// import DuoCardSection from "../components/DuoCardSection";

import DashboardLayout from "../components/DashboardLayout";

const DashboardContainer = () => {
  return (
    <DashboardLayout>
        <div>
          <h1 className="text-3xl font-thin text-neutral-100">Fund Detail</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            Your top stocks increased 12% this week
          </h3>
          <div className="space-y-3">
          <TrioCardSection />
          {/* <LineChartComponent />
          <DuoCardSection /> */}
          </div>
        </div>
    </DashboardLayout>
  );
};

export default DashboardContainer;
