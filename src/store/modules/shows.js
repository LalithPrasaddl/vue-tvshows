import axios from 'axios'

const state = () => ({
  isFetching: false,
  items: {},
  showDetailItems: {},
  showEpisodes: {},
  searchStr: '||',
  filtersList: {},
  itemDetails: {},
  isItemDetailFetching: false
})

const actions = {
  async fetchShows({commit, state}, data = '||') {
    commit('updateSearchStr', data)
    if(!state.items[data]) {
      console.log(data);
      commit('fetchShowsPending')
      const date = new Date()
      let url = 'http://api.tvmaze.com/schedule/web?country=US&date=' + date.toISOString().split('T')[0]
      if(data !== '||') {
        url = 'http://api.tvmaze.com/search/shows?q=' + data
      }
      const showData = await axios.get(url)
      commit('fetchShowsSuccess', showData.data)
    }
  },
  async fetchShowDetailItems({commit, state}, id) {
    if(!state.showDetailItems[id]) {
      commit('fetchShowDetailPending')
      const url = 'http://api.tvmaze.com/shows/' + id
      const showDets = await axios.get(url)
      commit('fetchShowDetailSuccess', {
        showDets: showDets.data,
        id
      })
    }
  },
  async fetchShowEpisodes({commit, state}, id) {
    if(!state.showEpisodes[id]) {
      const url = 'http://api.tvmaze.com/shows/' + id + '/episodes'
      const episodesData = await axios.get(url)
      commit('fetchShowEpisodesSuccess', {
        episodes: episodesData.data,
        id
      })
    }
  }
}

const mutations = {
  updateSearchStr(state, data) {
    state.searchStr = data
  },
  fetchShowDetailPending(state) {
    state.isItemDetailFetching = true
  },
  fetchShowDetailSuccess(state, data) {
    let currShowDets = {...state.showDetailItems}
    const showRes = data.showDets
    let currShow = {
      genres: showRes.genres,
      language: showRes.language,
      name: showRes.name,
      runtime: showRes.runtime,
      summary: showRes.summary,
      premiered: showRes.premiered,
      tvmazeUrl: showRes.url,
      status: showRes.status,
      webChannel: showRes.webChannel ? showRes.webChannel.name : showRes.network ? showRes.network.name : '',
      type: showRes.type,
      imageUrl: showRes.image.medium
    }
    currShowDets[data.id] = currShow
    state.isItemDetailFetching = false
    state.showDetailItems = currShowDets
  },
  fetchShowEpisodesSuccess(state, data) {
    let currShowEpisodes = {...state.showEpisodes}
    currShowEpisodes[data.id] = data.episodes
    state.showEpisodes = currShowEpisodes
  },
  fetchShowsPending(state) {
    state.isFetching = true
  },
  fetchShowsSuccess(state, items) {
    console.log(items);
    let runTimeItems = []
    let genreItems = []
    let networkItems = []
    let showTypes = []
    let showItems = []
    let currItems = {...state.items}
    let currShowDetailItems = {...state.showDetailItems}
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      let showItem = {}
      let showName = []
      if(item.name) {
        showName.push(item.name)
      }
      if(item.runtime && runTimeItems.indexOf(item.runtime) === -1) {
        runTimeItems.push(item.runtime)
      }
      if((item._embedded && item._embedded.show) || item.show) {
        const show = item.show || item._embedded.show
        if(show.id) {
          showItem.id = show.id
        }
        if(show.genres && show.genres.length > 0) {
          for (let j = 0; j < show.genres.length; j++) {
            const genre = show.genres[j]
            if(genreItems.indexOf(genre) === -1) {
              genreItems.push(genre)
            }
          }
          showItem.genres = show.genres
        }
        if(show.webChannel && show.webChannel.name) {
          if(networkItems.indexOf(show.webChannel.name) === -1) {
            networkItems.push(show.webChannel.name)
          }
          showItem.webChannel = show.webChannel.name
        }
        if(!showItem.webChannel && show.network && show.network.name) {
          showItem.webChannel = show.network.name
        }
        if(show.name) {
          showName.push(show.name)
          showItem.name = show.name
        }
        if(show.type && showTypes.indexOf(show.type) === -1) {
          showTypes.push(show.type)
        }
        if(show.image && show.image.medium) {
          showItem.imageUrl = show.image.medium
        }
        showItem.type = show.type || ''
        showItem.summary = item.summary || show.summary || ''
        showItem.showSummary = show.summary
        showItem.language = show.language
        showItem.premiered = show.premiered
        showItem.tvmazeUrl = show.url
        showItem.status = show.status
      }
      let showTime = []
      if(item.season) {
        showTime.push('Season ' + item.season, 'Episode ' + item.number)
      }
      showItem.season = item.season
      showItem.episode = item.number
      if(item.airtime) {
        showItem.airtime = item.airtime
        showTime.push('at ' + item.airtime)
      }
      if(item.runtime) {
        showTime.push(', ' + item.runtime + ' mins')
        showItem.runtime = item.runtime
      }

      showItem.showTime = showTime.join(' ')
      showItem.showName = showName.join(', ')

      showItems.push(showItem)
      currShowDetailItems[showItem.id] = showItem
    }
    let filtersList = {
      runtime: {
        name: 'RunTime',
        key: 'runtime',
        items: runTimeItems
      },
      genre: {
        name: 'Genre',
        key: 'genre',
        items: genreItems
      },
      network: {
        name: 'Network',
        key: 'network',
        items: networkItems
      },
      show_type: {
        name: 'Show Type',
        key: 'show_type',
        items: showTypes
      }
    }
    const str = state.searchStr  || ''
    currItems[str] = showItems
    state.items = currItems
    state.showDetailItems = currShowDetailItems
    state.filtersList = filtersList
    state.isFetching = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
