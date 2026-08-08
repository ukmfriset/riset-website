import { client } from '@/sanity/client';
import KaryaDetailClient from '@/components/KaryaDetailClient';

// Fungsi untuk menarik data dari Sanity berdasarkan kategori (schema) dan slug
async function getSingleKarya(kategori: string, slug: string) {
  // Dalam Sanity, _type umumnya menggunakan huruf kecil (essay, puisi, artikel, cerpen)
  const schemaType = kategori.toLowerCase(); 

  const query = `*[_type == $schemaType && slug.current == $slug][0] {
    "id": slug.current,
    title,
    author,
    date,
    editor,
    source,
    "category": _type, // Kita ambil type untuk dijadikan kategori di Client
    "image": image.asset->url,
    excerpt,
    content,
    // ✅ URL sekarang pakai prefix /karya/
    "link": "/karya/" + _type + "/" + slug.current
  }`;

  const rawData = await client.fetch(query, { schemaType, slug }, {
    next: { revalidate: 60 }
  });

  if (!rawData) return null;

  // Format data sebelum dikirim agar sesuai interface Client
  return {
    ...rawData,
    // Mengubah "puisi" menjadi "Puisi"
    category: rawData.category.charAt(0).toUpperCase() + rawData.category.slice(1), 
    role: "Penulis", // Atau kamu bisa menambahkan schema 'role' jika perlu
  };
}

// ✅ TAMBAHAN: generateStaticParams untuk static export / ISR
// Wajib jika pakai output: 'export' di next.config.js
export async function generateStaticParams() {
  const query = `*[_type in ["essay", "artikel", "cerpen", "puisi"]] {
    "kategori": _type,
    "slug": slug.current
  }`;

  const karyaList = await client.fetch(query);

  return karyaList.map((item: any) => ({
    kategori: item.kategori,
    slug: item.slug,
  }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ kategori: string, slug: string }> }) {
  const resolvedParams = await params;
  const karya = await getSingleKarya(resolvedParams.kategori, resolvedParams.slug);
  if (!karya) return { title: 'Karya Tidak Ditemukan' };

  return {
    title: `${karya.title} - UKM-F Riset`,
    description: karya.excerpt || `Baca selengkapnya karya ${karya.author} di Etalase Karya UKM-F Riset.`,
  };
}

// Page Component
export default async function DetailKaryaPage({ params }: { params: Promise<{ kategori: string, slug: string }> }) {
  // Ambil dan await parameter dari URL dengan aman
  const resolvedParams = await params;
  const { kategori, slug } = resolvedParams;

  // Tarik data karya spesifik
  const dataKarya = await getSingleKarya(kategori, slug);

  // Lempar data ke Client Component
  return <KaryaDetailClient karya={dataKarya} />;
}