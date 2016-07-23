<template>
    <sidebar></sidebar>
    <content v-on:play-audio="playAudio"
        v-on:modal="toggleModal">
      <router-view></router-view>
    </content>
    <player v-ref:player></player>
    <modal v-ref:modal></modal>
</template>

<script>
import sidebar from './components/sidebar'
import player from './components/player'
import modal from './components/modal'
import content from './components/content'

export default {
  components: {
    sidebar,
    player,
    modal,
    content
  },
  methods: {
    playAudio: function (url) {
      this.$refs.player.play(url)
    },
    toggleModal: function (url) {
      this.$refs.modal.toggle(url)
    }
  }
}
</script>

<style>
body {
  background-color: #282828;
}
</style>
