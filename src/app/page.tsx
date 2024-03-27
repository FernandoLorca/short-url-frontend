'use client';
import { useRouter } from 'next/navigation';
import FormShortUrlHome from '@/components/FormShortUrl/FormShortUrlHome';
import NavbarMain from '@/components/Navbar/NavbarMain';

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem('token');

  if (token) router.push('/short-url');

  return (
    <main>
      <div className="flex justify-center">
        <div className="w-[550px] flex justify-center h-16 md:h-12">
          <NavbarMain />
        </div>
      </div>
      <FormShortUrlHome />
    </main>
  );
}
