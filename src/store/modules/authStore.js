import { ref, computed } from "vue";
const state = {
  isAuthenticated: false,
  currentUser: {
    userId: "",
    email: "",
    role: "",
    companyName: ""
  },
};

const getters = {
  getIsAuthenticated(state) {
    if (localStorage.getItem("store")) {
      state = JSON.parse(localStorage.getItem("store")).authStore;
      console.log(state.currentUser);
    }
    return state.isAuthenticated;
  },
  getCurrentUser(state) {
    if (localStorage.getItem("store")) {
      state = JSON.parse(localStorage.getItem("store")).authStore;
    }
    return state.currentUser;
  },
};

// trebuie sa fie sincrone comparate cu actiunile
const mutations = {
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setCurrentUser(state, currentUser) {
    console.log("user?", currentUser);
    state.currentUser.userId = currentUser.id;
    state.currentUser.email = currentUser.email;
    state.currentUser.role = currentUser.role;
   state.currentUser.companyName = currentUser.companyName;
  },
  setIntervalName(state, intervalName) {
    state.intervalName = intervalName;
  },
  clearCurrentUser(state) {
    state.currentUser.userId = "";
    state.currentUser.companyName = "";
    state.currentUser.email = "";
    state.currentUser.role = "";
  },
  initialiseStore(state) {
    if (localStorage.getItem("store")) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    }
  },
};

const actions = {
  async login({ commit, dispatch }, loginData) {},
  async getCurrentUser({ commit, dispatch }) {},
  async refresh({ commit, dispatch, getters }) {},
  async logout({ commit, dispatch, getters }) {},
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};