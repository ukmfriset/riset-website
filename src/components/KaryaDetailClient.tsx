"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getAccentColorByString } from "@/lib/accent-cycle"; // Pastikan path ini benar

// Tipe data dari Sanity
export interface KaryaData {
  id: string;
  title: string;
  date: string;
  author: string;
  role: string;
  category: string;
  image: string;
  excerpt: string;
  content: any[]; // Menggunakan array untuk Portable Text Sanity
  link: string;
}

export default function KaryaDetailClient({ karya }: { karya: KaryaData | null }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll progress + back to top visibility
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link berhasil disalin!");
  }, []);

  const shareWhatsApp = useCallback(() => {
    const text = encodeURIComponent(`Baca karya ini: ${karya?.title || ""} — ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, [karya]);

  const shareTwitter = useCallback(() => {
    const text = encodeURIComponent(karya?.title || "");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  }, [karya]);

  // Jika data karya tidak ditemukan di Sanity
  if (!karya) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA" }}>
        <div style={{ textAlign: "center", padding: "60px 24px", background: "#fff", borderRadius: "24px", border: "1px dashed #CBD5E1", maxWidth: "90vw" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>🔍</span>
          <h2 style={{ margin: "0 0 8px", color: "#0F172A", fontSize: "24px" }}>Karya tidak ditemukan</h2>
          <p style={{ color: "#64748B", margin: "0 0 24px" }}>Karya yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
          <Link href="/karya" style={{ color: "var(--accent-purple-text)", textDecoration: "none", fontWeight: 700 }}>
            ← Kembali ke Etalase
          </Link>
        </div>
      </main>
    );
  }

  // Ekstrak teks untuk menghitung kata dan waktu baca
  const plainText = extractTextFromBlocks(karya.content);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Menentukan warna aksen secara dinamis berdasarkan Kategori Karya
  const categoryAccent = getAccentColorByString(karya.category);

  return (
    <main style={{ backgroundColor: "#ffffff", color: "#1e293b", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      {/* ─── Scroll Progress Bar ─── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${progress}%`,
          height: "3px",
          background: `linear-gradient(90deg, ${categoryAccent.text}, ${categoryAccent.border})`,
          zIndex: 100,
          transition: "width 0.15s ease-out",
          boxShadow: `0 0 8px ${categoryAccent.bg}`,
        }}
      />

      {/* ─── Back to Top Button ─── */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          style={{
            position: "fixed",
            bottom: isMobile ? "16px" : "32px",
            right: isMobile ? "16px" : "32px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "none",
            background: categoryAccent.text,
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: `0 8px 24px ${categoryAccent.bg}`,
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            animation: "fadeInUp 0.3s ease",
          }}
        >
          ↑
        </button>
      )}

      {/* ─── Hero Section ─── */}
      <section
        style={{
          background: `linear-gradient(180deg, ${categoryAccent.bg} 0%, #ffffff 100%)`,
          padding: isMobile ? "80px 16px 40px" : "120px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: isMobile ? "200px" : "400px",
            height: isMobile ? "200px" : "400px",
            borderRadius: "50%",
            background: categoryAccent.bg,
            opacity: 0.6,
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "24px" }}>
            <Link
              href="/karya"
              style={{
                color: categoryAccent.text,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ← Etalase Karya
            </Link>
            <span style={{ color: "#CBD5E1", margin: "0 8px" }}>/</span>
            <span style={{ color: "#94A3B8", fontSize: "14px", fontWeight: 500 }}>{karya.category}</span>
          </nav>

          {/* Category Badge */}
          <span
            style={{
              display: "inline-block",
              background: "#ffffff",
              color: categoryAccent.text,
              padding: "6px 16px",
              borderRadius: 999,
              fontFamily: "var(--font-heading)",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              border: `1px solid ${categoryAccent.border}`,
              marginBottom: "20px",
            }}
          >
            {karya.category}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "1.75rem" : "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: "1.15",
              fontWeight: 800,
              color: "var(--color-dark-slate)",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              wordWrap: "break-word",
            }}
          >
            {karya.title}
          </h1>

          {/* Meta Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "12px" : "20px",
              color: "#64748B",
              fontSize: isMobile ? "13px" : "15px",
              fontWeight: 500,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: categoryAccent.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                ✍️
              </span>
              <div>
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{karya.author}</div>
                <div style={{ fontSize: "13px" }}>{karya.role}</div>
              </div>
            </div>
            <span style={{ color: "#CBD5E1", display: isMobile ? "none" : "inline" }}>|</span>
            <span>{karya.date}</span>
            <span style={{ color: "#CBD5E1", display: isMobile ? "none" : "inline" }}>|</span>
            <span>⏱ {readTime} menit</span>
            {wordCount > 0 && (
              <>
                <span style={{ color: "#CBD5E1", display: isMobile ? "none" : "inline" }}>|</span>
                <span>📝 {wordCount.toLocaleString("id-ID")} kata</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Hero Image ─── */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto 60px",
          padding: isMobile ? "0 16px" : "0 24px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
        }}
      >
        {karya.image && karya.image.trim() !== "" ? (
          <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)" }}>
            <img
              src={karya.image}
              alt={karya.title}
              style={{
                width: "100%",
                height: isMobile ? "250px" : "450px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: isMobile ? "250px" : "400px",
              borderRadius: "24px",
              background: `linear-gradient(135deg, ${categoryAccent.bg} 0%, ${categoryAccent.border} 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: categoryAccent.text,
              gap: "16px",
              boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
            }}
          >
            <span style={{ fontSize: isMobile ? "3rem" : "5rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }}>
              {getCategoryEmoji(karya.category)}
            </span>
            <span style={{ fontWeight: 800, fontSize: isMobile ? "1rem" : "1.3rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {karya.category}
            </span>
          </div>
        )}
      </section>

      {/* ─── Content Grid ─── */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto 100px",
          padding: isMobile ? "0 16px" : "0 24px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
          gap: isMobile ? "40px" : "60px",
        }}
      >
        {/* Article Body */}
        <article
          style={{
            fontSize: isMobile ? "1rem" : "1.125rem",
            lineHeight: "1.9",
            color: "#334155",
            fontFamily: "var(--font-body)",
          }}
          className="sanity-content"
        >
          {/* Lead Paragraph (Excerpt) */}
          {karya.excerpt && (
            <p
              style={{
                fontSize: isMobile ? "1.15rem" : "1.35rem",
                lineHeight: "1.7",
                color: "#0F172A",
                fontWeight: 600,
                marginBottom: "2.5rem",
                paddingLeft: "24px",
                borderLeft: `4px solid ${categoryAccent.text}`,
                fontStyle: "italic",
              }}
            >
              {karya.excerpt}
            </p>
          )}

          {/* Render Rich Text dari Sanity */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            }}
          >
            {karya.content && karya.content.length > 0 ? (
              <PortableText value={karya.content} />
            ) : (
              <p style={{ color: "#94A3B8", fontStyle: "italic" }}>Konten tidak tersedia.</p>
            )}
          </div>

          {/* Tags */}
          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E2E8F0" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
              Topik
            </h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[karya.category, "UKM-F Riset", "UTM", "Karya"].map((tag) => {
                const tagAccent = getAccentColorByString(tag); // Warna tiap tag beda-beda

                return (
                  <span
                    key={tag}
                    style={{
                      fontSize: "13px",
                      padding: "6px 14px",
                      background: tagAccent.bg,
                      color: tagAccent.text,
                      borderRadius: "20px",
                      fontWeight: 600,
                      border: `1px solid ${tagAccent.border}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    #{tag}
                  </span>
                );
              })}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside>
          <div
            style={{
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : "40px",
              padding: "28px",
              backgroundColor: "#FAFAFA",
              borderRadius: "24px",
              border: "1px solid #E2E8F0",
            }}
          >
            {/* Reading Time Badge */}
            <div
              style={{
                marginBottom: "24px",
                padding: "12px 16px",
                background: `linear-gradient(135deg, ${categoryAccent.bg} 0%, #ffffff 100%)`,
                borderRadius: "16px",
                textAlign: "center",
                border: `1px solid ${categoryAccent.border}`,
              }}
            >
              <span style={{ fontSize: "13px", color: categoryAccent.text, fontWeight: 700 }}>
                ⏱ {readTime} menit membaca
              </span>
              {wordCount > 0 && (
                <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>
                  {wordCount.toLocaleString("id-ID")} kata
                </div>
              )}
            </div>

            {/* Author Info */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${categoryAccent.bg}, ${categoryAccent.border})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  margin: "0 auto 12px",
                }}
              >
                ✍️
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 800, color: "#0F172A" }}>
                {karya.author}
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>{karya.role}</p>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #E2E8F0", margin: "20px 0" }} />

            {/* Share Actions */}
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "12px",
              }}
            >
              Bagikan
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <ActionButton onClick={copyLink} icon="🔗" label="Salin Link" hoverAccent={categoryAccent} />
              <ActionButton onClick={shareWhatsApp} icon="💬" label="WhatsApp" hoverAccent={categoryAccent} />
              <ActionButton onClick={shareTwitter} icon="🐦" label="Twitter / X" hoverAccent={categoryAccent} />
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #E2E8F0", margin: "20px 0" }} />

            {/* Related Info */}
            <div
              style={{
                padding: "16px",
                background: "#ffffff",
                borderRadius: "16px",
                textAlign: "center",
                border: "1px solid #E2E8F0",
              }}
            >
              <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 12px", lineHeight: "1.6" }}>
                Jelajahi lebih banyak karya dari UKM-F Riset.
              </p>
              <Link
                href="/karya"
                style={{
                  display: "inline-block",
                  width: "100%",
                  fontSize: "13px",
                  padding: "10px",
                  background: categoryAccent.text,
                  color: "#ffffff",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 700,
                  textAlign: "center",
                  transition: "all 0.2s ease",
                }}
              >
                Lihat Karya Lainnya
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* ─── Footer Navigation ─── */}
      <footer
        style={{
          maxWidth: 1000,
          margin: "0 auto 80px",
          padding: isMobile ? "0 16px" : "0 24px",
        }}
      >
        <div
          style={{
            padding: isMobile ? "24px" : "32px",
            background: `linear-gradient(135deg, ${categoryAccent.bg} 0%, #ffffff 100%)`,
            borderRadius: "24px",
            border: `1px solid ${categoryAccent.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: categoryAccent.text, textTransform: "uppercase", letterSpacing: "1px" }}>
              Navigasi
            </span>
            <h3 style={{ margin: "8px 0 0", fontSize: isMobile ? "16px" : "20px", fontWeight: 800, color: "#0F172A" }}>
              Teruskan Menjelajah
            </h3>
          </div>
          <Link
            href="/karya"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: isMobile ? "12px 20px" : "14px 28px",
              background: categoryAccent.text,
              color: "#ffffff",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: isMobile ? "14px" : "15px",
              transition: "all 0.3s ease",
              boxShadow: `0 8px 24px ${categoryAccent.bg}`,
            }}
          >
            ← Kembali ke Etalase
          </Link>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

/* ─── Helper Components ─── */

function ActionButton({
  onClick,
  icon,
  label,
  hoverAccent,
}: {
  onClick: () => void;
  icon: string;
  label: string;
  hoverAccent: { bg: string; text: string; border: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        background: isHovered ? hoverAccent.bg : "#ffffff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        color: isHovered ? hoverAccent.text : "#334155",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "all 0.2s ease",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      {label}
    </button>
  );
}

/* ─── Helpers ─── */

function getCategoryEmoji(category: string): string {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("essay")) return "📝";
  if (lowerCat.includes("puisi")) return "✍️";
  if (lowerCat.includes("artikel")) return "📰";
  if (lowerCat.includes("cerpen")) return "📖";
  return "✍️";
}

function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join(" ");
}