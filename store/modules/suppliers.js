export const state = () => ({
  suppliers: [],
  error: false,
  error_message: "",
});

export const mutations = {
  SET_SUPPLIERS(state, payload) {
    state.suppliers = payload;
  },
  ADD_SUPPLIER(state, payload) {
    state.suppliers = [...state.suppliers, payload];
  },
  UPDATE_SUPPLIER(state, payload) {
    const index = state.suppliers.findIndex((c) => c.id === payload.id);
    state.suppliers.splice(index, 1, payload);
  },
  REMOVE_SUPPLIER(state, payload) {
    state.suppliers = state.suppliers.filter(
      (supplier) => supplier.id !== payload.id
    );
  },
  SET_ERROR(state, payload) {
    state.error = payload ? payload.error : false;
    state.error_message = payload ? payload.message : "";
  },
};

export const actions = {
  async getAllSuppliers(context) {
    try {
      this.$axios.setHeader("AUTH_TOKEN", localStorage.getItem("token"));
      const suppliers = await this.$axios.$get("/suppliers");
      context.commit("SET_SUPPLIERS", suppliers);
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
  async addSupplier(context, payload) {
    try {
      context.commit("SET_ERROR");
      const supplier = await this.$axios.$post(`/suppliers`, payload);
      context.commit("ADD_SUPPLIER", supplier);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async updateSupplier(context, payload) {
    try {
      context.commit("SET_ERROR");
      const supplier = await this.$axios.$patch(
        `/suppliers/${payload.id}`,
        payload
      );
      context.commit("UPDATE_SUPPLIER", supplier);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
  async deleteSupplier(context, payload) {
    try {
      context.commit("SET_ERROR");
      const supplier = await this.$axios.$delete(`/suppliers/${payload.id}`);
      context.commit("REMOVE_SUPPLIER", supplier);
    } catch ({ response }) {
      context.commit("SET_ERROR", {
        error: true,
        message: response.data.message,
      });
    }
  },
};

export const getters = {
  supplierCount: (state) => {
    return state.suppliers.length.toString();
  },
};
