"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
// import { NewsItem } from "@/data/berita/news"; // Gunakan tipe ini jika sudah sesuai
import NewsCard from "@/components/ui/NewsCard";

/* ─────────── Tipe Data ─────────── */
// Pastikan tipe ini sesuai dengan props NewsCard kamu
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  author: string;
  role: string;
  category: string;
  image: string;
  excerpt: string;
  content: any; // Format dari Sanity
  link: string;
  tagBg?: string;
  tagText?: string;
}

/* ─────────── Constants ─────────── */
const MONTH_MAP: Record<string, number> = {
  Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
  Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
};

const ITEMS_PER_PAGE = 9;
const PAGINATION_DELTA = 2;

/* ─────────── Helpers ─────────── */
const parseDate = (date: string): number => {
  if (!date) return 0;
  const [day, month, year] = date.split(" ");
  return new Date(Number(year), MONTH_MAP[month], Number(day)).getTime();
};

const getVisiblePages = (current: number, total: number): (number | string)[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  
  const range: number[] = [];
  for (let i = Math.max(2, current - PAGINATION_DELTA);
       i <= Math.min(total - 1, current + PAGINATION_DELTA);
       i++) {
    range.push(i);
  }
  
  const pages: (number | string)[] = [1];
  if (range[0] > 2) pages.push("...");
  pages.push(...range);
  if (range[range.length - 1] < total - 1) pages.push("...");
  pages.push(total);
  
  return pages;
};

