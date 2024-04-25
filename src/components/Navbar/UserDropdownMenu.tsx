import { FaUser } from 'react-icons/fa';
import { authStatesStore } from '@/store/authStatesStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function UserDropdownMenu() {
  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const setIsAuth = authStatesStore.useAuthStore(state => state.setIsAuth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#0f172a] max-h-8 text-white px-3 py-5 flex items-center rounded-md">
        <FaUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/short-url">URLs</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link
            href="/"
            onClick={() => {
              setToken(null);
              setIsAuth(false);
            }}
          >
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
