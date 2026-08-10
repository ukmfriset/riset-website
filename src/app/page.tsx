import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import KaryaSection from '../components/sections/KaryaSection';
import NewsSection from '../components/sections/NewsSection';
import BenefitSection from '../components/sections/BenefitSection';
import AchievementSection from '../components/sections/AchievementSection';
import TeamSection from '../components/sections/TeamSection';
import CtaSection from '../components/sections/CtaSection';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

// 1. Import Sanity client
import { client } from '@/sanity/client'; 

// 2. Fungsi untuk menarik 4 berita terbaru dari Sanity (content ditambahkan agar excerpt otomatis bisa diekstrak jika kosong)
async function getLatestNews() {
  const query = `*[_type == "news"] | order(date desc)[0...4] {
    "id": slug.current,
    "slug": slug.current,
    title,
    date,
    author,
    role,
    category,
    "image": image.asset->url,
    excerpt,
    content,
    "link": "/berita/" + slug.current
  }`;
  
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

// 3. Fungsi untuk menarik data prestasi dari Sanity
async function getPrestasiData() {
  const query = `*[_type == "prestasi"] | order(date desc) {
    _id,
    badge,
    title,
    name,
    info
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

// 4. Fungsi untuk menarik data pengurus (team) dari Sanity
async function getTeamData() {
  const query = `*[_type == "team"] {
    nama,
    jabatan,
    divisi,
    prodi,
    isCo
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

// 5. Komponen Home sebagai async component
export default async function Home() {
  // 6. Ambil semua data (Berita, Prestasi, Team) secara paralel agar cepat
  const [latestNews, prestasiData, teamData] = await Promise.all([
    getLatestNews(),
    getPrestasiData(),
    getTeamData()
  ]);

  return (
    <>
      <SpeedInsights />
      <Analytics />
      <main>
        <Hero />
        <AboutSection />
        
        {/* Masukkan data prestasi ke props */}
        <AchievementSection prestasiList={prestasiData} />
        
        <KaryaSection />
        
        {/* Masukkan data berita ke props */}
        <NewsSection newsList={latestNews} />
        
        <BenefitSection />
        
        {/* Masukkan data team ke props sanityTeam */}
        <TeamSection sanityTeam={teamData} />
        
        <CtaSection />
      </main>
    </>
  );
}