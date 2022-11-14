<template>
  <div class="work-order-center">
    <ul class="switch-state">
      <li v-for="item in switchItems" class="switch-state-item" :class="{'switch-state-active': activeItem === item.currentItem}" :key="item.currentItem" @click="clickItem(item.currentItem)">
        <div class="state-main">
          <div class="state-main-state">
            <i class="state-main-state-icon" :class="item.iconClass"></i>{{item.title}}
          </div>
          <div class="state-main-number">{{item.number}}</div>
          <div class="state-main-no">进行中：{{item.progress}}</div>
        </div>
      </li>
    </ul>
    <div class="search-nav">
      <el-popover
        v-show="activeItem === 1 || activeItem === 2 || activeItem === 3"
        class="mr4 mb4"
        placement="bottom-start"
        :width="activeItem === 1 ? '223' : activeItem === 2 ? '273' : '253'"
        trigger="click"
        popper-class="search-popper"
        :visible-arrow="false">
        <div>
          <el-row class="mt5">
            <el-col :span="12">
              <div class="select-title">全部状态</div>
              <el-checkbox-group v-model="checkedState" @change="handleCheckedStateChange">
                <el-checkbox class="checkbox-item" v-for="item in switchOptions.stateOptions" :indeterminate="item.isIndeterminate" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="12" class="right-border">
              <div class="select-title">{{activeItem === 1 ? '全部主流程' : '全部动态'}}</div>
              <el-checkbox-group v-model="checkedFlow" @change="handleCheckedFlowChange">
                <el-checkbox class="checkbox-item" v-for="item in switchOptions.flowOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <div class="select-confirm">
            <el-button type="primary" size="mini">确定</el-button>
          </div>
        </div>
        <el-button slot="reference" icon="el-icon-search">{{siftData}}</el-button>
      </el-popover>
      <el-popover
        v-show="activeItem === 4 || activeItem === 5"
        class="mr4 mb4"
        placement="bottom-start"
        width="96"
        trigger="click"
        popper-class="search-popper"
        :visible-arrow="false">
        <div>
          <el-row class="mt5">
            <el-col :span="24">
              <div class="select-title">全部状态</div>
              <el-checkbox-group v-model="checkedSingle">
                <el-checkbox class="checkbox-item" v-for="item in singleOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <div class="select-confirm">
            <el-button type="primary" size="mini">确定</el-button>
          </div>
        </div>
        <el-button slot="reference" icon="el-icon-search">{{siftData}}</el-button>
      </el-popover>
      <el-input class="mr4 mb4" v-model="caseNo" placeholder="搜索病例号"></el-input>
      <el-input v-show="showMore" class="mr4 mb4" v-model="num" placeholder="搜索编号"></el-input>
      <el-input v-show="showMore" class="mr4 mb4" v-model="patientName" placeholder="搜索患者姓名"></el-input>
      <el-input v-show="showMore && activeItem === 1" class="mr4 mb4" v-model="mechanism" placeholder="搜索机构"></el-input>
      <el-input v-show="showMore && activeItem === 1" class="mr4 mb4" v-model="doctorName" placeholder="搜索医生姓名"></el-input>
      <el-input v-show="showMore && activeItem !== 1" class="mr4 mb4" v-model="executor" placeholder="搜索执行人"></el-input>
      <el-button class="mr4 mb4" type="primary" @click="sureSearch">确 定</el-button>
      <el-button class="ml0 mr4 mb4" v-show="!showMore" type="text" @click="moreSearch">更多搜索<i class="el-icon-arrow-right icon-search"></i></el-button>
      <el-button class="ml0 mr4 mb4" v-show="showMore" type="text" @click="stowSearch">收起搜索<i class="el-icon-arrow-left icon-search"></i></el-button>
      <el-button class="ml0 mb4" icon="el-icon-refresh" @click="resetData">重置</el-button>
    </div>
    <div class="work-order-table">
      <work-order-list v-show="activeItem === 1" :loading="loading" :orderTableData="orderTableData"></work-order-list>
      <data-review v-show="activeItem === 2 || activeItem === 3 || activeItem === 4" :loading="loading" :orderTableData="orderTableData"></data-review>
      <product-delivery v-show="activeItem === 5" :loading="loading" :orderTableData="orderTableData"></product-delivery>
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
  </div>
