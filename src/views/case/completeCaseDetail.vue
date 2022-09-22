<template>
  <div class="complete-case-contain">
    <div class="complete-case-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="complete-case-title-main">完成病例</div>
    </div>
    <div class="complete-case-main">
      <el-tabs v-model="active">
        <el-tab-pane :name="1">
          <span slot="label"><i class="el-icon-finished"></i> 完成确认表<i class="el-icon-arrow-right arrow-style"></i></span>
          <div class="complete-case-main-one">
            <div class="complete-case-main-one-top">
              <div class="complete-case-main-one-top-img">
                <img v-if="caseItem.photo && caseItem.photo.frontPath" :src="caseItem.photo.frontPath" alt="" class="top-img">
                <i v-else class="el-icon-user top-icon"></i>
              </div>
              <div class="complete-case-main-one-top-name" v-if="caseItem.prescription && caseItem.prescription.name">
                <span :title="caseItem.prescription.name">{{caseItem.prescription.name}}</span>
              </div>
              <div class="complete-case-main-one-top-id">
                <span>病历号：</span>
                <span v-if="caseItem.record && caseItem.record.medicalCode" class="complete-case-main-one-top-id-span">{{caseItem.record.medicalCode}}</span>
              </div>
            </div>
            <div class="complete-case-main-one-middle">
              <div class="complete-case-main-one-middle-title">1. 矫治完成确认</div>
              <el-form ref="topForm" :model="topForm" :rules="topRules" label-position="top" class="complete-case-main-one-middle-form">
                <el-form-item label="1.1 确认完成属于哪种情况" prop="situation">
                  <el-radio-group v-model="topForm.situation" class="common-radio">
                    <el-row class="mb20"><el-radio :label="1" border>实现矫治目标</el-radio></el-row>
                    <el-row class="mb20"><el-radio :label="2" border>隐形矫治达到阶段效果，改用其他矫治方法完成</el-radio></el-row>
                    <el-row class="mb20"><el-radio :label="3" border>未完成实现隐形矫治目标，但患者要求结束矫治</el-radio></el-row>
                    <el-row><el-radio :label="4" border>其他(请在输入框填写其他原因)</el-radio></el-row>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="topForm.situation === 4" prop="reason">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="描述请限制在2000字以内（误删可使用“ctrl+z”撤销误操作）"
                    v-model="topForm.reason">
                  </el-input>
                </el-form-item>
                <el-form-item label="1.2 矫治完成日期" prop="completionDate">
                  <el-date-picker
                    v-model="topForm.completionDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择完成日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <div class="complete-case-main-one-middle-title">2. 定制保持器</div>
              <el-radio-group v-model="isRetainer" class="common-radio retainer-radio">
                <el-radio :label="1" border>不需要</el-radio>
                <el-radio :label="2" border>需要</el-radio>
              </el-radio-group>
              <span class="radio-desc">注：收到病例完成资料后，我公司将免费提供压膜保持器一副</span>
              <div v-show="isRetainer === 2" class="need-reason-div">
                <el-radio-group v-model="needReason" class="common-radio">
                  <el-radio :label="1" border>最后一步订做保持器</el-radio>
                  <el-radio :label="2" border>提交模型后订做保持器</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <span slot="label"><i class="el-icon-video-camera"></i> 影像资料及模型<i class="el-icon-arrow-right arrow-style"></i></span>
        </el-tab-pane>
        <el-tab-pane :name="3">
          <span slot="label"><i class="el-icon-document-checked"></i> 提交</span>
        </el-tab-pane>
      </el-tabs>
      <div class="complete-case-main-footer">
        <el-button type="primary" v-show="active>1" @click="prev">上一页</el-button>
        <el-button type="primary" v-show="active<3" @click="next">下一页</el-button>
        <el-button type="primary" v-show="active === 3" plain @click="caseSubmit()">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CompleteCaseDetail",
    data() {
      return {
        active: 1,
        caseItem: {},
        topForm: {
          situation: "",
          completionDate: "",
          reason: "",
        },
        topRules: {
          situation: [
            { required: true, message: '请确认完成属于哪种情况', trigger: 'blur' },
          ],
          completionDate: [
            { required: true, message: '请选择矫治完成日期', trigger: 'blur' },
          ],
          reason: [
            { required: true, message: '请输入原因', trigger: 'blur' },
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        isRetainer: "",
        needReason: "",
      }
    },
    created() {
      var paramsData = sessionStorage.getItem("paramsData");
      if (paramsData) {
        var params = JSON.parse(sessionStorage.getItem("paramsData"));
      } else {
        var params = this.$route.params;
        sessionStorage.setItem("paramsData", JSON.stringify(params));
      }
      this.caseItem = params.item;
    },
    beforeDestroy() {
      sessionStorage.removeItem("paramsData");
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      prev() {
        this.active--;
      },
      next() {
        this.active++;
      },
      caseSubmit() {},
    },
  }
</script>
<style scoped>
.complete-case-contain {
  width: 1200px;
  margin: 0 auto;
}
.complete-case-title {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 16px 0;
}
.complete-case-title-main {
  color: #000;
  font-size: 16px;
  width: 100%;
  text-align: center;
}
.complete-case-main {
  background: #fff;
  box-shadow: 0 2px 2px 1px #daecef;
  border-radius: 6px;
  padding: 20px;
  width: calc(100% - 40px);
  min-height: 80%;
  position: relative;
  margin-bottom: 93px;
}
.complete-case-main >>> .el-tabs__nav-wrap::after {
  height: 0;
}
.complete-case-main >>> .el-tabs__nav {
  width: 100%;
}
.complete-case-main >>> .el-tabs__item {
  width: 33.33%;
  text-align: center;
}
.complete-case-main >>> .el-tabs__nav-wrap {
  background: #f6f7fa;
  border-radius: 4px;
}
.arrow-style {
  float: right;
  height: 40px;
  line-height: 40px;
  color: #303133;
}
.complete-case-main-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
  padding: 11px 0;
}
.complete-case-main-one {
  padding: 40px 50px 0;
}
.complete-case-main-one-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 60px;
}
.complete-case-main-one-top-img {
  width: 82px;
  height: 82px;
}
.top-img {
  width: 82px;
  height: 82px;
  border-radius: 50%;
}
.top-icon {
  font-size: 82px;
}
.complete-case-main-one-top-name {
  margin-left: 30px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 26px;
  color: #333;
  max-width: 500px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
}
.complete-case-main-one-top-id {
  margin-left: 30px;
  font-weight: 300;
  font-size: 18px;
  color: #999;
}
.complete-case-main-one-top-id-span {
  font-weight: 400;
  font-size: 18px;
  color: #555;
}
.complete-case-main-one-middle {
  margin-bottom: 15px;
}
.complete-case-main-one-middle-title {
  position: relative;
  font-size: 20px;
  font-weight: 500;
  color: #555;
  width: 500px;
}
.complete-case-main-one-middle-form {
  padding: 0 21px;
}
.common-radio >>> .el-radio__input {
  display: none;
}
.common-radio >>> .el-radio.is-bordered {
  text-align: center;
}
.common-radio >>> .el-radio.is-bordered.is-checked {
  border-color: #409EFF;
  background: #409EFF;
}
.common-radio >>> .el-radio__input.is-checked+.el-radio__label {
  color: #fff;
}
.mb20 {
  margin-bottom: 20px;
}
.retainer-radio {
  margin-top: 15px;
  margin-bottom: 15px;
}
.radio-desc {
  color: #999;
  font-size: 14px;
  font-weight: 400;
  margin-left: 30px;
}
.need-reason-div {
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 124px;
}
</style>
