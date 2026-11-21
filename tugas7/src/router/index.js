import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import BukuCatatan from '../components/BukuCatatan.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/cart', component: CartView },
    { path: '/books', component: BukuCatatan }
  ]
})
