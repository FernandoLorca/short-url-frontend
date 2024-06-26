import { FaUser } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function AuthDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#0f172a] max-h-8 text-white px-3 py-5 flex items-center rounded-md">
        <FaUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/sign-in">Sign in</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/sign-up">Sign up</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
