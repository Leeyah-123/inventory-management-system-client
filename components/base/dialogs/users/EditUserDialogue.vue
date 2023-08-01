<template>
  <v-dialog v-model="dialog" transition="scroll-y-transition" width="800px">
    <template #activator="{ on: card, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...card }" icon>
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span class="poppins">Edit User</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Edit User Role</v-toolbar-title>
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
                <v-text-field v-model="data.id" label="User Id" type="text" disabled dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.firstName" label="First name" type="text" disabled dense required
                  outlined></v-text-field>
                <v-text-field v-model="data.lastName" label="User Id" type="text" disabled dense required
                  outlined></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="data.email" label="Email" type="text" disabled dense required
                  outlined></v-text-field>
                <v-text-field v-model.number="data.phoneNumber" label="Phone Number" type="text" disabled dense required
                  outlined></v-text-field>
                <v-select v-model="data.role" :items="['employee', 'admin']" label="User Role" type="text" dense required
                  outlined></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
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
    user: {
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
        Loading.dots("Updating user role...");
        await this.$store.dispatch("modules/users/updateUser", this.data);

        Loading.remove();
        this.loading = false;
        this.dialog = false;
      } catch (err) {
        // console.log("error", err.message);
        < !--console.log("error", err.response.data); -->
          Loading.remove();
        Report.failure("Error", err.response.data.message || "An error occurred", "Ok");
        this.loading = false;
      }
    },
  },
  computed: {
    data() {
      return {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        role: this.user.role,
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