import { Navbar } from './_components/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-dvh items-center justify-start w-full">
      <Navbar />
      {children}
    </main>
  );
}
