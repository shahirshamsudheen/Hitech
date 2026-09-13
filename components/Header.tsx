'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './Header.module.css';

/* ── Navigation Data ──────────────────────────────────────────────────── */

interface NavChild {
  label: string;
  href: string;
  children?: NavChild[];
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    href: '/service',
    children: [
      { label: 'Annual Maintenance Contracts', href: '/service?service=amc' },
      { label: 'Operating System & Software', href: '/service?service=os-software' },
      { label: 'Laptop / Desktop Repair', href: '/service?service=laptop-desktop' },
      { label: 'Motherboard & Chip-Level Repair', href: '/service?service=motherboard' },
      { label: 'Printer Service', href: '/service?service=printer' },
      { label: 'Data Recovery', href: '/service?service=data-recovery' },
      { label: 'On-Site Service', href: '/service?service=on-site' },
      { label: 'Other Electronics', href: '/service?service=other' },
    ],
  },
  {
    label: 'Shop',
    href: '/technology',
    children: [
      { label: 'All Products', href: '/technology?category=all' },
      { label: 'Laptops', href: '/technology?category=laptops' },
      { label: 'Custom Desktops', href: '/technology?category=desktops' },
      { label: 'Printers & Scanners', href: '/technology?category=printers' },
      { label: 'Monitors', href: '/technology?category=monitors' },
      { label: 'Networking', href: '/technology?category=networking' },
      { label: 'Storage', href: '/technology?category=storage' },
      { label: 'Accessories', href: '/technology?category=accessories' },
      { label: 'Other', href: '/technology?category=other' },
    ],
  },
  {
    label: 'Security',
    href: '/security',
    children: [
      { label: 'CCTV Supply & Installation', href: '/security?service=cctv' },
      { label: 'Other Security Solutions', href: '/security?service=other' },
    ],
  },
  {
    label: 'Travel',
    href: '/travel',
    children: [
      { label: 'Air Ticketing', href: '/travel?service=air-ticketing' },
      {
        label: 'Visa Process',
        href: '/travel?service=visa',
        children: [
          { label: 'GCC Countries', href: '/travel?service=visa-gcc' },
          { label: 'Schengen (All EU Countries)', href: '/travel?service=visa-schengen' },
          { label: 'USA', href: '/travel?service=visa-usa' },
          { label: 'Australia', href: '/travel?service=visa-australia' },
          { label: 'Other', href: '/travel?service=visa-other' },
        ],
      },
      { label: 'Foreign Medical Appointments', href: '/travel?service=medical' },
      {
        label: 'Customized Tour Packages',
        href: '/travel?service=tours',
        children: [
          { label: 'Dubai & Abu Dhabi', href: '/travel?service=tour-dubai' },
          { label: 'Europe Packages', href: '/travel?service=tour-europe' },
        ],
      },
      { label: 'Hotel Booking', href: '/travel?service=hotel' },
      { label: 'Passport Application', href: '/travel?service=passport' },
    ],
  },
  {
    label: 'eGov',
    href: '/online-services',
    children: [
      { label: 'PSC Applications', href: '/online-services?service=psc' },
      { label: 'Aadhaar Support', href: '/online-services?service=aadhaar' },
      {
        label: 'Online Bill Payments',
        href: '/online-services?service=bills',
        children: [
          { label: 'KSEB', href: '/online-services?service=kseb' },
          { label: 'Government Fees', href: '/online-services?service=gov-fees' },
          { label: 'Tax Payments', href: '/online-services?service=tax' },
          { label: 'Other', href: '/online-services?service=bills-other' },
        ],
      },
    ],
  },
  {
    label: 'History',
    href: '/history',
  },
];

const PHONE_PRIMARY = '+91 9496 818237';
const PHONE_PRIMARY_TEL = 'tel:+919496818237';

/* ── Component ─────────────────────────────────────────────────────────── */

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
    setMobileSubExpanded(null);
  };

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    closeMenu();
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(prev => prev === label ? null : label);
    setMobileSubExpanded(null);
  };

  const toggleMobileSubExpand = (label: string) => {
    setMobileSubExpanded(prev => prev === label ? null : label);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className={styles.header} role="banner" ref={headerRef}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="HITECH — Home" onClick={closeMenu}>
            <Image
              src="/brand/HITECH-logo-colour.svg"
              alt="HITECH"
              width={139}
              height={44}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className={styles.navItemWrapper}
                onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${pathname.startsWith(item.href) ? styles.active : ''}`}
                  onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
                >
                  {item.label}
                  {item.children && (
                    <svg className={styles.navChevron} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 4.5L6 7.5L9 4.5" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div
                    className={styles.dropdown}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.dropdownInner}>
                      {item.children.map((child) => (
                        <div key={child.label} className={styles.dropdownGroup}>
                          {child.children ? (
                            <>
                              <span className={styles.dropdownGroupLabel}>{child.label}</span>
                              <div className={styles.dropdownSubItems}>
                                {child.children.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className={styles.dropdownLink}
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link
                              href={child.href}
                              className={styles.dropdownLink}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.headerActions}>
            <a href={PHONE_PRIMARY_TEL} className={styles.phoneLink}>
              <svg className={styles.phoneIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {PHONE_PRIMARY}
            </a>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
              aria-label="Contact us on WhatsApp"
            >
              <svg className={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className={styles.whatsappBtnText}>WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <svg className={styles.hamburgerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className={styles.hamburgerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <nav
          id="mobile-menu"
          className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className={styles.mobileNavGroup}>
              <div className={styles.mobileNavHeader}>
                <Link
                  href={item.href}
                  className={`${styles.mobileNavLink} ${pathname.startsWith(item.href) ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    className={`${styles.mobileExpandBtn} ${mobileExpanded === item.label ? styles.expanded : ''}`}
                    onClick={() => toggleMobileExpand(item.label)}
                    aria-label={`Expand ${item.label}`}
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 4.5L6 7.5L9 4.5" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile sub-items */}
              {item.children && mobileExpanded === item.label && (
                <div className={styles.mobileSubMenu}>
                  {item.children.map((child) => (
                    <div key={child.label}>
                      {child.children ? (
                        <>
                          <button
                            className={styles.mobileSubHeader}
                            onClick={() => toggleMobileSubExpand(child.label)}
                          >
                            {child.label}
                            <svg className={`${styles.mobileSubChevron} ${mobileSubExpanded === child.label ? styles.expanded : ''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                              <path d="M3 4.5L6 7.5L9 4.5" />
                            </svg>
                          </button>
                          {mobileSubExpanded === child.label && (
                            <div className={styles.mobileNestedMenu}>
                              {child.children.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  className={styles.mobileNestedLink}
                                  onClick={closeMenu}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className={styles.mobileActions}>
            <a href={PHONE_PRIMARY_TEL} className={styles.mobilePhoneLink}>
              📞 {PHONE_PRIMARY}
            </a>
            <a href="tel:+914722960076" className={styles.mobilePhoneLink}>
              📞 +91 472 296007
            </a>
            <a href="tel:+919447765757" className={styles.mobilePhoneLink}>
              📞 +91 9447 765757
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile sticky bottom bar */}
      <div className={styles.mobileSticky} role="complementary" aria-label="Quick contact">
        <a href={PHONE_PRIMARY_TEL} className={`${styles.stickyBtn} ${styles.stickyCall}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          Call
        </a>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.stickyBtn} ${styles.stickyWhatsapp}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  );
}
