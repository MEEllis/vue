<template>
  <div>
    歌单
  </div>
</template>
<script>
  export default{
    created(){
      this.$store.commit('setHeadNav', 'head-nav3')
    }
  }
</script>
