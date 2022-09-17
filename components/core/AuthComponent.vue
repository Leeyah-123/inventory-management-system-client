<template v-cloak>
  <div class="main">
    <div class="auth">
      <v-row>
        <v-col>
          <v-window v-model="step">
            <v-window-item :value="1" id="login"
              ><div class="login-form-container">
                <LoginForm>
                  <p>
                    Don't have an account?
                    <span class="link" @click="step++">Sign Up</span>
                  </p>
                </LoginForm>
              </div>
            </v-window-item>
            <v-window-item :value="2" id="signup">
              <div class="signup-form-container">
                <SignupForm>
                  <p>
                    Already have an account?
                    <span class="link" @click="step--">Login</span>
                  </p>
                </SignupForm>
              </div>
            </v-window-item>
          </v-window>
        </v-col>
        <v-col class="hidden-sm-and-down">
          <div class="illustration-container">
            <img src="../../static/signup.jpg" alt="Auth" />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import LoginForm from "../base/LoginForm.vue";
import SignupForm from "../base/SignupForm.vue";

export default {
  name: "AuthComponent",
  components: { LoginForm, SignupForm },
  data: () => ({
    step: 1,
  }),
};
</script>

<style scoped>
.signup-form-container,
.login-form-container {
  max-width: 100vw;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.auth {
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
.link {
  color: rgb(8, 135, 177);
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
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
  .auth {
    height: 100%;
    width: inherit;
    border: 1px solid rgb(218, 213, 213);
  }
}

@media (min-width: 300px) {
  .auth {
    padding: 10px;
    height: fit-content;
  }
}

@media (min-width: 460px) {
  .auth {
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .main {
    padding: 13px;
  }
}

@media (min-width: 900px) {
  .auth {
    padding: 30px;
  }
}

@media (min-width: 1000px) {
  .auth {
    width: 1003.19px;
  }
  .main {
    padding: 0px;
  }
}
</style>