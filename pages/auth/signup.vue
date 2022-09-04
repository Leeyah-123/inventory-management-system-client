<template v-cloak>
  <div class="main">
    <div class="signup">
      <v-row>
        <v-col>
          <div class="form-container">
            <SignupForm />
          </div>
        </v-col>
        <v-col class="hidden-sm-and-down">
          <div class="illustration-container">
            <img src="../../static/signup.jpg" alt="signup" />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import SignupForm from "../../components/auth/SignupForm.vue";

export default {
  name: "SignupPage",
  data() {
    return {};
  },
  components: {
    SignupForm,
  },
};
</script>

<style scoped>
.form-container {
  max-width: 100vw;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.signup {
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto;
}
.row {
  padding: 0px;
  height: 100%;
  margin: 0px;
}
.col {
  padding: 0px;
  height: 100%;
}
div {
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}

@media (min-width: 280px) {
  .main {
    padding: 10px;
  }
  .signup {
    height: 100%;
    width: inherit;
    border: 1px solid rgb(218, 213, 213);
  }
}

@media (min-width: 300px) {
  .signup {
    padding: 10px;
    height: fit-content;
  }
}

@media (min-width: 460px) {
  .signup {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .main {
    padding: 13px;
  }
}

@media (min-width: 900px) {
  .main {
    padding: 30px;
  }
}

@media (min-width: 1000px) {
  .signup {
    width: 1003.19px;
  }
  .main {
    padding: 0px;
  }
}
</style>