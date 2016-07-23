<template>
  <div class="pusher">
    <div class="ui twelve column stackable grid">
      <div class="ui eight wide column centered">
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