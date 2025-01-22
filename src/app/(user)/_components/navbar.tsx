'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './icons/logo';

export const Navbar = () => {
  const pathname = usePathname();

  const links = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Our Collection',
      href: '/our-collection',
    },
    {
      name: 'Contact Us',
      href: '/contact-us',
    },
  ];

  return (
    <nav className="flex flex-row items-center justify-between px-8 py-4 w-full backdrop-blur-xl bg-transparent">
      {/* Logo and Name */}
      <div className="flex items-center">
        <Link href="/">
          <Logo size="48px" />
        </Link>
        <h1 className="text-4xl font-bold font-italiana ml-2">Lunaluxe</h1>
      </div>

      {/* Menu */}
      <ul className="flex flex-row gap-x-6 items-center">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li
              key={link.name}
              className="relative text-lg"
            >
              <Link href={link.href}>{link.name}</Link>
              <span
                className={`absolute bottom-0 left-0  h-0.5 rounded-full bg-foreground transition-all duration-100 ${
                  isActive ? 'w-full' : 'w-0'
                }`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
