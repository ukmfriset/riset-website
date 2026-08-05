export default {
  name: 'prestasi',
  type: 'document',
  title: 'Prestasi',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Nama Prestasi / Penghargaan',
      description: 'Contoh: Juara 1 Lomba Poster Tingkat Internasional',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'name',
      type: 'string',
      title: 'Nama Penerima',
      description: 'Contoh: Lia Nur Khasanah',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'badge',
      type: 'string',
      title: 'Tingkat Prestasi (Badge Emoji)',
      description: 'Contoh: 🌍 Internasional, 🏅 Nasional, 🎓 Kampus',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'info',
      type: 'string',
      title: 'Keterangan Tambahan',
      initialValue: 'UKM-F Riset FISIB UTM'
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Tanggal / Waktu Diraih',
      description: 'Penting untuk mengurutkan agar prestasi terbaru muncul paling awal.'
    }
  ]
}