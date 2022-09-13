<template>
  <auth-component />
</template>

<script>
import AuthComponent from "../components/core/AuthComponent.vue";

export default {
  name: "AuthPage",
  components: { AuthComponent },
  layout: "auth",
};
</script>

<style>
</style>