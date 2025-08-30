import { useStockPrices } from '../hooks/useStockPrice'; // new - tanstack logic extracted here
import type { StockPrice } from '../types/api'

const QuadraCardSection = () => {
  const { data, isLoading, error } = useStockPrices()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching funds</div>;
  if (!data || data.length === 0) return <div>No data available</div>
  console.log(JSON.stringify(data))

  const stockPrices = data as StockPrice[]

  return (
    <div className="lg:grid lg:grid-cols-4 space-x-2">
      {stockPrices?.slice(0, 4).map((stockPrice) => (
         <div className='card rounded-2xl p-4 bg-white/30'>
        {/* circular img + title */}
        <div className="flex gap-2 items-center">
           <div
                className="min-w-12 min-h-12 rounded-full bg-indigo-300 flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition text-2xl tracking-wider font-thin"
                >
                <h3 className="text-xs">{stockPrice.ticker_symbol}</h3>
            </div>
            <div>
                <h2 className="text-neutral-100 font-thin tracking-wide text-xs">{stockPrice.date}</h2> 
                <h3 className="text-xs text-gray-900">{stockPrice.volume}</h3>
                <h3 className="text-xs text-gray-900">{stockPrice.high_price}</h3>
                <h3 className="text-xs text-gray-900">{stockPrice.low_price}</h3>
            </div>
        </div>
      </div>
      ))}
     
    </div>
  )
}

export default QuadraCardSection
