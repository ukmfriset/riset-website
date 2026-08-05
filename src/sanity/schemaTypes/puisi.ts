export default {
  name: 'puisi',
  type: 'document',
  title: 'Puisi',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Judul Puisi',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'ID Puisi (Slug)',
      options: {
        source: 'title',
        maxLength: 200,
      },
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
      description: 'Kosongkan jika tidak ada editor.',
    },
    {
      name: 'date',
      type: 'string',
      title: 'Tanggal (Misal: 23 Juni 2021)',
    },
    {
      name: 'source',
      type: 'url',
      title: 'Sumber Link Asli',
      description: 'URL ke website sumber asli (jika ada).',
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Kutipan Pendek (Excerpt)',
      rows: 3,
    },
    {
      name: 'content',
      type: 'array',
      title: 'Isi Puisi',
      of: [{ type: 'block' }], 
      description: 'Gunakan Shift + Enter untuk membuat baris baru tanpa jarak paragraf (sangat penting untuk format puisi).'
    }
  ]
}