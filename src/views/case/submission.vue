<template>
  <common-list :status="status"></common-list>
</template>

<script>
import commonList from "./commonList.vue";
export default {
  name: "Submission",
  components: {
    commonList,
  },
  data() {
    return {
      status: 4, // 待提交
    };
  },
};
</script>

<style>
</style>
