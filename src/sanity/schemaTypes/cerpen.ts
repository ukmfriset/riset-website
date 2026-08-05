export default {
  name: 'cerpen',
  type: 'document',
  title: 'Cerita Pendek (Cerpen)',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Judul Cerpen',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'ID Cerpen (Slug)',
      options: { source: 'title', maxLength: 200 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      type: 'string',
      title: 'Penulis / Pengarang',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'editor',
      type: 'string',
      title: 'Editor',
    },
    {
      name: 'date',
      type: 'string',
      title: 'Tanggal (Misal: 20 Maret 2024)',
    },
    {
      name: 'source',
      type: 'url',
      title: 'Sumber Link Asli',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Gambar Ilustrasi',
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
      title: 'Isi Cerpen',
      of: [{ type: 'block' }]
    }
  ]
}