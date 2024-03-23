import Logo from '../Logo';
import AuthDropdownMenu from './AuthDropdownMenu';

export default function NavbarMain() {
  return (
    <nav className="w-full flex justify-between items-center">
      <div className="h-10 w-10 flex items-center">
        <Logo />
      </div>
      <AuthDropdownMenu />
    </nav>
  );
}
