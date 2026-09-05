import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CCTV Installation & Security Systems — Trivandrum District',
  description:
    'CCTV supply, installation, access control, biometric systems and networking for businesses and government offices. Installed and maintained by Hitech, Kallara.',
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
