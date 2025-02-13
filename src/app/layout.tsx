import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Italiana, Italianno, Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-italiana',
});

const italianno = Italianno({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-italianno',
});

export const metadata: Metadata = {
  title: 'Lunaluxe',
  description: 'Buy top quality jewelry handcrafted by artisans.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} ${italiana.variable} ${italianno.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
