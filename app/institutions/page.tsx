'use client';

import { useState } from 'react';
import { Building2, FileCheck, Landmark, Receipt, Wrench } from 'lucide-react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

const NEEDS_OPTIONS = [
  'Computer supply', 'Printer supply', 'CCTV', 'Networking',
  'AMC for existing equipment', 'Repair of existing equipment', 'Other',
];

const INFO_CARDS = [
  {
    icon: Building2,
    heading: 'What we do for organisations',
    line: 'Supply, installation and maintenance under one accountable contract. Mixed-vendor estates. On-site attendance. Named technicians who know your equipment.',
  },
  {
    icon: FileCheck,
    heading: 'Annual Maintenance Contracts',
    line: 'An AMC covers scheduled maintenance, fault attendance, and priority response. Your equipment is checked before it fails, not after.',
  },
  {
    icon: Landmark,
    heading: 'Who we already work with',
    line: 'Community Health Centres, Family Health Centres, Village Offices, Panchayat Offices, Government Schools. Private companies including Daily Foods, Vrindhavanam Group, Ponmudi Mills, AKR Industries and MURKO.',
    full: true,
  },
  {
    icon: Receipt,
    heading: 'Supply and procurement',
    line: 'Quotations, work orders, PO references, GST invoice. We understand institutional procurement.',
  },
  {
    icon: Wrench,
    heading: 'Why not a chain',
    line: 'A chain sends whoever is free. We send the same technicians who installed it. Board-level repair keeps equipment out of the replacement budget. One number to call, one team responsible.',
  },
];

export default function InstitutionsPage() {
  const [formData, setFormData] = useState({
    organisation: '', department: '', contactName: '', designation: '',
    mobile: '', email: '', location: '', needs: [] as string[],
    quantity: '', timeline: '', notes: '', consent: false,
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
    updateField('needs', current.includes(need) ? current.filter(n => n !== need) : [...current, need]);
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.organisation.trim()) errs.organisation = 'Enter your organisation.';
    if (!formData.contactName.trim()) errs.contactName = 'Enter your name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.location.trim()) errs.location = 'Enter your location.';
    if (formData.needs.length === 0) errs.needs = 'Select at least one option.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const ref = generateReference('IN');
    setReference(ref);
    const whatsappUrl = buildWhatsAppUrl({
      reference: ref,
      module: 'institutions',
      orgName: formData.organisation,
      name: formData.contactName,
      mobile: formData.mobile,
      siteLocation: formData.location,
      notes: formData.needs.join(', '),
    });
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.confirmCard}>
          <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          <h1 className={styles.confirmHeading}>Quotation request received.</h1>
          <p className={styles.referenceNumber}>{reference}</p>
          <p className={styles.confirmText}>We will call you on {formData.mobile} within one working day.</p>
          <a href={buildWhatsAppUrl({ reference, module: 'technology' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Send details on WhatsApp</a>
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
            <Building2 size={14} />
            <span>Government &amp; Enterprise Accounts</span>
          </div>
          <h1 className={styles.heading}>One contract for every computer, camera and cable in the building.</h1>
          <p className={styles.intro}>
            Supply, installation and AMC for institutions and businesses across Kerala, under one accountable contract.
          </p>
        </div>
      </section>

      {/* Interactive Section (Info Cards on Left, Form on Right) */}
      <section className={styles.splitSection} aria-label="Institutional services and quotation request">
        <div className={styles.splitContainer}>
          <div className={styles.splitGrid}>
            {/* Left Column: Info Cards */}
            <div className={styles.leftColumn}>
              <p className={styles.sectionSubhead}>Why organisations choose Hitech</p>
              <div className={styles.infoGrid}>
                {INFO_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.heading} className={`${styles.infoCard} ${card.full ? styles.infoCardFull : ''}`}>
                      <div className={styles.infoIconWrapper}>
                        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h2 className={styles.infoCardHeading}>{card.heading}</h2>
                      <p className={styles.infoCardLine}>{card.line}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className={styles.rightColumn}>
              <div className={styles.formCard}>
                <h2 className={styles.formHeading}>Request a quotation or AMC proposal</h2>
                <p className={styles.formSubheading}>We will prepare a proposal and call you.</p>

                <div className="form-group">
                  <label htmlFor="in-org" className="form-label">Organisation <span className="required">*</span></label>
                  <input id="in-org" type="text" className={`form-input ${errors.organisation ? 'error' : ''}`} value={formData.organisation} onChange={e => updateField('organisation', e.target.value)} />
                  {errors.organisation && <p className="form-error" role="alert">{errors.organisation}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="in-dept" className="form-label">Department</label>
                  <input id="in-dept" type="text" className="form-input" value={formData.department} onChange={e => updateField('department', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="in-name" className="form-label">Contact name <span className="required">*</span></label>
                  <input id="in-name" type="text" className={`form-input ${errors.contactName ? 'error' : ''}`} value={formData.contactName} onChange={e => updateField('contactName', e.target.value)} />
                  {errors.contactName && <p className="form-error" role="alert">{errors.contactName}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="in-designation" className="form-label">Designation</label>
                  <input id="in-designation" type="text" className="form-input" value={formData.designation} onChange={e => updateField('designation', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="in-mobile" className="form-label">Mobile <span className="required">*</span></label>
                  <input id="in-mobile" type="tel" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} />
                  {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="in-email" className="form-label">Email</label>
                  <input id="in-email" type="email" className="form-input" value={formData.email} onChange={e => updateField('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="in-location" className="form-label">Location <span className="required">*</span></label>
                  <input id="in-location" type="text" className={`form-input ${errors.location ? 'error' : ''}`} value={formData.location} onChange={e => updateField('location', e.target.value)} />
                  {errors.location && <p className="form-error" role="alert">{errors.location}</p>}
                </div>
                <div className="form-group">
                  <span className="form-label">What is needed <span className="required">*</span></span>
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
                  <label htmlFor="in-qty" className="form-label">Approximate quantity</label>
                  <input id="in-qty" type="text" className="form-input" value={formData.quantity} onChange={e => updateField('quantity', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="in-timeline" className="form-label">Timeline</label>
                  <input id="in-timeline" type="text" className="form-input" value={formData.timeline} onChange={e => updateField('timeline', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="in-notes" className="form-label">Notes</label>
                  <textarea id="in-notes" className="form-input" rows={3} value={formData.notes} onChange={e => updateField('notes', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
                    <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} />
                    I agree to Hitech contacting me about this request, including on WhatsApp.
                  </label>
                  {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>Submit quotation request</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
