'use client';

import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Navbar } from './_components/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex flex-col items-center justify-start w-full h-dvh">
      <Navbar />
      <div className="flex w-full h-full">{children}</div>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </main>
  );
}
