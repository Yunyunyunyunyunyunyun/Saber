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
    <el-table-column
      label="K3信息">
      <template slot-scope="scope">
        <span v-if="scope.row">
          <el-button type="text">录入信息</el-button>
        </span>
        <span v-if="!scope.row">
          <el-button type="text">编辑信息</el-button>
        </span>
        <span v-if="scope.row">
          <el-button type="text">录入批号</el-button>
        </span>
        <span v-if="!scope.row">
          <el-button type="text">编辑批号</el-button>
        </span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <span v-if="scope.row">
          <el-button @click.stop="changeAddress(scope.row)" type="text">修改地址</el-button>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    name: "ProductDelivery",
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      orderTableData: {
        type: Array,
      },
    },
    methods: {
      changeAddress(row) {},
    }
  }
</script>
<style scoped>
  .w100 {
    width: 100%;
  }
</style>
