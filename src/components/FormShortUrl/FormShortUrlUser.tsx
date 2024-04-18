'use client';
import { IoIosRemove } from 'react-icons/io';
import { LuMaximize } from 'react-icons/lu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import FormShortUrlUserCardContent from './FormShortUrlUserCardContent';

export default function FormShortUrlUser() {
  const [isMinimize, setIsMinimize] = useState<boolean>(false);
  const router = useRouter();

  // const shortUrl = async (
  //   url: string,
  //   customLink: string | undefined | null
  // ) => {
  //   if (customLink === '') {
  //     customLink = null;
  //   }
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SHORT_URL}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //         body: JSON.stringify({ url, customLink }),
  //       }
  //     );
  //     const data = await res.json();

  //     // setResponse(data);

  //     if (!user.ok && user.status === 401 && user.message === 'Token expired') {
  //       localStorage.removeItem('token');
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="mt-10">
      <Card className="w-[550px]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Shorten your URL</CardTitle>
            <div className="flex gap-2">
              {!isMinimize ? (
                <div
                  className="cursor-pointer hover:opacity-75 text-xl"
                  onClick={() => setIsMinimize(true)}
                >
                  <IoIosRemove />
                </div>
              ) : (
                <div
                  className="cursor-pointer hover:opacity-75 text-xl"
                  onClick={() => setIsMinimize(false)}
                >
                  <LuMaximize />
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        {!isMinimize ? <FormShortUrlUserCardContent /> : ''}
      </Card>
    </div>
  );
}
