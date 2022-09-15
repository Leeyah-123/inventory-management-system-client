<template>
  <ReportComponent />
</template>

<script>
import ReportComponent from "../components/core/ReportComponent.vue";

export default {
  name: "ReportPage",
  components: { ReportComponent },
  middleware: ["roleBasedAuthentication"],
};
</script>

<style>
</style>