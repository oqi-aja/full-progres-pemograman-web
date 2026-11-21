<script setup>
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'
import laptopImage from '../assets/laptop.jpeg'
import handphoneImage from '../assets/handphone.jpeg'
import smartwatchImage from '../assets/smartwatch.jpeg'

const cart = useCartStore()
const products = [
  { id: 1, name: 'Laptop Pro', description: 'Laptop cepat untuk produktivitas.', price: 12500000, image: laptopImage },
  { id: 2, name: 'Handphone Wireless', description: 'Handphone modern dengan performa cepat.', price: 850000, image: handphoneImage },
  { id: 3, name: 'Smartwatch Active', description: 'Pantau aktivitas harian Anda.', price: 1750000, image: smartwatchImage }
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
