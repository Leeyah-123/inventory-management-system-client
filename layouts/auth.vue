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
