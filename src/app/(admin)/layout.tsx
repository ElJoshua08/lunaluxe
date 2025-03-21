import { getUser } from '@/services/user.service';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, error } = await getUser();

  if (error) {
    console.log(error);
  }

  if (user?.user_metadata?.role !== 'admin') {
    console.error('User is not an admin');
  }

  return (
    <main className="flex flex-col items-center justify-start w-full h-dvh">
      {children}
    </main>
  );
}
