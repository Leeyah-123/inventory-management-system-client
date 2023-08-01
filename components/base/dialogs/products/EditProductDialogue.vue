<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="800px">
    <template #activator="{ on: card, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...card }" icon>
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span class="poppins">Edit Product</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Edit Product</v-toolbar-title>
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
                <div class="d-flex flex-column align-center avatar pb-2">
                  <v-avatar tile size="170">
                    <v-img :src="product.productImg" />
                  </v-avatar>
                </div>
                <v-file-input v-model="productImage" label="Change Product Image" prepend-icon="mdi-camera" outlined dense
                  show-size :rules="imageRules" accept="image/png, image/jpeg"></v-file-input>
                <v-text-field v-model="data.code" :rules="productCodeRules" label="Product Code*" type="text" disabled
                  dense required outlined></v-text-field>
                <v-text-field v-model="data.title" :rules="nameRules" label="Product Title*" type="text" required dense
                  outlined></v-text-field>
                <v-text-field v-model="data.brandName" :rules="nameRules" label="Brand Name*" type="text" required
                  outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model.number="data.price" :rules="numberRules" label="Selling Price(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-select v-model="data.category" :items="categories" :rules="[(v) => !!v || 'Category is required']"
                  label="Category*" required dense outlined></v-select>
                <v-text-field v-model.number="data.costPrice" :rules="numberRules" label="Cost Price(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-text-field v-model.number="data.quantity" :rules="numberRules" label="Qty In Stock*" type="number"
                  required outlined dense></v-text-field>
                <v-textarea v-model="data.description" :rules="nameRules" label="Product Description*" type="text"
                  required dense outlined></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*Indicates required field</small>
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

export default {
  name: "EditProductDialogue",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
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
          const response = await this.$axios.$patch(
            `/products/image/${this.data.code}`,
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

          // console.log("Response", response);

          this.data.productImg = response.url;
          this.data.productImageId = response.id;
          Loading.remove();
        }

        Loading.dots("Updating product details...");
        await this.$store.dispatch("modules/products/updateProduct", this.data);

        Loading.remove();
        this.loading = false;
        this.dialog = false;
      } catch (err) {
        this.uploadProgress = 0;
        this.loading = false;
        // console.log("error", err.message);
        // console.log("error", err.response.data);
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
    data() {
      return {
        code: this.product.code,
        title: this.product.title,
        description: this.product.description,
        category: this.product.category,
        price: this.product.price,
        brandName: this.product.brandName,
        costPrice: this.product.costPrice,
        quantity: this.product.quantity,
        productImg: this.product.productImg,
        productImageId: this.product.productImageId,
      };
    },
  },
};
</script>

<style scoped>
.avatar {
  margin: 1px solid black;
}

.v-text-field {
  margin: 5px;
  border-radius: 10px;
  max-width: 300px;
}
</style>
