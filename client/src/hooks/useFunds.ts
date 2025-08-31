import { useQuery } from '@tanstack/react-query'
import { CACHE_TIME, STALE_TIME } from '../commons/constants';

// `${BASE_URL}/stock-prices`
const fetchFunds = async () => {
    const res = await fetch('/api/funds');
    if (!res.ok) throw new Error('Could not retrieve funds.');


    const data = await res.json();
    console.log("Fetched funds:", data); 
    return data;
    // return res.json(); 
  };

export const useFunds = () => {
    return useQuery({
        queryKey: ['funds'],
        queryFn: fetchFunds,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}