import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'bljieh8z', // 👈 Ganti dengan ID Project Sanity kamu
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Gunakan 'false' agar setiap update berita langsung muncul
});