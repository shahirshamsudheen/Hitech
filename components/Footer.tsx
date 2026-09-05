import Link from 'next/link';
import styles from './Footer.module.css';

const PARTNERS = [
  'Acer Authorised Partner',
  'Epson Authorised Partner',
  'Asus Gold Partner',
  'Canon Premium Partner',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Company info */}
          <div className={styles.footerSection}>
            <div className={styles.companyInfo}>
              <p>
                Hitech has repaired, installed and maintained technology in and around
                Kallara since 2010.
              </p>
              <address className={styles.address}>
                KG Building, Main Road<br />
                Kallara P.O, Trivandrum<br />
                Kerala 695608
              </address>
              <div className={styles.phoneList}>
                <a href="tel:+919496818237" className={styles.footerPhone}>
                  +91 9496 818237
                </a>
                <a href="tel:+914722960076" className={styles.footerPhone}>
                  +91 472 296007
                </a>
                <a href="tel:+919447765757" className={styles.footerPhone}>
                  +91 9447 765757
                </a>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className={styles.footerSection}>
            <h3>Services</h3>
            <div className={styles.footerLinks}>
              <Link href="/service" className={styles.footerLink}>
                Service &amp; Repair
              </Link>
              <Link href="/technology" className={styles.footerLink}>
                Technology &amp; Store
              </Link>
              <Link href="/security" className={styles.footerLink}>
                Security Systems
              </Link>
              <Link href="/travel" className={styles.footerLink}>
                Travel
              </Link>
              <Link href="/online-services" className={styles.footerLink}>
                Online Services
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className={styles.footerSection}>
            <h3>Company</h3>
            <div className={styles.footerLinks}>
              <Link href="/about" className={styles.footerLink}>
                About Us
              </Link>
              <Link href="/institutions" className={styles.footerLink}>
                For Institutions
              </Link>
              <Link href="/contact" className={styles.footerLink}>
                Contact
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div className={styles.footerSection}>
            <h3>Hours</h3>
            <div className={styles.footerLinks}>
              <span className={styles.footerLink}>
                {/* TO CONFIRM: Opening hours */}
                Monday – Saturday
              </span>
              <span className={styles.footerLink}>
                Hours to be confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Partners row */}
        <div className={styles.partnersRow}>
          <div className={styles.partnersInner}>
            {PARTNERS.map((partner) => (
              <span key={partner} className={styles.partnerBadge}>
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.footerBottom}>
          <p>
            © {currentYear} Hitech Systems, Kallara.{' '}
            <span className={styles.boardRepair}>Board-level repair since 2016.</span>
          </p>
          <div className={styles.legalLinks}>
            <Link href="/legal/privacy" className={styles.legalLink}>
              Privacy
            </Link>
            <Link href="/legal/terms" className={styles.legalLink}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
