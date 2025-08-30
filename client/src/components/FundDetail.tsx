import { ArrowLeft } from "lucide-react";

const FundDetail = () => {
  return (
    <div className="min-h-screen">
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
          <div className="lg:col-span-1 card rounded-2xl p-2 lg:p-4 bg-white min-h-screen overflow-scroll">
        {/* Card with image and description for each stock */}
        <h1 className="text-lg font-normal text-neutral-900">Holdings</h1>

        {/* holding_id
          fund
          ticker_symbol
          shares
          purchase_price
          purchase_date
          logo_url
        */}
        <h1 className="text-lg font-normal text-neutral-900">Performance</h1>

        {/* fund performance */}
        {/* performance_id
        fund
        date
        net_asset_value
        return_percentage */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;
