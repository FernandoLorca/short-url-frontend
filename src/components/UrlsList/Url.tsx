import Link from 'next/link';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import { Separator } from '@/components/ui/separator';
import { Url as UrlType } from '@/types';

export default function Url({ url, index }: { url: UrlType; index: number }) {
  const userUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.urls
  );

  const customLinkReplace = (
    urlShort: string | null,
    customLink: string | null
  ): string => {
    console.log(urlShort);
    const url = urlShort?.slice(0, -10);
    return `${url}${customLink}`;
  };

  const lastUrlForSeparator = (index: number): boolean | undefined => {
    const urlsLength = userUrls?.length;
    if (index + 1 === urlsLength) return true;
    return false;
  };

  return (
    <div>
      <div className="flex flex-col break-all">
        <p className="text-2xl pb-2">🔗</p>
        <h4 className="text-xl font-bold pb-2">{url.customLink}</h4>
        <Link
          href={url.original}
          target="_blank"
          className="hover:underline font-bold text-sky-400"
        >
          {url.customLink === null
            ? url.short
            : customLinkReplace(url.short, url.customLink)}
        </Link>
        <Link
          href={url.original}
          target="_blank"
          className="hover:underline text-sky-700"
        >
          {url.original}
        </Link>
      </div>
      {lastUrlForSeparator(index) ? (
        ''
      ) : (
        <div className="py-5">
          <Separator />
        </div>
      )}
    </div>
  );
}
