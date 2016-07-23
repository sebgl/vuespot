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
  '/search/:q': {
    component: search
  },
  '/artist/:id': {
    component: artist
  },
  '/album/:id': {
    component: album
  }
})

router.start(App, 'app')
