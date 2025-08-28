import DashboardLayout from "../components/DashboardLayout";

const Peers = () => {
  return (
    <DashboardLayout>
        <div>
          <h1 className="text-3xl font-thin text-neutral-100">Peer Comparison Funds</h1>
          <h3 className="text-sm font-thin text-indigo-200 pb-3">
            View your portfolios side by side with peers'.
          </h3>
         
        </div>
    </DashboardLayout>
  );
};

export default Peers;
