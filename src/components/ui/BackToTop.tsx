"use client";

import { useState, useEffect, useCallback } from "react";

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Cek ukuran layar untuk posisi responsif di mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pantau posisi scroll halaman
  useEffect(() => {
    const handleScroll = () => {
      // Muncul jika scroll ke bawah lebih dari 500px
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      style={{
        position: "fixed",
        bottom: isMobile ? "20px" : "32px",
        right: isMobile ? "20px" : "32px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "2px solid #ffffff", // ✅ Tambah border putih agar semakin kontras
        background: "var(--color-brand-orange)", // ✅ Diubah ke warna oranye brand agar mencolok di footer hitam
        color: "#ffffff",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(255, 102, 0, 0.4)", // ✅ Shadow oranye terang
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        animation: "fadeInUp 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-dark-slate)"; // ✅ Hover jadi gelap
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.4)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-brand-orange)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 102, 0, 0.4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      ↑
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </button>
  );
}