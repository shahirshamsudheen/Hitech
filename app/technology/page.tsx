'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildProductWhatsAppUrl } from '@/lib/whatsapp';
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
  { key: 'all', label: 'All' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'desktops', label: 'Custom Desktops' },
  { key: 'printers', label: 'Printers & Scanners' },
  { key: 'monitors', label: 'Monitors' },
  { key: 'networking', label: 'Networking' },
  { key: 'storage', label: 'Storage' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'other', label: 'Other' },
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

  const filtered = useMemo(() => {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  }, [category]);

  return (
    <div className={styles.shopPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>We fix what we sell.</h1>
          <p className={styles.intro}>
            Acer and Epson Authorised Partner. Asus Gold Partner. Canon Premium Partner.
            Buy here and it gets serviced here, by the people who sold it to you — at board
            level where that makes sense.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className={styles.categoryFilter} role="tablist" aria-label="Product categories">
        <div className={styles.categoryFilterInner}>
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

      {/* Product grid */}
      <div className={styles.productSection}>
        <div className={styles.productSectionInner}>
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
                    <h2 className={styles.productName}>{product.name}</h2>
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
                    <p className={styles.productPromise}>Serviced here for as long as you own it.</p>
                    <div className={styles.productActions}>
                      <a
                        href={buildProductWhatsAppUrl(product.name, product.brand)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
                      >
                        Enquire
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No products in this category yet. Check back soon or ask us directly.</p>
            </div>
          )}
        </div>
      </div>
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

