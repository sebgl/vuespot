import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import App from './App'
import artist from './components/artist'
import album from './components/album'
import search from './components/search'
Vue.use(VueResource)
Vue.use(Router)

/* eslint-disable no-new */
var router = new Router()

router.map({
  '/': {
    component: search
  },
  '/search': {
    component: search
  },
  '/artist': {
    component: artist
  },
  '/album': {
    component: album
  }
})

router.start(App, 'app')
