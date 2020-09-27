import firebase from "firebase/app";

export default {
  state: {},
  mutations: {},
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${userId}/info`)
          .set({
            bill: 10000,
            name
          });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("clearUserInfo");
      } catch (e) {
        throw e;
      }
    }
  },
  getters: {}
};
