"use client"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu"
import { User } from "@supabase/supabase-js"
import {
  ChevronsUpDownIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export interface SidebarProps {
  user: User
}

export const Sidebar = ({ user }: SidebarProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex h-full w-72 shrink-0 flex-col justify-between border-r border-border">
      {/* Admin Account */}
      <header className="flex w-full items-center justify-center border-b border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex w-full flex-row items-center justify-start gap-x-4 gap-y-4 rounded-lg bg-foreground/10">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-l-lg bg-foreground/20 font-montserrat text-xl">
                {user?.user_metadata?.display_name?.[0] ?? "?"}
              </div>
              <p className="inline-block w-full text-start font-montserrat capitalize">
                {user?.user_metadata?.role ?? "Admin"}
              </p>
              <ChevronsUpDownIcon className="mr-4 size-4 shrink-0 text-foreground/70" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <DropdownMenuGroup>
              <AdminDropdownItem Icon={UserIcon} href="/dashboard/account">
                Account
              </AdminDropdownItem>
              <AdminDropdownItem
                Icon={theme === "dark" ? MoonIcon : SunIcon}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                Toggle Theme
              </AdminDropdownItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className="mt-2">
              <AdminDropdownItem
                Icon={LogOutIcon}
                onClick={async () => { console.log("Olas") }}>
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
  )
}

interface AdminDropdownItemProps extends DropdownMenuItemProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  children?: React.ReactNode
  href?: string
}

const AdminDropdownItem = ({
  Icon,
  children,
  href,
  ...props
}: AdminDropdownItemProps) => {
  return (
    <DropdownMenuItem {...props}>
      {href ? (
        <Link
          href={href}
          className="flex h-6 cursor-pointer flex-row items-center justify-start gap-x-3">
          <Icon className="size-5 text-foreground" />
          {children}
        </Link>
      ) : (
        <div className="flex h-6 cursor-pointer flex-row items-center justify-start gap-x-3">
          <Icon className="size-5 text-foreground" />
          {children}
        </div>
      )}
    </DropdownMenuItem>
  )
}
