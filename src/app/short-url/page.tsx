'use client';
import { FaSpinner } from 'react-icons/fa';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStatesStore } from '@/store/authStatesStore';
import { loadingStatesStore } from '@/store/loadingStatesStore';
import { auth } from '@/api/auth';
import FormShortUrlUser from '@/components/FormShortUrl/FormShortUrlUser';
import NavbarMain from '@/components/Navbar/NavbarMain';
import UrlsList from '@/components/UrlsList/UrlsList';

export default function ShortUrlHome() {
  const router = useRouter();
  const isLoading = loadingStatesStore.useIsLoading(state => state.isLoading);
  const setIsLoading = loadingStatesStore.useIsLoading(
    state => state.setIsLoading
  );

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    const getTokenFromLocalStorage = localStorage.getItem('auth');
    const tokenPargeFromLocalStorage =
      getTokenFromLocalStorage && JSON.parse(getTokenFromLocalStorage);
    token = tokenPargeFromLocalStorage.state.token;
  }

  const tokenValidation = async () => {
    setIsLoading(true);

    if (token === null) {
      router.push('/');
      setIsLoading(false);
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
    <div>
      <div className="flex justify-center">
        <div className="w-[550px] flex justify-center h-16 md:h-12">
          <NavbarMain />
        </div>
      </div>
      {isLoading ? (
        <div className="h-[330px] text-4xl flex justify-center items-center">
          <FaSpinner className="animate-spin opacity-30" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <FormShortUrlUser />
          <UrlsList />
        </div>
      )}
    </div>
  );
}
