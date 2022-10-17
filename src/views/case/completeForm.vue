<template>
  <div class="complete-form-contain">
    <div class="complete-form-title">
      <span title="完成确认表">完成确认表</span>
    </div>
    <div class="complete-form-main">
      <div class="complete-form-info-title">
        <i class="el-icon-user icon-color"></i>基本信息
      </div>
      <div class="complete-form-info-content">
        <div class="complete-form-info-img-pack">
          <img class="complete-form-info-img" v-if="completeData.frontPath" :src="completeData.frontPath" alt="">
        </div>
        <div class="complete-form-info-name" v-if="currentCompleteData && currentCompleteData.name">{{currentCompleteData.name}}</div>
        <div class="complete-form-info-case">
          <span>病例号：</span>
          <span class="case-span" v-if="currentCompleteData && currentCompleteData.medicalCode">{{currentCompleteData.medicalCode}}</span>
        </div>
      </div>
      <div class="complete-form-info-title">
        <i class="el-icon-document-checked icon-color"></i>完成确认表
      </div>
      <div class="complete-form-info-feedback">
        <span class="complete-form-info-feedback-title">1. 矫治完成确认</span>
        <div class="complete-form-info-feedback-every">
          <div class="complete-form-info-feedback-every-title">1.1 确认完成属于哪种情况:</div>
          <div class="complete-form-info-feedback-every-content">{{completeData.correctComplete | filterCorrectComplete}}</div>
        </div>
        <div v-if="completeData.correctComplete === 4" class="complete-form-info-feedback-every-text">{{completeData.correctCompleteOther}}</div>
        <div class="complete-form-info-feedback-every">
          <div class="complete-form-info-feedback-every-title">1.2 完成矫治日期:</div>
          <div class="complete-form-info-feedback-every-content">{{completeData.correctCompleteTime}}</div>
        </div>
      </div>
      <div class="complete-form-info-feedback">
        <span class="complete-form-info-feedback-title">2. 定制保持器:</span>
        <span class="complete-form-info-feedback-title">{{completeData.customRetainer | filterCustomRetainer}}</span>
        <span class="complete-form-info-feedback-title-tip" v-if="customRetainer !== 1">{{completeData.customRetainer | filterCustomRetainerTwo}}</span>
      </div>
      <div class="complete-form-info-title">
        <i class="el-icon-video-camera icon-color"></i>影像及资料
      </div>
    </div>
  </div>
</template>
<script>
  import { getCompleteForm } from "@/api/case/commonCase";
  export default {
    name: "CompleteForm",
    data() {
      return {
        currentCompleteData: {},
        completeData: {},
      }
    },
    filters: {
      filterCorrectComplete(value) {
        if (value === 1) {
          return "实现矫治目标";
        } else if (value === 2) {
          return "隐形矫治达到阶段效果，改用其他矫治方法完成";
        } else if (value === 3) {
          return "未完成实现隐形矫治目标，但患者要求结束矫治";
        } else if (value === 4) {
          return "其他";
        } else {
          return "无";
        }
      },
      filterCustomRetainer(value) {
        if (value === 1) {
          return "不需要";
        } else {
          return "需要";
        }
      },
      filterCustomRetainerTwo(value) {
        if (value === 2) {
          return "最后一步订做保持器";
        } else if (value === 3) {
          return "提交模型后订做保持器";
        } else {
          return "无";
        }
      },
    },
    created() {
      var cCompleteData = sessionStorage.getItem("cCompleteData");
      if (cCompleteData) {
        var queryCompleteData = JSON.parse(sessionStorage.getItem("cCompleteData"));
      } else {
        var queryCompleteData = JSON.parse(this.$route.query.completeNeed);
        sessionStorage.setItem("cCompleteData", JSON.stringify(queryCompleteData));
      }
      this.currentCompleteData = queryCompleteData;
      if (this.currentCompleteData.completeId) {
        this.getCompleteData(this.currentCompleteData.completeId);
      }
    },
    methods: {
      getCompleteData(cCompleteId) {
        let params = {
          completeId: cCompleteId,
        }
        getCompleteForm(params).then(res => {
          if (res.data.code == 200) {
            this.completeData = res.data.data;
          }
        });
      }
    }
  }
</script>
<style scoped>
  .complete-form-contain {
    width: 100%;
    width: 1200px;
    margin: 0 auto;
  }
  .complete-form-title {
    padding: 16px 0;
    text-align: center;
    width: 300px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
    color: #000;
    font-size: 16px;
    font-weight: 400;
  }
  .complete-form-main {
    background: #fff;
    box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
    border-radius: 10px;
    padding: 60px;
  }
  .complete-form-info-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  .icon-color {
    color: #409EFF;
    margin-right: 10px;
  }
  .complete-form-info-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .complete-form-info-img-pack {
    width: 82px;
    height: 82px;
    margin-right: 30px;
  }
  .complete-form-info-img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }
  .complete-form-info-name {
    color: #333;
    font-size: 26px;
    font-weight: 700;
    margin-right: 30px;
  }
  .complete-form-info-case {
    color: #999;
    font-size: 16px;
    font-weight: 400;
  }
  .case-span {
    color: #555;
    font-size: 18px;
    font-weight: 700;
  }
  .complete-form-info-feedback {
    margin-bottom: 60px;
  }
  .complete-form-info-feedback-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
    margin-right: 10px;
  }
  .complete-form-info-feedback-every {
    padding: 20px 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .complete-form-info-feedback-every-title {
    color: #555;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-right: 10px;
  }
  .complete-form-info-feedback-every-content {
    color: #333;
    font-size: 18px;
    font-weight: 400;
  }
  .complete-form-info-feedback-every-text {
    width: calc(100%-66px);
    background: #f6f7fa;
    border-radius: 4px;
    height: 50px;
    margin: 16px 20px 0;
    padding: 23px;
    color: #555;
    font-size: 17px;
    font-weight: 400;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow-y: auto;
  }
  .complete-form-info-feedback-title-tip {
    margin-left: 5px;
    color: #333;
    font-size: 16px;
    font-weight: 400;
  }
</style>
