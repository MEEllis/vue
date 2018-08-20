<template>
  <div class=''>
    orderDetails
  </div>

</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { mapState } from 'vuex'

export default {
  name: 'login',
  directives: { elDragDialog },
  data() {
    return {}
  },
  methods: {

  },
  computed: mapState({

  })
}
</script>
