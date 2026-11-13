<script setup>
import { ref, reactive, computed } from "vue"

const judul = ref("")
const kategori = ref("")
const sudahSelesai = ref(false)

const daftarBuku = reactive([])

const categories = ["Fiksi", "Non-Fiksi", "Sains", "Teknologi", "Sejarah"]

function tambahBuku() {
  if (judul.value.trim() && kategori.value) {
    daftarBuku.push({
      id: Date.now(),
      judul: judul.value,
      kategori: kategori.value,
      sudahSelesai: sudahSelesai.value
    })
    // Reset form
    judul.value = ""
    kategori.value = ""
    sudahSelesai.value = false
  }
}

function hapusBuku(id) {
  const index = daftarBuku.findIndex(b => b.id === id)
  if (index !== -1) daftarBuku.splice(index, 1)
}

const totalSelesai = computed(() => {
  return daftarBuku.filter(b => b.sudahSelesai).length
})
</script>

<template>
  <div class="container">
    <h2>Aplikasi Buku Catatan</h2>
    <div class="input-group">
      <input v-model="judul" placeholder="Masukkan judul buku..." />
      <select v-model="kategori">
        <option value="" disabled>Pilih Kategori</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <label>
        <input type="checkbox" v-model="sudahSelesai" /> Selesai Dibaca
      </label>
      <button @click="tambahBuku">Tambah ke Daftar</button>
    </div>

    <div class="info">
      <p>Jumlah buku selesai dibaca: <strong>{{ totalSelesai }}</strong></p>
    </div>

    <ul>
      <li v-for="buku in daftarBuku" :key="buku.id" :class="{ coret: buku.sudahSelesai }">
        {{ buku.judul }} ({{ buku.kategori }})
        <div>
          <input type="checkbox" v-model="buku.sudahSelesai" />
          <button class="btn-hapus" @click="hapusBuku(buku.id)">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container { max-width: 600px; margin: 2rem auto; font-family: Arial, sans-serif; }
.input-group { display: flex; flex-direction: column; gap: 1rem; border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
.input-group input, .input-group select { padding: 0.5rem; }
.input-group button { background-color: #42b883; color: white; border: none; padding: 0.7rem; cursor: pointer; border-radius: 4px; }
.info { margin-top: 1rem; font-size: 1.1rem; }
ul { list-style: none; padding: 0; margin-top: 1rem; }
li { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; border-bottom: 1px solid #eee; background: #f9f9f9; margin-bottom: 0.5rem; border-radius: 4px; }
.coret { text-decoration: line-through; color: gray; background: #f0f0f0; }
.btn-hapus { margin-left: 10px; background: #ff4d4d; color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; }
</style>
