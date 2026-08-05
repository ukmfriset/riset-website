"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function CtaSection() {
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
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  return (
    <section 
      ref={sectionRef}
      className="grad-cta" 
      style={{ 
        width: '100%', 
        padding: '120px 20px', 
        overflow: 'hidden',
        // BACKGROUND GRADASI DI SECTION LEVEL (full width)
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
          // HAPUS background dari sini, sudah di section
          padding: '72px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...getAnimatedStyle('0s'),
        }}
      >
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '700px',
          width: '100%',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.04)'
        }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(26px, 4vw, 46px)',
              fontWeight: '800',
              lineHeight: '1.2',
              color: 'var(--color-dark-slate)',
              margin: '0',
              letterSpacing: '-1px',
              wordWrap: 'break-word',
              ...getAnimatedStyle('0.15s')
            }}>
              Mari Tumbuh Bersama <br/>
              <span style={{ fontFamily: 'var(--font-display)',  color: 'var(--color-brand-orange)' }}>#SemangatBerkarya</span>
            </h2>

            <div 
              style={{ 
                maxWidth: '680px', 
                margin: '0 auto',
                ...getAnimatedStyle('0.3s')
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0 0 12px 0', wordWrap: 'break-word' }}>
                Nggak ada karya besar yang lahir dalam satu malam. Semua dimulai dari keberanian untuk bertanya, kemauan untuk belajar, dan langkah kecil yang dilakukan secara konsisten. Kalau kamu ingin berkembang bersama komunitas yang percaya pada proses, inilah tempatnya.
              </p>
            </div>
          </div>

          <div style={getAnimatedStyle('0.45s')}>
            <Link 
              href="https://tongsis.ukmfriset.or.id" 
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-dark-slate)',
                color: '#ffffff',
                padding: '16px 44px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 15px 30px -10px rgba(15, 23, 42, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-brand-orange)';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(255, 102, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-dark-slate)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(15, 23, 42, 0.3)';
              }}
            >
              Gabung Bersama Kami ➔
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}