</template>
<script>
  import workOrderList from "./workOrderList";
  import dataReview from "./dataReview";
  import productDelivery from "./productDelivery";
  export default {
    name: "WorkOrderCenter",
    components: {
      workOrderList,
      dataReview,
      productDelivery,
    },
    data() {
      return {
        switchItems: [{
          currentItem: 1,
          title: "工单列表",
          number: 872,
          progress: 866,
          iconClass: "icon-one el-icon-document",
        }, {
          currentItem: 2,
          title: "资料审核",
          number: 644,
          progress: 130,
          iconClass: "icon-two el-icon-document-checked",
        }, {
          currentItem: 3,
          title: "方案设计",
          number: 248,
          progress: 110,
          iconClass: "icon-three el-icon-box",
        }, {
          currentItem: 4,
          title: "生产下单",
          number: 230,
          progress: 15,
          iconClass: "icon-four el-icon-sold-out",
        }, {
          currentItem: 5,
          title: "制作/发货",
          number: 211,
          progress: 1,
          iconClass: "icon-five el-icon-truck",
        }],
        activeItem: 1,
        siftData: "筛选",
        switchOptions: {
          stateOptions: [{
            value: 1,
            label: "执行中",
            isIndeterminate: false,
          }, {
            value: 2,
            label: "已完成",
            isIndeterminate: false,
          }, {
            value: 3,
            label: "已终止",
            isIndeterminate: false,
          }],
          flowOptions: [{
            value: 1,
            label: '资料审核',
          }, {
            value: 2,
            label: '方案建模',
          }, {
            value: 3,
            label: '方案设计',
          }, {
            value: 4,
            label: '方案生产',
          }, {
            value: 5,
            label: '已完成',
          }, {
            value: 6,
            label: '完成生产',
          }, {
            value: 7,
            label: '设计终止',
          }, {
            value: 8,
            label: '病例不收治',
          }],
        },
        showMore: false,
        caseNo: '',
        num: '',
        patientName: '',
        mechanism: '',
        doctorName: '',
        executor: '',
        loading: false,
        orderTableData: [],
        currentPage: 1,
        pageSizes: [ 10, 20, 50, 100 ],
        pageSize: 10,
        total: 0,
        checkedState: [],
        checkedFlow: [],
        checkedSingle: [],
        singleOptions: [],
      };
    },
    watch: {
      checkedFlow(val) {
        let endLabels = [];
        this.switchOptions.flowOptions.forEach(item => {
          val.forEach(i => {
            if (i === item.value) {
              endLabels.push(item.label);
            }
          });
        });
        this.siftData = endLabels.length ? endLabels.join("、") : "筛选";
      },
      checkedSingle(val) {
        let endLabelArr = [];
        this.singleOptions.forEach(item => {
          val.forEach(i => {
            if (i === item.value) {
              endLabelArr.push(item.label);
            }
          });
        });
        this.siftData = endLabelArr.length ? endLabelArr.join("、") : "筛选";
      },
    },
    methods: {
      clickItem(val) {
        if (val === 1) {
          this.switchOptions = {
            stateOptions: [{
              value: 1,
              label: "执行中",
              isIndeterminate: false,
            }, {
              value: 2,
              label: "已完成",
              isIndeterminate: false,
            }, {
              value: 3,
              label: "已终止",
              isIndeterminate: false,
            }],
            flowOptions: [{
              value: 1,
              label: '资料审核',
            }, {
              value: 2,
              label: '方案建模',
            }, {
              value: 3,
              label: '方案设计',
            }, {
              value: 4,
              label: '方案生产',
            }, {
              value: 5,
              label: '已完成',
            }, {
              value: 6,
              label: '完成生产',
            }, {
              value: 7,
              label: '设计终止',
            }, {
              value: 8,
              label: '病例不收治',
            }],
          };
        } else if (val === 2) {
          this.switchOptions = {
            stateOptions: [{
              value: 1,
              label: "未执行",
              isIndeterminate: false,
            }, {
              value: 2,
              label: "执行中",
              isIndeterminate: false,
            }, {
              value: 3,
              label: "已完成",
              isIndeterminate: false,
            }, {
              value: 4,
              label: "已退回",
              isIndeterminate: false,
            }, {
              value: 5,
              label: "终止",
              isIndeterminate: false,
            }],
            flowOptions: [{
              value: 1,
              label: '任务未执行',
            }, {
              value: 2,
              label: '任务执行中',
            }, {
              value: 3,
              label: '病例可行性评估',
            }, {
              value: 4,
              label: '任务已完成',
            }, {
              value: 5,
              label: '资料不通过',
            }, {
              value: 6,
              label: '扫描任务不通过',
            }, {
              value: 7,
              label: '预评估不收治',
            }, {
              value: 8,
              label: '终止',
            }],
          };
        } else if (val === 3) {
          this.switchOptions = {
            stateOptions: [{
              value: 1,
              label: "未执行",
              isIndeterminate: false,
            }, {
              value: 2,
              label: "执行中",
              isIndeterminate: false,
            }, {
              value: 3,
              label: "已完成",
              isIndeterminate: false,
            }, {
              value: 4,
              label: "已退回",
              isIndeterminate: false,
            }, {
              value: 5,
              label: "终止",
              isIndeterminate: false,
            }],
            flowOptions: [{
              value: 1,
              label: '任务未执行',
            }, {
              value: 2,
              label: '任务执行中',
            }, {
              value: 3,
              label: '设计方案上传',
            }, {
              value: 4,
              label: '方案内部审核',
            }, {
              value: 5,
              label: '方案内部驳回',
            }, {
              value: 6,
              label: '方案待批准',
            }, {
              value: 7,
              label: '修改意见反馈',
            }, {
              value: 8,
              label: '医生已批准',
            }, {
              value: 9,
              label: '建模不合格',
            }, {
              value: 10,
              label: '终止',
            }],
          };
        } else if (val === 4) {
          this.singleOptions = [{
            value: 1,
            label: "未执行",
          }, {
            value: 2,
            label: "执行中",
          }, {
            value: 3,
            label: "已完成",
          }, {
            value: 4,
            label: "终止",
          }];
        } else if (val === 5) {
          this.singleOptions = [{
            value: 1,
            label: "未执行",
          }, {
            value: 2,
            label: "执行中",
          }, {
            value: 3,
            label: "已完成",
          }, {
            value: 4,
            label: "已退回",
          }, {
            value: 5,
            label: "终止",
          }];
        } else {
          this.singleOptions = [];
          this.switchOptions = {};
        }
        this.activeItem = val;
        this.resetData();
        this.showMore = false;
      },
      sureSearch() {},
      moreSearch() {
        this.showMore = true;
      },
      stowSearch() {
        this.showMore = false;
      },
      resetData() {
        this.checkedState = [];
        this.checkedFlow = [];
        this.checkedSingle = [];
        this.caseNo = '';
        this.num = '';
        this.patientName = '';
        this.mechanism = '';
        this.doctorName = '';
        this.executor = '';
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleCheckedStateChange(val) {
        let endArray = this.checkedFlow;
        if (this.activeItem === 1) {
          const arrayOne = [1, 2, 3, 4];
          const arrayTwo = [5, 6];
          const arrayThree = [7, 8];
          if (val.indexOf(1) !== -1) {
            endArray = [...endArray, ...arrayOne];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayOne).length === 4) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayOne);
            }
          }
          if (val.indexOf(2) !== -1) {
            endArray = [...endArray, ...arrayTwo];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayTwo).length === 2) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayTwo);
            }
          }
          if (val.indexOf(3) !== -1) {
            endArray = [...endArray, ...arrayThree];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayThree).length === 2) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayThree);
            }
          }
        } else if (this.activeItem === 2) {
          const arrayOne = [1];
          const arrayTwo = [2, 3];
          const arrayThree = [4];
          const arrayFour = [5, 6, 7];
          const arrayFive = [8];
          if (val.indexOf(1) !== -1) {
            endArray = [...endArray, ...arrayOne];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayOne).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayOne);
            }
          }
          if (val.indexOf(2) !== -1) {
            endArray = [...endArray, ...arrayTwo];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayTwo).length === 2) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayTwo);
            }
          }
          if (val.indexOf(3) !== -1) {
            endArray = [...endArray, ...arrayThree];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayThree).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayThree);
            }
          }
          if (val.indexOf(4) !== -1) {
            endArray = [...endArray, ...arrayFour];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayFour).length === 3) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayFour);
            }
          }
          if (val.indexOf(5) !== -1) {
            endArray = [...endArray, ...arrayFive];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayFive).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayFive);
            }
          }
        } else if (this.activeItem === 3) {
          const arrayOne = [1];
          const arrayTwo = [2, 3, 4, 5, 6, 7];
          const arrayThree = [8];
          const arrayFour = [9];
          const arrayFive = [10];
          if (val.indexOf(1) !== -1) {
            endArray = [...endArray, ...arrayOne];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayOne).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayOne);
            }
          }
          if (val.indexOf(2) !== -1) {
            endArray = [...endArray, ...arrayTwo];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayTwo).length === 6) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayTwo);
            }
          }
          if (val.indexOf(3) !== -1) {
            endArray = [...endArray, ...arrayThree];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayThree).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayThree);
            }
          }
          if (val.indexOf(4) !== -1) {
            endArray = [...endArray, ...arrayFour];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayFour).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayFour);
            }
          }
          if (val.indexOf(5) !== -1) {
            endArray = [...endArray, ...arrayFive];
          } else {
            if (this.getArraySame(this.checkedFlow, arrayFive).length === 1) {
              endArray = this.getArrayNotSame(this.checkedFlow, arrayFive);
            }
          }
        } else {
          // 不做操作
        }
        this.checkedFlow = Array.from(new Set(endArray));
        this.commonFlowChange(this.checkedFlow);
      },
      handleCheckedFlowChange(value) {
        this.commonFlowChange(value);
      },
      commonFlowChange(value) {
        if (this.activeItem === 1) {
          const arrOne = [1, 2, 3, 4];
          const arrTwo = [5, 6];
          const arrThree = [7, 8];
          let endArr = [];
          if (this.getArraySame(value, arrOne).length > 0 && this.getArraySame(value, arrOne).length < 4) {
            this.switchOptions.stateOptions[0].isIndeterminate = true;
          } else if (this.getArraySame(value, arrOne).length === 4) {
            this.switchOptions.stateOptions[0].isIndeterminate = false;
            endArr = [...endArr, 1]
          } else {
            this.switchOptions.stateOptions[0].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrTwo).length > 0 && this.getArraySame(value, arrTwo).length < 2) {
            this.switchOptions.stateOptions[1].isIndeterminate = true;
          } else if (this.getArraySame(value, arrTwo).length === 2) {
            this.switchOptions.stateOptions[1].isIndeterminate = false;
            endArr = [...endArr, 2]
          } else {
            this.switchOptions.stateOptions[1].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrThree).length > 0 && this.getArraySame(value, arrThree).length < 2) {
            this.switchOptions.stateOptions[2].isIndeterminate = true;
          } else if (this.getArraySame(value, arrThree).length === 2) {
            this.switchOptions.stateOptions[2].isIndeterminate = false;
            endArr = [...endArr, 3]
          } else {
            this.switchOptions.stateOptions[2].isIndeterminate = false;
          }
          this.checkedState = endArr;
        } else if (this.activeItem === 2) {
          const arrOne = [1];
          const arrTwo = [2, 3];
          const arrThree = [4];
          const arrFour = [5, 6, 7];
          const arrFive = [8];
          let endArr = [];
          if (this.getArraySame(value, arrOne).length > 0 && this.getArraySame(value, arrOne).length < 1) {
            this.switchOptions.stateOptions[0].isIndeterminate = true;
          } else if (this.getArraySame(value, arrOne).length === 1) {
            this.switchOptions.stateOptions[0].isIndeterminate = false;
            endArr = [...endArr, 1]
          } else {
            this.switchOptions.stateOptions[0].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrTwo).length > 0 && this.getArraySame(value, arrTwo).length < 2) {
            this.switchOptions.stateOptions[1].isIndeterminate = true;
          } else if (this.getArraySame(value, arrTwo).length === 2) {
            this.switchOptions.stateOptions[1].isIndeterminate = false;
            endArr = [...endArr, 2]
          } else {
            this.switchOptions.stateOptions[1].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrThree).length > 0 && this.getArraySame(value, arrThree).length < 1) {
            this.switchOptions.stateOptions[2].isIndeterminate = true;
          } else if (this.getArraySame(value, arrThree).length === 1) {
            this.switchOptions.stateOptions[2].isIndeterminate = false;
            endArr = [...endArr, 3]
          } else {
            this.switchOptions.stateOptions[2].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrFour).length > 0 && this.getArraySame(value, arrFour).length < 3) {
            this.switchOptions.stateOptions[3].isIndeterminate = true;
          } else if (this.getArraySame(value, arrFour).length === 3) {
            this.switchOptions.stateOptions[3].isIndeterminate = false;
            endArr = [...endArr, 4]
          } else {
            this.switchOptions.stateOptions[3].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrFive).length > 0 && this.getArraySame(value, arrFive).length < 1) {
            this.switchOptions.stateOptions[4].isIndeterminate = true;
          } else if (this.getArraySame(value, arrFive).length === 1) {
            this.switchOptions.stateOptions[4].isIndeterminate = false;
            endArr = [...endArr, 5]
          } else {
            this.switchOptions.stateOptions[4].isIndeterminate = false;
          }
          this.checkedState = endArr;
        } else if (this.activeItem === 3) {
          const arrOne = [1];
          const arrTwo = [2, 3, 4, 5, 6, 7];
          const arrThree = [8];
          const arrFour = [9];
          const arrFive = [10];
          let endArr = [];
          if (this.getArraySame(value, arrOne).length > 0 && this.getArraySame(value, arrOne).length < 1) {
            this.switchOptions.stateOptions[0].isIndeterminate = true;
          } else if (this.getArraySame(value, arrOne).length === 1) {
            this.switchOptions.stateOptions[0].isIndeterminate = false;
            endArr = [...endArr, 1]
          } else {
            this.switchOptions.stateOptions[0].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrTwo).length > 0 && this.getArraySame(value, arrTwo).length < 6) {
            this.switchOptions.stateOptions[1].isIndeterminate = true;
          } else if (this.getArraySame(value, arrTwo).length === 6) {
            this.switchOptions.stateOptions[1].isIndeterminate = false;
            endArr = [...endArr, 2]
          } else {
            this.switchOptions.stateOptions[1].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrThree).length > 0 && this.getArraySame(value, arrThree).length < 1) {
            this.switchOptions.stateOptions[2].isIndeterminate = true;
          } else if (this.getArraySame(value, arrThree).length === 1) {
            this.switchOptions.stateOptions[2].isIndeterminate = false;
            endArr = [...endArr, 3]
          } else {
            this.switchOptions.stateOptions[2].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrFour).length > 0 && this.getArraySame(value, arrFour).length < 1) {
            this.switchOptions.stateOptions[3].isIndeterminate = true;
          } else if (this.getArraySame(value, arrFour).length === 1) {
            this.switchOptions.stateOptions[3].isIndeterminate = false;
            endArr = [...endArr, 4]
          } else {
            this.switchOptions.stateOptions[3].isIndeterminate = false;
          }
          if (this.getArraySame(value, arrFive).length > 0 && this.getArraySame(value, arrFive).length < 1) {
            this.switchOptions.stateOptions[4].isIndeterminate = true;
          } else if (this.getArraySame(value, arrFive).length === 1) {
            this.switchOptions.stateOptions[4].isIndeterminate = false;
            endArr = [...endArr, 5]
          } else {
            this.switchOptions.stateOptions[4].isIndeterminate = false;
          }
          this.checkedState = endArr;
        } else {
          // 不做操作
        }
      },
      getArraySame(arr1, arr2) {
        return arr1.filter(item => {
          return arr2.includes(item);
        })
      },
      getArrayNotSame(originArr, deleteArr) {
        return originArr.filter((o) => !deleteArr.includes(o));
      },
    }
  };
