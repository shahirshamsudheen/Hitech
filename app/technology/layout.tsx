import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Laptops, desktops, printers, monitors, networking equipment, storage, and accessories. Acer, Epson, Asus, and Canon authorised partner in Kallara, Trivandrum.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
