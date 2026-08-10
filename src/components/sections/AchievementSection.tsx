"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getAccentColor } from "@/lib/accent-cycle";

// ✅ Definisikan tipe data Prestasi dari Sanity (dan statis)
export interface PrestasiItem {
  _id?: string; // Opsional karena data statis tidak punya _id
  badge: string;
  title: string;
  name: string;
  info: string;
}

// ✅ Data statis lama dikembalikan ke sini
const STATIC_ACHIEVEMENTS: PrestasiItem[] = [
  { badge: "🌍 Internasional", title: "Google Student Ambassador 2026", name: "Lia Nur Khasanah", info: "UKM-F Riset FISIB UTM" },
  { badge: "🏅 Nasional", title: "Juara Harapan 1 Festival KOMPAS 2025", name: "Lia Nur Khasanah", info: "UKM-F Riset FISIB UTM" },
  { badge: "🥉 Nasional", title: "Bronze Medal at NESCO 2 Malang 2026", name: "Isni Hosiyah Robbi", info: "UKM-F Riset FISIB UTM" },
  { badge: "🥉 Nasional", title: "Bronze Medal at IGNITE FUTURE FEST National Essay 2026", name: "Sofiatun Kholifah", info: "UKM-F Riset FISIB UTM" },
  { badge: "🎓 Kampus", title: "Juara 2 Mawapres Kategori Pratama FISIB", name: "Lucky Tri Kusuma", info: "UKM-F Riset FISIB UTM" },
  { badge: "🎓 Kampus", title: "Juara 3 Mawapres Kategori Utama FISIB", name: "Rangga Prashagi", info: "UKM-F Riset FISIB UTM" },
  { badge: "🎓 Kampus", title: "Juara Harapan 1 Mawapres Kategori Utama FISIB", name: "Muhammad", info: "UKM-F Riset FISIB UTM" },
  { badge: "🌍 Internasional", title: "Juara 1 Lomba Poster Tingkat Internasional (Gold Medal) - Olimpiade Bimbingan dan Konseling XII 2026", name: "Fitri Sugi Ayuni", info: "UKM-F Riset FISIB UTM" },
  { badge: "🌍 Internasional", title: "Juara 2 Lomba Essai Tingkat Internasional (Silver Medal) - Olimpiade Bimbingan dan Konseling XII 2026", name: "Fitri Sugi Ayuni", info: "UKM-F Riset FISIB UTM" },
  { badge: "🎓 Kampus", title: "Best Personality - Duta Kampus Putra Potre UTM 2026", name: "Thoyyibatul Insani", info: "UKM-F Riset FISIB UTM" },
  { badge: "🏆 Nasional", title: "1st Kejuaraan Nasional Cheerleading Team Premier All Star Jawa Timur", name: "Ibra Kusuma Dandi", info: "UKM-F Riset FISIB UTM" },
  { badge: "🏆 Nasional", title: "Lolos Pendanaan Simbelmawa 2026", name: "Margaretha Diah A.T & Rangga Prashagi", info: "UKM-F Riset FISIB UTM" }
];

