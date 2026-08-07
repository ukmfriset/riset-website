"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

export default function QuoteSection(): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  return (
    <section 
      ref={sectionRef}
      className="grad-quote" 
      style={{ 
        width: '100%', 
        padding: '120px 20px', 
        overflow: 'hidden',
        // BACKGROUND GRADASI DI SECTION LEVEL (full width) — TETAP SAMA PERSIS
        backgroundColor: '#BAE6FD',
        backgroundImage: `
          radial-gradient(at 0% 0%, #BAE6FD 0px, transparent 70%),
          radial-gradient(at 100% 0%, #E9D5FF 0px, transparent 70%),
          radial-gradient(at 100% 100%, #FFEDD5 0px, transparent 70%),
          radial-gradient(at 0% 100%, #FEF08A 0px, transparent 70%)
        `,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '32px',
          padding: '72px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...getAnimatedStyle('0s'),
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            maxWidth: '920px',
            width: '100%',
            padding: '52px 32px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
            boxShadow: '0 25px 50px -15px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(255,255,255,0.7)',
            position: 'relative',
          }}
        >
          {/* Tanda Kutip Dekoratif */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '24px',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(70px, 10vw, 110px)',
            lineHeight: 1,
            color: 'var(--color-brand-orange)',
            opacity: 0.12,
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            "
          </div>

          {/* Label Filosofi Kami */}
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'var(--color-brand-orange)',
            backgroundColor: 'var(--accent-orange-bg)',
            padding: '6px 16px',
            borderRadius: '50px',
            border: '1px solid var(--accent-orange-border)',
            ...getAnimatedStyle('0.05s'),
          }}>
            Filosofi Kami
          </span>

          {/* Teks Quote Utama (Sesuai Asal) */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(17px, 2.4vw, 26px)',
            fontWeight: 500,
            lineHeight: '1.7',
            color: 'var(--color-dark-slate)',
            margin: '0',
            fontStyle: 'italic',
            maxWidth: '820px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            ...getAnimatedStyle('0.15s'),
          }}>
            Untuk menjalani kehidupan yang kreatif, kita harus kehilangan rasa takut untuk berbuat salah.
            Keingintahuan adalah kunci kreativitas.{' '}
            <span style={{
              color: 'var(--color-brand-orange)',
              fontStyle: 'normal',
              fontWeight: 700
            }}>
              Tetaplah kreatif, teruslah aktif.
            </span> Hidup indah dengan berkarya.
          </h2>

          {/* Garis Pemisah */}
          <div style={{
            width: '48px',
            height: '2px',
            background: 'var(--accent-orange-border)',
            borderRadius: '2px',
            margin: '4px 0',
            ...getAnimatedStyle('0.25s'),
          }} />

          {/* Tombol Aksi */}
          <div style={getAnimatedStyle('0.35s')}>
            <Link
              href="/karya"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: isHovered ? 'var(--color-brand-orange)' : 'var(--color-dark-slate)',
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 700,
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0px)',
                boxShadow: isHovered
                  ? '0 16px 28px -8px rgba(255, 102, 0, 0.35)'
                  : '0 10px 20px -5px rgba(15, 23, 42, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
              }}
            >
              Lihat Karya Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}