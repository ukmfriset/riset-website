"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const values = [
    { icon: '✨', title: 'ADAPTIF', desc: 'Terus belajar mengikuti perubahan, biar setiap karya tetap relevan dengan perkembangan zaman.', bg: '#CBD5E1', arrowText: '#334155' },
    { icon: '🤝', title: 'DEDIKATIF', desc: 'Menyelesaikan setiap proses dengan komitmen, tanggung jawab, dan semangat kolaborasi.', bg: '#FACC15', arrowText: '#854D0E' },
    { icon: '🌐', title: 'INKLUSIF', desc: 'Mendengarkan berbagai sudut pandang, karena karya terbaik lahir dari keberagaman gagasan.', bg: '#38BDF8', arrowText: '#0369A1' },
    { icon: '💡', title: 'KREATIF', desc: 'Mengubah rasa ingin tahu menjadi solusi, lalu mewujudkannya lewat karya yang bermanfaat.', bg: '#C084FC', arrowText: '#6B21A8' },
  ];

  useEffect(() => {
    // Gunakan pengecekan browser untuk memastikan window aman di SSR Next.js
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Putus observer jika sudah terpicu agar performa web tetap enteng
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { 
        rootMargin: "0px 0px -100px 0px", // Memicu animasi 100px sebelum elemen benar-benar mentok layar bawah
        threshold: 0.05 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Base style untuk element sebelum di-scroll (transparan & agak ke bawah)
  const getAnimatedStyle = (delay: string) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  return (
    <section 
      ref={sectionRef} 
      className="grad-about" 
      style={{ width: '100%', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header Section (Tentang Kami) */}
        <div style={{ marginBottom: '60px' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              background: '#DCFCE7', 
              color: '#166534', 
              padding: '6px 16px', 
              borderRadius: '50px', 
              fontSize: '12px', 
              fontWeight: 800, 
              marginBottom: '20px',
              ...getAnimatedStyle('0s') // Muncul instan saat terpicu
            }}
          >
            Tentang Kami →
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
                ...getAnimatedStyle('0.15s') // Delay tipis setelah badge
              }}
            >
              Mengapa Harus <br/>
              <span style={{ color: 'var(--color-brand-orange)' }}>#SemangatBerkarya</span>?
            </h2>
            
            <div 
              style={{ 
                flex: '1 1 400px',
                ...getAnimatedStyle('0.3s') // Delay setelah judul
              }}
            >
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 16px 0' }}>
                Berkarya itu bukan soal siapa yang paling jago. Ini soal siapa yang mau terus belajar.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 16px 0' }}>
                Di UKM-F RISET, kami percaya setiap mahasiswa punya potensi untuk berkembang — asal dikasih ruang untuk berdiskusi, coba-coba, riset, menulis, dan berkolaborasi.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 24px 0' }}>
                Lewat budaya #SemangatBerkarya, kami bangun komunitas yang saling dukung, biar karya yang lahir makin relevan, bermanfaat, dan berdampak.
              </p>
              
              {/* Button Tambahan Menuju Halaman Tentang Kami */}
              <Link href="/tentang" style={{
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
                Kenali Kami Lebih Dekat →
              </Link>
            </div>
          </div>
        </div>

        {/* Section Nilai Organisasi */}
        <div 
          style={{ 
            marginBottom: '40px', 
            textAlign: 'center', 
            ...getAnimatedStyle('0.4s') 
          }}
        >
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-dark-slate)', marginBottom: '12px' }}>
            SemangatBerkarya Tumbuh dari Nilai-Nilai Ini.
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            Adaptif, Dedikatif, Inklusif, Kreatif — kalau disingkat, jadinya ADIK. Karena di UKM-F RISET, kita emang saling jagain kayak keluarga.
          </p>
        </div>

        {/* Grid Cards dengan Border Berlapis + Hover Effect */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {values.map((item, index) => {
            const isHovered = hoveredIndex === index;
            // Membuat staggered delay untuk tiap card: 0.5s, 0.6s, 0.7s, 0.8s
            const currentCardDelay = `${0.5 + index * 0.1}s`;
            const animatedStyle = getAnimatedStyle(currentCardDelay);

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  padding: '8px',
                  borderRadius: '32px',
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 0px 0px rgba(15, 23, 42, 0)',
                  // Gabungkan state animasi scroll dan state hover secara manual agar tidak bentrok
                  opacity: animatedStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
                  transition: isHovered 
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' 
                    : animatedStyle.transition,
                }}
              >
                {/* Area Gradasi di dalam */}
                <div style={{
                  background: `linear-gradient(to bottom, ${item.bg}40 0%, #ffffff 100%)`,
                  height: '180px',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  {item.icon}
                </div>

                <div style={{ padding: '24px 16px 16px' }}>
                  {/* Judul + tombol panah bulat */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>
                      {item.title}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}