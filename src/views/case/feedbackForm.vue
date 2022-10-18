<template>
  <div class="feedback-form-contain">
    <div class="feedback-form-title">
      <span title="重启反馈表">重启反馈表</span>
    </div>
    <div class="feedback-form-main">
      <div class="feedback-form-info-title">
        <i class="el-icon-user icon-color"></i>基本信息
      </div>
      <div class="feedback-form-info-content">
        <div class="feedback-form-info-img-pack">
          <img class="feedback-form-info-img" v-if="feedbackData.frontPath" :src="feedbackData.frontPath" alt="">
        </div>
        <div class="feedback-form-info-name" v-if="restartData && restartData.name">{{restartData.name}}</div>
        <div class="feedback-form-info-case">
          <span>病例号：</span>
          <span class="case-span" v-if="restartData && restartData.medicalCode">{{restartData.medicalCode}}</span>
        </div>
      </div>
      <div class="feedback-form-info-title">
        <i class="el-icon-chat-line-square icon-color"></i>阶段反馈
      </div>
    </div>
  </div>
</template>
<script>
  import { getFeedbackForm } from "@/api/case/commonCase";
  export default {
    name: "FeedbackForm",
    data() {
      return {
        restartData: {},
        feedbackData: {},
      }
    },
    filters: {},
    created() {
      this.restartData = JSON.parse(this.$route.query.restartObject);
      if (this.restartData.restartId) {
        this.getFeedbackData(this.restartData.restartId);
      }
    },
    methods: {
      getFeedbackData(restartId) {
        let params = {
          restartId: restartId,
        }
        getFeedbackForm(params).then(res => {
          if (res.data.code == 200) {
            this.feedbackData = res.data.data;
          }
        });
      },
    }
  }
</script>
<style scoped>
  .feedback-form-contain {
    width: 100%;
    width: 1200px;
    margin: 0 auto;
  }
  .feedback-form-title {
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
  .feedback-form-main {
    background: #fff;
    box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
    border-radius: 10px;
    padding: 60px;
  }
  .feedback-form-info-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  .icon-color {
    color: #409EFF;
    margin-right: 10px;
  }
  .feedback-form-info-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .feedback-form-info-img-pack {
    width: 82px;
    height: 82px;
    margin-right: 30px;
  }
  .feedback-form-info-img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }
  .feedback-form-info-name {
    color: #333;
    font-size: 26px;
    font-weight: 700;
    margin-right: 30px;
  }
  .feedback-form-info-case {
    color: #999;
    font-size: 16px;
    font-weight: 400;
  }
  .case-span {
    color: #555;
    font-size: 18px;
    font-weight: 700;
  }
</style>
