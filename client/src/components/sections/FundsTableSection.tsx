import YourFundsTable from '../charts/YourFundsTable'
import {useState} from 'react'

const FundsTableSection = () => {
  const [selectedFund, setSelectedFund] = useState<number | null>(null); // store selected fund_id

  return (
    <div className="col-span-2 card rounded-2xl p-4 bg-white">
    <h2 className="text-neutral-900 text-2xl font-thin mb-2">Your Funds</h2>
    <YourFundsTable 
    selectedFund={selectedFund} 
    setSelectedFund={setSelectedFund} 
    />
  </div>
  )
}

export default FundsTableSection
