<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="300px">
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
              v-model.number="data.id"
              label="Category ID"
              type="number"
              disabled
              dense
              required
              outlined
            ></v-text-field>
            <v-text-field
              v-model="data.categoryName"
              :rules="nameRules"
              label="Category Name*"
              type="text"
              required
              dense
              outlined
            ></v-text-field>
          </v-form>
        </v-container>
        <small>*Indicates required field</small>
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
  name: "EditCategoryDialogue",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    error: false,
    error_message: "",
    dialog: false,
    valid: true,
    loading: false,
  }),
  mixins: [validationMixin],
  methods: {
    async submit() {
      await this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      try {
        Loading.dots("Updating category details...");
        await this.$store.dispatch(
          "modules/categories/updateCategory",
          this.data
        );

        Loading.remove();
        this.loading = false;
        this.dialog = false;
      } catch (err) {
        console.log("error", err.message);
        console.log("error", err.response.data);
        Loading.remove();
        Report.failure("Error", err.response.data, "Ok");
        this.loading = false;
      }
    },
  },
  computed: {
    data() {
      return {
        id: this.category.id,
        categoryName: this.category.categoryName,
      };
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