import { ThemeToggle } from '@/components/theme-toggle';
import { Navbar } from './_components/navbar';
import { getUser } from '@/services/user.service';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, error } = await getUser();

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }


  return (
    <main className="flex flex-col items-center justify-start w-full h-dvh">
      <Navbar user={user} />
      <div className="flex w-full h-full">{children}</div>

      <ThemeToggle className="fixed bottom-4 right-4" />
    </main>
  );
}
