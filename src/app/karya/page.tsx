import { client } from '@/sanity/client';
import KaryaClient from '@/components/KaryaClient';

// Metadata untuk menggantikan tag <Head>
export const metadata = {
  title: 'Etalase Karya | UKM-F Riset',
  description: 'Kumpulan karya tulis, essay, artikel, cerpen, dan puisi dari UKM-F Riset.',
};

async function getAllKarya() {
  // Query ini mengambil dokumen dari 4 schema berbeda sekaligus!
  const query = `*[_type in ["essay", "artikel", "cerpen", "puisi"]] | order(date desc) {
    "slug": slug.current,
    title,
    author,
    date,
    _type, // Menyimpan informasi dari schema mana data ini berasal
    excerpt,
    content
  }`;
  
  const rawData = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  // Format data sebelum dikirim ke Client
  return rawData.map((item: any) => {
    // Ubah "_type" (misal: "puisi") menjadi format Kategori (misal: "Puisi")
    const categoryName = item._type.charAt(0).toUpperCase() + item._type.slice(1);
    
    return {
      slug: item.slug || "no-slug",
      title: item.title || "Tanpa Judul",
      author: item.author || "Anonim",
      date: item.date || "",
      category: categoryName,
      excerpt: item.excerpt || "",
      content: item.content || [],
      // URL dibuat dinamis berdasarkan jenis karyanya
      link: `/${item._type}/${item.slug}` 
    };
  });
}

export default async function KaryaPage() {
  const karyaData = await getAllKarya();

  return <KaryaClient initialKarya={karyaData} />;
}