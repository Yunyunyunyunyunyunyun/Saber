<template>
  <div class="prescription-contain">
    <div class="prescription-title" v-if="prescriptionData.name">
      <span :title="prescriptionData.name+' 的处方表'">{{prescriptionData.name}} 的处方表</span>
    </div>
    <div class="prescription-main"></div>
  </div>
</template>
<script>
import { getPrescriptionDetail } from "@/api/case/commonCase";
export default {
  name: "PrescriptionDetails",
  data() {
    return {
      currentPhotoId: "",
      currentPrescriptionId: "",
      photoData: {},
      prescriptionData: {},
    }
  },
  created() {
    this.currentPhotoId = this.$route.query.photoId || "";
    this.currentPrescriptionId = this.$route.query.prescriptionId || "";
    if (this.currentPhotoId && this.currentPrescriptionId) {
      this.getPrescriptionData(this.currentPhotoId, this.currentPrescriptionId);
    }
  },
  methods: {
    getPrescriptionData(cPhotoId, cPrescriptionId) {
      let params = {
        photoId: cPhotoId,
        prescriptionId: cPrescriptionId,
      }
      getPrescriptionDetail(params).then(res => {
        if (res.data.code == 200) {
          this.photoData = res.data.data.photo;
          this.prescriptionData = res.data.data.prescription;
        }
      });
    }
  },
}
</script>
<style scoped>
.prescription-contain {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.prescription-title {
  padding: 16px 0;
  text-align: center;
  width: 500px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
}
.prescription-main {
  padding: 60px 50px;
  background-color: #fff;
  box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
  border-radius: 10px;
}
</style>