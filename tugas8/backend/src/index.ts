import { Hono } from 'hono'

interface Inventaris {
  id: number
  nama: string
  kategori: 'komputer' | 'proyektor' | 'switch' | 'router'
  jumlah: number
  kondisi: string
  lokasi: string
}

type InventarisBaru = Omit<Inventaris, 'id'>

const inventaris: Inventaris[] = [
  { id: 1, nama: 'Komputer Laboratorium 01', kategori: 'komputer', jumlah: 20, kondisi: 'Baik', lokasi: 'Lab Komputer' },
  { id: 2, nama: 'Proyektor Epson EB-X06', kategori: 'proyektor', jumlah: 2, kondisi: 'Baik', lokasi: 'Ruang Multimedia' },
  { id: 3, nama: 'Switch TP-Link 24 Port', kategori: 'switch', jumlah: 4, kondisi: 'Baik', lokasi: 'Ruang Server' },
  { id: 4, nama: 'Router MikroTik RB4011', kategori: 'router', jumlah: 2, kondisi: 'Perlu pemeriksaan', lokasi: 'Ruang Server' }
]

const app = new Hono()

app.get('/', (c) => c.json({ message: 'API Inventaris Laboratorium', runtime: 'Cloudflare Workers' }))
app.get('/api/inventaris', (c) => c.json(inventaris))

app.get('/api/inventaris/:id', (c) => {
  const item = inventaris.find((barang) => barang.id === Number(c.req.param('id')))
  return item ? c.json(item) : c.json({ message: 'Barang tidak ditemukan' }, 404)
})

app.post('/api/inventaris', async (c) => {
  const body = await c.req.json<Partial<InventarisBaru>>()
  const required = ['nama', 'kategori', 'jumlah', 'kondisi', 'lokasi'] as const

  if (required.some((field) => body[field] === undefined || body[field] === '')) {
    return c.json({ message: 'Field nama, kategori, jumlah, kondisi, dan lokasi wajib diisi' }, 400)
  }
  if (!['komputer', 'proyektor', 'switch', 'router'].includes(body.kategori as string)) {
    return c.json({ message: 'Kategori harus komputer, proyektor, switch, atau router' }, 400)
  }

  const item: Inventaris = {
    id: Math.max(...inventaris.map((barang) => barang.id), 0) + 1,
    nama: body.nama as string,
    kategori: body.kategori as Inventaris['kategori'],
    jumlah: Number(body.jumlah),
    kondisi: body.kondisi as string,
    lokasi: body.lokasi as string
  }
  inventaris.push(item)
  return c.json(item, 201)
})

export default app
