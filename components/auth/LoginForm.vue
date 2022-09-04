<template v-cloak>
  <div class="login-div">
    <v-container>
      <h1>Login</h1>
      <p>Welcome Back!</p>
    </v-container>

    <v-form
      ref="form"
      v-model="valid"
      @keypress.enter="login"
      light
      lazy-validation
    >
      <div class="form-div">
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
          v-model.trim="user.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          hint="Password must contain at least one uppercase character and one lowercase character, minimum of 5 characters"
          label="Password"
          color="primary"
          dense
          light
          outlined
          required
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </div>
      <div class="checkbox-div">
        <v-checkbox
          v-model="checkbox"
          label="Remember Me"
          color="primary"
          light
        ></v-checkbox>
      </div>
      <div class="btn-div">
        <v-btn
          :disabled="!valid"
          color="primary"
          class="login-btn"
          @click.prevent="login"
          light
        >
          Login
        </v-btn>
      </div>
    </v-form>
    <div>
      <p>Don't have an account? <a href="../auth/signup">Sign Up</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      valid: true,
      showPassword: false,
      checkbox: false,
      user: {
        email: "",
        password: "",
      },
      emailRules: [(v) => !!v || "E-mail is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    async login() {
      await this.$refs.form.validate();
      if (!this.valid) return;
      this.$router.replace("../");
    },
  },
};
</script>

<style scoped>
.login-div {
  padding: 5px;
  display: flex;
  text-align: center;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
}

.checkbox-div {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: fit-content;
  max-width: 300px;
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
  width: 300px;
}
</style>