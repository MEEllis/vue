<template>
  <div class="plist">
    <mt-cell v-for="(song,index) in list" :key="index" :title="song.specialname" is-link :to="`/plist/${song.specialid}`"
             :label="String(song.playcount)"
    >
      <img slot="icon" :src="song.imgurl.replace('{size}', '400')" width="60" height="60">
    </mt-cell>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default{
    data(){
      return{
        list:[]
      }
    },
    created(){
      this.$store.commit('setHeadNav', 'head-nav3')
      this.getList()
    },
    methods:{
      getList(){
        this.FUN.indicator.open()
        this.$http.get('https://bird.ioliu.cn/v2?url=' + 'http://m.kugou.com/plist/index&json=true').then(({data}) => {
          this.FUN.indicator.close()
          this.list = data.plist.list.info
        })
      }
    }
  }
</script>
