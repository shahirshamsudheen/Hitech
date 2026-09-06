import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service & Repair',
  description:
    'Computer repair, laptop service, motherboard and chip-level repair, printer service, data recovery, and annual maintenance contracts in Kallara, Trivandrum.',
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
