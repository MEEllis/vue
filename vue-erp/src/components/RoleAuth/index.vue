<template>
  <div>
    <el-dialog v-el-drag-dialog title='角色权限' width='970px' append-to-body :visible.sync='dialogRoleVisible' :before-close='handleDialogClose'>
      <el-card class="box-card" style="width:160px;display: inline-block;" body-style='height:350px; overflow-y: auto;'>
        <div slot="header" class="clearfix">
          <span>角色列表</span>
           <el-row>
            <el-col :span="8">
              <el-button style="" type="text" @click="handleRoleAdd()">添加</el-button>
            </el-col>
            <el-col :span="8">
              <el-button style="" type="text" @click="handleRoleUpdate()">修改</el-button>
            </el-col>
            <el-col :span="8">
              <el-button style="" type="text" @click="handleRoleDel()">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <div>
          <div v-for="item in roleList" :key="item.id" style="border-bottom: 1px solid #ccc;">
            <el-button type="text" :style="roleForm.id == item.id?'color:green':''" @click="handleSelectRole(item)">{{item.name}}</el-button>
          </div>
        </div>

      </el-card>
      <el-card class="box-card" style="width:580px;display: inline-block;" body-style='height:390px; overflow-y: auto;'>
        <div slot="header" class="clearfix">
          <span>功能权限</span>
        </div>
        <div>
          <el-table style="width: 100%" height='350px' border stripe>
            <el-table-column label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="date" label="功能名称" width="150" align="center">
            </el-table-column>
            <el-table-column label="权限" align="center">
              <el-table-column type="selection" width="45" align="center">
              </el-table-column>
              <el-table-column prop="name" label="查看" width="60" align="center">
              </el-table-column>
              <el-table-column prop="name" label="新增" width="60" align="center">
              </el-table-column>
              <el-table-column prop="name" label="修改" width="60" align="center">
              </el-table-column>
              <el-table-column prop="name" label="删除" width="60" align="center">
              </el-table-column>
              <el-table-column prop="name" label="审核" width="60" align="center">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="width:200px;display: inline-block;" body-style='height:390px; overflow-y: auto;'>
        <div slot="header" class="clearfix">
          <span>特殊权限</span>
        </div>
        <div>
          <el-table style="width: 100%" height='350px' border stripe>
            <el-table-column label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column type="selection" width="45" align="center">
            </el-table-column>
            <el-table-column label="权限" width="60" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <div slot='footer' class='dialog-footer'>
        <el-button size="small" type='primary' @click='handleUserOk(0)'>保 存</el-button>
        <el-button size="small" @click='handleDialogClose'>取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog v-el-drag-dialog :title='textMap[dialogRoleStatus]+"角色"' width='600px' append-to-body :visible.sync='dialogRoleEditVisible'>
      <el-form class='login-form' label-position="right" label-width="90px" autoComplete='on' :model='roleForm' :rules='roleRules' ref="roleForm">
        <el-form-item label="角色名称:" prop="name">
          <el-input class='txt-default' placeholder="请输入角色名称" v-model="roleForm.name" clearable autofocus> </el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button size="small" type='primary' @click='handleRoleOk()'>保 存</el-button>
        <el-button size="small" @click='dialogRoleEditVisible = false'>取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'
import { roleAuthAdd, roleAuthUpdate, deleteRole, getRoleList } from '@/api/platformOperator'
export default {
  name: 'roleAuth',
  directives: { elDragDialog },
  props: {
    dialogRoleVisible: {
      type: Boolean,
      default: true
    },
    roleList: {
      type: Array,
      default: []
    },
    toggleClick: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      dialogRoleEditVisible: false,
      dialogRoleStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      roleRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      roleForm: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    handleRoleAdd() {
      this.dialogRoleStatus = 'create'
      this.dialogRoleEditVisible = true
      this.resetRoleForm()
    },
    handleRoleUpdate() {
      const { id } = this.roleForm
      if (id) {
        this.dialogRoleStatus = 'update'
        this.dialogRoleEditVisible = true
        this.$nextTick(() => {
          this.$refs['roleForm'].clearValidate()
        })
      } else {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请选择角色!'
        })
      }
    },
    handleRoleDel() {
      const { id } = this.roleForm
      if (id) {
        deleteRole({ ids: id }).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.roleForm.id = ''
          this.roleForm.name = ''
          this.loadRoleList()
        })
      } else {
        this.$message({
          showClose: true,
          type: 'error',
          message: '请选择角色!'
        })
      }
    },
    handleRoleOk() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          const { dialogRoleStatus } = this
          const { name, id } = this.roleForm
          if (dialogRoleStatus === 'create') {
            roleAuthAdd({
              name
            }).then(res => {
              this.roleSaveSuccess('保存成功')
            })
          } else {
            roleAuthUpdate({
              id,
              name
            }).then(res => {
              this.roleSaveSuccess('修改成功')
            })
          }
        } else {
          return false
        }
      })
    },
    handleSelectRole(item) {
      this.roleForm.id = item.id
      this.roleForm.name = item.name
    },
    handleDialogClose() {
      this.$emit('update:dialogRoleVisible', false)
    },
    loadRoleList() {
      this.$emit('reloadRoleList', true)
    },
    roleSaveSuccess(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'success'
      })
      this.resetRoleForm()
      this.dialogRoleEditVisible = false
      this.roleForm.id = ''
      this.roleForm.name = ''
      this.loadRoleList()
    },
    resetRoleForm() {
      this.roleForm.name = ''
      this.roleForm.id = ''
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
      })
    }
  }
}
</script>

<style scoped>
</style>
