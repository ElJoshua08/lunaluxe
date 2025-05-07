"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/services/user.service";
import {
  DropdownMenuItem,
  DropdownMenuItemProps,
} from "@radix-ui/react-dropdown-menu";
import { User } from "@supabase/supabase-js";
import { cva, VariantProps } from "class-variance-authority";
import {
  ChevronsUpDownIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export interface SidebarProps {
  user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex h-full w-72 shrink-0 flex-col justify-between border-r border-border">
      {/* Admin Account */}
      <header className="flex w-full items-center justify-center border-b border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="group w-full">
            <div className="flex w-full flex-row items-center justify-start gap-x-4 gap-y-4 rounded-lg bg-foreground/10">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-l-lg bg-foreground/20 font-montserrat text-xl">
                {user?.user_metadata?.display_name?.[0] ?? "?"}
              </div>
              <p className="inline-block w-full text-start font-montserrat capitalize">
                {user?.user_metadata?.display_name?.split(" ")[0] ?? "Admin"}
              </p>
              <ChevronsUpDownIcon className="mr-4 size-4 shrink-0 text-foreground/70" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" sideOffset={10}>
            <DropdownMenuGroup className="p-1">
              <AdminDropdownItem
                Icon={UserIcon}
                href="/dashboard/account"
                className="rounded-t-sm">
                Account
              </AdminDropdownItem>
              <AdminDropdownItem
                Icon={theme === "dark" ? MoonIcon : SunIcon}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-t-sm">
                Toggle Theme
              </AdminDropdownItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="p-1">
              <AdminDropdownItem
                Icon={LogOutIcon}
                variant="destructive"
                onClick={async () => {
                  await logout();
                }}>
                Log Out
              </AdminDropdownItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Nav elements */}
      <ul></ul>

      {/* Settings */}
      <footer className="flex w-full items-center justify-center border-t border-border p-4">
        <Link
          href="/dashboard/settings"
          className={cn(
            "w-full",
            buttonVariants({
              variant: "outline",
            })
          )}>
          <SettingsIcon />
          Settings
        </Link>
      </footer>
    </nav>
  );
};

const adminDropdownItemVariants = cva(
  "flex h-9 cursor-pointer items-center justify-start gap-x-3 pl-2 rounded-sm ",
  {
    variants: {
      variant: {
        default: "text-foreground hover:bg-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive",
        outline: "text-accent hover:text-accent",
        secondary: "text-secondary hover:text-secondary",
        ghost: "text-accent hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AdminDropdownItemProps
  extends DropdownMenuItemProps,
    VariantProps<typeof adminDropdownItemVariants> {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  href?: string;
}

const AdminDropdownItem = ({
  Icon,
  children,
  className,
  href,
  variant,
  ...props
}: AdminDropdownItemProps) => {
  return (
    <DropdownMenuItem asChild {...props} className="">
      {href ? (
        <Link
          href={href}
          className={cn(adminDropdownItemVariants({ variant, className }))}>
          <Icon className="!size-5 shrink-0" />
          {children}
        </Link>
      ) : (
        <div className={cn(adminDropdownItemVariants({ variant, className }))}>
          <Icon className="!size-5 shrink-0" />
          {children}
        </div>
      )}
    </DropdownMenuItem>
  );
};
