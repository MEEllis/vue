<!-- 主页面 -->

<template>
  <div id="app">
    <Head></Head>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Head from './components/header/head'
  export default {
    name: 'app',
    components: {
      Head
    }
  }
</script>

<style>
  body {

  }
</style>

<style scoped="">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
