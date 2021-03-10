<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import './scss/core.scss';

body {
  background: var(--white);
  color: var(--black);
  margin: 0;
}

h1,
h2, h3, h4, h5, h6, p {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button, input {
  font-family: Avenir;
  outline: 0;
}

button {
  cursor: pointer;
}
</style>
