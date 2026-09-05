import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  axes: ['wdth'],
});

export const metadata: Metadata = {
  title: {
    default: 'Hitech — Computer Repair, CCTV & Technology Services in Kallara, Trivandrum',
    template: '%s | Hitech Kallara',
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
    siteName: 'Hitech Systems',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
