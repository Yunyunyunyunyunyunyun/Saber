<template>
  <div class="work-order-center">
    <ul class="switch-state">
      <li class="switch-state-item" :class="{'switch-state-active': activeItem === 1}" @click="clickItem(1)">
        <div class="state-main">
          <div class="state-main-state">
            <i class="state-main-state-icon icon-one el-icon-document"></i>工单列表
          </div>
          <div class="state-main-number">863</div>
          <div class="state-main-no">进行中：859</div>
        </div>
      </li>
      <li class="switch-state-item" :class="{'switch-state-active': activeItem === 2}" @click="clickItem(2)">
        <div class="state-main">
          <div class="state-main-state">
            <i class="state-main-state-icon icon-two el-icon-document-checked"></i>资料审核
          </div>
          <div class="state-main-number">380</div>
          <div class="state-main-no">进行中：306</div>
        </div>
      </li>
      <li class="switch-state-item" :class="{'switch-state-active': activeItem === 3}" @click="clickItem(3)">
        <div class="state-main">
          <div class="state-main-state">
            <i class="state-main-state-icon icon-three el-icon-box"></i>方案设计
          </div>
          <div class="state-main-number">631</div>
          <div class="state-main-no">进行中：123</div>
        </div>
      </li>
      <li class="switch-state-item" :class="{'switch-state-active': activeItem === 4}" @click="clickItem(4)">
        <div class="state-main">
          <div class="state-main-state">
            <i class="state-main-state-icon icon-four el-icon-sold-out"></i>生产下单
          </div>
          <div class="state-main-number">225</div>
          <div class="state-main-no">进行中：22</div>
        </div>
      </li>
      <li class="switch-state-item" :class="{'switch-state-active': activeItem === 5}" @click="clickItem(5)">
        <div class="state-main">
          <div class="state-main-state">
            <i class="state-main-state-icon icon-five el-icon-truck"></i>制作/发货
          </div>
          <div class="state-main-number">200</div>
          <div class="state-main-no">进行中：5</div>
        </div>
      </li>
    </ul>
    <div class="search-nav">
        <el-select class="mr4 mb4" v-show="activeItem === 1 || activeItem === 2 || activeItem === 3" v-model="stateValue" multiple collapse-tags :placeholder="activeItem === 1?'请选择主流程':'请选择任务动态'">
          <el-option-group
            v-for="group in stateOptions"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
        <el-select class="mr4 mb4" v-show="activeItem === 4 || activeItem === 5" v-model="stateValue" multiple collapse-tags placeholder="请选择状态">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
  </div>
</template>
<script>
  export default {
    name: "WorkOrderCenter",
    data() {
      return {
        activeItem: 1,
        stateOptions: [{
          label: '执行中',
          options: [{
            value: 1,
            label: '资料审核'
          }, {
            value: 2,
            label: '方案建模'
          }, {
            value: 3,
            label: '方案设计'
          }, {
            value: 4,
            label: '方案生产'
          }]
        }, {
          label: '已完成',
          options: [{
            value: 5,
            label: '已完成'
          }, {
            value: 6,
            label: '完成生产'
          }]
        }, {
          label: '已终止',
          options: [{
            value: 7,
            label: '设计终止'
          }, {
            value: 8,
            label: '病例不收治'
          }]
        }],
        showMore: false,
        stateValue: [],
        caseNo: '',
        num: '',
        patientName: '',
        mechanism: '',
        doctorName: '',
        executor: '',
      };
    },
    methods: {
      clickItem(val) {
        if (val === 1) {
          this.stateOptions = [{
            label: '执行中',
            options: [{
              value: 1,
              label: '资料审核'
            }, {
              value: 2,
              label: '方案建模'
            }, {
              value: 3,
              label: '方案设计'
            }, {
              value: 4,
              label: '方案生产'
            }]
          }, {
            label: '已完成',
            options: [{
              value: 5,
              label: '已完成'
            }, {
              value: 6,
              label: '完成生产'
            }]
          }, {
            label: '已终止',
            options: [{
              value: 7,
              label: '设计终止'
            }, {
              value: 8,
              label: '病例不收治'
            }]
          }];
        } else if (val === 2) {
          this.stateOptions = [{
            label: '未执行',
            options: [{
              value: 1,
              label: '任务未执行'
            }]
          }, {
            label: '执行中',
            options: [{
              value: 2,
              label: '任务执行中'
            }, {
              value: 3,
              label: '病例可行性评估'
            }]
          }, {
            label: '已完成',
            options: [{
              value: 4,
              label: '任务已完成'
            }]
          }, {
            label: '已退回',
            options: [{
              value: 5,
              label: '资料不通过'
            }, {
              value: 6,
              label: '扫描任务不通过'
            }, {
              value: 7,
              label: '预评估不收治'
            }]
          }, {
            label: '终止',
            options: [{
              value: 8,
              label: '终止'
            }]
          }];
        } else if (val === 3) {
          this.stateOptions = [{
            label: '未执行',
            options: [{
              value: 1,
              label: '任务未执行'
            }]
          }, {
            label: '执行中',
            options: [{
              value: 2,
              label: '任务执行中'
            }, {
              value: 3,
              label: '设计方案上传'
            }, {
              value: 4,
              label: '方案内部审核'
            }, {
              value: 5,
              label: '方案内部驳回'
            }, {
              value: 6,
              label: '方案待批准'
            }, {
              value: 7,
              label: '修改意见反馈'
            }]
          }, {
            label: '已完成',
            options: [{
              value: 8,
              label: '医生已批准'
            }]
          }, {
            label: '已退回',
            options: [{
              value: 9,
              label: '建模不合格'
            }]
          }, {
            label: '终止',
            options: [{
              value: 10,
              label: '终止'
            }]
          }];
        } else if (val === 4) {
          this.stateOptions = [{
            value: 1,
            label: '未执行'
          }, {
            value: 2,
            label: '执行中'
          }, {
            value: 3,
            label: '已完成'
          }, {
            value: 4,
            label: '终止'
          }];
        } else if (val === 5) {
          this.stateOptions = [{
            value: 1,
            label: '未执行'
          }, {
            value: 2,
            label: '执行中'
          }, {
            value: 3,
            label: '已完成'
          }, {
            value: 4,
            label: '已退回'
          }, {
            value: 5,
            label: '终止'
          }];
        } else {
          this.stateOptions = [];
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
        this.stateValue = [];
        this.caseNo = '';
        this.num = '';
        this.patientName = '';
        this.mechanism = '';
        this.doctorName = '';
        this.executor = '';
      },
    }
  };
</script>
<style scoped>
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
  .icon-search {
    font-size: 12px;
    margin-left: 2px;
  }
</style>
