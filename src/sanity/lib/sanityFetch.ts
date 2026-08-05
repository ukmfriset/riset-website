import { client } from '@/sanity/client';

export async function getNewsData() {
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
    tagBg,
    tagText,
    "link": "/berita/" + slug.current
  }`;
  
  return await client.fetch(query);
}