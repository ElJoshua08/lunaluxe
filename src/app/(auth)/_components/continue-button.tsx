import { Button } from "@/components/ui/button";
import { loginWithProvider } from "@/services/user.service";
import { Provider } from "@supabase/supabase-js";
import { LoaderCircleIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

interface ContinueButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  provider: Provider;
}

export const ContinueButton = ({
  icon,
  label,
  provider,
  ...props
}: ContinueButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Button
      {...props}
      className="flex h-auto w-full items-center justify-start gap-4 px-4 py-2 text-foreground/85"
      variant="outline"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const { error } = await loginWithProvider(provider);

        if (error) {
          toast.error("Woops! Seems like something went wrong. Please try again.");
        }
      }}>
      {loading ? <LoaderCircleIcon className="animate-spin" /> : icon}
      {label}
    </Button>
  );
};
