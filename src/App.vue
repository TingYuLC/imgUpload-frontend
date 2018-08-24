<template>
  <div id="app">
    <upload-img></upload-img>
  </div>
</template>

<script>
import UploadImg from './components/UploadImg'
export default {
  name: 'app',
  components: {
    UploadImg
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
