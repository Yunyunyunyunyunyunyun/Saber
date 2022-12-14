<template>
  <div class="case-contain">
    <el-row :gutter="20" class="case-search">
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="addCase">新建病例</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="doctorName" placeholder="请输入医生姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="patientName" placeholder="请输入患者姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="resetSearch">重置</el-button>
        <el-button type="primary" @click="submitSearch">搜索</el-button>
      </el-col>
    </el-row>
    <div class="case-main">
      <el-table
        v-loading="loading"
        :data="caseTableData"
        ref="caseTable"
        stripe
        border
        height="680"
        style="width: 100%"
        :default-sort = "{prop: 'medicalCode', order: 'descending'}"
        @row-click="rowClick">
        <el-table-column
          prop="medicalCode"
          label="病例编号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="患者">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 10">资料已保存,待提交</span>
            <span v-else-if="scope.row.state == 20">资料已提交,待审核</span>
            <span v-else-if="scope.row.state == 30">资料不合格,请补齐</span>
            <span v-else-if="scope.row.state == 40">资料审核通过,3D方案设计中</span>
            <span v-else-if="scope.row.state == 50">3D方案已上传</span>
            <span v-else-if="scope.row.state == 60">3D方案已提交反馈</span>
            <span v-else-if="scope.row.state == 70">3D方案已批准</span>
            <span v-else-if="scope.row.state == 80">生产发货</span>
            <span v-else-if="scope.row.state == 90">完成病例，治疗结束</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="doctorName"
          label="医生姓名">
        </el-table-column>
        <el-table-column
          prop="org"
          label="医疗机构">
          <template slot-scope="scope">
            <span>
              {{scope.row.clinicName}}-{{scope.row.countries}}-{{scope.row.province}}-{{scope.row.city}}-{{scope.row.district}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 10">
              <el-button @click.stop="handleEdit(scope.row)" type="text">编辑</el-button>
            </span>
            <span v-else-if="scope.row.state == 20">
              <el-button @click.stop="handleApproved(scope.row)" type="text">审核通过</el-button>
              <el-button @click.stop="handleRejected(scope.row)" type="text">审核不通过</el-button>
            </span>
            <span v-else-if="scope.row.state == 30">
              <el-button @click.stop="handleEdit(scope.row)" type="text">编辑</el-button>
            </span>
            <span v-else-if="scope.row.state == 40" @click.stop>
              <el-upload
                class="three-d-uploader"
                action=""
                :show-file-list="false"
                :http-request="showProcess"
                :before-upload="beforeUpload"
                :on-success="function(res, file) { return handleImgSuccess(res, file, scope.row) }"
                :on-error="handleError">
                <el-button type="text">上传</el-button>
              </el-upload>
            </span>
            <span v-else-if="scope.row.state == 60" @click.stop>
              <el-upload
                class="three-d-uploader"
                action=""
                :show-file-list="false"
                :http-request="showProcess"
                :before-upload="beforeUpload"
                :on-success="function(res, file) { return handleImgSuccess(res, file, scope.row) }"
                :on-error="handleError">
                <el-button type="text">上传</el-button>
              </el-upload>
              <el-button @click.stop="viewReason(scope.row)" type="text">查看原因</el-button>
            </span>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="common-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="rejectVisible"
      width="30%">
      <span>审核不通过原因：</span>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入审核不通过原因"
        v-model="remark">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureReject">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="查看原因"
      :visible.sync="failReasonVisible"
      width="30%">
      <div>{{failRemark}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="failReasonVisible = false">取 消</el-button>
        <el-button type="primary" @click="failReasonVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
import {
  getCaseList,
  passCase,
  rejectCase,
  uploadThreeD,
  getFailRemark,
} from "@/api/case/commonCase";
import { uploadOBS } from "@/util/obs";
export default {
  name: "Case",
  data() {
    return {
      doctorName: "",
      patientName: "",
      loading: true,
      caseTableData: [],
      currentPage: 1,
      pageSizes: [ 10, 20, 50, 100 ],
      pageSize: 10,
      total: 0,
      rejectId: null,
      rejectVisible: false,
      remark: "",
      failReasonVisible: false,
      failRemark: "",
      uploadVisible: false,
      percentageNumber: 0,
    };
  },
  props: {
    status: {
      type: Number,
      default: 1,
    },
  },
  activated() {
    this.$nextTick(() => {
      this.$refs["caseTable"].doLayout();
    });
  },
  created() {
    let params = {
      current: this.currentPage,
      size: this.pageSize,
    };
    this.getAllCaseList(params);
  },
  methods: {
    resetSearch() {
      this.doctorName = "";
      this.patientName = "";
      this.currentPage = 1;
      let params = {
        current: 1,
        size: this.pageSize,
      };
      this.getAllCaseList(params);
    },
    submitSearch() {
      this.currentPage = 1;
      let params = {
        current: 1,
        size: this.pageSize,
      };
      if (this.doctorName) {
        params.doctorName = this.doctorName;
      }
      if (this.patientName) {
        params.name = this.patientName;
      }
      this.getAllCaseList(params);
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      let params = {
        current: this.currentPage,
        size: val
      };
      if (this.doctorName) {
        params.doctorName = this.doctorName;
      }
      if (this.patientName) {
        params.name = this.patientName;
      }
      this.getAllCaseList(params);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let params = {
        current: val,
        size: this.pageSize,
      };
      if (this.doctorName) {
        params.doctorName = this.doctorName;
      }
      if (this.patientName) {
        params.name = this.patientName;
      }
      this.getAllCaseList(params);
    },
    getAllCaseList(data) {
      this.loading = true;
      data.state = this.status;
      getCaseList(data).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.total = data.total;
          this.caseTableData = data.records;
          this.$nextTick(() => {
            this.$refs["caseTable"].doLayout();
          });
        }
        this.loading = false;
      });
    },
    addCase() {
      this.$router.push({path: "/case/addEditCase"});
    },
    handleEdit(row) {
      this.$router.push({
        path: "/case/addEditCase",
        query: {
          id: row.id,
          isEdit: true,
        }
      });
    },
    handleApproved(row) {
      passCase({recordId: row.id}).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "审核通过成功!"
          });
          let params = {
            current: this.currentPage,
            size: this.pageSize,
          };
          if (this.doctorName) {
            params.doctorName = this.doctorName;
          }
          if (this.patientName) {
            params.name = this.patientName;
          }
          this.getAllCaseList(params);
        }
      })
    },
    handleRejected(row) {
      this.rejectId = row.id;
      this.rejectVisible = true;
      this.remark = "";
    },
    sureReject() {
      let params = {
        recordId: this.rejectId,
        remark: this.remark,
      }
      rejectCase(params).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "审核拒绝成功!"
          });
          this.rejectVisible = false;
          let params = {
            current: this.currentPage,
            size: this.pageSize,
          };
          if (this.doctorName) {
            params.doctorName = this.doctorName;
          }
          if (this.patientName) {
            params.name = this.patientName;
          }
          this.getAllCaseList(params);
        }
      })
    },
    async showProcess(params) {
      //调用分段上传OBS方法
      return await uploadOBS(params.file, 'order', (percentage) => {
        this.percentageNumber = parseInt(percentage);
        // 更新进度条
        params.onProgress({percent: percentage});
      });
    },
    beforeUpload(file) {
      if (file.type) {
        this.percentageNumber = 0;
        this.uploadVisible = true;
      }
    },
    handleError(err) {
      this.uploadVisible = false;
      this.$message.warning(err.msg);
      return false;
    },
    handleImgSuccess(res, file, row) {
      const data = res.data || {};
      let params = {
        filePath: data.viewStlUrl,
        fileName: data.originalName,
        recordId: row.id,
      };
      uploadThreeD(params).then(res => {
        if (res.data.code == 200) {
          this.uploadVisible = false;
          this.$message({
            type: "success",
            message: "上传成功!"
          });
          let params = {
            current: this.currentPage,
            size: this.pageSize,
          };
          if (this.doctorName) {
            params.doctorName = this.doctorName;
          }
          if (this.patientName) {
            params.name = this.patientName;
          }
          this.getAllCaseList(params);
        }
      });
    },
    viewReason(row) {
      let params = {
        recordId: row.id,
      };
      getFailRemark(params).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.failRemark = data.remark;
          this.failReasonVisible = true;
        }
      });
    },
    rowClick(row) {
      this.$router.push({
        path: "/case/caseDetails",
        query: {
          id: row.id,
        }
      });
    },
  }
}
</script>
<style scoped>
  .case-contain {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .case-search {
    padding: 20px 20px 12px;
  }
  .case-main {
    padding: 20px;
    background: white;
  }
  .three-d-uploader {
    float: left;
    margin-right: 10px;
  }
</style>
