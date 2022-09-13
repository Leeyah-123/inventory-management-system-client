export const state = () => ({
  categories: [],
  error: false,
  error_message: "",
});

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  ADD_CATEGORY(state, payload) {
    state.categories = [...state.categories, payload];
  },
  UPDATE_CATEGORY(state, payload) {
    const index = state.categories.findIndex((c) => c.id === payload.id);
    state.categories.splice(index, 1, payload);
  },
  REMOVE_CATEGORY(state, payload) {
    state.categories = state.categories.filter(
      (category) => category.id !== payload.id
    );
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false;
    state.error_message = payload ? payload.message : "";
  },
};

export const actions = {
  async getAllCategories(context) {
    try {
      this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));
      const categories = await this.$axios.$get("/categories");
      context.commit("SET_CATEGORIES", categories);
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
  async addCategory(context, payload) {
    try {
      context.commit("SET_ERROR");
      const category = await this.$axios.$post(`/categories`, payload);
      context.commit("ADD_CATEGORY", category);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async updateCategory(context, payload) {
    try {
      context.commit("SET_ERROR");
      const category = await this.$axios.$patch(
        `/categories/${payload.id}`,
        payload
      );
      context.commit("UPDATE_CATEGORY", category);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async deleteCategory(context, payload) {
    try {
      context.commit("SET_ERROR");
      const category = await this.$axios.$delete(`/categories/${payload.id}`);
      context.commit("REMOVE_CATEGORY", category);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
};

export const getters = {
  categoryCount: (state) => {
    return state.categories.length.toString();
  },
};
