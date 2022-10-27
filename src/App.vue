<template>
  <CupsSearch />
</template>

<script>

import CupsSearch from "./components/CupsSearch/CupsSearch";
export default {
  name: 'App',
  components: {
    CupsSearch
  },
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
</style>
