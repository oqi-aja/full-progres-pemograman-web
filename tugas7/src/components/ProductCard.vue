<script setup>
defineProps({ product: Object })
const emit = defineEmits(['buy'])
</script>

<template>
  <article class="product-card">
    <img class="product-image" :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <strong>Rp {{ product.price.toLocaleString('id-ID') }}</strong>
    <button @click="emit('buy', product)">Beli</button>
  </article>
</template>
