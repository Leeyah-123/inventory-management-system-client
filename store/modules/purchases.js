export const state = () => ({
  purchases: [],
  error: false,
  error_message: "",
});

export const mutations = {
  SET_PURCHASES(state, payload) {
    state.purchases = payload;
  },
  ADD_PURCHASE(state, payload) {
    state.purchases = [...state.purchases, payload];
  },
  UPDATE_PURCHASE(state, payload) {
    const index = state.purchases.findIndex((c) => c.id === payload.id);
    state.purchases.splice(index, 1, payload);
  },
  REMOVE_PURCHASE(state, payload) {
    state.purchases = state.purchases.filter(
      (purchase) => purchase.id !== payload.id
    );
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false;
    state.error_message = payload ? payload.message : "";
  },
};

export const actions = {
  async getAllPurchases(context) {
    try {
      this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));
      const purchases = await this.$axios.$get("/purchases");
      context.commit("SET_PURCHASES", purchases);
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
  async addPurchase(context, payload) {
    try {
      context.commit("SET_ERROR");
      const purchase = await this.$axios.$post(`/purchases`, payload);
      context.commit("ADD_PURCHASE", purchase);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async updatePurchase(context, payload) {
    try {
      context.commit("SET_ERROR");
      const purchase = await this.$axios.$patch(
        `/purchases/${payload.id}`,
        payload
      );
      context.commit("UPDATE_PURCHASE", purchase);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async deletePurchase(context, payload) {
    try {
      context.commit("SET_ERROR");
      const purchase = await this.$axios.$delete(`/purchases/${payload.id}`);
      context.commit("REMOVE_PURCHASE", purchase);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
};

export const getters = {
  purchaseCount: (state) => {
    return state.purchases.length.toString();
  },
};
