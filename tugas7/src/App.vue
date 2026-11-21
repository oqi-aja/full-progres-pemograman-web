<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cart'

const cart = useCartStore()
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Katalog</RouterLink>
      <RouterLink to="/cart">Keranjang ({{ cart.totalItems }})</RouterLink>
      <RouterLink to="/books">Buku Catatan</RouterLink>
    </nav>
  </header>
  <main><RouterView /></main>
</template>
