import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import puisi from './puisi' 
import artikel from './artikel'
import essay from './essay'
import cerpen from './cerpen'
import prestasi from './prestasi' // 👈 Import schema prestasi
import team from './team';
import ketuaUmum from './ketuaUmum'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, puisi, artikel, essay, cerpen, prestasi, team, ketuaUmum], // 👈 Tambahkan ke array
}