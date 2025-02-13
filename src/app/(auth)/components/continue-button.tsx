import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface ContinueButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export const ContinueButton = ({
  icon,
  label,
  ...props
}: ContinueButtonProps) => {
  return (
    <Button
      {...props}
      className="flex items-center justify-start gap-4 h-auto py-2 px-4 w-full text-foreground/85"
      variant="outline"
    >
      {icon}
      {label}
    </Button>
  );
};
