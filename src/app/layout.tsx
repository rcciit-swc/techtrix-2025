import type { Metadata } from 'next';
import './globals.css';
import { constructMetaData } from '@/utils/functions';
import { Toaster } from 'sonner';

export const metadata: Metadata = constructMetaData({
  title: 'Techtrix 2025',
  description: 'The Official Techno-Management Fest of RCCIIT.',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$antialiased`}>
        {children}

        <Toaster position="bottom-right" richColors duration={5000} />
      </body>
    </html>
  );
}
