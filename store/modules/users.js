export const state = () => ({
  users: [],
  error: false,
  error_message: "",
});

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  UPDATE_USER(state, payload) {
    const index = state.users.findIndex((c) => c.id === payload.id);
    state.users.splice(index, 1, payload);
  },
  REMOVE_USER(state, payload) {
    state.users = state.users.filter((user) => user.id !== payload.id);
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false;
    state.error_message = payload ? payload.message : "";
  },
};

export const actions = {
  async getAllUsers(context) {
    try {
      this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));
      const users = await this.$axios.$get("/users");
      context.commit("SET_USERS", users);
    } catch ({ response }) {
      if (!response) {
        context.commit("SET_ERROR", {
          error: true,
          message: "Please check your internet connection and try again",
        });
      } else {
        context.commit("SET_ERROR", {
          error: true,
          message: response,
        });
      }
    }
  },
  async updateUser(context, payload) {
    try {
      context.commit("SET_ERROR");
      const user = await this.$axios.$patch(`/users/${payload.id}`, payload);
      context.commit("UPDATE_USER", user);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async deleteUser(context, payload) {
    try {
      context.commit("SET_ERROR");
      const user = await this.$axios.$delete(`/users/${payload.id}`);
      context.commit("REMOVE_USER", user);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
};

export const getters = {
  userCount: (state) => {
    return state.users.length.toString();
  },
};
