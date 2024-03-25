'use client';
import { useRouter } from 'next/navigation';
import FormShortUrl from './FormShortUrl/FormShortUrl';

export default function TokenVerification(): JSX.Element {
  const router = useRouter();
  const token = localStorage.getItem('token');

  if (token) {
    router.push('/short-url');
  }

  return <FormShortUrl />;
}
