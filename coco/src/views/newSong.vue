<template>
  <div>
    <mt-swipe >
      <mt-swipe-item v-for="(banner,index) in banners" :key="index">
        <a :href="banner.extra.tourl">
          <img :src="banner.imgurl" :alt="banner.title" :title="banner.title">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <mt-cell v-for="(song,index) in songList" :title="song.filename" @click.native="playAudio(index)" :key="index">
      <img src="../assets/images/icon_music.png" width="20" height="20">
    </mt-cell>
  </div>
</template>
<script>
  import  {Indicator}  from 'mint-ui'
  import { PLAY_AUDIO } from '../mixins'
  export default{
    mixins: [PLAY_AUDIO],
    data(){
      return {
        banners: [],
        songList:[]
      }
    },
    created(){
      this.$store.commit('setHeadNav', 'head-nav1')
      this.getSong()
    },
    methods: {
      getSong(){
        this.FUN.indicator.open()
        this.$http.get('https://bird.ioliu.cn/v2?url=' + 'http://m.kugou.com/?json=true').then(({data}) => {
          this.banners = data.banner
          this.songList = data.data
        }).then(() => {
          this.FUN.indicator.close()
        })
      }
    }
  }
</script>

<style scoped="">
  .mint-swipe{
    height: 39vw !important;
  }

  .mint-swipe-items-wrap > div{
    text-align: center;
    background: #e7e7e7;
  }

  .mint-swipe-indicator {
    width: 12px !important;
    height: 12px !important;
  }

  .mint-swipe-indicators {
    bottom: 5px !important;
  }
</style>
