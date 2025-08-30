// import DashboardLayout from "../components/DashboardLayout";
import FundsTable from "../components/charts/FundsTable";

const FundDetail = () => {
  return (
    <div>
          <h1 className="text-3xl font-thin text-neutral-100">Fund Detail123</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            See stocks, owners and details 
          </h3>
          <div className="space-y-3">
             <div className="lg:col-span-1 card rounded-2xl p-2 bg-white overflow-scroll">
             <FundsTable />
          </div>
          </div>
    </div>
  );
};

export default FundDetail;
