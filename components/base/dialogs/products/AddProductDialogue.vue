<template>
  <v-dialog v-model="dialog" width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" color="primary" elevation="0" dark>
        <v-icon left> mdi-plus </v-icon> Add Product
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>New Product</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="submit" :loading="loading"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container fluid>
          <v-form ref="form" v-model="valid" @submit.prevent="submit" lazy-validation>
            <v-alert v-if="error" dense type="error">
              {{ error_message }}
            </v-alert>
            <v-row>
              <v-col cols="12" sm="6">
                <v-file-input v-model="productImage" label="Product Image" prepend-icon="mdi-camera" outlined dense
                  show-size :rules="imageRules" accept="image/png, image/jpeg"
                  hint="If no image is provided, default image will be used" persistent-hint></v-file-input>
                <v-text-field v-model="data.code" :rules="productCodeRules" label="Product Code*" type="text" dense
                  required outlined></v-text-field>
                <v-text-field v-model="data.title" :rules="nameRules" label="Product Title*" type="text" required dense
                  outlined></v-text-field>
                <v-textarea v-model="data.description" :rules="nameRules" label="Product Description*" type="text"
                  required dense outlined></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="data.brandName" :rules="nameRules" label="Brand Name*" type="text" required
                  outlined dense></v-text-field>
                <v-text-field v-model.number="data.price" :rules="numberRules" label="Selling Price(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-select v-model="data.category" :items="categories" :rules="[(v) => !!v || 'Category is required']"
                  label="Category*" required dense outlined></v-select>
                <v-text-field v-model.number="data.costPrice" :rules="numberRules" label="Cost Price(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-text-field v-model.number="data.quantity" :rules="numberRules" label="Qty In Stock*" type="number"
                  required outlined dense></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*Indicates required fields</small>
        <v-progress-linear v-show="uploadProgress !== 0" v-model="uploadProgress" :value="uploadProgress" height="25">
          <strong class="white--text">{{ Math.ceil(uploadProgress) }}%</strong>
        </v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import validationMixin from "../../../../mixins/validationMixin";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Notify } from "notiflix";

export default {
  name: "AddProductDialogue",
  data: () => ({
    error: false,
    error_message: "",
    dialog: false,
    valid: true,
    productImage: null,
    uploadProgress: 0,
    loading: false,
    imageRules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Image size should be less than 1 MB!",
    ],
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
      productImageId: "",
    },
  }),
  mixins: [validationMixin],
  async fetch() {
    await this.$store.dispatch("modules/categories/getAllCategories");
    if (this.categories === []) {
      this.error = true;
      this.error_message = "No category has been added!";
    }
  },
  methods: {
    async submit() {
      await this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      try {
        if (this.productImage !== null) {
          const formData = new FormData();
          formData.append("image", this.productImage);
          const headers = { "Content-Type": "multipart/form-data" };
          Loading.dots("Uploading image...");
          const response = await this.$axios.$post(
            "/products/image",
            formData,
            {
              headers,
              onUploadProgress: function (progressEvent) {
                this.uploadProgress = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }.bind(this),
            }
          );

          this.data.productImg = response.url;
          this.data.productImageId = response.id;
          Loading.remove();
        }

        Loading.dots("Saving product details...");
        await this.$store.dispatch("modules/products/addProduct", this.data);

        Loading.remove();
        Notify.success("Product saved successfully")
        this.loading = false;
        this.dialog = false;
        this.$refs.form.reset();
      } catch (err) {
        this.loading = false;
        console.log("error", err.message);
        console.log("error", err.response.data);
        Loading.remove();
        Report.failure("Error", err.response.data.message || "An error occurred", "Ok");
      }
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
  border-radius: 10px;
  max-width: 300px;
}
</style>