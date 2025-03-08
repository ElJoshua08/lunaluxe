import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { User } from '@supabase/supabase-js';

export const AccountDropdown = ({ user }: { user: User }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="flex items-center justify-center">
          <AvatarFallback className="flex items-center justify-center bg-foreground text-background font-bold rounded-full size-16 text-2xl cursor-pointer shadow-sm shadow-foreground/50 font-italianno">
            {user.user_metadata.display_name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
      >
        <MenuItem label="Perfil" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MenuItem = ({ label }: { label: string }) => {
  return <DropdownMenuItem>{label}</DropdownMenuItem>;
};
