export default {
  name: 'essay',
  type: 'document',
  title: 'Essay',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Judul Essay',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'ID Essay (Slug)',
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
    },
    {
      name: 'date',
      type: 'string',
      title: 'Tanggal (Misal: 15 Februari 2024)',
    },
    {
      name: 'source',
      type: 'url',
      title: 'Sumber Link Asli',
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
      title: 'Isi Essay',
      of: [{ type: 'block' }]
    }
  ]
}