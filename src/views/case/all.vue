<template>
  <common-list :status="status" ref="commonList"></common-list>
</template>

<script>
import commonList from "./commonList.vue";
export default {
  name: "All",
  components: {
    commonList,
  },
  data() {
    return {
      status: 1, // 全部
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path !== "/case/addEditCase" && from.path !== "/case/caseDetails" && vm.$refs["commonList"]) {
        vm.$refs["commonList"].resetSearch();
      }
    });
  },
};
</script>

<style>
</style>
