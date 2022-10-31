<template>
<div class="merge-form-pack">
  <div class="merge-form">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="complete" v-if="mergeData.record && mergeData.record.completeId && mergeData.record.completeId !== -1">
        <div slot="label">
          <div>{{completeTime}}</div>
          <div>完成确认表</div>
        </div>
        <complete-form :key="completeKey" :completeObj="completeObj"></complete-form>
      </el-tab-pane>
      <el-tab-pane name="feedback" v-if="mergeData.record && mergeData.record.restartId && mergeData.record.restartId !== -1">
        <div slot="label">
          <div>{{feedbackTime}}</div>
          <div>重启反馈表</div>
        </div>
        <feedback-form :key="feedbackKey" :feedbackObj="feedbackObj"></feedback-form>
      </el-tab-pane>
      <el-tab-pane name="prescription" v-if="mergeData.record && mergeData.record.prescriptionId && mergeData.record.prescriptionId !== -1">
        <div slot="label">
          <div>{{prescriptionTime}}</div>
          <div>处方表</div>
        </div>
        <prescription-details :key="prescriptionKey" :prescriptionObj="prescriptionObj"></prescription-details>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
  import prescriptionDetails from "./prescriptionDetails.vue";
  import feedbackForm from "./feedbackForm.vue";
  import completeForm from "./completeForm.vue";
  export default {
    name: "MergeForm",
    components: {
      prescriptionDetails,
      feedbackForm,
      completeForm,
    },
    data() {
      return {
        mergeData: {},
        completeObj: {},
        feedbackObj: {},
        prescriptionObj: {},
        completeKey: "",
        feedbackKey: "",
        prescriptionKey: "",
        activeName: "",
        completeTime: "",
        feedbackTime: "",
        prescriptionTime: "",
      }
    },
    created() {
      this.mergeData = JSON.parse(this.$route.query.mergeObject);
      this.completeObj = {
        ifComponents: true,
        completeId: this.mergeData.record.completeId || "",
        name: this.mergeData.prescription.name || "",
        medicalCode: this.mergeData.record.medicalCode || "",
      }
      this.feedbackObj = {
        ifComponents: true,
        restartId: this.mergeData.record.restartId || "",
        name: this.mergeData.prescription.name || "",
        medicalCode: this.mergeData.record.medicalCode || "",
      }
      this.prescriptionObj = {
        ifComponents: true,
        photoId: this.mergeData.record.photoId || "",
        prescriptionId: this.mergeData.record.prescriptionId || "",
      }
      if (this.mergeData.record && this.mergeData.record.completeId && this.mergeData.record.completeId !== -1) {
        this.activeName = "complete";
      } else {
        this.activeName = "feedback";
      }
      this.completeTime = this.mergeData.historyList.find((item) => {
          return item.caseType === 3;
        }) ? this.mergeData.historyList.find((item) => {
          return item.caseType === 3;
        }).createTime.substring(0, 10) : "";
      this.feedbackTime = this.mergeData.historyList.find((item) => {
          return item.caseType === 2;
        }) ? this.mergeData.historyList.find((item) => {
          return item.caseType === 2;
        }).createTime.substring(0, 10) : "";
      this.prescriptionTime = this.mergeData.historyList.find((item) => {
          return item.caseType !== 3 && item.caseType !== 2;
        }) ? this.mergeData.historyList.find((item) => {
          return item.caseType !== 3 && item.caseType !== 2;
        }).createTime.substring(0, 10) : "";
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name === "complete") {
          this.completeKey = tab.name;
        } else if (tab.name === "feedback") {
          this.feedbackKey = tab.name;
        } else if (tab.name === "prescription") {
          this.prescriptionKey = tab.name;
        } else {
          this.completeKey = "";
          this.feedbackKey = "";
          this.prescriptionKey = "";
        }
      },
    }
  }
</script>
<style scoped>
  .merge-form-pack {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .merge-form {
    width: 1440px;
    margin: 0 auto;
    position: relative;
  }
  .merge-form >>> .el-tabs__header {
    width: 110px;
    position: absolute;
    height: auto;
    top: 55px;
    left: 0;
  }
  .merge-form >>> .el-tabs__item {
    line-height: normal;
    padding: 10px 20px;
    height: 60px;
  }
</style>
