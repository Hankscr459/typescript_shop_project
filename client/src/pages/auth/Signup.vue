<template>
  <div>
      
    <div class="signup">
        <router-link :to="{ name: 'Home' }"  class="signup__link">
          Go to Home
        </router-link>
        <h1 class="signup__title">Sign up</h1>
        
        <form @submit.prevent="handleSubmit">

          <label for="name" class="signup__name">
          <span class="signup__name--title">Name: </span>
          <input 
            type="text" 
            class="input" 
            v-model="name" 
            :placeholder="'\uf007 Your name'" 
            required
            @focus="clearError"
          >
          </label>

          <p 
            v-if="this.name_error !== null"
            class="errorInfo"
          >
            {{name_error}}
          </p>

          <label for="email" class="signup__Email">
          <span class="signup__Email--title">Email: </span>
          <input 
            type="email" 
            class="input" 
            v-model="email" 
            :placeholder="'\uf0e0 Your Email'" 
            required
            @focus="clearError"
          >
          </label>

          <label for="password" class="signup__Password">
          <span class="signup__Email--title">Password: </span>
          <input 
            type="password" 
            class="input" 
            v-model="password" 
            :placeholder="'\uf070 Your password'" 
            required
            @focus="clearError"
          >
          </label>

          <label for="password" class="signup__Password">
          <span class="signup__Email--title">Confirmed Password: </span>
          <input 
            type="password" 
            class="input" 
            v-model="comfirmedPassword" 
            :placeholder="'\uf058 Confirmed password'" 
            required
            @focus="clearError"
          >
          </label>
          <p 
            v-if="this.comfirmedPassword_error !== null"
            class="errorInfo"
          >
            {{comfirmedPassword_error}}
          </p>

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
import { mapGetters } from 'vuex'

export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      comfirmedPassword: '',
      name_error: '',
      comfirmedPassword_error: ''
    }
  },
  methods: {
    handleSubmit () {
      const values = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      if (this.name.length < 5) {
        this.name_error = 'Name field should be more than 4 charactors.'
      } else if (this.name.length > 20 ) {
        this.name_error = 'Name field should be less than 20 charactors'
      } else if (this.password != this.comfirmedPassword) {
        this.comfirmedPassword_error = 'Password dont match'
      } else {
        this.$store.dispatch('userModules/register', values)
      }
    },
      clearError () {
      this.name_error = null
      this.comfirmedPassword_error = null
    },
  },
  computed: {
    ...mapGetters('userModules', ['user'])
  }
}
</script>