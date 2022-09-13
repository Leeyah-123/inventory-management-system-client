// import { useToast } from "vue-toastification/composition/nuxt";

// $axios.interceptors.request.use((req) => {
//   if (localStorage.getItem("token")) {
//     req.headers.AUTH_TOKEN = localStorage.getItem("token");
//   }
//   return req;
// });

this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));

// const toast = useToast();

export const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  try {
    const response = await this.$axios.$post(
      "http://localhost:5000/api/auth/login",
      data
    );
    console.log(response);
    // toast.error(err.response, { position: POSITION.TOP_CENTER });
    return response;
  } catch (err) {
    console.log(err.response);
    return {};
  }
};

export const signUp = async (user) => {
  const data = user;
  try {
    const response = await this.$axios.$post(
      "http://localhost:5000/api/auth/signup",
      data
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await this.$axios.$get(
      "http://localhost:5000/api/auth/profile"
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
