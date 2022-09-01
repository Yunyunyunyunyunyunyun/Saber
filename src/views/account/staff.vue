<template>
  <div class="staff-contain">
    <el-row :gutter="20" class="staff-search">
      <el-col :span="6">
        <el-input v-model="staffName" placeholder="请输入员工姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="staffPhone" placeholder="请输入联系方式"></el-input>
      </el-col>
      <el-col :span="6">
        <el-cascader
          ref="staffArea"
          :props="staffProps"
          clearable
          placeholder="请选择住址"
          v-model="staffAddressValue">
        </el-cascader>
      </el-col>
      <el-col :span="6">
        <el-button @click="resetSearch">重置</el-button>
        <el-button type="primary" @click="submitSearch">搜索</el-button>
      </el-col>
    </el-row>
    <div class="staff-main">
      <el-table
        v-loading="loading"
        :data="staffTableData"
        stripe
        border
        height="350"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="员工ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
      </el-table>
      <el-pagination
        class="common-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    getStaffList,
    getStaffDetail,
  } from "@/api/account/staff";
  import { selectCity } from "@/api/account/openAccount";
export default {
  data() {
    return {
      loading: true,
      staffName: '',
      staffPhone: '',
      staffAddressValue: null,
      staffProps: {
        label: "name",
        value: "code",
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, level } = node;
          let list = [];
          let callback = () => {
            resolve((list || []).map(ele => {
              return Object.assign(ele, {
                leaf: level >= 2
              })
            }));
          }
          setTimeout(() => {
            if (level == 0) {
              selectCity().then(res => {
                list = res.data.data;
                callback();
              });
            } else if (level == 1) {
              selectCity({code: value}).then(res => {
                list = res.data.data;
                callback();
              });
            } else if (level == 2) {
              selectCity({code: value}).then(res => {
                list = res.data.data;
                callback();
              });
            } else if (level > 2) {
              list = [];
              callback();
            }
          }, 100);
        }
      },
      staffTableData: [],
      currentPage: 1,
      pageSizes: [ 10, 20, 50, 100 ],
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    let params = {
      current: this.currentPage,
      size: this.pageSize,
    };
    this.getAllStaffList(params);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      let params = {
        current: this.currentPage,
        size: val
      };
      this.getAllStaffList(params);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let params = {
        current: val,
        size: this.pageSize,
      };
      this.getAllStaffList(params);
    },
    resetSearch() {
      this.staffName = '';
      this.staffPhone = '';
      this.staffAddressValue = null;
      let params = {
        current: 1,
        size: this.pageSize,
      };
      this.getAllStaffList(params);
    },
    submitSearch() {
      let params = {
        current: 1,
        size: this.pageSize,
      };
      if (this.staffName) {
        params.name = this.staffName;
      }
      if (this.staffPhone) {
        params.phone = this.staffPhone;
      }
      if (this.$refs["staffArea"].getCheckedNodes()[0]) {
        params.countries = "中国";
        params.province = this.$refs["staffArea"].getCheckedNodes()[0].data.provinceName;
        params.city = this.$refs["staffArea"].getCheckedNodes()[0].data.cityName;
        params.district = this.$refs["staffArea"].getCheckedNodes()[0].data.districtName;
      }
      this.getAllStaffList(params);
    },
    getAllStaffList(data) {
      this.loading = true;
      getStaffList(data).then(res => {
          const data = res.data.data;
          this.total = data.total;
          this.staffTableData = data.records;
          this.loading = false;
      })
    }
  }
}
</script>
<style scoped>
  .staff-search {
    padding: 20px 20px 12px;
  }
  .staff-main {
    padding: 20px;
    background: white;
  }
</style>
