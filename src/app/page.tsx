'use client';
import { FaSpinner } from 'react-icons/fa';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStatesStore } from '@/store/authStatesStore';
import { loadingStatesStore } from '@/store/loadingStatesStore';
import { auth } from '@/api/auth';
import { Loader2 } from 'lucide-react';
import FormShortUrlHome from '@/components/FormShortUrl/FormShortUrlHome';
import NavbarMain from '@/components/Navbar/NavbarMain';

export default function Home() {
  const router = useRouter();
  authStatesStore.useAuthStore(state => state.token);
  const isLoading = loadingStatesStore.useIsLoading(state => state.isLoading);
  const setIsLoading = loadingStatesStore.useIsLoading(
    state => state.setIsLoading
  );

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    const getTokenFromLocalStorage = localStorage.getItem('auth');
    const tokenParseFromLocalStorage =
      getTokenFromLocalStorage && JSON.parse(getTokenFromLocalStorage);
    token = tokenParseFromLocalStorage.state.token;
  }

  const tokenValidation = async () => {
    setIsLoading(true);
    try {
      const isValidToken = await auth.validateToken(token);

      if (isValidToken) {
        router.push('/short-url');
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
    <main>
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
        <FormShortUrlHome />
      )}
    </main>
  );
}
