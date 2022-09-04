// export const state = {
//   user: {
//     // firstname: "",
//     // lastname: "",
//     // email: "",
//     // password: "",
//     // role: "",
//   },
// };

export const state = () => ({
  user: {},
  validated: false,
});

export const mutations = {
  SET_VALIDATED(state, value) {
    state.validated = value;
  },
};
