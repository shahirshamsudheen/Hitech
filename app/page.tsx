import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Wrench,
  Laptop,
  ShieldCheck,
  Plane,
  FileText,
  Cpu,
  CheckCircle2,
  Landmark,
  Building2,
  Phone,
  PhoneCall,
  Smartphone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HITECH — Computer Repair, CCTV & Technology Services in Kallara, Trivandrum',
  description:
    'Specialized BGA chip-level motherboard repair, computer service, CCTV installation, and technology sales in Kallara, Trivandrum district. Board-level repair since 2016.',
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

const BGA_FEATURES = [
  {
    title: 'Ball Grid Array (BGA) Rework Station',
    desc: 'Precision infrared & hot-air rework station for safely desoldering, reballing, and re-soldering micro-pitch ICs.',
  },
  {
    title: 'Component-Level Motherboard Diagnostics',
    desc: 'Deep schematic tracing, short-circuit thermal imaging, and oscilloscopes to pinpoint failed capacitors, MOSFETs, and power controllers.',
  },
  {
    title: 'GPU, CPU & Chipset Micro-Soldering',
    desc: 'Reviving graphics chips, processor rails, BIOS corruption, and power management units instead of costly full board replacements.',
  },
  {
    title: 'One-of-a-Kind Facility in Trivandrum',
    desc: 'State-of-the-art micro-soldering and board repair lab right here in Kallara — trusted by clients across Trivandrum district.',
  },
];

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hitech Systems',
    alternateName: 'HITECH',
    description:
      'Computer repair, laptop service, CCTV installation, and technology sales in Kallara, Trivandrum district. Specialized BGA chip-level repair since 2016.',
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

      {/* Authorised Partners - Immediately following Modules, matching 5-tile full container width */}
      <section className={styles.partners} aria-label="Authorised partners">
        <div className={styles.partnersInner}>
          <div className={styles.partnersHeader}>
            <p className={styles.sectionLabel}>Official Authorised Partners</p>
            <span className={styles.partnersSubtitle}>Direct manufacturer warranty and genuine sales support</span>
          </div>
          <div className={styles.partnersGrid}>
            {PARTNERS.map((partner) => (
              <div key={partner.name} className={styles.partnerCard}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={220}
                  height={120}
                  className={styles.partnerImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized BGA Chip-Level Motherboard Repair Spotlight */}
      <section className={styles.bgaSpotlight} aria-label="Chip-level motherboard repair">
        <div className={styles.bgaPattern} aria-hidden="true" />
        <div className={styles.bgaInner}>
          <div className={styles.bgaGrid}>
            <div className={styles.bgaContent}>
              <div className={styles.bgaPill}>
                <Cpu size={16} strokeWidth={2} />
                <span>Specialized Motherboard Engineering</span>
              </div>
              <h2 className={styles.bgaHeading}>
                Advanced Chip-Level &amp; BGA Rework Laboratory.
              </h2>
              <p className={styles.bgaLead}>
                One of a kind in Trivandrum — we specialize in Ball Grid Array (BGA) rework,
                micro-soldering, and board-level component diagnosis. Why replace an expensive
                motherboard when the damaged chip can be precision-repaired?
              </p>

              <div className={styles.bgaFeatureList}>
                {BGA_FEATURES.map((feat, idx) => (
                  <div key={idx} className={styles.bgaFeatureItem}>
                    <div className={styles.bgaFeatureIconWrapper}>
                      <CheckCircle2 size={18} strokeWidth={2.5} className={styles.bgaFeatureIcon} />
                    </div>
                    <div>
                      <h3 className={styles.bgaFeatureTitle}>{feat.title}</h3>
                      <p className={styles.bgaFeatureDesc}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.bgaActions}>
                <Link href="/service" className="btn btn-primary">
                  <span>Explore Repair Services</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={buildWhatsAppUrl({ module: 'service' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Consult a Technician
                </a>
              </div>
            </div>

            <div className={styles.bgaVisualWrapper}>
              <div className={styles.bgaImageCard}>
                <div className={styles.bgaImageOverlay} />
                <Image
                  src="/images/bga-chip-repair.jpg"
                  alt="Specialized BGA Chip Level Repair Laboratory at Hitech Kallara"
                  width={640}
                  height={480}
                  className={styles.bgaImage}
                  priority
                />
                <div className={styles.bgaFloatingBadge}>
                  <Sparkles size={16} className={styles.badgeSparkle} />
                  <div>
                    <div className={styles.badgeTitle}>BGA Micro-Soldering</div>
                    <div className={styles.badgeSub}>Precision Motherboard Rework</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted & Impressive Trusted by Section */}
      <section className={styles.trust} aria-label="Trusted by">
        <div className={styles.trustInner}>
          <div className={styles.trustHeader}>
            <p className={styles.sectionLabel}>Trusted by</p>
            <h2 className={styles.trustHeading}>Serving institutions and local businesses since 2010.</h2>
          </div>
          <div className={styles.trustColumns}>
            {/* Government & Institutions */}
            <div className={styles.trustCard}>
              <div className={styles.trustCardHeader}>
                <div className={styles.trustIconWrapper}>
                  <Landmark size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className={styles.trustCardTitle}>Government &amp; Institutions</h3>
                  <p className={styles.trustCardSub}>Healthcare centres, offices and educational bodies</p>
                </div>
              </div>
              <div className={styles.trustNames}>
                {GOV_CUSTOMERS.map((name) => (
                  <div key={name} className={styles.trustBadge}>
                    <CheckCircle2 size={14} strokeWidth={2.5} className={styles.trustCheckIcon} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Businesses */}
            <div className={styles.trustCard}>
              <div className={styles.trustCardHeader}>
                <div className={styles.trustIconWrapper}>
                  <Building2 size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className={styles.trustCardTitle}>Commercial Enterprises</h3>
                  <p className={styles.trustCardSub}>Manufacturers, retail brands and corporate teams</p>
                </div>
              </div>
              <div className={styles.trustNames}>
                {BIZ_CUSTOMERS.map((name) => (
                  <div key={name} className={styles.trustBadge}>
                    <CheckCircle2 size={14} strokeWidth={2.5} className={styles.trustCheckIcon} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
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

      {/* Styled Location & Contact Section */}
      <section className={styles.location} aria-label="Location and contact">
        <div className={styles.locationInner}>
          <div className={styles.locationGrid}>
            <div className={styles.locationInfo}>
              <div className={styles.locationHeaderBlock}>
                <p className={styles.sectionLabel}>Visit &amp; Contact</p>
                <h2 className={styles.locationMainHeading}>Find us in Kallara</h2>
                <p className={styles.locationSubText}>
                  Conveniently located at Main Road, Kallara with direct service counters and dedicated technical lab.
                </p>
              </div>

              {/* Styled Address Card */}
              <div className={styles.styledAddressCard}>
                <div className={styles.cardIconBox}>
                  <MapPin size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className={styles.cardHeading}>Office &amp; Service Centre</h3>
                  <address className={styles.addressText}>
                    KG Building, Main Road<br />
                    Kallara P.O, Trivandrum<br />
                    Kerala 695608
                  </address>
                </div>
              </div>

              {/* Styled Phone Directory Cards */}
              <div className={styles.phonesContainer}>
                {/* Tel 1 */}
                <a href="tel:+919496818237" className={styles.phoneCard}>
                  <div className={styles.phoneIconBox}>
                    <Smartphone size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.phoneCardContent}>
                    <div className={styles.phoneLabelRow}>
                      <span className={styles.phoneBadgePrimary}>Tel 1</span>
                      <span className={styles.phoneRole}>Primary &amp; WhatsApp</span>
                    </div>
                    <span className={styles.phoneNumber}>+91 9496 818237</span>
                  </div>
                </a>

                {/* Landphone */}
                <a href="tel:+914722960076" className={styles.phoneCard}>
                  <div className={styles.phoneIconBox}>
                    <Phone size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.phoneCardContent}>
                    <div className={styles.phoneLabelRow}>
                      <span className={styles.phoneBadgeSecondary}>Landphone</span>
                      <span className={styles.phoneRole}>Office Landline</span>
                    </div>
                    <span className={styles.phoneNumber}>+91 472 296007</span>
                  </div>
                </a>

                {/* Tel 2 */}
                <a href="tel:+919447765757" className={styles.phoneCard}>
                  <div className={styles.phoneIconBox}>
                    <PhoneCall size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.phoneCardContent}>
                    <div className={styles.phoneLabelRow}>
                      <span className={styles.phoneBadgeNeutral}>Tel 2</span>
                      <span className={styles.phoneRole}>Direct Helpline</span>
                    </div>
                    <span className={styles.phoneNumber}>+91 9447 765757</span>
                  </div>
                </a>
              </div>

              {/* Working Hours */}
              <div className={styles.hoursBox}>
                <Clock size={16} className={styles.hoursIcon} />
                <span>Monday – Saturday · Hours to be confirmed</span>
              </div>
            </div>

            {/* Interactive Map */}
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
