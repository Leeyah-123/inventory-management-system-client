<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" color="blue lighten-2" elevation="0" dark>
        <v-icon left> mdi-plus </v-icon> Add Product
      </v-btn>
    </template>

    <v-row>
      <v-col></v-col>
    </v-row>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>New Product</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="validate"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Add Product form -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-alert v-if="error" dense type="error">
          {{ error_message }}
        </v-alert>
        <v-text-field
          v-model="data.code"
          :rules="productCodeRules"
          label="Product Code"
          type="text"
          dense
          required
          outlined
        ></v-text-field>

        <!-- <v-file-input
          label="Product Image"
          prepend-icon="mdi-camera"
        ></v-file-input> -->

        <v-text-field
          v-model="data.title"
          :rules="nameRules"
          label="Product Title"
          type="text"
          required
          dense
          outlined
        ></v-text-field>

        <v-textarea
          v-model="data.description"
          :rules="nameRules"
          label="Product Description"
          type="text"
          required
          dense
          outlined
        ></v-textarea>

        <v-select
          v-model="data.category"
          :items="categories"
          :rules="[(v) => !!v || 'Category is required']"
          label="Category"
          required
          outlined
        ></v-select>

        <v-text-field
          v-model="data.price"
          :rules="numberRules"
          label="Selling Price"
          type="number"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="data.brandName"
          :rules="nameRules"
          label="Brand Name"
          type="text"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="data.costPrice"
          :rules="numberRules"
          label="Cost Price"
          type="number"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="data.quantity"
          :rules="numberRules"
          label="Qty In Stock"
          type="number"
          required
          outlined
        ></v-text-field>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddProductDialogue",
  data: () => ({
    dialog: false,
    valid: true,
    data: {
      code: "",
      title: "",
      description: "",
      category: "",
      price: 0,
      brandName: "",
      costPrice: 0,
      quantity: 0,
      productImg: "",
    },
  }),
  mixins: "validationMixin",
  async fetch() {
    await this.$store.dispatch("modules/categories/getAllCategories");
    if (this.categories === []) {
      this.error = true;
      this.error_message = "No category has been added!";
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate;
      if (!this.valid) return;
      this.dialog = false;
    },
  },
  computed: {
    categories() {
      let filteredCategories = [];
      let categories = this.$store.state.modules.categories.categories;

      categories.forEach((category) => {
        delete category.id;
        filteredCategories.push(category.categoryName);
      });

      return filteredCategories;
    },
  },
};
</script>

<style scoped>
.v-text-field {
  margin: 5px;
  max-width: 300px;
}
</style>