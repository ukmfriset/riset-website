import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop"; // ✅ 1. Import komponen BackToTop

export const metadata = {
  title: "UKM-F RISET FISIB UTM - #SemangatBerkarya",
  description: "Platform Kreatif untuk Minat Penelitian dan Penalaran di FISIB Universitas Trunojoyo Madura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body 
        style={{ margin: 0, padding: 0, overflowX: 'hidden', width: '100%' }} 
        suppressHydrationWarning={true}
      >
        {/* Navigasi Utama Atas */}
        <Navbar />
        
        {/* Konten Halaman Utama */}
        <main>{children}</main>
        
        {/* Footer 4 Kolom Hitam Premium */}
        <Footer />

        {/* ✅ 2. Tombol Back to Top Global (Muncul di semua halaman otomatis) */}
        <BackToTop />
      </body>
    </html>
  );
}