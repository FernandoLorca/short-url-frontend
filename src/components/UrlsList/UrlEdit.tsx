import { MdModeEdit, MdClose, MdCheck } from 'react-icons/md';
import { isUpdatingStore } from '@/store/isUpdatingStore';
import { Url } from '@/types';

export default function UrlEdit({ url }: { url: Url }) {
  const isUpdating = isUpdatingStore.useIsUpdating(state => state.isUpdating);
  const setIsUpdating = isUpdatingStore.useIsUpdating(
    state => state.setIsUpdating
  );
  const urlId = isUpdatingStore.useIsUpdating(state => state.urlId);
  console.log(urlId);
  console.log(isUpdating);
  const setUrlId = isUpdatingStore.useIsUpdating(state => state.setUrlId);

  const handleOpenEdit = () => {
    setIsUpdating(true);
    setUrlId(url.id);
  };

  return (
    <>
      {isUpdating && urlId === url.id ? (
        <div className="flex gap-1">
          <MdCheck className="cursor-pointer hover:opacity-75" />
          <MdClose
            className="cursor-pointer hover:opacity-75"
            onClick={() => {
              setIsUpdating(false);
              setUrlId(null);
            }}
          />
        </div>
      ) : (
        <MdModeEdit
          className="cursor-pointer hover:opacity-75"
          onClick={() => handleOpenEdit()}
        />
      )}
    </>
  );
}
