<template>
    <sidebar></sidebar>
    <content v-on:play-audio="playAudio">
      <router-view></router-view>
    </content>
    <player v-ref:player></player>
</template>

<script>
import sidebar from './components/sidebar'
import player from './components/player'
import content from './components/content'

export default {
  components: {
    sidebar,
    player,
    content
  },
  methods: {
    playAudio: function (url) {
      this.$refs.player.play(url)
    }
  }
}
</script>

<style>
body {
  background-color: #282828;
}
.clickable:hover, .clickable:hover * {
  cursor: pointer;
  color: orange !important;
}
</style>
