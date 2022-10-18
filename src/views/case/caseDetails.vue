<template>
  <div class="detail-contain">
    <div class="detail-title">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
      <div class="detail-title-main">病例号：{{caseData.record ? caseData.record.medicalCode : ""}}</div>
    </div>
    <div class="detail-out">
      <div class="detail-out-information">
        <div class="detail-out-information-main">
          <div class="detail-out-information-main-patient">
            <div class="detail-out-information-main-patient-information">
              <div class="detail-out-information-main-patient-information-img">
                <div class="ant-image">
                  <img v-if="caseData.photo && caseData.photo.frontPath" :src="caseData.photo.frontPath" alt="" class="info-img">
                  <i v-else class="el-icon-user user-icon"></i>
                </div>
              </div>
              <div class="detail-out-information-main-patient-information-basic">
                <div
                  class="detail-out-information-main-patient-information-basic-name"
                  v-if="caseData.prescription && caseData.prescription.name">
                  <span :title="caseData.prescription.name">{{caseData.prescription.name}}</span>
                </div>
                <div class="detail-out-information-main-patient-information-basic-status" v-if="caseData.record && caseData.record.state">{{caseData.record.state | filterState}}</div>
                <div class="detail-out-information-main-patient-information-basic-sex_age" v-if="caseData.prescription && caseData.prescription.sex+''">{{caseData.prescription.sex | filterSex}}</div>
                <div class="detail-out-information-main-patient-information-basic-sex_age" v-if="caseData.age+''">{{caseData.age}}岁</div>
              </div>
            </div>
            <div class="detail-out-information-main-patient-action">
              <el-button
                v-if="caseData.record&&caseData.record.state&&caseData.record.caseType&&((caseData.record.state>30&&(caseData.record.caseType===1||caseData.record.caseType===2))||(caseData.record.caseType===2&&caseData.record.state===10))"
                plain
                icon="el-icon-circle-check"
                size="small"
                @click="completeCase(caseData)">
                完成病例
              </el-button>
              <el-button
                v-if="caseData.record&&caseData.record.state&&caseData.record.caseType&&caseData.record.state>30&&(caseData.record.caseType===1||caseData.record.caseType===2)"
                plain
                icon="el-icon-switch-button"
                size="small"
                @click="restartCase(caseData)">
                重启病例
              </el-button>
              <!-- <el-button plain icon="el-icon-sort" class="tf-icon" size="small" @click="alleyOop(caseData)">继续生产</el-button> -->
            </div>
          </div>
          <div class="detail-out-information-main-pathogeny">
            <div class="detail-out-complaint">
              <span class="detail-out-title">主诉:</span>
              <span v-if="caseData.prescription && caseData.prescription.ccTeeth">
                <span class="detail-out-content" v-for="item in caseData.prescription.ccTeeth.split(',').map(Number).sort()" :key="item">{{item | filterCcTeeth}}</span>
              </span>
              <span v-if="caseData.prescription && caseData.prescription.ccJaw">
                <span class="detail-out-content" v-for="item in caseData.prescription.ccJaw.split(',').map(Number).sort()" :key="item">{{item | filterCcJaw}}</span>
              </span>
            </div>
            <div class="detail-out-target">
              <span class="detail-out-title">主要矫治目标:</span>
              <span v-if="caseData.prescription && caseData.prescription.teeth">
                <span class="detail-out-content" v-for="item in caseData.prescription.teeth.split(',').map(Number).sort()" :key="item">{{item | filterTeeth}}</span>
              </span>
            </div>
            <div class="detail-out-classification">
              <span class="detail-out-title">临床分类:</span>
              <span v-if="caseData.prescription && caseData.prescription.annType">
                <span class="detail-out-content">{{caseData.prescription.annType | filterAnnType}}</span>
              </span>
              <span v-if="caseData.prescription && caseData.prescription.bonyType">
                <span class="detail-out-content">{{caseData.prescription.bonyType | filterBonyType}}</span>
              </span>
              <span v-if="caseData.prescription && caseData.prescription.malocclusionType">
                <span class="detail-out-content" v-for="item in caseData.prescription.malocclusionType.split(',').map(Number).sort()" :key="item">{{item | filterMalocclusionType}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-out-show">
        <div class="detail-out-show-three" v-if="caseData.record && caseData.record.dId && caseData.record.dId !== -1" @click="toThreeD(caseData.record.dId)">3D方案</div>
        <div class="detail-out-show-three detail-out-show-three-disabled" v-else>暂无3D方案</div>
        <div class="detail-out-show-see">
          <div class="detail-out-show-see-basic">
            <div class="detail-out-show-see-basic-item" @click="toPhoto"><i class="el-icon-picture-outline item-icon"></i>照片</div>
            <div class="detail-out-show-see-basic-item" @click="toPrescription(caseData.record)"><i class="el-icon-tickets item-icon"></i>处方表</div>
            <!-- <div v-if="currentIsDoctor" class="detail-out-show-see-basic-item" @click="toShipInfo(caseData)"><i class="el-icon-truck item-icon"></i>发货信息</div> -->
          </div>
        </div>
      </div>
      <div class="detail-out-history_expert">
        <div class="detail-out-history_expert-history">
          <div class="detail-out-history_expert-history-title">病例进度记录</div>
          <div class="detail-out-history_expert-history-content">
            <div class="detail-out-history-every" v-for="item in caseData.historyList" :key="item.id">
              <div class="detail-out-history-every-date">{{item.createTime}}</div>
              <div class="detail-out-history-every-rate"></div>
              <div class="detail-out-history-every-disableBtn" v-if="item && item.state">
                <span v-if="item.state === 10">资料已保存，待提交。<span v-if="caseData.record.state === 10" class="detail-out-history-every-disableBtn-canClick" @click="toEditPage">点击进入继续编辑</span></span>
                <span v-else-if="item.state === 20">资料已提交</span>
                <span v-else-if="item.state === 30">资料不合格,请补齐。<span v-if="caseData.record.state === 30" class="detail-out-history-every-disableBtn-canClick" @click="toEditPage">点击进入继续编辑</span></span>
                <span v-else-if="item.state === 40">资料审核通过,3D方案设计中</span>
                <span v-else-if="item.state === 50">方案：<span class="detail-out-history-every-disableBtn-canClick" @click="toThreeD(item.dId)">{{item.fileName}}</span></span>
                <span v-else-if="item.state === 60">方案：<span class="detail-out-history-every-disableBtn-canClick" @click="toThreeD(item.dId)">{{item.fileName}}</span>,未批准</span>
                <span v-else-if="item.state === 70">方案：<span class="detail-out-history-every-disableBtn-canClick" @click="toThreeD(item.dId)">{{item.fileName}}</span>,已批准</span>
                <span v-else-if="item.state === 80">生产发货</span>
                <span v-else-if="item.state === 90">完成病例，治疗结束</span>
                <span v-else>未知</span>
              </div>
              <span v-if="item && item.state">
                <el-button v-if="item.state === 10 || item.state === 20" type="primary" size="small" @click="toPhotoDetails(item.photoId)">照片</el-button>
                <el-button v-if="(item.state === 10 || item.state === 20) && (item.caseType !== 2 && item.caseType !== 3)" type="primary" size="small" @click="toPrescription(item)">处方表</el-button>
                <el-button v-if="(item.state === 10 || item.state === 20) && item.caseType === 2" type="primary" size="small" @click="toFeedbackForm(item, caseData)">重启反馈表</el-button>
                <el-button v-if="item.caseType === 3" type="primary" size="small" @click="toCompleteForm(item, caseData)">完成确认表</el-button>
                <el-button v-if="item.state === 30 || item.state === 60" type="primary" size="small" @click="viewFailReason(item.id)">查看原因</el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="面向及口内照"
      :visible.sync="showPhotoVisible"
      @close="closePhoto">
      <viewer :images="images">
        <el-row class="mb20">
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="frontSmilingPath" :src="frontSmilingPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">正面微笑照</div>
          </el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="frontPath" :src="frontPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">正面照</div>
          </el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="sidePath" :src="sidePath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">侧面照</div>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="upJawPath" :src="upJawPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">上颌口内照</div>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="downJawPath" :src="downJawPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">下颌口内照</div>
          </el-col>
        </el-row>
        <el-row class="mb20">
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="rightJawPath" :src="rightJawPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">右侧口内照</div>
          </el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="frontJawPath" :src="frontJawPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">正面口内照</div>
          </el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="leftJawPath" :src="leftJawPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">左侧口内照</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="picture-diagnosis-desc">X光照片</div>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <div class="picture-diagnosis-desc">其他影像</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="allXrayPath" :src="allXrayPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">全景片</div>
          </el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="sideXrayPath" :src="sideXrayPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">侧位片</div>
          </el-col>
          <el-col :span="8">
            <div class="picture-contain">
              <img v-if="otherXrayPath" :src="otherXrayPath" class="picture-img">
              <i v-else class="el-icon-picture picture-icon"></i>
            </div>
            <div class="picture-desc">其他</div>
          </el-col>
        </el-row>
      </viewer>
    </el-dialog>
    <el-dialog
      title="查看原因"
      :visible.sync="failHistoryReasonVisible">
      <div>{{failHistoryRemark}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="failHistoryReasonVisible = false">取 消</el-button>
        <el-button type="primary" @click="failHistoryReasonVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="40%" title="加工后续" :visible.sync="followUpVisible">
      <el-dialog
        width="30%"
        :visible.sync="keepOnVisible"
        append-to-body>
        <div class="produce-content"><i class="el-icon-warning-outline produce-icon"></i>确认继续生产么</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="keepOnVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureProduce">确 定</el-button>
        </div>
      </el-dialog>
      <div class="follow-up-main">
        <div class="follow-up-main-top">
          <div class="follow-up-main-top-one">是否提交加工后续申请</div>
          <div class="follow-up-main-top-two">如需更改地址请联系客服，提交后无法更改</div>
        </div>
        <div class="follow-up-main-bottom">
          <div class="follow-up-main-bottom-one">矫治器收货地址</div>
          <div class="follow-up-main-bottom-two">阿富汗1111</div>
          <div class="follow-up-main-bottom-one">保持器收货地址</div>
          <div class="follow-up-main-bottom-two">阿富汗1111</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="followUpVisible = false">取 消</el-button>
        <el-button type="primary" @click="keepOnVisible = true">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getDetails, getThreeDDetail, getFailHistoryReason, getPhotoDetail } from "@/api/case/commonCase";
  export default {
    name: "CaseDetails",
    data() {
      return {
        currentCaseId: "",
        currentIsDoctor: false,
        caseData: {},
        showPhotoVisible: false,
        failHistoryRemark: "",
        failHistoryReasonVisible: false,
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
        images: [],
        followUpVisible: false,
        keepOnVisible: false,
      }
    },
    created() {
      this.currentCaseId = this.$route.query.id || "";
      this.currentIsDoctor = this.$route.query.isDoctor || false;
      if (this.currentCaseId) {
        this.getCaseDetails(this.currentCaseId);
      }
    },
    filters: {
      filterState(value) {
        if (value === 10) {
          return "待提交";
        } else if (value > 10 && value < 80) {
          return "治疗中";
        } else if (value > 70) {
          return "已完成";
        } else {
          return "未知";
        }
      },
      filterSex(value) {
        if (value === 0) {
          return "女";
        } else if (value === 1) {
          return "男";
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
          return "";
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
          return "";
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
          return "";
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
          return "";
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
          return "";
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
          return "";
        }
      },
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      getCaseDetails(id) {
        const params = {
          id: id,
        };
        getDetails(params).then(res => {
          if (res.data.code == 200) {
            this.caseData = res.data.data;
            if (this.caseData.photo && this.caseData.photo.frontSmilingPath) {
              this.images.push(this.caseData.photo.frontSmilingPath);
            }
            if (this.caseData.photo && this.caseData.photo.frontPath) {
              this.images.push(this.caseData.photo.frontPath);
            }
            if (this.caseData.photo && this.caseData.photo.sidePath) {
              this.images.push(this.caseData.photo.sidePath);
            }
            if (this.caseData.photo && this.caseData.photo.upJawPath) {
              this.images.push(this.caseData.photo.upJawPath);
            }
            if (this.caseData.photo && this.caseData.photo.downJawPath) {
              this.images.push(this.caseData.photo.downJawPath);
            }
            if (this.caseData.photo && this.caseData.photo.rightJawPath) {
              this.images.push(this.caseData.photo.rightJawPath);
            }
            if (this.caseData.photo && this.caseData.photo.frontJawPath) {
              this.images.push(this.caseData.photo.frontJawPath);
            }
            if (this.caseData.photo && this.caseData.photo.leftJawPath) {
              this.images.push(this.caseData.photo.leftJawPath);
            }
            if (this.caseData.photo && this.caseData.photo.allXrayPath) {
              this.images.push(this.caseData.photo.allXrayPath);
            }
            if (this.caseData.photo && this.caseData.photo.sideXrayPath) {
              this.images.push(this.caseData.photo.sideXrayPath);
            }
            if (this.caseData.photo && this.caseData.photo.otherXrayPath) {
              this.images.push(this.caseData.photo.otherXrayPath);
            }
          }
        });
      },
      toPhoto() {
        this.showPhotoVisible = true;
        if (this.caseData.photo && this.caseData.photo.frontSmilingPath) {
          this.frontSmilingPath = this.caseData.photo.frontSmilingPath;
        }
        if (this.caseData.photo && this.caseData.photo.frontPath) {
          this.frontPath = this.caseData.photo.frontPath;
        }
        if (this.caseData.photo && this.caseData.photo.sidePath) {
          this.sidePath = this.caseData.photo.sidePath;
        }
        if (this.caseData.photo && this.caseData.photo.upJawPath) {
          this.upJawPath = this.caseData.photo.upJawPath;
        }
        if (this.caseData.photo && this.caseData.photo.downJawPath) {
          this.downJawPath = this.caseData.photo.downJawPath;
        }
        if (this.caseData.photo && this.caseData.photo.rightJawPath) {
          this.rightJawPath = this.caseData.photo.rightJawPath;
        }
        if (this.caseData.photo && this.caseData.photo.frontJawPath) {
          this.frontJawPath = this.caseData.photo.frontJawPath;
        }
        if (this.caseData.photo && this.caseData.photo.leftJawPath) {
          this.leftJawPath = this.caseData.photo.leftJawPath;
        }
        if (this.caseData.photo && this.caseData.photo.allXrayPath) {
          this.allXrayPath = this.caseData.photo.allXrayPath;
        }
        if (this.caseData.photo && this.caseData.photo.sideXrayPath) {
          this.sideXrayPath = this.caseData.photo.sideXrayPath;
        }
        if (this.caseData.photo && this.caseData.photo.otherXrayPath) {
          this.otherXrayPath = this.caseData.photo.otherXrayPath;
        }
      },
      toPhotoDetails(id) {
        let params = {
          photoId: id,
        }
        getPhotoDetail(params).then(res => {
          if (res.data.code == 200) {
            const data = res.data.data;
            if (data.frontSmilingPath) {
              this.frontSmilingPath = data.frontSmilingPath;
              this.images.push(data.frontSmilingPath);
            }
            if (data.frontPath) {
              this.frontPath = data.frontPath;
              this.images.push(data.frontPath);
            }
            if (data.sidePath) {
              this.sidePath = data.sidePath;
              this.images.push(data.sidePath);
            }
            if (data.upJawPath) {
              this.upJawPath = data.upJawPath;
              this.images.push(data.upJawPath);
            }
            if (data.downJawPath) {
              this.downJawPath = data.downJawPath;
              this.images.push(data.downJawPath);
            }
            if (data.rightJawPath) {
              this.rightJawPath = data.rightJawPath;
              this.images.push(data.rightJawPath);
            }
            if (data.frontJawPath) {
              this.frontJawPath = data.frontJawPath;
              this.images.push(data.frontJawPath);
            }
            if (data.leftJawPath) {
              this.leftJawPath = data.leftJawPath;
              this.images.push(data.leftJawPath);
            }
            if (data.allXrayPath) {
              this.allXrayPath = data.allXrayPath;
              this.images.push(data.allXrayPath);
            }
            if (data.sideXrayPath) {
              this.sideXrayPath = data.sideXrayPath;
              this.images.push(data.sideXrayPath);
            }
            if (data.otherXrayPath) {
              this.otherXrayPath = data.otherXrayPath;
              this.images.push(data.otherXrayPath);
            }
            this.showPhotoVisible = true;
          }
        })
      },
      closePhoto() {
        this.showPhotoVisible = false;
        this.frontSmilingPath = "";
        this.frontPath = "";
        this.sidePath = "";
        this.upJawPath = "";
        this.downJawPath = "";
        this.rightJawPath = "";
        this.frontJawPath = "";
        this.leftJawPath = "";
        this.allXrayPath = "";
        this.sideXrayPath = "";
        this.otherXrayPath = "";
        this.images = [];
      },
      toThreeD(id) {
        let params = {
          id: id,
        };
        getThreeDDetail(params).then(res => {
          if (res.data.code == 200) {
            const data = res.data.data;
            if (data.filePath) {
              window.open(data.filePath);
            }
          }
        });
      },
      toEditPage() {
        this.$router.push({
          path: "/case/addEditCase",
          query: {
            id: this.currentCaseId,
            isEdit: true,
            isDoctor: this.currentIsDoctor,
          }
        });
      },
      viewFailReason(id) {
        let params = {
          historyId: id,
        };
        getFailHistoryReason(params).then(res => {
          if (res.data.code == 200) {
            const data = res.data.data;
            this.failHistoryRemark = data.remark;
            this.failHistoryReasonVisible = true;
          }
        });
      },
      toPrescription(item) {
        let routeData = this.$router.resolve({
          path: "/case/prescriptionDetails",
          query: {
            photoId: item.photoId || "",
            prescriptionId: item.prescriptionId || "",
          }
        });
        window.open(routeData.href, '_blank');
      },
      toFeedbackForm(item, caseData) {
        let restartNeed = {
          restartId: item.restartId || "",
          name: caseData.prescription ? caseData.prescription.name : "",
          medicalCode: caseData.record ? caseData.record.medicalCode : "",
        }
        let routeData = this.$router.resolve({
          path: "/case/feedbackForm",
          query: {
            restartObject: JSON.stringify(restartNeed),
          }
        });
        window.open(routeData.href, '_blank');
      },
      toCompleteForm(item, caseData) {
        let completeNeed = {
          completeId: item.completeId || "",
          name: caseData.prescription ? caseData.prescription.name : "",
          medicalCode: caseData.record ? caseData.record.medicalCode : "",
        }
        let routeData = this.$router.resolve({
          path: "/case/completeForm",
          query: {
            completeObject: JSON.stringify(completeNeed),
          }
        });
        window.open(routeData.href, '_blank');
      },
      completeCase(item) {
        this.$router.push({
          name: "CompleteCaseDetail",
          params: {
            item: item,
            isDoctor: this.currentIsDoctor,
          }
        });
      },
      restartCase(item) {
        this.$router.push({
          name: "RestartCaseDetail",
          params: {
            item: item,
            isDoctor: this.currentIsDoctor,
          }
        });
      },
      alleyOop(item) {
        this.followUpVisible = true;
      },
      sureProduce() {
        this.keepOnVisible = false;
      },
      toShipInfo(item) {},
    },
  }
</script>
<style scoped>
  .detail-contain {
    width: 950px;
    margin: 0 auto;
  }
  .detail-title {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 16px 0;
  }
  .detail-title-main {
    color: #000;
    font-size: 16px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }
  .detail-out {
    width: 100%;
  }
  .detail-out-information {
    width: 100%;
    box-shadow: 0 2px 2px 1px #daecef;
    border-radius: 6px;
    background: #fff;
    margin-bottom: 16px;
  }
  .detail-out-information-main {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .detail-out-information-main-patient {
    padding-right: 16px;
    border-right: 1px solid #edf0f5;
    margin-right: 21px;
    min-width: 302px;
  }
  .detail-out-information-main-patient-information {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .detail-out-information-main-patient-information-img {
    width: 96px;
    height: 132px;
    overflow: hidden;
    margin-right: 13px;
    border-radius: 16px;
  }
  .ant-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .user-icon {
    font-size: 96px;
  }
  .detail-out-information-main-patient-information-basic {
    color: #000;
    font-size: 14px;
    line-height: 24px;
    white-space: nowrap;
    font-weight: 400;
  }
  .detail-out-information-main-patient-information-basic-name {
    font-size: 18px;
    max-width: 216px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detail-out-information-main-patient-information-basic-status {
    color: #409EFF;
    margin: 11px 0 13px;
  }
  .detail-out-information-main-patient-information-basic-sex_age {
    color: #999;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .detail-out-information-main-pathogeny {
    flex: 1 1;
  }
  .detail-out-complaint {
    border-bottom: 1px solid #edf0f5;
    padding-bottom: 12px;
    min-width: 100%;
  }
  .detail-out-target {
    margin: 12px 0;
  }
  .detail-out-classification {
    padding-top: 12px;
    border-top: 1px solid #edf0f5;
  }
  .detail-out-title {
    color: #666;
    font-size: 14px;
    font-weight: 300;
    margin-right: 10px;
  }
  .detail-out-content {
    color: #333;
    font-size: 14px;
    font-weight: 300;
    margin-right: 10px;
  }
  .detail-out-show {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 16px;
  }
  .detail-out-show-three {
    padding: 8px 16px;
    background-color: #409EFF;
    color: #fff;
    font-size: 20px;
    white-space: nowrap;
    font-weight: 400;
    border-radius: 6px;
    min-width: 220px;
    height: 70px;
    margin-right: 16px;
    text-align: center;
    line-height: 54px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .detail-out-show-three-disabled {
    background-color: #a0cfff;
    cursor: not-allowed;
  }
  .detail-out-show-see {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1 1;
  }
  .detail-out-show-see-basic {
    padding: 14px 24px;
    min-height: 68px;
    background-color: #fff;
    flex: 1 1;
    box-shadow: 0 2px 2px 1px #daecef;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
  }
  .detail-out-show-see-basic-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #333;
    font-size: 14px;
    line-height: 40px;
    white-space: nowrap;
    font-weight: 400;
    padding-right: 24px;
    border-right: 1px solid #e5eaec;
    margin-right: 24px;
  }
  .detail-out-show-see-basic-item:last-child {
    border: none;
  }
  .item-icon {
    font-size: 20px;
    color: #666;
    margin-right: 8px;
  }
  .detail-out-history_expert {
    box-shadow: 0 2px 2px 1px #daecef;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
    flex-wrap: nowrap;
  }
  .detail-out-history_expert-history {
    background-color: #fff;
    border-radius: 6px;
    padding: 8px 16px;
    flex: 1 1;
  }
  .detail-out-history_expert-history-title {
    color: #333;
    font-size: 14px;
    line-height: 24px;
    white-space: nowrap;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #edf0f5;
  }
  .detail-contain >>> .el-dialog__body {
    padding: 10px 20px 20px;
  }
  .picture-contain {
    border: 1px solid #d9d9d9;
    width: 190px;
    height: 180px;
    line-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .picture-img {
    max-width: 190px;
    max-height: 180px;
    display: block;
    cursor: pointer;
  }
  .picture-icon {
    font-size: 180px;
    color: #d9d9d9;
    width: 190px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .picture-desc {
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
  .mb20 {
    margin-bottom: 20px;
  }
  .picture-diagnosis-desc {
    font-size: 18px;
    color: #303133;
  }
  .detail-out-history_expert-history-content {
    padding: 14px 0;
  }
  .detail-out-history-every {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .detail-out-history-every-date {
    color: #666;
    font-size: 14px;
    line-height: 14px;
    white-space: nowrap;
    font-weight: 400;
    margin-right: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: nowrap;
    min-width: 120px;
  }
  .detail-out-history-every-rate {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #a0cfff;
  }
  .detail-out-history-every-disableBtn {
    background-color: rgba(0,0,0,.04);
    color: #999;
    font-size: 14px;
    line-height: 24px;
    white-space: nowrap;
    font-weight: 400;
    padding: 4px 16px;
    border-radius: 4px;
    margin-left: 16px;
    margin-right: 8px;
    box-sizing: border-box;
  }
  .detail-out-history-every-disableBtn-canClick {
    color: #409eff;
    cursor: pointer;
  }
  .detail-out-information-main-patient-action {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;
  }
  .tf-icon >>> i {
    transform: rotate(90deg);
  }
  .produce-content {
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 16px;
  }
  .produce-icon {
    color: #faad14;
    font-size: 22px;
    margin-right: 16px;
    vertical-align: top;
  }
  .follow-up-main {
    margin: 0 0 20px;
  }
  .follow-up-main-top {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,0,0,.06);
  }
  .follow-up-main-top-one {
    color: #333;
    font-size: 16px;
    font-weight: 500;
  }
  .follow-up-main-top-two {
    color: #333;
    font-size: 14px;
    font-weight: 400;
  }
  .follow-up-main-bottom {
    margin-top: 20px;
  }
  .follow-up-main-bottom-one {
    color: #333;
    font-size: 16px;
    font-weight: 400;
  }
  .follow-up-main-bottom-two {
    color: #999;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
  }
</style>
