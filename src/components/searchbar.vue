import Vue from 'vue'

<template>
  <div class="ui fluid input">
    <input type="text" placeholder="Search..." v-model="inputSearch" v-on:keyup.enter="search">
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputSearch: ''
    }
  },
  methods: {
    search: function () {
      var query = this.inputSearch.trim()
      this.inputSearch = ''
      this.$router.go('/search/' + query)
    }
  }
}
</script>
 
<style>
</style>