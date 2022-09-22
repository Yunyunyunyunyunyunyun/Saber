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
            <div class="complete-case-main-one-middle">
              <div class="complete-case-main-one-middle-title">1. 矫治完成确认</div>
              <el-form ref="topForm" :model="topForm" :rules="topRules" label-position="top" class="complete-case-main-one-middle-form">
                <el-form-item label="1.1 确认完成属于哪种情况" prop="situation">
                  <el-radio-group v-model="topForm.situation" class="common-radio">
                    <el-row class="mb20"><el-radio :label="1" border>实现矫治目标</el-radio></el-row>
                    <el-row class="mb20"><el-radio :label="2" border>隐形矫治达到阶段效果，改用其他矫治方法完成</el-radio></el-row>
                    <el-row class="mb20"><el-radio :label="3" border>未完成实现隐形矫治目标，但患者要求结束矫治</el-radio></el-row>
                    <el-row><el-radio :label="4" border>其他(请在输入框填写其他原因)</el-radio></el-row>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="topForm.situation === 4" prop="reason">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="描述请限制在2000字以内（误删可使用“ctrl+z”撤销误操作）"
                    v-model="topForm.reason">
                  </el-input>
                </el-form-item>
                <el-form-item label="1.2 矫治完成日期" prop="completionDate">
                  <el-date-picker
                    v-model="topForm.completionDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择完成日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <div class="complete-case-main-one-middle-title">2. 定制保持器</div>
              <el-radio-group v-model="isRetainer" class="common-radio retainer-radio">
                <el-radio :label="1" border>不需要</el-radio>
                <el-radio :label="2" border>需要</el-radio>
              </el-radio-group>
              <span class="radio-desc">注：收到病例完成资料后，我公司将免费提供压膜保持器一副</span>
              <div v-show="isRetainer === 2" class="need-reason-div">
                <el-radio-group v-model="needReason" class="common-radio">
                  <el-radio :label="1" border>最后一步订做保持器</el-radio>
                  <el-radio :label="2" border>提交模型后订做保持器</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <span slot="label"><i class="el-icon-video-camera"></i> 影像资料及模型<i class="el-icon-arrow-right arrow-style"></i></span>
          <el-row class="complete-case-main-two">
            <el-col :span="24">
              <div class="diagnosis-title diagnosis-title-required photos">照片信息<span class="photo-standard" @click="toStandard('photo')"><i class="el-icon-warning-outline icon-mr4"></i>照片拍摄标准</span></div>
              <div class="diagnosis-desc">面相照及口内照</div>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSimle"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="frontSmilingPath" :src="frontSmilingPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/smile.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传正面微笑照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">正面微笑照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessFront"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="frontPath" :src="frontPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/front.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传正面照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">正面照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSide"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="sidePath" :src="sidePath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/side.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传侧面照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">侧面照</div>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSideUpJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="upJawPath" :src="upJawPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/top.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传上颌口内照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">上颌口内照</div>
                </el-col>
                <el-col :span="8">
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessDownJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="downJawPath" :src="downJawPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/bottom.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传下颌口内照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">下颌口内照</div>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessRightJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="rightJawPath" :src="rightJawPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/right.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传右侧口内照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">右侧口内照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessFrontJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="frontJawPath" :src="frontJawPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/main.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传正面口内照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">正面口内照</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessLeftJaw"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="leftJawPath" :src="leftJawPath" class="common-img">
                    <div v-else class="common-img-uploader-img">
                      <img src="img/media/left.png" alt="">
                      <i class="el-icon-plus common-img-uploader-icon"></i>
                      <div class="common-img-uploader-text">点击上传左侧口内照</div>
                    </div>
                  </el-upload>
                  <div class="img-desc img-desc-required">左侧口内照</div>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <div class="diagnosis-desc">X光照片<span class="photo-standard" @click="toStandard('slice')"><i class="el-icon-warning-outline icon-mr4"></i>X光片拍摄标准</span></div>
                </el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8">
                  <div class="diagnosis-desc">其他影像</div>
                </el-col>
              </el-row>
              <el-row class="mt12">
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessAllXray"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="allXrayPath" :src="allXrayPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc">全景片</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessSideXray"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="sideXrayPath" :src="sideXrayPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc">侧位片</div>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="common-img-uploader"
                    action=""
                    accept=".jpeg,.jpg,.png"
                    :show-file-list="false"
                    :http-request="showProcess"
                    :on-success="handleImgSuccessOtherXray"
                    :before-upload="beforeImgUpload"
                    :on-error="handleError">
                    <img v-if="otherXrayPath" :src="otherXrayPath" class="common-img">
                    <i v-else class="el-icon-plus common-img-uploader-icon"></i>
                  </el-upload>
                  <div class="img-desc">其他</div>
                </el-col>
              </el-row>
              <div class="diagnosis-title diagnosis-title-required mt20 dental">牙颌模型<span class="photo-standard" @click="toStandard('jaw')"><i class="el-icon-warning-outline icon-mr4"></i>模型制取标准</span></div>
              <el-radio-group v-model="isSubmit" class="common-radio submit-radio">
                <el-radio :label="1" border>不提交</el-radio>
                <el-radio :label="2" border>提交</el-radio>
              </el-radio-group>
              <el-tabs v-show="isSubmit === 2" v-model="activeName" class="model-tabs">
                <el-tab-pane label="数字模型文件" name="first">
                  <div class="number-title">本地上传</div>
                  <el-row>
                    <el-col span="10">
                      <div class="up-title">上颌</div>
                      <el-upload
                        class="ml56"
                        action=""
                        accept=".stl"
                        :show-file-list="false"
                        :http-request="showProcess"
                        :on-success="handleImgSuccessUpJawModel"
                        :before-upload="beforeImgUploadJawModel"
                        :on-error="handleError">
                        <div v-if="upJawModelName">
                          <el-button icon="el-icon-file" class="model-icon-btn">{{upJawModelName}}</el-button>
                        </div>
                        <div v-else>
                          <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                        </div>
                      </el-upload>
                      <el-button class="remove-up-btn" v-if="upJawModelName" type="text" @click="removeUpJawModel">删除</el-button>
                      <div class="down-title">下颌</div>
                      <el-upload
                        class="mt20 ml56"
                        action=""
                        accept=".stl"
                        :show-file-list="false"
                        :http-request="showProcess"
                        :on-success="handleImgSuccessDownJawModel"
                        :before-upload="beforeImgUploadJawModel"
                        :on-error="handleError">
                        <div v-if="downJawModelName">
                          <el-button icon="el-icon-file" class="model-icon-btn">{{downJawModelName}}</el-button>
                        </div>
                        <div v-else>
                          <el-button icon="el-icon-upload" class="model-icon-btn">点击上传带咬合STL文件</el-button>
                        </div>
                      </el-upload>
                      <el-button class="remove-down-btn" v-if="downJawModelName" type="text" @click="removeDownJawModel">删除</el-button>
                    </el-col>
                    <el-col span="14">
                      <div class="jaw-model-desc">
                        <div>1.口扫时扫过咬合，导出的上颌STL、下颌STL就会自动带上咬合数据。</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
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
    <el-dialog
      title="上传进度"
      :visible.sync="uploadVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="percentageNumber"></el-progress>
    </el-dialog>
  </div>
