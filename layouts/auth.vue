<template>
  <v-app light>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    return {
      title: "IMS - Authentication Page",
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
