<template>
  <div class="ui fixed">
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
.player {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>