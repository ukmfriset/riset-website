"use client";

import { useState, useEffect, useRef } from 'react';

export default function ColorStorySection() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const colorStories = [
    {
      name: "FISIB",
      color: "Orange",
      hex: "#FF6600",
      bgHex: "#FFEDD5",
      desc: "Semangat dan Kebersamaan. Oranye menjadi simbol energi, kolaborasi, dan semangat untuk terus bertumbuh bersama."
    },
    {
      name: "Sosiologi",
      color: "Abu-Abu",
      hex: "#64748B",
      bgHex: "#F1F5F9",
      desc: "Kritis dan Objektif. Abu-abu melambangkan keseimbangan dalam berpikir, ketajaman analisis, dan cara pandang yang rasional."
    },
    {
      name: "Sastra Inggris",
      color: "Kuning",
      hex: "#EAB308",
      bgHex: "#FEF08A",
      desc: "Kreatif dan Inspiratif. Kuning merepresentasikan rasa ingin tahu, optimisme, serta keberanian mengeksplorasi gagasan baru."
    },
    {
      name: "Ilmu Komunikasi",
      color: "Biru",
      hex: "#0EA5E9",
      bgHex: "#BAE6FD",
      desc: "Terbuka dan Terhubung. Biru mencerminkan kepercayaan, komunikasi yang efektif, dan kolaborasi yang harmonis."
    },
    {
      name: "Psikologi",
      color: "Ungu",
      hex: "#A855F7",
      bgHex: "#E9D5FF",
      desc: "Empati dan Kebijaksanaan. Ungu melambangkan kepedulian, refleksi diri, serta pemahaman yang lebih mendalam terhadap sesama."
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

  const getAnimatedStyle = (delay: string) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  return (
    <section 
      ref={sectionRef}
      className="grad-colorstory" 
      style={{ 
        width: '100%', 
        padding: '120px 20px', 
        position: 'relative',
        overflow: 'hidden',
        // BACKGROUND GRADASI DI SINI (di section level, bukan di inner container)
        backgroundColor: '#FFFBF5',
        backgroundImage: `
          radial-gradient(at 0% 0%, #FFEDD5 0px, transparent 50%),
          radial-gradient(at 100% 100%, #E9D5FF 0px, transparent 50%),
          radial-gradient(at 50% 50%, #BAE6FD 0px, transparent 40%)
        `,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header Section */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              background: '#F1F5F9', 
              color: '#475569', 
              padding: '6px 16px', 
              borderRadius: '50px', 
              fontSize: '12px', 
              fontWeight: 800, 
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              ...getAnimatedStyle('0s')
            }}
          >
            Filosofi Identitas
          </span>
          <h2 
            style={{ 
              fontSize: 'clamp(28px, 4vw, 42px)', 
              fontWeight: 800, 
              color: 'var(--color-dark-slate)', 
              lineHeight: 1.2, 
              margin: '0 0 16px 0',
              wordWrap: 'break-word',
              ...getAnimatedStyle('0.15s')
            }}
          >
            Setiap Warna <span style={{ color: 'var(--color-brand-orange)', fontFamily: 'var(--font-display)' }}>Punya Makna</span>
          </h2>
          <p 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.6', 
              color: 'var(--color-text-muted)', 
              maxWidth: '650px', 
              margin: '0 auto',
              wordWrap: 'break-word',
              ...getAnimatedStyle('0.3s')
            }}
          >
            Setiap warna mewakili identitas program studi di FISIB. Bersama, keberagaman itu menjadi kekuatan yang menyatukan #SemangatBerkarya.
          </p>
        </div>

        {/* Grid Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px' 
        }}>
          {colorStories.map((item, index) => {
            const isHovered = hoverIndex === index;
            const cardDelay = `${0.4 + index * 0.1}s`;
            const animatedStyle = getAnimatedStyle(cardDelay);

            return (
              <div
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
                  padding: '32px 24px',
                  borderRadius: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '20px',
                  boxShadow: isHovered
                    ? '0 16px 32px rgba(15, 23, 42, 0.08)'
                    : '0 4px 12px rgba(15, 23, 42, 0.03)',
                  opacity: animatedStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
                  transition: isHovered
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                    : animatedStyle.transition,
                }}
              >
                {/* Visual Warna */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: item.bgHex,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: item.hex,
                    boxShadow: isHovered ? `0 0 20px ${item.hex}80` : 'none',
                    transition: 'all 0.4s ease',
                  }} />
                </div>

                {/* Teks Penjelasan */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0 }}>
                    {item.name}
                  </h3>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: item.hex, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Warna {item.color}
                  </span>
                  <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '8px 0 0', wordWrap: 'break-word' }}>
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