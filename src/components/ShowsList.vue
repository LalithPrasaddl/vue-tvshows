<template>
  <div>
    <div v-if="isFetching" class="isFetching">
        <h2>Fetching Shows ...</h2>
    </div>
    <div v-if="items[searchStr] && items[searchStr].length > 0">
      <div class="showsListDesc">
        <h2>{{getDesc()}}</h2>
      </div>
      <Filters :filtersList="filtersList" :selectedFilterItems="selectedFilterItems" @handleFilterSelection="handleSelection" />
      <div class="topPagination paginationWrapper">
        <button v-if="selectedIndex !== 1" @click="handlePagination('decrement')">Prev</button>
        <div>{{selectedIndex}} of {{getFinalIndex}}</div>
        <button v-if="selectedIndex !== getFinalIndex" @click="handlePagination('increment')">Next</button>
      </div>
      <div class="showsListWrapper">
        <show-item v-for="show in getFilteredShows" :show="show" :key="show.showTime"></show-item>
      </div>
      <div class="paginationWrapper">
        <button v-if="selectedIndex !== 1" @click="handlePagination('decrement')">Prev</button>
        <div>{{selectedIndex}} of {{getFinalIndex}}</div>
        <button v-if="selectedIndex !== getFinalIndex" @click="handlePagination('increment')">Next</button>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Filters from './Filters.vue'
import ShowItem from './ShowItem.vue'
import Footer from './Footer.vue'

export default {
  name: 'ShowsList',
  components: {
    Filters,
    ShowItem,
    Footer
  },
  data: function () {
    return {
      selectedFilterItems: {},
      selectedIndex: 1,
      itemsPerPage: 8
    }
  },
  computed: {
    getFilteredShows: function() {
      const startIndex = (this.selectedIndex - 1) * this.itemsPerPage
      const endIndex = this.selectedIndex * this.itemsPerPage
      if(Object.keys(this.selectedFilterItems).length === 0) {
        let selItems = [...this.items[this.searchStr]]
        return selItems.slice(startIndex, endIndex)
      }
      let validShows = []
      let filterKeys = Object.keys(this.selectedFilterItems)
      let currItems = this.items[this.searchStr]
      for(let i = 0; i < currItems.length; i++) {
        let isAdd = true
        const item = currItems[i]
        for(let j = 0; j < filterKeys.length; j++) {
          if(this.selectedFilterItems['runtime'] && this.selectedFilterItems['runtime'].length > 0 && this.selectedFilterItems['runtime'].indexOf(item.runtime) === -1) {
            isAdd = false
          }
          if(this.selectedFilterItems['network'] && this.selectedFilterItems['network'].length > 0 && this.selectedFilterItems['network'].indexOf(item.webChannel) === -1) {
            isAdd = false
          }
          if(this.selectedFilterItems['show_type'] && this.selectedFilterItems['show_type'].length > 0 && this.selectedFilterItems['show_type'].indexOf(item.type) === -1) {
            isAdd = false
          }
          if(this.selectedFilterItems['genre'] && this.selectedFilterItems['genre'].length > 0) {
            if(item.genres && item.genres.length > 0) {
              const genreStr = item.genres.join('')
              let isInvalid = true
              for(let k = 0; k< this.selectedFilterItems['genre'].length; k++) {
                if(genreStr.indexOf(this.selectedFilterItems['genre'][k]) > -1) {
                  isInvalid = false
                }
              }
              if(isInvalid) {
                isAdd = false
              }
            } else {
              isAdd = false
            }
          }
        }
        if(isAdd) {
          validShows.push(item)
        }
      }
      return validShows.slice(startIndex, endIndex)
    },
    getFinalIndex: function() {
      let total = this.getFilteredShows.length
      let haveFilters = false
      if(Object.keys(this.selectedFilterItems).length > 0) {
        const filterKeys = Object.keys(this.selectedFilterItems)
        for(let i = 0; i < filterKeys.length; i++) {
          if(this.selectedFilterItems[filterKeys[i]].length > 0) {
            haveFilters = true
            break
          }
        }
      }
      if(!haveFilters) {
        total = this.items[this.searchStr].length
      }
      return Math.ceil(total / this.itemsPerPage)
    },
    ...mapState('shows', ['items', 'isFetching', 'filtersList', 'searchStr']),
  },
  methods: {
    handleSelection: function(item) {
      let currSelectedFilters = {...this.selectedFilterItems}
      if(currSelectedFilters[item.key]) {
        if(currSelectedFilters[item.key].indexOf(item.value) > -1) {
          const index = currSelectedFilters[item.key].indexOf(item.value)
          currSelectedFilters[item.key].splice(index, 1)
        } else {
          currSelectedFilters[item.key] = [...currSelectedFilters[item.key], item.value]
        }
      } else {
        currSelectedFilters[item.key] = [item.value]
      }
      this.selectedFilterItems = currSelectedFilters
      this.selectedIndex = 1
    },
    getDesc: function() {
      if(this.searchStr !== '||') {
        return 'Showing list of shows for ' + this.searchStr
      }
      return 'Showing list of top shows airing today in US'
    },
    handlePagination: function(type) {
      if(type === 'increment') {
        this.selectedIndex = this.selectedIndex + 1
      } else {
        this.selectedIndex = this.selectedIndex - 1
      }
    },
    ...mapActions('shows', {
      fetchShows: 'fetchShows'
    }),
  },
  created() {
    if(this.searchStr === '||') {
      this.fetchShows()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showsListDesc {
  margin: 1rem 2rem 0;
  padding-bottom: .5rem;
  border-bottom: 1px solid var(--lightblack);
}
.isFetching {
  position: absolute;
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: var(--white);
  opacity: .75;
}
.showsListWrapper {
  display: flex;
  flex-direction: row;
  padding: 2rem 1rem;
  flex-wrap: wrap;
}
.paginationWrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
.paginationWrapper > div {
  font-weight: bold;
  font-size: 1.2rem;
}
.paginationWrapper button {
  text-decoration: underline;
  background: transparent;
  font-weight: 700;
  border: 0;
  margin: 0 .75rem;
}
.topPagination {
  padding-top: 1rem;
  padding-bottom: 0;
}
</style>
