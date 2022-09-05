<template>
  <common-list :status="status"></common-list>
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
};
</script>

<style>
</style>
