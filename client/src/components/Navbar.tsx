import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import Tooltip from "@mui/joy/Tooltip";

const Navbar = () => {
  return (
    <div className="lg:w-40px lg:px-2 lg:py-4 min-h-full bg-neutral-100 rounded-l-4xl space-y-4 flex flex-col items-center">
      {/* Dashboard */}
      <Tooltip title="Dashboard" placement="bottom" variant="soft">
        <Link
          to="/dashboard"
          className="hover:bg-neutral-200 p-3 rounded-2xl flex justify-center items-center"
        >
          <LayoutDashboard size={24} />
        </Link>
      </Tooltip>
    </div>
  );
};

export default Navbar;
