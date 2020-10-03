import firebase from "firebase/app";

export default {
  state: {
    categories: {},
    isCategoriesLoaded: false
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

        commit("setCategory", {
          [response.key]: { ...categoryInfo }
        });
      } catch (e) {
        commit("setError", e);
      }
    },

    async getCategories({ commit, dispatch }) {
      try {
        const userId = await dispatch("getUserId");
        const categories = (
          await firebase
            .database()
            .ref(`/users/${userId}/categories`)
            .once("value")
        ).val();
        commit("setCategory", categories);
      } catch (e) {
        commit("setError", e);
      } finally {
        commit("setCategoriesLoadingStatus", true);
      }
    },

    async updateCategory({ commit, dispatch }, { id, name, limit }) {
      try {
        const userId = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${userId}/categories`)
          .child(id)
          .update({ name, limit });
        const updatedCategory = {
          [id]: { name, limit }
        };
        commit("setCategory", updatedCategory);
      } catch (e) {
        commit("setError", e);
      } finally {
        return;
      }
    }
  },

  mutations: {
    setCategory(state, newCategory) {
      state.categories = { ...state.categories, ...newCategory };
    },
    setCategoriesLoadingStatus(state, status) {
      state.isCategoriesLoaded = status;
    }
  },

  getters: {
    getCategories(state) {
      return state.categories;
    },

    getCategoriesLoadingStatus(state) {
      return state.isCategoriesLoaded;
    }
  }
};
