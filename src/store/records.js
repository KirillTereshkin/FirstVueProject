import firebase from "firebase/app";

export default {
  state: {
    records: {},
    isRecordsLoaded: false
  },
  actions: {
    async uploadRecord({ dispatch, commit }, record) {
      try {
        const userId = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${userId}/records`)
          .push({ ...record });
      } catch (e) {
        commit("setError", e);
      }
    },

    async fetchRecords({ dispatch, commit }) {
      try {
        commit("setRecordsLoadingStatus", false);
        const userId = await dispatch("getUserId");
        const records = (
          await firebase
            .database()
            .ref(`/users/${userId}/records`)
            .once("value")
        ).val();

        commit("setRecords", records);
      } catch (e) {
        commit("setError", e);
      }
    }
  },
  mutations: {
    setRecords(state, records) {
      if (records) {
        state.records = { ...state.records, ...records };
        state.isRecordsLoaded = true;
      }
    },
    setRecordsLoadingStatus(state, status) {
      state.isRecordsLoaded = status;
    }
  },
  getters: {
    getRecords(state) {
      return state.records;
    },
    getRecordsLoadingStatus(state) {
      return state.isRecordsLoaded;
    }
  }
};
