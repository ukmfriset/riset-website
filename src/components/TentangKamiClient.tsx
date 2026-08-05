"use client";

import { useState, useEffect } from 'react';

// --- ACCENT COLOR CYCLE ---
const ACCENT_CYCLE = [
  { bg: "var(--accent-gray-bg)", border: "var(--accent-gray-border)", text: "var(--accent-gray-text)" },
  { bg: "var(--accent-yellow-bg)", border: "var(--accent-yellow-border)", text: "var(--accent-yellow-text)" },
  { bg: "var(--accent-blue-bg)", border: "var(--accent-blue-border)", text: "var(--accent-blue-text)" },
  { bg: "var(--accent-purple-bg)", border: "var(--accent-purple-border)", text: "var(--accent-purple-text)" },
] as const;

function getAccentColorByProdi(prodi: string) {
  switch ((prodi || "").toLowerCase()) {
    case "sosiologi":
      return { bg: "var(--accent-gray-bg)", border: "var(--accent-gray-border)", text: "var(--accent-gray-text)" };
    case "sastra inggris":
      return { bg: "var(--accent-yellow-bg)", border: "var(--accent-yellow-border)", text: "var(--accent-yellow-text)" };
    case "ilmu komunikasi":
      return { bg: "var(--accent-blue-bg)", border: "var(--accent-blue-border)", text: "var(--accent-blue-text)" };
    case "psikologi":
      return { bg: "var(--accent-purple-bg)", border: "var(--accent-purple-border)", text: "var(--accent-purple-text)" };
    default:
      return { bg: "var(--accent-gray-bg)", border: "var(--accent-gray-border)", text: "var(--accent-gray-text)" };
  }
}

export interface KetuaItem {
  _id?: string;
  tahun: string;
  nama: string;
  prodi: string;
}

// --- DATA KETUA UMUM LAMA (Statis) ---
const STATIC_KETUA_UMUM: KetuaItem[] = [
  { tahun: "2009", nama: "Sitti Zulaihah", prodi: "Sosiologi" },
  { tahun: "2010", nama: "Septyohadi Jayeng Praboewo", prodi: "Sosiologi" },
  { tahun: "2011", nama: "Mar'atus Sa'adah", prodi: "Sosiologi" },
  { tahun: "2012", nama: "Muhammad Sawi", prodi: "Sosiologi" },
  { tahun: "2013", nama: "Nur Indrawati", prodi: "Sosiologi" },
  { tahun: "2014", nama: "Ahmad Fatoni", prodi: "Sosiologi" },
  { tahun: "2015", nama: "Aziz Dwy Khoirul Z", prodi: "Sosiologi" },
  { tahun: "2016", nama: "Aziz Khoiri", prodi: "Sosiologi" },
  { tahun: "2017", nama: "Darmawan Djoko Sampurno", prodi: "Sosiologi" },
  { tahun: "2018", nama: "Binti Mafrukhatul Unaifah", prodi: "Psikologi" },
  { tahun: "2019", nama: "Lisa Herlina Wati", prodi: "Psikologi" },
  { tahun: "2020", nama: "Diloda Shokhibul Anam", prodi: "Psikologi" },
  { tahun: "2021", nama: "Listya Dewi Surya", prodi: "Sosiologi" },
  { tahun: "2022", nama: "Ika Handayani", prodi: "Sosiologi" },
  { tahun: "2023", nama: "Sugiati", prodi: "Sosiologi" },
  { tahun: "2024", nama: "Samsul Muarif", prodi: "Psikologi" },
  { tahun: "2025", nama: "Ahmad Hisyam Mubarok", prodi: "Sosiologi" },
  { tahun: "2026", nama: "Onky Yulyandi Varel", prodi: "Psikologi" },
];

