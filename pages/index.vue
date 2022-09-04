<template>
  <div>This is the home page</div>
</template>

<script>
export default {
  name: "IndexPage",
  created() {
    this.$store.commit("SET_VALIDATED", true);
  },
};
</script>
