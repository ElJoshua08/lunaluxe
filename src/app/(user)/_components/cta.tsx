import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const CTA = () => {
  return (
    <Link
      href="/our-collection"
      className={cn(
        buttonVariants({ variant: 'accent' }),
        'h-auto text-xl py-3 hover:shadow-lg hover:shadow-accent/70 transition-[width,all] transition-duration-200'
      )}
    >
      Explore our collection
    </Link>
  );
};
