import { client } from '@/sanity/client';
import BeritaClient from '@/components/BeritaClient';

export const metadata = {
  title: 'Berita Terkini | Kabar Terbaru',
  description: 'Kumpulan berita dan artikel terbaru UKM-F Riset.',
};

async function getAllNews() {
  const query = `*[_type == "news"] | order(date desc) {
    "id": slug.current,
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
  
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  
  return data.map((item: any) => ({
    ...item,
    author: item.author || "Tim Infokom",
    role: item.role || "Media & Publikasi",
    category: item.category || "Berita Acara",
    excerpt: item.excerpt || "",
  }));
}

export default async function BeritaPage() {
  const newsData = await getAllNews();

  return <BeritaClient initialNews={newsData} />;
}