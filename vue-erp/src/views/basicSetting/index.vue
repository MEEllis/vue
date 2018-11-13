<template>
  <div class='app-container'>
    <el-row>
      <el-button icon='el-icon-plus' size="mini" @click="handleSave()">保存</el-button>
    </el-row>
    <el-form ref="form" :model="form" label-width="20px">
      <el-form-item label="">
        <el-checkbox-group v-model="form.SC_01_0001">
          <el-checkbox label="导购小程序绑定微信号后，必须由零售商管理员审核后才能登陆" ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getConfigList } from '@/api/basicSetting'
export default {
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getConfigList().then(res => {
        for (let i = 0; i < res.data.dataList.length; i++) {
          const item = res.data.dataList[i]
          if (item.configValue === '1' || item.configValue === '0') {
            this.form[item.configKey] = 1
          } else {
            this.form[item.configKey] = item.configValue
          }
        }
      })
    },
    handleSave() {

    }
  }
}
</script>