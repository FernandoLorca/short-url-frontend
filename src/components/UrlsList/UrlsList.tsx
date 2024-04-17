'use client';
import { useEffect } from 'react';
import { urls } from '@/api/urls';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { authStatesStore } from '@/store/authStatesStore';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import Url from './Url';

export default function UrlsList() {
  const token = authStatesStore.useAuthStore(state => state.token);

  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const userUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.urls
  );
  const setUserUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.setUrl
  );

  const getLinks = async () => {
    if (token) {
      const getUserUrls = await urls.getUrls(token);
      if (getUserUrls.urls) setUserUrls(getUserUrls.urls);
      if (getUserUrls.user && getUserUrls.user.token)
        setToken(getUserUrls.user.token);
    }
  };

  useEffect(() => {
    getLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="w-[550px] mb-10">
      <CardHeader>
        <CardTitle>My URLs</CardTitle>
      </CardHeader>
      <CardContent>
        {userUrls?.length &&
          userUrls?.length > 1 &&
          userUrls.map((url, i) => (
            <div key={url.id}>
              <Url
                url={url}
                index={i}
              />
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
