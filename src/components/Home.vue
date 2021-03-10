<template>
<div>
  <Header />
  <ShowsList />
  <Footer />
</div>
</template>

<script>
import Header from './Header.vue'
import ShowsList from './ShowsList.vue'

export default {
  name: 'Home',
  components: {
    Header,
    ShowsList
  }
}
</script>

<style>

</style>
