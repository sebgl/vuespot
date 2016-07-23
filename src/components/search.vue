import Vue from 'vue'

<template>
  <template v-if="searchResultTracks.length > 0">
    <div class="ui container inverted segment">
      <div class="ui middle aligned divided inverted list">
        <div class="item" v-for="track in searchResultTracks">

          <img class="ui middle aligned mini right floated image clickable" v-bind:src="track.album.images[0].url" v-on:click="displayModal(track.album.images[0].url)">
          <i class="right triangle icon clickable" v-on:click="play(track.preview_url)"></i>
          <div class="content">
            <div class="header">{{ track.name }}</div>
            <div class="description">
              <a class="artist" v-link="'/artist/' + track.artists[0].id">{{ track.artists[0].name }}</a>
              - <span class="album">{{ track.album.name }} ({{ track.duration_ms | formatMsTime }})</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>

</template>

<script>
export default {
  data () {
    return {
      q: this.$route.params.q,
      searchResultTracks: []
    }
  },
  methods: {
    search: function () {
      console.log('search with ' + this.q)
      this.$http.get('https://api.spotify.com/v1/search?type=track&q=' + this.q).then(
          (response) => {
            console.log(response)
            this.searchResultTracks = response.data.tracks.items
          },
          (responseError) => {
            console.log('error callback')
          })
    },
    play: function (url) {
      this.$dispatch('play-audio', url)
    },
    displayModal: function (url) {
      this.$dispatch('modal', url)
    }
  },
  ready: function () {
    this.search()
  },
  filters: {
    formatMsTime: function (timeMS) {
      return (timeMS / 1000 / 60).toFixed(2).toString().replace('.', ':')
    }
  },
  watch: {
    'q': function (val, oldVal) {
      this.ready() // trigger search on page reload with a different param
    }
  },
  route: {
    data: function (transition) {
      var newq = transition.to.params.q
      return {
        q: newq // set new q value on page reload with a different param
      }
    }
  }
}
</script>

<style>
.clickable:hover {
  cursor: pointer;
}
</style>