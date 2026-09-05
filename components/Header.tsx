'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './Header.module.css';

const MODULES = [
  { href: '/service', label: 'Service' },
  { href: '/technology', label: 'Technology' },
  { href: '/security', label: 'Security' },
  { href: '/travel', label: 'Travel' },
  { href: '/online-services', label: 'Online Services' },
];

const PHONE_PRIMARY = '+91 9496 818237';
const PHONE_PRIMARY_TEL = 'tel:+919496818237';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className={styles.header} role="banner">
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Hitech — Home" onClick={closeMenu}>
            <Image
              src="/brand/HITECH-wordmark-green.svg"
              alt="HITECH"
              width={160}
              height={40}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {MODULES.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className={`${styles.navLink} ${pathname.startsWith(mod.href) ? styles.active : ''}`}
              >
                {mod.label}
              </Link>
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
              onClick={toggleMenu}
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
          {MODULES.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className={`${styles.mobileNavLink} ${pathname.startsWith(mod.href) ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {mod.label}
            </Link>
          ))}
          <Link href="/institutions" className={styles.mobileNavLink} onClick={closeMenu}>
            For Institutions
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={closeMenu}>
            About
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
            Contact
          </Link>
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
