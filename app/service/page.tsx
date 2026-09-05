'use client';

import { useState, useCallback, useRef } from 'react';
import { generateReference } from '@/lib/referenceGenerator';
import { buildServiceWhatsAppUrl, buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

/* ── Constants ──────────────────────────────────────────────────────────── */

const AREA_SUGGESTIONS = [
  'Kallara', 'Nedumangad', 'Kilimanoor', 'Palode', 'Pangode',
  'Vamanapuram', 'Attingal', 'Trivandrum city', 'Other',
];

const EQUIPMENT_TYPES = [
  'Laptop', 'Desktop', 'All-in-one', 'Printer', 'Monitor',
  'CCTV camera or recorder', 'Network equipment', 'Server', 'Other',
];

const BRANDS = [
  'HP', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Apple',
  'Samsung', 'LG', 'Canon', 'Epson', 'Other',
];

const SERVICES_LIST = [
  { icon: '💻', heading: 'Laptop repair', line: 'Hardware and software issues, all brands' },
  { icon: '🖥️', heading: 'Desktop repair', line: 'Assembly, upgrades and troubleshooting' },
  { icon: '🔬', heading: 'Motherboard and chip-level repair', line: 'BGA rework, component-level diagnostics' },
  { icon: '🖨️', heading: 'Printer service', line: 'Laser, inkjet, dot matrix — all brands' },
  { icon: '💾', heading: 'Data recovery', line: 'From failed drives and damaged storage' },
  { icon: '⚙️', heading: 'Operating system and software', line: 'Installation, updates and troubleshooting' },
  { icon: '📋', heading: 'Annual Maintenance Contracts', line: 'Scheduled maintenance for businesses and offices' },
  { icon: '🏢', heading: 'On-site service', line: 'For businesses and offices across the district' },
];

const STEP_LABELS = ['Who you are', 'What needs fixing', 'Purchase & warranty', 'Problem & contact'];

/* ── Types ──────────────────────────────────────────────────────────────── */

interface FormData {
  // Step 1
  fullName: string;
  mobile: string;
  isWhatsApp: string;
  altNumber: string;
  email: string;
  customerType: string;
  orgName: string;
  department: string;
  area: string;
  // Step 2
  equipmentType: string;
  brand: string;
  brandOther: string;
  model: string;
  serialNumber: string;
  numberOfUnits: number;
  // Step 3
  boughtFromHitech: string;
  purchaseDate: string;
  invoiceNumber: string;
  underWarranty: string;
  warrantyType: string;
  warrantyExpiry: string;
  previousRepair: string;
  previousRepairWho: string;
  // Step 4
  problem: string;
  whenStarted: string;
  powersOn: string;
  files: File[];
  serviceType: string;
  address: string;
  preferredDay: string;
  preferredTime: string;
  urgency: string;
  amcCustomer: boolean;
  poReference: string;
  otherNotes: string;
  consent: boolean;
}

const initialFormData: FormData = {
  fullName: '', mobile: '', isWhatsApp: 'Yes', altNumber: '', email: '',
  customerType: '', orgName: '', department: '', area: '',
  equipmentType: '', brand: '', brandOther: '', model: '', serialNumber: '', numberOfUnits: 1,
  boughtFromHitech: '', purchaseDate: '', invoiceNumber: '',
  underWarranty: '', warrantyType: '', warrantyExpiry: '',
  previousRepair: '', previousRepairWho: '',
  problem: '', whenStarted: '', powersOn: '', files: [],
  serviceType: '', address: '', preferredDay: '', preferredTime: '',
  urgency: 'Normal', amcCustomer: false, poReference: '', otherNotes: '', consent: false,
};

/* ── Validation ─────────────────────────────────────────────────────────── */

function validateStep(step: number, data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 0) {
    if (!data.fullName.trim()) errors.fullName = 'Enter your full name.';
    if (!/^[6-9]\d{9}$/.test(data.mobile.replace(/\s/g, '')))
      errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (!data.customerType) errors.customerType = 'Select a customer type.';
    if ((data.customerType === 'Business' || data.customerType === 'Government or institution') && !data.orgName.trim())
      errors.orgName = 'Enter your organisation name.';
    if (!data.area.trim()) errors.area = 'Enter your area or town.';
  }

  if (step === 1) {
    if (!data.equipmentType) errors.equipmentType = 'Select the equipment type.';
    if (!data.brand) errors.brand = 'Select the brand.';
    if (data.brand === 'Other' && !data.brandOther.trim()) errors.brandOther = 'Enter the brand name.';
    if (data.numberOfUnits < 1) errors.numberOfUnits = 'Enter at least 1 unit.';
  }

  if (step === 2) {
    if (!data.boughtFromHitech) errors.boughtFromHitech = 'Select whether you bought this from Hitech.';
    if (!data.underWarranty) errors.underWarranty = 'Select the warranty status.';
    if (data.underWarranty === 'Yes' && !data.warrantyType)
      errors.warrantyType = 'Select the warranty type.';
    if (!data.previousRepair) errors.previousRepair = 'Select whether anyone else has worked on this.';
    if (data.previousRepair === 'Yes' && !data.previousRepairWho.trim())
      errors.previousRepairWho = 'Enter who worked on it or where.';
  }

  if (step === 3) {
    if (!data.problem.trim() || data.problem.trim().length < 10)
      errors.problem = 'Describe the problem in at least 10 characters.';
    if (!data.serviceType) errors.serviceType = 'Select how you would like it serviced.';
    if ((data.serviceType === 'Collection from my address' || data.serviceType === 'On-site visit') && !data.address.trim())
      errors.address = 'Enter your address for collection or on-site visit.';
    if (!data.urgency) errors.urgency = 'Select the urgency level.';
    if (!data.consent) errors.consent = 'You must agree to be contacted about this request.';
  }

  return errors;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function ServicePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const goNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Focus first error field
      const firstErrorKey = Object.keys(stepErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      el?.focus();
      return;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 3));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goBack = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(3, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstErrorKey = Object.keys(stepErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    // Generate reference
    const ref = generateReference('SR');
    setReference(ref);

    // In production, submit to form service here
    // For now, simulate a brief delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setSubmitted(true);
    setIsSubmitting(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const currentFiles = formData.files;
    const totalAllowed = 5 - currentFiles.length;
    const validFiles = newFiles
      .filter(f => f.size <= 10 * 1024 * 1024) // 10MB max
      .slice(0, totalAllowed);
    updateField('files', [...currentFiles, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    updateField('files', formData.files.filter((_, i) => i !== index));
  };

  const renderField = (
    id: string,
    label: string,
    required: boolean,
    children: React.ReactNode,
    help?: string
  ) => {
    const errorId = `${id}-error`;
    const helpId = `${id}-help`;
    const hasError = errors[id];
    return (
      <div className="form-group">
        <label htmlFor={`field-${id}`} className="form-label">
          {label}
          {required && <span className="required" aria-label="required">*</span>}
        </label>
        {children}
        {help && !hasError && (
          <p id={helpId} className="form-help">{help}</p>
        )}
        {hasError && (
          <p id={errorId} className="form-error" role="alert">{hasError}</p>
        )}
      </div>
    );
  };

  const renderRadioGroup = (
    field: keyof FormData,
    options: string[],
    label: string,
    required: boolean,
    help?: string
  ) => (
    renderField(field, label, required, (
      <div className="radio-group" role="radiogroup" aria-label={label}>
        {options.map(opt => (
          <label
            key={opt}
            className={`radio-option ${formData[field] === opt ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={field}
              value={opt}
              checked={formData[field] === opt}
              onChange={() => updateField(field, opt as FormData[typeof field])}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
            />
            {opt}
          </label>
        ))}
      </div>
    ), help)
  );

  /* ── Confirmation screen ────────────────────────────────────────────── */

  if (submitted) {
    const whatsAppUrl = buildServiceWhatsAppUrl({
      reference,
      name: formData.fullName,
      equipment: formData.equipmentType,
      brand: formData.brand === 'Other' ? formData.brandOther : formData.brand,
      problem: formData.problem.slice(0, 100),
    });

    return (
      <div className={styles.servicePage}>
        <div className={styles.formSection} ref={formRef}>
          <div className={styles.formContainer}>
            <div className={styles.confirmation}>
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
              <div className={styles.confirmActions}>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Send this on WhatsApp instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form rendering ─────────────────────────────────────────────────── */

  return (
    <div className={styles.servicePage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>Repaired, not replaced.</h1>
          <p className={styles.intro}>
            Most repair shops replace the board. We repair the board. It has been our main
            service since 2016, it costs a fraction of a replacement, and it is why machines
            other people wrote off are still working.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className={styles.servicesList} aria-label="Services we offer">
        <div className={styles.servicesInner}>
          <div className={styles.servicesGrid}>
            {SERVICES_LIST.map(s => (
              <div key={s.heading} className={styles.serviceCard}>
                <div className={styles.serviceIcon} aria-hidden="true">{s.icon}</div>
                <h3 className={styles.serviceCardHeading}>{s.heading}</h3>
                <p className={styles.serviceCardLine}>{s.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <div className={styles.formSection} ref={formRef}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeading}>Book a service request</h2>
          <p className={styles.formSubheading}>
            Fill this in and we will call you. It takes about two minutes.
          </p>

          {/* Progress */}
          <div className={styles.progress} role="navigation" aria-label="Form progress">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className={styles.progressStep}>
                {i > 0 && (
                  <div className={`${styles.progressLine} ${i <= currentStep ? styles.done : ''}`} />
                )}
                <div
                  className={`${styles.progressDot} ${
                    i === currentStep ? styles.active : i < currentStep ? styles.done : ''
                  }`}
                  aria-current={i === currentStep ? 'step' : undefined}
                >
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span className={`${styles.progressLabel} ${i === currentStep ? styles.active : ''}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Who you are */}
          {currentStep === 0 && (
            <div role="group" aria-label="Step 1: Who you are">
              <p className={styles.stepTitle}>Who you are</p>

              {renderField('fullName', 'Full name', true, (
                <input
                  id="field-fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  value={formData.fullName}
                  onChange={e => updateField('fullName', e.target.value)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  aria-invalid={!!errors.fullName}
                />
              ))}

              {renderField('mobile', 'Mobile number', true, (
                <input
                  id="field-mobile"
                  type="tel"
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  value={formData.mobile}
                  onChange={e => updateField('mobile', e.target.value)}
                  placeholder="10-digit number"
                  aria-describedby={errors.mobile ? 'mobile-error' : 'mobile-help'}
                  aria-invalid={!!errors.mobile}
                />
              ), 'We will contact you on this number')}

              {renderRadioGroup('isWhatsApp', ['Yes', 'No'], 'Is this number on WhatsApp?', true)}

              {renderField('altNumber', 'Alternate number', false, (
                <input
                  id="field-altNumber"
                  type="tel"
                  className="form-input"
                  value={formData.altNumber}
                  onChange={e => updateField('altNumber', e.target.value)}
                />
              ))}

              {renderField('email', 'Email', false, (
                <input
                  id="field-email"
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                />
              ))}

              {renderRadioGroup('customerType', ['Home user', 'Business', 'Government or institution'], 'Customer type', true)}

              {(formData.customerType === 'Business' || formData.customerType === 'Government or institution') && (
                renderField('orgName', 'Organisation name', true, (
                  <input
                    id="field-orgName"
                    type="text"
                    className={`form-input ${errors.orgName ? 'error' : ''}`}
                    value={formData.orgName}
                    onChange={e => updateField('orgName', e.target.value)}
                    aria-describedby={errors.orgName ? 'orgName-error' : undefined}
                    aria-invalid={!!errors.orgName}
                  />
                ))
              )}

              {formData.customerType === 'Government or institution' && (
                renderField('department', 'Department / office', false, (
                  <input
                    id="field-department"
                    type="text"
                    className="form-input"
                    value={formData.department}
                    onChange={e => updateField('department', e.target.value)}
                  />
                ))
              )}

              {renderField('area', 'Area / town', true, (
                <>
                  <input
                    id="field-area"
                    type="text"
                    className={`form-input ${errors.area ? 'error' : ''}`}
                    value={formData.area}
                    onChange={e => updateField('area', e.target.value)}
                    list="area-suggestions"
                    aria-describedby={errors.area ? 'area-error' : undefined}
                    aria-invalid={!!errors.area}
                  />
                  <datalist id="area-suggestions">
                    {AREA_SUGGESTIONS.map(a => <option key={a} value={a} />)}
                  </datalist>
                </>
              ))}
            </div>
          )}

          {/* Step 2: What needs fixing */}
          {currentStep === 1 && (
            <div role="group" aria-label="Step 2: What needs fixing">
              <p className={styles.stepTitle}>What needs fixing</p>

              {renderField('equipmentType', 'Equipment type', true, (
                <select
                  id="field-equipmentType"
                  className={`form-input ${errors.equipmentType ? 'error' : ''}`}
                  value={formData.equipmentType}
                  onChange={e => updateField('equipmentType', e.target.value)}
                  aria-describedby={errors.equipmentType ? 'equipmentType-error' : undefined}
                  aria-invalid={!!errors.equipmentType}
                >
                  <option value="">Select equipment type</option>
                  {EQUIPMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              ))}

              {renderField('brand', 'Brand', true, (
                <select
                  id="field-brand"
                  className={`form-input ${errors.brand ? 'error' : ''}`}
                  value={formData.brand}
                  onChange={e => updateField('brand', e.target.value)}
                  aria-describedby={errors.brand ? 'brand-error' : undefined}
                  aria-invalid={!!errors.brand}
                >
                  <option value="">Select brand</option>
                  {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              ))}

              {formData.brand === 'Other' && (
                renderField('brandOther', 'Brand name', true, (
                  <input
                    id="field-brandOther"
                    type="text"
                    className={`form-input ${errors.brandOther ? 'error' : ''}`}
                    value={formData.brandOther}
                    onChange={e => updateField('brandOther', e.target.value)}
                    aria-describedby={errors.brandOther ? 'brandOther-error' : undefined}
                    aria-invalid={!!errors.brandOther}
                  />
                ))
              )}

              {renderField('model', 'Model', false, (
                <input
                  id="field-model"
                  type="text"
                  className="form-input"
                  value={formData.model}
                  onChange={e => updateField('model', e.target.value)}
                />
              ))}

              {renderField('serialNumber', 'Serial number', false, (
                <input
                  id="field-serialNumber"
                  type="text"
                  className="form-input"
                  value={formData.serialNumber}
                  onChange={e => updateField('serialNumber', e.target.value)}
                  aria-describedby="serialNumber-help"
                />
              ), 'On a sticker underneath or on the back. It speeds up parts ordering.')}

              {renderField('numberOfUnits', 'Number of units', true, (
                <input
                  id="field-numberOfUnits"
                  type="number"
                  min="1"
                  className={`form-input ${errors.numberOfUnits ? 'error' : ''}`}
                  value={formData.numberOfUnits}
                  onChange={e => updateField('numberOfUnits', parseInt(e.target.value) || 1)}
                  aria-describedby={errors.numberOfUnits ? 'numberOfUnits-error' : undefined}
                  aria-invalid={!!errors.numberOfUnits}
                />
              ))}
            </div>
          )}

          {/* Step 3: Purchase and warranty */}
          {currentStep === 2 && (
            <div role="group" aria-label="Step 3: Purchase and warranty">
              <p className={styles.stepTitle}>Purchase and warranty</p>

              {renderRadioGroup('boughtFromHitech', ['Yes', 'No', 'Not sure'], 'Did you buy this from Hitech?', true)}
              {formData.boughtFromHitech === 'Not sure' && (
                <p className={styles.notSureHint}>Not sure is fine. Bring it in and we will check.</p>
              )}

              {formData.boughtFromHitech === 'Yes' && (
                <>
                  {renderField('purchaseDate', 'Approximate purchase date', false, (
                    <input
                      id="field-purchaseDate"
                      type="month"
                      className="form-input"
                      value={formData.purchaseDate}
                      onChange={e => updateField('purchaseDate', e.target.value)}
                    />
                  ))}

                  {renderField('invoiceNumber', 'Invoice or bill number', false, (
                    <input
                      id="field-invoiceNumber"
                      type="text"
                      className="form-input"
                      value={formData.invoiceNumber}
                      onChange={e => updateField('invoiceNumber', e.target.value)}
                      aria-describedby="invoiceNumber-help"
                    />
                  ), 'If you have it handy. We can also look it up.')}
                </>
              )}

              {renderRadioGroup('underWarranty', ['Yes', 'No', 'Not sure'], 'Is it under warranty?', true)}
              {formData.underWarranty === 'Not sure' && (
                <p className={styles.notSureHint}>Not sure is fine. Bring it in and we will check.</p>
              )}

              {formData.underWarranty === 'Yes' && (
                <>
                  {renderRadioGroup('warrantyType', ['Brand warranty', 'Hitech warranty', 'Extended warranty'], 'Warranty type', true)}

                  {renderField('warrantyExpiry', 'Warranty expiry', false, (
                    <input
                      id="field-warrantyExpiry"
                      type="month"
                      className="form-input"
                      value={formData.warrantyExpiry}
                      onChange={e => updateField('warrantyExpiry', e.target.value)}
                    />
                  ))}
                </>
              )}

              {renderRadioGroup('previousRepair', ['No', 'Yes', 'Not sure'], 'Has anyone else already worked on this?', true,
                'It changes what we find inside. It does not change whether we take the job.'
              )}
              {formData.previousRepair === 'Not sure' && (
                <p className={styles.notSureHint}>Not sure is fine. Bring it in and we will check.</p>
              )}

              {formData.previousRepair === 'Yes' && (
                renderField('previousRepairWho', 'Who / where', true, (
                  <input
                    id="field-previousRepairWho"
                    type="text"
                    className={`form-input ${errors.previousRepairWho ? 'error' : ''}`}
                    value={formData.previousRepairWho}
                    onChange={e => updateField('previousRepairWho', e.target.value)}
                    aria-describedby={errors.previousRepairWho ? 'previousRepairWho-error' : undefined}
                    aria-invalid={!!errors.previousRepairWho}
                  />
                ))
              )}
            </div>
          )}

          {/* Step 4: The problem and how to reach you */}
          {currentStep === 3 && (
            <div role="group" aria-label="Step 4: Problem and how to reach you">
              <p className={styles.stepTitle}>The problem and how to reach you</p>

              {renderField('problem', 'What is happening?', true, (
                <textarea
                  id="field-problem"
                  className={`form-input ${errors.problem ? 'error' : ''}`}
                  rows={4}
                  value={formData.problem}
                  onChange={e => updateField('problem', e.target.value)}
                  placeholder="Describe it in your own words. For example: it turns on but the screen stays black."
                  aria-describedby={errors.problem ? 'problem-error' : undefined}
                  aria-invalid={!!errors.problem}
                />
              ))}

              {renderField('whenStarted', 'When did it start?', false, (
                <select
                  id="field-whenStarted"
                  className="form-input"
                  value={formData.whenStarted}
                  onChange={e => updateField('whenStarted', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Today">Today</option>
                  <option value="This week">This week</option>
                  <option value="This month">This month</option>
                  <option value="Longer ago">Longer ago</option>
                </select>
              ))}

              {renderRadioGroup('powersOn', ['Yes', 'No', 'Sometimes'], 'Does it power on?', false)}

              {/* File upload */}
              <div className="form-group">
                <label className="form-label">Photos or a short video</label>
                <div
                  className={styles.fileUpload}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload photos or video"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileAdd}
                    className="sr-only"
                    aria-label="Choose files"
                  />
                  <p className={styles.fileUploadLabel}>
                    <strong>Click to upload</strong> or drag and drop<br />
                    Images and video, max 5 files, 10 MB each
                  </p>
                </div>
                {formData.files.length > 0 && (
                  <div className={styles.filePreviews}>
                    {formData.files.map((file, i) => (
                      <div key={`${file.name}-${i}`} className={styles.filePreview}>
                        {file.type.startsWith('image/') ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={URL.createObjectURL(file)} alt={file.name} />
                        ) : (
                          <span className={styles.filePreviewName}>{file.name}</span>
                        )}
                        <button
                          className={styles.fileRemove}
                          onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                          aria-label={`Remove ${file.name}`}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {renderRadioGroup('serviceType',
                ['Bring it to the shop', 'Collection from my address', 'On-site visit'],
                'How would you like it serviced?', true
              )}

              {(formData.serviceType === 'Collection from my address' || formData.serviceType === 'On-site visit') && (
                renderField('address', 'Address', true, (
                  <textarea
                    id="field-address"
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    rows={3}
                    value={formData.address}
                    onChange={e => updateField('address', e.target.value)}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    aria-invalid={!!errors.address}
                  />
                ))
              )}

              {renderField('preferredDay', 'Preferred day', false, (
                <input
                  id="field-preferredDay"
                  type="date"
                  className="form-input"
                  value={formData.preferredDay}
                  onChange={e => updateField('preferredDay', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              ))}

              {renderField('preferredTime', 'Preferred time', false, (
                <select
                  id="field-preferredTime"
                  className="form-input"
                  value={formData.preferredTime}
                  onChange={e => updateField('preferredTime', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              ))}

              {renderRadioGroup('urgency', ['Normal', 'Urgent — business or office down'], 'Urgency', true)}

              {(formData.customerType === 'Business' || formData.customerType === 'Government or institution') && (
                <div className="form-group">
                  <label className={`checkbox-option ${formData.amcCustomer ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.amcCustomer}
                      onChange={e => updateField('amcCustomer', e.target.checked)}
                    />
                    Existing AMC customer
                  </label>
                </div>
              )}

              {formData.customerType === 'Government or institution' && (
                renderField('poReference', 'Work order / PO reference', false, (
                  <input
                    id="field-poReference"
                    type="text"
                    className="form-input"
                    value={formData.poReference}
                    onChange={e => updateField('poReference', e.target.value)}
                  />
                ))
              )}

              {renderField('otherNotes', 'Anything else', false, (
                <textarea
                  id="field-otherNotes"
                  className="form-input"
                  rows={3}
                  value={formData.otherNotes}
                  onChange={e => updateField('otherNotes', e.target.value)}
                />
              ))}

              <div className="form-group">
                <label className={`checkbox-option ${formData.consent ? 'selected' : ''} ${errors.consent ? 'error' : ''}`}>
                  <input
                    id="field-consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={e => updateField('consent', e.target.checked)}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    aria-invalid={!!errors.consent}
                  />
                  I agree to Hitech contacting me about this request, including on WhatsApp.
                </label>
                {errors.consent && (
                  <p id="consent-error" className="form-error" role="alert">{errors.consent}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={styles.formNav}>
            {currentStep > 0 ? (
              <button type="button" onClick={goBack} className={styles.backBtn}>
                ← Back
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button type="button" onClick={goNext} className={styles.nextBtn}>
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Submit request'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
