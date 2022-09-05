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
          placeholder="请选择地区"
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
        max-height="700"
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
        <el-table-column
          prop="area"
          label="所在地区">
          <template slot-scope="scope">
            <span>
              {{scope.row.countries}} {{scope.row.province}} {{scope.row.city}} {{scope.row.district}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline edit-icon" @click="handleEdit(scope.row)"></i>
          </template>
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
    <el-dialog
      title="员工信息"
      :visible.sync="editVisible"
      width="500px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseInfo">
          <el-form :model="baseInfoForm" :rules="baseInfoRules" ref="baseInfoForm" label-width="100px">
          <el-form-item label="ID" prop="id">
            <span v-text="baseInfoForm.id"></span>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="baseInfoForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <span v-if="baseInfoForm.sex == 1">男</span>
            <span v-else-if="baseInfoForm.sex == 0">女</span>
            <span v-else>未知</span>
          </el-form-item>
          <el-form-item label="启用账号" prop="status">
            <el-radio-group v-model="baseInfoForm.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <span v-text="baseInfoForm.phone"></span>
          </el-form-item>
          <el-form-item label="住址" prop="orgAddress">
            <el-cascader
              style="width: 100%"
              ref="staffInfoAddress"
              :props="staffProps"
              :key="modalKey"
              clearable
              placeholder="请选择住址"
              v-model="baseInfoForm.orgAddress">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="baseInfoForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item class="footer-main">
            <el-button @click="cancelDialog">取消</el-button>
            <el-button type="primary" @click="submitBaseInfoForm('baseInfoForm')">完成</el-button>
          </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="changePassword">
          <el-form :model="passwordForm" status-icon :rules="passWordRules" ref="passwordForm" label-width="100px">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="passwordForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="passwordForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item class="footer-main">
              <el-button @click="cancelDialog">取消</el-button>
              <el-button type="primary" @click="submitPasswordForm('passwordForm')">完成</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import {
  getStaffList,
  getStaffDetail,
  modifyPassword,
  updateStaff,
} from "@/api/account/staff";
import { selectCity } from "@/api/account/openAccount";
export default {
  name: "Staff",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
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
      editVisible: false,
      currentInfoId: "",
      activeName: "baseInfo",
      passwordForm: {
        pass: '',
        checkPass: '',
      },
      passWordRules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePassAgain, trigger: 'blur' }
        ],
      },
      baseInfoForm: {
        id: '',
        name: '',
        sex: 1,
        status: 0,
        phone: '',
        orgAddress: null,
        address: '',
      },
      baseInfoRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        orgAddress: [
          { required: true, message: '请选择住址', trigger: 'blur' },
        ],
      },
      modalKey: 0,
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
    },
    handleEdit(obj) {
      this.editVisible = true;
      this.activeName = "baseInfo";
      this.currentInfoId = obj.id;
      getStaffDetail(this.currentInfoId).then(res => {
        if (res.data && res.data.data) {
          let data = res.data.data;
          this.baseInfoForm.id = data.id;
          this.baseInfoForm.name = data.name;
          this.baseInfoForm.sex = data.sex;
          this.baseInfoForm.status = data.status;
          this.baseInfoForm.phone = data.phone;
          this.baseInfoForm.address = data.address;
          this.baseInfoForm.orgAddress = new Array(data.provinceCode, data.cityCode, data.regionCode);
          this.modalKey++;
        }
      })
    },
    submitPasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            id: this.currentInfoId,
            newPassword: this.passwordForm.pass,
          }
          modifyPassword(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "修改密码成功!"
              });
              this.editVisible = false;
            }
          })
        } else {
          return false;
        }
      });
    },
    cancelDialog() {
      this.editVisible = false;
    },
    submitBaseInfoForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            "id": this.baseInfoForm.id,
            "address": this.baseInfoForm.address,
            "city": this.$refs["staffInfoAddress"].getCheckedNodes()[0].data.cityName,
            "cityCode": this.baseInfoForm.orgAddress[1],
            "countries": "中国",
            "district": this.$refs["staffInfoAddress"].getCheckedNodes()[0].data.districtName,
            "name": this.baseInfoForm.name,
            "phone": this.baseInfoForm.phone,
            "province": this.$refs["staffInfoAddress"].getCheckedNodes()[0].data.provinceName,
            "provinceCode": this.baseInfoForm.orgAddress[0],
            "regionCode": this.baseInfoForm.orgAddress[2],
            "sex": this.baseInfoForm.sex,
            "status": this.baseInfoForm.status,
          }
          updateStaff(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "修改基本信息成功!"
              });
              this.editVisible = false;
              let params = {
                current: this.currentPage,
                size: this.pageSize,
              };
              this.getAllStaffList(params);
            }
          })
        } else {
          return false;
        }
      });
    },
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

  .edit-icon {
    font-size: 25px;
    color: #409EFF;
  }

  .footer-main {
    text-align: right;
  }
</style>
