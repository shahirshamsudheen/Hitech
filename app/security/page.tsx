'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Video, ShieldCheck } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const SERVICES = [
  { key: 'cctv', icon: Video, heading: 'CCTV Supply & Installation', line: 'Dome, bullet, IP and PTZ cameras. DVR/NVR systems, remote viewing setup, and retention planning. For shops, offices, factories, schools and public buildings.' },
  { key: 'other', icon: ShieldCheck, heading: 'Other Security Solutions', line: 'Access control, biometric attendance, video door phones, intercom systems, networking, structured cabling, and repairs to existing systems.' },
];

function SecurityContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);

  const [formData, setFormData] = useState({
    name: '', mobile: '', isWhatsApp: 'Yes', organisation: '',
    customerType: '', siteLocation: '', needs: '',
    cameraCount: '', timeline: '', notes: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const activeService = SERVICES.find(s => s.key === selectedService);

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Enter your name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
      errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.siteLocation.trim()) errs.siteLocation = 'Enter the site location.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setReference(generateReference('SS'));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.confirmSection}>
          <div className={styles.confirmCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <h1 className={styles.confirmHeading}>Site survey request received.</h1>
            <p className={styles.referenceNumber}>{reference}</p>
            <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day to arrange a visit.</p>
            <a href={buildWhatsAppUrl({ reference, module: 'security' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Send site photos on WhatsApp</a>
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
          <h1 className={styles.heading}>Installed properly, documented, and maintained.</h1>
          <p className={styles.intro}>
            We supply, install and maintain security and network systems for private companies
            and government offices across Trivandrum district.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className={styles.serviceCards}>
        <div className={styles.serviceCardsInner}>
          {SERVICES.map(s => {
            const Icon = s.icon;
            return (
              <button key={s.key} className={`${styles.serviceCard} ${selectedService === s.key ? styles.serviceCardActive : ''}`} onClick={() => setSelectedService(s.key)}>
                <div className={styles.serviceIconWrapper}>
                  <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className={styles.serviceCardHeading}>{s.heading}</h3>
                <p className={styles.serviceCardLine}>{s.line}</p>
              </button>
            );
          })}
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
                  <h2 className={styles.infoPanelHeading}>Request a site survey</h2>
                  <p className={styles.infoPanelText}>Tell us what you need and we will come and look. We install and maintain systems for government offices, schools, and private businesses.</p>
                </>
              )}
              <div className={styles.infoPanelDetails}>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Response</span><span className={styles.infoItemValue}>Within 1 working day</span></div>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Service area</span><span className={styles.infoItemValue}>Trivandrum district</span></div>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Contact</span><span className={styles.infoItemValue}>+91 9496 818237</span></div>
              </div>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>Site survey request</h2>
              <p className={styles.formSubheading}>Tell us what you need and we will come and look.</p>

              <div className="form-group"><label htmlFor="ss-name" className="form-label">Name <span className="required">*</span></label><input id="ss-name" type="text" className={`form-input ${errors.name?'error':''}`} value={formData.name} onChange={e=>updateField('name',e.target.value)} />{errors.name&&<p className="form-error" role="alert">{errors.name}</p>}</div>
              <div className="form-group"><label htmlFor="ss-mobile" className="form-label">Mobile <span className="required">*</span></label><input id="ss-mobile" type="tel" className={`form-input ${errors.mobile?'error':''}`} value={formData.mobile} onChange={e=>updateField('mobile',e.target.value)} />{errors.mobile&&<p className="form-error" role="alert">{errors.mobile}</p>}</div>
              <div className="form-group"><label htmlFor="ss-org" className="form-label">Organisation</label><input id="ss-org" type="text" className="form-input" value={formData.organisation} onChange={e=>updateField('organisation',e.target.value)} /></div>
              <div className="form-group"><span className="form-label">Customer type</span><div className="radio-group">{['Home','Business','Government or institution'].map(opt=>(<label key={opt} className={`radio-option ${formData.customerType===opt?'selected':''}`}><input type="radio" name="ss-custtype" value={opt} checked={formData.customerType===opt} onChange={()=>updateField('customerType',opt)} />{opt}</label>))}</div></div>
              <div className="form-group"><label htmlFor="ss-location" className="form-label">Site location <span className="required">*</span></label><input id="ss-location" type="text" className={`form-input ${errors.siteLocation?'error':''}`} value={formData.siteLocation} onChange={e=>updateField('siteLocation',e.target.value)} />{errors.siteLocation&&<p className="form-error" role="alert">{errors.siteLocation}</p>}</div>
              <div className="form-group"><label htmlFor="ss-cameras" className="form-label">Approximate number of cameras/points</label><select id="ss-cameras" className="form-input" value={formData.cameraCount} onChange={e=>updateField('cameraCount',e.target.value)}><option value="">Select</option>{['1–4','5–8','9–16','17–32','More than 32','Not sure'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              <div className="form-group"><label htmlFor="ss-timeline" className="form-label">When do you need it</label><select id="ss-timeline" className="form-input" value={formData.timeline} onChange={e=>updateField('timeline',e.target.value)}><option value="">Select</option>{['This week','This month','Planning ahead'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              <div className="form-group"><label htmlFor="ss-notes" className="form-label">Notes</label><textarea id="ss-notes" className="form-input" rows={3} value={formData.notes} onChange={e=>updateField('notes',e.target.value)} /></div>
              <div className="form-group"><label className={`checkbox-option ${formData.consent?'selected':''}`}><input type="checkbox" checked={formData.consent} onChange={e=>updateField('consent',e.target.checked)} />I agree to HITECH contacting me about this request, including on WhatsApp.</label>{errors.consent&&<p className="form-error" role="alert">{errors.consent}</p>}</div>
              <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{width:'100%'}}>Submit site survey request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>Loading...</div>}>
      <SecurityContent />
    </Suspense>
  );
}

