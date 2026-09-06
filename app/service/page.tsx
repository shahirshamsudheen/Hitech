'use client';

import { Suspense, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateReference } from '@/lib/referenceGenerator';
import { buildServiceWhatsAppUrl, buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

/* ── Service definitions ───────────────────────────────────────────────── */

const SERVICES = [
  { key: 'amc', icon: '📋', heading: 'Annual Maintenance Contracts', line: 'Scheduled maintenance for businesses and offices. Regular check-ups, preventive care, and priority response when something breaks.' },
  { key: 'os-software', icon: '⚙️', heading: 'Operating System & Software', line: 'Installation, updates, troubleshooting, virus removal, and software configuration for all platforms.' },
  { key: 'laptop-desktop', icon: '💻', heading: 'Laptop / Desktop Repair', line: 'Hardware and software issues across all brands. Screen replacement, keyboard repair, battery issues, and more.' },
  { key: 'motherboard', icon: '🔬', heading: 'Motherboard & Chip-Level Repair', line: 'BGA rework, component-level diagnostics. We repair the board instead of replacing it — saving you a significant cost.' },
  { key: 'printer', icon: '🖨️', heading: 'Printer Service', line: 'Laser, inkjet, dot matrix — all brands. Drum replacement, paper feed issues, print quality problems, and network printing setup.' },
  { key: 'data-recovery', icon: '💾', heading: 'Data Recovery', line: 'Recovery from failed hard drives, SSDs, USB drives, and memory cards. Logical and physical recovery options.' },
  { key: 'on-site', icon: '🏢', heading: 'On-Site Service', line: 'We come to your location. For businesses and offices across Trivandrum district. Same-day availability for AMC customers.' },
  { key: 'other', icon: '🔧', heading: 'Other Electronics', line: 'UPS, stabilizers, networking equipment, projectors, and other electronic devices. Ask us — we probably fix it.' },
];

const AREA_SUGGESTIONS = [
  'Kallara', 'Nedumangad', 'Kilimanoor', 'Palode', 'Pangode',
  'Vamanapuram', 'Attingal', 'Trivandrum city', 'Other',
];

/* ── Component ─────────────────────────────────────────────────────────── */

function ServiceContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', area: '',
    customerType: '', orgName: '',
    serviceType: '', equipmentType: '', brand: '',
    problem: '', urgency: 'Normal', notes: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const updateField = useCallback((field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const selectService = (key: string) => {
    setSelectedService(key);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeService = SERVICES.find(s => s.key === selectedService);

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Enter your full name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
      errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.area.trim()) errs.area = 'Enter your area or town.';
    if (!formData.problem.trim() || formData.problem.trim().length < 10)
      errs.problem = 'Describe the problem in at least 10 characters.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const ref = generateReference('SR');
    setReference(ref);
    setSubmitted(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (submitted) {
    const whatsAppUrl = buildServiceWhatsAppUrl({
      reference,
      name: formData.fullName,
      equipment: formData.equipmentType || 'Not specified',
      brand: formData.brand || 'Not specified',
      problem: formData.problem.slice(0, 100),
    });

    return (
      <div className={styles.page}>
        <div className={styles.formSection} ref={formRef}>
          <div className={styles.confirmationCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className={styles.confirmHeading}>Request received.</h1>
            <p className={styles.referenceNumber}>Your reference is {reference}</p>
            <p className={styles.confirmText}>
              We will call you on {formData.mobile} within one working day.
              If it is urgent, call us on +91 9496 818237 or send the same details on WhatsApp.
            </p>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Send this on WhatsApp instead
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>Repaired, not replaced.</h1>
          <p className={styles.intro}>
            Most repair shops replace the board. We repair the board. It has been our main
            service since 2016, it costs a fraction of a replacement, and it is why machines
            other people wrote off are still working.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className={styles.servicesList} aria-label="Services we offer">
        <div className={styles.servicesInner}>
          <p className={styles.servicesLabel}>Select a service</p>
          <div className={styles.servicesGrid}>
            {SERVICES.map(s => (
              <button
                key={s.key}
                className={`${styles.serviceCard} ${selectedService === s.key ? styles.serviceCardActive : ''}`}
                onClick={() => selectService(s.key)}
              >
                <span className={styles.serviceIcon} aria-hidden="true">{s.icon}</span>
                <h3 className={styles.serviceCardHeading}>{s.heading}</h3>
                <p className={styles.serviceCardLine}>{s.line}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Split layout: Info + Form */}
      <div className={styles.splitSection} ref={formRef}>
        <div className={styles.splitInner}>
          {/* Left: Service info */}
          <div className={styles.infoPanel}>
            <div className={styles.infoPanelSticky}>
              {activeService ? (
                <>
                  <span className={styles.infoPanelIcon}>{activeService.icon}</span>
                  <h2 className={styles.infoPanelHeading}>{activeService.heading}</h2>
                  <p className={styles.infoPanelText}>{activeService.line}</p>
                  <div className={styles.infoPanelDetails}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoItemLabel}>Response time</span>
                      <span className={styles.infoItemValue}>Within 1 working day</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoItemLabel}>Service area</span>
                      <span className={styles.infoItemValue}>Kallara & Trivandrum district</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoItemLabel}>Contact</span>
                      <span className={styles.infoItemValue}>+91 9496 818237</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={styles.infoPanelHeading}>Book a service request</h2>
                  <p className={styles.infoPanelText}>
                    Select a service above or fill in the form directly. We will call you within one working day.
                  </p>
                  <div className={styles.infoPanelDetails}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoItemLabel}>Response time</span>
                      <span className={styles.infoItemValue}>Within 1 working day</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoItemLabel}>Board-level repair</span>
                      <span className={styles.infoItemValue}>Since 2016</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoItemLabel}>Contact</span>
                      <span className={styles.infoItemValue}>+91 9496 818237</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>Service request</h2>
              <p className={styles.formSubheading}>
                Fill this in and we will call you. It takes about two minutes.
              </p>

              <div className="form-group">
                <label htmlFor="sr-name" className="form-label">Full name <span className="required">*</span></label>
                <input id="sr-name" type="text" className={`form-input ${errors.fullName ? 'error' : ''}`} value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} />
                {errors.fullName && <p className="form-error" role="alert">{errors.fullName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="sr-mobile" className="form-label">Mobile number <span className="required">*</span></label>
                <input id="sr-mobile" type="tel" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} placeholder="10-digit number" />
                {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="sr-email" className="form-label">Email</label>
                <input id="sr-email" type="email" className="form-input" value={formData.email} onChange={e => updateField('email', e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="sr-area" className="form-label">Area / town <span className="required">*</span></label>
                <input id="sr-area" type="text" className={`form-input ${errors.area ? 'error' : ''}`} value={formData.area} onChange={e => updateField('area', e.target.value)} list="area-list" />
                <datalist id="area-list">{AREA_SUGGESTIONS.map(a => <option key={a} value={a} />)}</datalist>
                {errors.area && <p className="form-error" role="alert">{errors.area}</p>}
              </div>

              <div className="form-group">
                <span className="form-label">Customer type</span>
                <div className="radio-group">
                  {['Home user', 'Business', 'Government or institution'].map(opt => (
                    <label key={opt} className={`radio-option ${formData.customerType === opt ? 'selected' : ''}`}>
                      <input type="radio" name="sr-custtype" value={opt} checked={formData.customerType === opt} onChange={() => updateField('customerType', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {(formData.customerType === 'Business' || formData.customerType === 'Government or institution') && (
                <div className="form-group">
                  <label htmlFor="sr-org" className="form-label">Organisation name</label>
                  <input id="sr-org" type="text" className="form-input" value={formData.orgName} onChange={e => updateField('orgName', e.target.value)} />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="sr-equipment" className="form-label">Equipment type</label>
                <select id="sr-equipment" className="form-input" value={formData.equipmentType} onChange={e => updateField('equipmentType', e.target.value)}>
                  <option value="">Select</option>
                  {['Laptop', 'Desktop', 'All-in-one', 'Printer', 'Monitor', 'CCTV', 'Network equipment', 'Server', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sr-brand" className="form-label">Brand</label>
                <select id="sr-brand" className="form-input" value={formData.brand} onChange={e => updateField('brand', e.target.value)}>
                  <option value="">Select</option>
                  {['HP', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Apple', 'Samsung', 'LG', 'Canon', 'Epson', 'Other'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sr-problem" className="form-label">What is happening? <span className="required">*</span></label>
                <textarea id="sr-problem" className={`form-input ${errors.problem ? 'error' : ''}`} rows={4} value={formData.problem} onChange={e => updateField('problem', e.target.value)} placeholder="Describe the problem in your own words." />
                {errors.problem && <p className="form-error" role="alert">{errors.problem}</p>}
              </div>

              <div className="form-group">
                <span className="form-label">Urgency</span>
                <div className="radio-group">
                  {['Normal', 'Urgent'].map(opt => (
                    <label key={opt} className={`radio-option ${formData.urgency === opt ? 'selected' : ''}`}>
                      <input type="radio" name="sr-urgency" value={opt} checked={formData.urgency === opt} onChange={() => updateField('urgency', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sr-notes" className="form-label">Anything else</label>
                <textarea id="sr-notes" className="form-input" rows={2} value={formData.notes} onChange={e => updateField('notes', e.target.value)} />
              </div>

              <div className="form-group">
                <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
                  <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} />
                  I agree to HITECH contacting me about this request, including on WhatsApp.
                </label>
                {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
              </div>

              <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>
                Submit service request
              </button>

              <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
                <a href={buildWhatsAppUrl({ module: 'service' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%' }}>
                  Or ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicePage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>Loading...</div>}>
      <ServiceContent />
    </Suspense>
  );
}

