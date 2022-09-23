<template>
  <div class="restart-case-contain">
    <div class="restart-case-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="restart-case-title-main">重启病例</div>
    </div>
    <div class="restart-case-main">
      <el-tabs v-model="active">
        <el-tab-pane :name="1">
          <span slot="label"><i class="el-icon-chat-dot-square"></i> 阶段反馈<i class="el-icon-arrow-right arrow-style"></i></span>
          <div class="restart-case-main-one">
            <div class="restart-case-main-one-top">
              <div class="restart-case-main-one-top-img">
                <img v-if="caseItem.photo && caseItem.photo.frontPath" :src="caseItem.photo.frontPath" alt="" class="top-img">
                <i v-else class="el-icon-user top-icon"></i>
              </div>
              <div class="restart-case-main-one-top-name" v-if="caseItem.prescription && caseItem.prescription.name">
                <span :title="caseItem.prescription.name">{{caseItem.prescription.name}}</span>
              </div>
              <div class="restart-case-main-one-top-id">
                <span>病历号：</span>
                <span v-if="caseItem.record && caseItem.record.medicalCode" class="restart-case-main-one-top-id-span">{{caseItem.record.medicalCode}}</span>
              </div>
            </div>
            <el-form :model="feedbackForm" :rules="feedbackRules" ref="feedbackForm" label-position="top">
              <div class="diagnosis-title diagnosis-title-required">1. 当前矫治器贴合情况<span class="diagnosis-tip">判断依据：牙齿移动及咬合关系与模拟矫治设计基本符合，矫治器与牙齿之间无明显空隙</span></div>
              <el-form-item prop="isFit">
                <el-radio-group v-model="feedbackForm.isFit" class="common-radio">
                  <el-radio :label="1" border>矫治器贴合</el-radio>
                  <el-radio :label="2" border>矫治器不贴合</el-radio>
                </el-radio-group>
                <div class="not-fit-desc" :class="{'hide-desc': feedbackForm.isFit !== 2}">需提交全口硅橡胶印膜，或全口数字模型文件</div>
              </el-form-item>
              <div class="diagnosis-title">2. 临床检查</div>
              <div class="restart-case-main-one-check">
                <div class="diagnosis-two-title diagnosis-title-required">2.1 本次反馈时佩戴矫治器步数为</div>
                <el-form-item prop="upSteps">
                  <span class="steps-title">上颌第<el-input v-model="feedbackForm.upSteps" class="steps-input" :disabled="maxUpSteps===0"></el-input>步</span>
                  <span class="diagnosis-tip">上阶段设计的矫治器总步数为 {{maxUpSteps}} 步</span>
                </el-form-item>
                <el-form-item prop="downSteps">
                  <span class="steps-title">下颌第<el-input v-model="feedbackForm.downSteps" class="steps-input" :disabled="maxDownSteps===0"></el-input>步</span>
                  <span class="diagnosis-tip">上阶段设计的矫治器总步数为 {{maxDownSteps}} 步</span>
                </el-form-item>
                <div class="diagnosis-two-title">2.2 附件调整</div>
                <el-radio-group v-model="feedbackForm.annex" class="common-radio w180" @change="annexChange">
                  <el-row class="mb20">
                    <el-radio :label="1" border>由设计方案决定(推荐)</el-radio>
                    <span class="diagnosis-tip">附件可能会调整</span>
                  </el-row>
                  <el-row class="mb20">
                    <el-radio :label="2" border>保留指定附件</el-radio>
                    <span class="diagnosis-tip">根据设计方案可能调整其他附件或添加新附件</span>
                  </el-row>
                  <el-row class="mb20" v-show="feedbackForm.annex===2">
                    <div class="annex-two-title">请在下方牙列式内选择需要保留的附件</div>
                    <div class="annex-two-content">
                      <el-checkbox-group v-model="feedbackForm.annexInfoOne" class="annex-two-checkbox">
                        <el-checkbox :label="55" border disabled></el-checkbox>
                        <el-checkbox :label="54" border disabled></el-checkbox>
                        <el-checkbox :label="53" border disabled></el-checkbox>
                        <el-checkbox :label="52" border disabled></el-checkbox>
                        <el-checkbox :label="51" border disabled></el-checkbox>
                        <el-checkbox :label="61" border disabled></el-checkbox>
                        <el-checkbox :label="62" border disabled></el-checkbox>
                        <el-checkbox :label="63" border disabled></el-checkbox>
                        <el-checkbox :label="64" border disabled></el-checkbox>
                        <el-checkbox :label="65" border disabled></el-checkbox>
                      </el-checkbox-group>
                      <el-checkbox-group v-model="feedbackForm.annexInfoTwo" class="annex-two-checkbox checked-checkbox">
                        <el-checkbox :label="18" border></el-checkbox>
                        <el-checkbox :label="17" border></el-checkbox>
                        <el-checkbox :label="16" border></el-checkbox>
                        <el-checkbox :label="15" border></el-checkbox>
                        <el-checkbox :label="14" border></el-checkbox>
                        <el-checkbox :label="13" border></el-checkbox>
                        <el-checkbox :label="12" border></el-checkbox>
                        <el-checkbox :label="11" border></el-checkbox>
                        <el-checkbox :label="21" border></el-checkbox>
                        <el-checkbox :label="22" border></el-checkbox>
                        <el-checkbox :label="23" border></el-checkbox>
                        <el-checkbox :label="24" border></el-checkbox>
                        <el-checkbox :label="25" border></el-checkbox>
                        <el-checkbox :label="26" border></el-checkbox>
                        <el-checkbox :label="27" border></el-checkbox>
                        <el-checkbox :label="28" border></el-checkbox>
                      </el-checkbox-group>
                      <el-checkbox-group v-model="feedbackForm.annexInfoThree" class="annex-two-checkbox checked-checkbox">
                        <el-checkbox :label="48" border></el-checkbox>
                        <el-checkbox :label="47" border></el-checkbox>
                        <el-checkbox :label="46" border></el-checkbox>
                        <el-checkbox :label="45" border></el-checkbox>
                        <el-checkbox :label="44" border></el-checkbox>
                        <el-checkbox :label="43" border></el-checkbox>
                        <el-checkbox :label="42" border></el-checkbox>
                        <el-checkbox :label="41" border></el-checkbox>
                        <el-checkbox :label="31" border></el-checkbox>
                        <el-checkbox :label="32" border></el-checkbox>
                        <el-checkbox :label="33" border></el-checkbox>
                        <el-checkbox :label="34" border></el-checkbox>
                        <el-checkbox :label="35" border></el-checkbox>
                        <el-checkbox :label="36" border></el-checkbox>
                        <el-checkbox :label="37" border></el-checkbox>
                        <el-checkbox :label="38" border></el-checkbox>
                      </el-checkbox-group>
                      <el-checkbox-group v-model="feedbackForm.annexInfoFour" class="annex-two-checkbox">
                        <el-checkbox :label="85" border disabled></el-checkbox>
                        <el-checkbox :label="84" border disabled></el-checkbox>
                        <el-checkbox :label="83" border disabled></el-checkbox>
                        <el-checkbox :label="82" border disabled></el-checkbox>
                        <el-checkbox :label="81" border disabled></el-checkbox>
                        <el-checkbox :label="71" border disabled></el-checkbox>
                        <el-checkbox :label="72" border disabled></el-checkbox>
                        <el-checkbox :label="73" border disabled></el-checkbox>
                        <el-checkbox :label="74" border disabled></el-checkbox>
                        <el-checkbox :label="75" border disabled></el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </el-row>
                  <el-row class="mb20">
                    <el-radio :label="3" border>保留全部附件</el-radio>
                    <span class="diagnosis-tip">根据设计方案可能添加附件</span>
                  </el-row>
                </el-radio-group>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <span slot="label"><i class="el-icon-video-camera"></i> 影像资料及模型<i class="el-icon-arrow-right arrow-style"></i></span>
        </el-tab-pane>
        <el-tab-pane :name="3">
          <span slot="label"><i class="el-icon-document-checked"></i> 提交</span>
        </el-tab-pane>
      </el-tabs>
      <div class="restart-case-main-footer">
        <el-button type="primary" v-show="active>1" @click="prev">上一页</el-button>
        <el-button type="primary" v-show="active<3" @click="next">下一页</el-button>
        <el-button type="primary" v-show="active<3" plain @click="caseSubmit('preserve')">暂存</el-button>
        <el-button type="primary" v-show="active === 3" plain @click="caseSubmit('submit')">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { uploadOBS } from "@/util/obs";
  export default {
    name: "RestartCaseDetail",
    data() {
      return {
        active: 1,
        caseItem: {},
        feedbackForm: {
          isFit: "",
          upSteps: 0,
          downSteps: 0,
          annex: "",
          annexInfoOne: [],
          annexInfoTwo: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28],
          annexInfoThree: [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
          annexInfoFour: [],
        },
        feedbackRules: {},
        maxUpSteps: 0,
        maxDownSteps: 0,
      }
    },
    created() {
      var rParamsData = sessionStorage.getItem("rParamsData");
      if (rParamsData) {
        var rParams = JSON.parse(sessionStorage.getItem("rParamsData"));
      } else {
        var rParams = this.$route.params;
        sessionStorage.setItem("rParamsData", JSON.stringify(rParams));
      }
      this.caseItem = rParams.item;
    },
    beforeDestroy() {
      sessionStorage.removeItem("rParamsData");
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
      caseSubmit(state) {},
      annexChange() {
        this.feedbackForm.annexInfoTwo = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
        this.feedbackForm.annexInfoThree = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
      },
    }
  }
