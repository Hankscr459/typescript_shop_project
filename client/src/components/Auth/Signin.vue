<template>
  <div class="container Signin">
    <h1 class="Signin__title">Sign in</h1>
    <button id="facebookLogin">Facebook Login</button>
    <p id="facebookError"></p>
    <a 
      id="lineLogin" 
      :href="lineUrl + '/dialog/oauth/weblogin?response_type=code&client_id=' + line_client_id + '&redirect_uri=' + line_redirect + '&state=123abc'"
      @click="lineLogin()"
    >
    Line Login
    </a>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signin',
  data () {
    return {
      lineUrl: process.env.VUE_APP_LINE,
      line_client_id: process.env.VUE_APP_LINE_CLIENT_ID,
      line_redirect: process.env.VUE_APP_LINE_REDIRECT,
      auth_code: this.$route.query.code || null
    }
  },
  methods: {
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
      axios.post('https://api.line.me/v2/oauth/accessToken',
        params,
        config
      )
        .then(res => {
          console.log(res.data.access_token)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  created() {
    this.lineLogin()
  }
}
</script>