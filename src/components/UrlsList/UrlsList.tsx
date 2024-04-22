'use client';
import { useEffect, useState } from 'react';
import { urls } from '@/api/urls';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { authStatesStore } from '@/store/authStatesStore';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import { Loader2 } from 'lucide-react';
import Url from './Url';

export default function UrlsList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = authStatesStore.useAuthStore(state => state.token);
  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const userUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.urls
  );
  const setUserUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.setUrl
  );

  const getLinks = async () => {
    try {
      setIsLoading(true);
      if (token) {
        const getUserUrls = await urls.getUrls(token);
        if (
          !getUserUrls?.ok &&
          getUserUrls?.status === 404 &&
          getUserUrls?.message === 'Found no link from this user.'
        ) {
          setUserUrls(undefined);
        }
        if (getUserUrls?.urls) setUserUrls(getUserUrls.urls);
        if (getUserUrls?.user && getUserUrls.user.token)
          setToken(getUserUrls.user.token);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <Card className="w-[550px] mb-10">
      <CardHeader>
        <CardTitle>My URLs</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : userUrls?.length &&
          userUrls?.length >= 1 &&
          userUrls[0].id !== 0 &&
          userUrls !== undefined ? (
          userUrls.map((url, i) => (
            <div key={url.id}>
              <Url
                url={url}
                index={i}
              />
            </div>
          ))
        ) : (
          <p>You don&apos;t have registered links.</p>
        )}
      </CardContent>
    </Card>
  );
}
