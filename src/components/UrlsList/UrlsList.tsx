'use client';
import { useState, useEffect } from 'react';
import { urls } from '@/api/urls';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '@/components/ui/separator';
import { authStatesStore } from '@/store/authStatesStore';
import { IUserApiResponse } from '@/types';

export default function UrlsList() {
  const token = authStatesStore.useAuthStore(state => state.token);
  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const [userLinks, setUserLinks] = useState<IUserApiResponse>({
    ok: false,
    status: 0,
    message: '',
    user: null,
    urls: null,
  });

  const getLinks = async () => {
    const userUrls = await urls.getLinks(token);
    setUserLinks(userUrls);

    if (userUrls.user && userUrls.user.token) {
      setToken(userUrls.user.token);
    }
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customLinkReplace = (
    urlShort: string | null,
    customLink: string | null
  ): string => {
    const url = urlShort?.slice(0, -10);
    return `${url}${customLink}`;
  };

  const lastUrlForSeparator = (index: number): boolean | undefined => {
    const urlsLength = userLinks?.urls?.length;
    if (index + 1 === urlsLength) return true;
    return false;
  };

  return (
    <Card className="w-[550px] mb-10">
      <CardHeader>
        <CardTitle>My URLs</CardTitle>
        <CardDescription>Here is a list of your URLs.</CardDescription>
      </CardHeader>
      <CardContent>
        {userLinks.urls &&
          userLinks.urls.map((url, i) => (
            <div key={url.id}>
              <div className="flex flex-col">
                <h4 className="text-xl font-bold pb-2">
                  {url.customLink === null ? '🔗' : url.customLink}
                </h4>
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
                  className="hover:underline text-sky-700 break-all"
                >
                  {url.original}
                </Link>
              </div>
              {lastUrlForSeparator(i) ? (
                ''
              ) : (
                <div className="py-5">
                  <Separator />
                </div>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
