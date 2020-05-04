import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    {
      path: '/product/:id(\\d+)',
      component: Product,
      props: r => ({
        pid: Number(r.params.id),
        qid: Number(r.query.id),
      })
    },
  ]
})

export default router