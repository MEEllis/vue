<!-- 主页面 -->
<template>
  <div id="app">
    <headTop></headTop>
    <div class="main">
      <router-view></router-view>
    </div>
    <Player></Player>
  </div>
</template>

<script>
  import headTop from './components/header/headTop'
  import Player from './components/Player'
  console.log('载入app.vue')
  console.log(headTop)
  export default {
    name: 'app',
    components: {
      headTop, Player
    }
  }
</script>


