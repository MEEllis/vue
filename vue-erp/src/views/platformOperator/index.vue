<template>
  <div class='app-container'>
    <el-row>
      <el-button icon='el-icon-plus' size="mini" @click="handleAdd()">新增</el-button>
      <el-button icon='el-icon-plus' size="mini" @click="handleEnable(1)">启用</el-button>
      <el-button icon='el-icon-plus' size="mini" @click="handleEnable(0)">禁用</el-button>
      <el-button icon='el-icon-plus' size="mini" @click="handleRole()">角色权限</el-button>
    </el-row>
    <el-row class="search-wrap">
      查询信息:
      <el-input class='txt-default' @keyup.enter.native="handleFilter" placeholder="请输入姓名、账号" v-model="searchKey" clearable autofocus>
      </el-input>
      <el-checkbox class='pd-left-8' @change='handleFilter' v-model="containsDisabled">显示禁用</el-checkbox>
    </el-row>
    <el-table :data="dataList" height='calc(100vh - 205px)' border stripe @selection-change="handleSelectionChange">
      <el-table-column width="60" label="序号" type="index" align="center">
      </el-table-column>
      <el-table-column type="selection" width="45" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" header-align='center'>
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleResetPwd(scope.row)" type="text" size="small">重置密码</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="login" label="登陆账号" width="120" header-align='center'>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" header-align='center'>
      </el-table-column>
      <el-table-column prop="roleNames" label="角色" width="180" header-align='center'>
      </el-table-column>
      <el-table-column prop="createByName" label="新增人" width="120" header-align='center'>
      </el-table-column>
      <el-table-column label="新增时间" width="180" header-align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateByName" label="修改人" width="120" header-align='center'>
      </el-table-column>
      <el-table-column label="修改时间" width="180" header-align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登陆时间" width="180" header-align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.lastLoginTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[20,50,100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalRecordCount">
      </el-pagination>
    </div>

    <el-dialog v-el-drag-dialog :title='textMap[dialogUserStatus]+"操作员"' width='600px' append-to-body :visible.sync='dialogUserVisible'>
      <el-form class='login-form' label-position="right" label-width="90px" autoComplete='on' :model='userForm' :rules='userRules' ref="userForm">
        <el-form-item label="登陆账号:" prop="login">
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">留空时自动编号.编号规则为顺序编号B+4位流水号.<br/>例如：第一个新增的操作员编码为B0001，第二个应为B0002，以此类推</div>
            <el-input class='txt-default' placeholder="请输入登陆账号" v-model="userForm.login" clearable> </el-input>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="姓名:" prop="name">
          <el-input class='txt-default' placeholder="请输入姓名" v-model="userForm.name" clearable> </el-input>
        </el-form-item>
        <el-form-item label="角色名称:" prop="roleIds">
          <el-select multiple collapse-tags v-model='userForm.roleIds' placeholder='请选择'>
            <el-option v-for='item in userForm.roleList' :key='item.id' :label='item.name' :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button v-if="dialogUserStatus==='create'" size="small" type='primary' @click='handleUserOk(1)'>保存并新增</el-button>
        <el-button size="small" type='primary' @click='handleUserOk(0)'>保 存</el-button>
        <el-button size="small" @click='handleUserCancel'>取 消</el-button>
      </div>
    </el-dialog>
    <!-- 角色权限 -->
    <role-auth :dialogRoleVisible.sync='dialogRoleVisible' :roleList='userForm.roleList' @reloadRoleList="loadRoleList"></role-auth>
  </div>
</template>

<script>
import { getUserVoPageList, getRoleList, userAuthAdd, userAuthUpdate, deleteUser, enableUser, resetPassword } from '@/api/platformOperator'
import { isvalidUsername } from '@/utils/validate'
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import RoleAuth from '@/components/RoleAuth'// svg组件
import { mapState } from 'vuex'

export default {
  name: 'platformOperator',
  directives: { elDragDialog },
  components: {
    RoleAuth
  },
  data() {
    return {
      searchKey: '',
      containsDisabled: false,
      dialogUserVisible: false,
      dialogRoleVisible: false,
      dialogUserStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dataList: [],
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        totalRecordCount: 0
      },
      multipleSelection: [],
      userRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        roleIds: [
          { required: true, message: '请至少选择一个角色名称', trigger: 'change' }
        ]
      },
      userForm: {
        id: '',
        login: '',
        name: '',
        roleIds: [],
        roleList: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const { queryKey, listQuery, containsDisabled } = this
      const { pageNum, pageSize } = listQuery
      getUserVoPageList({
        queryKey,
        containsDisabled,
        pageNum,
        pageSize
      }).then(res => {
        this.dataList = res.data.dataList
        this.listQuery.totalRecordCount = res.data.totalRecordCount
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    resetUserForm() {
      this.userForm.login = ''
      this.userForm.name = ''
      this.userForm.roleIds = []
      this.userForm.id = ''
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    handleEnable(status) {
      const { multipleSelection } = this
      if (multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请勾选数据',
          type: 'error'
        })
      } else {
        const ids = multipleSelection.map(item => item.id)
        enableUser({ ids, status }).then(res => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.getList()
        })
      }
    },
    handleRole() {
      this.dialogRoleVisible = true
      this.loadRoleList()
    },
    handleAdd() {
      this.dialogUserVisible = true
      this.dialogUserStatus = 'create'
      this.resetUserForm()
      this.loadRoleList()
    },
    handleUpdate(rowData) {
      const roleIds = rowData.roleIds.split(',')
      for (let i = 0; i < roleIds.length; i++) {
        roleIds[i] = Number(roleIds[i])
      }
      this.dialogUserVisible = true
      this.dialogUserStatus = 'update'
      this.userForm.login = rowData.login
      this.userForm.name = rowData.name
      this.userForm.roleIds = roleIds
      this.userForm.id = rowData.id
      this.loadRoleList()
    },
    handleDel(rowData) {
      this.$confirm('删除后不能恢复，你确定要删除吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        return deleteUser({ ids: rowData.id })
      }).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      })
    },
    handleResetPwd(rowData) {
      resetPassword({ ids: rowData.id }).then(res => {
        this.$alert('密码已重置为123456，请及时修改！', ' 提示', {
          confirmButtonText: '确定'
        })
      })
    },
    handleUserCancel() {
      this.dialogUserVisible = false
      this.resetUserForm()
    },
    handleUserOk(flag) {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          const { dialogUserStatus } = this
          const { login, name, roleIds, id } = this.userForm
          if (dialogUserStatus === 'create') {
            userAuthAdd({
              login,
              name,
              roleIds: roleIds.toString()
            }).then(res => {
              this.userSaveSuccess(flag, '保存成功')
            })
          } else {
            userAuthUpdate({
              id,
              login,
              name,
              roleIds: roleIds.toString()
            }).then(res => {
              this.userSaveSuccess(flag, '修改成功')
            })
          }
        } else {
          return false
        }
      })
    },

    loadRoleList(reload) {
      if (reload) {
        getRoleList().then(res => {
          this.userForm.roleList = res.data.dataList
        })
      } else {
        if (this.userForm.roleList.length === 0) {
          getRoleList().then(res => {
            this.userForm.roleList = res.data.dataList
          })
        }
      }
    },
    userSaveSuccess(flag, message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'success'
      })
      if (!flag) {
        this.dialogUserVisible = false
      }
      this.resetUserForm()
      this.getList()
    }

  },
  computed: mapState({

  })
}

</script>
