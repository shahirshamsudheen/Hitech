'use client';

import { Suspense, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileCheck, Terminal, Laptop, Cpu, Printer, HardDrive, Building2, Wrench, WrenchIcon } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildServiceWhatsAppUrl, buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const SERVICES = [
  { key: 'motherboard', icon: Cpu, heading: 'Motherboard & Chip-Level Repair', line: 'BGA rework & component diagnostics. Repairing logic boards directly instead of expensive replacements.' },
  { key: 'laptop-desktop', icon: Laptop, heading: 'Laptop / Desktop Repair', line: 'Hardware & OS troubleshooting across Apple, HP, Dell, Asus, Acer and Lenovo.' },
  { key: 'printer', icon: Printer, heading: 'Printer Service', line: 'Laser, inkjet, and ink tank printers. Canon, Epson & HP drum, head, and feed repairs.' },
  { key: 'data-recovery', icon: HardDrive, heading: 'Data Recovery', line: 'Logical and hardware recovery from failed SSDs, mechanical hard drives, and flash media.' },
  { key: 'amc', icon: FileCheck, heading: 'Annual Maintenance (AMC)', line: 'Scheduled preventive care, routine check-ups, and priority response for institutions.' },
  { key: 'os-software', icon: Terminal, heading: 'OS & Software Solutions', line: 'OS setup, data backup, licensing, malware disinfection, and system optimization.' },
  { key: 'on-site', icon: Building2, heading: 'On-Site Field Service', line: 'Direct technician visits for offices, clinics, and educational campuses across the state.' },
  { key: 'other', icon: Wrench, heading: 'Other Electronics', line: 'UPS, stabilizers, power supplies, network switches, and peripheral repair.' },
];

const AREA_SUGGESTIONS = [
  'Kallara', 'Trivandrum', 'Nedumangad', 'Kilimanoor', 'Palode', 'Pangode',
  'Attingal', 'Kollam', 'Kochi', 'Other',
];

function ServiceContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [selectedService, setSelectedService] = useState(initialService);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', area: '',
    customerType: '', orgName: '',
    serviceType: '', equipmentType: '', brand: '',
    problem: '', urgency: 'Normal', notes: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState('');

  const updateField = useCallback((field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const handleSelectService = (key: string) => {
    setSelectedService(key);
    nameInputRef.current?.focus();
  };

  const activeService = SERVICES.find(s => s.key === selectedService);

  const isHardwareRepair = ['motherboard', 'laptop-desktop', 'printer', 'data-recovery'].includes(selectedService);

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Enter your full name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
      errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.area.trim()) errs.area = 'Enter your area or city.';
    if (!formData.problem.trim() || formData.problem.trim().length < 5)
      errs.problem = 'Describe the problem in a few words.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const ref = generateReference('SR');
    setReference(ref);
    const whatsappUrl = buildWhatsAppUrl({
      reference: ref,
      module: 'service',
      name: formData.fullName,
      mobile: formData.mobile,
      area: formData.area,
      customerType: formData.customerType,
      equipment: isHardwareRepair ? formData.equipmentType : undefined,
      brand: isHardwareRepair ? formData.brand : undefined,
      problem: formData.problem.slice(0, 100),
      service: activeService?.heading,
    });
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <WrenchIcon size={14} />
            <span>Diagnostic &amp; Board-Level Lab</span>
          </div>
          <h1 className={styles.heading}>Repaired, not replaced.</h1>
          <p className={styles.intro}>
            Most repair shops replace the whole board. We repair individual components at chip level.
            It has been our core specialty since 2016, saving customers and businesses up to 70% in repair costs.
          </p>
        </div>
      </section>

      {/* Interactive Section (White Cards on Left + Form on Right) */}
      <section className={styles.splitSection} aria-label="Repair services selection and booking">
        <div className={styles.splitContainer}>
          <div className={styles.splitGrid}>
            {/* Left Column: White Service Cards */}
            <div className={styles.leftColumn}>
              <p className={styles.sectionSubhead}>Select required repair or service</p>
              <div className={styles.servicesGrid}>
                {SERVICES.map(s => {
                  const Icon = s.icon;
                  const isSelected = selectedService === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      className={`${styles.serviceCard} ${isSelected ? styles.serviceCardActive : ''}`}
                      onClick={() => handleSelectService(s.key)}
                    >
                      <div className={styles.serviceIconWrapper}>
                        <Icon size={22} strokeWidth={1.75} className={styles.serviceIconSvg} aria-hidden="true" />
                      </div>
                      <h2 className={styles.serviceCardHeading}>{s.heading}</h2>
                      <p className={styles.serviceCardLine}>{s.line}</p>
                    </button>
                  );
                })}
              </div>

              <div className={styles.infoMetaRow}>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Response</span>
                  <span className={styles.metaValue}>Within 1 working day</span>
                </div>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Chip-Level Lab</span>
                  <span className={styles.metaValue}>BGA Micro-Soldering</span>
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
                <h2 className={styles.formHeading}>Book a repair</h2>
                <p className={styles.formSubheading}>
                  Fill in details and our technical desk will get back to you promptly.
                </p>

                {activeService && (
                  <div className={styles.activeServiceIndicator}>
                    <span>Selected: {activeService.heading}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="sr-name" className="form-label">Full name <span className="required">*</span></label>
                  <input
                    ref={nameInputRef}
                    id="sr-name"
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    value={formData.fullName}
                    onChange={e => updateField('fullName', e.target.value)}
                    placeholder="Your full name"
                  />
                  {errors.fullName && <p className="form-error" role="alert">{errors.fullName}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="sr-mobile" className="form-label">Mobile number <span className="required">*</span></label>
                  <input
                    id="sr-mobile"
                    type="tel"
                    className={`form-input ${errors.mobile ? 'error' : ''}`}
                    value={formData.mobile}
                    onChange={e => updateField('mobile', e.target.value)}
                    placeholder="10-digit number"
                  />
                  {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="sr-area" className="form-label">Location / Town <span className="required">*</span></label>
                  <input
                    id="sr-area"
                    type="text"
                    className={`form-input ${errors.area ? 'error' : ''}`}
                    value={formData.area}
                    onChange={e => updateField('area', e.target.value)}
                    list="area-list"
                    placeholder="e.g. Kallara, Trivandrum, Kochi, Kollam"
                  />
                  <datalist id="area-list">{AREA_SUGGESTIONS.map(a => <option key={a} value={a} />)}</datalist>
                  {errors.area && <p className="form-error" role="alert">{errors.area}</p>}
                </div>

                <div className="form-group">
                  <span className="form-label">Customer type</span>
                  <div className="radio-group">
                    {['Home user', 'Business', 'Government / Institution'].map(opt => (
                      <label key={opt} className={`radio-option ${formData.customerType === opt ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="sr-custtype"
                          value={opt}
                          checked={formData.customerType === opt}
                          onChange={() => updateField('customerType', opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {isHardwareRepair && (
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label htmlFor="sr-equipment" className="form-label">Equipment</label>
                      <select
                        id="sr-equipment"
                        className="form-input"
                        value={formData.equipmentType}
                        onChange={e => updateField('equipmentType', e.target.value)}
                      >
                        <option value="">Select</option>
                        {['Laptop', 'Desktop', 'Motherboard only', 'Printer', 'CCTV DVR/NVR', 'Data Storage', 'Other'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="sr-brand" className="form-label">Brand</label>
                      <select
                        id="sr-brand"
                        className="form-input"
                        value={formData.brand}
                        onChange={e => updateField('brand', e.target.value)}
                      >
                        <option value="">Select</option>
                        {['Apple', 'HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Canon', 'Epson', 'Other'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="sr-problem" className="form-label">Problem description <span className="required">*</span></label>
                  <textarea
                    id="sr-problem"
                    className={`form-input ${errors.problem ? 'error' : ''}`}
                    rows={3}
                    value={formData.problem}
                    onChange={e => updateField('problem', e.target.value)}
                    placeholder="e.g. No power / dead, liquid damage, screen flicker, BGA chip issue..."
                  />
                  {errors.problem && <p className="form-error" role="alert">{errors.problem}</p>}
                </div>

                <div className="form-group">
                  <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={e => updateField('consent', e.target.checked)}
                    />
                    I agree to HITECH contacting me regarding this repair.
                  </label>
                  {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
                </div>

                <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>
                  Submit repair request
                </button>

                <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
                  <a
                    href={buildWhatsAppUrl({ module: 'service' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ width: '100%' }}
                  >
                    Or ask directly on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
