import { BiTrashAlt } from 'react-icons/bi';
import { urls } from '@/api/urls';
import { useState } from 'react';
import { authStatesStore } from '@/store/authStatesStore';
import { Url } from '@/types';
import { Loader2 } from 'lucide-react';

export default function UrlRemove({ url }: { url: Url }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = authStatesStore.useAuthStore(state => state.token);
  const setToken = authStatesStore.useAuthStore(state => state.setToken);

  const deleteUrl = async () => {
    setIsLoading(true);
    try {
      const urlDeleted = await urls.deleteUrl(token, url.id);
      if (urlDeleted?.user) setToken(urlDeleted.user.token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        isLoading
          ? 'cursor-default hover:opacity-100'
          : 'cursor-pointer hover:opacity-75'
      }
      onClick={() => deleteUrl()}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <BiTrashAlt />
      )}
    </div>
  );
}
