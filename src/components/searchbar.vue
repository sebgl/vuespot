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
      initialInputSearch: 'Search...',
      inputSearch: ''
    }
  },
  methods: {
    search: function () {
      this.$router.go('/search/' + this.inputSearch)
    }
  }
}
</script>

<style>
</style>