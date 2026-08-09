"use client";

import { useState, useEffect } from "react";

const images = [
  "/Hero-1.jpeg",
  "/Hero-2.jpeg",
  "/Hero-3.jpeg",
  "/Hero-6.jpg",
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti gambar setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(35px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseScroll {
          0% { transform: scaleY(0.4); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0.4); opacity: 0.3; }
        }

        .animate-stagger {
          animation: fadeSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hover-text-effect {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.3s ease;
        }
        .hover-text-effect:hover {
          transform: scale(1.05) rotate(-1deg);
          text-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
          cursor: default;
        }
      `}</style>

      <section
        style={{
          width: '100%',
          maxWidth: '100vw',
          padding: '140px 20px 140px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {/* Slideshow Background Images */}
        {images.map((img, index) => (
          <div
            key={img}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("${img}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0,
            }}
          />
        ))}

        {/* Dark Overlay agar teks tetap kontras dan mudah dibaca di atas gambar */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '28px',
        }}>

          {/* Badge Atas */}
          <div className="animate-stagger" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            padding: '6px 18px',
            borderRadius: '50px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid rgba(255, 255, 255, 0.25)',
            animationDelay: '0.1s',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-brand-orange)' }} />
            Budaya Belajar, Berpikir, dan Berkarya
          </div>

          {/* Heading */}
          <div className="animate-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '10px', animationDelay: '0.2s' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              fontWeight: 600,
              color: '#94A3B8',
              letterSpacing: '0.02em',
            }}>
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 5vw, 60px)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0,
                wordWrap: 'break-word',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '0.82em',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Tumbuhkan
              </span>

              <span
                className="hover-text-effect"
                style={{
                  display: 'block',
                  color: 'var(--color-brand-orange)',
                }}
              >
                #SemangatBerkarya
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.82em',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                Berikan Dampak Nyata
              </span>
            </h1>
          </div>

          {/* Deskripsi */}
          <p className="animate-stagger" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#CBD5E1',
            maxWidth: '700px',
            margin: 0,
            wordWrap: 'break-word',
            animationDelay: '0.35s',
          }}>
            Wadah mahasiswa untuk belajar riset, menulis, dan berkarya bersama.
          </p>

          {/* Indikator Scroll Bawah */}
          <div className="animate-stagger" style={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            color: '#94A3B8',
            height: '80px',
            animationDelay: '0.6s',
          }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              letterSpacing: '2px', 
              textTransform: 'uppercase',
              opacity: 0.8 
            }}>
              Scroll Untuk Eksplorasi
            </span>
            <div style={{
              width: '2px',
              height: '40px',
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, #94A3B8, transparent)',
              transformOrigin: 'top',
              animation: 'pulseScroll 2s infinite ease-in-out'
            }} />
          </div>

        </div>
      </section>
    </>
  );
}