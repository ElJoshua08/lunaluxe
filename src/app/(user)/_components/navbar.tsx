'use client';

import { buttonVariants } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '../../../components/icons/logo';
import { AccountDropdown } from './account-dropdown';

export const Navbar = ({ user }: { user?: User }) => {
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <nav className="flex flex-row items-center justify-between px-4 py-4 w-full backdrop-blur-xl bg-background/50 top-0 z-10 sticky">
      {/* Logo and Name */}
      <div className="flex items-center">
        <Link href="/">
          <Logo
            size="30px"
            className="text-foreground fill-foreground"
          />
        </Link>
        <h1 className="text-4xl font-bold font-italiana ml-2 hidden md:inline-block">
          Lunaluxe
        </h1>
      </div>

      {/* Hamburguer menu for mobile */}
      <div>
        <button onClick={() => setDrawerOpen(true)}>
          {!drawerOpen && <MenuIcon className="h-6 w-6" />}
        </button>

        <div
          className={`${
            drawerOpen ? 'block' : 'hidden'
          } absolute top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-xl z-20`}
        />

        <div
          className={`${
            drawerOpen ? 'block' : 'hidden'
          } bg-background rounded-b-lg w-full top-0 left-0 h-72 z-40 absolute`}
        >
          <h1 className="text-lg mt-4 ml-4">Menu</h1>
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-4 right-4"
          >
            <XIcon />
          </button>
        </div>
      </div>

      {/* Menu */}
      <ul className="flex-row gap-x-8 items-center hidden md:flex">
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

      {/* */}
      <div className="hidden md:flex flex-row items-center gap-x-4">
        {/* Here we place a dashboard button if the user has the label of admin */}
        {user ? (
          user?.user_metadata?.role === 'admin' ? (
            <Link
              className={buttonVariants({ variant: 'default' })}
              href={'/dashboard'}
            >
              Dashboard
            </Link>
          ) : (
            <AccountDropdown user={user} />
          )
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
      </div>
    </nav>
  );
};
