<template>
  <template v-if="searchResultTracks.length > 0">
    <div class="ui container inverted segment">
      <!-- item list -->
      <div class="ui middle aligned divided inverted list">
        <div class="item" v-for="track in searchResultTracks">
          <!-- album image -->
          <modal>
            <img slot="content" class="ui middle aligned mini right floated image clickable" v-bind:src="track.album.images[0].url">
            <img slot="modal-content" v-bind:src="track.album.images[0].url">
          </modal>
          <!-- play icon -->
          <i class="right triangle icon clickable" v-on:click="play(track.preview_url)"></i> 
          <!--- track info -->
          <div class="content">
            <div class="header">{{ track.name }}</div>
            <div class="description">
              <span class="clickable" v-link="'/artist/' + track.artists[0].id">{{ track.artists[0].name }}</span>
              - <span class="clickable" v-link="'/album/' + track.album.id">{{ track.album.name }}</span>
              <span> ({{ track.duration_ms | formatMsTime }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

</template>

<script>
import modal from './modal'
export default {
  components: {
    modal
  },
  data () {
    return {
      q: this.$route.params.q,
      searchResultTracks: []
    }
  },
  methods: {
    search: function () {
      this.$http.get('https://api.spotify.com/v1/search?type=track&q=' + this.q).then(
          (response) => {
            this.searchResultTracks = response.data.tracks.items
          },
          (responseError) => {
            console.log('error callback')
          })
    },
    play: function (url) {
      this.$dispatch('play-audio', url)
    }
  },
  ready: function () {
    this.search()
  },
  watch: {
    'q': function (val, oldVal) {
      this.search() // trigger search on page reload with a different param
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
</style>