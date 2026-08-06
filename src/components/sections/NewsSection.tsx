"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
// ✅ Import helper warna otomatis
import { getAccentColor, getAccentColorByString } from "@/lib/accent-cycle";
// ✅ Import fungsi formatter tanggal dari lib yang baru dibuat
import { formatIndonesianDate } from "@/lib/date-formatter";

// ✅ Definisikan tipe data agar sesuai dengan Sanity
export interface NewsItem {
  id?: string;
  slug?: string;
  title: string;
  date: string; // Format dari Sanity sekarang berupa string tanggal standar (YYYY-MM-DD)
  author: string;
  role: string;
  category: string;
  image?: string;
  excerpt: string;
  link: string;
}

export default function NewsSection({ newsList }: { newsList: NewsItem[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mengurutkan berdasarkan waktu secara akurat (terbaru di atas) dan mengambil 4 berita
  const displayedNews = [...newsList]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

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

  return (
    <section
      ref={sectionRef}
      className="grad-news"
      style={{ width: '100%', padding: '120px 20px', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>

        {/* Section Header */}
        <div style={{ marginBottom: '20px', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '40px' }}>
          <span
            style={{
              display: 'inline-block',
              width: 'fit-content',
              background: 'var(--accent-orange-bg)',
              color: 'var(--accent-orange-text)',
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
            Berita Acara →
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
                ...getAnimatedStyle('0.15s')
              }}
            >
              Cerita di Balik <br />
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brand-orange)' }}>#SemangatBerkarya</span>
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
                 Setiap kegiatan adalah bagian dari perjalanan belajar anggota UKM-F RISET.
               </p>
               <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                 Dari pelatihan, seminar, penelitian, sampai kompetisi — semuanya jadi ruang untuk kita bertumbuh bareng.
               </p>

               <Link href="/berita" style={{
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
                 Lihat Semua Berita →
               </Link>
            </div>
          </div>
        </div>

        {/* Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {displayedNews.map((news, index) => {
            const accent = getAccentColor(index, 0); 
            const categoryAccent = getAccentColorByString(news.category); 
            const isHovered = hoverIndex === index;
            const cardDelay = `${0.4 + index * 0.1}s`;
            const animatedStyle = getAnimatedStyle(cardDelay);

            return (
              <Link
                href={news.link}
                key={news.id || news.slug || index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  padding: '8px',
                  borderRadius: '32px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 0px 0px rgba(15, 23, 42, 0)',
                  opacity: animatedStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
                  transition: isHovered
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                    : animatedStyle.transition,
                }}
              >
                <div style={{
                  height: '180px',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  background: news.image
                    ? '#F1F5F9'
                    : `linear-gradient(to bottom, color-mix(in srgb, ${accent.bg} 55%, white) 0%, #ffffff 100%)`,
                }}>
                  {news.image ? (
                    <>
                      <img
                        src={news.image}
                        alt={news.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, color-mix(in srgb, ${accent.text} 55%, transparent) 0%, transparent 65%)`,
                      }} />
                    </>
                  ) : (
                    <span style={{ fontSize: '48px', opacity: 0.5, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>📰</span>
                  )}

                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    right: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1,
                  }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 800, color: categoryAccent.text, backgroundColor: '#ffffff', padding: '4px 12px', borderRadius: '50px' }}>
                      {news.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: '50px' }}>
                      {formatIndonesianDate(news.date)}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '24px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0, lineHeight: '1.4', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {news.title}
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

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 500, lineHeight: '1.7', color: 'var(--color-text-muted)', margin: '0 0 16px', display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {news.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 700, color: 'var(--color-dark-slate)' }}>
                      {news.author || "Tim Infokom"}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                      {news.role || "Media & Publikasi"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}