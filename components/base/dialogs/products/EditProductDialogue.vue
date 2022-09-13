<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="500">
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
      <v-card-title>
        <p class="mt-5" style="font-size: 1.8rem">
          <!-- Add Staff to {{ lab.name | upperFirst }} -->
          Edit Product
        </p>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="error" dense type="error">
          {{ error_message }}
        </v-alert>
        <div class="">
          <!--                  <p class='ma-0 poppins auth-text mt-1'></p>-->
        </div>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="mt-5 poppins"
          @submit.prevent="editProduct"
        >
          <v-row>
            <!-- Product Code -->
            <v-col cols="12" md="12" class="py-0">
              <span class="text-body-1">Product Code</span>
              <v-text-field :value="product.code" disabled dense outlined />
            </v-col>

            <!-- Categories -->
            <v-col cols="12" md="12" class="py-0">
              <span class="text-body-1">Category</span>
              <v-select
                :value="product.category"
                :items="categories"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn dark color="error" @click="dialog = false"> Cancel </v-btn>
        <v-btn color="primary" @click="editProduct"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditProductDialogue",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    await this.$store.dispatch("modules/categories/getAllCategories");
    if (!(this.categories === [])) {
      this.error = true;
      this.error_message = "No category has been added!";
    }
  },
  data: () => ({
    error: false,
    error_message: "",
    dialog: false,
    valid: true,
  }),
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
  methods: {
    editProduct() {
      console.log(product);
    },
  },
};
</script>

<style>
</style>