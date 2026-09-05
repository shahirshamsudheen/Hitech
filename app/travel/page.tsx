'use client';

import { useState } from 'react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from '../security/page.module.css';

const TRAVEL_SERVICES = [
  'Air ticketing, domestic and international',
  'Visa processing, including Schengen',
  'Foreign medical appointments',
  'Train tickets',
  'Tour packages',
  'Hotel booking',
  'Passport applications',
  'Online fee and bill payments',
];

export default function TravelPage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', service: '', dateFrom: '', dateTo: '',
    travellers: '', destination: '', notes: '', consent: false,
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
    if (!formData.service) errs.service = 'Select a service.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setReference(generateReference('TR'));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.confirmation}>
              <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <h1 className={styles.confirmHeading}>Travel enquiry received.</h1>
              <p className={styles.referenceNumber}>{reference}</p>
              <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
              <a href={buildWhatsAppUrl({ reference, module: 'travel' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Ask on WhatsApp</a>
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
          <h1 className={styles.heading}>Tickets, visas and passports, at the same counter.</h1>
          <p className={styles.intro}>Official Akbar Travels partner.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.serviceItemList}>
            {TRAVEL_SERVICES.map(s => (
              <div key={s} className={styles.serviceItem}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Travel enquiry</h2>
          <p className={styles.formSubheading}>Tell us what you need and we will get back to you.</p>

          <div className="form-group">
            <label htmlFor="tr-name" className="form-label">Name <span className="required">*</span></label>
            <input id="tr-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={e => updateField('name', e.target.value)} />
            {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="tr-mobile" className="form-label">Mobile <span className="required">*</span></label>
            <input id="tr-mobile" type="tel" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} />
            {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="tr-service" className="form-label">Service needed <span className="required">*</span></label>
            <select id="tr-service" className={`form-input ${errors.service ? 'error' : ''}`} value={formData.service} onChange={e => updateField('service', e.target.value)}>
              <option value="">Select</option>
              {TRAVEL_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.service && <p className="form-error" role="alert">{errors.service}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tr-from" className="form-label">Travel date (from)</label>
              <input id="tr-from" type="date" className="form-input" value={formData.dateFrom} onChange={e => updateField('dateFrom', e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="tr-to" className="form-label">Travel date (to)</label>
              <input id="tr-to" type="date" className="form-input" value={formData.dateTo} onChange={e => updateField('dateTo', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tr-travellers" className="form-label">Number of travellers</label>
              <input id="tr-travellers" type="number" min="1" className="form-input" value={formData.travellers} onChange={e => updateField('travellers', e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="tr-dest" className="form-label">Destination</label>
              <input id="tr-dest" type="text" className="form-input" value={formData.destination} onChange={e => updateField('destination', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tr-notes" className="form-label">Notes</label>
            <textarea id="tr-notes" className="form-input" rows={3} value={formData.notes} onChange={e => updateField('notes', e.target.value)} />
          </div>
          <div className="form-group">
            <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
              <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} />
              I agree to Hitech contacting me about this request, including on WhatsApp.
            </label>
            {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>Submit enquiry</button>
        </div>
      </div>
    </div>
  );
}
