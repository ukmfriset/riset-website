// Lokasi: src/sanity/queries.ts

import { client } from './client';

export async function getPuisiData() {
  const query = `*[_type == "puisi"] | order(date desc) {
    "id": slug.current,
    title,
    author,
    editor,
    date,
    source,
    excerpt,
    content,
    "link": "/puisi/" + slug.current
  }`;
  
  return await client.fetch(query, {}, {
    next: { revalidate: 60 }
  });
}

// Nanti kamu juga bisa menambahkan getNewsData(), getCerpenData(), dll di file ini.