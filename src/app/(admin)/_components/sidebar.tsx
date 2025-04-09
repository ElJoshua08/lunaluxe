'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { User } from '@supabase/supabase-js';
import {
  ChevronsUpDownIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export interface SidebarProps {
  user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-72 shrink-0 h-full border-r border-border flex flex-col justify-between ">
      {/* Admin Account */}
      <header className="flex items-center justify-center w-full p-4 border-b border-border">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full ">
            <div className="w-full rounded-lg bg-foreground/10  flex flex-row gap-y-4 items-center justify-start gap-x-4">
              <div className="bg-foreground/20 shrink-0 rounded-l-lg size-12 flex items-center justify-center text-xl font-montserrat">
                {user?.user_metadata?.display_name?.[0] ?? '?'}
              </div>
              <p className="font-montserrat inline-block w-full text-start capitalize">
                {user?.user_metadata?.role ?? 'Admin'}
              </p>
              <ChevronsUpDownIcon className="size-4 text-foreground/70 mr-4 shrink-0 " />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <DropdownMenuGroup>
              <CustomDropdownMenuItem
                Icon={UserIcon}
                href="/dashboard/account"
              >
                Account
              </CustomDropdownMenuItem>
              <CustomDropdownMenuItem
                Icon={theme === 'dark' ? MoonIcon : SunIcon}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                Toggle Theme
              </CustomDropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Nav elements */}
      <ul></ul>

      {/* Settings */}
      <footer className="flex items-center justify-center w-full p-4 border-t border-border">
        <Link
          href="/dashboard/settings"
          className={cn(
            'w-full',
            buttonVariants({
              variant: 'outline',
            })
          )}
        >
          <SettingsIcon />
          Settings
        </Link>
      </footer>
    </nav>
  );
};

interface CustomDropdownMenuItemProps extends DropdownMenuItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  href?: string;
}

const CustomDropdownMenuItem = ({
  Icon,
  children,
  href,
  ...props
}: CustomDropdownMenuItemProps) => {
  return (
    <DropdownMenuItem {...props}>
      {href ? (
        <Link
          href={href}
          className="flex flex-row items-center justify-start gap-x-2  h-10 cursor-pointer"
        >
          <Icon className="size-5 text-foreground/70" />
          {children}
        </Link>
      ) : (
        <div className="flex flex-row items-center justify-start gap-x-2  h-10 cursor-pointer">
          <Icon className="size-5 text-foreground/70" />
          {children}
        </div>
      )}
    </DropdownMenuItem>
  );
};
