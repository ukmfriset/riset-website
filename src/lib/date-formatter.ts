// src/lib/date-formatter.ts (atau letakkan di file helper yang sudah ada)

export function formatIndonesianDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Fallback jika format lama masih string bebas

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}