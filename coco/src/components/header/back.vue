<template>
  <div class="rank-head container" :style="cStyle" id="transparent-header">
    <a class="rank-head-back" @click="routerBack"></a>
    {{title}}
  </div>
</template>


<script>
  export default{
    props: ['cStyle', 'title'],
    methods: {
      routerBack() {
        this.$router.go(-1)
      }
    }
  }
</script>


