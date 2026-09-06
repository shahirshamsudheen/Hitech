'use client';

import { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plane, Globe, Compass, HeartPulse, Hotel, BookOpen } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const TRAVEL_SERVICES = [
  { key: 'air-ticketing', icon: Plane, heading: 'Air Ticketing', line: 'Domestic and international flights with competitive fares on all major airlines.' },
  { key: 'visa-gcc', icon: Globe, heading: 'Visa — GCC Countries', line: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait employment and visit visas.' },
  { key: 'visa-schengen', icon: Globe, heading: 'Visa — Schengen & EU', line: 'Complete documentation for Europe tourism, business and student visas.' },
  { key: 'visa-usa', icon: Globe, heading: 'Visa — USA & Australia', line: 'DS-160 filling, document checklist, and visa appointment assistance.' },
  { key: 'tours', icon: Compass, heading: 'Tour Packages', line: 'Custom itineraries for Dubai, Europe, Southeast Asia, and domestic getaways.' },
  { key: 'passport', icon: BookOpen, heading: 'Passport Services', line: 'Fresh passport applications, renewals, tatkal, and document verification.' },
  { key: 'medical', icon: HeartPulse, heading: 'Overseas Medical Travel', line: 'International hospital appointments and accompanying travel arrangements.' },
  { key: 'hotel', icon: Hotel, heading: 'Hotel Reservations', line: 'Worldwide confirmed hotel bookings and airport transfer coordination.' },
];

function TravelContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);

  const nameInputRef = useRef<HTMLInputElement>(null);

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

  const handleSelectService = (key: string, title: string) => {
    setSelectedService(key);
    updateField('service', title);
    nameInputRef.current?.focus();
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
        <div className={styles.splitContainer}>
          <div className={styles.confirmCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className={styles.confirmHeading}>Travel enquiry received.</h1>
            <p className={styles.referenceNumber}>Reference: {reference}</p>
            <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
            <a href={buildWhatsAppUrl({ reference, module: 'travel' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.splitContainer}>
        <div className={styles.splitGrid}>
          {/* Left Column: Heading, Intro, Service Cards & Meta */}
          <div className={styles.leftColumn}>
            <div className={styles.badgePill}>
              <Plane size={14} />
              <span>Official Akbar Travels Partner</span>
            </div>
            <h1 className={styles.heading}>Tickets, visas and passports, at the same counter.</h1>
            <p className={styles.intro}>
              Official Akbar Travels partner in Kallara. Direct flight booking, embassy visa applications,
              and worldwide vacation packages handled locally with complete peace of mind.
            </p>

            <p className={styles.sectionSubhead}>Select travel requirement</p>
            <div className={styles.servicesGrid}>
              {TRAVEL_SERVICES.map(s => {
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
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className={styles.serviceCardHeading}>{s.heading}</h3>
                    <p className={styles.serviceCardLine}>{s.line}</p>
                  </button>
                );
              })}
            </div>

            <div className={styles.infoMetaRow}>
              <div className={styles.infoMetaItem}>
                <span className={styles.metaLabel}>Partner</span>
                <span className={styles.metaValue}>Akbar Travels</span>
              </div>
              <div className={styles.infoMetaItem}>
                <span className={styles.metaLabel}>Response</span>
                <span className={styles.metaValue}>Within 1 working day</span>
              </div>
              <div className={styles.infoMetaItem}>
                <span className={styles.metaLabel}>Travel Desk</span>
                <span className={styles.metaValue}>+91 472 296007</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Starting Right At The Top */}
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>Travel enquiry</h2>
              <p className={styles.formSubheading}>Tell us your travel plans and our desk will prepare the best options.</p>

              {activeService && (
                <div className={styles.activeServiceIndicator}>
                  <span>Selected: {activeService.heading}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="tr-name" className="form-label">Name <span className="required">*</span></label>
                <input
                  ref={nameInputRef}
                  id="tr-name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  placeholder="Your full name"
                />
                {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="tr-mobile" className="form-label">Mobile number <span className="required">*</span></label>
                <input
                  id="tr-mobile"
                  type="tel"
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  value={formData.mobile}
                  onChange={e => updateField('mobile', e.target.value)}
                  placeholder="10-digit mobile number"
                />
                {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="tr-service" className="form-label">Service needed <span className="required">*</span></label>
                <select
                  id="tr-service"
                  className={`form-input ${errors.service ? 'error' : ''}`}
                  value={formData.service}
                  onChange={e => updateField('service', e.target.value)}
                >
                  <option value="">Select service</option>
                  {TRAVEL_SERVICES.map(s => (
                    <option key={s.key} value={s.heading}>{s.heading}</option>
                  ))}
                </select>
                {errors.service && <p className="form-error" role="alert">{errors.service}</p>}
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label htmlFor="tr-from" className="form-label">Travel date (from)</label>
                  <input
                    id="tr-from"
                    type="date"
                    className="form-input"
                    value={formData.dateFrom}
                    onChange={e => updateField('dateFrom', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tr-dest" className="form-label">Destination</label>
                  <input
                    id="tr-dest"
                    type="text"
                    className="form-input"
                    value={formData.destination}
                    onChange={e => updateField('destination', e.target.value)}
                    placeholder="e.g. Dubai, London, Delhi"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tr-travellers" className="form-label">Number of travellers</label>
                <input
                  id="tr-travellers"
                  type="number"
                  min="1"
                  className="form-input"
                  value={formData.travellers}
                  onChange={e => updateField('travellers', e.target.value)}
                  placeholder="e.g. 2 adults, 1 child"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tr-notes" className="form-label">Additional notes</label>
                <textarea
                  id="tr-notes"
                  className="form-input"
                  rows={2}
                  value={formData.notes}
                  onChange={e => updateField('notes', e.target.value)}
                  placeholder="e.g. Preferred airline, urgent visa processing..."
                />
              </div>

              <div className="form-group">
                <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={e => updateField('consent', e.target.checked)}
                  />
                  I agree to HITECH contacting me regarding this travel enquiry.
                </label>
                {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
              </div>

              <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>
                Submit travel enquiry
              </button>
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
