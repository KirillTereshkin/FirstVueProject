import firebase from 'firebase/app'

export default{
    state: {
        info: {},
    },
    mutations: {
        setUserInfo(state, info){
            state.info = info;
        },
        clearUserInfo(state){
            state.info = {};
        }
    },
    actions: {
        async fetchUerInfo({ dispatch, commit }){
            try{
                const userID = await dispatch('getUserId');
                const info =  ( await firebase.database().ref(`users/${userID}/info`).once('value') ).val();
                commit('setUserInfo', info);
            }
            catch(e){
                commit('setError', e);
            }
        }
    },
    getters: {
        getUserInfo: s => s.info,
    }
}