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
          :props="staffAllProps"
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
        ref="staffTable"
        v-loading="loading"
        :data="staffTableData"
        stripe
        border
        height="680"
        class="w100">
        <el-table-column
          prop="id"
          label="员工ID"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色">
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
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">启用</span>
            <span v-else-if="scope.row.status == 1">禁用</span>
            <span v-else>--</span>
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
          <el-form-item label="组织" prop="organize">
            <el-select v-model="baseInfoForm.organize" placeholder="请选择组织" class="w100" @change="changeOrganize">
              <el-option
                v-for="item in organizeOptions"
                :key="item.tenantId"
                :label="item.tenantName"
                :value="item.tenantId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="role" v-show="baseInfoForm.organize">
            <el-radio-group v-model="baseInfoForm.role">
              <el-radio
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.id">
                {{item.roleName}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="baseInfoForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="baseInfoForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
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
              class="w100"
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
import { selectCityAll } from "@/api/account/doctor";
import { selectCity, getOrganize } from "@/api/account/openAccount";
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
      staffAllProps: {
        label: "name",
        value: "code",
        lazy: true,
        lazyLoad (node, resolve) {
          const { value, level } = node;
          let list = [];
          let callback = () => {
            resolve((list || []).map(ele => {
              return Object.assign(ele, {
                leaf: ele.code == "00" ? level >= 0 : level >= 2
              })
            }));
          }
          setTimeout(() => {
            if (level == 0) {
              selectCityAll().then(res => {
                list = res.data.data;
                callback();
              });
            } else if (level == 1) {
              selectCityAll({code: value}).then(res => {
                list = res.data.data;
                callback();
              });
            } else if (level == 2) {
              selectCityAll({code: value}).then(res => {
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
        organize: '',
        role: '',
      },
      baseInfoRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        orgAddress: [
          { required: true, message: '请选择住址', trigger: 'change' },
        ],
        organize: [
          { required: true, message: '请选择组织', trigger: 'change' },
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
      },
      modalKey: 0,
      organizeOptions: [],
      allRoleOptions: [],
      roleOptions: [],
    };
  },
  created() {
    let params = {
      current: this.currentPage,
      size: this.pageSize,
    };
    this.getAllStaffList(params);
    getOrganize().then(res => {
      this.organizeOptions = res.data.data.tenantList || [];
      this.allRoleOptions = res.data.data.roleMap || [];
    });
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      let params = {
        current: this.currentPage,
        size: val
      };
      if (this.staffName) {
        params.name = this.staffName;
      }
      if (this.staffPhone) {
        params.phone = this.staffPhone;
      }
      if (this.$refs["staffArea"].getCheckedNodes()[0] && this.$refs["staffArea"].getCheckedNodes()[0].pathLabels.length) {
        params.countries = "中国";
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0] !== "全部") {
          params.province = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0];
        }
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1] !== "全部") {
          params.city = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1];
        }
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2] !== "全部") {
          params.district = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2];
        }
      }
      this.getAllStaffList(params);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let params = {
        current: val,
        size: this.pageSize,
      };
      if (this.staffName) {
        params.name = this.staffName;
      }
      if (this.staffPhone) {
        params.phone = this.staffPhone;
      }
      if (this.$refs["staffArea"].getCheckedNodes()[0] && this.$refs["staffArea"].getCheckedNodes()[0].pathLabels.length) {
        params.countries = "中国";
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0] !== "全部") {
          params.province = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0];
        }
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1] !== "全部") {
          params.city = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1];
        }
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2] !== "全部") {
          params.district = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2];
        }
      }
      this.getAllStaffList(params);
    },
    resetSearch() {
      this.staffName = '';
      this.staffPhone = '';
      this.staffAddressValue = null;
      this.currentPage = 1;
      let params = {
        current: 1,
        size: this.pageSize,
      };
      this.getAllStaffList(params);
    },
    submitSearch() {
      this.currentPage = 1;
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
      if (this.$refs["staffArea"].getCheckedNodes()[0] && this.$refs["staffArea"].getCheckedNodes()[0].pathLabels.length) {
        params.countries = "中国";
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0] !== "全部") {
          params.province = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0];
        }
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1] !== "全部") {
          params.city = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1];
        }
        if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2] !== "全部") {
          params.district = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2];
        }
      }
      this.getAllStaffList(params);
    },
    getAllStaffList(data) {
      this.loading = true;
      getStaffList(data).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.total = data.total;
          this.staffTableData = data.records;
          this.$nextTick(() => {
            this.$refs["staffTable"].doLayout();
          });
        }
        this.loading = false;
      });
    },
    handleEdit(obj) {
      this.editVisible = true;
      this.activeName = "baseInfo";
      this.currentInfoId = obj.id;
      getStaffDetail(this.currentInfoId).then(res => {
        if (res.data && res.data.data) {
          let data = res.data.data;
          this.baseInfoForm.id = data.id;
          this.baseInfoForm.organize = data.tenantId;
          this.roleOptions = this.allRoleOptions[data.tenantId];
          this.baseInfoForm.role = data.roleId;
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
      this.$refs["baseInfoForm"].resetFields();
      this.$refs["passwordForm"].resetFields();
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
            "tenantId": this.baseInfoForm.organize,
            "roleId": this.baseInfoForm.role,
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
              if (this.staffName) {
                params.name = this.staffName;
              }
              if (this.staffPhone) {
                params.phone = this.staffPhone;
              }
              if (this.$refs["staffArea"].getCheckedNodes()[0] && this.$refs["staffArea"].getCheckedNodes()[0].pathLabels.length) {
                params.countries = "中国";
                if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0] !== "全部") {
                  params.province = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[0];
                }
                if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1] !== "全部") {
                  params.city = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[1];
                }
                if (this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2] !== "全部") {
                  params.district = this.$refs["staffArea"].getCheckedNodes()[0].pathLabels[2];
                }
              }
              this.getAllStaffList(params);
            }
          })
        } else {
          return false;
        }
      });
    },
    changeOrganize(val) {
      this.baseInfoForm.role = '';
      this.roleOptions = this.allRoleOptions[val];
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

  .w100 {
    width: 100%;
  }
</style>
