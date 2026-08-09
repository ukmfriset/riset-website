"use client";

import { useState, useEffect, useRef } from 'react';
import { getAccentColor } from "@/lib/accent-cycle";

export default function BenefitSection() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const benefits = [
    { emoji: "🌱", title: "Belajar Riset Dari Awal", desc: "Belum pernah membuat karya ilmiah? Tidak masalah. Kamu akan belajar mulai dari dasar." },
    { emoji: "🏆", title: "Peluang Mengembangkan Prestasi", desc: "LKTI, PKM, essay competition — kita ikut semua, dan selalu ada pendamping." },
    { emoji: "🌐", title: "Relasi Yang Berkembang", desc: "Bangun koneksi dengan teman seperjuangan, senior, alumni, dan orang-orang inspiratif." },
    { emoji: "🧡", title: "Lingkungan Untuk Bertumbuh", desc: "Tempat untuk bertanya, mencoba, dan belajar tanpa takut salah." },
    { emoji: "🧭", title: "Pengalaman Organisasi Nyata", desc: "Belajar mengelola program, bekerja dalam tim, dan mengembangkan kepemimpinan." },
    { emoji: "📂", title: "Portofolio Untuk Masa Depan", desc: "Setiap pengalaman, karya, dan kegiatan bisa menjadi bagian dari perjalanan profesional kamu." }
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
        rootMargin: "0px 0px -100px 0px", // Memicu animasi sedikit sebelum section mentok layar bawah
        threshold: 0.05 
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Base style untuk element sebelum di-scroll (transparan & bergeser 40px ke bawah)
  const getAnimatedStyle = (delay: string) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  return (
    <section 
      ref={sectionRef}
      className="grad-benefit" 
      style={{ width: '100%', padding: '120px 24px', position: 'relative', fontFamily: 'var(--font-ui)', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
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
            KENAPA HARUS GABUNG? →
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
            <h2 
              style={{ 
                fontSize: 'clamp(32px, 4vw, 48px)', 
                fontWeight: 800, 
                color: 'var(--color-dark-slate)', 
                lineHeight: 1.1, 
                margin: 0, 
                flex: '1 1 400px',
                ...getAnimatedStyle('0.15s')
              }}
            >
              Lebih dari Sekadar<br />
              <span style={{ color: 'var(--color-brand-orange)' }}>Nambah CV</span>
            </h2>
            <div 
              style={{ 
                flex: '1 1 500px',
                ...getAnimatedStyle('0.3s')
              }}
            >
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 16px 0' }}>
                Bukan cuma nambah satu organisasi lagi di CV kamu. Di sini, kamu bakal nemuin circle yang sama-sama penasaran, saling dorong buat belajar, dan berani nyoba hal baru — termasuk berani gagal.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0' }}>
                Dari yang awalnya bingung mau mulai dari mana, sampai akhirnya berani nulis, riset, dan ngomong di depan banyak orang — semua proses itu kamu lewatin bareng orang-orang yang genuinely peduli sama perkembanganmu.
              </p>
            </div>
          </div>
        </div>

        {/* Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {benefits.map((item, index) => {
            const accent = getAccentColor(index);
            const arrowText = accent.text ?? '#334155';
            const isHovered = hoverIndex === index;
            
            // Efek staggered delay yang dinamis untuk 6 kartu: 0.4s, 0.5s, 0.6s, dst.
            const cardDelay = `${0.4 + index * 0.08}s`;
            const animatedStyle = getAnimatedStyle(cardDelay);

            return (
              <div
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  padding: '8px',
                  borderRadius: '32px',
                  position: 'relative',
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 0px 0px rgba(15, 23, 42, 0)',
                  // Satukan transisi masuk scroll dan transisi hover secara aman
                  opacity: animatedStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
                  transition: isHovered
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                    : animatedStyle.transition,
                }}
              >
                {/* Area Gradasi */}
                <div style={{
                  background: `linear-gradient(to bottom, color-mix(in srgb, ${accent.bg} 55%, white) 0%, #ffffff 100%)`,
                  height: '200px',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.8)'
                }}>
                  {/* Watermark emoji raksasa */}
                  <div style={{
                    fontSize: '160px',
                    position: 'absolute',
                    bottom: '-40px',
                    right: '-30px',
                    zIndex: 0,
                    opacity: isHovered ? 0.35 : 0.18,
                    transform: isHovered
                      ? 'scale(1.25) rotate(12deg)'
                      : 'scale(1) rotate(0deg)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{ fontSize: '48px', position: 'relative', zIndex: 1 }}>{item.emoji}</div>
                </div>

                <div style={{ padding: '24px 16px 16px' }}>
                  {/* Judul + tombol panah bulat */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>
                      {item.title}
                    </h3>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? `color-mix(in srgb, ${accent.bg} 25%, white)` : '#F1F5F9',
                      color: isHovered ? arrowText : '#94A3B8',
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

                  <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--color-text-muted)', margin: 0 }}>
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