<template>
<div class="complete-form-pack">
  <div class="complete-form-contain">
    <div class="complete-form-title">
      <span title="完成确认表">完成确认表</span>
    </div>
    <div class="complete-form-main">
      <div class="complete-form-info-title">
        <i class="el-icon-user icon-color"></i>基本信息
      </div>
      <div class="complete-form-info-content">
        <div class="complete-form-info-img-pack">
          <img class="complete-form-info-img" v-if="completeData.frontPath" :src="completeData.frontPath" alt="">
        </div>
        <div class="complete-form-info-name" v-if="currentCompleteData && currentCompleteData.name">{{currentCompleteData.name}}</div>
        <div class="complete-form-info-case">
          <span>病例号：</span>
          <span class="case-span" v-if="currentCompleteData && currentCompleteData.medicalCode">{{currentCompleteData.medicalCode}}</span>
        </div>
      </div>
      <div class="complete-form-info-title">
        <i class="el-icon-document-checked icon-color"></i>完成确认表
      </div>
      <div class="complete-form-info-feedback">
        <span class="complete-form-info-feedback-title">1. 矫治完成确认</span>
        <div class="complete-form-info-feedback-every">
          <div class="complete-form-info-feedback-every-title">1.1 确认完成属于哪种情况:</div>
          <div class="complete-form-info-feedback-every-content">{{completeData.correctComplete | filterCorrectComplete}}</div>
        </div>
        <div v-if="completeData.correctComplete === 4" class="complete-form-info-feedback-every-text">{{completeData.correctCompleteOther}}</div>
        <div class="complete-form-info-feedback-every">
          <div class="complete-form-info-feedback-every-title">1.2 完成矫治日期:</div>
          <div class="complete-form-info-feedback-every-content" v-if="completeData.correctCompleteTime">{{completeData.correctCompleteTime}}</div>
          <div class="complete-form-info-feedback-every-content" v-else>无</div>
        </div>
      </div>
      <div class="complete-form-info-feedback">
        <span class="complete-form-info-feedback-title">2. 定制保持器:</span>
        <span class="complete-form-info-feedback-title">{{completeData.customRetainer | filterCustomRetainer}}</span>
        <span class="complete-form-info-feedback-title-tip" v-if="customRetainer !== 1">{{completeData.customRetainer | filterCustomRetainerTwo}}</span>
      </div>
      <div class="complete-form-info-title">
        <i class="el-icon-video-camera icon-color"></i>影像及资料
      </div>
      <div class="complete-photo-title">面像及口内照片</div>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.frontSmilingPath" :src="completeData.frontSmilingPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">正面微笑照</div>
        </el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.frontPath" :src="completeData.frontPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">正面照</div>
        </el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.sidePath" :src="completeData.sidePath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">侧面照</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.upJawPath" :src="completeData.upJawPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">上颌口内照</div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.downJawPath" :src="completeData.downJawPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">下颌口内照</div>
        </el-col>
      </el-row>
      <el-row class="mb20">
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.rightJawPath" :src="completeData.rightJawPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">右侧口内照</div>
        </el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.frontJawPath" :src="completeData.frontJawPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">正面口内照</div>
        </el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.leftJawPath" :src="completeData.leftJawPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">左侧口内照</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="complete-photo-title">X光照片</div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
          <div class="complete-photo-title">其他影像</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.allXrayPath" :src="completeData.allXrayPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">全景片</div>
        </el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.sideXrayPath" :src="completeData.sideXrayPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">侧位片</div>
        </el-col>
        <el-col :span="8">
          <div class="complete-photo-picture-contain">
            <img v-if="completeData.otherXrayPath" :src="completeData.otherXrayPath" class="complete-photo-picture-img">
            <i v-else class="el-icon-picture complete-photo-picture-icon"></i>
          </div>
          <div class="complete-photo-picture-desc">其他</div>
        </el-col>
      </el-row>
      <div class="complete-main-every">
        <div>牙颌模型：</div>
        <div v-if="completeData.modelSubmit === 1">不提交</div>
        <div v-else-if="completeData.modelSubmit === 2">
          <div class="mb17">
            <span class="mr10">数字模型文件</span>
            <span v-if="completeData.upJawModelName && completeData.downJawModelName">
              <span class="complete-main-every-content">本地上传</span>
            </span>
            <span class="complete-main-every-content" v-else>无</span>
          </div>
        </div>
        <div v-else>无</div>
      </div>
      <div v-if="completeData.modelSubmit === 2 && completeData.upJawModelName && completeData.downJawModelName && completeData.upJawModelPath && completeData.downJawModelPath" class="complete-photo-model">
        <div class="mb10">
          <span>上颌</span>
          <div class="complete-photo-model-text" :title="completeData.upJawModelName" @click="downloadPhoto(completeData.upJawModelPath)">{{completeData.upJawModelName}}</div>
        </div>
        <div>
          <span>下颌</span>
          <div class="complete-photo-model-text" :title="completeData.downJawModelName" @click="downloadPhoto(completeData.downJawModelPath)">{{completeData.downJawModelName}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { getCompleteForm } from "@/api/case/commonCase";
  export default {
    name: "CompleteForm",
    data() {
      return {
        currentCompleteData: {},
        completeData: {},
      }
    },
    props: {
      completeObj: {
        type: Object,
        default: () => {
          return {};
        }
      },
    },
    filters: {
      filterCorrectComplete(value) {
        if (value === 1) {
          return "实现矫治目标";
        } else if (value === 2) {
          return "隐形矫治达到阶段效果，改用其他矫治方法完成";
        } else if (value === 3) {
          return "未完成实现隐形矫治目标，但患者要求结束矫治";
        } else if (value === 4) {
          return "其他";
        } else {
          return "无";
        }
      },
      filterCustomRetainer(value) {
        if (value === 1) {
          return "不需要";
        } else {
          return "需要";
        }
      },
      filterCustomRetainerTwo(value) {
        if (value === 2) {
          return "最后一步订做保持器";
        } else if (value === 3) {
          return "提交模型后订做保持器";
        } else {
          return "无";
        }
      },
    },
    created() {
      if (this.completeObj.ifComponents) {
        this.currentCompleteData = this.completeObj;
      } else {
        this.currentCompleteData = JSON.parse(this.$route.query.completeObject);
      }
      if (this.currentCompleteData.completeId) {
        this.getCompleteData(this.currentCompleteData.completeId);
      }
    },
    methods: {
      getCompleteData(cCompleteId) {
        let params = {
          completeId: cCompleteId,
        }
        getCompleteForm(params).then(res => {
          if (res.data.code == 200) {
            this.completeData = res.data.data;
          }
        });
      },
      downloadPhoto(path) {
        window.open(path);
      },
    }
  }
</script>
<style scoped>
  .complete-form-pack {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .complete-form-contain {
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
  .complete-form-info-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  .icon-color {
    color: #409EFF;
    margin-right: 10px;
  }
  .complete-form-info-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 60px;
  }
  .complete-form-info-img-pack {
    width: 82px;
    height: 82px;
    margin-right: 30px;
  }
  .complete-form-info-img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }
  .complete-form-info-name {
    color: #333;
    font-size: 26px;
    font-weight: 700;
    margin-right: 30px;
  }
  .complete-form-info-case {
    color: #999;
    font-size: 16px;
    font-weight: 400;
  }
  .case-span {
    color: #555;
    font-size: 18px;
    font-weight: 700;
  }
  .complete-form-info-feedback {
    margin-bottom: 60px;
  }
  .complete-form-info-feedback-title {
    color: #555;
    font-size: 20px;
    font-weight: 400;
    margin-right: 10px;
  }
  .complete-form-info-feedback-every {
    padding: 20px 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .complete-form-info-feedback-every-title {
    color: #555;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-right: 10px;
  }
  .complete-form-info-feedback-every-content {
    color: #333;
    font-size: 18px;
    font-weight: 400;
  }
  .complete-form-info-feedback-every-text {
    width: calc(100%-66px);
    background: #f6f7fa;
    border-radius: 4px;
    height: 50px;
    margin: 16px 20px 0;
    padding: 23px;
    color: #555;
    font-size: 17px;
    font-weight: 400;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow-y: auto;
  }
  .complete-form-info-feedback-title-tip {
    margin-left: 5px;
    color: #333;
    font-size: 16px;
    font-weight: 400;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .mr10 {
    margin-right: 10px;
  }
  .mb17 {
    margin-bottom: 17px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .complete-photo-title {
    margin: 30px 0 20px;
    color: #333;
    font-size: 16px;
    font-weight: 400;
  }
  .complete-photo-picture-contain {
    border: 1px solid #d9d9d9;
    width: 190px;
    height: 180px;
    line-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .complete-photo-picture-img {
    max-width: 190px;
    max-height: 180px;
    display: block;
  }
  .complete-photo-picture-icon {
    font-size: 180px;
    color: #d9d9d9;
    width: 190px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .complete-photo-picture-desc {
    width: 190px;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    font-size: 14px;
    font-weight: 300;
    color: #555;
    text-align: center;
  }
  .complete-main-every {
    margin-top: 30px;
    display: flex;
    color: #555;
    font-size: 16px;
    font-weight: 400;
  }
  .complete-main-every-content {
    color: #333;
    font-size: 16px;
    font-weight: 400;
    margin-right: 10px;
  }
  .complete-photo-model {
    margin: 0 0 0 170px;
    width: 500px;
    padding: 13px 26px;
    background: #f6f7fa;
    border-radius: 4px;
  }
  .complete-photo-model>div {
    color: #555;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    display: flex;
  }
  .complete-photo-model-text {
    color: #409EFF;
    font-size: 18px;
    line-height: 18px;
    font-weight: 400;
    margin-left: 10px;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    cursor: pointer;
  }
</style>