</template>
<script>
  import { uploadOBS } from "@/util/obs";
  export default {
    name: "CompleteCaseDetail",
    data() {
      return {
        active: 1,
        caseItem: {},
        topForm: {
          situation: "",
          completionDate: "",
          reason: "",
        },
        topRules: {
          situation: [
            { required: true, message: '请确认完成属于哪种情况', trigger: 'blur' },
          ],
          completionDate: [
            { required: true, message: '请选择矫治完成日期', trigger: 'blur' },
          ],
          reason: [
            { required: true, message: '请输入原因', trigger: 'blur' },
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        isRetainer: "",
        needReason: "",
        frontSmilingPath: "",
        frontPath: "",
        sidePath: "",
        upJawPath: "",
        downJawPath: "",
        rightJawPath: "",
        frontJawPath: "",
        leftJawPath: "",
        allXrayPath: "",
        sideXrayPath: "",
        otherXrayPath: "",
        isSubmit: "",
        activeName: "first",
        upJawModelPath: "",
        upJawModelName: "",
        downJawModelPath: "",
        downJawModelName: "",
        uploadVisible: false,
        percentageNumber: 0,
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
      handleImgSuccessSimle(res, file) {
        const data = res.data || {};
        this.frontSmilingPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessFront(res, file) {
        const data = res.data || {};
        this.frontPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSide(res, file) {
        const data = res.data || {};
        this.sidePath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSideUpJaw(res, file) {
        const data = res.data || {};
        this.upJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessDownJaw(res, file) {
        const data = res.data || {};
        this.downJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessRightJaw(res, file) {
        const data = res.data || {};
        this.rightJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessFrontJaw(res, file) {
        const data = res.data || {};
        this.frontJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessLeftJaw(res, file) {
        const data = res.data || {};
        this.leftJawPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessAllXray(res, file) {
        const data = res.data || {};
        this.allXrayPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessSideXray(res, file) {
        const data = res.data || {};
        this.sideXrayPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      handleImgSuccessOtherXray(res, file) {
        const data = res.data || {};
        this.otherXrayPath = data.viewStlUrl;
        this.uploadVisible = false;
      },
      beforeImgUpload(file) {
        if (file.type) {
          this.percentageNumber = 0;
          this.uploadVisible = true;
        }
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if (!isJPG && !isPNG) {
          this.$message.error('您只能上传 jpg/png 类型的图片!');
        }
        return isJPG || isPNG;
      },
      async showProcess(params) {
        //调用分段上传OBS方法
        return await uploadOBS(params.file, 'order/photo', (percentage) => {
          this.percentageNumber = parseInt(percentage);
          // 更新进度条
          params.onProgress({percent: percentage});
        });
      },
      handleError(err) {
        this.uploadVisible = false;
        this.$message.warning(err.msg);
        return false;
      },
      handleImgSuccessUpJawModel(res, file) {
        const data = res.data || {};
        this.upJawModelPath = data.viewStlUrl;
        this.upJawModelName = data.originalName;
        this.uploadVisible = false;
      },
      beforeImgUploadJawModel(file) {
        if (file.name) {
          this.percentageNumber = 0;
          this.uploadVisible = true;
        }
        const isSTL = file.name.toLocaleLowerCase().substring(file.name.lastIndexOf('.')) === ".stl";
        if (!isSTL) {
          this.$message.error('您只能上传 stl 类型的文件!');
        }
        return isSTL;
      },
      handleImgSuccessDownJawModel(res, file) {
        const data = res.data || {};
        this.downJawModelPath = data.viewStlUrl;
        this.downJawModelName = data.originalName;
        this.uploadVisible = false;
      },
      removeUpJawModel() {
        this.upJawModelPath = "";
        this.upJawModelName = "";
      },
      removeDownJawModel() {
        this.downJawModelPath = "";
        this.downJawModelName = "";
      },
      toStandard(kind) {
        let routeData = this.$router.resolve({
          path: "/case/shootStandard",
          query: {
            kind: kind,
          }
        });
        window.open(routeData.href, '_blank');
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
  font-weight: 300;
  font-size: 18px;
  color: #999;
}
.complete-case-main-one-top-id-span {
  font-weight: 400;
  font-size: 18px;
  color: #555;
}
.complete-case-main-one-middle {
  margin-bottom: 15px;
}
.complete-case-main-one-middle-title {
  position: relative;
  font-size: 20px;
  font-weight: 500;
  color: #555;
  width: 500px;
}
.complete-case-main-one-middle-form {
  padding: 0 21px;
}
.common-radio >>> .el-radio__input {
  display: none;
}
.common-radio >>> .el-radio.is-bordered {
  text-align: center;
}
.common-radio >>> .el-radio.is-bordered.is-checked {
  border-color: #409EFF;
  background: #409EFF;
}
.common-radio >>> .el-radio__input.is-checked+.el-radio__label {
  color: #fff;
}
.mb20 {
  margin-bottom: 20px;
}
.retainer-radio {
  margin-top: 15px;
  margin-bottom: 15px;
}
.radio-desc {
  color: #999;
  font-size: 14px;
  font-weight: 400;
  margin-left: 30px;
}
.need-reason-div {
  padding-top: 15px;
  padding-bottom: 15px;
  margin-left: 124px;
}
.complete-case-main-two {
  padding: 40px 50px 50px;
}
.diagnosis-title {
  font-size: 20px;
  color: #555;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
.diagnosis-title-required::before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.photo-standard {
  color: #409EFF;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  margin-left: 16px;
}
.icon-mr4 {
  margin-right: 4px;
}
.diagnosis-desc {
  font-size: 18px;
  color: #555;
  font-weight: 300;
}
.mt20 {
  margin-top: 20px;
}
.mt12 {
  margin-top: 12px;
}
.common-img-uploader >>> .el-upload {
  border: 1px solid #d9d9d9;
  width: 190px;
  height: 180px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-img-uploader-img {
  width: 190px;
  height: 180px;
}
.common-img-uploader-icon {
  font-size: 22px;
  color: #8c939d;
  margin-top: 10px;
}
.common-img-uploader-text {
  font-size: 14px;
  font-weight: 300;
  color: #8c939d;
  margin-top: 5px;
}
.common-img {
  max-width: 190px;
  max-height: 180px;
  display: block;
}
.img-desc {
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
.img-desc-required::before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.model-tabs >>> .el-tabs__nav-wrap::after {
  height: 2px;
}
.model-tabs >>> .el-tabs__item {
  width: auto;
  text-align: left;
}
.model-tabs >>> .el-tabs__nav-wrap {
  background: #fff;
}
.number-title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  margin-bottom: 20px;
}
.up-title {
  font-size: 18px;
  color: #555;
  font-weight: 300;
  width: 36px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 0;
}
.down-title {
  font-size: 18px;
  color: #555;
  font-weight: 300;
  width: 36px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 60px;
}
.ml56 {
  margin-left: 56px;
}
.remove-up-btn {
  position: absolute;
  left: 286px;
  top: 0px;
}
.remove-down-btn {
  position: absolute;
  left: 286px;
  top: 60px;
}
.model-icon-btn {
  width: 210px;
  height: 40px;
}
.jaw-model-desc {
  font-size: 14px;
  color: #666;
  margin-top: 30px;
}
.submit-radio {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
