import { MdModeEdit, MdClose } from 'react-icons/md';
import { isUpdatingStore } from '@/store/isUpdatingStore';
import { Url } from '@/types';

export default function UrlEdit({ url }: { url: Url }) {
  const isUpdating = isUpdatingStore.useIsUpdating(state => state.isUpdating);
  const setIsUpdating = isUpdatingStore.useIsUpdating(
    state => state.setIsUpdating
  );
  const urlId = isUpdatingStore.useIsUpdating(state => state.urlId);
  const setUrlId = isUpdatingStore.useIsUpdating(state => state.setUrlId);

  return (
    <>
      {isUpdating && urlId === url.id ? (
        <MdClose
          className="cursor-pointer hover:opacity-75"
          onClick={() => {
            setIsUpdating(false);
            setUrlId(null);
          }}
        />
      ) : (
        <MdModeEdit
          className="cursor-pointer hover:opacity-75"
          onClick={() => {
            setIsUpdating(true);
            setUrlId(url.id);
          }}
        />
      )}
    </>
  );
}
