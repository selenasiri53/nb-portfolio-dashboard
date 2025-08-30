import FundsTable from "../components/charts/FundsTable";

const Funds = () => {
  return (
    <div>
          <h1 className="text-3xl font-thin text-neutral-100">My Funds</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            Select a fund to see more details and stats.
          </h3>
          <div className="space-y-3">
             <div className="lg:col-span-1 card rounded-2xl p-2 bg-white h-auto overflow-scroll">
             <FundsTable />
          </div>
          </div>
    </div>
  );
};

export default Funds;
