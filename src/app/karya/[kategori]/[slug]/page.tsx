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
    "link": "/" + _type + "/" + slug.current
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

// Konfigurasi Metadata untuk SEO
export async function generateMetadata({ params }: { params: { kategori: string, slug: string } }) {
  const karya = await getSingleKarya(params.kategori, params.slug);
  if (!karya) return { title: 'Karya Tidak Ditemukan' };
  
  return {
    title: `${karya.title} - UKM-F Riset`,
    description: karya.excerpt || `Baca selengkapnya karya ${karya.author} di Etalase Karya UKM-F Riset.`,
  };
}

export default async function DetailKaryaPage({ params }: { params: { kategori: string, slug: string } }) {
  // Ambil parameter dari URL
  const { kategori, slug } = params;
  
  // Tarik data karya spesifik
  const dataKarya = await getSingleKarya(kategori, slug);

  // Lempar data ke Client Component
  return <KaryaDetailClient karya={dataKarya} />;
}