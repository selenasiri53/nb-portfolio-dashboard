import { ArrowLeft } from "lucide-react";

const FundDetail = () => {
  return (
    <div className=" min-h-screen">
      <div className="flex gap-4">
        {/* left */}
        <h1 className="text-3xl font-thin text-neutral-100">Fund Detail</h1>
      </div>

      <div>
        <a href="/funds" className="flex gap-1 items-center text-sm font-thin text-indigo-200 pb-3">
          <ArrowLeft size={18} />
          <h1 className="text-sm font-thin">Return to funds</h1>
        </a>
        <div className="space-y-3">
          <div className="lg:col-span-1 card rounded-2xl p-2 lg:p-4 bg-white min-h-screen overflow-scroll"></div>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;
