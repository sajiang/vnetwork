<template>
  <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  created:function() {
    var doc=document;
    var win=window;
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 13 * (clientWidth / 320) + 'px';
      };
    if (!doc.addEventListener) return;
    doc.addEventListener('DOMContentLoaded', recalc, false);

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #606060;
}
</style>
