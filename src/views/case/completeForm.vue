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
        <div v-if="completeData.frontPath">
          <img :src="completeData.frontPath" alt="" class="complete-form-info-img">
        </div>
        <div class="complete-form-info-name" v-if="currentCompleteData && currentCompleteData.name">{{currentCompleteData.name}}</div>
        <div class="complete-form-info-case">
          <span>病例号：</span>
          <span class="case-span" v-if="currentCompleteData && currentCompleteData.medicalCode">{{currentCompleteData.medicalCode}}</span>
        </div>
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
  .complete-form-info-img {
    width: 82px;
    height: 82px;
    margin-right: 30px;
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
</style>
