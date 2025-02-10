import type { Metadata } from 'next';
import './globals.css';
import { constructMetaData } from '@/utils/functions';
import { Footer } from '@/components/common';

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
        <Footer />
      </body>
    </html>
  );
}