export default function TentangKamiClient({ sanityKetua = [] }: { sanityKetua?: KetuaItem[] }) {
  const [hoverVisi, setHoverVisi] = useState(false);
  const [hoverMisi, setHoverMisi] = useState(false);

  // ✅ Menggabungkan data statis dengan data dari Sanity, lalu diurutkan berdasarkan tahun
  const ketuaUmum = [...STATIC_KETUA_UMUM, ...sanityKetua].sort((a, b) => Number(a.tahun) - Number(b.tahun));

  // --- RESPONSIVE ITEMS PER PAGE ---
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6); 
      } else {
        setItemsPerPage(12); 
      }
      setCurrentPage(0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(ketuaUmum.length / itemsPerPage);

  const currentItems = ketuaUmum.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const goPrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAFAFA', paddingBottom: '120px' }}>

      {/* --- HEADER TENTANG KAMI --- */}
      <section style={{ 
        background: 'linear-gradient(to bottom, var(--accent-blue-bg) 0%, #FAFAFA 100%)', 
        padding: '160px 20px 80px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '0', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--accent-blue-bg)', opacity: 0.8, filter: 'blur(80px)', zIndex: 0 }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: '#ffffff', color: 'var(--accent-blue-text)', padding: '6px 16px', borderRadius: '50px', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', border: '1px solid var(--accent-blue-border)' }}>
            TENTANG KAMI
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', color: 'var(--color-dark-slate)', margin: 0, lineHeight: 1.1 }}>
            Kenali <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--accent-blue-text)' }}>Lebih Dekat.</span>
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative', zIndex: 2 }}>

        {/* --- SECTION: SEJARAH --- */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>
              Sejarah <span style={{ color: 'var(--color-brand-orange)' }}>Singkat</span>
            </h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-brand-orange)', marginTop: '16px', borderRadius: '2px' }} />
          </div>
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text-muted)', textAlign: 'justify' }}>
            <p>Fakultas Ilmu Sosial dan Ilmu Budaya (FISIB) resmi berdiri pada 12 Juni 2008, membawa tiga program studi andalan: Sosiologi, Sastra Inggris, dan Ilmu Komunikasi. Setahun kemudian, keluarga besar FISIB makin lengkap dengan hadirnya Program Studi Psikologi.</p>
            <p>Di tengah perkembangan itu, FISIB menginisiasi pembentukan empat Unit Kegiatan Mahasiswa (UKM) dalam kurun waktu satu setengah tahun kepemimpinan. Salah satu yang paling strategis adalah UKM-F RISET, yang resmi diresmikan pada 25 Februari 2009.</p>
            <p>UKM-F RISET hadir sebagai platform kreatif buat mahasiswa FISIB yang punya minat di dunia penelitian dan penalaran — ruang buat ngasah rasa ingin tahu jadi karya nyata.</p>
          </div>
        </section>

        {/* --- SECTION: ARTI LOGO --- */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px', backgroundColor: '#ffffff', borderRadius: '32px', padding: '40px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/Logo-UKMFRiset.png" alt="Logo UKM-F RISET" style={{ width: '100%', maxWidth: '240px', height: 'auto' }} />
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>
              Filosofi <span style={{ color: 'var(--color-brand-orange)' }}>Logo</span>
            </h2>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--color-dark-slate)', marginBottom: '12px' }}>Filosofi Bentuk</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '15px' }}>
                <li><b>Dua Garis Panah:</b> Interaksi dinamis penelitian kualitatif & kuantitatif.</li>
                <li><b>Tiga Garis Putus-Putus:</b> Implementasi Tri Dharma Perguruan Tinggi.</li>
                <li><b>Bola Dunia:</b> Ambisi jangkauan global.</li>
                <li><b>Bolpoin & Coretan:</b> Semangat kreativitas dan produktivitas.</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--color-dark-slate)', marginBottom: '12px' }}>Filosofi Warna</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '15px' }}>
                <li><b style={{ color: 'var(--color-brand-orange)' }}>Orange:</b> Energi, semangat, dan inovasi.</li>
                <li><b>Hitam:</b> Kekuatan, ketelitian, dan keteguhan.</li>
                <li><b>Putih:</b> Kebenaran, objektivitas, dan integritas.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- SECTION: VISI & MISI --- */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div onMouseEnter={() => setHoverVisi(true)} onMouseLeave={() => setHoverVisi(false)} style={{ backgroundColor: '#ffffff', border: hoverVisi ? '1px solid var(--accent-blue-border)' : '1px solid #E2E8F0', borderRadius: '32px', padding: '8px', boxShadow: hoverVisi ? '0 16px 32px rgba(15, 23, 42, 0.08)' : 'none', transform: hoverVisi ? 'translateY(-6px)' : 'translateY(0px)', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'linear-gradient(to bottom, var(--accent-blue-bg) 0%, #ffffff 100%)', height: '160px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>👁️</div>
            <div style={{ padding: '24px 16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--color-dark-slate)', marginBottom: '16px' }}>Visi</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: 'var(--color-text-muted)' }}>Sebagai wadah organisasi kemahasiswaan guna menampung aspirasi dan kreativitas mahasiswa dalam bidang penelitian, pengembangan, dan karya tulis.</p>
            </div>
          </div>
          <div onMouseEnter={() => setHoverMisi(true)} onMouseLeave={() => setHoverMisi(false)} style={{ backgroundColor: '#ffffff', border: hoverMisi ? '1px solid var(--accent-orange-border)' : '1px solid #E2E8F0', borderRadius: '32px', padding: '8px', boxShadow: hoverMisi ? '0 16px 32px rgba(15, 23, 42, 0.08)' : 'none', transform: hoverMisi ? 'translateY(-6px)' : 'translateY(0px)', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'linear-gradient(to bottom, var(--accent-orange-bg) 0%, #ffffff 100%)', height: '160px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>🎯</div>
            <div style={{ padding: '24px 16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--color-dark-slate)', marginBottom: '16px' }}>Misi</h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)' }}>
                <li>Mewadahi aspirasi & bakat riset.</li>
                <li>Menyumbangkan karya untuk kampus & bangsa.</li>
                <li>Memperjuangkan kesejahteraan anggota.</li>
                <li>Meningkatkan kualitas anggota yang berintelektual.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- SECTION: KETUA UMUM (Responsive Carousel) --- */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, color: 'var(--color-dark-slate)' }}>Ketua Umum</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-brand-orange)', margin: '16px auto 0', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              aria-label="Sebelumnya"
              style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid #E2E8F0',
                backgroundColor: '#ffffff',
                color: currentPage === 0 ? '#CBD5E1' : 'var(--color-brand-orange)',
                fontSize: '20px',
                fontWeight: 800,
                cursor: currentPage === 0 ? 'default' : 'pointer',
                display: totalPages > 1 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              ‹
            </button>

            <div style={{ 
              flex: 1, 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '16px' 
            }}>
              {currentItems.map((ketua, index) => {
                const globalIndex = currentPage * itemsPerPage + index;
                const accent = getAccentColorByProdi(ketua.prodi);
                return (
                  <div key={ketua._id || globalIndex} style={{ backgroundColor: '#ffffff', border: `1px solid ${accent.border}`, borderRadius: '24px', padding: '6px', transition: 'all 0.3s ease' }}>
                    <div style={{ background: `linear-gradient(to bottom, ${accent.bg} 0%, #ffffff 100%)`, height: '100px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>👔</div>
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>{ketua.nama}</h4>
                      {ketua.prodi && (
                        <span style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{ketua.prodi}</span>
                      )}
                      <span style={{ display: 'block', fontSize: '13px', color: accent.text, fontWeight: 700, marginTop: '4px' }}>Periode {ketua.tahun}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              aria-label="Selanjutnya"
              style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid #E2E8F0',
                backgroundColor: '#ffffff',
                color: currentPage === totalPages - 1 ? '#CBD5E1' : 'var(--color-brand-orange)',
                fontSize: '20px',
                fontWeight: 800,
                cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
                display: totalPages > 1 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              ›
            </button>
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Halaman ${i + 1}`}
                  style={{
                    width: currentPage === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: currentPage === i ? 'var(--color-brand-orange)' : '#E2E8F0',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}