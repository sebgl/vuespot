<template>
  <div class="modal" v-if="modalDisplay" v-on:click="toggle">
    <div class="modalcontent">
      <div class="ui image content">
        <img v-bind:src="modalImage">
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  data () {
    return {
      modalImage: 'https://i.scdn.co/image/76db0199ec68a499a7d57bc72d64dce654dda39f',
      modalDisplay: false
    }
  },
  methods: {
    toggle: function (url) {
      this.modalImage = url
      this.modalDisplay = !this.modalDisplay
    }
  }
}
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
.modalcontent {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>