<template>
  	<div class="goodsDetail">
	   
	    <div class="header clearfix">
	      	<div class="avatar wh25p"><img class="circleImg" :src="imgPath+'/deleteLater.png'"></div>
	      	<div class="basicInfo wh50p">
	        	<div>
	          		<span class="bigName">{{"小琪"}}</span>
	          		<img class="vip" :src="imgPath+'/vip.png'">
	          		<!-- <img v-else class="vip" :src="imgPath+'/unvip.png'"> -->
	          		<img class="star" :src="imgPath+'/unstar.png'">
	        	</div>
	        	<div class="darkerGrey">{{"xxx货物责任有限公司"}}</div>
	      	</div>
	      	<div class="follow wh25p"><span class="blueBackSpan"><img class="star" :src="imgPath+'/unstar.png'">关注</span></div>
	    </div>
	    <div class="greySeparate"></div>
	    <div class="borderBottom darkerGrey pd10 mgl10 mgr10">
	    	<span>发布于</span>
	    	<span>2016-03-08 10:15</span>
	    </div>
	    <div class="borderBottom mgl10 mgr10">
	    	<v-goods-item></v-goods-item>
	    </div>
	    <div class="borderBottom mgl10 mgr10 mgt10">
	    	<div class="clearfix">
	    		<div class="wh40p">
	    			<span class="darkerGrey">装卸天数：</span>
	    			<span class="fr">7</span>
	    		</div>
	    		<div class="wh20p">&nbsp</div>
	    		<div class="wh40p">
	    			<span class="darkerGrey">滞期费：</span>
	    			<span class="fr">1元/天/吨</span>
	    		</div>
	    	</div>
	    	<div class="clearfix mgt10 mgb10">
	    		<div class="wh50p">
	    			<span class="darkerGrey">付款条件：</span>
	    			<span class="fr">卸前付款</span>
	    		</div>
	    	</div>
	    </div>
	    <dir class="contact">
	        <span @click="contactGooder" class="linearBtn">
	          	<img :src="imgPath+'/tel.png'" class="tel">
	          	<span>联系该货主</span>
	        </span>
	    </dir>
  	</div>
</template>

<script>
import goodsItem from '@/components/common/goodsItem'
import commonData from '@/components/common/commonData'
export default {
  name: 'goodsDetail',
  data () {
    return {
       imgPath:"../../static/img",
    }
  },
  components: {
    'v-goods-item':goodsItem
  },
  methods:{
    contactGooder(){
      //没登录
      var data={
        type:'nomination',
        to:"shipper",
        redirect_url:window.location.href
      }
      
      if(commonData.checkLoginStatus(this,data)){
        //身份是船东
        //发获取电话的请求
      }
    }
  }
}
</script>

<style lang="less" scoped>

.header{
  padding: 1em 0.8em;
  .avatar{
    text-align: center;
    img{
      height: 5em;
      width: 5em;
    }
  }
  .basicInfo{
    position: relative;
    left: 1em;
  }
  .follow{
    .blueBackSpan{
      margin-top: 1em;
      margin-left: 0em;
    }
    .star{
      width: 1.1em;
      height: 1.1em;
      vertical-align: top;
    }
  }
}
.vip{
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
.borderBottom{
	border-bottom: 1px #E2E2E2 solid;
}
</style>
