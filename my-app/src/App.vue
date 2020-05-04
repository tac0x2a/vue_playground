<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/pokemon">Pokedex</router-link>
    </nav>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>
      <transition name="viewwww">
        <router-view />
      </transition>
    </p>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
#app {
  margin-top: 60px;
  text-align: center;
}
.viewwww-enter-active {
  transition: opacity 0.5s;
}
.viewwww-enter, .viewwww-leave-to {
  opacity: 0;
}
</style>
