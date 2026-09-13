import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HITECH — Computer Repair, CCTV & Technology Services in Kallara, Kerala',
    template: '%s | HITECH Kallara',
  },
  description:
    'Computer repair, laptop service, CCTV installation, and technology sales in Kallara, Kerala. Specialized BGA board-level repair since 2016. Serving clients across Kerala since 2010.',
  keywords: [
    'computer repair Kerala',
    'laptop service Kallara',
    'CCTV installation Kerala',
    'chip level repair Kerala',
    'BGA motherboard repair Kerala',
    'laptop shop Kallara',
    'computer service Kerala',
    'technology Kallara',
    'Hitech Systems',
  ],
  metadataBase: new URL('https://hitechkallara.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'HITECH Systems',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