export default function AchievementSection({ prestasiList = [] }: { prestasiList?: PrestasiItem[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Menggabungkan data Sanity (baru) dengan data statis (lama), lalu ambil 8 teratas saja
  const allAchievements = [...prestasiList, ...STATIC_ACHIEVEMENTS];
  const displayedAchievements = allAchievements.slice(0, 8);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { 
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.05 
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const getAnimatedStyle = (delay: string) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  if (allAchievements.length === 0) return null;

  return (
    <section 
      ref={sectionRef}
      className="grad-achievement" 
      style={{ width: '100%', padding: '120px 20px', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>

        {/* Section Header */}
        <div style={{ marginBottom: '20px', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '40px' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              width: 'fit-content', 
              background: '#DCFCE7', 
              color: '#166534', 
              padding: '6px 16px', 
              borderRadius: '50px', 
              fontFamily: 'var(--font-heading)', 
              fontSize: '12px', 
              fontWeight: '800', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              marginBottom: '20px',
              ...getAnimatedStyle('0s')
            }}
          >
            Bukti Nyata →
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>

            <h2 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(28px, 4vw, 42px)', 
                fontWeight: '800', 
                color: 'var(--color-dark-slate)', 
                margin: '0', 
                letterSpacing: '-0.5px', 
                flex: '1 1 400px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                ...getAnimatedStyle('0.15s')
              }}
            >
              Setiap Prestasi Punya <br />
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brand-orange)' }}>Cerita di Baliknya</span>
            </h2>
            <div 
              style={{ 
                flex: '1 1 500px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                ...getAnimatedStyle('0.3s')
              }}
            >
               <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                 Kompetisi mungkin punya garis finish.
               </p>

               <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                 Tapi semangat untuk terus belajar, berkarya, and memberi manfaat — itu nggak pernah berhenti.
               </p>

               <Link href="/prestasi" style={{
                 marginTop: '12px',
                 width: 'fit-content',
                 display: 'inline-block',
                 backgroundColor: 'var(--color-dark-slate)',
                 color: '#ffffff',
                 padding: '12px 28px',
                 borderRadius: '50px',
                 fontSize: '14px',
                 fontWeight: 700,
                 textDecoration: 'none',
                 transition: 'all 0.3s ease',
                 boxShadow: '0 8px 15px -5px rgba(15, 23, 42, 0.3)'
               }}
               onMouseEnter={(e) => { 
                 e.currentTarget.style.backgroundColor = 'var(--color-brand-orange)'; 
                 e.currentTarget.style.transform = 'translateY(-2px)'; 
               }}
               onMouseLeave={(e) => { 
                 e.currentTarget.style.backgroundColor = 'var(--color-dark-slate)'; 
                 e.currentTarget.style.transform = 'translateY(0)'; 
               }}
               >
                 Lihat Hall of Fame →
               </Link>
            </div>
          </div>
        </div>

        {/* Grid Cards (Fixed 8 Kotak) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {displayedAchievements.map((item, index) => {
            const accent = getAccentColor(index, 2);
            const isHovered = hoverIndex === index;

            const cardDelay = `${0.4 + index * 0.08}s`;
            const animatedStyle = getAnimatedStyle(cardDelay);

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
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 0px 0px rgba(15, 23, 42, 0)',
                  opacity: animatedStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
                  transition: isHovered 
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' 
                    : animatedStyle.transition,
                  display: 'flex',          // 👈 Ditambahkan agar kartu menjadi flex container
                  flexDirection: 'column',  // 👈 Menyusun elemen secara vertikal
                  height: '100%',           // 👈 Memastikan kartu mengisi tinggi grid secara penuh
                }}
              >
                <div style={{
                  background: `linear-gradient(to bottom, color-mix(in srgb, ${accent.bg} 55%, white) 0%, #ffffff 100%)`,
                  height: '150px',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,           // 👈 Mencegah gambar ikut menyusut
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

                {/* Container Konten Bawah */}
                <div style={{ 
                  padding: '24px 16px 16px', 
                  display: 'flex',              // 👈 Flex container untuk isi teks
                  flexDirection: 'column',      // 👈 Susunan vertikal
                  flex: 1,                      // 👈 Mengisi sisa ruang kosong di bawah gambar
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                    <h3 style={{ 
                      fontFamily: 'var(--font-heading)', 
                      fontSize: '16px', 
                      fontWeight: 800, 
                      color: 'var(--color-dark-slate)', 
                      margin: 0, 
                      lineHeight: '1.4',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {item.title}
                    </h3>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? `color-mix(in srgb, ${accent.bg} 25%, white)` : '#F1F5F9',
                      color: isHovered ? accent.text : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      flexShrink: 0,
                      transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
                    }}>
                      ↗
                    </span>
                  </div>

                  {/* Bagian Nama Bawah (Otomatis terdorong ke paling bawah agar sejajar) */}
                  <div style={{ 
                    borderTop: '1px solid #F1F5F9', 
                    paddingTop: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '4px',
                    marginTop: 'auto'           // 👈 Kunci utama agar posisi nama di bawah selalu sejajar rata
                  }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 800, color: accent.text }}>{item.name}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 500, color: 'var(--color-text-muted)' }}>{item.info}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}