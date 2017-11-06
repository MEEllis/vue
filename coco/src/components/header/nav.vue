<template>
  <div class="header-nav">
    <mt-navbar class="container" v-model="curheadNav">
      <mt-tab-item :id="nav.id" v-for="(nav,index) in navList" :key="index">{{nav.lable}}
      </mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        navList: [{
          id: 'head-nav1',
          lable: '新歌'
        }, {
          id: 'head-nav2',
          lable: '排行'
        }, {
          id: 'head-nav3',
          lable: '歌单'
        }]
      }
    },
    computed: {
      curheadNav: {
        get(){
          return this.$store.getters.headNav
        },
        set(key){
          var index = key.substr(-1)
          this.toUrl(Number(index))
        }
      }
    },
    methods: {
      toUrl(key) {
        switch (key) {
          case 1:
            this.$router.push({name: 'newSong'})
            break
          case 2:
            this.$router.push({name: 'rank'})
            break
          case 3:
            this.$router.push({name: 'plist'})
            break
          case 4:
            this.$router.push({name: 'singer'})
            break
        }
      }
    }
  }
</script>
<style scoped="">
  .mint-tab-item {
    padding: 12px 0 !important;
  }

  .mint-tab-item-label {
    font-size: 16px !important;
  }
</style>

