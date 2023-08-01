<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="800px">
    <template #activator="{ on: card, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...card }" icon>
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span class="poppins">Edit Supplier</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Edit Supplier</v-toolbar-title>
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
                <v-text-field v-model="data.id" label="Supplier Id*" type="text" disabled dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.name" :rules="nameRules" label="Supplier Name*" type="text" dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.phoneNumber" :rules="phoneNumRules" label="Phone Number*" type="text" required
                  dense outlined></v-text-field>
                <v-text-field v-model="data.email" :rules="emailRules" label="Email*" type="text" required dense
                  outlined></v-text-field>
                <v-text-field v-model="data.country" :rules="nameRules" label="Country*" type="text" required outlined
                  dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-textarea v-model="data.address" :rules="addressRules" label="Address*" type="text" required outlined
                  dense></v-textarea>
                <v-text-field v-model="data.city" :rules="nameRules" label="City*" type="text" required outlined
                  dense></v-text-field>
                <v-text-field v-model="data.state" :rules="nameRules" label="State*" type="text" required outlined
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
  name: "EditSupplierDialogue",
  props: {
    supplier: {
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
        Loading.dots("Updating supplier details...");
        await this.$store.dispatch(
          "modules/suppliers/updateSupplier",
          this.data
        );

        Loading.remove();
        this.loading = false;
        this.dialog = false;
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
    data() {
      return {
        id: this.supplier.id,
        name: this.supplier.name,
        phoneNumber: this.supplier.phoneNumber,
        email: this.supplier.email,
        address: this.supplier.address,
        city: this.supplier.city,
        state: this.supplier.state,
        country: this.supplier.country,
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