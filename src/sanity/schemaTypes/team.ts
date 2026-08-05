export default {
  name: 'team',
  type: 'document',
  title: 'Pengurus (Team)',
  fields: [
    {
      name: 'nama',
      type: 'string',
      title: 'Nama Lengkap',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'jabatan',
      type: 'string',
      title: 'Jabatan',
      description: 'Contoh: Ketua Umum, Anggota POSDM, dll',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'divisi',
      type: 'string',
      title: 'Divisi / Departemen',
      options: {
        list: [
          { title: 'BPH', value: 'BPH' },
          { title: 'POSDM', value: 'POSDM' },
          { title: 'LITBANG', value: 'LITBANG' },
          { title: 'EDUKASI', value: 'EDUKASI' },
          { title: 'INFOKOM', value: 'INFOKOM' },
          { title: 'KWU', value: 'KWU' },
          { title: 'PR', value: 'PR' },
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'prodi',
      type: 'string',
      title: 'Program Studi',
      description: 'Contoh: Psikologi, Ilmu Komunikasi, Sastra Inggris, Sosiologi'
    },
    {
      name: 'isCo',
      type: 'boolean',
      title: 'Apakah Pengurus Inti / CO?',
      initialValue: false
    },
    {
      name: 'periode',
      type: 'string',
      title: 'Periode Kepengurusan',
      description: 'Contoh: 2026 atau 2027',
      initialValue: '2026'
    }
  ]
}