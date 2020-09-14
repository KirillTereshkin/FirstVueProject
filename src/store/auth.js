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
                throw e;
            }
        }
    },
    getters: {}
}