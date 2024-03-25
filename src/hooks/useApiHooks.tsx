import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export type TApiResponse = {
  ok: boolean;
  status: Number;
  message: string;
  user: User | null;
  data?: object | null;
  loading: boolean;
};

export const useApiPost = (url: string, body: object) => {
  const [response, setResponse] = useState<TApiResponse>({
    ok: false,
    status: 0,
    message: '',
    user: null,
    data: null,
    loading: false,
  });

  const getApiData = async () => {
    setResponse({ ...response, loading: true });
    try {
      const apiResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await apiResponse.json();

      setResponse({
        ...response,
        ok: data.ok,
        status: data.status,
        message: data.message,
        user: data.user,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return response;
};
