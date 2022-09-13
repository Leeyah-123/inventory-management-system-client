<template>
  <CategoryComponent />
</template>

<script>
import CategoryComponent from "../components/core/CategoryComponent.vue";

export default {
  name: "CategoryPage",
  middleware: ["auth"],
  components: { CategoryComponent },
};
</script>

<style>
</style>