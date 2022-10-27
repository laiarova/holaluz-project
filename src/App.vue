<template>
  <p v-if="errorData" class="dataError">Error receiving data</p>
  <CupsSearch v-else/>
</template>

<script>

import CupsSearch from "./components/CupsSearch/CupsSearch";
export default {
  name: 'App',
  components: {
    CupsSearch
  },
  computed:{
    errorData(){
      return !(Array.isArray(this.$store.state.clients) && Array.isArray(this.$store.state.supplyPoints))
    }
  }
}
</script>

<style>
body{
  display: flex;
  justify-content: center;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 70%;
  min-width: 685px;

}
.dataError{
  color: #ccc
}
</style>
