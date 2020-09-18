import firebase from 'firebase/app'

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async login({commit}, {email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password);
            }
            catch(e){
                commit('setError', e, {root: true});
                throw e;
            }
        },

        async register({dispatch, commit}, {email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const userId = await dispatch('getUserId');
                await firebase.database().ref(`/users/${userId}/info`).set({
                    bill: 10000,
                    name,
                })
            }
            catch(e) {
                commit('setError', e, {root: true});
                throw e
            };
        },

        getUserId(){
            const user = firebase.auth().currentUser;
            return user? user.uid: null;
        },

        async logout(){
            try{
                await firebase.auth().signOut();
            }
            catch(e)
            {
                throw e;
            }
        },
    },
    getters: {}
}