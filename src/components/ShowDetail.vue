<template>
  <div>
    <Header hideSearch="true" />
    <div v-if="!showId">Do not have a Show Id</div>
    <div v-if="showId && item" class="showDetailWrapper">
      <div class="imageWrapper"><img :src="item.imageUrl" /></div>
      <div class="showDets">
        <div class="caption">
          <div>{{item.language}}</div>
          <div>{{item.type}}</div>
          <div>{{item.status}}</div>
          <div>{{item.runtime}} mins</div>
        </div>
        <h1>{{item.name}}</h1>
        <p class="showSummary" v-html="item.summary" />
        <div class="genreWrapper">
          <div v-for="genre in item.genres" :key="genre">{{genre}}</div>
        </div>
        <div>
          <span v-if="item.premiered">Premiered on <b>{{item.premiered}}</b></span>
          <span v-if="item.webChannel"> in <b>{{item.webChannel}}</b> network</span>
        </div>
        <div v-if="episodes" class="episodesWrapper">
            <div>
              <button v-for="season in Object.keys(episodes)" :key="season" :class="{selected: selectedSeason === season}" @click="handleSeasonBtn(season)">
                Season {{season}}
              </button>
            </div>
            <div>
              <button v-for="episode in episodes[selectedSeason]" :key="episode.id" :class="{selected: selectedEpisode === episode.number}" @click="handleEpisodeBtn(episode.number)">
                Episode {{episode.number}}
              </button>
            </div>
            <section v-if="episodes && episodes[selectedSeason] && episodes[selectedSeason][selectedEpisode]">
              <p v-if="episodes[selectedSeason][selectedEpisode].summary" v-html="episodes[selectedSeason][selectedEpisode].summary" />
              <p v-if="!episodes[selectedSeason][selectedEpisode].summary">No Information Available</p>
            </section>
        </div>
        <div class="moreInfo"><a :href="item.tvmazeUrl">Click here for more information</a></div>
      </div>
    </div>
    <Footer />
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  name: 'ShowDetail',
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      selectedSeason: "1",
      selectedEpisode: 1
    }
  },
  mounted: function () {
    this.fetchShowDetailItems(this.showId)
    this.fetchShowEpisodes(this.showId)
  },
  computed: {
    ...mapState('shows', ['isItemDetailFetching', 'showDetailItems', 'showEpisodes']),
    showId: function() {
      return parseInt(this.$route.query.showId)
    },
    item: function() {
      if(this.showDetailItems && this.showId && this.showDetailItems[this.showId]) {
        return this.showDetailItems[this.showId]
      }
      return null
    },
    episodes: function() {
      if(this.showEpisodes && this.showId && this.showEpisodes[this.showId]) {
        const items = this.showEpisodes[this.showId]
        let episodeShows = {}
        for(let i = 0; i < items.length; i++) {
          const episode = items[i]
          if(episodeShows[episode.season]) {
            episodeShows[episode.season][episode.number] = episode
          } else {
            episodeShows[episode.season] = {
              [episode.number]: episode
            }
          }
        }
        return episodeShows
      }
      return null
    }
  },
  methods: {
    handleSeasonBtn: function(id) {
      this.selectedSeason = id
      this.selectedEpisode = parseInt(Object.keys(this.episodes[id])[0])
    },
    handleEpisodeBtn: function(id) {
      this.selectedEpisode = id
    },
    ...mapActions('shows', {
      fetchShowDetailItems: 'fetchShowDetailItems',
      fetchShowEpisodes: 'fetchShowEpisodes'
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showDetailWrapper {
  display: flex;
  padding: 1rem;
  min-height: 75vh;
  align-items: center;
}
.showDetailWrapper .imageWrapper {
  flex: 1;
  overflow: hidden;
}
.showDetailWrapper .imageWrapper img {
  width: 100%;
}
.showDets {
  flex: 3;
  padding-left: 1rem;
}
.showDets .caption {
  display: flex;
  align-items: center;
}
.showDets .caption > div {
  margin: 0 .75rem .5rem 0;
  background-color: var(--black);
  color: var(--white);
  padding: .25rem .5rem;
  border-radius: 5px;
  font-size: .75rem;
  font-weight: bold;
  text-align: center;
}
.showSummary, .episodesWrapper {
  max-width: 75%;
}
.genreWrapper {
  padding: .5rem 0;
  display: flex;
}
.genreWrapper > div {
  margin-right: .5rem;
  background-color: var(--white);
  color: var(--black);
  padding: .25rem .5rem;
  border-radius: 5px;
  font-size: .65rem;
  font-weight: bold;
  border: 1px solid var(--lightblack);
}
.moreInfo {
  padding-top: .5rem;
}
.selected {
  background-color: var(--blue);
}
.episodesWrapper {
  margin-top: .75rem;
  border: 1px solid var(--black);
  border-radius: 5px;
}
.episodesWrapper > div {
  padding: .75rem;
  border-bottom: 1px solid var(--black);
}
.episodesWrapper > div button {
  background: var(--black);
  color: var(--white);
  font-weight: bold;
  border: 1px solid var(--black);
  border-radius: 5px;
  padding: .25rem .5rem;
  margin-bottom: .25rem;
  margin-right: .25rem;
}
.episodesWrapper > div button.selected {
  background: var(--blue);
  border: 1px solid var(--blue);
}
.episodesWrapper p {
  /* border-top: 1px solid var(--black); */
  padding: .5rem;
  background: var(--black);
  color: var(--white);
}
</style>
