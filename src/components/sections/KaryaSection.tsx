"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function KaryaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Warna disamakan dengan AboutSection agar gradasinya identik
  const karyaData = [
    {
      emoji: "📰",
      tipe: "Artikel",
      desc: "Tulisan yang membahas berbagai isu sosial dan akademik.",
      link: "/karya/artikel",
      bg: "#38BDF8",     // Biru sinkron
      arrowText: "#0369A1"
    },
    {
      emoji: "📖",
      tipe: "Cerpen",
      desc: "Cerita yang lahir dari ide, pengalaman mahasiswa.",
      link: "/karya/cerpen",
      bg: "#FACC15",     // Kuning sinkron
      arrowText: "#854D0E"
    },
    {
      emoji: "📝",
      tipe: "Essay",
      desc: "Tulisan kritis yang menyampaikan gagasan perspektif baru.",
      link: "/karya/essay",
      bg: "#C084FC",     // Ungu sinkron
      arrowText: "#6B21A8"
    },
    {
      emoji: "✒️",
      tipe: "Puisi",
      desc: "Ruang untuk mengekspresikan ide melalui kata-kata.",
      link: "/karya/puisi",
      bg: "#94A3B8",     // Abu sinkron
      arrowText: "#334155"
    }
  ];

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

  // Base style untuk transisinya
  const getAnimatedStyle = (delay: string) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  return (
    <section 
      ref={sectionRef}
      className="grad-karya" 
      style={{ width: '100%', padding: '120px 24px', position: 'relative', fontFamily: 'var(--font-ui)', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '60px' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              background: '#FFEDD5', 
              color: '#9A3412', 
              padding: '6px 16px', 
              borderRadius: '50px', 
              fontSize: '12px', 
              fontWeight: 800, 
              marginBottom: '20px',
              ...getAnimatedStyle('0s')
            }}
          >
            HASIL KARYA →
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
            
            <h2 
              style={{ 
                fontSize: 'clamp(32px, 4vw, 48px)', 
                fontWeight: 800, 
                color: 'var(--color-dark-slate)', 
                lineHeight: 1.1, 
                margin: 0, 
                flex: '1 1 500px',
                ...getAnimatedStyle('0.15s')
              }}
            >
              Dari Rasa Penasaran <br />
              <span style={{ color: 'var(--color-brand-orange)' }}>Jadi Karya</span>
            </h2>
            
            <div 
              style={{ 
                flex: '1 1 400px',
                ...getAnimatedStyle('0.3s')
              }}
            >
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 16px 0' }}>
                Setiap artikel, esai, penelitian, cerpen, sampai puisi adalah perjalanan panjang dari rasa penasaran menuju sebuah karya.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 24px 0' }}>
                Buat kami, karya bukan cuma untuk dibaca. Karya juga bisa membuka diskusi, menghadirkan perspektif baru, dan menginspirasi perubahan.
              </p>

              {/* Button Tambahan Menuju Halaman Semua Karya */}
              <Link href="/karya" style={{
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
                Lihat Semua Karya →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {karyaData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            // Delay bertahap untuk 4 kartu: 0.4s, 0.5s, 0.6s, 0.7s
            const cardDelay = `${0.4 + index * 0.1}s`;
            const animatedStyle = getAnimatedStyle(cardDelay);

            return (
              <Link
                href={item.link}
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  padding: '8px',
                  borderRadius: '32px',
                  textDecoration: 'none',
                  display: 'block',
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 0px 0px rgba(15, 23, 42, 0)',
                  // Integrasi transisi scroll dan transisi hover secara aman
                  opacity: animatedStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
                  transition: isHovered
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                    : animatedStyle.transition,
                }}
              >
                {/* Panel gradasi + emoji */}
                <div style={{
                  background: `linear-gradient(to bottom, ${item.bg}40 0%, #ffffff 100%)`,
                  height: '180px',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  {item.emoji}
                </div>

                <div style={{ padding: '24px 16px 20px' }}>
                  {/* Judul + tombol panah bulat */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>
                      {item.tipe}
                    </h3>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? `${item.bg}30` : '#F1F5F9',
                      color: isHovered ? item.arrowText : '#94A3B8',
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

                  <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}