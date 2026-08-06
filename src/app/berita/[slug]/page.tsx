import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import NewsDetailClient from "@/components/NewsDetailClient";

// Fungsi untuk mengambil data satu berita berdasarkan slug dari Sanity
async function getNewsDetail(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0] {
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
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export default async function NewsDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const news = await getNewsDetail(slug);

  if (!news) {
    notFound();
  }

  // Kirim data ke NewsDetailClient agar tampilannya kembali cantik dan interaktif
  return <NewsDetailClient article={news} />;
}