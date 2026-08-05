export default {
  name: 'ketuaUmum',
  type: 'document',
  title: 'Daftar Ketua Umum',
  fields: [
    {
      name: 'tahun',
      type: 'string',
      title: 'Tahun Periode',
      description: 'Contoh: 2027',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'nama',
      type: 'string',
      title: 'Nama Lengkap',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'prodi',
      type: 'string',
      title: 'Program Studi',
      description: 'Contoh: Sosiologi, Psikologi, Ilmu Komunikasi, Sastra Inggris',
      validation: (Rule: any) => Rule.required()
    }
  ]
}