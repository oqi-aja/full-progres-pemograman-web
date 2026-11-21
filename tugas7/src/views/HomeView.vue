<script setup>
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const products = [
  { id: 1, name: 'Laptop Pro', description: 'Laptop cepat untuk produktivitas.', price: 12500000, icon: '??' },
  { id: 2, name: 'Headphone Wireless', description: 'Suara jernih tanpa kabel.', price: 850000, icon: '??' },
  { id: 3, name: 'Smartwatch Active', description: 'Pantau aktivitas harian Anda.', price: 1750000, icon: '?' }
]
</script>

<template>
  <section>
    <h1>Katalog Produk</h1>
    <p>Pilih produk lalu tambahkan ke keranjang.</p>
    <div class="products">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @buy="cart.addToCart" />
    </div>
  </section>
</template>