/* ─────────── Component ─────────── */
export default function BeritaClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [rawQuery, setRawQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(rawQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  // Filter & Sort menggunakan initialNews dari Sanity
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return [...initialNews].sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }
    
    const q = searchQuery.toLowerCase().trim();
    return [...initialNews]
      .sort((a, b) => parseDate(b.date) - parseDate(a.date))
      .filter((item) =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
  }, [searchQuery, initialNews]);

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
  const currentPageSafe = Math.min(currentPage, totalPages);
  
  const currentNews = filteredNews.slice(
    (currentPageSafe - 1) * ITEMS_PER_PAGE,
    currentPageSafe * ITEMS_PER_PAGE
  );

  const visiblePages = useMemo(
    () => getVisiblePages(currentPageSafe, totalPages),
    [currentPageSafe, totalPages]
  );

  const goToPage = useCallback((page: number) => setCurrentPage(page), []);
  const goToPrev = useCallback(() => setCurrentPage((p) => Math.max(p - 1, 1)), []);
  const goToNext = useCallback(
    () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
    [totalPages]
  );

  return (
    <main style={{ width: "100%", minHeight: "100vh", backgroundColor: "#FAFAFA", paddingBottom: 120 }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(to bottom, var(--accent-orange-bg) 0%, #FAFAFA 100%)",
          padding: "160px 20px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: "10%",
          width: 300, height: 300, borderRadius: "50%",
          background: "var(--accent-orange-bg)", opacity: 0.8,
          filter: "blur(80px)", zIndex: 0,
        }} />

        <div style={{
          maxWidth: 800, margin: "0 auto",
          display: "flex", flexDirection: "column",
          gap: 16, alignItems: "center",
          position: "relative", zIndex: 1,
        }}>
          <span style={{
            display: "inline-block", background: "#fff",
            color: "var(--accent-orange-text)", padding: "6px 16px",
            borderRadius: 999, fontFamily: "var(--font-heading)",
            fontSize: 12, fontWeight: 800, letterSpacing: 2,
            border: "1px solid var(--accent-orange-border)",
          }}>
            BERITA TERKINI
          </span>

          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(36px,5vw,56px)",
            fontWeight: 800, color: "var(--color-dark-slate)", margin: 0,
          }}>
            Kabar <span style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic", color: "var(--accent-orange-text)",
            }}>Terbaru.</span>
          </h1>

          {/* Search */}
          <div style={{ position: "relative", width: "100%", maxWidth: 420, marginTop: 24 }}>
            <label htmlFor="search-berita" style={{ position: "absolute", left: -9999 }}>
              Cari berita
            </label>
            <input
              id="search-berita"
              type="search"
              placeholder="Cari berita..."
              value={rawQuery}
              onChange={(e) => setRawQuery(e.target.value)}
              style={{
                width: "100%", padding: "16px 48px 16px 24px",
                borderRadius: 999, border: "1px solid var(--accent-orange-border)",
                background: "#fff", outline: "none", fontSize: 15,
              }}
            />
            <span style={{
              position: "absolute", right: 24, top: "50%",
              transform: "translateY(-50%)", pointerEvents: "none",
            }}>
              🔍
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <Link
          href="/"
          style={{
            display: "inline-block", marginBottom: 32,
            color: "var(--color-text-muted)", textDecoration: "none", fontWeight: 700,
          }}
        >
          ← Kembali ke Beranda
        </Link>

        {currentNews.length > 0 ? (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 32,
            }}>
              {currentNews.map((berita, index) => (
                <NewsCard
                  key={berita.id}
                  item={berita}
                  index={index}
                  delay={`${index * 0.05}s`}
                  isVisible={true}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Navigasi halaman"
                style={{
                  display: "flex", justifyContent: "center",
                  alignItems: "center", gap: 12, marginTop: 60, flexWrap: "wrap",
                }}
              >
                <button
                  onClick={goToPrev}
                  disabled={currentPageSafe === 1}
                  aria-label="Halaman sebelumnya"
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: "1px solid #E2E8F0",
                    background: currentPageSafe === 1 ? "#F8FAFC" : "#fff",
                    color: "#0F172A",
                    cursor: currentPageSafe === 1 ? "not-allowed" : "pointer",
                    fontWeight: 700, opacity: currentPageSafe === 1 ? 0.5 : 1,
                  }}
                >
                  ←
                </button>

                {visiblePages.map((page, idx) => (
                  page === "..." ? (
                    <span key={`ellipsis-${idx}`} style={{ color: "#94A3B8", padding: "0 4px" }}>
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page as number)}
                      aria-label={`Halaman ${page}`}
                      aria-current={currentPageSafe === page ? "page" : undefined}
                      style={{
                        width: 44, height: 44, borderRadius: "50%",
                        border: currentPageSafe === page ? "none" : "1px solid #E2E8F0",
                        background: currentPageSafe === page
                          ? "var(--accent-orange-text)" : "#fff",
                        color: currentPageSafe === page ? "#fff" : "#0F172A",
                        fontWeight: 700, cursor: "pointer", transition: ".2s",
                      }}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  onClick={goToNext}
                  disabled={currentPageSafe === totalPages}
                  aria-label="Halaman berikutnya"
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: "1px solid #E2E8F0",
                    background: currentPageSafe === totalPages ? "#F8FAFC" : "#fff",
                    color: "#0F172A",
                    cursor: currentPageSafe === totalPages ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    opacity: currentPageSafe === totalPages ? 0.5 : 1,
                  }}
                >
                  →
                </button>
              </nav>
            )}
          </>
        ) : (
          <div style={{
            textAlign: "center", padding: "70px 20px",
            background: "#fff", borderRadius: 24, border: "1px dashed #CBD5E1",
          }}>
            <h3 style={{ marginBottom: 10, color: "#0F172A" }}>
              Tidak ada berita ditemukan
            </h3>
            <p style={{ color: "#64748B", margin: 0 }}>
              {searchQuery
                ? `Tidak ada hasil untuk "${searchQuery}". Coba gunakan kata kunci lain.`
                : "Belum ada berita yang tersedia."}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <section style={{
        marginTop: 80, padding: "60px 20px",
        background: "#fff", borderTop: "1px solid #E2E8F0",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <h3 style={{
              margin: 0, marginBottom: 8, fontSize: 24,
              fontWeight: 800, color: "var(--color-dark-slate)",
              fontFamily: "var(--font-heading)",
            }}>
              Total Berita
            </h3>
            <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 15 }}>
              Menampilkan <strong>{currentNews.length}</strong> dari{" "}
              <strong>{filteredNews.length}</strong> berita
              {searchQuery && ` (pencarian: "${searchQuery}")`}
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{
              padding: "12px 20px", background: "var(--accent-orange-bg)",
              color: "var(--accent-orange-text)", borderRadius: 999, fontWeight: 700,
            }}>
              Halaman {currentPageSafe} / {totalPages}
            </div>
            <div style={{
              padding: "12px 20px", background: "#F8FAFC",
              border: "1px solid #E2E8F0", borderRadius: 999,
              fontWeight: 700, color: "#334155",
            }}>
              {initialNews.length} Artikel
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}