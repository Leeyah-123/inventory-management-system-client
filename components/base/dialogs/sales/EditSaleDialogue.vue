<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="800px">
    <template #activator="{ on: card, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...card }" icon>
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span class="poppins">Edit Sale</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Edit Sale</v-toolbar-title>
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
                <v-text-field v-model.number="data.id" label="Sale Id*" disabled type="text" dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.customerName" :rules="nameRules" label="Customer Name*" type="text" dense
                  required outlined></v-text-field>
                <v-select v-model="data.productCode" :rules="[(v) => !!v || 'Field is required']" :items="products"
                  label="Product Code*" type="number" required dense outlined></v-select>
                <v-select v-model="data.billerId" :rules="[(v) => !!v || 'Field is required']" :items="employees"
                  label="Biller ID*" type="number" required dense outlined></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model.number="data.paid" :rules="numberRules" label="Amount Paid(#)*" type="number"
                  required outlined dense></v-text-field>
                <v-text-field v-model.number="data.quantity" :rules="numberRules" label="Quantity*" type="number" required
                  outlined dense></v-text-field>
                <v-text-field v-model.number="data.tax" :rules="numberRules" label="Tax*" type="number" required outlined
                  dense></v-text-field>
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
  name: "EditSaleDialogue",
  props: {
    sale: {
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
    purchaseStatus: ["pending", "paid"],
  }),
  mixins: [validationMixin],
  async fetch() {
    await this.$store.dispatch("modules/products/getAllProducts");
    if (this.products === []) {
      this.error = true;
      this.error_message = "No saved product!";
    }
    await this.$store.dispatch("modules/users/getAllUsers");
  },
  methods: {
    async submit() {
      await this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      try {
        Loading.dots("Updating sale details...");
        await this.$store.dispatch("modules/sales/updateSale", this.data);

        Loading.remove();
        this.loading = false;
        this.dialog = false;
      } catch (err) {
        // console.log("error", err.message);
        // console.log("error", err.response.data);
        Loading.remove();
        Report.failure("Error", err.response.data.message || "An error occurred", "Ok");
        this.loading = false;
      }
    },
  },
  computed: {
    employees() {
      let filteredEmployees = [];
      let employees = this.$store.state.modules.users.users;

      employees.forEach((employee) => {
        filteredEmployees.push(employee.id);
      });

      return filteredEmployees;
    },
    products() {
      let filteredProducts = [];
      let products = this.$store.state.modules.products.products;

      products.forEach((product) => {
        filteredProducts.push(product.code);
      });

      return filteredProducts;
    },
    data() {
      return {
        id: this.sale.id,
        customerName: this.sale.customerName,
        productCode: this.sale.productCode,
        quantity: this.sale.quantity,
        paid: this.sale.paid,
        billerId: this.sale.billerId,
        tax: this.sale.tax,
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