import { IApiResponses } from '@/types';

const getUrls = async (token: string | null): Promise<IApiResponses> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GET_URLS}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  return data;
};

const shorUrl = async (
  token: string | null,
  url: string,
  customLink: string | undefined
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SHORT_URL}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url,
        customLink,
      }),
    }
  );
  const data = await res.json();

  return data;
};

export const urls = { getUrls, shorUrl };
