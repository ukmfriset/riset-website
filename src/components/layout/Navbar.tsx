"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 👈 Tambahkan state mounted untuk cegah hydration mismatch
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Menandakan komponen sudah aktif di client

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const lineStyle = {
    width: '24px',
    height: '2px',
    backgroundColor: '#0F172A',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    display: 'block',
  };

  // Selama belum mounted di client, render tampilan netral/aman untuk SSR
  const showMobile = isMounted ? isMobile : false;

  return (
    <>
      {/* Spacer agar konten di bawah navbar tidak tertutup saat fixed */}
      <div style={{ height: '75px', width: '100%' }} />

      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: isScrolled ? '1px solid #F1F5F9' : '1px solid transparent',
          backdropFilter: 'blur(12px)',
          boxShadow: isScrolled ? '0 4px 20px -5px rgba(0,0,0,0.05)' : 'none',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px',
            height: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/semangat-berkarya.png"
              alt="UKM-F RISET Logo"
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Menu */}
          {!showMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link 
                href="/tentang" 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Tentang Kami
              </Link>
              <Link 
                href="/karya" 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Karya
              </Link>
              <Link 
                href="/prestasi" 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Prestasi
              </Link>
              <Link 
                href="/berita" 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Berita
              </Link>
              <Link 
                href="/media-partner" 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Media Partner
              </Link>
              <Link 
                href="/kontak" 
                style={navLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF6600';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Hubungi Kami
              </Link>
            </div>
          )}

          {/* Desktop CTA */}
          {!showMobile && (
            <a
              href="https://tongsis.ukmfriset.or.id"
              target="_blank"
              rel="noopener noreferrer"
              style={ctaStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF6600';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0F172A';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Gabung Sekarang
            </a>
          )}

          {/* Hamburger Button */}
          {showMobile && (
            <button
              onClick={toggleMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{
                ...lineStyle,
                transform: menuOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : 'none',
              }} />
              <span style={{
                ...lineStyle,
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                ...lineStyle,
                transform: menuOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : 'none',
              }} />
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU - FULL SCREEN OVERLAY */}
      {showMobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '75px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            zIndex: 9999,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Link 
            href="/tentang" 
            onClick={closeMenu} 
            style={mobileLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
          >
            Tentang Kami
          </Link>
          <Link 
            href="/karya" 
            onClick={closeMenu} 
            style={mobileLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
          >
            Karya
          </Link>
          <Link 
            href="/prestasi" 
            onClick={closeMenu} 
            style={mobileLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
          >
            Prestasi
          </Link>
          <Link 
            href="/berita" 
            onClick={closeMenu} 
            style={mobileLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
          >
            Berita
          </Link>
          <Link 
            href="/media-partner" 
            onClick={closeMenu} 
            style={mobileLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
          >
            Media Partner
          </Link>
          <Link 
            href="/kontak" 
            onClick={closeMenu} 
            style={mobileLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0F172A'}
          >
            Hubungi Kami
          </Link>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
            <a
              href="https://tongsis.ukmfriset.or.id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#0F172A',
                color: '#ffffff',
                padding: '16px 24px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: '800',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF6600'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
            >
              Gabung Sekarang
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// Styles
const navLinkStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '14px',
  fontWeight: '700',
  color: '#0F172A',
  textDecoration: 'none',
  transition: 'color 0.25s ease, transform 0.25s ease',
  display: 'inline-block',
};

const mobileLinkStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '18px',
  fontWeight: '700',
  color: '#0F172A',
  textDecoration: 'none',
  padding: '16px 0',
  borderBottom: '1px solid #F1F5F9',
  display: 'block',
  transition: 'color 0.25s ease',
};

const ctaStyle = {
  backgroundColor: '#0F172A',
  color: '#ffffff',
  padding: '10px 24px',
  borderRadius: '50px',
  fontSize: '13px',
  fontWeight: '800',
  textDecoration: 'none',
  transition: 'all 0.3s',
  boxShadow: '0 8px 15px -5px rgba(15, 23, 42, 0.3)',
  whiteSpace: 'nowrap',
};