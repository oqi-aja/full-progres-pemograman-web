<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<template>
  <section>
    <h1>Keranjang Belanja</h1>
    <p v-if="!cart.items.length">Keranjang masih kosong.</p>
    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <span>{{ item.name }} x {{ item.quantity }}</span>
        <span>Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</span>
        <button @click="cart.removeFromCart(item.id)">Hapus</button>
      </div>
      <h3>Total item: {{ cart.totalItems }}</h3>
      <h2>Total: Rp {{ cart.totalPrice.toLocaleString('id-ID') }}</h2>
    </div>
  </section>
</template>
