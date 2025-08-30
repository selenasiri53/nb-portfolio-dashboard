import { useQuery } from '@tanstack/react-query'
import { CACHE_TIME, STALE_TIME, BASE_URL } from '../commons/constants';

const fetchStockPrices = async () => {
    const res = await fetch(`${BASE_URL}/stock-prices`);
    if (!res.ok) throw new Error('Failed to collect stock prices.');
    return res.json(); 
  };

export const useStockPrices = () => {
    return useQuery({
        queryKey: ['stock_price'],
        queryFn: fetchStockPrices,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}