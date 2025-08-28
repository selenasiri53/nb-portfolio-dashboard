import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="lg:min-h-[88vh] border-[0.5px] border-neutral-500 rounded-4xl">
      <div className="lg:flex">
        <Navbar />
        {/* Content */}
        <div className="lg:w-full bg-white/15 p-4 py-6 md:px-8 lg:rounded-r-4xl space-y-4">
            <div>
               {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
