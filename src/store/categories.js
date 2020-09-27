import firebase from "firebase/app";

export default {
  state: {
    categories: {}
  },
  actions: {
    async createCategory({ dispatch, commit }, categoryInfo) {
      try {
        const userId = await dispatch("getUserId");
        const response = await firebase
          .database()
          .ref(`/users/${userId}/categories`)
          .push({
            ...categoryInfo
          });
        return {
            ...categoryInfo,
            id: response.key
        }
      } catch (e) {
        commit("setError", e);
      }
    }
  }
};
