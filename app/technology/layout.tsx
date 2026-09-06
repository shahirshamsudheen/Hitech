import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hardware Store & Custom Rigs',
  description:
    'Laptops, custom desktops, printers, monitors, networking equipment, and storage. Official Acer, Epson, Asus, and Canon partner in Kerala.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
