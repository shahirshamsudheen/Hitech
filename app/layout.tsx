import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HITECH — Computer Repair, CCTV & Technology Services in Kallara, Trivandrum',
    template: '%s | HITECH Kallara',
  },
  description:
    'Computer repair, laptop service, CCTV installation, and technology sales in Kallara, Trivandrum district. Board-level repair since 2016. Serving Nedumangad, Kilimanoor, Palode, Pangode and surrounding areas since 2010.',
  keywords: [
    'computer repair Kallara',
    'laptop service Nedumangad',
    'CCTV installation Trivandrum',
    'chip level repair Trivandrum',
    'laptop shop Kilimanoor',
    'computer service Palode',
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
      </body>
    </html>
  );
}
