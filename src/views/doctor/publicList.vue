<template>
  <div class="doctor-pack">
    <el-table
      v-loading="loading"
      :data="doctorTableData"
      ref="doctorTable"
      stripe
      border
      height="560"
      style="width: 100%"
      @row-click="rowClick">
      <el-table-column
        prop="medicalCode"
        label="病例编号">
      </el-table-column>
      <el-table-column
        prop="frontPath"
        label="正面照">
        <template slot-scope="scope">
          <img :src="scope.row.frontPath" alt="" class="img-pack">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="患者姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
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
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 10">
            <el-button @click.stop="handleEdit(scope.row)" type="text">编辑</el-button>
          </span>
          <span v-else-if="scope.row.state == 30">
            <el-button @click.stop="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click.stop="viewReason(scope.row)" type="text">查看原因</el-button>
          </span>
          <span v-else-if="scope.row.state == 50">
            <el-button @click.stop="handleApproved(scope.row)" type="text">审核通过</el-button>
            <el-button @click.stop="handleRejected(scope.row)" type="text">审核不通过</el-button>
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
  </div>
</template>
<script>
  import {
    getDoctorList,
    passDoctor,
    rejectDoctor,
  } from "@/api/doctor/commonDoctor";
  import { getFailRemark } from "@/api/case/commonCase";
  export default {
    name: "Doctor",
    data() {
      return {
        loading: true,
        doctorTableData: [],
        currentPage: 1,
        pageSizes: [ 10, 20, 50, 100 ],
        pageSize: 10,
        total: 0,
        rejectId: null,
        rejectVisible: false,
        remark: "",
        failReasonVisible: false,
        failRemark: "",
      };
    },
    props: {
      status: {
        type: Number,
        default: 1,
      },
    },
    created() {
      this.startPage(this.status);
    },
    methods: {
      startPage(status) {
        let params = {
          current: this.currentPage,
          size: this.pageSize,
        };
        this.getAllDoctorList(params, status);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        let params = {
          current: this.currentPage,
          size: val
        };
        this.getAllDoctorList(params, this.status);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        let params = {
          current: val,
          size: this.pageSize,
        };
        this.getAllDoctorList(params, this.status);
      },
      getAllDoctorList(data, status) {
        this.loading = true;
        data.state = status;
        getDoctorList(data).then(res => {
          if (res.data.code == 200) {
            const data = res.data.data;
            this.total = data.total;
            this.doctorTableData = data.records;
            this.$nextTick(() => {
              this.$refs["doctorTable"].doLayout();
            });
          }
          this.loading = false;
        });
      },
      handleEdit(row) {
        this.$router.push({
          path: "/case/addEditCase",
          query: {
            id: row.id,
            isEdit: true,
            isDoctor: true,
          }
        });
      },
      handleApproved(row) {
        passDoctor({recordId: row.id}).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "审核通过成功!"
            });
            let params = {
              current: this.currentPage,
              size: this.pageSize,
            };
            this.getAllDoctorList(params, this.status);
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
        rejectDoctor(params).then(res => {
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
            this.getAllDoctorList(params, this.status);
          }
        })
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
            isDoctor: true,
          }
        });
      },
    }
  }
  </script>
  <style scoped>
    .doctor-pack {
      padding: 20px;
    }
    .img-pack {
      height: 50px;
    }
  </style>
