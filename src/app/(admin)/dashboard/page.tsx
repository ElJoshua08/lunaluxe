import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getUser } from '@/services/user.service';
import Link from 'next/link';
import { Sidebar } from '../_components/sidebar';

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
      <section className="grow h-full w-full">
        <Link
          href="/dashboard/products/create"
          className={cn(
            'absolute bottom-4 right-4',
            buttonVariants({ variant: 'default' })
          )}
        >
          Create Product
        </Link>
      </section>
    </main>
  );
}
