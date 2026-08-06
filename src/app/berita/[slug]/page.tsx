import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react'; // 👈 Import komponen perender Rich-Text

// Fungsi untuk mengambil data satu berita berdasarkan slug
async function getNewsDetail(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0] {
    title,
    date,
    author,
    role,
    category,
    "image": image.asset->url,
    excerpt,
    content
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

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAFAFA', padding: '160px 20px 120px' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Tombol Kembali */}
        <Link 
          href="/berita"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--color-brand-orange)',
            textDecoration: 'none',
            width: 'fit-content'
          }}
        >
          ← Kembali ke Berita
        </Link>

        {/* Header Berita */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, color: 'var(--color-dark-slate)' }}>
              {news.category}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {news.date}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--color-dark-slate)', lineHeight: 1.2, margin: 0 }}>
            {news.title}
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', padding: '16px 0', marginTop: '8px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--color-dark-slate)' }}>
              {news.author || "Tim Infokom"}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {news.role || "Media & Publikasi"}
            </span>
          </div>
        </div>

        {/* Gambar Utama */}
        {news.image && (
          <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
            <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Konten Berita (Menggunakan PortableText) */}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8, color: 'var(--color-dark-slate)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {news.excerpt && (
            <p style={{ fontWeight: 600, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
              {news.excerpt}
            </p>
          )}

          {/* ⚠️ Render konten rich text dari Sanity */}
          {news.content ? (
            <PortableText value={news.content} />
          ) : (
            <p>Belum ada isi konten.</p>
          )}
        </div>

      </article>
    </main>
  );
}