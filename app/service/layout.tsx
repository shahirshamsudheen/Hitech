import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Repair & Service — Laptop, Desktop, Printer, Board-Level Repair in Kallara',
  description:
    'Book a repair for your laptop, desktop, printer or any computer equipment. Board-level and chip-level repair since 2016. Serving Kallara, Nedumangad, Kilimanoor, Palode and Trivandrum district.',
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
