<template>
  <div class="hello">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    <div class="bottom">
      <v-nav></v-nav>
    </div>
    
  </div>
  
</template>

<script>
import nav from '@/components/nav'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'v-nav': nav
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom{
  position: fixed;
  bottom: 0px;
  width: 100%;
  text-align: center;
}
</style>
