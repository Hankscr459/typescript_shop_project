<template>
  <div>
      
      <div class="Signin">
        <span>
          <router-link :to="{ name: 'App' }"  class="Signin__link">
            Go to Home
          </router-link>
        </span>
        <h1 class="Signin__title">Sign in</h1>

        <form @submit.prevent="handleSubmit">

          <label for="email" class="Signin__Email">
            <span class="Signin__Email--title">Email: </span>
            <input type="email" class="input" v-model="email" :placeholder="'\uf0e0 Your Email'">
          </label>

          <label for="password" class="Signin__Password">
            <span class="Signin__Email--title">Password: </span>
            <input type="password" class="input" v-model="password" :placeholder="'\uf070 Your password'">
          </label>

          <button type="submit" class="Signin__submit">Login</button>

        </form>

        <span>
          <router-link :to="{ name: 'Signup' }"  class="Signin__link">
            <i class="fas fa-info"></i>
            No account? Signup
          </router-link>
        </span>

        <h2 class="Signin__subTitle">Social Login</h2>
        <button id="facebookLogin" @click="facebookLogin">
          <i class="fab fa-facebook-square"></i>
          Facebook Login
        </button>
        <p id="facebookError"></p>
        <a 
          id="lineLogin" 
          :href="lineUrl + '?response_type=code&client_id=' + line_client_id + '&redirect_uri=' + line_redirect + '&state=123abc&scope=openid%20profile%20email&nonce=09876xyz'"
          @click="lineLogin()"
        >
        <i class="fab fa-line"></i>
        Line Login
        </a>
      
      </div>
      <div class="background"></div>
    
  </div>
  
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      lineUrl: process.env.VUE_APP_LINE,
      line_client_id: process.env.VUE_APP_LINE_CLIENT_ID,
      line_redirect: process.env.VUE_APP_LINE_REDIRECT,
      auth_code: this.$route.query.code || null
    }
  },
  methods: {
    handleSubmit () {
      const values = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('userModules/signin', values)
    },
    facebookLogin () {
      if (localStorage.getItem('jwt') !== undefined) {
        this.$router.push('/')
      }
    },
    lineLogin() {
      if(this.auth_code != null) {
      // console.log(this.$route.query.code)
      const params = new URLSearchParams()

      params.append('grant_type', 'authorization_code')
      params.append('code', `${this.$route.query.code}`)
      params.append('redirect_uri', `${process.env.VUE_APP_LINE_REDIRECT}`)
      params.append('client_id', `${process.env.VUE_APP_LINE_CLIENT_ID}`)
      params.append('client_secret', `${process.env.VUE_APP_LINE_CLIENT_SECRET}`)

      const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
      }
      axios.post('https://api.line.me/oauth2/v2.1/token',
        params,
        config
      )
        .then(res => {
          const param = new URLSearchParams()

          param.append('id_token', res.data.id_token)
          param.append('client_id', `${process.env.VUE_APP_LINE_CLIENT_ID}`)

          // console.log(res.data.id_token)
          axios.post('https://api.line.me/oauth2/v2.1/verify', 
            param,
            config
          )
            .then(response => {
              console.log(response.data)
              const data = { 
                name: response.data.name, 
                email: response.data.email
              }
              const config = {
                headers: {
                  Accept: 'application/json',
                  "Content-Type": "application/json"
                }
              }
              axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/lineLogin`,
                data,
                config
              )
                .then(res => {
                  console.log(res)
                    const jwt = {
                      token: res.data.token
                    }

                    localStorage.setItem('jwt', JSON.stringify(jwt))
                    this.$router.push('/')
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  computed: {
    ...mapGetters('userModules', ['user'])
  },
  created() {
    this.lineLogin()
  }
}
</script>