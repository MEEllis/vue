<!-- 主页面 -->
<template>
  <div id="app">
    <headTop></headTop>
    <div class="main">
      <router-view></router-view>
    </div>
    <Player/>
    <DetailPlayer/>
  </div>
</template>

<script>
  import headTop from './components/header/headTop'
  import Player from './components/Player'
  import DetailPlayer from './components/DetailPlayer'
  export default {
    name: 'app',
    components: {
      headTop, Player, DetailPlayer
    }
  }
</script>


