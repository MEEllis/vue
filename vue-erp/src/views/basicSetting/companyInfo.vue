<template>
  <div class=''>
     <el-button icon='el-icon-edit'>修改</el-button>
     <el-table
    :data="list"
    border
    style="width:auto;">
    <el-table-column
      prop="code"
      label="公司编码"
      width="120">
    </el-table-column>

    <el-table-column
      prop="name"
      label="公司名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="adminLogin"
      label="管理员工号"
      width="180">
    </el-table-column>
     <el-table-column
      prop="status"
      label="是否禁用"
      width="80">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      width="180">
    </el-table-column>       
    <el-table-column
      prop="createName"
      label="新增人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="addTimeStr"
      label="新增时间"
      width="180">
    </el-table-column>    
    <el-table-column
      prop="updateName"
      label="修改人"
      width="120">
    </el-table-column> 
    <el-table-column
      prop="updateTimeStr"
      label="修改时间"
      width="180">
    </el-table-column>  
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

</template>
<script>
import { getCompanyInfo } from '@/api/basicSetting/organizationChart/companyInfo'
export default {
  data() {
    return {
      listLoading: true,
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getCompanyInfo().then(res => {
        this.list = res.data.company
      })
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>