<template>
  <div class="playerbox">
    <audio class="player" v-el:audio v-bind:src="audioSource" preload="auto" controls>
    </audio>
  </div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      audioSource: ''
    }
  },
  methods: {
    play: function (url) {
      this.audioSource = url
      this.$nextTick(function () {
        this.$els.audio.play()
      })
    }
  }
}
</script>

<style scoped>
.playerbox {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  left: 0;
  right: 0;
  background: #000000;
  background: linear-gradient(to top, #000000 , #282828);
}
.player {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>