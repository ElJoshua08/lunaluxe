import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return <main className='flex flex-row h-dvh'>
    <Sidebar />
  </main>;
}

const Sidebar = () => {
  return (
    <nav className='max-w-96 h-full border-r border-border'>
      {/* Admin Account */}
      <header></header>

      {/* Nav elements */}
      <ul></ul>

      {/* Settings */}
      <Link
        href="/dashboard/settings"
        className={buttonVariants({ variant: 'default' })}
      ></Link>
    </nav>
  );
};
