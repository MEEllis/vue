<template>
  <div class='app-container'>
    <el-row>
      <el-button icon='el-icon-plus' size="mini" @click="handleAdd()">新增</el-button>
      <el-button icon='el-icon-plus' size="mini" @click="handleAdd()">启用</el-button>
      <el-button icon='el-icon-plus' size="mini" @click="handleAdd()">禁用</el-button>
      <el-button icon='el-icon-plus' size="mini" @click="handleAdd()">角色权限</el-button>
    </el-row>
    <el-row>
      查询信息:
      <el-input class='txt-default' placeholder="请输入姓名、账号" v-model="searchKey" clearable autofocus>
      </el-input>
      <el-checkbox v-model="isDisable">显示禁用</el-checkbox>
    </el-row>
    <!-- clac(100vh - 100px) -->
    <el-table :data="dataList" height='calc(100vh - 140px)' border stripe>
      <el-table-column width="50" label="序号" type="index" align="center">
      </el-table-column>
      <el-table-column type="selection" width="45" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" header-align='center'>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
  </div>
</template>

<script>
import { getUserVoPageList } from '@/api/platformOperator'
import { isvalidUsername } from '@/utils/validate'
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { mapState } from 'vuex'

export default {
  name: 'platformOperator',
  directives: { elDragDialog },
  data() {
    return {
      searchKey: '',
      isDisable: false,
      dataList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getUserVoPageList().then(res => {
        this.dataList = res.data.dataList
      })
    },
    handleAdd() {
      alert(1111)
    }
  },
  computed: mapState({

  })
}
</script>
