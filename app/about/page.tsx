import type { Metadata } from 'next';
import styles from '../security/page.module.css';

export const metadata: Metadata = {
  title: 'About Hitech — Since 2010 in Kallara',
  description: 'Hitech Systems has repaired, installed and maintained technology in Kallara, Trivandrum district since 2010. Eight technicians. Board-level repair since 2016.',
};

const PARTNERS = [
  'Acer Authorised Partner',
  'Epson Authorised Partner',
  'Asus Gold Partner',
  'Canon Premium Partner',
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>Since 2010, in Kallara.</h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.contentBlock}>
            <p>
              Vinod started Hitech in August 2010, after working as a computer systems engineer.
              Computers were arriving in homes and offices across these villages faster than anyone
              nearby could keep them running. Fifteen years later that is still the job.
            </p>
            <p>
              Today eleven people work here. Eight are technicians. Two of them repair circuit boards
              at component level, which is why machines other people wrote off are still working.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h2>What we have done since then</h2>
            <ul>
              <li>Operating since <strong>2010</strong></li>
              <li>Board-level repair since <strong>2016</strong></li>
              <li><strong>8 technicians</strong> across service, installation and repair</li>
              <li><strong>11 staff</strong> total</li>
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <h2>Authorised partners</h2>
            <ul>
              {PARTNERS.map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <h2>Customers we work with</h2>
            <p>
              <strong>Government and institutions:</strong> Community Health Centres, Family Health Centres,
              Village Offices, Panchayat Offices, Government Schools.
            </p>
            <p>
              <strong>Private companies:</strong> Daily Foods, Vrindhavanam Group of Companies, Ponmudi Mills,
              AKR Industries, MURKO.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h2>The team</h2>
            <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
              Team photographs and names to be added when supplied by the client.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
