<template>
  <v-app dark class="poppins">
    <div
      v-if="error.statusCode === 404"
      class="d-flex flex-column align-center"
    >
      <v-img
        src="https://res.cloudinary.com/mid-assets/image/upload/v1654777178/mid/illustrations/404_jlhja8.png"
        height="55%"
        width="55%"
      />
      <p>{{ pageNotFound }}</p>
    </div>
    <div v-else class="d-flex flex-column align-center">
      <v-img
        src="https://res.cloudinary.com/mid-assets/image/upload/v1654777181/mid/illustrations/server_error_bp1nio.png"
      />
      <p class="baloo-bai">{{ otherError }}</p>
    </div>
    <NuxtLink to="/" class="text-center"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
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
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
