import { FaUser } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AuthDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#0f172a] max-h-8 text-white px-3 py-5 flex items-center rounded-md">
        <FaUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">Sign in</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Sign up</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
