import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const PARTNERS = [
  { name: 'Acer Authorised Partner', src: '/partners/acer-partner.png' },
  { name: 'Asus Business Partner Gold', src: '/partners/asus-partner.png' },
  { name: 'Canon Premium Partner', src: '/partners/canon-partner.png' },
  { name: 'Epson Authorised Partner', src: '/partners/epson-partner.png' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerPattern} aria-hidden="true" />
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Company info */}
          <div className={styles.footerSection}>
            <div className={styles.companyInfo}>
              <Image
                src="/brand/HITECH-logo-white.svg"
                alt="HITECH"
                width={120}
                height={38}
                className={styles.footerLogo}
              />
              <p>
                HITECH has repaired, installed and maintained technology in and around
                Kallara since 2010.
              </p>
              <address className={styles.address}>
                KG Building, Main Road<br />
                Kallara P.O, Trivandrum<br />
                Kerala 695608
              </address>
              <div className={styles.phoneList}>
                <a href="tel:+914722960076" className={styles.footerPhone}>
                  <span>📞 +91 472 296007</span>
                </a>
                <a href="tel:+919496818237" className={styles.footerPhone}>
                  <span>📱 +91 9496 818237</span>
                </a>
                <a href="tel:+919447765757" className={styles.footerPhone}>
                  <span>📞 +91 9447 765757</span>
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h3>Services</h3>
            <div className={styles.footerLinks}>
              <Link href="/service" className={styles.footerLink}>
                Service &amp; Repair
              </Link>
              <Link href="/technology" className={styles.footerLink}>
                Shop
              </Link>
              <Link href="/security" className={styles.footerLink}>
                Security Systems
              </Link>
              <Link href="/travel" className={styles.footerLink}>
                Travel
              </Link>
              <Link href="/online-services" className={styles.footerLink}>
                eGov Services
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className={styles.footerSection}>
            <h3>Company</h3>
            <div className={styles.footerLinks}>
              <Link href="/history" className={styles.footerLink}>
                History
              </Link>
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
              <div key={partner.name} className={styles.partnerCard}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={100}
                  height={100}
                  className={styles.partnerImage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.footerBottom}>
          <p>
            © {currentYear} HITECH Systems, Kallara.{' '}
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
