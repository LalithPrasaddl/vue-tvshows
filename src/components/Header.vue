<template>
  <div class="header">
    <h1>TV Shows</h1>
    <div class="searchWrapper" v-if="!hideSearch">
      <input type="text" v-model="searchText" v-on:keyup.enter="handleSearch" placeholder="Search Shows" />
      <button @click="handleSearch">Search</button>
    </div>
    <div v-if="hideSearch" class="searchWrapper">
      <a href="#/">Home</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  props: ['hideSearch'],
  data: function() {
    return {
      searchText: ''
    }
  },
  methods: {
    handleSearch: function() {
      this.fetchShows(this.searchText || '||')
    },
    ...mapActions('shows', {
      fetchShows: 'fetchShows'
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  background-color: var(--black);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
}
.header h1 {
  flex: 1;
  text-align: right;
}
.header .searchWrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.header .searchWrapper input {
  border: 1px solid var(--lightblack);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: .5rem;
  min-width: 15rem;
}
.header .searchWrapper button {
  border: 1px solid var(--lightblack);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: .5rem;
  margin-right: 2rem;
}

.header .searchWrapper a {
  color: var(--white);
  margin-right: 2rem;
  font-weight: bold;
}
</style>
