import { client } from '@/sanity/client';
import PrestasiClient from '@/components/PrestasiClient';

export const metadata = {
  title: 'Hall of Fame & Prestasi | UKM-F Riset',
  description: 'Rekam jejak perjuangan, dedikasi, dan karya gemilang dari para anggota UKM-F Riset.',
};

async function getPrestasiData() {
  const query = `*[_type == "prestasi"] | order(date desc) {
    _id,
    badge,
    title,
    name,
    info,
    category
  }`;
  
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function PrestasiPage() {
  const prestasiData = await getPrestasiData();

  return <PrestasiClient initialPrestasi={prestasiData} />;
}