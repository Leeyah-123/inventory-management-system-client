<template>
  <v-dialog v-model="dialog" width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" color="primary" elevation="0" dark>
        <v-icon left> mdi-plus </v-icon> Add Category
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>New Category</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="submit" :loading="loading"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container fluid>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="submit"
            lazy-validation
          >
            <v-alert v-if="error" dense type="error">
              {{ error_message }}
            </v-alert>
            <v-text-field
              v-model="data.categoryName"
              :rules="nameRules"
              label="Category Name"
              type="text"
              required
              dense
              outlined
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loading"
          color="blue darken-1"
          text
          @click="dialog = false"
        >
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
  name: "AddProductDialogue",
  data: () => ({
    error: false,
    error_message: "",
    dialog: false,
    valid: true,
    loading: false,
    data: {
      categoryName: "",
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
        Loading.dots("Saving category details...");
        await this.$store.dispatch("modules/categories/addCategory", this.data);

        Loading.remove();
        this.loading = false;
        this.resetFields();
        this.dialog = false;
      } catch (err) {
        console.log("error", err.message);
        console.log("error", err.response.data);
        Loading.remove();
        Report.failure("Error", err.response.data, "Ok");
        this.resetFields();
        this.loading = false;
      }
    },
    resetFields() {
      this.data.categoryName = "";
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