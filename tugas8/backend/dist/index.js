import { serve } from '@hono/node-server';
import { Hono } from 'hono';
const inventaris = [
    { id: 1, nama: 'Komputer Laboratorium 01', kategori: 'komputer', jumlah: 20, kondisi: 'Baik', lokasi: 'Lab Komputer' },
    { id: 2, nama: 'Proyektor Epson EB-X06', kategori: 'proyektor', jumlah: 2, kondisi: 'Baik', lokasi: 'Ruang Multimedia' },
    { id: 3, nama: 'Switch TP-Link 24 Port', kategori: 'switch', jumlah: 4, kondisi: 'Baik', lokasi: 'Ruang Server' },
    { id: 4, nama: 'Router MikroTik RB4011', kategori: 'router', jumlah: 2, kondisi: 'Perlu pemeriksaan', lokasi: 'Ruang Server' }
];
const app = new Hono();
app.get('/', (c) => c.json({ message: 'API Inventaris Laboratorium' }));
app.get('/api/inventaris', (c) => c.json(inventaris));
app.get('/api/inventaris/:id', (c) => {
    const item = inventaris.find((barang) => barang.id === Number(c.req.param('id')));
    return item ? c.json(item) : c.json({ message: 'Barang tidak ditemukan' }, 404);
});
app.post('/api/inventaris', async (c) => {
    const body = await c.req.json();
    const required = ['nama', 'kategori', 'jumlah', 'kondisi', 'lokasi'];
    if (required.some((field) => body[field] === undefined || body[field] === '')) {
        return c.json({ message: 'Field nama, kategori, jumlah, kondisi, dan lokasi wajib diisi' }, 400);
    }
    if (!['komputer', 'proyektor', 'switch', 'router'].includes(body.kategori)) {
        return c.json({ message: 'Kategori harus komputer, proyektor, switch, atau router' }, 400);
    }
    const item = {
        id: Math.max(...inventaris.map((barang) => barang.id), 0) + 1,
        nama: body.nama,
        kategori: body.kategori,
        jumlah: Number(body.jumlah),
        kondisi: body.kondisi,
        lokasi: body.lokasi
    };
    inventaris.push(item);
    return c.json(item, 201);
});
serve({ fetch: app.fetch, port: 3000 }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
