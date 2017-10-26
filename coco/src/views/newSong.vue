<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(banner,index) in banners" :key="index">
        <a :href="banner.extra.tourl">
          <img :src="banner.imgurl" :alt="banner.title" :title="banner.title">
        </a>

      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  import  {Indicator}  from 'mint-ui'
  export default{
    data(){
      return {
        banners: []
      }
    },
    created(){
      this.$store.commit('setHeadNav', 'head-nav1')
      this.getSong()
    },
    methods: {
      getSong(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.$http.get('https://bird.ioliu.cn/v2?url=' + 'http://m.kugou.com/?json=true').then(({data}) => {
          this.banners = data.banner
          this.songList = data.data
        }).then(() => {
          Indicator.close()
        })
      }
    }
  }
</script>

<style>
  .mint-swipe {
    height: 39vw !important;
  }

  .mint-swipe-indicator {
    width: 12px !important;
    height: 12px !important;
  }

  .mint-swipe-indicators {
    bottom: 5px !important;
  }
</style>
