"use client";
import { useState, useEffect, useRef } from 'react';

const getProdiStyle = (prodi: string) => {
  switch ((prodi || "").toLowerCase()) {
    case 'psikologi':
      return { bg: 'var(--accent-purple-bg)', text: 'var(--accent-purple-text)' };
    case 'ilmu komunikasi':
      return { bg: 'var(--accent-blue-bg)', text: 'var(--accent-blue-text)' };
    case 'sastra inggris':
      return { bg: 'var(--accent-yellow-bg)', text: 'var(--accent-yellow-text)' };
    case 'sosiologi':
      return { bg: '#F1F5F9', text: '#475569' };
    default:
      return { bg: 'var(--accent-orange-bg)', text: 'var(--accent-orange-text)' };
  }
};

export interface TeamMember {
  nama: string;
  jabatan: string;
  prodi: string;
  isCo?: boolean;
  divisi?: string;
}

// ✅ Data statis 2026 (Nanti saat 2027, bagian ini bisa dikosongkan/dihapus total)
const STATIC_TEAM_2026: { [key: string]: TeamMember[] } = {
  "BPH": [
    { nama: "Onky Yulyandi V.", jabatan: "Ketua Umum", prodi: "Psikologi", isCo: true },
    { nama: "Lia Nur Khasanah", jabatan: "Wakil Ketua Umum", prodi: "Ilmu Komunikasi", isCo: true },
    { nama: "Arinil Haqqoh", jabatan: "Sekretaris Umum 1", prodi: "Psikologi" },
    { nama: "Thessalonica Oktaviena P.", jabatan: "Sekretaris Umum 2", prodi: "Psikologi" },
    { nama: "Cici Nur Ausyah", jabatan: "Bendahara Umum 1", prodi: "Sosiologi" },
    { nama: "Lidya Eka Aditya", jabatan: "Bendahara Umum 2", prodi: "Sosiologi" },
  ],
  "POSDM": [
    { nama: "Siti Ro'ichatul Janah", jabatan: "CO POSDM", prodi: "Psikologi", isCo: true },
    { nama: "Akbar Dhiyaul Fitroh", jabatan: "Anggota POSDM", prodi: "Psikologi" },
    { nama: "Shofi'atun Kholifah", jabatan: "Anggota POSDM", prodi: "Psikologi" },
    { nama: "Siti Maryam Putri Ersa", jabatan: "Anggota POSDM", prodi: "Psikologi" },
    { nama: "Ismiatus Syah Rani", jabatan: "Anggota POSDM", prodi: "Ilmu Komunikasi" },
  ],
  "LITBANG": [
    { nama: "Huzeini", jabatan: "CO LITBANG", prodi: "Sosiologi", isCo: true },
    { nama: "Vaneza Dwi Al Mufidah", jabatan: "Anggota LITBANG", prodi: "Sastra Inggris" },
    { nama: "Lucky Tri Kusumawati", jabatan: "Anggota LITBANG", prodi: "Sastra Inggris" },
    { nama: "Dewi Rahma Salsabyla", jabatan: "Anggota LITBANG", prodi: "Ilmu Komunikasi" },
    { nama: "Navis Satun Nisa", jabatan: "Anggota LITBANG", prodi: "Psikologi" },
    { nama: "Isni Hosiyah Robbi", jabatan: "Anggota LITBANG", prodi: "Sosiologi" },
  ],
  "EDUKASI": [
    { nama: "Anis Fitriani", jabatan: "CO EDUKASI", prodi: "Ilmu Komunikasi", isCo: true },
    { nama: "Mega Andini", jabatan: "Anggota EDUKASI", prodi: "Psikologi" },
    { nama: "Arik Syaifuddin", jabatan: "Anggota EDUKASI", prodi: "Psikologi" },
    { nama: "Saifatul Jennah", jabatan: "Anggota EDUKASI", prodi: "Sastra Inggris" },
    { nama: "Selimatus Zahira", jabatan: "Anggota EDUKASI", prodi: "Sastra Inggris" },
    { nama: "M. Yogi Ali Mahfudz", jabatan: "Anggota EDUKASI", prodi: "Sosiologi" },
  ],
  "INFOKOM": [
    { nama: "Novi dwi Lestari", jabatan: "CO INFOKOM", prodi: "Sosiologi", isCo: true },
    { nama: "Masayu Anatasya", jabatan: "Anggota INFOKOM", prodi: "Psikologi" },
    { nama: "Khoirul Imam", jabatan: "Anggota INFOKOM", prodi: "Sosiologi" },
    { nama: "Supiyatun Jannah", jabatan: "Anggota INFOKOM", prodi: "Ilmu Komunikasi" },
    { nama: "Siti Amina", jabatan: "Anggota INFOKOM", prodi: "Ilmu Komunikasi" },
    { nama: "Chayati Nur Rokhmah", jabatan: "Anggota INFOKOM", prodi: "Sosiologi" },
    { nama: "Adethya Napitupulu", jabatan: "Anggota INFOKOM", prodi: "Ilmu Komunikasi" },
  ],
  "KWU": [
    { nama: "Teguh Prasetiyo", jabatan: "CO KWU", prodi: "Sosiologi", isCo: true },
    { nama: "Fabian Elleazar S.", jabatan: "Anggota KWU", prodi: "Sosiologi" },
    { nama: "Hindun Zaiturrochmah", jabatan: "Anggota KWU", prodi: "Sosiologi" },
    { nama: "Shafi Dhana Daarussalam", jabatan: "Anggota KWU", prodi: "Sastra Inggris" },
  ],
  "PR": [
    { nama: "Inayatur Rofi'ah", jabatan: "CO PR", prodi: "Sastra Inggris", isCo: true },
    { nama: "Isma Novianti Dwi Kamala", jabatan: "Anggota PR", prodi: "Sastra Inggris" },
    { nama: "Qurrotin A'yun", jabatan: "Anggota PR", prodi: "Ilmu Komunikasi" },
    { nama: "Rosailul Hidayatus S.", jabatan: "Anggota PR", prodi: "Ilmu Komunikasi" },
    { nama: "Umi Nur Latifah", jabatan: "Anggota PR", prodi: "Ilmu Komunikasi" },
  ]
};

