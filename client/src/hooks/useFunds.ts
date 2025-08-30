import { useQuery } from '@tanstack/react-query'
import { CACHE_TIME, STALE_TIME, BASE_URL } from '../commons/constants';

// `${BASE_URL}/stock-prices`
const fetchFunds = async () => {
    const res = await fetch(`${BASE_URL}/funds`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json(); 
  };

export const useFunds = () => {
    return useQuery({
        queryKey: ['funds'],
        queryFn: fetchFunds,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}