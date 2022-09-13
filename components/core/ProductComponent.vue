<template>
  <v-skeleton-loader
    v-if="$fetchState.pending"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
  <v-container v-else class="product PlayFair Display" fluid>
    <v-container class="d-md-flex" fluid>
      <div class="px-md-5 title">
        <h3 class="PlayFair Display">Product List</h3>
        <p>
          The product list effectively dictates product presentation and
          provides space to list your products and offering in the most
          appealing way.
        </p>
      </div>
      <div class="search align-self-center d-xs-flex">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="productSearch"
          placeholder="Search for product"
          outlined
          dense
          class="Yeseva One ml-md-auto"
        />
      </div>
    </v-container>
    <v-container class="d-sm-flex justify-end" fluid>
      <!-- <v-btn color="blue lighten-2" elevation="0" dark>
        <v-icon left> mdi-plus </v-icon> Add Product
      </v-btn> -->
      <AddProductDialogue />
    </v-container>
    <v-container fluid>
      <v-data-table
        :headers="productTableHeader"
        :items="$store.state.modules.products.products"
        :search="productSearch"
        :items-per-page="5"
        class="poppins"
      >
        <!--    Product image slot      -->
        <template #[`item.productImg`]="{ item }">
          <v-avatar class="my-5">
            <v-img :src="item.productImg"></v-img>
          </v-avatar>
        </template>

        <!--    Actions slot      -->
        <template #[`item.actions`]="{ item }">
          <!-- edit dialog -->
          <EditProductDialogue :product="item" />

          <!-- delete dialog -->
          <DeleteProductDialogue :product="item" />
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
import AddProductDialogue from "../base/dialogs/products/AddProductDialogue.vue";
import EditProductDialogue from "../base/dialogs/products/EditProductDialogue.vue";
import DeleteProductDialogue from "../base/dialogs/products/DeleteProductDialogue.vue";
import Notify from "../../utils/Notifilix";

export default {
  name: "ProductComponent",
  data: () => ({
    productSearch: "",
  }),
  async fetch() {
    this.$store.dispatch("modules/products/getAllProducts");
    if (this.$store.state.modules.products.error) {
      Notify.failure(this.$store.state.modules.products.error_message);
    }
  },
  watch: {
    error(newVal) {
      if (newVal === true) {
        Notify.failure(this.$store.state.modules.products.error_message);
      }
    },
  },
  components: {
    AddProductDialogue,
    EditProductDialogue,
    DeleteProductDialogue,
  },
  computed: {
    productTableHeader() {
      return [
        {
          text: "Product Image",
          value: "productImg",
          class: "primary white--text",
        },
        { text: "Title", value: "title", class: "primary white--text" },
        {
          text: "Description",
          value: "description",
          class: "primary white--text",
        },
        { text: "Category", value: "category", class: "primary white--text" },
        { text: "Price", value: "price", class: "primary white--text" },
        {
          text: "Brand Name",
          value: "brandName",
          class: "primary white--text",
        },
        { text: "Cost", value: "costPrice", class: "primary white--text" },
        { text: "In Stock", value: "quantity", class: "primary white--text" },
        { text: "Actions", value: "actions", class: "primary white--text" },
      ];
    },
    error() {
      return this.$store.state.modules.products.error;
    },
  },
  head: {
    title: "IMS - Products",
  },
};
</script>

<style scoped>
.product p {
  font-weight: 250;
}
.title {
  width: 50%;
}
.search {
  width: 50%;
}
.v-text-field {
  border-radius: 5px;
  max-width: 250px;
}
</style>