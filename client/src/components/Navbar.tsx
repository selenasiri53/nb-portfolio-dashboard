import { Link } from "react-router-dom";
import { LayoutDashboard, TrendingUp, Users } from "lucide-react";

const Navbar = () => {
  return (
    <div className="lg:w-40px lg:px-2 lg:py-4 min-h-[88vh] bg-neutral-100 rounded-l-4xl space-y-4">
      {/* Dashboard (Funds) */}
      <Link
        to="/dashboard"
        className="hover:bg-neutral-200 p-3 rounded-2xl flex justify-center items-center"
      >
        <LayoutDashboard size={28} />
      </Link>
      {/* Fund detail */}
      <Link
        to="/dashboard-detail"
        className="hover:bg-neutral-200 p-3 rounded-2xl flex justify-center items-center"
      >
        <TrendingUp size={28} />
      </Link>
      {/* Peer comparison */}
      <Link
        to="/peers"
        className="hover:bg-neutral-200 p-3 rounded-2xl flex justify-center items-center"
      >
        <Users size={28} />
      </Link>
    </div>
  );
};

export default Navbar;
