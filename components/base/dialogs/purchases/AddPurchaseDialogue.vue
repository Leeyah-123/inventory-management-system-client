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
                <v-text-field v-model="data.refNo" :rules="productCodeRules" label="Purchase Reference Code*" type="text"
                  dense required outlined></v-text-field>
                <v-select v-model.number="data.supplierId" :rules="numberRules" :items="suppliers" label="Supplier ID*"
                  type="number" required dense outlined></v-select>
                <v-textarea v-model="data.description" :rules="nameRules" label="Purchase Description*" type="text"
                  required dense outlined></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model.number="data.total" :rules="numberRules" label="Product Price(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-text-field v-model.number="data.paid" :rules="numberRules" label="Amount Paid(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-select v-model="data.purchaseStatus" :items="purchaseStatus"
                  :rules="[(v) => !!v || 'Field is required']" label="Purchase Status" required dense outlined></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*Indicates required fields</small>
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
  name: "AddPurchaseDialogue",
  data: () => ({
    error: false,
    error_message: "",
    dialog: false,
    valid: true,
    loading: false,
    data: {
      refNo: "",
      purchaseStatus: "",
      supplierId: 0,
      description: "",
      total: 0,
      paid: 0,
    },
    purchaseStatus: ["pending", "received"],
  }),
  mixins: [validationMixin],
  async fetch() {
    await this.$store.dispatch("modules/suppliers/getAllSuppliers");
    if (this.suppliers === []) {
      this.error = true;
      this.error_message = "No saved supplier!";
    }
  },
  methods: {
    async submit() {
      await this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      try {
        Loading.dots("Saving purchase details...");
        await this.$store.dispatch("modules/purchases/addPurchase", this.data);

        Loading.remove();
        this.loading = false;
        this.dialog = false;
        this.$refs.form.reset();
      } catch (err) {
        console.log("error", err.message);
        console.log("error", err.response.data);
        Loading.remove();
        Report.failure("Error", err.response.data.message || "An error occurred", "Ok");
        this.loading = false;
      }
    },
  },
  computed: {
    suppliers() {
      let filteredSuppliers = [];
      let suppliers = this.$store.state.modules.suppliers.suppliers;

      suppliers.forEach((supplier) => {
        filteredSuppliers.push(supplier.id);
      });

      return filteredSuppliers;
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