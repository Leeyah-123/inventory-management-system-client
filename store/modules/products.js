export const state = () => ({
  products: [],
  error: false,
  error_message: "",
});

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  ADD_PRODUCT(state, payload) {
    state.products = [...state.products, payload];
  },
  UPDATE_PRODUCT(state, payload) {
    const index = state.products.findIndex((c) => c.code === payload.code);
    state.products.splice(index, 1, payload);
  },
  REMOVE_PRODUCT(state, payload) {
    state.products = state.products.filter(
      (product) => product.code !== payload.code
    );
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false;
    state.error_message = payload ? payload.message : "";
  },
};

export const actions = {
  async getAllProducts(context) {
    try {
      this.$axios.setHeader("Authorization", localStorage.getItem("token"));
      const products = await this.$axios.$get("/products");
      context.commit("SET_PRODUCTS", products);
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
  async addProduct(context, payload) {
    try {
      context.commit("SET_ERROR");
      const product = await this.$axios.$post(`/products`, payload);
      context.commit("ADD_PRODUCT", product);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async updateProduct(context, payload) {
    try {
      context.commit("SET_ERROR");
      const product = await this.$axios.$patch(
        `/products/${payload.code}`,
        payload
      );
      context.commit("UPDATE_PRODUCT", product);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async deleteProduct(context, payload) {
    try {
      context.commit("SET_ERROR");
      const product = await this.$axios.$delete(`/products/${payload.code}`);
      context.commit("REMOVE_PRODUCT", product);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
};

export const getters = {
  productCount: (state) => {
    return state.products.length.toString();
  },
};
