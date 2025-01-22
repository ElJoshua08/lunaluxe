import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Italiana, Montserrat } from 'next/font/google';
import './globals.css';

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
    <html lang="en">
      <body
        className={`${montserrat.className} ${italiana.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
