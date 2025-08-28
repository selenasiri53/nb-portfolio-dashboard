import Navbar from './Navbar'

import TrioCardSection from './TrioCardSection';
import LineChartComponent from './LineChartComponent';
import DuoCardSection from './DuoCardSection';

const DashboardContainer = () => {
  return (
    <div className="lg:min-h-[88vh] border-[0.5px] border-neutral-500 rounded-4xl">
      <div className="lg:flex">
        <Navbar />
        {/* Content */}
        <div className="lg:w-full bg-white/15 p-4 py-6 md:px-8 lg:rounded-r-4xl space-y-4">
            <div>
               <h1 className="text-3xl font-thin text-neutral-100">
                Dashboard
                </h1>
                <h3 className="text-sm font-thin text-indigo-200">
                    Your top stocks increased 12% this week
                </h3> 
            </div>
            
            <TrioCardSection />
            <LineChartComponent />
            <DuoCardSection />
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
