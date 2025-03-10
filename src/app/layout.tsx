import type { Metadata } from 'next';
import './globals.css';
import { constructMetaData } from '@/utils/functions';
import { Toaster } from 'sonner';
import { Footer, Navbar } from '@/components/common';
import ChatBot from '@/components/Chatbot/bot';
import dynamic from 'next/dynamic';
const SessionProvider = dynamic(
  () => import('@/components/common/SessionProvider')
);

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
        <Navbar />
        {children}

        <Toaster position="bottom-right" richColors duration={5000} />
        <ChatBot />
        <SessionProvider />
        <Footer />
      </body>
    </html>
  );
}
