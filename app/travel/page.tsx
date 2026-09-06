'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plane, Globe, Compass, HeartPulse, Map, Hotel, BookOpen } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const TRAVEL_SERVICES = [
  { key: 'air-ticketing', icon: Plane, heading: 'Air Ticketing', line: 'Domestic and international flights. Best fares from all major airlines.' },
  { key: 'visa', icon: Globe, heading: 'Visa Process', line: 'GCC countries, Schengen (all EU), USA, Australia, and others. Complete documentation support.' },
  { key: 'visa-gcc', icon: Globe, heading: 'Visa — GCC Countries', line: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait. Employment, visit, and tourist visas.' },
  { key: 'visa-schengen', icon: Globe, heading: 'Visa — Schengen (All EU)', line: 'Tourist, business, and student visas for all EU member countries.' },
  { key: 'visa-usa', icon: Globe, heading: 'Visa — USA', line: 'B1/B2 tourist and business visas. DS-160 form assistance and interview preparation.' },
  { key: 'visa-australia', icon: Globe, heading: 'Visa — Australia', line: 'Tourist, business, and student visas. Full documentation support.' },
  { key: 'visa-other', icon: Globe, heading: 'Visa — Other Countries', line: 'Any destination not listed. We handle documentation for most countries.' },
  { key: 'medical', icon: HeartPulse, heading: 'Foreign Medical Appointments', line: 'Appointment booking and travel arrangements for medical treatment abroad.' },
  { key: 'tours', icon: Compass, heading: 'Customized Tour Packages', line: 'Tailored itineraries for individuals, families, and groups.' },
  { key: 'tour-dubai', icon: Compass, heading: 'Tour — Dubai & Abu Dhabi', line: 'City tours, desert safari, attractions, shopping, and hotel packages.' },
  { key: 'tour-europe', icon: Compass, heading: 'Tour — Europe Packages', line: 'Multi-country European tours with flights, hotels, and guided experiences.' },
  { key: 'hotel', icon: Hotel, heading: 'Hotel Booking', line: 'Domestic and international hotel reservations at competitive rates.' },
  { key: 'passport', icon: BookOpen, heading: 'Passport Application', line: 'New passport, renewal, and tatkal applications. Form filling and documentation.' },
];

function TravelContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);

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

  const activeService = TRAVEL_SERVICES.find(s => s.key === selectedService);

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
        <div className={styles.confirmSection}>
          <div className={styles.confirmCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <h1 className={styles.confirmHeading}>Travel enquiry received.</h1>
            <p className={styles.referenceNumber}>{reference}</p>
            <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
            <a href={buildWhatsAppUrl({ reference, module: 'travel' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Ask on WhatsApp</a>
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
          <h1 className={styles.heading}>Tickets, visas and passports, at the same counter.</h1>
          <p className={styles.intro}>Official Akbar Travels partner. Air ticketing, visa processing, tour packages, and more.</p>
        </div>
      </section>

      {/* Service cards */}
      <section className={styles.serviceCards}>
        <div className={styles.serviceCardsInner}>
          <p className={styles.servicesLabel}>Select a service</p>
          <div className={styles.servicesGrid}>
            {TRAVEL_SERVICES.map(s => {
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
                  <h2 className={styles.infoPanelHeading}>Travel enquiry</h2>
                  <p className={styles.infoPanelText}>Select a service above or fill in the form. We handle everything from booking to documentation.</p>
                </>
              )}
              <div className={styles.infoPanelDetails}>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Partner</span><span className={styles.infoItemValue}>Akbar Travels</span></div>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Response</span><span className={styles.infoItemValue}>Within 1 working day</span></div>
                <div className={styles.infoItem}><span className={styles.infoItemLabel}>Contact</span><span className={styles.infoItemValue}>+91 9496 818237</span></div>
              </div>
            </div>
          </div>

          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>Travel enquiry</h2>
              <p className={styles.formSubheading}>Tell us what you need and we will get back to you.</p>

              <div className="form-group"><label htmlFor="tr-name" className="form-label">Name <span className="required">*</span></label><input id="tr-name" type="text" className={`form-input ${errors.name?'error':''}`} value={formData.name} onChange={e=>updateField('name',e.target.value)} />{errors.name&&<p className="form-error" role="alert">{errors.name}</p>}</div>
              <div className="form-group"><label htmlFor="tr-mobile" className="form-label">Mobile <span className="required">*</span></label><input id="tr-mobile" type="tel" className={`form-input ${errors.mobile?'error':''}`} value={formData.mobile} onChange={e=>updateField('mobile',e.target.value)} />{errors.mobile&&<p className="form-error" role="alert">{errors.mobile}</p>}</div>
              <div className="form-group"><label htmlFor="tr-service" className="form-label">Service needed <span className="required">*</span></label><select id="tr-service" className={`form-input ${errors.service?'error':''}`} value={formData.service} onChange={e=>updateField('service',e.target.value)}><option value="">Select</option>{TRAVEL_SERVICES.map(s=><option key={s.key} value={s.heading}>{s.heading}</option>)}</select>{errors.service&&<p className="form-error" role="alert">{errors.service}</p>}</div>
              <div className="form-row">
                <div className="form-group"><label htmlFor="tr-from" className="form-label">Travel date (from)</label><input id="tr-from" type="date" className="form-input" value={formData.dateFrom} onChange={e=>updateField('dateFrom',e.target.value)} /></div>
                <div className="form-group"><label htmlFor="tr-to" className="form-label">Travel date (to)</label><input id="tr-to" type="date" className="form-input" value={formData.dateTo} onChange={e=>updateField('dateTo',e.target.value)} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label htmlFor="tr-travellers" className="form-label">Number of travellers</label><input id="tr-travellers" type="number" min="1" className="form-input" value={formData.travellers} onChange={e=>updateField('travellers',e.target.value)} /></div>
                <div className="form-group"><label htmlFor="tr-dest" className="form-label">Destination</label><input id="tr-dest" type="text" className="form-input" value={formData.destination} onChange={e=>updateField('destination',e.target.value)} /></div>
              </div>
              <div className="form-group"><label htmlFor="tr-notes" className="form-label">Notes</label><textarea id="tr-notes" className="form-input" rows={3} value={formData.notes} onChange={e=>updateField('notes',e.target.value)} /></div>
              <div className="form-group"><label className={`checkbox-option ${formData.consent?'selected':''}`}><input type="checkbox" checked={formData.consent} onChange={e=>updateField('consent',e.target.checked)} />I agree to HITECH contacting me about this request, including on WhatsApp.</label>{errors.consent&&<p className="form-error" role="alert">{errors.consent}</p>}</div>
              <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{width:'100%'}}>Submit enquiry</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TravelPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>Loading...</div>}>
      <TravelContent />
    </Suspense>
  );
}

