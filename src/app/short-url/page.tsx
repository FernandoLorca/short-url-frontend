'use client';
import { FaSpinner } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormShortUrlUser from '@/components/FormShortUrl/FormShortUrlUser';
import NavbarMain from '@/components/Navbar/NavbarMain';

export default function ShortUrlHome() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();
  const token = localStorage.getItem('token');

  const tokenValidation = async (): Promise<void> => {
    setIsProcessing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TOKEN_VALIDATION}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (data.ok && data.status === 200 && data.message === 'Token is valid') {
        setIsProcessing(false);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    tokenValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[550px] flex justify-center h-16 md:h-12">
          <NavbarMain />
        </div>
      </div>
      {isProcessing ? (
        <div className="h-[330px] text-4xl flex justify-center items-center">
          <FaSpinner className="animate-spin opacity-30" />
        </div>
      ) : (
        <FormShortUrlUser />
      )}
    </div>
  );
}
