'use client';

import { useState } from 'react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from '../security/page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', message: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Enter your name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.message.trim()) errs.message = 'Enter your message.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setReference(generateReference('GE'));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.confirmation}>
              <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <h1 className={styles.confirmHeading}>Message sent.</h1>
              <p className={styles.referenceNumber}>{reference}</p>
              <p className={styles.confirmText}>We will get back to you on {formData.mobile}.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>Get in touch</h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-xl)' }}>
            <div>
              <div className={styles.contentBlock}>
                <h2>Address</h2>
                <p>
                  KG Building, Main Road<br />
                  Kallara P.O, Trivandrum<br />
                  Kerala 695608
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h2>Phone Directory</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: 'var(--olive)', color: '#fff', borderRadius: '4px' }}>Tel 1</span>
                    <a href="tel:+919496818237" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>+91 9496 818237 <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 400 }}>(WhatsApp / Primary)</span></a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#3A6351', color: '#fff', borderRadius: '4px' }}>Landline</span>
                    <a href="tel:+914722960076" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>+91 472 296007 <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 400 }}>(Office)</span></a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#5A6D63', color: '#fff', borderRadius: '4px' }}>Tel 2</span>
                    <a href="tel:+919447765757" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>+91 9447 765757 <span style={{ fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 400 }}>(Direct Helpline)</span></a>
                  </div>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <h2>WhatsApp</h2>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Message us on WhatsApp
                </a>
              </div>

              <div className={styles.contentBlock}>
                <h2>Hours</h2>
                <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                  Monday – Saturday · Hours to be confirmed
                </p>
              </div>
            </div>

            {/* Map */}
            <div style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--rule)',
              minHeight: '300px',
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5!2d77.023!3d8.654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzknMTQuNCJOIDc3wrAwMScyMy41IkU!5e0!3m2!1sen!2sin!4v1"
                style={{ width: '100%', height: '100%', minHeight: '300px', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hitech Systems location on Google Maps"
              />
            </div>
          </div>
        </div>
      </section>

      {/* General enquiry form */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Send us a message</h2>

          <div className="form-group">
            <label htmlFor="ct-name" className="form-label">Name <span className="required">*</span></label>
            <input id="ct-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={e => updateField('name', e.target.value)} />
            {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="ct-mobile" className="form-label">Mobile <span className="required">*</span></label>
            <input id="ct-mobile" type="tel" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} />
            {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="ct-email" className="form-label">Email</label>
            <input id="ct-email" type="email" className="form-input" value={formData.email} onChange={e => updateField('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="ct-message" className="form-label">Message <span className="required">*</span></label>
            <textarea id="ct-message" className={`form-input ${errors.message ? 'error' : ''}`} rows={4} value={formData.message} onChange={e => updateField('message', e.target.value)} />
            {errors.message && <p className="form-error" role="alert">{errors.message}</p>}
          </div>
          <div className="form-group">
            <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
              <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} />
              I agree to Hitech contacting me about this message.
            </label>
            {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>Send message</button>
        </div>
      </div>
    </div>
  );
}
