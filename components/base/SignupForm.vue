<template v-cloak>
  <div class="signup-div">
    <v-container>
      <h1>Sign Up</h1>
      <p>Create your IMS account</p>
    </v-container>

    <v-form
      ref="form"
      v-model="valid"
      @keypress.enter="register"
      light
      lazy-validation
    >
      <v-alert
        shaped
        colored-border
        color="blue"
        transition="scale-transition"
        v-if="error"
      >
        {{ error }}
      </v-alert>
      <div class="form-div">
        <v-text-field
          v-model.trim="user.firstName"
          :rules="firstnameRules"
          label="First Name"
          light
          dense
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model.trim="user.lastName"
          :rules="lastnameRules"
          label="Last Name"
          color="primary"
          dense
          light
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model.trim="user.email"
          :rules="emailRules"
          label="Email"
          color="primary"
          hint="eg. example@example.com"
          dense
          light
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model.trim="user.phoneNumber"
          :rules="phoneNumRules"
          label="Phone Number"
          color="primary"
          hint="eg. 09056595890"
          dense
          light
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model.trim="user.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          hint="Password must contain at least one uppercase character and one lowercase character, minimum of 5 characters"
          label="Password"
          color="primary"
          persistent-hint
          dense
          light
          outlined
          required
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model.trim="user.confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="confirmPasswordRules"
          :type="showConfirmPassword ? 'text' : 'password'"
          color="primary"
          label="Confirm Password"
          dense
          light
          outlined
          required
          @click:append="showConfirmPassword = !showConfirmPassword"
        ></v-text-field>
      </div>
      <div class="checkbox-div">
        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="I agree to the terms of use"
          color="primary"
          light
          required
        ></v-checkbox>
      </div>
      <div class="btn-div">
        <v-btn
          :disabled="!valid"
          :loading="loading"
          color="primary"
          class="signup-btn"
          @click.prevent="register"
          @click="loader = 'loading'"
          light
        >
          Sign Up
        </v-btn>
      </div>
    </v-form>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Notify from "../../utils/Notifilix";
import validationMixin from "../../mixins/validationMixin";

export default {
  name: "SignupForm",
  data() {
    return {
      valid: true,
      showPassword: false,
      showConfirmPassword: false,
      checkbox: false,
      loader: null,
      loading: false,
      error: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  mixins: [validationMixin],
  methods: {
    async register() {
      await this.$refs.form.validate();
      if (!this.valid) return;

      try {
        this.loader = true;
        const response = await this.$axios.$post("/auth/signup", this.user);

        const token = response.token;
        localStorage.setItem("token", token);
        this.loader = null;
        Notify.success("Login successful!!!");

        this.$router.replace("/");
      } catch (err) {
        console.log(err.response.data);
        if (err.response.status !== 422) {
          Notify.failure(err.response.data.message);
        } else Notify.failure(err.response.data.error);
        this.loader = null;
      }
    },
  },
};
</script>

<style scoped>
.signup-div {
  text-align: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  height: 100%;
}

fieldset {
  border-color: rgb(192, 192, 192);
}

.form-div {
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.checkbox-div {
  max-height: fit-content;
  max-width: fit-content;
}

.checkbox-div div {
  padding: 0px;
  margin: 0px;
}

.btn-div {
  margin-left: 5px;
  padding: 5px;
}

.v-text-field {
  margin: 5px;
  max-width: 220px;
  width: 200px;
}

@media (min-width: 453px) {
  .form-div {
    display: flex;
  }
}
</style>