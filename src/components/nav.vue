<template>
  <div class="nav clearfix boxShadow">
    <router-link to="/findShip" class="wh25p" >
      <div class="textCenter"><span class="findShip"></span></div>
      <div class="navText">找船</div>
    </router-link>
    <router-link to="/findGoods" class="wh25p">
      <div class="textCenter"><span class="findGoods"></span></div>
      <div class="navText">找货</div>
    </router-link>
    <router-link to="/discover" class="wh25p">
      <div class="textCenter"><span class="discover"></span></div>
      <div class="navText">服务</div>
    </router-link>
    <router-link to="/my" class="wh25p toMy">
      <div class="textCenter"><span class="my"></span></div>
      <div class="navText">我的</div>
    </router-link>
  </div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
  name: 'nav',
  data () {
    return {
      imgPath:"../../static/img",
    }
  },
  created(){
    window._this=this;
  },
  methods:{
    toMy:function(argument) {
      window.localStorage.pageType='choose';
      if (window.localStorage.curType) {
        window.localStorage.type=window.localStorage.curType;
      }
      window.localStorage.wantToGo=window.location.origin+window.location.pathname+"#/my";
      if(commonData.checkLoginStatus(this)){
        this.$router.push({ path: '/my'});
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import '../assets/common.less';
@imgPath:"../../static/img";
.nav{
  padding-top: 0.5em;
  background-color: white;
}
.icon{
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background-size: cover;
}
.findShip{
  .icon;
  background-image: url('@{imgPath}/findShipOff.png');
}
.findGoods{
  .icon;
  background-image: url('@{imgPath}/findGoodsOff.png');
}
.discover{
  .icon;
  background-image: url('@{imgPath}/discoverOff.png');
}
.my{
  .icon;
  background-image: url('@{imgPath}/myOff.png');
}
.navText{
  color: @fontGrey;
}
.router-link-active{
  .findShip{
    background-image: url('@{imgPath}/findShipOn.png');
  }
  .findGoods{
    background-image: url('@{imgPath}/findGoodsOn.png');
  }
  .discover{
    background-image: url('@{imgPath}/discoverOn.png');
  }
  .my{
    background-image: url('@{imgPath}/myOn.png');
  }
  .navText{
    color: @blue;
  }
}
.boxShadow{
  box-shadow:0px -1px 10px #eee;
}
</style>
