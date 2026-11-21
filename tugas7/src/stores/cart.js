import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((total, item) => total + item.price * item.quantity, 0))

  function addToCart(product) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) existing.quantity += 1
    else items.value.push({ ...product, quantity: 1 })
  }

  function removeFromCart(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart }
})
