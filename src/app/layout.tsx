import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { PlanProvider } from '@/context/PlanContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-white min-h-screen flex flex-col font-sans">
        <PlanProvider>
          <Navbar />

          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #2a2a2a',
              },
              success: {
                iconTheme: { primary: '#ccff00', secondary: '#0a0a0a' },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
