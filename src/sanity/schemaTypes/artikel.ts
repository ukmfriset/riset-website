export default {
  name: 'artikel',
  type: 'document',
  title: 'Artikel',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Judul Artikel',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'ID Artikel (Slug)',
      options: { source: 'title', maxLength: 200 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      type: 'string',
      title: 'Penulis',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'editor',
      type: 'string',
      title: 'Editor',
      description: 'Kosongkan jika tidak ada editor.'
    },
    {
      name: 'date',
      type: 'string',
      title: 'Tanggal (Misal: 10 Januari 2024)',
    },
    {
      name: 'source',
      type: 'url',
      title: 'Sumber Link Asli',
      description: 'Isi jika artikel ini dipublikasikan dari sumber/website lain.'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Gambar Sampul',
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
      title: 'Isi Artikel',
      of: [{ type: 'block' }]
    }
  ]
}