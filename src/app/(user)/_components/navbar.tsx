'use client';

import { Avatar } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../../../components/icons/logo';

export const Navbar = ({ user }: { user?: User }) => {
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
    <nav className="flex flex-row items-center justify-between px-8 py-4 w-full backdrop-blur-xl bg-background/50 sticky top-0 z-10">
      {/* Logo and Name */}
      <div className="flex items-center">
        <Link href="/">
          <Logo
            size="48px"
            className="text-foreground fill-foreground"
          />
        </Link>
        <h1 className="text-4xl font-bold font-italiana ml-2">Lunaluxe</h1>
      </div>

      {/* Menu */}
      <ul className="flex flex-row gap-x-8 items-center">
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

      {/* Here we place the login button or the user avatar */}
      {/* The avatar is actually a dropdown menu for diferent options */}
      {user ? (
        <Avatar className="flex items-center justify-center">
          <AvatarFallback className="flex items-center justify-center bg-foreground text-background font-bold rounded-full size-16 text-xl cursor-pointer shadow-sm shadow-foreground/50">
            {user.user_metadata.display_name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Link
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
            className: 'cursor-pointer text-base',
          })}
          href="/login"
        >
          Login
        </Link>
      )}
    </nav>
  );
};
