import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Wrench, Laptop, ShieldCheck, Plane, FileText } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HITECH — Computer Repair, CCTV & Technology Services in Kallara, Trivandrum',
  description:
    'Computer repair, laptop service, CCTV installation, and technology sales in Kallara, Trivandrum district. Board-level repair since 2016. Serving Nedumangad, Kilimanoor, Palode, Pangode and surrounding areas since 2010.',
};

const MODULES = [
  {
    href: '/service',
    heading: 'Services',
    line: 'Computers, printers and board-level repair. Bring it in or we come to you.',
    icon: Wrench,
  },
  {
    href: '/technology',
    heading: 'Shop',
    line: 'Laptops, desktops, printers and accessories. Bought here, fixed here.',
    icon: Laptop,
  },
  {
    href: '/security',
    heading: 'Security',
    line: 'CCTV, access control, networking and cabling. Installed and maintained.',
    icon: ShieldCheck,
  },
  {
    href: '/travel',
    heading: 'Travel',
    line: 'Tickets, visas and passports, as an Akbar Travels partner.',
    icon: Plane,
  },
  {
    href: '/online-services',
    heading: 'eGov',
    line: 'Government and online applications, payments and certificates.',
    icon: FileText,
  },
];

const STATS = [
  { value: 'Since 2010', label: 'Fifteen years in Kallara' },
  { value: '8 technicians', label: 'Service and installation, not a sales floor' },
  { value: 'Board-level repair since 2016', label: 'We repair the board instead of replacing it' },
];

const GOV_CUSTOMERS = [
  'Community Health Centres',
  'Family Health Centres',
  'Village Offices',
  'Panchayat Offices',
  'Government Schools',
];

const BIZ_CUSTOMERS = [
  'Daily Foods',
  'Vrindhavanam Group',
  'Ponmudi Mills',
  'AKR Industries',
  'MURKO',
];

const PARTNERS = [
  { name: 'Acer Authorised Partner', src: '/partners/acer-partner.png' },
  { name: 'Asus Business Partner Gold', src: '/partners/asus-partner.png' },
  { name: 'Canon Premium Partner', src: '/partners/canon-partner.png' },
  { name: 'Epson Authorised Partner', src: '/partners/epson-partner.png' },
];

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hitech Systems',
    alternateName: 'HITECH',
    description:
      'Computer repair, laptop service, CCTV installation, and technology sales in Kallara, Trivandrum district. Board-level repair since 2016.',
    url: 'https://hitechkallara.com',
    telephone: ['+919496818237', '+914722960076', '+919447765757'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'KG Building, Main Road',
      addressLocality: 'Kallara',
      addressRegion: 'Kerala',
      postalCode: '695608',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.6544,
      longitude: 77.0232,
    },
    areaServed: [
      'Kallara', 'Nedumangad', 'Kilimanoor', 'Palode',
      'Pangode', 'Vamanapuram', 'Attingal', 'Trivandrum',
    ],
    foundingDate: '2010-08',
    priceRange: '₹₹',
    image: 'https://hitechkallara.com/brand/HITECH-logo-colour.svg',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.heroLabel}>Since 2010 · Kallara, Trivandrum</p>
          <h1 className={styles.heroHeading}>We keep it working.</h1>
          <p className={styles.heroIntro}>
            Hitech has repaired, installed and maintained technology in and around
            Kallara since 2010. Computers, cameras and networks — for homes,
            businesses, schools and government offices across Trivandrum district.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/service" className="btn btn-primary">
              Book a repair
            </Link>
            <Link href="/security" className="btn btn-secondary-light">
              Request a site visit
            </Link>
          </div>
        </div>
      </section>

      {/* Module selector */}
      <section className={styles.modules} aria-label="Our services">
        <div className={styles.modulesInner}>
          <p className={styles.sectionLabel}>What do you need?</p>
          <div className={styles.moduleGrid}>
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link key={mod.href} href={mod.href} className={styles.moduleCard}>
                  <div className={styles.moduleCardContent}>
                    <div className={styles.moduleIconWrapper}>
                      <Icon className={styles.moduleIconSvg} size={28} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h2 className={styles.moduleCardHeading}>{mod.heading}</h2>
                    <p className={styles.moduleCardLine}>{mod.line}</p>
                  </div>
                  <div className={styles.moduleCardChevron}>
                    <svg className={styles.chevronIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats} aria-label="Why HITECH">
        <div className={styles.statsInner}>
          <p className={styles.sectionLabel}>Why people choose HITECH</p>
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.value} className={styles.statTile}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className={styles.trust} aria-label="Trusted by">
        <div className={styles.trustInner}>
          <p className={styles.sectionLabel}>Trusted by</p>
          <div className={styles.trustColumns}>
            <div className={styles.trustGroup}>
              <p className={styles.trustGroupLabel}>Government and institutions</p>
              <div className={styles.trustNames}>
                {GOV_CUSTOMERS.map((name) => (
                  <span key={name} className={styles.trustBadge}>{name}</span>
                ))}
              </div>
            </div>
            <div className={styles.trustGroup}>
              <p className={styles.trustGroupLabel}>Businesses</p>
              <div className={styles.trustNames}>
                {BIZ_CUSTOMERS.map((name) => (
                  <span key={name} className={styles.trustBadge}>{name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className={styles.partners} aria-label="Authorised partners">
        <div className={styles.partnersInner}>
          <p className={styles.sectionLabel}>Authorised partners</p>
          <div className={styles.partnersGrid}>
            {PARTNERS.map((partner) => (
              <div key={partner.name} className={styles.partnerCard}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={140}
                  height={140}
                  className={styles.partnerImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className={styles.whatsappBlock} aria-label="Quick enquiry">
        <div className={styles.whatsappInner}>
          <h2 className={styles.whatsappHeading}>
            Not sure if it is worth repairing?
          </h2>
          <p className={styles.whatsappText}>
            Send us a photo of the problem. We will tell you before you bring it in.
          </p>
          <a
            href={buildWhatsAppUrl({ module: 'service' })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp us
          </a>
        </div>
      </section>

      {/* Location */}
      <section className={styles.location} aria-label="Location and contact">
        <div className={styles.locationInner}>
          <div className={styles.locationGrid}>
            <div className={styles.locationInfo}>
              <h2>Find us in Kallara</h2>
              <address className={styles.locationAddress}>
                KG Building, Main Road<br />
                Kallara P.O, Trivandrum<br />
                Kerala 695608
              </address>
              <div className={styles.locationPhones}>
                <a href="tel:+919496818237" className={styles.locationPhoneLink}>
                  +91 9496 818237
                </a>
                <a href="tel:+914722960076" className={styles.locationPhoneLink}>
                  +91 472 296007
                </a>
                <a href="tel:+919447765757" className={styles.locationPhoneLink}>
                  +91 9447 765757
                </a>
              </div>
              <p className={styles.locationHours}>
                {/* TO CONFIRM: Opening hours */}
                Monday – Saturday · Hours to be confirmed
              </p>
            </div>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5!2d77.023!3d8.654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzknMTQuNCJOIDc3wrAwMScyMy41IkU!5e0!3m2!1sen!2sin!4v1"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HITECH Systems location on Google Maps"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
