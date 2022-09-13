<template>
  <dashboard-component />
</template>

<script>
import DashboardComponent from "../components/core/DashboardComponent.vue";

export default {
  name: "DashboardPage",
  components: { DashboardComponent },
  middleware: ["auth"],
};
</script>
