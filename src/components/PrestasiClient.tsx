"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAccentColor } from "@/lib/accent-cycle";

export interface PrestasiItem {
  _id?: string;
  badge: string;
  title: string;
  name: string;
  info: string;
  category: string; // "Nasional", "Regional", atau "Internasional"
}

// ✅ Data statis lama tetap dipertahankan
const STATIC_ACHIEVEMENTS: PrestasiItem[] = [
  { badge: "🌍 Internasional", title: "Google Student Ambassador 2026", name: "Lia Nur Khasanah", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🏅 Nasional", title: "Juara Harapan 1 Festival KOMPAS 2025", name: "Lia Nur Khasanah", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🥉 Nasional", title: "Bronze Medal at NESCO 2 Malang 2026", name: "Isni Hosiyah Robbi", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🥉 Nasional", title: "Bronze Medal at IGNITE FUTURE FEST National Essay 2026", name: "Sofiatun Kholifah", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🎓 Kampus", title: "Juara 2 Mawapres Kategori Pratama FISIB", name: "Lucky Tri Kusuma", info: "UKM-F Riset FISIB UTM", category: "Regional" },
  { badge: "🎓 Kampus", title: "Juara 3 Mawapres Kategori Utama FISIB", name: "Rangga Prashagi", info: "UKM-F Riset FISIB UTM", category: "Regional" },
  { badge: "🎓 Kampus", title: "Juara Harapan 1 Mawapres Kategori Utama FISIB", name: "Muhammad", info: "UKM-F Riset FISIB UTM", category: "Regional" },
  { badge: "🌍 Internasional", title: "Juara 1 Lomba Poster Tingkat Internasional (Gold Medal) - Olimpiade Bimbingan dan Konseling XII 2026", name: "Fitri Sugi Ayuni", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🌍 Internasional", title: "Juara 2 Lomba Essai Tingkat Internasional (Silver Medal) - Olimpiade Bimbingan dan Konseling XII 2026", name: "Fitri Sugi Ayuni", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🎓 Kampus", title: "Best Personality - Duta Kampus Putra Potre UTM 2026", name: "Thoyyibatul Insani", info: "UKM-F Riset FISIB UTM", category: "Regional" },
  { badge: "🏆 Nasional", title: "1st Kejuaraan Nasional Cheerleading Team Premier All Star Jawa Timur", name: "Ibra Kusuma Dandi", info: "UKM-F Riset FISIB UTM", category: "Nasional" },
  { badge: "🏆 Nasional", title: "Lolos Pendanaan Simbelmawa 2026", name: "Margaretha Diah A.T & Rangga Prashagi", info: "UKM-F Riset FISIB UTM", category: "Nasional" }
];

