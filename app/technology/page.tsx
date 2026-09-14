'use client';

import { Suspense, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Laptop, ShoppingBag, Cpu, Printer, ShieldCheck } from 'lucide-react';
import { buildProductWhatsAppUrl, buildWhatsAppUrl } from '@/lib/whatsapp';
import { generateReference } from '@/lib/referenceGenerator';
import productsData from '@/data/products.json';
import styles from './page.module.css';

interface Product {
  id: string;
  category: string;
  brand: string;
  name: string;
  specs: string[];
  price: number;
  mrp: number;
  currency: string;
  stock: string;
  leadTime: string;
  warrantyMonths: number;
  images: string[];
  highlight: string;
}

const products: Product[] = productsData as Product[];

const CATEGORIES = [
  { key: 'all', label: 'All Products' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'desktops', label: 'Custom Desktops' },
  { key: 'printers', label: 'Printers & Scanners' },
  { key: 'monitors', label: 'Monitors' },
  { key: 'networking', label: 'Networking' },
  { key: 'storage', label: 'Storage & SSDs' },
  { key: 'accessories', label: 'Accessories' },
];

const PARTNER_BADGES = [
  { name: 'Acer Authorised Partner', src: '/partners/acer-partner.png' },
  { name: 'Asus Business Partner Gold', src: '/partners/asus-partner.png' },
  { name: 'Canon Premium Partner', src: '/partners/canon-partner.png' },
  { name: 'Epson Authorised Partner', src: '/partners/epson-partner.png' },
];

