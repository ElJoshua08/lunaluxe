import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lunaluxe - Authentication',
  description: 'Please verify your account before continuing.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-dvh w-full">
      {children}
    </div>
  );
}