export default function TeamSection({ sanityTeam = [] }: { sanityTeam?: any[] }) {
  // ✅ Gabungkan data statis dengan data dari Sanity
  const teamData = { ...STATIC_TEAM_2026 };

  // Jika ada data dari Sanity, masukkan ke dalam kategori divisinya masing-masing
  sanityTeam.forEach((member) => {
    const div = member.divisi || "BPH";
    if (!teamData[div]) {
      teamData[div] = [];
    }
    teamData[div].push({
      nama: member.nama,
      jabatan: member.jabatan,
      prodi: member.prodi,
      isCo: member.isCo,
    });
  });

  const tabs = Object.keys(teamData);
  const [activeTab, setActiveTab] = useState("BPH");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimateCards(true);
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 30);
  };

  const getAnimatedStyle = (isTriggered: boolean, delay: string) => ({
    opacity: isTriggered ? 1 : 0,
    transform: isTriggered ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  });

  const currentMembers = teamData[activeTab] || [];

  return (
    <section 
      ref={sectionRef}
      className="grad-team" 
      style={{ width: '100%', padding: '120px 20px', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>

        {/* Header Seksi */}
        <div style={{ marginBottom: '20px', borderBottom: '1.5px solid #F1F5F9', paddingBottom: '40px' }}>
          <span 
            style={{ 
              display: 'inline-block', 
              width: 'fit-content', 
              background: 'var(--accent-blue-bg)', 
              color: 'var(--accent-blue-text)', 
              padding: '6px 16px', 
              borderRadius: '50px', 
              fontFamily: 'var(--font-heading)', 
              fontSize: '12px', 
              fontWeight: '800', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              marginBottom: '20px',
              ...getAnimatedStyle(isVisible, '0s')
            }}
          >
            Pengurus 2026 →
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
                ...getAnimatedStyle(isVisible, '0.15s')
              }}
            >
              Tak Kenal Maka <br />
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brand-orange)' }}>Tak Kenalin</span>
            </h2>

            <div 
              style={{ 
                flex: '2 1 600px', 
                maxWidth: '650px',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                ...getAnimatedStyle(isVisible, '0.3s')
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                Bukan cuma nama dan jabatan. Di balik setiap divisi, ada orang-orang yang siap belajar, berkolaborasi, dan saling mendukung untuk berkembang bersama.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: 0 }}>
                Yuk kenalan sama pengurus #SemangatBerkarya 2026. Siapa tahu, mereka bakal jadi partner diskusi, mentor, atau bahkan teman seperjuanganmu nanti.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '10px', 
            overflowX: 'auto', 
            paddingBottom: '10px',
            maxWidth: '100%',
            ...getAnimatedStyle(isVisible, '0.4s')
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              aria-pressed={activeTab === tab}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: activeTab === tab ? 'none' : '1.5px solid #E2E8F0',
                backgroundColor: activeTab === tab ? 'var(--color-brand-orange)' : '#ffffff',
                color: activeTab === tab ? '#ffffff' : 'var(--color-text-muted)',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid Anggota */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {currentMembers.map((member, index) => {
            const isHovered = hoverIndex === index;
            const prodiColor = getProdiStyle(member.prodi);
            const cardDelay = `${0.5 + index * 0.08}s`;
            const animatedCardStyle = getAnimatedStyle(animateCards, cardDelay);

            return (
              <div
                key={member.nama}
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
                  opacity: animatedCardStyle.opacity,
                  transform: isHovered ? 'translateY(-6px)' : animatedCardStyle.transform,
                  transition: isHovered
                    ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                    : animatedCardStyle.transition,
                }}
              >
                <div style={{
                  background: `linear-gradient(to bottom, ${prodiColor.bg} 0%, #ffffff 100%)`,
                  height: '140px',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {member.isCo && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#ffffff',
                      color: 'var(--color-brand-orange)',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '50px',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      ★ INTI
                    </span>
                  )}

                  <div style={{ 
                    width: '72px', 
                    height: '72px', 
                    borderRadius: '50%', 
                    backgroundColor: '#fff', 
                    border: '2px solid #fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '28px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                  }}>
                    👤
                  </div>
                </div>

                <div style={{ padding: '20px 16px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-brand-orange)' }}>
                    {member.jabatan}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '800', color: 'var(--color-dark-slate)', margin: '4px 0 0', wordWrap: 'break-word' }}>
                    {member.nama}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: '600', color: prodiColor.text, backgroundColor: prodiColor.bg, padding: '4px 12px', borderRadius: '50px', marginTop: '4px' }}>
                    {member.prodi}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}