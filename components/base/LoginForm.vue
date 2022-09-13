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
          v-model.trim="data.email"
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
          v-model.trim="data.password"
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
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Notify from "../../utils/Notifilix";

export default {
  name: "LoginForm",
  data() {
    return {
      valid: true,
      showPassword: false,
      checkbox: false,
      data: {
        email: "",
        password: "",
      },
    };
  },
  mixins: ["validationMixin"],
  methods: {
    async login() {
      await this.$refs.form.validate();
      if (!this.valid) return;

      try {
        const response = await this.$axios.$post("/auth/login", this.data);

        const token = response.token;
        if (!this.checkbox) localStorage.setItem("token", token);
        this.$store.commit("SET_TOKEN", token);
        this.$axios.setHeader("AUTH_TOKEN", token);
        Notify.success("Login successful!!!");

        const user = await this.$axios.$get("/auth/profile");

        this.$store.commit("SET_USER", user);
        this.$router.replace("../");
      } catch (err) {
        console.log(err.response.data.message);
        Notify.failure(err.response.data.message);
      }
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