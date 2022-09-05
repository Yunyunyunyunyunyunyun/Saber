<template>
  <common-list :status="status"></common-list>
</template>

<script>
import commonList from "./commonList.vue";
export default {
  name: "Treatment",
  components: {
    commonList,
  },
  data() {
    return {
      status: 3, // 治疗中
    };
  },
};
</script>

<style>
</style>
