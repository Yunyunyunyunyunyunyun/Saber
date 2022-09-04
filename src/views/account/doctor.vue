<template>
  <div class="doctor-contain">
    <el-row :gutter="20" class="doctor-search">
      <el-col :span="6">
        <el-input v-model="doctorName" placeholder="请输入医生姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="doctorPhone" placeholder="请输入联系方式"></el-input>
      </el-col>
      <el-col :span="6">
        <el-cascader
          ref="doctorArea"
          :props="doctorProps"
          clearable
          placeholder="请选择地区"
          v-model="doctorAddressValue">
        </el-cascader>
      </el-col>
      <el-col :span="6">
        <el-button @click="resetSearch">重置</el-button>
        <el-button type="primary" @click="submitSearch">搜索</el-button>
        <!-- <el-button type="primary" @click="exportDoctorBtn">导出医生</el-button> -->
      </el-col>
    </el-row>
    <div class="doctor-main">
      <el-table
        v-loading="loading"
        :data="doctorTableData"
        stripe
        border
        max-height="700"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="医生ID">
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
      title="医生信息"
      :visible.sync="editVisible"
      width="500px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="baseInfo">
          <el-form :model="baseInfoForm" :rules="baseInfoRules" ref="baseInfoForm" label-width="100px">
          <el-form-item label="医生姓名" prop="name">
            <el-input v-model="baseInfoForm.name" placeholder="请输入医生姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="baseInfoForm.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="启用账号" prop="status">
            <el-radio-group v-model="baseInfoForm.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="baseInfoForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类型" prop="medicalType">
            <el-radio-group v-model="baseInfoForm.medicalType">
              <el-radio :label="0">正畸</el-radio>
              <el-radio :label="1">全科</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="医院" prop="hospitalId">
            <el-select v-model="baseInfoForm.hospitalId" placeholder="请选择医院" style="width: 100%">
              <el-option
                v-for="item in hospitalOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校" prop="schoolId">
            <el-select v-model="baseInfoForm.schoolId" placeholder="请选择学校" style="width: 100%">
              <el-option
                v-for="item in schoolOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="orgAddress">
            <el-cascader
              style="width: 100%"
              ref="doctorInfoAddress"
              :props="doctorProps"
              clearable
              placeholder="请选择地区"
              :key="modalKey"
              v-model="baseInfoForm.orgAddress">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="baseInfoForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="诊所名称" prop="clinicName">
            <el-input v-model="baseInfoForm.clinicName" placeholder="请输入诊所名称"></el-input>
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
  getDoctorList,
  getDoctorDetail,
  modifyPassword,
  updateDoctor,
  exportDoctor,
} from "@/api/account/doctor";
import {
  getHospitalList,
  getSchoolList,
  selectCity,
} from "@/api/account/openAccount";
export default {
  name: "doctor",
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
      doctorName: '',
      doctorPhone: '',
      doctorAddressValue: null,
      doctorProps: {
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
      doctorTableData: [],
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
        status: 0,
        sex: 1,
        medicalType: 0,
        phone: '',
        orgAddress: null,
        address: '',
        hospitalId: null,
        schoolId: null,
        clinicName: '',
      },
      baseInfoRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        orgAddress: [
          { required: true, message: '请选择住址', trigger: 'blur' },
        ],
      },
      hospitalOptions: [],
      schoolOptions: [],
      modalKey: 0,
    };
  },
  created() {
    getHospitalList().then(res => {
      this.hospitalOptions = res.data.data;
    });
    getSchoolList().then(res => {
      this.schoolOptions = res.data.data;
    });
    let params = {
      current: this.currentPage,
      size: this.pageSize,
    };
    this.getAllDoctorList(params);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      let params = {
        current: this.currentPage,
        size: val
      };
      this.getAllDoctorList(params);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let params = {
        current: val,
        size: this.pageSize,
      };
      this.getAllDoctorList(params);
    },
    resetSearch() {
      this.doctorName = '';
      this.doctorPhone = '';
      this.doctorAddressValue = null;
      let params = {
        current: 1,
        size: this.pageSize,
      };
      this.getAllDoctorList(params);
    },
    submitSearch() {
      let params = {
        current: 1,
        size: this.pageSize,
      };
      if (this.doctorName) {
        params.name = this.doctorName;
      }
      if (this.doctorPhone) {
        params.phone = this.doctorPhone;
      }
      if (this.$refs["doctorArea"].getCheckedNodes()[0]) {
        params.countries = "中国";
        params.province = this.$refs["doctorArea"].getCheckedNodes()[0].data.provinceName;
        params.city = this.$refs["doctorArea"].getCheckedNodes()[0].data.cityName;
        params.district = this.$refs["doctorArea"].getCheckedNodes()[0].data.districtName;
      }
      this.getAllDoctorList(params);
    },
    getAllDoctorList(data) {
      this.loading = true;
      getDoctorList(data).then(res => {
          const data = res.data.data;
          this.total = data.total;
          this.doctorTableData = data.records;
          this.loading = false;
      })
    },
    handleEdit(obj) {
      this.editVisible = true;
      this.activeName = "baseInfo";
      this.currentInfoId = obj.id;
      getDoctorDetail(this.currentInfoId).then(res => {
        if (res.data && res.data.data) {
          let data = res.data.data;
          this.baseInfoForm.id = data.id;
          this.baseInfoForm.name = data.name;
          this.baseInfoForm.status = data.status;
          this.baseInfoForm.sex = data.sex;
          this.baseInfoForm.phone = data.phone;
          this.baseInfoForm.address = data.address;
          this.baseInfoForm.clinicName = data.clinicName;
          this.baseInfoForm.hospitalId = data.hospitalId;
          this.baseInfoForm.schoolId = data.schoolId;
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
            "address": this.baseInfoForm.address,
            "city": this.$refs["doctorInfoAddress"].getCheckedNodes()[0].data.cityName,
            "cityCode": this.baseInfoForm.orgAddress[1],
            "clinicName": this.baseInfoForm.clinicName,
            "countries": "中国",
            "district": this.$refs["doctorInfoAddress"].getCheckedNodes()[0].data.districtName,
            "hospitalId": this.baseInfoForm.hospitalId,
            "id": this.baseInfoForm.id,
            "medicalType": this.baseInfoForm.medicalType,
            "name": this.baseInfoForm.name,
            "phone": this.baseInfoForm.phone,
            "province": this.$refs["doctorInfoAddress"].getCheckedNodes()[0].data.provinceName,
            "provinceCode": this.baseInfoForm.orgAddress[0],
            "regionCode": this.baseInfoForm.orgAddress[2],
            "schoolId": this.baseInfoForm.schoolId,
            "sex": this.baseInfoForm.sex,
            "status": this.baseInfoForm.status,
          }
          updateDoctor(data).then(res => {
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
              this.getAllDoctorList(params);
            }
          })
        } else {
          return false;
        }
      });
    },
    exportDoctorBtn() {
      exportDoctor().then(res => {
        console.log(res)
      });
    },
  }
}
</script>
<style scoped>
  .doctor-search {
    padding: 20px 20px 12px;
  }
  .doctor-main {
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
