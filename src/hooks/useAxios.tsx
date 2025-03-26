import axios from 'axios';
import { useEffect, useState } from 'react';

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",  
  headers: {
    'Content-Type': 'application/json'
  }
});

type AxiosResponse<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
};

function useAxios<T>(url: string, options = {}): AxiosResponse<T> {
  const [state, setState] = useState<AxiosResponse<T>>({
    loading: false,
    data: null,
    error: null
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await api.request({ url, ...options });
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, error: (error as Error)?.message, loading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return state;
}

export default useAxios;
