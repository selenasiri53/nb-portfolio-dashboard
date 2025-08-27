import { House } from 'lucide-react';
import { TrendingUp } from 'lucide-react'
import TrioCardSection from './TrioCardSection';
import LineChartComponent from './LineChartComponent';
import DuoCardSection from './DuoCardSection';

const DashboardContainer = () => {
  return (
    <div className="my-4 mx-2 md:mx-8 lg:mx-32 lg:min-h-screen border-[0.5px] border-neutral-500 rounded-4xl">
      <div className="lg:flex">
        {/* Navbar */}
        <div className="lg:w-40px lg:px-4 lg:py-16 min-h-screen bg-white rounded-l-4xl space-y-8">
            {/* home page */}
            <div className="hover:text-neutral-700">
                <House size={28}/>
            </div>
            {/* stocks */}
            <div className="hover:text-neutral-700">
                <TrendingUp size={28} />
            </div>
        </div>
        {/* Content 11/12 of width */}
        <div className="lg:w-full bg-white/25 p-4 md:p-8 lg:p-16 lg:rounded-r-4xl space-y-4">
            <TrioCardSection />
            <LineChartComponent />
            <DuoCardSection />
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
