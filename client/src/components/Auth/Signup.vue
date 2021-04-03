<template>
  <div>
      
    <div class="signup">
        <router-link :to="{ name: 'App' }"  class="signup__link">
          Go to Home
        </router-link>
        <h1 class="signup__title">Sign up</h1>
        
        <form @submit.prevent="handleSubmit">

          <label for="name" class="signup__name">
          <span class="signup__name--title">Name: </span>
          <input type="text" class="input" v-model="name" :placeholder="'\uf007 Your name'">
          </label>

          <label for="email" class="signup__Email">
          <span class="signup__Email--title">Email: </span>
          <input type="email" class="input" v-model="email" :placeholder="'\uf0e0 Your Email'">
          </label>

          <label for="password" class="signup__Password">
          <span class="signup__Email--title">Password: </span>
          <input type="password" class="input" v-model="password" :placeholder="'\uf070 Your password'">
          </label>

          <label for="password" class="signup__Password">
          <span class="signup__Email--title">Password: </span>
          <input type="password" class="input" v-model="comfirmedPassword" :placeholder="'\uf058 Confirmed password'">
          </label>

          <button type="submit" class="signup__submit">Sign up</button>

          <router-link :to="{ name: 'Signin' }"  class="signup__link">
            <i class="fas fa-info"></i>
            Have account or social login?
          </router-link>

        </form>
    
    </div>

    <div class="background"></div>
    
  </div>
  
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      comfirmedPassword: ''
    }
  },
  methods: {
      handleSubmit () {
        const values = {
            name: this.name,
            email: this.email,
            password: this.password,
            comfirmedPassword: this.comfirmedPassword
        }
        console.log(values)
      }
  }
}
</script>