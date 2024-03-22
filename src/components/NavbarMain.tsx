import Logo from './Logo';

export default function MainNavbar() {
  return (
    <nav className="flex justify-between">
      <Logo />
      <ul className="flex justify-between items-center gap-4">
        <li>Home</li>
        <li>Short</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
