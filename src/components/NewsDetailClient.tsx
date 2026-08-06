"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getAccentColorByString } from "@/lib/accent-cycle"; 
import { FaWhatsapp, FaXTwitter, FaFacebookF, FaLinkedinIn, FaRegCopy, FaCheck } from "react-icons/fa6";

export interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  role: string;
  category: string;
  image: string;
  excerpt: string;
  content: any[]; 
  link: string;
}

export default function NewsDetailClient({ article }: { article: Article | null }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false); // 👈 Penangkal hydration error
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    setIsVisible(true);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const shareWhatsApp = useCallback(() => {
    const text = encodeURIComponent(`Baca artikel ini: ${article?.title || ""} — ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, [article]);

  const shareTwitter = useCallback(() => {
    const text = encodeURIComponent(article?.title || "");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  }, [article]);

  const shareFacebook = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  }, []);

  const shareLinkedIn = useCallback(() => {
    const title = encodeURIComponent(article?.title || "");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, "_blank");
  }, [article]);

  if (!article) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA" }}>
        <div style={{ textAlign: "center", padding: "60px 24px", background: "#fff", borderRadius: "24px", border: "1px dashed #CBD5E1", maxWidth: "90vw" }}>
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>🔍</span>
          <h2 style={{ margin: "0 0 8px", color: "#0F172A", fontSize: "24px" }}>Artikel tidak ditemukan</h2>
          <p style={{ color: "#64748B", margin: "0 0 24px" }}>Artikel yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
          <Link href="/berita" style={{ color: "var(--accent-orange-text)", textDecoration: "none", fontWeight: 700 }}>
            ← Kembali ke Daftar Berita
          </Link>
        </div>
      </main>
    );
  }

  const plainText = extractTextFromBlocks(article.content);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const categoryAccent = getAccentColorByString(article.category);
  const mobileView = mounted ? isMobile : false;

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

      {/* ─── Hero Section ─── */}
      <section
        style={{
          background: `linear-gradient(180deg, ${categoryAccent.bg} 0%, #ffffff 100%)`,
          padding: mobileView ? "80px 16px 40px" : "120px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: mobileView ? "200px" : "400px",
            height: mobileView ? "200px" : "400px",
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
              href="/berita"
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
              ← Berita
            </Link>
            <span style={{ color: "#CBD5E1", margin: "0 8px" }}>/</span>
            <span style={{ color: "#94A3B8", fontSize: "14px", fontWeight: 500 }}>{article.category}</span>
          </nav>

          {/* Category Badge */}
          <span
            style={{
              display: "inline-block",
              background: categoryAccent.bg,
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
            {article.category}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: mobileView ? "1.75rem" : "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: "1.15",
              fontWeight: 800,
              color: "var(--color-dark-slate)",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              wordWrap: "break-word",
            }}
          >
            {article.title}
          </h1>

          {/* Meta Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: mobileView ? "12px" : "20px",
              color: "#64748B",
              fontSize: mobileView ? "13px" : "15px",
              fontWeight: 500,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: categoryAccent.bg, color: categoryAccent.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                👤
              </span>
              <div>
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{article.author}</div>
                <div style={{ fontSize: "13px" }}>{article.role}</div>
              </div>
            </div>
            <span style={{ color: "#CBD5E1", display: mobileView ? "none" : "inline" }}>|</span>
            <span>{article.date}</span>
            <span style={{ color: "#CBD5E1", display: mobileView ? "none" : "inline" }}>|</span>
            <span>⏱ {readTime} menit</span>
            <span style={{ color: "#CBD5E1", display: mobileView ? "none" : "inline" }}>|</span>
            <span>📝 {wordCount.toLocaleString("id-ID")} kata</span>
          </div>
        </div>
      </section>

      {/* ─── Hero Image ─── */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto 60px",
          padding: mobileView ? "0 16px" : "0 24px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
        }}
      >
        {article.image && article.image.trim() !== "" ? (
          <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)" }}>
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: "100%",
                height: mobileView ? "250px" : "450px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: mobileView ? "250px" : "400px",
              borderRadius: "24px",
              background: `linear-gradient(135deg, ${getGradientColor(article.category)} 0%, ${getGradientColor2(article.category)} 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              gap: "16px",
              boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
            }}
          >
            <span style={{ fontSize: mobileView ? "3rem" : "5rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>
              {getCategoryEmoji(article.category)}
            </span>
            <span style={{ fontWeight: 700, fontSize: mobileView ? "1rem" : "1.3rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {article.category}
            </span>
          </div>
        )}
      </section>

      {/* ─── Content Grid ─── */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto 100px",
          padding: mobileView ? "0 16px" : "0 24px",
          display: "grid",
          gridTemplateColumns: mobileView ? "1fr" : "1fr 320px",
          gap: mobileView ? "40px" : "60px",
        }}
      >
        {/* Article Body */}
        <article
          style={{
            fontSize: mobileView ? "1rem" : "1.125rem",
            lineHeight: "1.9",
            color: "#334155",
            fontFamily: "var(--font-body)",
          }}
          className="sanity-content"
        >
          {/* Lead Paragraph */}
          {article.excerpt && (
            <p
              style={{
                fontSize: mobileView ? "1.15rem" : "1.35rem",
                lineHeight: "1.7",
                color: "#0F172A",
                fontWeight: 600,
                marginBottom: "2.5rem",
                paddingLeft: "24px",
                borderLeft: `4px solid ${categoryAccent.text}`,
                fontStyle: "italic",
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Render Rich Text from Sanity */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            }}
          >
            <PortableText value={article.content} />
          </div>

          {/* Tags */}
          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E2E8F0" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
              Topik
            </h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Berita", article.category, "UKM-F Riset", "UTM"].map((tag) => {
                const tagAccent = getAccentColorByString(tag);

                return (
                  <span
                    key={tag}
                    style={{
                      fontSize: "13px",
                      padding: "6px 14px",
                      background: tagAccent.bg,
                      color: tagAccent.text,
                      border: `1px solid ${tagAccent.border}`,
                      borderRadius: "20px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
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
              position: mobileView ? "relative" : "sticky",
              top: mobileView ? "auto" : "40px",
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
              <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>
                {wordCount.toLocaleString("id-ID")} kata
              </div>
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
                👤
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 800, color: "#0F172A" }}>
                {article.author}
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>{article.role}</p>
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
              <ActionButton onClick={copyLink} icon={copied ? <FaCheck style={{ color: "#16a34a" }} /> : <FaRegCopy />} label={copied ? "Tautan Disalin!" : "Salin Tautan"} brandColor="#475569" hoverAccent={categoryAccent} />
              <ActionButton onClick={shareWhatsApp} icon={<FaWhatsapp style={{ color: "#25D366" }} />} label="WhatsApp" brandColor="#25D366" hoverAccent={categoryAccent} />
              <ActionButton onClick={shareTwitter} icon={<FaXTwitter style={{ color: "#000000" }} />} label="Twitter / X" brandColor="#000000" hoverAccent={categoryAccent} />
              <ActionButton onClick={shareFacebook} icon={<FaFacebookF style={{ color: "#1877F2" }} />} label="Facebook" brandColor="#1877F2" hoverAccent={categoryAccent} />
              <ActionButton onClick={shareLinkedIn} icon={<FaLinkedinIn style={{ color: "#0A66C2" }} />} label="LinkedIn" brandColor="#0A66C2" hoverAccent={categoryAccent} />
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
                Jangan lewatkan update terbaru dari UKM-F Riset.
              </p>
              <Link
                href="/berita"
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
                Lihat Berita Lainnya
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
          padding: mobileView ? "0 16px" : "0 24px",
        }}
      >
        <div
          style={{
            padding: mobileView ? "24px" : "32px",
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
            <h3 style={{ margin: "8px 0 0", fontSize: mobileView ? "16px" : "20px", fontWeight: 800, color: "#0F172A" }}>
              Teruskan Membaca
            </h3>
          </div>
          <Link
            href="/berita"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: mobileView ? "12px 20px" : "14px 28px",
              background: categoryAccent.text,
              color: "#ffffff",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: mobileView ? "14px" : "15px",
              transition: "all 0.3s ease",
              boxShadow: `0 8px 24px ${categoryAccent.bg}`,
            }}
          >
            ← Kembali ke Daftar Berita
          </Link>
        </div>
      </footer>
    </main>
  );
}

function ActionButton({
  onClick,
  icon,
  label,
  brandColor,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  brandColor: string;
  hoverAccent: { bg: string; text: string; border: string };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "10px 14px",
        borderRadius: "12px",
        border: isHovered ? `1px solid ${brandColor}40` : "1px solid #E2E8F0",
        background: isHovered ? `${brandColor}0D` : "#ffffff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "13.5px",
        color: isHovered ? brandColor : "#334155",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        transition: "all 0.2s ease",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span style={{ fontSize: "16px", display: "flex", alignItems: "center" }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
    </button>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    "Berita Acara": "📅",
    "Berita": "📰",
    "Artikel": "📝",
    default: "📰",
  };
  return map[category] || map.default;
}

function getGradientColor(category: string): string {
  const map: Record<string, string> = {
    "Berita Acara": "#6366f1",
    "Berita": "#3b82f6",
    "Artikel": "#8b5cf6",
    default: "#f97316",
  };
  return map[category] || map.default;
}

function getGradientColor2(category: string): string {
  const map: Record<string, string> = {
    "Berita Acara": "#a855f7",
    "Berita": "#60a5fa",
    "Artikel": "#c084fc",
    default: "#fb923c",
  };
  return map[category] || map.default;
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