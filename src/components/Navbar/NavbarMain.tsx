import { authStatesStore } from '@/store/authStatesStore';
import Logo from '../Logo';
import AuthDropdownMenu from './AuthDropdownMenu';
import UserDropdownMenu from './UserDropdownMenu';

export default function NavbarMain() {
  const isAuth = authStatesStore.useAuthStore(state => state.isAuth);

  return (
    <nav className="w-full flex justify-between items-center">
      <div className="h-10 w-10 flex items-center">
        <Logo />
      </div>
      {isAuth ? <UserDropdownMenu /> : <AuthDropdownMenu />}
    </nav>
  );
}
