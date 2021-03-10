<template>
  <div class="filtersWrapper">
    <div class="filtersItemSection">
      <h3>Filters</h3>
      <div class="filterItemsWrapper">
        <div v-for="item in filtersList" :key="item.name">
            <button @click="updateSelectedFilter(item.key)" :class="{selected: item.key === selectedFilter}">{{item.name}}</button>
        </div>
      </div>
    </div>
    <div v-if="filtersList[selectedFilter]" class="filterOptionsWrapper">
        <button
          :class="{selected: selectedFilterItems[selectedFilter] && selectedFilterItems[selectedFilter].indexOf(item) > -1}"
          v-for="item in filtersList[selectedFilter].items"
          :key="item"
          @click="onFilterItemClick(item)">
          {{item}} <span v-if="selectedFilter === 'runtime'"> mins</span>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: ['filtersList', 'selectedFilterItems'],
  data: function() {
    return {
      selectedFilter: ''
    }
  },
  methods: {
    updateSelectedFilter(key) {
      if(this.selectedFilter === key) {
        this.selectedFilter = ''
      } else {
        this.selectedFilter = key
      }
    },
    onFilterItemClick(value) {
      this.$emit('handleFilterSelection', {
        key: this.selectedFilter,
        value: value
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filtersWrapper {
  margin: 0 2rem 0;
  padding: .5rem 0;
  border-bottom: 1px solid var(--lightblack);
}
.filtersItemSection {
  display: flex;
  flex-direction: column;
}
.filtersItemSection h3 {
  padding-bottom: .5rem;
  text-decoration: underline;
}
.filterItemsWrapper {
  display: flex;
  /* margin-left: .25rem; */
}
.filterItemsWrapper button {
  background: var(--white);
  color: var(--black);
  border-radius: 5px;
  padding: .5rem .75rem;
  margin: 0 .25rem;
  border: 1px solid var(--lightblack);
  font-weight: bold;
}
.filterItemsWrapper button.selected {
  background: var(--blue);
  color: var(--white);
}
.filterOptionsWrapper {
  display: flex;
  padding-top: .5rem;
  margin-top: .5rem;
}

.filterOptionsWrapper button {
  background: var(--black);
  color: var(--white);
  padding: .25rem 1.5rem;
  margin: 0 .25rem;
  border-radius: 5px;
  border: 1px solid var(--lightblack);
}

.filterOptionsWrapper button.selected {
  background: var(--blue);
}
</style>
