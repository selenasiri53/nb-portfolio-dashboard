import { useQuery } from '@tanstack/react-query'
import { CACHE_TIME, STALE_TIME } from '../commons/constants';

const fetchPeerFunds = async () => {
    const res = await fetch('/portfolio-data');
    if (!res.ok) throw new Error('Failed to collect stock prices.');
    return res.json(); 
  };

export const usePeerFunds = () => {
    return useQuery({
        queryKey: ['peer_funds'],
        queryFn: fetchPeerFunds,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}