import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security & Surveillance',
  description:
    'CCTV supply and installation, access control, biometric attendance, networking, and structured cabling across Kerala.',
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
