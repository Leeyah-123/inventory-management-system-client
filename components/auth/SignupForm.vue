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
      <div class="form-div">
        <v-text-field
          v-model.trim="user.firstname"
          :rules="firstnameRules"
          label="First Name"
          light
          dense
          outlined
          required
        ></v-text-field>
        <v-text-field
          v-model.trim="user.lastname"
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
          v-model.trim="confirmPassword"
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
          color="primary"
          class="signup-btn"
          @click.prevent="register"
          light
        >
          Sign Up
        </v-btn>
      </div>
    </v-form>
    <div>
      <p>Already have an account? <a href="../auth/login">Login</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      valid: true,
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      checkbox: false,
      user: {
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
      },
      firstnameRules: [
        (v) => !!v || "First Name is required",
        (v) =>
          (v && v.length >= 3) || "First Name must be more than 3 characters",
        (v) => /^[a-zA-Z ]+$/.test(v) || "Invalid First Name",
      ],
      lastnameRules: [
        (v) => !!v || "Last Name is required",
        (v) =>
          (v && v.length >= 3) || "Last Name must be more than 3 characters",
        (v) => /^[a-zA-Z ]+$/.test(v) || "Invalid Last Name",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(v) || "Invalid E-mail",
      ],
      phoneNumRules: [
        (v) => !!v || "Phone Number is required",
        (v) =>
          /[0-1]{1}[7-9]{1}[0-1]{1}[0-9]{8}/.test(v) || "Invalid Phone Number",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})/.test(
            v
          ) || "Invalid Password format",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm password is required",
        (v) => v === this.user.password || "Passwords do not match",
      ],
    };
  },
  methods: {
    async register() {
      await this.$refs.form.validate();
      if (!this.valid) return;
      this.$router.replace("../");
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