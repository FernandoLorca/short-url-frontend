import { IApiResponses } from '@/types';

const getUrls = async (
  token: string | null
): Promise<IApiResponses | undefined> => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

const shorUrl = async (
  token: string | null,
  url: string,
  customLink: string | undefined | null
): Promise<IApiResponses | undefined> => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

const updateUrl = async (
  token: string | null,
  urlId: number,
  customLink: string | null
): Promise<IApiResponses | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_UPDATE_URL}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          urlId,
          customLink,
        }),
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteUrl = async (
  token: string | null,
  id: number
): Promise<IApiResponses | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_DELETE_URL}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const urls = { getUrls, shorUrl, deleteUrl, updateUrl };
