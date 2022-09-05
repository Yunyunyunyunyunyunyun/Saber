<template>
  <common-list :status="status"></common-list>
</template>

<script>
import commonList from "./commonList.vue";
export default {
  name: "Pending",
  components: {
    commonList,
  },
  data() {
    return {
      status: 2, // 待处理
    };
  },
};
</script>

<style>
</style>