</script>
<style scoped>
  .work-order-center {
    padding: 10px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .switch-state {
    list-style: none;
    margin: 0;
    padding: 8px 24px;
    grid-gap: 24px;
    gap: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .switch-state-item {
    cursor: pointer;
    padding: 16px 18px;
    border: 1px solid transparent;
    transition: .5s;
    border-radius: 16px;
  }
  .switch-state-item:hover {
    background-color: #fff;
  }
  .state-main {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #333;
    font-size: 14px;
    font-weight: 400;
    flex-direction: column;
  }
  .state-main-state {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2px;
  }
  .state-main-state-icon {
    font-size: 16px;
    margin-right: 7px;
  }
  .state-main-number {
    margin-bottom: 10px;
    color: #333;
    font-size: 24px;
    font-weight: 700;
  }
  .state-main-no {
    padding: 2px 4px;
    background-color: #ecf8ff;
    border-radius: 2px;
    transition: 1s;
  }
  .switch-state-active {
    background-color: #fff;
    border-radius: 16px;
    border: 1px solid #409eff;
    box-shadow: inset 0 8px 14px 1px rgb(101 143 149 / 15%);
  }
  .icon-one {
    color: #409eff;
  }
  .icon-two {
    color: #44cddb;
  }
  .icon-three {
    color: #e82156;
  }
  .icon-four {
    color: #ca6419;
  }
  .icon-five {
    color: #e120e4;
  }
  .search-nav {
    background-color: #fff;
    padding: 8px 18px 4px;
  }
  .search-nav >>> .el-input {
    width: auto;
  }
  .mr4 {
    margin-right: 4px;
  }
  .mb4 {
    margin-bottom: 4px;
  }
  .ml0 {
    margin-left: 0;
  }
  .mt5 {
    margin-top: 5px;
  }
  .icon-search {
    font-size: 12px;
    margin-left: 2px;
  }
  .work-order-table {
    padding: 0 18px;
    background: white;
  }
  .select-confirm {
    text-align: center;
    padding: 10px;
    background-color: #ecf5ff;
  }
  .select-title {
    text-align: center;
    border-bottom: 1px solid #eef7f9;
    color: #323233;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 5px;
    margin: 0 8px;
  }
  .right-border {
    border-left: 1px solid #eef7f9;
    padding-left: 1px;
  }
  .checkbox-item {
    margin-left: 8px;
    margin-top: 8px;
  }
</style>
<style>
  .search-popper {
    margin-top: 0px !important;
    padding: 0px;
    min-width: 96px;
  }
</style>
