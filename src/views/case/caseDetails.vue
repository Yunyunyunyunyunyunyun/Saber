<template>
  <div class="detail-contain">
    <div class="detail-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="detail-title-main">病例号：{{caseData.record ? caseData.record.medicalCode : ""}}</div>
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
                <div
                  class="detail-out-information-main-patient-information-basic-name"
                  v-if="caseData.prescription && caseData.prescription.name">
                  <span :title="caseData.prescription.name">{{caseData.prescription.name}}</span>
                </div>
                <div class="detail-out-information-main-patient-information-basic-status" v-if="caseData.record && caseData.record.state">{{caseData.record.state | filterState}}</div>
                <div class="detail-out-information-main-patient-information-basic-sex_age" v-if="caseData.prescription && caseData.prescription.sex+''">{{caseData.prescription.sex | filterSex}}</div>
                <div class="detail-out-information-main-patient-information-basic-sex_age" v-if="caseData.age+''">{{caseData.age}}</div>
              </div>
            </div>
          </div>
          <div class="detail-out-information-main-pathogeny">
            <div class="detail-out-complaint">
              <span class="detail-out-title">主诉:</span>
              <span v-if="caseData.prescription && caseData.prescription.ccTeeth">
                <span class="detail-out-content" v-for="item in caseData.prescription.ccTeeth.split(',').map(Number).sort()" :key="item">{{item | filterCcTeeth}}</span>
              </span>
              <span v-if="caseData.prescription && caseData.prescription.ccJaw">
                <span class="detail-out-content" v-for="item in caseData.prescription.ccJaw.split(',').map(Number).sort()" :key="item">{{item | filterCcJaw}}</span>
              </span>
            </div>
            <div class="detail-out-target">
              <span class="detail-out-title">主要矫治目标:</span>
              <span v-if="caseData.prescription && caseData.prescription.teeth">
                <span class="detail-out-content" v-for="item in caseData.prescription.teeth.split(',').map(Number).sort()" :key="item">{{item | filterTeeth}}</span>
              </span>
            </div>
            <div class="detail-out-classification">
              <span class="detail-out-title">临床分类:</span>
              <span v-if="caseData.prescription && caseData.prescription.annType">
                <span class="detail-out-content">{{caseData.prescription.annType | filterAnnType}}</span>
              </span>
              <span v-if="caseData.prescription && caseData.prescription.bonyType">
                <span class="detail-out-content">{{caseData.prescription.bonyType | filterBonyType}}</span>
              </span>
              <span v-if="caseData.prescription && caseData.prescription.malocclusionType">
                <span class="detail-out-content" v-for="item in caseData.prescription.malocclusionType.split(',').map(Number).sort()" :key="item">{{item | filterMalocclusionType}}</span>
              </span>
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
      },
      filterCcTeeth(value) {
        if (value === 1) {
          return "牙前突";
        } else if (value === 2) {
          return "牙列不齐";
        } else if (value === 3) {
          return "牙间隙";
        } else if (value === 4) {
          return "反合";
        } else if (value === 5) {
          return "开合";
        } else if (value === 6) {
          return "后牙锁合";
        } else if (value === 7) {
          return "其他";
        } else {
          return "未知";
        }
      },
      filterCcJaw(value) {
        if (value === 1) {
          return "上颌前突";
        } else if (value === 2) {
          return "上颌发育不足";
        } else if (value === 3) {
          return "下颌前突";
        } else if (value === 4) {
          return "下颌后缩";
        } else {
          return "未知";
        }
      },
      filterTeeth(value) {
        if (value === 1) {
          return "改善牙前突";
        } else if (value === 2) {
          return "排齐牙齿";
        } else if (value === 3) {
          return "关闭牙间隙";
        } else if (value === 4) {
          return "纠正反合";
        } else if (value === 5) {
          return "纠正开合";
        } else if (value === 6) {
          return "纠正后牙锁合";
        } else if (value === 7) {
          return "其他";
        } else {
          return "未知";
        }
      },
      filterAnnType(value) {
        if (value === 1) {
          return "安氏I类";
        } else if (value === 2) {
          return "安氏II类";
        } else if (value === 3) {
          return "安氏III类";
        } else if (value === 4) {
          return "不确定";
        } else {
          return "未知";
        }
      },
      filterBonyType(value) {
        if (value === 1) {
          return "骨性I类";
        } else if (value === 2) {
          return "骨性II类";
        } else if (value === 3) {
          return "骨性III类";
        } else {
          return "未知";
        }
      },
      filterMalocclusionType(value) {
        if (value === 1) {
          return "牙前突";
        } else if (value === 2) {
          return "拥挤";
        } else if (value === 3) {
          return "牙列间隙";
        } else if (value === 4) {
          return "深覆合";
        } else if (value === 5) {
          return "前牙反合";
        } else if (value === 6) {
          return "后牙反合";
        } else if (value === 7) {
          return "后牙锁合";
        } else if (value === 8) {
          return "开合";
        } else if (value === 9) {
          return "上颌前突";
        } else if (value === 10) {
          return "上颌发育不足";
        } else if (value === 11) {
          return "下颌前突";
        } else if (value === 12) {
          return "下颌后缩";
        } else {
          return "未知";
        }
      },
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
    max-width: 216px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
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
  .detail-out-information-main-pathogeny {
    flex: 1 1;
  }
  .detail-out-complaint {
    border-bottom: 1px solid #edf0f5;
    padding-bottom: 12px;
    min-width: 100%;
  }
  .detail-out-target {
    margin: 12px 0;
  }
  .detail-out-classification {
    padding-top: 12px;
    border-top: 1px solid #edf0f5;
  }
  .detail-out-title {
    color: #666;
    font-size: 14px;
    font-weight: 300;
    margin-right: 10px;
  }
  .detail-out-content {
    color: #333;
    font-size: 14px;
    font-weight: 300;
    margin-right: 10px;
  }
</style>