export default function PrestasiClient({ initialPrestasi }: { initialPrestasi: PrestasiItem[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // ✅ Menggabungkan data Sanity dengan data statis lama
  const allAchievements = [...initialPrestasi, ...STATIC_ACHIEVEMENTS];

  // Fungsi untuk mengganti filter dan me-reset halaman ke 1
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  // Logika Filter
  const filteredAchievements = allAchievements.filter(item => 
    activeFilter === "Semua" ? true : item.category === activeFilter
  );

  // Logika Pagination
  const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage);
  const currentItems = filteredAchievements.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAFAFA', paddingBottom: '120px' }}>
      
      {/* HEADER HERO SECTION */}
      <section style={{ 
        background: 'linear-gradient(to bottom, var(--accent-yellow-bg) 0%, #FAFAFA 100%)', 
        padding: '160px 20px 80px', 
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Dekorasi Blob */}
        <div style={{ position: 'absolute', top: '0', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--accent-yellow-bg)', opacity: 0.8, filter: 'blur(80px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--accent-orange-bg)', opacity: 0.5, filter: 'blur(70px)', zIndex: 0 }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: '#ffffff', color: '#854D0E', padding: '6px 16px', borderRadius: '50px', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', border: '1px solid #FDE047' }}>
            MUSEUM PRESTASI
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '800', color: 'var(--color-dark-slate)', margin: 0, lineHeight: 1.1 }}>
            Hall of <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#EAB308' }}>Fame.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '600px', marginTop: '8px' }}>
            Rekam jejak perjuangan, dedikasi, dan karya gemilang dari para pembawa #SemangatBerkarya di kancah regional maupun nasional.
          </p>
        </div>
      </section>

      {/* KONTEN PRESTASI */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {["Semua", "Nasional", "Regional"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: activeFilter === filter ? 'none' : '1px solid #E2E8F0',
                backgroundColor: activeFilter === filter ? 'var(--color-dark-slate)' : '#ffffff',
                color: activeFilter === filter ? '#ffffff' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeFilter === filter ? '0 8px 15px -5px rgba(15, 23, 42, 0.3)' : 'none'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Prestasi */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {currentItems.map((item, index) => {
            const globalIndex = index + ((currentPage - 1) * itemsPerPage);
            const accent = getAccentColor(globalIndex, 2);
            const isHovered = hoverIndex === index;

            return (
              <div
                key={item._id || index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  padding: '8px',
                  borderRadius: '32px',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0px)',
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 4px 6px -1px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  display: 'flex',          // 👈 Kartu diatur flex vertikal
                  flexDirection: 'column',  // 👈 Menyusun elemen ke bawah
                  height: '100%',           // 👈 Memenuhi tinggi grid sepenuhnya
                }}
              >
                {/* Panel gradasi */}
                <div style={{
                  background: `linear-gradient(to bottom, color-mix(in srgb, ${accent.bg} 55%, white) 0%, #ffffff 100%)`,
                  height: '150px',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-dark-slate)',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: 800,
                    zIndex: 1,
                  }}>
                    {item.badge}
                  </span>

                  {/* Watermark trofi */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '-20px',
                    fontSize: '120px',
                    zIndex: 0,
                    opacity: isHovered ? 0.3 : 0.15,
                    transform: isHovered ? 'scale(1.25) rotate(10deg)' : 'scale(1) rotate(0deg)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}>
                    🏆
                  </div>
                </div>

                {/* Konten bawah */}
                <div style={{ 
                  padding: '24px 16px 16px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  flex: 1,                    // 👈 Mengisi sisa ruang secara fleksibel
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0, lineHeight: '1.4' }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Bagian nama bawah yang diratakan sejajar dengan margin-top: auto */}
                  <div style={{ 
                    borderTop: '1px solid #F1F5F9', 
                    paddingTop: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '4px',
                    marginTop: 'auto'          // 👈 Kunci utama agar posisi nama selalu sejajar di dasar kartu
                  }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 800, color: accent.text }}>{item.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 500, color: 'var(--color-text-muted)' }}>{item.info}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notifikasi jika kosong */}
        {filteredAchievements.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
            Belum ada data prestasi untuk kategori ini.
          </div>
        )}

        {/* Tombol Pagination */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '20px', 
            marginTop: '60px' 
          }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid #E2E8F0',
                backgroundColor: currentPage === 1 ? '#F8FAFC' : '#ffffff',
                color: currentPage === 1 ? '#CBD5E1' : 'var(--color-dark-slate)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: currentPage === 1 ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.05)',
                fontSize: '18px',
                padding: 0
              }}
              aria-label="Halaman Sebelumnya"
            >
              ←
            </button>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    aria-label={`Ke halaman ${pageNum}`}
                    style={{
                      width: isActive ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? 'var(--color-dark-slate)' : '#E2E8F0',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                  />
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid #E2E8F0',
                backgroundColor: currentPage === totalPages ? '#F8FAFC' : '#ffffff',
                color: currentPage === totalPages ? '#CBD5E1' : 'var(--color-dark-slate)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: currentPage === totalPages ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.05)',
                fontSize: '18px',
                padding: 0
              }}
              aria-label="Halaman Selanjutnya"
            >
              →
            </button>
          </div>
        )}

      </section>
    </main>
  );
}