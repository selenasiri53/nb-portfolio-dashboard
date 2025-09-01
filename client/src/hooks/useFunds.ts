import { useQuery } from '@tanstack/react-query'
import { CACHE_TIME, STALE_TIME } from '../commons/constants';

// Use funds for Manager 2
// `${BASE_URL}/stock-prices`
const fetchFunds = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/portfolio-managers/2');
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