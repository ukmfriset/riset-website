import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pk9ax0m4', // 👈 Menggunakan environment variable atau fallback yang benar
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Gunakan 'false' agar setiap update berita langsung muncul
});