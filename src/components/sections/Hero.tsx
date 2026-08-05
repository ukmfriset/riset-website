"use client";

import { useEffect, useRef } from 'react';

function animateCount(el: HTMLElement, target: number, duration: number, suffix: string) {
  let start: number | null = null;
  const step = (ts: number) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const membersRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const awardsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (membersRef.current) animateCount(membersRef.current, 120, 1400, '+');
      if (projectsRef.current) animateCount(projectsRef.current, 35, 1200, '+');
      if (awardsRef.current) animateCount(awardsRef.current, 15, 1000, '+');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes blobZoomIn {
          0% { opacity: 0; transform: scale(0.6) rotate(-15deg); }
          100% { transform: scale(1) rotate(0); }
        }

        @keyframes pulseScroll {
          0% { transform: scaleY(0.4); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0.4); opacity: 0.3; }
        }

        .animate-stagger {
          animation: fadeSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hover-text-effect {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.3s ease;
        }
        .hover-text-effect:hover {
          transform: scale(1.08) rotate(-2deg);
          text-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
          cursor: default;
        }
      `}</style>

      <section
        className="grad-hero"
        style={{
          width: '100%',
          maxWidth: '100vw',
          padding: '40px 20px 120px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {/* FIX: Blob di-wrap dengan container yang overflow hidden */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '6%',
            width: 'min(280px, 60vw)',
            height: 'min(280px, 60vw)',
            borderRadius: '50%',
            background: 'var(--accent-purple-bg)',
            opacity: 0.4,
            filter: 'blur(90px)',
            animation: 'blobZoomIn 2s cubic-bezier(0.16, 1, 0.3, 1) both',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '60px',
            right: '8%',
            width: 'min(320px, 70vw)',
            height: 'min(320px, 70vw)',
            borderRadius: '50%',
            background: 'var(--accent-yellow-bg)',
            opacity: 0.35,
            filter: 'blur(100px)',
            animation: 'blobZoomIn 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '25%',
            width: 'min(180px, 40vw)',
            height: 'min(180px, 40vw)',
            borderRadius: '50%',
            background: 'var(--accent-blue-bg)',
            opacity: 0.3,
            filter: 'blur(70px)',
            animation: 'blobZoomIn 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
          }} />
        </div>

        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '28px',
        }}>

          <div className="animate-stagger" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
            color: 'var(--accent-purple-text)',
            padding: '6px 18px',
            borderRadius: '50px',
            fontSize: '11.5px',
            fontWeight: 700,
            width: 'fit-content',
            border: '1px solid var(--accent-purple-border)',
            animationDelay: '0.1s', 
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple-text)' }} />
            Budaya Belajar, Berpikir, dan Berkarya
          </div>

          <div className="animate-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '8px', animationDelay: '0.2s' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(18px, 3vw, 24px)',
              fontWeight: 700,
              color: 'var(--color-dark-slate)',
            }}>
              Semua Berawal dari Sebuah Ide.
            </span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.16,
              color: 'var(--color-dark-slate)',
              margin: 0,
              wordWrap: 'break-word',
            }}>
              Tumbuhkan <span className="hover-text-effect" style={{ fontFamily: 'var(--font-display)',  color: 'var(--color-brand-orange)' }}>#SemangatBerkarya</span><br />
              Berikan Dampak Nyata
            </h1>
          </div>

          <p className="animate-stagger" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15.5px',
            lineHeight: '1.75',
            color: 'var(--color-text-muted)',
            maxWidth: '680px', 
            margin: 0,
            wordWrap: 'break-word',
            animationDelay: '0.35s'
          }}>
            UKM-F RISET adalah ruang bertumbuh bagi mahasiswa FISIB Universitas Trunojoyo Madura untuk mengembangkan cara berpikir kritis, kemampuan riset, kepenulisan, dan kolaborasi hingga melahirkan karya yang memberikan manfaat bagi masyarakat.
          </p>

          <div className="animate-stagger" style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--color-text-muted)',
            height: '80px',
            animationDelay: '0.6s'
          }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase',
              opacity: 0.7 
            }}>
              Scroll Untuk Eksplorasi
            </span>
            <div style={{
              width: '2px',
              height: '40px',
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)',
              transformOrigin: 'top',
              animation: 'pulseScroll 2s infinite ease-in-out'
            }} />
          </div>

        </div>
      </section>
    </>
  );
}