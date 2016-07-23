import Vue from 'vue'

Vue.filter('formatMsTime', function (timeMS) {
  return (timeMS / 1000 / 60).toFixed(2).toString().replace('.', ':')
})
