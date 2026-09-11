import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Cpu, ShieldCheck, Award, Wrench, Building2, Landmark, CheckCircle, Clock } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'History & Heritage — Since 2010 in Kallara | HITECH',
  description:
    'The story of HITECH Systems in Kallara, Kerala. Founded in 2010 by Vinod. Board-level repair since 2016, BGA micro-soldering, enterprise security, and official brand partnerships.',
};

const STATS = [
  { value: '2010', label: 'Established' },
  { value: '2016', label: 'Board level repair' },
  { value: '2023', label: 'Chip level repair BGA' },
  { value: '4', label: 'Authorized partners' },
];

const TIMELINE = [
  {
    year: 'August 2010',
    title: 'The Foundation in Kallara',
    text: 'Vinod established Hitech Systems at KG Building, Main Road, Kallara after years working as a computer hardware and systems engineer. As computing devices arrived across rural and suburban regions, Hitech provided reliable, dedicated technical service.',
    side: 'left',
  },
  {
    year: '2014',
    title: 'Akbar Travels & Citizen Services',
    text: 'Expanded services into citizen ticketing and documentation by becoming an official Akbar Travels Partner. Introduced an eGov counter to assist local citizens with Kerala PSC registrations, passport filings, and online services.',
    side: 'right',
  },
  {
    year: '2016',
    title: 'The Board-Level & Micro-Soldering Revolution',
    text: 'Recognizing that most repair centres needlessly force expensive full motherboard replacements, Hitech established a dedicated component-level lab with microscopes and trace diagnostics to repair logic boards directly.',
    side: 'left',
  },
  {
    year: '2019',
    title: 'Enterprise Security & Institutional IT',
    text: 'Expanded to enterprise security, CCTV installation, biometric access control, and campus network cabling for Community Health Centres, Panchayat offices, and commercial enterprises across Kerala.',
    side: 'right',
  },
  {
    year: '2023 – Present',
    title: 'Advanced BGA Lab & Multi-Brand Accreditations',
    text: 'Upgraded the laboratory with an infrared Ball Grid Array (BGA) rework station for micro-pitch ICs and GPU reflows (one of a kind in Kerala). Formally accredited as Acer Authorised Partner, Asus Gold Partner, Canon Premium Partner, and Epson Authorised Partner.',
    side: 'left',
  },
];

const PARTNERS = [
  { name: 'Acer Authorised Partner', src: '/partners/acer-partner.png' },
  { name: 'Asus Business Partner Gold', src: '/partners/asus-partner.png' },
  { name: 'Canon Premium Partner', src: '/partners/canon-partner.png' },
  { name: 'Epson Authorised Partner', src: '/partners/epson-partner.png' },
];

const CERTIFICATES = [
  {
    image: '/certificates/kaspersky-partner.jpg',
    tag: 'Authorization',
    title: 'Kaspersky Authorised Partner',
    desc: 'Authorised partner for Kaspersky Consumer Solutions Products for the state of Kerala.',
  },
  {
    image: '/certificates/asus-premium-partner.jpg',
    tag: 'Partnership',
    title: 'ASUS Premium Partner 2026',
    desc: 'Certified ASUS Premium Partner by ASUS India for the year 2026.',
  },
  {
    image: '/certificates/canon-megatank-award.jpg',
    tag: 'Award',
    title: 'Canon MegaTank — 10 Years of Excellence',
    desc: 'Recognized by Canon for 10 years of excellence in building the MegaTank legacy.',
  },
  {
    image: '/certificates/canon-authorized-reseller.jpg',
    tag: 'Authorization',
    title: 'Canon Authorised Reseller',
    desc: 'Authorized to stock and sell Canon Inkjet and Laser Printers to end customers across Kerala.',
  },
  {
    image: '/certificates/canon-training-certificate.jpg',
    tag: 'Training',
    title: 'Canon Product & Sales Training',
    desc: 'Certificate of completion for Inkjet Product & Sales Training programme by Canon India.',
  },
];

const GALLERIES = [
  {
    image: '/images/bga-chip-repair.jpg',
    tag: 'Technical Facility',
    title: 'Precision BGA Rework Station',
    desc: 'High-precision micro-soldering and thermal imaging setup for repairing complex motherboard chipsets and power ICs.',
  },
  {
    image: '/images/hitech-lab-team.jpg',
    tag: 'Engineering Desk',
    title: 'Component-Level Diagnostics',
    desc: 'Our team of 8 technicians troubleshooting circuit boards, firmware BIOS, and complex electronic subsystems.',
  },
  {
    image: '/images/hitech-cctv-deploy.jpg',
    tag: 'Field Deployments',
    title: 'Enterprise Security & Networking',
    desc: 'On-site server rack, structured cabling, and commercial surveillance installations across institutions and businesses.',
  },
];

