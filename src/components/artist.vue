<template>
<div class="ui inverted segment">
  <div class="ui grid">

    <!--- artist info -->
    <div class="ui six wide middle aligned column">
      <modal>
        <img slot="content" class="ui rounded image clickable" v-bind:src="image">
        <img slot="modal-content" v-bind:src="image">
      </modal>
      <h1 class="ui left aligned inverted header">{{ name }}</h1>
    </div>

    <!--- top tracks -->
    <div class="ui ten wide column">
      <div class="ui right aligned inverted header">Top tracks</div>
      <div class="ui middle aligned divided inverted list">
        <div class="item" v-for="track in topTracks">
          <div class="right floated content">{{ track.popularity }}</div>
          <div class="content">
            <div class="header">
              <i class="right triangle icon clickable" v-on:click="play(track.preview_url)"></i>
              {{ track.name }}</div>
            <div class="description clickable" v-link="'/album/'+track.albumId">
            {{ track.album }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!--- albums -->
    <div class="ui inverted header">Albums</div>
    <div class="ui five stackable cards">
      <div class="card clickable" v-for="album in albums" v-link="'/album/'+album.id">
        <div class="image">
          <img v-bind:src="album.image">
        </div>
        <div class="extra content">
          <span class="left floated">
            {{ album.name }}
          </span>
          <span class="right floated">
            {{ album.date }}
          </span>
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
      name: '',
      image: '',
      albums: [],
      topTracks: []
    }
  },
  methods: {
    getArtistData: function () {
      this.$http.get('https://api.spotify.com/v1/artists/' + this.id).then(
          (response) => {
            this.name = response.data.name
            this.image = response.data.images[0].url
          },
          (responseError) => {
            console.log('error callback')
          })
    },
    getArtistTopTracks: function () {
      this.$http.get('https://api.spotify.com/v1/artists/' + this.id + '/top-tracks?country=FR').then(
              (response) => {
                this.topTracks = []
                for (let t of response.data.tracks) {
                  this.topTracks.push({
                    name: t.name,
                    album: t.album.name,
                    albumId: t.album.id,
                    popularity: t.popularity,
                    preview_url: t.preview_url
                  })
                }
              },
              (responseError) => {
                console.log('error callback')
              })
    },
    getArtistAlbums: function () {
      this.$http.get('https://api.spotify.com/v1/artists/' + this.id + '/albums?album_type=album&country=FR&limit=50').then(
          (response) => {
            this.albums = []
            for (let item of response.data.items) {
              this.addAlbum(item.id)
            }
          },
          (responseError) => {
            console.log('error callback')
          })
    },
    addAlbum: function (id) {
      this.$http.get('https://api.spotify.com/v1/albums/' + id).then(
          (response) => {
            var data = response.data
            this.albums.push({
              id: data.id,
              name: data.name,
              image: data.images[0].url,
              date: data.release_date.split('-')[0],
              popularity: data.popularity
            })
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
    this.getArtistData()
    this.getArtistAlbums()
    this.getArtistTopTracks()
  }
}
</script>

<style>
</style>