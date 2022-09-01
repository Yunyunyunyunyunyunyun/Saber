<template>
  <div class="open-contain">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('account.openDoctor')" name="openDoctorPage">
        <el-form :model="doctorForm" :rules="doctorRules" ref="doctorForm" label-width="100px" class="form-contain">
          <el-form-item label="医生姓名" prop="name">
            <el-input v-model="doctorForm.name" placeholder="请输入医生姓名" class="common-width"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="doctorForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="doctorForm.phone" placeholder="请输入联系方式" class="common-width"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="medicalType">
            <el-radio-group v-model="doctorForm.medicalType">
              <el-radio :label="0">正畸</el-radio>
              <el-radio :label="1">全科</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="登录账号" prop="loginAccount">
            <el-input v-model="doctorForm.phone" disabled class="common-width"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="loginPassword">
            <el-input v-model="doctorForm.loginPassword" disabled class="common-width"></el-input>
          </el-form-item>
          <el-form-item label="医院" prop="hospitalId">
            <el-select v-model="doctorForm.hospitalId" placeholder="请选择医院" class="common-width">
              <el-option
                v-for="item in hospitalOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校" prop="schoolId">
            <el-select v-model="doctorForm.schoolId" placeholder="请选择学校" class="common-width">
              <el-option
                v-for="item in schoolOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构地址" prop="orgAddress">
            <el-cascader
              class="common-width"
              ref="doctorAddress"
              :props="addressProps"
              clearable
              placeholder="请选择机构地址"
              v-model="doctorForm.orgAddress">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="doctorForm.address" placeholder="请输入详细地址" class="common-width"></el-input>
          </el-form-item>
          <el-form-item label="诊所名称" prop="clinicName">
            <el-input v-model="doctorForm.clinicName" placeholder="请输入诊所名称" class="common-width"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitDoctorForm('doctorForm')">生成账号</el-button>
            <el-button @click="resetDoctorForm('doctorForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('account.openStaff')" name="openStaffPage">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {
    getHospitalList,
    getSchoolList,
    selectCity,
    openDoctor,
    openStaff,
  } from "@/api/account/openAccount";
export default {
  data() {
    return {
      activeName: 'openDoctorPage',
      doctorForm: {
        name: '',
        sex: 1,
        phone: '',
        medicalType: 0,
        loginAccount: '',
        loginPassword: '123456',
        hospitalId: null,
        schoolId: null,
        orgAddress: null,
        address: '',
        clinicName: '',
      },
      doctorRules: {
        name: [
          { required: true, message: '请输入医生姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
        ],
        hospitalId: [
          { required: true, message: '请选择医院', trigger: 'blur' },
        ],
        schoolId: [
          { required: true, message: '请选择学校', trigger: 'blur' },
        ],
        orgAddress: [
          { required: true, message: '请选择机构地址', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        clinicName: [
          { required: true, message: '请输入诊所名称', trigger: 'blur' },
        ],
      },
      hospitalOptions: [],
      schoolOptions: [],
      addressProps: {
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
      }
    };
  },
  created() {
    getHospitalList().then(res => {
      this.hospitalOptions = res.data.data;
    });
    getSchoolList().then(res => {
      this.schoolOptions = res.data.data;
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitDoctorForm(formName) {
      console.log(this.doctorForm, this.$refs["doctorAddress"].getCheckedNodes()[0])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            "address": this.doctorForm.address,
            "city": this.$refs["doctorAddress"].getCheckedNodes()[0].data.cityName,
            "clinicName": this.doctorForm.clinicName,
            "countries": "中国",
            "district": this.$refs["doctorAddress"].getCheckedNodes()[0].data.districtName,
            "hospitalId": this.doctorForm.hospitalId,
            "medicalType": this.doctorForm.medicalType,
            "name": this.doctorForm.name,
            "phone": this.doctorForm.phone,
            "province": this.$refs["doctorAddress"].getCheckedNodes()[0].data.provinceName,
            "regionCode": this.doctorForm.orgAddress[2],
            "schoolId": this.doctorForm.schoolId,
            "sex": this.doctorForm.sex,
          }
          openDoctor(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "开通医生账号成功!"
              });
              this.resetDoctorForm('doctorForm')
            }
          })
        } else {
          return false;
        }
      });
    },
    resetDoctorForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
.open-contain {
  padding: 20px;
}
.form-contain {
  padding: 20px;
  background: white;
  border-radius: 5px;
}
.common-width {
  width: 400px;
}
</style>
