<template>
  <div>
    <div v-if="pokemon">
      <h1>No. {{pokemon.number}} {{pokemon.name}}</h1>
      <h2>体長:{{pokemon.height}}[m] 重さ:{{pokemon.weight}}[kg]</h2>
      <h2>タイプ</h2>
      <p v-for="type in pokemon.types" :key="type">{{type}}</p>
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<script>
import Pokedex from '@/api/DummyPokedex.js'

export default {
  props: {number: Number},
  data(){
    console.log("data() No." + this.number)
    return {pokemon: null}
  },
  watch: {
    number: {
      handler(){
        console.log("handler No." + this.number)
        // this.pokemon = Pokedex.findFirst(this.number)
        Pokedex.asyncFindFirst(this.number, pokemon => {
          this.pokemon = pokemon
        })
      }, immediate: true
    }
  }
}
</script>

