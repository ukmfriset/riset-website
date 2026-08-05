"use client";

import Link from 'next/link';
import { 
  FaInstagram, 
  FaXTwitter, 
  FaTiktok, 
  FaYoutube, 
  FaFacebookF, 
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope
} from "react-icons/fa6";

export default function Footer() {
  const socialMedias = [
    { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/ukmfriset" },
    { name: "X", icon: <FaXTwitter />, link: "https://www.x.com/ukmfriset" },
    { name: "TikTok", icon: <FaTiktok />, link: "https://wwww.tiktok.com/@ukmfriset" },
    { name: "YouTube", icon: <FaYoutube />, link: "https://www.youtube.com/@ukmfriset" },
    { name: "Facebook", icon: <FaFacebookF />, link: "https://www.facebook.com/ukmfriset" },
    { name: "LinkedIn", icon: <FaLinkedinIn />, link: "https://www.linkedin.com/company/ukmfriset" }
  ];

  const contactLinks = [
    { name: "WhatsApp", icon: <FaWhatsapp />, link: "https://wa.me/6285161153723" },
    { name: "Email", icon: <FaEnvelope />, link: "mailto:halo@ukmfriset.or.id" }
  ];

  const mainEvents = [
    { name: "ORION", link: "https://www.orion.ukmfriset.or.id" },
    { name: "TONGSIS", link: "https://www.tongsis.ukmfriset.or.id" },
  ];

  return (
    <footer style={{
      width: '100%',
      backgroundColor: 'var(--color-dark-slate)',
      color: 'var(--color-text-light)',
      padding: '80px 20px 40px 20px',
      borderTop: '1px solid var(--color-border-dark)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px'
      }}>

        {/* KONTEN UTAMA: GRID RESPONSIVE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px'
        }}>

          {/* KOLOM 1: LOGO & TAGLINE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <img 
              src="/semangat-berkarya.webp" 
              alt="Logo Semangat Berkarya" 
              style={{ 
                width: 'auto', 
                height: '50px', 
                objectFit: 'contain', 
                alignSelf: 'flex-start',
                maxWidth: '100%'
              }} 
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-body)' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: '800',
                color: '#ffffff',
                margin: '0'
              }}>
                UKM-F RISET FISIB UTM
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--color-text-muted)',
                margin: '0',
                maxWidth: '300px'
              }}>
                Fakultas Ilmu Sosial dan Ilmu Budaya Universitas Trunojoyo Madura
              </p>
            </div>
          </div>

          {/* KOLOM 2: MAIN EVENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              fontWeight: '800',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0'
            }}>
              MAIN EVENT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
              {mainEvents.map((event, idx) => (
                <Link 
                  key={idx} 
                  href={event.link}
                  style={{ 
                    color: 'var(--color-text-light)', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand-orange)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-light)'}
                >
                  {event.name}
                </Link>
              ))}
            </div>
          </div>

          {/* KOLOM 3: INFO & KONTAK + ALAMAT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              fontWeight: '800',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0'
            }}>
              INFO & KONTAK
            </h4>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {contactLinks.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.link}
                  target="_blank"
                  rel="noreferrer"
                  title={contact.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontSize: '18px',
                    color: 'var(--color-text-light)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-orange)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-border-dark)';
                    e.currentTarget.style.color = 'var(--color-text-light)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {contact.icon}
                </a>
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
              margin: '0',
              marginTop: '4px',
              wordWrap: 'break-word'
            }}>
              Fakultas Ilmu Sosial dan Ilmu Budaya<br />
              Universitas Trunojoyo Madura<br />
              Jl. Raya Telang PO BOX 2 Kamal, Bangkalan
            </p>
          </div>

          {/* KOLOM 4: IKUTI KAMI (SOSMED BADGES) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              fontWeight: '800',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0'
            }}>
              IKUTI KAMI
            </h4>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socialMedias.map((media, idx) => (
                <a
                  key={idx}
                  href={media.link}
                  target="_blank"
                  rel="noreferrer"
                  title={media.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontSize: '18px',
                    color: 'var(--color-text-light)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-orange)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-border-dark)';
                    e.currentTarget.style.color = 'var(--color-text-light)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {media.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BARIS COPYRIGHT BAWAH */}
        <div style={{
          borderTop: '1px solid var(--color-border-dark)',
          paddingTop: '30px',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: '700',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.5px',
          wordWrap: 'break-word'
        }}>
          #SemangatBerkarya © 2026 All Rights Reserved • Departemen Informasi dan Komunikasi • UKM-F RISET FISIB UTM
        </div>

      </div>
    </footer>
  );
}