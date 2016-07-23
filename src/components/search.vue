import Vue from 'vue'

<template>
  <div class="ui fluid input">
    <input type="text" placeholder="Search..." v-model="inputSearch" v-on:keyup.enter="search">
  </div>

  <template v-if="searchResultTracks.length > 0">
    <div class="ui container segment">
      <div class="ui middle aligned divided list">
        <div class="item" v-for="track in searchResultTracks">

          <img class="ui middle aligned mini right floated image clickable" v-bind:src="track.album.images[0].url" v-on:click="displayModal(track.album.images[0].url)">
          <i class="right triangle icon clickable" v-on:click="play(track.preview_url)"></i>
          <div class="content">
            <div class="header">{{ track.name }}</div>
            <div class="description">{{ track.artists[0].name }} - {{ track.album.name }} ({{ track.duration_ms | formatMsTime }})</div>
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
      initialInputSearch: 'Search...',
      inputSearch: '',
      searchResultTracks: []
    }
  },
  methods: {
    search: function () {
      this.$http.get('https://api.spotify.com/v1/search?type=track&q=' + this.inputSearch).then(
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
  filters: {
    formatMsTime: function (timeMS) {
      return (timeMS / 1000 / 60).toFixed(2).toString().replace('.', ':')
    }
  }
}
</script>

<style>
.clickable:hover {
  cursor: pointer;
}
</style>