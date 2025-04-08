import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { getUser } from '@/services/user.service';
import { User } from '@supabase/supabase-js';
import { ChevronsUpDownIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const { user, error } = await getUser();

  if (error || !user) {
    console.log(error);
    return;
  }

  return (
    <main className="flex flex-row h-dvh w-full">
      <Sidebar user={user} />

      {/* Main content */}
      <section className="grow h-full w-full"></section>
    </main>
  );
}

const Sidebar = ({ user }: { user: User }) => {
  return (
    <nav className="w-72 shrink-0 h-full border-r border-border flex flex-col justify-between ">
      {/* Admin Account */}
      <header className="flex items-center justify-center w-full p-4 border-b border-border">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full ">
            <div className="w-full rounded-lg bg-foreground/10  flex flex-row gap-y-4 items-center justify-start gap-x-4">
              <div className="bg-foreground/20 shrink-0 rounded-lg size-12 flex items-center justify-center text-xl font-montserrat">
                {user?.user_metadata?.name?.[0] ?? '?'}
              </div>
              <p className="font-montserrat inline-block w-full text-start">
                {user?.user_metadata?.name ?? 'Admin'}
              </p>
              <ChevronsUpDownIcon className="size-4 text-foreground/70 mr-4 shrink-0 " />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Account
              </DropdownMenuLabel>
              <DropdownMenuItem>
                Go to Account
              </DropdownMenuItem>
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