</script>
<style scoped>
  .restart-case-contain {
    width: 1200px;
    margin: 0 auto;
  }
  .restart-case-title {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 16px 0;
  }
  .restart-case-title-main {
    color: #000;
    font-size: 16px;
    width: 100%;
    text-align: center;
  }
  .restart-case-main {
    background: #fff;
    box-shadow: 0 2px 2px 1px #daecef;
    border-radius: 10px;
    padding: 20px;
    width: calc(100% - 40px);
    min-height: 80%;
    position: relative;
    margin-bottom: 93px;
  }
  .restart-case-main >>> .el-tabs__nav-wrap::after {
    height: 0;
  }
  .restart-case-main >>> .el-tabs__nav {
    width: 100%;
  }
  .restart-case-main >>> .el-tabs__item {
    width: 33.33%;
    text-align: center;
  }
  .restart-case-main >>> .el-tabs__nav-wrap {
    background: #f6f7fa;
    border-radius: 4px;
  }
  .arrow-style {
    float: right;
    height: 40px;
    line-height: 40px;
    color: #303133;
  }
  .restart-case-main-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
    padding: 11px 0;
  }
  .restart-case-main-one {
    padding: 30px 0 0 40px;
  }
  .restart-case-main-one-top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .restart-case-main-one-top-img {
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
  .restart-case-main-one-top-name {
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
  .restart-case-main-one-top-id {
    margin-left: 30px;
    font-weight: 300;
    font-size: 18px;
    color: #999;
  }
  .restart-case-main-one-top-id-span {
    font-weight: 400;
    font-size: 18px;
    color: #555;
  }
  .diagnosis-title {
    font-size: 20px;
    color: #555;
    height: 30px;
    line-height: 30px;
    margin-bottom: 24px;
  }
  .diagnosis-title-required::before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }
  .diagnosis-tip {
    font-size: 16px;
    margin-left: 20px;
    color: #999;
  }
  .common-radio >>> .el-radio__input {
    display: none;
  }
  .common-radio >>> .el-radio.is-bordered {
    text-align: center;
  }
  .w180 >>> .el-radio.is-bordered {
    width: 180px;
  }
  .common-radio >>> .el-radio.is-bordered.is-checked {
    border-color: #409EFF;
    background: #409EFF;
  }
  .common-radio >>> .el-radio__input.is-checked+.el-radio__label {
    color: #fff;
  }
  .not-fit-desc {
    color: #f44336;
    font-size: 14px;
    font-weight: 400;
    margin-left: 152px;
  }
  .hide-desc {
    opacity: 0;
  }
  .restart-case-main-one-check {
    padding: 0 21px;
  }
  .diagnosis-two-title {
    font-size: 16px;
    font-weight: 300;
    color: #333;
    margin-bottom: 25px;
  }
  .steps-input {
    width: 85px;
    margin: 0 8px;
  }
  .steps-title {
    font-size: 16px;
    font-weight: 300;
    color: #333;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .annex-two-title {
    color: rgba(0,0,0,.85);
    font-size: 14px;
    margin-bottom: 24px;
  }
  .annex-two-content {
    width: 1028px;
    position: relative;
  }
  .annex-two-content::after {
    height: 100%;
    border-right: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: -5px;
    left: 503px;
    z-index: 10;
  }
  .annex-two-content::before {
    width: 1008px;
    border-bottom: 1px dashed #c5c5c5;
    display: inline-block;
    content: "";
    position: absolute;
    top: 102px;
    left: 0;
    z-index: 10;
  }
  .annex-two-checkbox {
    text-align: center;
  }
  .annex-two-checkbox >>> .el-checkbox__input {
    display: none;
  }
  .annex-two-checkbox >>> .el-checkbox.is-bordered {
    width: 42px;
    margin-left: 0;
    margin-right: 22px;
    margin-bottom: 15px;
    text-align: center;
  }
  .annex-two-checkbox >>> .el-checkbox__label {
    padding-left: 0;
    font-size: 20px;
    font-weight: normal;
  }
  .checked-checkbox >>> .el-checkbox.is-bordered {
    background-color: #409EFF;
  }
  .checked-checkbox >>> .el-checkbox.is-bordered.is-checked {
    background-color: #fff;
  }
</style>
