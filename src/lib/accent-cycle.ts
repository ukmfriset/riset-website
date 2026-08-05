export const ACCENT_CYCLE = [
  { bg: "var(--accent-gray-bg)", border: "var(--accent-gray-border)", text: "var(--accent-gray-text)" },
  { bg: "var(--accent-yellow-bg)", border: "var(--accent-yellow-border)", text: "var(--accent-yellow-text)" },
  { bg: "var(--accent-blue-bg)", border: "var(--accent-blue-border)", text: "var(--accent-blue-text)" },
  { bg: "var(--accent-purple-bg)", border: "var(--accent-purple-border)", text: "var(--accent-purple-text)" },
] as const;

// Menambahkan parameter 'offset' agar section bisa mulai dari warna yang berbeda
export function getAccentColor(index: number, offset: number = 0) {
  return ACCENT_CYCLE[(index + offset) % ACCENT_CYCLE.length];
}

/**
 * FUNGSI BARU:
 * Menghasilkan warna yang sama (konsisten) berdasarkan input teks (misal: kategori atau tag).
 * Cara kerjanya dengan menghitung nilai karakter (hash), lalu mengubahnya menjadi index.
 */
export function getAccentColorByString(text: string) {
  // Jika teks kosong/tidak ada, kembalikan warna default (abu-abu)
  if (!text) return ACCENT_CYCLE[0];
  
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash += text.charCodeAt(i);
  }
  
  // Masukkan hasil hitungan hash ke fungsi getAccentColor yang sudah ada
  return getAccentColor(hash);
}