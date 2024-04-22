import Link from 'next/link';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import { Separator } from '@/components/ui/separator';
import UrlEdit from './UrlEdit';
import UrlRemove from './UrlRemove';
import { Url as UrlType } from '@/types';

export default function Url({ url, index }: { url: UrlType; index: number }) {
  const userUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.urls
  );

  const customLinkReplace = (
    urlShort: string | null,
    customLink: string | null
  ): string => {
    const url = urlShort?.slice(0, -10);
    return `${url}${customLink}`;
  };

  const lastUrlForSeparator = (index: number): boolean | undefined => {
    const urlsLength = userUrls?.length;
    if (index + 1 === urlsLength) return true;
    return false;
  };

  return (
    <>
      <div className="flex flex-col break-all">
        <div className="flex justify-between">
          <h4 className="text-xl font-bold pb-2">
            <span className="text-lg">🔗 </span>
            {url.customLink}
          </h4>
          <div className="flex gap-2">
            <UrlEdit />
            <UrlRemove url={url} />
          </div>
        </div>
        <div className="inline-block">
          <Link
            href={url.original}
            target="_blank"
            className="hover:underline font-bold text-sky-400"
          >
            {!url.customLink
              ? url.short
              : customLinkReplace(url.short, url.customLink)}
          </Link>
        </div>
        <div className="inline-block">
          <Link
            href={url.original}
            target="_blank"
            className="hover:underline text-sky-700"
          >
            {url.original}
          </Link>
        </div>
      </div>
      {lastUrlForSeparator(index) ? (
        ''
      ) : (
        <div className="py-5">
          <Separator />
        </div>
      )}
    </>
  );
}
