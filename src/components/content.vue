<template>
  <div class="pusher">
    <div class="ui stackable grid container">
      <div class="ui column centered">
        <searchbar></searchbar>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import searchbar from './searchbar'
export default {
  components: {
    searchbar
  }
}
</script>