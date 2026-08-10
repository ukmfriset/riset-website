"use client";

import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaInstagram, FaDownload, FaPaperPlane } from "react-icons/fa";

export default function MediaPartnerPage() {
  const benefits = [
    "1x Post Instagram Story",
    "1x Post Instagram Feed",
    "1x Post Story FB Page",
    "1x Post FB Page",
    "Share in WhatsApp Group Member"
  ];

  const requirements = [
    "Memasang logo UKMF Riset pada media (Sosial media, Spanduk, Poster, Desain grafis, dsb).",
    "Panitia wajib follow Instagram @ukmfriset (minimal 5 akun).",
    "Setelah konten dipublikasikan, wajib like, share & comment untuk meningkatkan jangkauan."
  ];

  const restrictions = [
    "Kegiatan/acara berbentuk give away.",
    "Promosi/iklan produk tertentu.",
    "Mengandung unsur politik, pornografi, judi, penipuan, dan SARA."
  ];

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAFAFA', paddingBottom: '120px' }}>
      
      {/* HEADER MEDIA PARTNER */}
      <section style={{ 
        background: 'linear-gradient(to bottom, var(--accent-gray-bg) 0%, #FAFAFA 100%)', 
        padding: '160px 20px 80px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', background: '#ffffff', color: 'var(--accent-gray-text)', padding: '6px 16px', borderRadius: '50px', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', border: '1px solid var(--accent-gray-border)' }}>
            MEDIA PARTNER
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', color: 'var(--color-dark-slate)', margin: 0, lineHeight: 1.1 }}>
            Mari <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--accent-gray-text)' }}>Bekerjasama.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
            Kirim dan promosikan kegiatan/acara kamu di UKMF Riset secara mudah, gampang dan tidak dipungut biaya apapun (GRATIS).
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* KEUNTUNGAN & KEWAJIBAN */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--color-dark-slate)' }}>Keuntungan</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {benefits.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  <FaCheckCircle color="var(--accent-gray-border)" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--color-dark-slate)' }}>Kewajiban Mitra</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {requirements.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  <span style={{ marginTop: '4px' }}><FaCheckCircle color="var(--accent-gray-border)" /></span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ATURAN & INFO TAMBAHAN */}
        <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--color-dark-slate)' }}>Ketentuan & Informasi</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-muted)', fontSize: '15px' }}>
            <li>• Jadwal rilis ditentukan oleh pihak UKMF Riset.</li>
            <li>• Tidak diperkenankan revisi konten maupun takarir setelah konten dipublikasikan.</li>
            <li>• Kami tidak memberikan laporan sudah / belum di-posting, penyelenggara bisa cek langsung di sosmed @ukmfriset.</li>
          </ul>

          <div style={{ marginTop: '30px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginBottom: '12px', color: 'var(--color-brand-orange)' }}>
              <FaTimesCircle style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Acara yang tidak diterima:
            </h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)', fontSize: '15px' }}>
              {restrictions.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/ukmfriset" target="_blank" rel="noreferrer" 
             style={{ textDecoration: 'none', backgroundColor: 'var(--color-dark-slate)', color: '#fff', padding: '14px 28px', borderRadius: '50px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaInstagram /> Follow @ukmfriset
          </a>
          <a href="https://drive.google.com/file/d/1tjKslMwcP-xFsuluTmEimuMsMUUXmoHt/view" target="_blank" rel="noreferrer"
             style={{ textDecoration: 'none', backgroundColor: 'var(--accent-gray-text)', color: '#fff', padding: '14px 28px', borderRadius: '50px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaDownload /> Unduh Logo
          </a>
          <Link href="/kontak" 
             style={{ textDecoration: 'none', backgroundColor: 'var(--color-brand-orange)', color: '#fff', padding: '14px 28px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaPaperPlane /> Kirim Proposal
          </Link>
        </div>

      </div>
    </main>
  );
}