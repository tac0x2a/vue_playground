<template>
  <div>
    <h1>Pokedex</h1>
    <ul>
      <li v-for="{number, name} in pokedex" :key="number">
        <router-link :to="`/pokemon/${number}`">No.{{number}} {{name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Pokedex from '@/api/DummyPokedex.js'

export default {
  computed: {
    pokedex: () => Pokedex.fetchAll()
  }
}
</script>

