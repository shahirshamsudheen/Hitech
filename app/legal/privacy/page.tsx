import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'Privacy notice for Hitech Systems, Kallara.',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-3xl) var(--space-md)' }}>
      <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'var(--space-xl)' }}>Privacy Notice</h1>

      <div style={{ maxWidth: '65ch' }}>
        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Who we are</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Hitech Systems (&quot;Hitech&quot;, &quot;we&quot;, &quot;us&quot;) is a technology service and sales business based at KG Building,
          Main Road, Kallara P.O, Trivandrum, Kerala 695608, India.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>What we collect</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          When you submit a form on this website, we collect the information you provide: your name, phone number,
          email (if given), equipment details, and the content of your request. We also collect basic analytics data
          (pages visited, clicks on module cards and phone numbers) using privacy-friendly tools that do not use cookies
          or track you across other websites.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>How we use it</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          We use your contact details solely to respond to your enquiry, process your service request, or fulfil
          your order. We do not sell, share or transfer your data to any third party, except where necessary to
          process a warranty claim with a brand partner (Acer, Epson, Asus, Canon) at your request.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>WhatsApp</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          If you consent to being contacted via WhatsApp, we may send messages related to your request using
          the WhatsApp Business platform. WhatsApp&apos;s own privacy policy governs how WhatsApp handles your messages.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Your rights</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          You can ask us to delete your data at any time by calling +91 9496 818237 or sending a WhatsApp message.
        </p>

        <h2 style={{ fontSize: '1.125rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>Contact</h2>
        <p style={{ marginBottom: 'var(--space-md)', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          For any privacy-related questions, contact us at +91 9496 818237 or visit us at the shop.
        </p>
      </div>
    </div>
  );
}
