<template>
  <div class="complete-case-contain">
    <div class="complete-case-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="complete-case-title-main">完成病例</div>
    </div>
    <div class="complete-case-main">
      <el-tabs v-model="active">
        <el-tab-pane :name="1">
          <span slot="label"><i class="el-icon-finished"></i> 完成确认表<i class="el-icon-arrow-right arrow-style"></i></span>
          <div class="complete-case-main-one">
            <div class="complete-case-main-one-top">
              <div class="complete-case-main-one-top-img">
                <img v-if="caseItem.photo && caseItem.photo.frontPath" :src="caseItem.photo.frontPath" alt="" class="top-img">
                <i v-else class="el-icon-user top-icon"></i>
              </div>
              <div class="complete-case-main-one-top-name" v-if="caseItem.prescription && caseItem.prescription.name">
                <span :title="caseItem.prescription.name">{{caseItem.prescription.name}}</span>
              </div>
              <div class="complete-case-main-one-top-id">
                <span>病历号：</span>
                <span v-if="caseItem.record && caseItem.record.medicalCode" class="complete-case-main-one-top-id-span">{{caseItem.record.medicalCode}}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <span slot="label"><i class="el-icon-video-camera"></i> 影像资料及模型<i class="el-icon-arrow-right arrow-style"></i></span>
        </el-tab-pane>
        <el-tab-pane :name="3">
          <span slot="label"><i class="el-icon-document-checked"></i> 提交</span>
        </el-tab-pane>
      </el-tabs>
      <div class="complete-case-main-footer">
        <el-button type="primary" v-show="active>1" @click="prev">上一页</el-button>
        <el-button type="primary" v-show="active<3" @click="next">下一页</el-button>
        <el-button type="primary" v-show="active === 3" plain @click="caseSubmit()">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "CompleteCaseDetail",
    data() {
      return {
        active: 1,
        caseItem: {},
      }
    },
    created() {
      var paramsData = sessionStorage.getItem("paramsData");
      if (paramsData) {
        var params = JSON.parse(sessionStorage.getItem("paramsData"));
      } else {
        var params = this.$route.params;
        sessionStorage.setItem("paramsData", JSON.stringify(params));
      }
      this.caseItem = params.item;
    },
    beforeDestroy() {
      sessionStorage.removeItem("paramsData");
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      prev() {
        this.active--;
      },
      next() {
        this.active++;
      },
      caseSubmit() {},
    },
  }
</script>
<style scoped>
.complete-case-contain {
  width: 1200px;
  margin: 0 auto;
}
.complete-case-title {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 16px 0;
}
.complete-case-title-main {
  color: #000;
  font-size: 16px;
  width: 100%;
  text-align: center;
}
.complete-case-main {
  background: #fff;
  box-shadow: 0 2px 2px 1px #daecef;
  border-radius: 6px;
  padding: 20px;
  width: calc(100% - 40px);
  min-height: 80%;
  position: relative;
  margin-bottom: 93px;
}
.complete-case-main >>> .el-tabs__nav-wrap::after {
  height: 0;
}
.complete-case-main >>> .el-tabs__nav {
  width: 100%;
}
.complete-case-main >>> .el-tabs__item {
  width: 33.33%;
  text-align: center;
}
.complete-case-main >>> .el-tabs__nav-wrap {
  background: #f6f7fa;
  border-radius: 4px;
}
.arrow-style {
  float: right;
  height: 40px;
  line-height: 40px;
  color: #303133;
}
.complete-case-main-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 14px 0 rgb(221 225 233 / 54%);
  padding: 11px 0;
}
.complete-case-main-one {
  padding: 40px 50px 0;
}
.complete-case-main-one-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 60px;
}
.complete-case-main-one-top-img {
  width: 82px;
  height: 82px;
}
.top-img {
  width: 82px;
  height: 82px;
  border-radius: 50%;
}
.top-icon {
  font-size: 82px;
}
.complete-case-main-one-top-name {
  margin-left: 30px;
  white-space: nowrap;
  font-weight: 400;
  font-size: 26px;
  color: #333;
  max-width: 500px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
}
.complete-case-main-one-top-id {
  margin-left: 30px;
  white-space: nowrap;
  font-weight: 300;
  font-size: 18px;
  color: #999;
}
.complete-case-main-one-top-id-span {
  white-space: nowrap;
  font-weight: 400;
  font-size: 18px;
  color: #555;
}
</style>
