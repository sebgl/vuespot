<template>
<div class="ui inverted segment">
  <div class="ui stackable grid">

    <!--- album info -->
    <div class="ui six wide middle aligned column">
      <modal>
        <img slot="content" class="ui rounded image clickable" v-bind:src="image">
        <img slot="modal-content" v-bind:src="image">
      </modal>
      <h2 class="ui right aligned inverted header">
        <span class="clickable" v-link="'/artist/'+artistId">{{ artist }}</span>
        <span> - {{ name }} ({{ year }})</span>
      </h2>
    </div>

    <!--- tracks -->
    <div class="ui ten wide column">
      <div class="ui right aligned inverted header">Tracks</div>
      <div class="ui middle aligned divided inverted list">
        <div class="item" v-for="track in tracks">
          <div class="right floated content">{{ track.duration_ms | formatMsTime }}</div>
          <div class="content">
            <div class="header">
              <i class="right triangle icon clickable" v-on:click="play(track.preview_url)"></i>
              {{ track.track_number }} - {{ track.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import modal from './modal'
export default {
  components: {
    modal
  },
  data () {
    return {
      id: this.$route.params.id,
      artistId: '',
      name: '',
      image: '',
      year: '',
      artist: '',
      tracks: []
    }
  },
  ready: function () {
    this.search()
  },
  methods: {
    search: function () {
      this.$http.get('https://api.spotify.com/v1/albums/' + this.id).then(
          (response) => {
            this.artist = response.data.artists[0].name
            this.artistId = response.data.artists[0].id
            this.name = response.data.name
            this.image = response.data.images[0].url
            this.year = response.data.release_date.split('-')[0]
            this.tracks = response.data.tracks.items
          },
          (responseError) => {
            console.log('error callback')
          })
    },
    play: function (url) {
      this.$dispatch('play-audio', url)
    }
  }
}
</script>

<style>
</style>