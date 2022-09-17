<template>
  <UserComponent />
</template>

<script>
import UserComponent from "../components/core/UserComponent.vue";
export default {
  name: "UsersPage",
  components: { UserComponent },
  middleware: ["roleBasedAuthentication"],
};
</script>

<style>
</style>