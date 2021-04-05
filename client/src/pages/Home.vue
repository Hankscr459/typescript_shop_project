<template>
    <div>
        <Navbar />
        <div class="home container">
            <p>This is a Home Page</p>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
      Navbar
  }
}
</script>