// 1. DATA TRANSAKSI BELANJA
const transaksi = [
    {
        id: 1,
        barang: "Buku",
        harga: 15000,
        qty: 2,
        kategori: "Alat Tulis"
    },
    {
        id: 2,
        barang: "Pensil",
        harga: 3000,
        qty: 5,
        kategori: "Alat Tulis"
    },
    {
        id: 3,
        barang: "Mouse",
        harga: 75000,
        qty: 1,
        kategori: "Elektronik"
    },
    {
        id: 4,
        barang: "Keyboard",
        harga: 120000,
        qty: 1,
        kategori: "Elektronik"
    },
    {
        id: 5,
        barang: "Penghapus",
        harga: 2000,
        qty: 3,
        kategori: "Alat Tulis"
    },
    {
        id: 6,
        barang: "Headset",
        harga: 50000,
        qty: 2,
        kategori: "Elektronik"
    }
];

// 2. MENENTUKAN KATEGORI YANG AKAN DIPROSES
const kategoriDipilih = "Alat Tulis"; // Kategori transaksi yang akan ditampilkan.

// 3. FILTER: MENYARING TRANSAKSI BERDASARKAN KATEGORI
const transaksiTerpilih = transaksi.filter( // Membuat array berisi transaksi terpilih.
    ({ kategori }) => kategori === kategoriDipilih // Memilih transaksi dengan kategori yang cocok.
);

// 4. MAP: MENGHITUNG SUBTOTAL SETIAP BARANG
const hasilSubtotal = transaksiTerpilih.map( // Membuat data transaksi baru dengan subtotal.
    ({ id, barang, harga, qty, kategori }) => ({ // Mengambil properti yang diperlukan dari transaksi.
        id,                         // Menyalin identitas transaksi.
        barang,                     // Menyalin nama barang.
        harga,                      // Menyalin harga satuan.
        qty,                        // Menyalin jumlah barang.
        kategori,                   // Menyalin kategori barang.
        subtotal: harga * qty       // Menghitung harga dikali jumlah barang.
    })
);

// 5. REDUCE: MENGHITUNG TOTAL KESELURUHAN
const totalBelanja = hasilSubtotal.reduce( // Menjumlahkan seluruh subtotal transaksi.
    (total, { subtotal }) => total + subtotal, // Menambahkan subtotal ke akumulator.
    0 // Nilai awal akumulator sebelum penjumlahan.
);

// 6. MENAMPILKAN HASIL
console.log("==================================");
console.log("       LAPORAN BELANJA"); 
console.log("=================================="); 

console.log("Kategori:", kategoriDipilih); // Menampilkan kategori yang dipilih.
console.log("Jumlah transaksi:", hasilSubtotal.length); // Menampilkan jumlah transaksi terpilih.
console.log("----------------------------------"); 

hasilSubtotal.forEach( // Menampilkan rincian setiap transaksi.
    ({ barang, harga, qty, subtotal }) => {                                 // Mengambil data yang akan ditampilkan.
        console.log(`Barang   : ${barang}`);                                // Menampilkan nama barang.
        console.log(`Harga    : Rp${harga.toLocaleString("id-ID")}`);        // Menampilkan harga berformat Indonesia.
        console.log(`Qty      : ${qty}`);                                   // Menampilkan jumlah barang.
        console.log(`Subtotal : Rp${subtotal.toLocaleString("id-ID")}`);    // Menampilkan subtotal berformat Indonesia.
        console.log("----------------------------------");                  // Garis pemisah antartransaksi.
    }
);

console.log( // Menampilkan total keseluruhan belanja.
    `TOTAL BELANJA: Rp${totalBelanja.toLocaleString("id-ID")}`              // Memformat total dengan format angka Indonesia.
);

console.log("==================================");