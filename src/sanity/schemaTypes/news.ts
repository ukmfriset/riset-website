export default {
  name: 'news',
  type: 'document',
  title: 'Berita',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Judul Berita',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'ID Berita (Slug)',
      description: 'Ini akan menggantikan "id" dan "link" di data lamamu.',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      type: 'string',
      title: 'Tanggal (Misal: 10 Januari 2023)',
      // Menggunakan string agar formatnya persis dengan data statis lamamu
    },
    {
      name: 'author',
      type: 'string',
      title: 'Penulis',
      initialValue: 'Tim Infokom' // Nilai default berdasarkan datamu
    },
    {
      name: 'role',
      type: 'string',
      title: 'Peran',
      initialValue: 'Media & Publikasi'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Kategori',
      initialValue: 'Berita Acara'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Gambar Utama',
      options: { hotspot: true }
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Kutipan Pendek (Excerpt)',
      rows: 3
    },
    {
      name: 'content',
      type: 'array',
      title: 'Isi Berita Lengkap',
      of: [{ type: 'block' }] // Mengubah string biasa menjadi Rich-Text Editor (Portable Text)
    }
  ]
}