import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms and conditions for Hitech Systems, Kallara.',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-3xl) var(--space-md)' }}>
      <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'var(--space-xl)' }}>Terms</h1>

      <div style={{ maxWidth: '65ch' }}>
        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Service requests</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          A service request submitted through this website is not a contract. It is a request for Hitech to
          contact you. We will discuss the work, provide an estimate, and proceed only with your agreement.
          No charges apply until you authorise the work.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Product orders</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Prices shown on this website are indicative and subject to change. A placed order is confirmed only
          when we contact you. Payment is collected at the time of collection or delivery unless otherwise agreed.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Warranty</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Products sold by Hitech carry the manufacturer&apos;s warranty. Warranty terms, duration and coverage
          are as stated by the brand. Hitech facilitates warranty service but is not the warrantor.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Repair services</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Repair estimates are given after diagnosis. If you choose not to proceed after diagnosis, a diagnostic
          fee may apply. We will inform you of this before beginning work.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Limitation</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          This website is provided as-is. While we make every effort to keep information accurate, we do not
          guarantee that all details (prices, stock status, service availability) are current at all times.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Governing law</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of
          the courts in Trivandrum, Kerala.
        </p>
      </div>
    </div>
  );
}
