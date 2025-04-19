import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const CTA = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/our-collection"
      className={cn(
        className,
        buttonVariants({ variant: 'accent' }),
        'transition-duration-200 h-auto py-3 text-xl transition-[width,all] hover:shadow-lg hover:shadow-accent/70'
      )}>
      Explore our collection
    </Link>
  )
}
