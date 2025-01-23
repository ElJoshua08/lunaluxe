import { ThemeToggle } from '@/components/theme-toggle';
import { Navbar } from './_components/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-start w-full h-dvh">
      <Navbar />
      <div className="flex w-full h-full">{children}</div>

      <ThemeToggle className="fixed bottom-4 right-4" />
    </main>
  );
}