const PRINCIPLES = [
  {
    icon: Wrench,
    title: 'Repaired, Not Replaced',
    text: 'We isolate failed chips, capacitors, and MOSFETs instead of forcing customers into costly board swaps. Better for your wallet, better for sustainability.',
  },
  {
    icon: Award,
    title: 'Direct Engineering',
    text: 'You talk directly with technicians who perform the repair or install the hardware — no high-pressure salesmen or outsourced third-party desks.',
  },
  {
    icon: Landmark,
    title: 'Institutional Reliability',
    text: 'Trusted by government healthcare centres, village offices, schools, and established Kerala businesses since 2010.',
  },
];

export default function HistoryPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Clock size={14} />
            <span>Fifteen Years in Kallara · Est. 2010</span>
          </div>
          <h1 className={styles.heroHeading}>Engineering Trust. One Circuit at a Time.</h1>
          <p className={styles.heroIntro}>
            From a single computer systems workshop in 2010 to a specialized component-level
            laboratory, institutional security integrator, and multi-brand authorised service centre.
          </p>

          <div className={styles.statsRow}>
            {STATS.map(s => (
              <div key={s.value} className={styles.statItem}>
                <div className={styles.statNumber}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section className={styles.timelineSection} aria-label="Our timeline">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Milestones</span>
            <h2 className={styles.sectionTitle}>The Journey from 2010 to Today</h2>
          </div>

          <div className={styles.timelineTrack}>
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.timelineItem} ${item.side === 'left' ? styles.timelineItemLeft : styles.timelineItemRight}`}
              >
                <div className={styles.timelineDot} aria-hidden="true" />
                <div className={styles.timelineCard}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineHeading}>{item.title}</h3>
                  <p className={styles.timelineText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Showcase & Technical Facilities */}
      <section className={styles.gallerySection} aria-label="Technical facilities">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Facility &amp; Team</span>
            <h2 className={styles.sectionTitle}>Inside Our Laboratory &amp; Deployments</h2>
          </div>

          <div className={styles.galleryGrid}>
            {GALLERIES.map((g, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <div className={styles.galleryImageWrapper}>
                  <Image
                    src={g.image}
                    alt={g.title}
                    width={640}
                    height={400}
                    className={styles.galleryImage}
                  />
                </div>
                <div className={styles.galleryContent}>
                  <span className={styles.galleryTag}>{g.tag}</span>
                  <h3 className={styles.galleryTitle}>{g.title}</h3>
                  <p className={styles.galleryDesc}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Accreditations & Core Principles */}
      <section className={styles.accreditationsSection} aria-label="Accreditations">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Accreditations</span>
            <h2 className={styles.sectionTitle}>Official Brand Partnerships</h2>
          </div>

          <div className={styles.partnersGrid}>
            {PARTNERS.map(p => (
              <div key={p.name} className={styles.partnerCard}>
                <Image
                  src={p.src}
                  alt={p.name}
                  width={180}
                  height={90}
                  className={styles.partnerImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Awards */}
      <section className={styles.certificatesSection} aria-label="Certificates and awards" id="certificates">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Certificates &amp; Awards</span>
            <h2 className={styles.sectionTitle}>Verified Authorizations</h2>
          </div>

          <div className={styles.certificatesGrid}>
            {CERTIFICATES.map((cert, idx) => (
              <div key={idx} className={styles.certificateCard}>
                <div className={styles.certificateImageWrapper}>
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={600}
                    height={450}
                    className={styles.certificateImage}
                  />
                </div>
                <div className={styles.certificateContent}>
                  <span className={styles.certificateTag}>{cert.tag}</span>
                  <h3 className={styles.certificateTitle}>{cert.title}</h3>
                  <p className={styles.certificateDesc}>{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className={styles.accreditationsSection} aria-label="Core Principles">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Our Philosophy</span>
            <h2 className={styles.sectionTitle}>Core Principles</h2>
          </div>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className={styles.principleCard}>
                  <div className={styles.principleIconWrapper}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleText}>{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
