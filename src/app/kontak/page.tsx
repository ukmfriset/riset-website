"use client";

import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaInstagram, 
  FaLocationDot, // Ganti dari FaMapMarkerAlt ke FaLocationDot (ada di fa6)
  FaXTwitter, 
  FaTiktok, 
  FaYoutube, 
  FaFacebookF, 
  FaLinkedinIn 
} from "react-icons/fa6"; // Semua import dari fa6

export default function KontakPage() {
  const contactInfo = [
    { title: "WhatsApp", value: "0851-6115-3723", icon: <FaWhatsapp />, link: "https://wa.me/6285161153723" },
    { title: "Email", value: "halo@ukmfriset.or.id", icon: <FaEnvelope />, link: "mailto:halo@ukmfriset.or.id" },
    { title: "Instagram", value: "@ukmfriset", icon: <FaInstagram />, link: "https://www.instagram.com/ukmfriset" },
    { title: "X (Twitter)", value: "@ukmfriset", icon: <FaXTwitter />, link: "https://www.x.com/ukmfriset" },
    { title: "TikTok", value: "@ukmfriset", icon: <FaTiktok />, link: "https://www.tiktok.com/@ukmfriset" },
    { title: "YouTube", value: "@ukmfriset", icon: <FaYoutube />, link: "https://www.youtube.com/@ukmfriset" },
    { title: "Facebook", value: "UKM-F RISET", icon: <FaFacebookF />, link: "https://www.facebook.com/ukmfriset" },
    { title: "LinkedIn", value: "UKM-F RISET", icon: <FaLinkedinIn />, link: "https://www.linkedin.com/company/ukmfriset" },
    { title: "Alamat", value: "FISIB - Univ. Trunojoyo Madura", icon: <FaLocationDot />, link: "#" },
  ];

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAFAFA', paddingBottom: '120px' }}>
      
      {/* HEADER KONTAK */}
      <section style={{ 
        background: 'linear-gradient(to bottom, var(--accent-purple-bg) 0%, #FAFAFA 100%)', 
        padding: '160px 20px 80px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', background: '#ffffff', color: 'var(--accent-purple-text)', padding: '6px 16px', borderRadius: '50px', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', border: '1px solid var(--accent-purple-border)' }}>
            HUBUNGI KAMI
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', color: 'var(--color-dark-slate)', margin: 0, lineHeight: 1.1 }}>
            Mari <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--accent-purple-text)' }}>Berbincang.</span>
          </h1>
        </div>
      </section>

      {/* GRID KONTAK */}
      <div style={{ maxWidth: '1000px', margin: '-40px auto 0', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', position: 'relative', zIndex: 10 }}>
        {contactInfo.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noreferrer" style={{ 
            textDecoration: 'none', 
            backgroundColor: '#ffffff', 
            padding: '32px', 
            borderRadius: '32px', 
            border: '1px solid #E2E8F0',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.05)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(15, 23, 42, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(15, 23, 42, 0.05)';
          }}>
            <div style={{ fontSize: '28px', color: 'var(--accent-purple-text)' }}>{item.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>{item.title}</h3>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-muted)' }}>{item.value}</span>
          </a>
        ))}
      </div>
    </main>
  );
}