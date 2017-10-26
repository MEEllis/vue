<template>
  <div>
    排行
  </div>
</template>
<script>
  export default{
    created(){
      this.$store.commit('setHeadNav', 'head-nav2')
    }
  }
</script>
