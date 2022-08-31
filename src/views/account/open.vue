<template>
  <div class="open-contain">
    <avue-tabs :option="option" @change="handleChange"></avue-tabs>
    <div v-if="type.prop==='openDoctorPage'">
      <avue-form :option="doctorOption"></avue-form>
    </div>
    <div v-else-if="type.prop==='openStaffPage'">
      <avue-form :option="staffOption"></avue-form>
    </div>
  </div>
</template>
<script>
import { selectCity } from "@/api/account/openAccount";
export default {
  data() {
    let validateContact = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系方式'));
      } else {
        callback();
      }
    };
    return {
        type: {},
        option: {
          column: [{
            label: this.$t('account.openDoctor'),
            prop: 'openDoctorPage',
          }, {
            label: this.$t('account.openStaff'),
            prop: 'openStaffPage',
          }]
        },
        doctorOption: {
          column: [{
            label: '医生姓名',
            prop: 'doctorName',
            type: 'input',
            span: 13,
            rules: [{
              required: true,
              message: "请输入医生姓名",
              trigger: "blur"
            }]
          }, {
            label: '性别',
            prop: 'doctorSex',
            type: 'radio',
            span: 13,
            dicData: [{
              label: '男',
              value: 0
            }, {
              label: '女',
              value: 1
            }],
            rules: [{
              required: true,
              message: "请选择性别",
              trigger: "blur"
            }]
          }, {
            label: '联系方式',
            prop: 'doctorContact',
            type: 'input',
            span: 13,
            placeholder: '请输入手机号或邮箱地址',
            rules: [{ required: true, validator: validateContact, trigger: 'blur' }]
          }, {
            label: '类型',
            prop: 'type',
            type: 'radio',
            span: 13,
            dicData: [{
              label: '正畸',
              value: 0
            }, {
              label: '全科',
              value: 1
            }],
          }, {
            label: '登录账号',
            prop: 'loginAccount',
            type: 'input',
            span: 13,
            value: '',
            placeholder: ' ',
            disabled: true,
          }, {
            label: '登录密码',
            prop: 'loginPassword',
            type: 'input',
            span: 13,
            value: '123456',
            placeholder: ' ',
            disabled: true,
          }, {
            label: '医院',
            prop: 'hospital',
            type: 'select',
            span: 13,
            props: {
              label: 'name',
              value: 'id'
            },
            dicUrl: '/api/blade-orth/hospital-school/list-hospital',
            rules: [{
              required: true,
              message: '请选择医院',
              trigger: 'blur'
            }]
          }, {
            label: '学校',
            prop: 'school',
            type: 'select',
            span: 13,
            props: {
              label: 'name',
              value: 'id'
            },
            dicUrl: '/api/blade-orth/hospital-school/list-school',
            rules: [{
              required: true,
              message: '请选择学校',
              trigger: 'blur'
            }]
          }, {
            label: '机构地址',
            prop: 'orgAddress',
            type: "cascader",
            span: 13,
            props: {
              label: 'name',
              value: 'code'
            },
            lazy: true,
            lazyLoad(node, resolve) {
              let stop_level = 2;
              let level = node.level;
              let data = node.data || {}
              let code = data.code;
              let list = [];
              let callback = () => {
                resolve((list || []).map(ele => {
                  return Object.assign(ele, {
                    leaf: level >= stop_level
                  })
                }));
              }
              if (level == 0) {
                selectCity().then(res => {
                  list = res.data;
                  callback()
                })
              }else if (level == 1) {
                selectCity(code).then(res => {
                  list = res.data;
                  callback()
                })
              } else if (level == 2) {
                selectCity(code).then(res => {
                  list = res.data;
                  callback()
                })
              }else{
                 callback()
              }
            },
            rules: [{
              required: true,
              message: '请选择机构地址',
              trigger: 'blur'
            }]
          }, {
            label: '详细地址',
            prop: 'addressDetail',
            type: 'textarea',
            span: 13,
            minRows: 3,
            maxRows: 3,
            rules: [{
              required: true,
              message: '请输入详细地址',
              trigger: 'blur'
            }]
         }, {
            label: '诊所名称',
            prop: 'clinicName',
            type: 'input',
            span: 13,
            rules: [{
              required: true,
              message: "请输入诊所名称",
              trigger: "blur"
            }]
          }]
        },
        staffOption: {
          column: [{
            label: '姓名',
            prop: 'staffName',
            type: 'input',
            span: 13,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            label: '性别',
            prop: 'staffSex',
            type: 'radio',
            span: 13,
            dicData: [{
              label: '男',
              value: 0
            }, {
              label: '女',
              value: 1
            }],
            rules: [{
              required: true,
              message: "请选择性别",
              trigger: "blur"
            }]
          }, {
            label: '联系方式',
            prop: 'staffContact',
            type: 'input',
            span: 13,
            rules: [{ required: true, validator: validateContact, trigger: 'blur' }]
          }, {
            label: '住址',
            prop: 'staffAddress',
            type: "cascader",
            span: 13,
            props: {
              label: 'name',
              value: 'code'
            },
            lazy: true,
            lazyLoad(node, resolve) {
              debugger
              let stop_level = 2;
              let level = node.level;
              let data = node.data || {}
              let code = data.code;
              let list = [];
              let callback = () => {
                resolve((list || []).map(ele => {
                  return Object.assign(ele, {
                    leaf: level >= stop_level
                  })
                }));
              }
              if (level == 0) {
                selectCity().then(res => {
                  list = res.data;
                  callback()
                })
              }else if (level == 1) {
                selectCity(code).then(res => {
                  list = res.data;
                  callback()
                })
              } else if (level == 2) {
                selectCity(code).then(res => {
                  list = res.data;
                  callback()
                })
              }else{
                 callback()
              }
            },
            rules: [{
              required: true,
              message: '请选择住址',
              trigger: 'blur'
            }]
          }, {
            label: '',
            prop: 'addressDetail',
            type: 'textarea',
            span: 13,
            minRows: 3,
            maxRows: 3,
            placeholder: '请输入详细地址',
            rules: [{
              required: true,
              message: '请输入详细地址',
              trigger: 'blur'
            }]
         }, {
            label: '登录账号',
            prop: 'staffAccount',
            type: 'input',
            span: 13,
            value: '',
            placeholder: ' ',
            disabled: true,
          }, {
            label: '登录密码',
            prop: 'staffPassword',
            type: 'input',
            span: 13,
            value: '123456',
            placeholder: ' ',
            disabled: true,
          }]
        }
    }
  },
  created() {
    this.type = this.option.column[0];
  },
  methods: {
    handleChange(column) {
      this.type = column;
    }
  }
}
</script>
<style scoped>
.open-contain >>> .el-tabs__header {
  margin: 0px;
}
.open-contain >>> .avue-form {
  padding: 0 10px;
}
.open-contain >>> .avue-group__item {
  padding: 20px;
  margin-bottom: 0px;
}
</style>