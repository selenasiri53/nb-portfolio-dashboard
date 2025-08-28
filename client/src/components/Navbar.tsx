import { LayoutDashboard } from 'lucide-react';
import { TrendingUp } from 'lucide-react'
import { Users } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="lg:w-40px lg:px-2 lg:py-4 min-h-[88vh] bg-neutral-100 rounded-l-4xl space-y-4">
            {/* home page */}
            <div className="hover:text-neutral-700 hover:bg-neutral-200 p-3 rounded-2xl">
                <LayoutDashboard size={28}/>
            </div>
            {/* stocks */}
            <div className="hover:text-neutral-700 hover:bg-neutral-200 p-3 rounded-2xl">
                <TrendingUp size={28} />
            </div>
            {/* peers */}
            <div className="hover:text-neutral-700 hover:bg-neutral-200 p-3 rounded-2xl">
                <Users size={28} />
        </div>
    </div>
  )
}

export default Navbar
