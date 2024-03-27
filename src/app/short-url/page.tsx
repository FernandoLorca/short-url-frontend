'use client';
import { useRouter } from 'next/navigation';
import FormShortUrlUser from '@/components/FormShortUrl/FormShortUrlUser';
import NavbarMain from '@/components/Navbar/NavbarMain';

export default function ShortUrlHome() {
  const router = useRouter();
  const token = localStorage.getItem('token');

  if (!token) router.push('/');

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[550px] flex justify-center h-16 md:h-12">
          <NavbarMain />
        </div>
      </div>
      <FormShortUrlUser />
    </div>
  );
}
