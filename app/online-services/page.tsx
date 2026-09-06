'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileEdit, Fingerprint, Receipt, Zap, Landmark, BadgePercent, FileText } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const EGOV_SERVICES = [
  { key: 'psc', icon: FileEdit, heading: 'PSC Applications', line: 'Kerala Public Service Commission exam registration, one-time verification, and application form filling assistance.' },
  { key: 'aadhaar', icon: Fingerprint, heading: 'Aadhaar Support', line: 'New Aadhaar enrollment, address update, mobile number linking, and biometric update appointments.' },
  { key: 'bills', icon: Receipt, heading: 'Online Bill Payments', line: 'KSEB electricity bills, government fees, tax payments, and other utility bill payments.' },
  { key: 'kseb', icon: Zap, heading: 'KSEB Bill Payment', line: 'Kerala State Electricity Board bill payment, new connection applications, and load change requests.' },
  { key: 'gov-fees', icon: Landmark, heading: 'Government Fees', line: 'Challan payments, license fees, permit fees, registration fees, and other government-related payments.' },
  { key: 'tax', icon: BadgePercent, heading: 'Tax Payments', line: 'Income tax, property tax, vehicle tax, and professional tax payment assistance and filing.' },
  { key: 'bills-other', icon: FileText, heading: 'Other Payments', line: 'Water bills, phone bills, insurance premiums, and any other online payment assistance you need.' },
];

function EGovServicesContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);

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
        <div className={styles.confirmSection}>
          <div className={styles.confirmCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <h1 className={styles.confirmHeading}>Enquiry received.</h1>
            <p className={styles.referenceNumber}>{reference}</p>
            <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
            <a href={buildWhatsAppUrl({ reference, module: 'online-services' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Ask on WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>Government and online applications, handled at the counter.</h1>
          <p className={styles.intro}>
            Forms, applications, payments and certificates. Bring your documents and we will do it with you.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className={styles.serviceCards}>
        <div className={styles.serviceCardsInner}>
          <p className={styles.servicesLabel}>Select a service</p>
          <div className={styles.servicesGrid}>
            {EGOV_SERVICES.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.key} className={`${styles.serviceCard} ${selectedService === s.key ? styles.serviceCardActive : ''}`} onClick={() => { setSelectedService(s.key); updateField('service', s.heading); }}>
                  <div className={styles.serviceIconWrapper}>
                    <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className={styles.serviceCardHeading}>{s.heading}</h3>
                  <p className={styles.serviceCardLine}>{s.line}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Split layout */}
      <div className={styles.splitSection}>
        <div className={styles.splitInner}>
          <div className={styles.infoPanel}>
            <div className={styles.infoPanelSticky}>
              {activeService ? (
                <>
                  <div className={styles.infoPanelIconWrapper}>
                    <activeService.icon size={32} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h2 className={styles.infoPanelHeading}>{activeService.heading}</h2>
                  <p className={styles.infoPanelText}>{activeService.line}</p>
                </>
              ) : (
                <>
                  <h2 className={styles.infoPanelHeading}>eGov enquiry</h2>
                  <p className={styles.infoPanelText}>Not all services are listed yet. Ask us and we will tell you if we can help.</p>
                </>
              )}
              <div className={styles.infoPanelDetails}>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Walk-in</span><span className={styles.infoItemValue}>Bring your documents</span></div>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Response</span><span className={styles.infoItemValue}>Within 1 working day</span></div>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Contact</span><span className={styles.infoItemValue}>+91 9496 818237</span></div>
              </div>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>eGov service enquiry</h2>
              <p className={styles.formSubheading}>Tell us what you need and we will get back to you.</p>

              <div className="form-group"><label htmlFor="os-name" className="form-label">Name <span className="required">*</span></label><input id="os-name" type="text" className={`form-input ${errors.name?'error':''}`} value={formData.name} onChange={e=>updateField('name',e.target.value)} />{errors.name&&<p className="form-error" role="alert">{errors.name}</p>}</div>
              <div className="form-group"><label htmlFor="os-mobile" className="form-label">Mobile <span className="required">*</span></label><input id="os-mobile" type="tel" className={`form-input ${errors.mobile?'error':''}`} value={formData.mobile} onChange={e=>updateField('mobile',e.target.value)} />{errors.mobile&&<p className="form-error" role="alert">{errors.mobile}</p>}</div>
              <div className="form-group"><label htmlFor="os-service" className="form-label">Which service <span className="required">*</span></label><select id="os-service" className={`form-input ${errors.service?'error':''}`} value={formData.service} onChange={e=>updateField('service',e.target.value)}><option value="">Select</option>{EGOV_SERVICES.map(s=><option key={s.key} value={s.heading}>{s.heading}</option>)}<option value="Something else">Something else</option></select>{errors.service&&<p className="form-error" role="alert">{errors.service}</p>}</div>
              <div className="form-group"><label htmlFor="os-notes" className="form-label">Notes</label><textarea id="os-notes" className="form-input" rows={3} value={formData.notes} onChange={e=>updateField('notes',e.target.value)} /></div>
              <div className="form-group"><label className={`checkbox-option ${formData.consent?'selected':''}`}><input type="checkbox" checked={formData.consent} onChange={e=>updateField('consent',e.target.checked)} />I agree to HITECH contacting me about this request, including on WhatsApp.</label>{errors.consent&&<p className="form-error" role="alert">{errors.consent}</p>}</div>
              <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{width:'100%'}}>Submit enquiry</button>
            </div>
          </div>
        </div>
      </div>
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

