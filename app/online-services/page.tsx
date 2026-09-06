'use client';

import { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileEdit, Fingerprint, Receipt, Zap, Landmark, BadgePercent, FileText, Globe } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const EGOV_SERVICES = [
  { key: 'psc', icon: FileEdit, heading: 'Kerala PSC Applications', line: 'One-time registration, profile updates, certificates upload, and competitive exam applications.' },
  { key: 'aadhaar', icon: Fingerprint, heading: 'Aadhaar Service Desk', line: 'Biometric appointments, address & mobile updates, PVC card orders, and document linking.' },
  { key: 'kseb', icon: Zap, heading: 'KSEB Electricity Services', line: 'Instant bill payment, tariff changes, meter shifting applications, and load enhancement.' },
  { key: 'gov-fees', icon: Landmark, heading: 'Government Treasury & Fees', line: 'e-Treasury challans, university exam fees, police verification fees, and vehicle road tax.' },
  { key: 'tax', icon: BadgePercent, heading: 'Panchayat & Property Tax', line: 'Building tax payments, land tax receipts (Sanchaya / Thandapper), and professional tax.' },
  { key: 'bills', icon: Receipt, heading: 'Utility & Bill Payments', line: 'Water authority payments, BSNL & telephone bills, insurance premiums, and FASTag recharges.' },
  { key: 'other-egov', icon: FileText, heading: 'Certificates & Other Online', line: 'Income, caste, nativity certificate applications via Akshaya / e-District portals.' },
];

function EGovServicesContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);

  const nameInputRef = useRef<HTMLInputElement>(null);

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

  const handleSelectService = (key: string, title: string) => {
    setSelectedService(key);
    updateField('service', title);
    nameInputRef.current?.focus();
  };

  const activeService = EGOV_SERVICES.find(s => s.key === selectedService);

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
        <div className={styles.splitContainer}>
          <div className={styles.confirmCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className={styles.confirmHeading}>Enquiry received.</h1>
            <p className={styles.referenceNumber}>Reference: {reference}</p>
            <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
            <a href={buildWhatsAppUrl({ reference, module: 'online-services' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Globe size={14} />
            <span>e-Governance &amp; Citizen Counter</span>
          </div>
          <h1 className={styles.heading}>Government and online applications, handled at the counter.</h1>
          <p className={styles.intro}>
            Forms, applications, utility payments and certificates. Bring your documents to our centre
            and our desk assists you step-by-step with zero hassle.
          </p>
        </div>
      </section>

      {/* Interactive Section (White Cards on Left + Form on Right) */}
      <section className={styles.splitSection} aria-label="eGov services selection and enquiry">
        <div className={styles.splitContainer}>
          <div className={styles.splitGrid}>
            {/* Left Column: White Service Cards */}
            <div className={styles.leftColumn}>
              <p className={styles.sectionSubhead}>Select required eGov service</p>
              <div className={styles.servicesGrid}>
                {EGOV_SERVICES.map(s => {
                  const Icon = s.icon;
                  const isSelected = selectedService === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      className={`${styles.serviceCard} ${isSelected ? styles.serviceCardActive : ''}`}
                      onClick={() => handleSelectService(s.key, s.heading)}
                    >
                      <div className={styles.serviceIconWrapper}>
                        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h2 className={styles.serviceCardHeading}>{s.heading}</h2>
                      <p className={styles.serviceCardLine}>{s.line}</p>
                    </button>
                  );
                })}
              </div>

              <div className={styles.infoMetaRow}>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Counter Location</span>
                  <span className={styles.metaValue}>Main Road, Kallara</span>
                </div>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Response</span>
                  <span className={styles.metaValue}>Within 1 working day</span>
                </div>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Office Phone</span>
                  <span className={styles.metaValue}>+91 472 296007</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form Starting at the Top */}
            <div className={styles.rightColumn}>
              <div className={styles.formCard}>
                <h2 className={styles.formHeading}>eGov enquiry</h2>
                <p className={styles.formSubheading}>Tell us what you need and our desk will prepare instructions.</p>

                {activeService && (
                  <div className={styles.activeServiceIndicator}>
                    <span>Selected: {activeService.heading}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="os-name" className="form-label">Name <span className="required">*</span></label>
                  <input
                    ref={nameInputRef}
                    id="os-name"
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="os-mobile" className="form-label">Mobile number <span className="required">*</span></label>
                  <input
                    id="os-mobile"
                    type="tel"
                    className={`form-input ${errors.mobile ? 'error' : ''}`}
                    value={formData.mobile}
                    onChange={e => updateField('mobile', e.target.value)}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="os-service" className="form-label">Which service <span className="required">*</span></label>
                  <select
                    id="os-service"
                    className={`form-input ${errors.service ? 'error' : ''}`}
                    value={formData.service}
                    onChange={e => updateField('service', e.target.value)}
                  >
                    <option value="">Select service</option>
                    {EGOV_SERVICES.map(s => (
                      <option key={s.key} value={s.heading}>{s.heading}</option>
                    ))}
                    <option value="Other Online Application">Other Online Application</option>
                  </select>
                  {errors.service && <p className="form-error" role="alert">{errors.service}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="os-notes" className="form-label">Specific details or document queries</label>
                  <textarea
                    id="os-notes"
                    className="form-input"
                    rows={3}
                    value={formData.notes}
                    onChange={e => updateField('notes', e.target.value)}
                    placeholder="e.g. Which certificate, registration number, deadline..."
                  />
                </div>

                <div className="form-group">
                  <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={e => updateField('consent', e.target.checked)}
                    />
                    I agree to HITECH contacting me regarding this eGov enquiry.
                  </label>
                  {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
                </div>

                <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>
                  Submit enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function EGovServicesPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>Loading...</div>}>
      <EGovServicesContent />
    </Suspense>
  );
}
