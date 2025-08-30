import { useQuery } from '@tanstack/react-query'
import { CACHE_TIME } from '../commons/constants';

// `${BASE_URL}/stock-prices`
const fetchHoldings = async () => {
    const res = await fetch('/portfolio-data/');
    if (!res.ok) throw new Error('Could not retrieve holdings.');
    return res.json(); 
  };

export const useHoldings = (fundId: number | null) => {
    return useQuery({
        queryKey: ['holdings', fundId],
        queryFn: () => {
            if (!fundId) return Promise.resolve([]); 
            return fetchHoldings();
          },
        staleTime: 0, // changed from STALE_TIME
        gcTime: CACHE_TIME,
        enabled: !!fundId,
        refetchOnMount: 'always', // new - updates on selection change
        refetchOnWindowFocus: false,
    });
}