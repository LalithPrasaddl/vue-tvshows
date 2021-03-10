import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Home from './components/Home'
import ShowDetail from './components/ShowDetail'
import App from './App'

import store from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/showDetail', component: ShowDetail }
]

const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
