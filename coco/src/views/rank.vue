<template>
  <div class="rank">
    <mt-cell v-for="(song,index) in songList" :key="index" :title="song.rankname" is-link :to="`/rank/${song.rankid}`">
      <img slot="icon" :src="song.imgurl.replace('{size}', '400')" width="60" height="60">
    </mt-cell>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default{
    data(){
        return{
          songList:[]
        }
    },
    created(){
      this.$store.commit('setHeadNav', 'head-nav2')
      this.getRank()
    },
    methods:{
        getRank(){
          this.FUN.indicator.open()
          this.$http.get('https://bird.ioliu.cn/v2?url=' + 'http://m.kugou.com/rank/list&json=true').then(({data}) => {
            this.FUN.indicator.close()
            this.songList = data.rank.list
          })
        }
    }
  }
</script>
