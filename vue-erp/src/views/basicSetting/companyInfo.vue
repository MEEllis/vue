<template>
  <div class=''>
    <el-button icon='el-icon-edit' size="mini" round>修改</el-button>
    <el-table :data="list" border style="width:auto;">
      <el-table-column width="50" label="序号" type="index" align="center">
      </el-table-column>
      <el-table-column prop="code" label="公司编码" width="120" header-align='center'>
      </el-table-column>
      <el-table-column prop="name" label="公司名称" width="180" header-align='center'>
      </el-table-column>
      <el-table-column prop="adminLogin" label="管理员工号" width="180" header-align='center'>
      </el-table-column>
      <el-table-column prop="status" label="是否禁用" width="80" align='center'>
        <template slot-scope="scope">
          <el-tag size='mini' :type="scope.row.status | statusFilter">{{scope.row.status | statusTextFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180" header-align='center'>
      </el-table-column>
      <el-table-column prop="createName" label="新增人" width="120" header-align='center'>
      </el-table-column>
      <el-table-column prop="addTimeStr" label="新增时间" width="180" header-align='center'>
      </el-table-column>
      <el-table-column prop="updateName" label="修改人" width="120" header-align='center'>
      </el-table-column>
      <el-table-column prop="updateTimeStr" label="修改时间" width="180" header-align='center'>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" header-align='center'>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleResetPwd(scope.row)" type="text" size="small">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-el-drag-dialog title='重置密码' width='600px' :visible.sync='resetPwdVisible'>
      重置密码将用户密码设置为：{{resetPwd}}
      <div slot='footer' class='dialog-footer'>
        <el-button size="small" @keyup.esc.native='resetPwdCancel' @click='resetPwdCancel' >取 消</el-button>
        <el-button size="small" type='primary' @keyup.enter.native='resetPwdOK' @click='resetPwdOK' autofocus >确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { getCompanyInfo } from '@/api/basicSetting/organizationChart/companyInfo'
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  data() {
    return {
      listLoading: true,
      list: [],
      resetPwdVisible: false,
      resetPwdId: '',
      resetPwd: ''
    }
  },
  directives: { elDragDialog },
  created() {
    this.getList()
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      const statusMap = {
        0: '启动',
        1: '禁用'
      }
      return statusMap[status]
    }
  },
  methods: {
    getList() {
      getCompanyInfo().then(res => {
        this.list = res.data.company
      })
    },
    handleResetPwd(row) {
      this.resetPwdVisible = true
      this.resetPwdId = row.id
      this.resetPwd = getRandomPassword()
    },
    resetPwdCancel(row) {
      this.resetPwdVisible = false
    },
    resetPwdOK(row) {
      alert(1111111111)
    },
    handleClick(row) {
      console.log(row)
    }
  }
}

// 重置密码
function getRandomPassword() {
  let password = ''
  for (let i = 0; i < 6; i++) {
    password += Math.floor(Math.random() * 10)
  }
  return password
}
</script>