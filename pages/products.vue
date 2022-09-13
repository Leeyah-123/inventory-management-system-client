<template>
  <product-component />
</template>

<script>
import ProductComponent from "../components/core/ProductComponent.vue";

export default {
  name: "ProductPage",
  middleware: ["auth"],
  components: { ProductComponent },
};
</script>

<style>
</style>