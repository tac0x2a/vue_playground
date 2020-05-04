import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Pokedex from '@/views/Pokedex.vue'
import Pokemon from '@/views/Pokemon.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/pokemon', component: Pokedex },
    {
      path: '/pokemon/:number(\\d+)',
      component: Pokemon,
      props: route => ({
        number: Number(route.params.number)
      })
    },
  ]
})

export default router