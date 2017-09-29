<template>
  <div>
    <div class="search-panel">
      <div class="search-input">
        <span class="search-icon"></span>
        <input type="text" v-model="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
      </div>
      <a href="javascript:;" @click="search" class="search-btn">搜索</a>
    </div>

    <div class="search-list" v-show="togglePanel">
      <div class="search-list-title">最近热门</div>
      <mt-cell v-for="(item,index) in hotList" :title="item.keyword" @click.native="replaceInput(index)" :key="index"></mt-cell>
    </div>

    <div class="songs-list" v-show="!togglePanel">
      <div class="search-total">
        共有{{total}}条搜索结果
      </div>

    </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        keyword: '',
        hotList: [],
        togglePanel: true,
        total: null,
        songList: []
      }
    },
    created(){
      this.getSongs()
    },
    methods: {
      getSongs(){
        this.$http.get('/proxy/?json=true').then(({data}) => {
          this.banners = data.banner
          this.songList = data.data
        })
      },
    }
  }
</script>
