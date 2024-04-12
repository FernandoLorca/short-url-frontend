import Logo from '../Logo';
import AuthDropdownMenu from './AuthDropdownMenu';
import USerDropdownMenu from './UserDropdownMenu';

export default function NavbarMain() {
  return (
    <nav className="w-full flex justify-between items-center">
      <div className="h-10 w-10 flex items-center">
        <Logo />
      </div>
      <AuthDropdownMenu />
      <USerDropdownMenu />
    </nav>
  );
}
