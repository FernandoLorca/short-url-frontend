import FormShortUrl from '@/components/FormShortUrl';
import NavbarMain from '@/components/NavbarMain';

export default function Home() {
  return (
    <main>
      <div className="flex justify-center w-full h-16 md:h-12">
        <NavbarMain />
      </div>
      <FormShortUrl />
    </main>
  );
}
