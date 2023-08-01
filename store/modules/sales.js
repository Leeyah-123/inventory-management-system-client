export const state = () => ({
  sales: [],
  error: false,
  error_message: "",
});

export const mutations = {
  SET_SALES(state, payload) {
    state.sales = payload;
  },
  ADD_SALE(state, payload) {
    state.sales = [...state.sales, payload];
  },
  UPDATE_SALE(state, payload) {
    const index = state.sales.findIndex((c) => c.id === payload.id);
    state.sales.splice(index, 1, payload);
  },
  REMOVE_SALE(state, payload) {
    state.sales = state.sales.filter((sale) => sale.id !== payload.id);
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false;
    state.error_message = payload ? payload.message : "";
  },
};

export const actions = {
  async getAllSales(context) {
    try {
      this.$axios.setHeader("Authorization", localStorage.getItem("token"));
      const sales = await this.$axios.$get("/sales");
      context.commit("SET_SALES", sales);
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
  async addSale(context, payload) {
    try {
      context.commit("SET_ERROR");
      const sale = await this.$axios.$post(`/sales`, payload);
      context.commit("ADD_SALE", sale);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async updateSale(context, payload) {
    try {
      context.commit("SET_ERROR");
      const sale = await this.$axios.$patch(`/sales/${payload.id}`, payload);
      context.commit("UPDATE_SALE", sale);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async deleteSales(context, payload) {
    try {
      context.commit("SET_ERROR");
      const sale = await this.$axios.$delete(`/sales/${payload.id}`);
      context.commit("REMOVE_SALE", sale);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
};

export const getters = {
  saleCount: (state) => {
    return state.sales.length.toString();
  },
};
