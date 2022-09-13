<template>
  <div class="detail-contain">
    <div class="detail-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="detail-title-main">病例号：{{caseData.record.medicalCode}}</div>
    </div>
    <div class="detail-out">
      <div class="detail-out-information">
        <div class="detail-out-information-main">
          <div class="detail-out-information-main-patient">
            <div class="detail-out-information-main-patient-information">
              <div class="detail-out-information-main-patient-information-img">
                <div class="ant-image">
                  <img v-if="caseData.photo && caseData.photo.frontPath" :src="caseData.photo.frontPath" alt="" class="info-img">
                  <i v-else class="el-icon-user user-icon"></i>
                </div>
              </div>
              <div class="detail-out-information-main-patient-information-basic">
                <div class="detail-out-information-main-patient-information-basic-name">{{caseData.prescription.name}}</div>
                <div class="detail-out-information-main-patient-information-basic-status">{{caseData.record.state | filterState}}</div>
                <div class="detail-out-information-main-patient-information-basic-sex_age">{{caseData.prescription.sex | filterSex}}</div>
                <div class="detail-out-information-main-patient-information-basic-sex_age">{{caseData.age}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDetails } from "@/api/case/commonCase";
  export default {
    name: "CaseDetails",
    data() {
      return {
        currentCaseId: "",
        caseData: {},
      }
    },
    created() {
      this.currentCaseId = this.$route.query.id || "";
      if (this.currentCaseId) {
        this.getCaseDetails(this.currentCaseId);
      }
    },
    filters: {
      filterState(value) {
        if (value === 10) {
          return "待提交";
        } else if (value > 10 && value < 80) {
          return "治疗中";
        } else if (value > 70) {
          return "已完成";
        } else {
          return "未知";
        }
      },
      filterSex(value) {
        if (value === 0) {
          return "女";
        } else if (value === 1) {
          return "男";
        } else {
          return "未知";
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      getCaseDetails(id) {
        const params = {
          id: id,
        };
        getDetails(params).then(res => {
          if (res.data.code == 200) {
            this.caseData = res.data.data;
          }
        });
      },
    },
  }
</script>
<style scoped>
  .detail-contain {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
  }
  .detail-title {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 16px 0;
  }
  .detail-title-main {
    color: #000;
    font-size: 16px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }
  .detail-out {
    width: 100%;
  }
  .detail-out-information {
    width: 100%;
    box-shadow: 0 2px 2px 1px #daecef;
    border-radius: 6px;
    background: #fff;
    margin-bottom: 16px;
  }
  .detail-out-information-main {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .detail-out-information-main-patient {
    padding: 14px 16px 14px 0;
    border-right: 1px solid #edf0f5;
    margin-right: 21px;
    min-width: 302px;
  }
  .detail-out-information-main-patient-information {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .detail-out-information-main-patient-information-img {
    width: 96px;
    height: 132px;
    overflow: hidden;
    margin-right: 13px;
    border-radius: 16px;
  }
  .ant-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .user-icon {
    font-size: 96px;
  }
  .detail-out-information-main-patient-information-basic {
    color: #000;
    font-size: 14px;
    line-height: 24px;
    white-space: nowrap;
    font-weight: 400;
  }
  .detail-out-information-main-patient-information-basic-name {
    font-size: 18px;
  }
  .detail-out-information-main-patient-information-basic-status {
    color: #409EFF;
    margin: 11px 0 13px;
  }
  .detail-out-information-main-patient-information-basic-sex_age {
    color: #999;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>