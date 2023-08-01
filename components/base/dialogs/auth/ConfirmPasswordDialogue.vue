<template>
  <v-container fluid>
    <!-- confirm password dialogue -->
    <v-dialog v-model="dialog" width="300px">
      <template v-if="target === 'email'" v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" color="primary" elevation="0" dark>
          Change Email
        </v-btn>
      </template>

      <template v-else v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" color="primary" elevation="0" dark>
          Change Password
        </v-btn>
      </template>

      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Confirm Password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit(target)" :loading="loading">
              <small>Confirm</small>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form" v-model="valid" @submit.prevent="submit(target)" lazy-validation>
              <v-alert v-if="error" dense type="error">
                {{ error_message }}
              </v-alert>
              <v-text-field v-model.trim="data.password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules" :type="showPassword ? 'text' : 'password'"
                hint="Password must contain at least one uppercase character and one lowercase character, minimum of 5 characters"
                label="Password" color="primary" persistent-hint dense light outlined required
                @click:append="showPassword = !showPassword"></v-text-field>
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

    <!-- edit email dialogue -->
    <v-dialog v-model="emailDialog" width="300px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Edit Email</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="changeEmail" :loading="loading">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form" v-model="emailValid" @submit.prevent="changeEmail" lazy-validation>
              <v-alert v-if="email_error" dense type="error">
                {{ email_error_message }}
              </v-alert>
              <v-text-field v-model="email" :rules="emailRules" label="New Email" type="text" required dense
                outlined></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="loading" color="blue darken-1" text @click="emailDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- edit password dialog -->
    <v-dialog v-model="passwordDialog" width="300px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Change Password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="changePassword" :loading="passwordLoading">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form" v-model="passwordValid" @submit.prevent="changePassword" lazy-validation>
              <v-alert v-if="password_error" dense type="error">
                {{ password_error_message }}
              </v-alert>
              <v-text-field v-model.trim="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules" :type="showPassword ? 'text' : 'password'"
                hint="Password must contain at least one uppercase character and one lowercase character, minimum of 5 characters"
                persistent-hint label="New Password" color="primary" dense outlined required
                @click:append="showPassword = !showPassword"></v-text-field>
              <v-text-field v-model.trim="confirmPassword" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  (v) => !!v || 'Confirm password is required',
                  (v) => v === this.password || 'Passwords do not match',
                ]" :type="showConfirmPassword ? 'text' : 'password'" label="Confirm Password" color="primary" dense
                outlined required @click:append="showConfirmPassword = !showConfirmPassword"></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="passwordLoading" color="blue darken-1" text @click="passwordDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import validationMixin from "../../../../mixins/validationMixin";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import Notify from "~/utils/Notifilix";

export default {
  name: "ConfirmPasswordDialogue",
  props: {
    target: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    error: false,
    error_message: "",
    showPassword: false,
    dialog: false,
    valid: true,
    loading: false,
    email: "",
    password: "",
    confirmPassword: "",
    emailDialog: false,
    emailValid: true,
    email_error: false,
    email_error_message: "",
    emailLoading: false,
    passwordValid: true,
    password_error: false,
    password_error_message: "",
    passwordLoading: false,
    passwordDialog: false,
    showPassword: false,
    showConfirmPassword: false,
    data: {
      password: "",
    },
  }),
  mixins: [validationMixin],
  methods: {
    async submit(target) {
      await this.$refs.form.validate();
      if (!this.valid) return;

      this.loading = true;
      try {
        Loading.dots("Confirming password...");
        this.$axios.setHeader("Authorization", localStorage.getItem("token"));
        const response = await this.$axios.$post(
          "/user/confirmPassword",
          this.data
        );

        if (response.message === "ok") {
          if (target === "email") this.emailDialog = true;
          else this.passwordDialog = true;
        } else {
          Loading.remove();
          // console.log(response);
          this.loading = false;
          return;
        }

        Loading.remove();
        this.loading = false;
        this.$refs.form.reset();
        this.dialog = false;
      } catch (err) {
        // console.log("error", err.message);
        // console.log("error", err.response.data);
        Loading.remove();
        if (err.response.data.message)
          Notify.failure(err.response.data.message);
        else if (err.response.data.err) Notify.failure(err.response.data.err);
        else Notify.failure("An error occurred");
        this.$refs.form.reset();
        this.loading = false;
      }
    },
    async changeEmail() {
      try {
        this.emailLoading = true;
        if (this.email !== this.$store.state.modules.auth.user.email) {
          this.$axios.setHeader("Authorization", localStorage.getItem("token"));
          Loading.dots("Updating email...");
          await this.$axios.$patch("/user/profile", { email: this.email });
          Loading.remove();
          this.emailDialog = false;
          localStorage.removeItem("token");
          this.$router.replace("../auth");
        }
      } catch (err) {
        this.email_error = true;
        if (err.response.data.message)
          this.email_error_message = err.response.data.message;
        else if (err.response.data.error)
          this.email_error_message = err.response.data.error;
        else this.email_error_message = "Something went wrong";
      }
      this.emailLoading = false;
      Loading.remove();
    },
    async changePassword() {
      try {
        this.passwordLoading = true;

        this.$axios.setHeader("Authorization", localStorage.getItem("token"));
        Loading.dots("Updating password...");
        await this.$axios.$patch("/user/profile", { password: this.password });
        Loading.remove();
        this.dialog = false;
        localStorage.removeItem("token");
        this.$router.replace("../auth");
      } catch (err) {
        this.error = true;
        if (err.response.data.message)
          this.error_message = err.response.data.message;
        else if (err.response.data.error)
          this.error_message = err.response.data.error;
        else this.error_message = "Something went wrong";
        // console.log(err);
      }
      Loading.remove();
      this.passwordLoading = false;
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