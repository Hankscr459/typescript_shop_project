<template>
    <nav class="navbar">
      <div class="container">
          <ul class="navbar__list">
            <li class="navbar__logo">
              <router-link :to="{ name: 'Home' }"  class="Signin__link" style="text-decoration: none; color: inherit; font-size: inherit;">
                Logo
              </router-link>
            </li>
            
            <li class="navbar__list--item">
              <span>Products</span>
              <ul class="navbar__list--item-drop">
                <li>Cat1</li>
                <li>Cat2</li>
              </ul>
            </li>
            <li class="navbar__list--item">
              <span>About</span>
              <ul class="navbar__list--item-drop">
                <li>Contact</li>
                <li>Activity</li>
              </ul>
            </li>
            <router-link :to="{ name: 'Signin' }"  class="Signin__link" style="text-decoration: none; color: inherit;">
              <li class="navbar__list--item">
                  Signin
              </li>
            </router-link>

            <router-link :to="{ name: 'Signup' }"  class="Signin__link" style="text-decoration: none; color: inherit;">
              <li class="navbar__list--item">
                  Signup
              </li>
            </router-link>

            <li class="navbar__list--item">Signout</li>
        </ul>
        <input type="checkbox" class="navbar__checkbox" id="navi-toggle" @click="toggleMenu">

        <label for="navi-toggle" class="navbar__button">
            <span class="navbar__icon">&nbsp;</span>
        </label>
      </div>
    </nav>
</template>

<script>


export default {
  name: 'Navbar',
  data () {
    return {
      screenWidth: document.body.clientWidth || 1000
    }// length
  },
  methods: {
    toggleMenu () {
      const x = document.getElementsByClassName('navbar__list--item')
      for (var i=0;i<x.length;i+=1){
        if (x[i].style.display === "flex") {
          x[i].style.display = "none";
        } else {
          x[i].style.display = "flex";
        }
      }
    }
  },
  watch: {
    screenWidth: {
      handler: function(val) {
        if (val != null) {
          if(val > 900) {
          const x = document.getElementsByClassName('navbar__list--item')
          for (var i=0;i<x.length;i+=1){
            x[i].style.display = "flex";
          }
        }
        }
        
      }
    }
  },
  mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
      }
  }
}
</script>