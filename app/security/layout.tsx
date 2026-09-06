import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'CCTV supply and installation, access control, biometric attendance, networking, and structured cabling in Kallara, Trivandrum.',
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
