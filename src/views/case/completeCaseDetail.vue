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
      }
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
</style>
