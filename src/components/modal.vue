<template>
  <!-- small content, always on -->
  <div v-on:click="toggle">
    <slot name="content"></slot>
  </div>
  <!-- modal content taking up the entire screen, on-click -->
  <div class="modal" v-if="modalDisplay" v-on:click="toggle">
    <div class="modalcontent">
      <div class="ui image content">
        <slot name="modal-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalDisplay: false
    }
  },
  methods: {
    toggle: function (url) {
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