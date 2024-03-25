'use client';
import { useRouter } from 'next/navigation';
import FormShortUrl from '@/components/FormShortUrl/FormShortUrl';

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem('token');

  if (token) {
    router.push('/short-url');
  }
  return (
    <main>
      <FormShortUrl />
    </main>
  );
}
