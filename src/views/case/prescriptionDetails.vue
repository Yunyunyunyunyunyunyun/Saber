<template>
  <div class="prescription-contain">
    <div class="prescription-title" v-if="prescriptionData.name">
      <span :title="prescriptionData.name+' 的处方表'">{{prescriptionData.name}} 的处方表</span>
    </div>
    <div class="prescription-main">
      <div class="prescription-main-title">
        <i class="el-icon-user icon-color"></i>基本信息
      </div>
      <div class="prescription-main-information">
        <span class="prescription-main-information-span" v-if="prescriptionData.name"><span :title="prescriptionData.name">{{prescriptionData.name}}</span></span>
        <span class="prescription-main-information-span" v-if="prescriptionData.sex+''">{{prescriptionData.sex | filterSex}}</span>
        <span class="prescription-main-information-span">{{ageData}}岁</span>
      </div>
      <div class="prescription-main-every">
        <span>医疗机构：</span>
        <span v-if="clinicNameData">{{clinicNameData}}</span>
        <span v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>安氏分类：</span>
        <span v-if="prescriptionData.annType">{{prescriptionData.annType | filterAnnType}}</span>
        <span v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>骨性分类：</span>
        <span v-if="prescriptionData.bonyType">{{prescriptionData.bonyType | filterBonyType}}</span>
        <span v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>错合类型：</span>
        <span v-if="prescriptionData.malocclusionType">
          <span class="prescription-main-every-content mr10" v-for="item in prescriptionData.malocclusionType.split(',').map(Number).sort()" :key="item">{{item | filterMalocclusionType}}</span>
        </span>
        <span v-else>无</span>
      </div>
      <div class="prescription-main-title mt60">
        <i class="el-icon-tickets icon-color"></i>诊断及矫治说明
      </div>
      <div class="prescription-main-double-every">
        <div>1.主诉：</div>
        <div>
          <div class="mb17">
            <span>牙齿问题</span>
            <span v-if="prescriptionData.ccTeeth">
              <span class="prescription-main-every-content ml10" v-for="item in prescriptionData.ccTeeth.split(',').map(Number).sort()" :key="item">{{item | filterCcTeeth}}</span>
            </span>
            <span v-else>无</span>
          </div>
          <div>
            <span>颌骨问题</span>
            <span v-if="prescriptionData.ccJaw">
              <span class="prescription-main-every-content ml10" v-for="item in prescriptionData.ccJaw.split(',').map(Number).sort()" :key="item">{{item | filterCcJaw}}</span>
            </span>
            <span v-else>无</span>
          </div>
        </div>
      </div>
      <div class="prescription-main-every">
        <span>2.主要矫治目标：牙齿问题</span>
        <span v-if="prescriptionData.teeth">
          <span class="prescription-main-every-content ml10" v-for="item in prescriptionData.teeth.split(',').map(Number).sort()" :key="item">{{item | filterTeeth}}</span>
        </span>
        <span v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>3.拟矫治牙颌：</span>
        <span v-if="prescriptionData.orthodonticJaw">{{prescriptionData.orthodonticJaw | filterOrthodonticJaw}}</span>
        <span v-else>无</span>
      </div>
      <div class="prescription-main-every">
        <span>4.牙齿信息</span>
      </div>
      <div class="info-item">
        <el-checkbox-group v-model="teethInformationOne" class="info-select">
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
        <el-checkbox-group v-model="teethInformationTwo" class="info-select">
          <el-checkbox :label="18" border disabled></el-checkbox>
          <el-checkbox :label="17" border disabled></el-checkbox>
          <el-checkbox :label="16" border disabled></el-checkbox>
          <el-checkbox :label="15" border disabled></el-checkbox>
          <el-checkbox :label="14" border disabled></el-checkbox>
          <el-checkbox :label="13" border disabled></el-checkbox>
          <el-checkbox :label="12" border disabled></el-checkbox>
          <el-checkbox :label="11" border disabled></el-checkbox>
          <el-checkbox :label="21" border disabled></el-checkbox>
          <el-checkbox :label="22" border disabled></el-checkbox>
          <el-checkbox :label="23" border disabled></el-checkbox>
          <el-checkbox :label="24" border disabled></el-checkbox>
          <el-checkbox :label="25" border disabled></el-checkbox>
          <el-checkbox :label="26" border disabled></el-checkbox>
          <el-checkbox :label="27" border disabled></el-checkbox>
          <el-checkbox :label="28" border disabled></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="teethInformationThree" class="info-select">
          <el-checkbox :label="48" border disabled></el-checkbox>
          <el-checkbox :label="47" border disabled></el-checkbox>
          <el-checkbox :label="46" border disabled></el-checkbox>
          <el-checkbox :label="45" border disabled></el-checkbox>
          <el-checkbox :label="44" border disabled></el-checkbox>
          <el-checkbox :label="43" border disabled></el-checkbox>
          <el-checkbox :label="42" border disabled></el-checkbox>
          <el-checkbox :label="41" border disabled></el-checkbox>
          <el-checkbox :label="31" border disabled></el-checkbox>
          <el-checkbox :label="32" border disabled></el-checkbox>
          <el-checkbox :label="33" border disabled></el-checkbox>
          <el-checkbox :label="34" border disabled></el-checkbox>
          <el-checkbox :label="35" border disabled></el-checkbox>
          <el-checkbox :label="36" border disabled></el-checkbox>
          <el-checkbox :label="37" border disabled></el-checkbox>
          <el-checkbox :label="38" border disabled></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="teethInformationFour" class="info-select">
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
      <div class="prescription-main-title mt60">
        <i class="el-icon-video-camera icon-color"></i>影像及资料
      </div>
    </div>
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
      ageData: 0,
      clinicNameData: "",
      photoData: {},
      prescriptionData: {},
      teethInformationOne: [],
      teethInformationTwo: [],
      teethInformationThree: [],
      teethInformationFour: [],
    }
  },
  filters: {
    filterSex(value) {
      if (value === 0) {
        return "女";
      } else if (value === 1) {
        return "男";
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
        return "无";
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
        return "无";
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
    filterOrthodonticJaw(value) {
      if (value === 1) {
        return "全颌";
      } else if (value === 2) {
        return "上颌";
      } else if (value === 3) {
        return "下颌";
      } else {
        return "无";
      }
    },
  },
  created() {
    this.currentPhotoId = this.$route.query.photoId || "";
    this.currentPrescriptionId = this.$route.query.prescriptionId || "";
    if (this.currentPhotoId && this.currentPrescriptionId) {
      this.getPrescriptionData(this.currentPhotoId, this.currentPrescriptionId);
    }
  },
  methods: {
    getArrEqual(arr1, arr2) {
      return arr1.filter(item => arr2.indexOf(item)>-1);
    },
    getPrescriptionData(cPhotoId, cPrescriptionId) {
      let params = {
        photoId: cPhotoId,
        prescriptionId: cPrescriptionId,
      }
      getPrescriptionDetail(params).then(res => {
        if (res.data.code == 200) {
          this.ageData = res.data.data.age;
          this.clinicNameData = res.data.data.clinicName;
          this.photoData = res.data.data.photo;
          this.prescriptionData = res.data.data.prescription;
          let arrayOne = [55,54,53,52,51,61,62,63,64,65];
          let arrayTwo = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
          let arrayThree = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
          let arrayFour = [85,84,83,82,81,71,72,73,74,75];
          let teethInformationArray = this.prescriptionData.teethInformation ? this.prescriptionData.teethInformation.split(",").map(Number) : [];
          this.teethInformationOne = this.getArrEqual(arrayOne, teethInformationArray);
          this.teethInformationTwo = this.getArrEqual(arrayTwo, teethInformationArray);
          this.teethInformationThree = this.getArrEqual(arrayThree, teethInformationArray);
          this.teethInformationFour = this.getArrEqual(arrayFour, teethInformationArray);
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
.prescription-main-title {
  color: #555;
  font-size: 20px;
  white-space: nowrap;
  font-weight: 400;
}
.icon-color {
  color: #409EFF;
  margin-right: 10px;
}
.prescription-main-information {
  color: #333;
  font-size: 16px;
  white-space: nowrap;
  font-weight: 400;
  margin-top: 31px;
}
.prescription-main-information-span {
  margin-right: 50px;
  max-width: 500px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.mt60 {
  margin-top: 60px;
}
.prescription-main-every {
  color: #555;
  white-space: nowrap;
  font-weight: 400;
  margin-top: 31px;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.prescription-main-every-content {
  color: #333;
  font-size: 16px;
  white-space: nowrap;
  font-weight: 400;
}
.prescription-main-double-every {
  margin-top: 31px;
  display: flex;
  color: #555;
  font-size: 16px;
  white-space: nowrap;
  font-weight: 400;
}
.mr10 {
  margin-right: 10px;
}
.ml10 {
  margin-left: 10px;
}
.mb17 {
  margin-bottom: 17px;
}
.info-select {
  text-align: center;
}
.info-select >>> .el-checkbox__input {
  display: none;
}
.info-select >>> .el-checkbox.is-bordered {
  width: 42px;
  margin-left: 0;
  margin-right: 22px;
  margin-bottom: 15px;
  text-align: center;
}
.info-select >>> .el-checkbox__label {
  padding-left: 0;
  font-size: 20px;
  font-weight: normal;
}
.info-item {
  width: 1028px;
  position: relative;
}
.info-item::after {
  height: 100%;
  border-right: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: -5px;
  left: 503px;
  z-index: 10;
}
.info-item::before {
  width: 1008px;
  border-bottom: 1px dashed #c5c5c5;
  display: inline-block;
  content: "";
  position: absolute;
  top: 102px;
  left: 0;
  z-index: 10;
}
.prescription-contain >>> .el-checkbox.is-bordered.is-checked {
  border-color: #409EFF;
}
</style>
