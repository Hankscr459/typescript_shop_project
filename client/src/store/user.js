import axios from 'axios'
import router from '../router/index'

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
        register(context, { name, email, password }) {

            const data = {
                name,
                email,
                password
            }
            const config = {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }
            }
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/signup`,
                data,
                config
            )
                .then((res => {
                    context.commit('setUser', res.data)
                    console.log('Register success: ', res.data)
                    router.push('/signin')
                }))
                .catch(err => {
                    console.log('Register err: ',err)
                })
        }
    },
    getters: {
        user: state => state.user
    }
}