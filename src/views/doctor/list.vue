<template>
<div class="doctor-contain-pack">
  <div class="doctor-contain">
    <el-button type="primary" icon="el-icon-plus" @click="addCaseList">新建病例</el-button>
    <div class="doctor-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'全部('+total+')'" name="first">
          <public-list :status="1" ref="firstList"></public-list>
        </el-tab-pane>
        <el-tab-pane :label="'待处理('+waitDeal+')'" name="second">
          <public-list :status="2" ref="secondList"></public-list>
        </el-tab-pane>
        <el-tab-pane :label="'待提交('+stage+')'" name="third">
          <public-list :status="3" ref="thirdList"></public-list>
        </el-tab-pane>
        <el-tab-pane :label="'治疗中('+underTreatment+')'" name="fourth">
          <public-list :status="4" ref="fourtList"></public-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</div>
</template>
<script>
import { getStatistics } from "@/api/doctor/commonDoctor";
import publicList from "./publicList.vue";
export default {
  name: "DoctorList",
  components: {
    publicList,
  },
  data() {
    return {
      activeName: "first",
      stage: 0,
      total: 0,
      underTreatment: 0,
      waitDeal: 0,
    }
  },
  created() {
    getStatistics().then(res => {
      if (res.data.code == 200) {
        const data = res.data.data;
        this.stage = data.stage;
        this.total = data.total;
        this.underTreatment = data.underTreatment;
        this.waitDeal = data.waitDeal;
      }
    });
  },
  methods: {
    addCaseList() {
      this.$router.push({
        path: "/case/addEditCase",
        query: {
          isDoctor: true,
        }
      });
    },
    handleClick(tab, event) {
      if (tab.name == "first" && this.$refs["firstList"]) {
        this.$refs["firstList"].startPage(1);
      } else if (tab.name == "second" && this.$refs["secondList"]) {
        this.$refs["secondList"].startPage(2);
      } else if (tab.name == "third" && this.$refs["thirdList"]) {
        this.$refs["thirdList"].startPage(3);
      } else if (tab.name == "fourth" && this.$refs["fourtList"]) {
        this.$refs["fourtList"].startPage(4);
      } else {
        // 不存在，不做操作
      }
    }
  },
}
</script>
<style scoped>
.doctor-contain-pack {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.doctor-contain {
  width: 1200px;
  margin: 20px auto;
}
.doctor-main {
  margin: 20px 0;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
</style>