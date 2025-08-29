import FundsTable from '../charts/FundsTable'

const FundsTableSection = () => {
  return (
    <div className="col-span-2 card rounded-2xl p-8 bg-white min-h-80">
    <h2 className="text-neutral-900 text-2xl font-thin mb-4">My Funds</h2>
    <FundsTable />
  </div>
  )
}

export default FundsTableSection
