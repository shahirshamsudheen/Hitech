'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const SERVICES = [
  { heading: 'CCTV supply and installation', line: 'Dome, bullet, IP and PTZ cameras for shops, offices, factories, schools and public buildings' },
  { heading: 'Recording and storage', line: 'DVR and NVR systems, hard disk sizing, retention planning' },
  { heading: 'Remote viewing', line: 'Mobile and desktop access to your own cameras, set up and explained' },
  { heading: 'CCTV maintenance and AMC', line: 'Scheduled checks, cleaning, fault attendance, disk health' },
  { heading: 'Access control', line: 'Door access, biometric and card systems' },
  { heading: 'Biometric attendance systems', line: 'Time and attendance for offices and institutions' },
  { heading: 'Video door phones and intercom', line: 'For homes, offices and gated premises' },
  { heading: 'Networking and structured cabling', line: 'Cabling, switches, routers, access points, racks and labelling' },
  { heading: 'Repairs and upgrades to existing systems', line: 'Including systems installed by someone else' },
];

const NEEDS_OPTIONS = [
  'CCTV new installation', 'CCTV expansion', 'CCTV repair', 'Access control',
  'Attendance system', 'Video door phone', 'Networking and cabling',
  'Maintenance contract', 'Not sure',
];

const CAMERA_COUNT_OPTIONS = ['1–4', '5–8', '9–16', '17–32', 'More than 32', 'Not sure'];
const PREMISES_OPTIONS = ['Home', 'Shop', 'Office', 'Factory', 'School or college', 'Government office', 'Other'];
const TIMELINE_OPTIONS = ['This week', 'This month', 'Planning ahead'];

export default function SecurityPage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', isWhatsApp: 'Yes', organisation: '',
    customerType: '', siteLocation: '', needs: [] as string[],
    cameraCount: '', premisesType: '', timeline: '', notes: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const toggleNeed = (need: string) => {
    const current = formData.needs;
    if (current.includes(need)) {
      updateField('needs', current.filter(n => n !== need));
    } else {
      updateField('needs', [...current, need]);
    }
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Enter your name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
      errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.customerType) errs.customerType = 'Select a customer type.';
    if (!formData.siteLocation.trim()) errs.siteLocation = 'Enter the site location.';
    if (formData.needs.length === 0) errs.needs = 'Select at least one option.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';

    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const ref = generateReference('SS');
    setReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.confirmation}>
              <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <h1 className={styles.confirmHeading}>Site survey request received.</h1>
              <p className={styles.referenceNumber}>{reference}</p>
              <p className={styles.confirmText}>
                We will call you on {formData.mobile} within one working day to arrange a visit.
              </p>
              <a href={buildWhatsAppUrl({ reference, module: 'security' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Send site photos on WhatsApp
              </a>
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
          <h1 className={styles.heading}>Installed properly, documented, and maintained by the people who installed it.</h1>
          <p className={styles.intro}>
            We supply, install and maintain security and network systems for private companies
            and government offices across Trivandrum district. We are still responsible after the invoice is paid.
          </p>
        </div>
      </section>

      <section className={styles.servicesList}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesGrid}>
            {SERVICES.map(s => (
              <div key={s.heading} className={styles.serviceCard}>
                <h3 className={styles.serviceCardHeading}>{s.heading}</h3>
                <p className={styles.serviceCardLine}>{s.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className={styles.credibility}>
        <div className={styles.credibilityInner}>
          <p>
            We install and maintain systems for community health centres, family health centres,
            village offices, panchayat offices and government schools, as well as private companies
            including Daily Foods, Vrindhavanam Group, Ponmudi Mills, AKR Industries and MURKO.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Request a site survey</h2>
          <p className={styles.formSubheading}>Tell us what you need and we will come and look.</p>

          <div className="form-group">
            <label htmlFor="ss-name" className="form-label">Name <span className="required">*</span></label>
            <input id="ss-name" type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={e => updateField('name', e.target.value)} />
            {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ss-mobile" className="form-label">Mobile <span className="required">*</span></label>
            <input id="ss-mobile" type="tel" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} />
            {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
          </div>

          <div className="form-group">
            <span className="form-label">Is this number on WhatsApp?</span>
            <div className="radio-group">
              {['Yes', 'No'].map(opt => (
                <label key={opt} className={`radio-option ${formData.isWhatsApp === opt ? 'selected' : ''}`}>
                  <input type="radio" name="ss-whatsapp" value={opt} checked={formData.isWhatsApp === opt} onChange={() => updateField('isWhatsApp', opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ss-org" className="form-label">Organisation</label>
            <input id="ss-org" type="text" className="form-input" value={formData.organisation} onChange={e => updateField('organisation', e.target.value)} />
          </div>

          <div className="form-group">
            <span className="form-label">Customer type <span className="required">*</span></span>
            <div className="radio-group">
              {['Home', 'Business', 'Government or institution'].map(opt => (
                <label key={opt} className={`radio-option ${formData.customerType === opt ? 'selected' : ''}`}>
                  <input type="radio" name="ss-custtype" value={opt} checked={formData.customerType === opt} onChange={() => updateField('customerType', opt)} />
                  {opt}
                </label>
              ))}
            </div>
            {errors.customerType && <p className="form-error" role="alert">{errors.customerType}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ss-location" className="form-label">Site location <span className="required">*</span></label>
            <input id="ss-location" type="text" className={`form-input ${errors.siteLocation ? 'error' : ''}`} value={formData.siteLocation} onChange={e => updateField('siteLocation', e.target.value)} />
            {errors.siteLocation && <p className="form-error" role="alert">{errors.siteLocation}</p>}
          </div>

          <div className="form-group">
            <span className="form-label">What do you need? <span className="required">*</span></span>
            <div className="checkbox-group" style={{ flexDirection: 'column' }}>
              {NEEDS_OPTIONS.map(opt => (
                <label key={opt} className={`checkbox-option ${formData.needs.includes(opt) ? 'selected' : ''}`}>
                  <input type="checkbox" checked={formData.needs.includes(opt)} onChange={() => toggleNeed(opt)} />
                  {opt}
                </label>
              ))}
            </div>
            {errors.needs && <p className="form-error" role="alert">{errors.needs}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ss-cameras" className="form-label">Approximate number of cameras or points</label>
            <select id="ss-cameras" className="form-input" value={formData.cameraCount} onChange={e => updateField('cameraCount', e.target.value)}>
              <option value="">Select</option>
              {CAMERA_COUNT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ss-premises" className="form-label">Type of premises</label>
            <select id="ss-premises" className="form-input" value={formData.premisesType} onChange={e => updateField('premisesType', e.target.value)}>
              <option value="">Select</option>
              {PREMISES_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ss-timeline" className="form-label">When do you need it</label>
            <select id="ss-timeline" className="form-input" value={formData.timeline} onChange={e => updateField('timeline', e.target.value)}>
              <option value="">Select</option>
              {TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ss-notes" className="form-label">Notes</label>
            <textarea id="ss-notes" className="form-input" rows={3} value={formData.notes} onChange={e => updateField('notes', e.target.value)} />
          </div>

          <div className="form-group">
            <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
              <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} />
              I agree to Hitech contacting me about this request, including on WhatsApp.
            </label>
            {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
          </div>

          <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>
            Submit site survey request
          </button>
        </div>
      </div>
    </div>
  );
}
