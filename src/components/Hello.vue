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
  }
  /*,
  created:function(argument) {
    //判断是不是微信浏览器 
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
      window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx318ae0637e725068&redirect_uri=http%3a%2f%2fwww.92lvyou.net%2findex.html&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
    } else {  
      this.$router.push({ path: '/findShip'})
      return false;  
    }  

  }*/
  
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