const HARDWARE_SOLUTIONS = [
  {
    icon: Laptop,
    title: 'Laptops & Workstations',
    desc: 'Authorized Acer, Asus, Apple, Dell, and HP laptops for students, creators, and business executives with official warranty.',
  },
  {
    icon: Cpu,
    title: 'Custom Desktop & Rig Builds',
    desc: 'Tailored workstation and gaming PC builds with component matching, stress testing, and lifetime service support.',
  },
  {
    icon: Printer,
    title: 'Printers & Scanners',
    desc: 'Official Canon and Epson ink tank, monochrome laser, and heavy-duty multi-function office units with full service backup.',
  },
  {
    icon: ShieldCheck,
    title: 'Network & Enterprise Storage',
    desc: 'Managed switches, routers, NVMe SSD arrays, and backup systems for small businesses and institutions.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function StockPill({ stock, leadTime }: { stock: string; leadTime: string }) {
  if (stock === 'in_stock') {
    return <span className={`${styles.stockPill} ${styles.stockInStock}`}>In stock</span>;
  }
  if (stock === 'order') {
    return <span className={`${styles.stockPill} ${styles.stockOnOrder}`}>On order — {leadTime}</span>;
  }
  return <span className={`${styles.stockPill} ${styles.stockOutOfStock}`}>Out of stock</span>;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState(initialCategory);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '', mobile: '', productInterest: '', budget: '', notes: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const updateField = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSelectSolution = (title: string) => {
    updateField('productInterest', title);
    if (window.matchMedia('(min-width: 1024px)').matches) {
      nameInputRef.current?.focus();
    } else {
      document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProductEnquire = (productName: string) => {
    updateField('productInterest', productName);
    if (window.matchMedia('(min-width: 1024px)').matches) {
      nameInputRef.current?.focus();
    } else {
      document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filtered = useMemo(() => {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  }, [category]);

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Enter your name.';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
      errs.mobile = 'Enter a valid 10-digit mobile number.';
    if (!formData.consent) errs.consent = 'You must agree to be contacted.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setReference(generateReference('OR'));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.shopPage}>
        <div className={styles.splitContainer}>
          <div className={styles.confirmCard}>
            <svg className={styles.confirmIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className={styles.confirmHeading}>Price quote request received.</h1>
            <p className={styles.referenceNumber}>Reference: {reference}</p>
            <p className={styles.confirmText}>
              We will contact you on {formData.mobile} with stock status and best pricing.
            </p>
            <a href={buildWhatsAppUrl({ reference, module: 'technology' })} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shopPage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <ShoppingBag size={14} />
            <span>Authorised Hardware Store</span>
          </div>
          <h1 className={styles.heading}>We fix what we sell.</h1>
          <p className={styles.intro}>
            Acer and Epson Authorised Partner. Asus Gold Partner. Canon Premium Partner.
            Laptops, custom gaming rigs, workstations, and printers. Bought here and supported here
            with full manufacturer warranty and local service.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.mainSection} aria-label="Hardware catalog and enquiry">
        <div className={styles.container}>
          {/* 1. Curated Product Catalog (First Section) */}
          <div className={styles.catalogSection}>
            <div className={styles.catalogHeader}>
              <div>
                <h2 className={styles.catalogTitle}>Curated In-Store Catalog</h2>
              </div>
              <div className={styles.categoryFilterInner} role="tablist">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    className={`${styles.categoryBtn} ${category === cat.key ? styles.active : ''}`}
                    onClick={() => setCategory(cat.key)}
                    role="tab"
                    aria-selected={category === cat.key}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className={styles.productGrid} role="tabpanel">
                {filtered.map(product => (
                  <article key={product.id} className={styles.productCard}>
                    <div className={styles.productImagePlaceholder}>
                      {product.images.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.images[0]} alt={`${product.brand} ${product.name}`} />
                      ) : (
                        <span>{product.brand} {product.name}</span>
                      )}
                    </div>
                    <div className={styles.productInfo}>
                      <p className={styles.productBrand}>{product.brand}</p>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <div className={styles.productSpecs}>
                        {product.specs.slice(0, 3).map(spec => (
                          <span key={spec} className={styles.specTag}>{spec}</span>
                        ))}
                      </div>
                      <div className={styles.productPricing}>
                        <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                        {product.mrp > product.price && (
                          <span className={styles.productMrp}>{formatPrice(product.mrp)}</span>
                        )}
                      </div>
                      <StockPill stock={product.stock} leadTime={product.leadTime} />
                      {product.highlight && (
                        <p className={styles.productHighlight}>{product.highlight}</p>
                      )}
                      <p className={styles.productPromise}>Official warranty &amp; local service support.</p>
                      <div className={styles.productActions}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', flex: 1 }}
                          onClick={() => handleProductEnquire(`${product.brand} ${product.name}`)}
                        >
                          Enquire Quote
                        </button>
                        <a
                          href={buildProductWhatsAppUrl(product.name, product.brand)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp"
                          style={{ fontSize: '0.8125rem', padding: '0.5rem 0.85rem' }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No products in this category yet. Contact our desk for direct model quotes.</p>
              </div>
            )}
          </div>

          {/* 2. Hardware Solutions & Consultation Form (Below Catalog) */}
          <div className={styles.splitGrid}>
            {/* Left Column: Official Badges & Solution Cards */}
            <div className={styles.leftColumn}>
              <p className={styles.sectionSubhead}>Official Brand Partnerships</p>
              <div className={styles.brandCardsGrid}>
                {PARTNER_BADGES.map(p => (
                  <div key={p.name} className={styles.brandCard} title={p.name}>
                    <Image src={p.src} alt={p.name} width={140} height={50} />
                  </div>
                ))}
              </div>

              <p className={styles.sectionSubhead}>Hardware Solutions</p>
              <div className={styles.solutionsGrid}>
                {HARDWARE_SOLUTIONS.map((sol, idx) => {
                  const Icon = sol.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={styles.solutionCard}
                      onClick={() => handleSelectSolution(sol.title)}
                    >
                      <div className={styles.solutionIconWrapper}>
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <h2 className={styles.solutionTitle}>{sol.title}</h2>
                      <p className={styles.solutionDesc}>{sol.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className={styles.infoMetaRow}>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Warranty</span>
                  <span className={styles.metaValue}>Official Brand Support</span>
                </div>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Service</span>
                  <span className={styles.metaValue}>Local Chip-Level Lab</span>
                </div>
                <div className={styles.infoMetaItem}>
                  <span className={styles.metaLabel}>Store Desk</span>
                  <span className={styles.metaValue}>+91 472 296007</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hardware Enquiry Form */}
            <div className={styles.rightColumn}>
              <div className={styles.formCard} id="enquiry-form">
                <h2 className={styles.formHeading}>Hardware &amp; device enquiry</h2>
                <p className={styles.formSubheading}>Request a quote, custom build configuration, or store availability.</p>

                <div className="form-group">
                  <label htmlFor="sh-name" className="form-label">Name <span className="required">*</span></label>
                  <input
                    ref={nameInputRef}
                    id="sh-name"
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="sh-mobile" className="form-label">Mobile number <span className="required">*</span></label>
                  <input
                    id="sh-mobile"
                    type="tel"
                    className={`form-input ${errors.mobile ? 'error' : ''}`}
                    value={formData.mobile}
                    onChange={e => updateField('mobile', e.target.value)}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobile && <p className="form-error" role="alert">{errors.mobile}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="sh-product" className="form-label">Item / Configuration of interest</label>
                  <input
                    id="sh-product"
                    type="text"
                    className="form-input"
                    value={formData.productInterest}
                    onChange={e => updateField('productInterest', e.target.value)}
                    placeholder="e.g. Asus Vivobook 15, Custom PC build, Epson EcoTank..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sh-budget" className="form-label">Target budget range</label>
                  <select
                    id="sh-budget"
                    className="form-input"
                    value={formData.budget}
                    onChange={e => updateField('budget', e.target.value)}
                  >
                    <option value="">Select budget</option>
                    {['Under ₹25,000', '₹25,000 – ₹45,000', '₹45,000 – ₹75,000', '₹75,000 – ₹1,20,000', '₹1,20,000+ High-end'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="sh-notes" className="form-label">Requirements / Preferred specs</label>
                  <textarea
                    id="sh-notes"
                    className="form-input"
                    rows={2}
                    value={formData.notes}
                    onChange={e => updateField('notes', e.target.value)}
                    placeholder="e.g. For architecture CAD, video editing, office use..."
                  />
                </div>

                <div className="form-group">
                  <label className={`checkbox-option ${formData.consent ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={e => updateField('consent', e.target.checked)}
                    />
                    I agree to HITECH contacting me regarding this quote.
                  </label>
                  {errors.consent && <p className="form-error" role="alert">{errors.consent}</p>}
                </div>

                <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%' }}>
                  Request pricing &amp; availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-3xl) 0', textAlign: 'center' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
