<template>
  <div class="merge-form" v-resize="resize" ref="mergeFormRef" :class="{'min-merge-form': isMinWidth}">
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
        isMinWidth: false,
        completeTime: "",
        feedbackTime: "",
        prescriptionTime: "",
      }
    },
    directives: {
      resize: {
        bind(el, binding) {
          let width = '', height = '';
          function isReize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
              binding.value();
            }
            width = style.width;
            height = style.height;
          }
          el.__vueSetInterval__ = setInterval(isReize, 300);
        },
        unbind(el) {
          clearInterval(el.__vueSetInterval__);
        }
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
      resize() {
        if (this.$refs["mergeFormRef"].offsetWidth <= 1440) {
          this.isMinWidth = true;
        } else {
          this.isMinWidth = false;
        }
      },
    }
  }
</script>
<style scoped>
  .merge-form {
    min-width: 1440px;
    overflow: auto;
  }
  .merge-form >>> .el-tabs__header {
    width: 110px;
    position: absolute;
    height: auto;
    top: 55px;
    left: calc(calc(calc(100% - 1200px) / 2) - 120px);
  }
  .min-merge-form >>> .el-tabs__header {
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
