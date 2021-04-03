
export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload
        }
    },
    actions: {
        //
    },
    getters: {
        user: state => state.user
    }
}