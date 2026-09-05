import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laptops, Desktops, Printers & Accessories — Hitech Kallara',
  description:
    'Buy laptops, desktops, printers and accessories from Acer, Asus, HP, Dell, Epson and Canon. Authorised partner. Everything you buy here gets serviced here.',
};

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
