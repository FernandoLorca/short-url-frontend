'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/api/auth';
import { Loader2 } from 'lucide-react';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import FormShortUrlUser from '@/components/FormShortUrl/FormShortUrlUser';
import NavbarMain from '@/components/Navbar/NavbarMain';
import UrlsList from '@/components/UrlsList/UrlsList';

export default function ShortUrlHome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    const getTokenFromLocalStorage = localStorage.getItem('auth');
    const tokenPargeFromLocalStorage =
      getTokenFromLocalStorage && JSON.parse(getTokenFromLocalStorage);
    token = tokenPargeFromLocalStorage.state.token;
  }

  const tokenValidation = async () => {
    if (token === null) {
      router.push('/');
      return;
    }
    try {
      const isValidToken = await auth.validateToken(token);

      if (!isValidToken) {
        router.push('/');
        return;
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    tokenValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[550px] flex justify-center h-16 md:h-12">
          <NavbarMain />
        </div>
      </div>
      {isLoading ? (
        <div className="h-[330px] text-4xl flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <FormShortUrlUser />
          <UrlsList />
        </div>
      )}
    </>
  );
}
