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
  </div>
</template>
<script>
  export default {
    name: "WorkOrderCenter",
    data() {
      return {
        activeItem: 1,
      };
    },
    methods: {
      clickItem(val) {
        this.activeItem = val;
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
</style>
