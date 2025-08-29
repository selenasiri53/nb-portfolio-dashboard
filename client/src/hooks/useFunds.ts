import { useQuery } from '@tanstack/react-query'

type Fund = {
    fund_id: string; 
    name: string;
    strategy: string;
    manager: string;
    inception_date: string;
  }

const fetchFunds = async () => {
    const res = await fetch('http://127.0.0.1:8000/portfolio/funds');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json(); 
  };

const STALE_TIME = 5000;

const CACHE_TIME = 5000;

export const useFunds = () => {
    return useQuery({
        queryKey: ['funds'],
        queryFn: fetchFunds,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}