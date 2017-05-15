<template>
  <div class="shade">
   
  </div>
</template>

<script>

export default {
  name: 'shade',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang='less' scoped>
.shade{
	position: fixed;
	top: 0px;
	width: 100%;
	height: 100%;
	background-color:rgba(55,55,55,0.5); 
	z-index: 5;
}
</style>