<template>
  <div class="header-wrap">
    <Logo/>
    <NavHead v-if="head.toggle==false"/>
    <NavBack :cStyle="head.style" :title="head.title"/>
  </div>
</template>
<script>
  import Logo from './logo.vue'
  import NavHead from './nav.vue'
  import NavBack from './back.vue'
  import { mapGetters } from 'vuex'
  export default{
    computed: {
      ...mapGetters(['head'])
    },
    components: {Logo, NavHead, NavBack}
  }
</script>




