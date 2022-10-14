<template>
  <div class="complete-form-contain">
    <div class="complete-form-title">
      <span title="完成确认表">完成确认表</span>
    </div>
    <div class="complete-form-main"></div>
  </div>
</template>
<script>
  import { getCompleteForm } from "@/api/case/commonCase";
  export default {
    name: "CompleteForm",
    data() {
      return {
        currentCompleteId: "",
      }
    },
    created() {
      this.currentCompleteId = this.$route.query.completeId || "";
      if (this.currentCompleteId) {
        this.getCompleteData(this.currentCompleteId);
      }
    },
    methods: {
      getCompleteData(cCompleteId) {
        let params = {
          completeId: cCompleteId,
        }
        getCompleteForm(params).then(res => {});
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
</style>