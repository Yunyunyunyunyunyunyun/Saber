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
      label="任务动态">
    </el-table-column>
    <el-table-column
      prop="id"
      label="期望完成日期"
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
    <el-table-column
      prop="id"
      label="执行人">
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
    name: "DataReview",
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
</style>
