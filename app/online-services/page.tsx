'use client';

import { useState } from 'react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import servicesData from '@/data/online-services.json';
import styles from '../security/page.module.css';

interface OnlineService {
  title: string;
  description: string;
  documentsNeeded: string[];
  approxTime: string;
}

const services: OnlineService[] = servicesData as OnlineService[];

export default function OnlineServicesPage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', service: '', notes: '', consent: false,
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
    setReference(generateReference('OS'));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.confirmation}>
              <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <h1 className={styles.confirmHeading}>Enquiry received.</h1>
              <p className={styles.referenceNumber}>{reference}</p>
              <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
              <a href={buildWhatsAppUrl({ reference, module: 'online-services' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Ask on WhatsApp</a>
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
          <h1 className={styles.heading}>Government and online applications, handled at the counter.</h1>
          <p className={styles.intro}>
            Forms, applications, payments and certificates. Bring your documents and we will do it with you.
          </p>
        </div>
      </section>

      {/* Services list from data file */}
      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          {services.map(service => (
            <div key={service.title} className={styles.onlineServiceCard}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.documentsNeeded.length > 0 && (
                <>
                  <p className={styles.docsLabel}>Documents to bring</p>
                  <ul className={styles.docsList}>
                    {service.documentsNeeded.map(doc => (
                      <li key={doc}>{doc}</li>
                    ))}
                  </ul>
                </>
              )}
              <p className={styles.timeEstimate}>Approximately {service.approxTime}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Ask if we can do yours</h2>
          <p className={styles.formSubheading}>Not all services are listed yet. Ask and we will tell you.</p>

          <div className="form-group">
            <label htmlFor="os-name" className="form-label">Name <span className="required">*</span></label>
            <input id="os-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={e => updateField('name', e.target.value)} />
            {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="os-mobile" className="form-label">Mobile <span className="required">*</span></label>
            <input id="os-mobile" type="tel" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} />
            {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="os-service" className="form-label">Which service <span className="required">*</span></label>
            <select id="os-service" className={`form-input ${errors.service ? 'error' : ''}`} value={formData.service} onChange={e => updateField('service', e.target.value)}>
              <option value="">Select</option>
              {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
              <option value="Something else">Something else</option>
            </select>
            {errors.service && <p className="form-error" role="alert">{errors.service}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="os-notes" className="form-label">Notes</label>
            <textarea id="os-notes" className="form-input" rows={3} value={formData.notes} onChange={e => updateField('notes', e.target.value)} />
          </div>
          <div className="form-group">
            <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
              <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} />
              I agree to Hitech contacting me about this request, including on WhatsApp.
            </label>
            {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>Submit enquiry</button>

          <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
            <a href={buildWhatsAppUrl({ module: 'online-services' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
