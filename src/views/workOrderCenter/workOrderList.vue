<template>
  <el-table
    v-loading="loading"
    :data="orderTableData"
    stripe
    border
    height="598"
    class="w100">
    <el-table-column
      prop="id"
      label="编号"
      sortable>
    </el-table-column>
    <el-table-column
      prop="id"
      label="是否加急"
      sortable>
    </el-table-column>
    <el-table-column
      prop="id"
      label="状态"
      sortable>
    </el-table-column>
    <el-table-column
      prop="id"
      label="主流程"
      sortable>
    </el-table-column>
    <el-table-column
      prop="id"
      label="预计截单日期"
      sortable>
    </el-table-column>
    <el-table-column
      prop="id"
      label="病例号"
      sortable>
    </el-table-column>
    <el-table-column
      prop="id"
      label="患者姓名">
    </el-table-column>
    <el-table-column>
      <template slot="header" slot-scope="scope">
        <span class="mr6">机构名称</span>
        <el-tooltip effect="light" content="鼠标移至对应诊所可查看地区信息" placement="top">
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </template>
      <template slot-scope="scope">
        <el-tooltip effect="dark" :content="scope.row.id" placement="top-start">
          <span>{{scope.row.id}}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="发起医生">
    </el-table-column>
    <el-table-column
      prop="id"
      label="创建时间"
      sortable>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    name: "WorkOrderList",
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      orderTableData: {
        type: Array,
      },
    },
  }
</script>
<style scoped>
  .w100 {
    width: 100%;
  }
  .mr6 {
    margin-right: 6px;
  }
</style>
