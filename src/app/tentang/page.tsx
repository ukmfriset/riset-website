import { client } from '@/sanity/client';
import TentangKamiClient from '@/components/TentangKamiClient';

export const metadata = {
  title: 'Tentang Kami | UKM-F Riset',
  description: 'Kenali lebih dekat sejarah, filosofi logo, visi misi, dan daftar Ketua Umum UKM-F Riset.',
};

async function getKetuaUmumData() {
  // Mengambil data ketua umum dari Sanity dan diurutkan berdasarkan tahun
  const query = `*[_type == "ketuaUmum"] | order(tahun asc) {
    _id,
    tahun,
    nama,
    prodi
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function TentangKamiPage() {
  const sanityKetua = await getKetuaUmumData();

  return <TentangKamiClient sanityKetua={sanityKetua} />;
}