export const state = () => ({
  user: {},
  token: "",
  authenticated: false,
});

export const mutations = {
  SET_AUTHENTICATED(state, value) {
    state.authenticated = value;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

export const actions = {
  setAuthenticated(context, payload) {
    context.commit("SET_AUTHENTICATED", payload);
  },
  setToken(context, payload) {
    context.commit("SET_TOKEN", payload);
  },
  setUser(context, payload) {
    context.commit("SET_USER", payload);
  },
};
