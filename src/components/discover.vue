<template>
  <div class="discover">
    <div class="clearfix">
    	<div class="box mgr10">
    		<div class="shipFixPosition">
    			<span class="smallLine"></span>
    			<span class="text">船舶定位</span>
    		</div>
    	</div>
    	<div class="box mgl10">
    		<div class="queryPort">
    			<span class="smallLine"></span>
    			<span class="text">港口直查</span>
    		</div>
    	</div>
    	
    </div>
    <div class="banner">
    	<div class="wh70p">
    		<div class="mgt10">
    			<span class="title">秦皇岛-江阴</span>
    			<span class="orange title">23</span>
    			<span class="orange">元/吨</span>
    		</div>
    		<div class="mgt10">
    			<span class="darkerGrey subTitle">装载煤炭60000-70000吨</span>
    		</div>
    	</div>
    	<div class="wh30p">
    		<img class="pic" :src="imgPath+'/loadPrice.png'">
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'discover',
  data () {
    return {
      imgPath:"../../static/img",
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.discover{
	background-color: @grey;
	.pd10;
}
.box{
	width: 45%;
	float: left;
	background-color: white;
	padding: 1em 0em;
	.rounded-corners(0.4em);
}
.shipFixPosition,.queryPort{
	.smallLine{
		display: inline-block;
		width: 0.2em;
		background-color: #3689C5;
		height: 1.7em;
	}
	.text{
		.linearToRight(#28d7d5,#3191d8);
		color: transparent;
	    -webkit-background-clip: text;
	    font-weight: bolder;
	    font-size: 1.7em;
	}
}
.banner{
	margin-top: 1em;
	height: 6em;
	background-color: white;
	padding: 1em;
	.rounded-corners(0.4em);
	.title{
		font-size: 1.6em;
		font-weight: bolder;
	}
	.subTitle{
		font-size: 1.2em;
	}
	.pic{
		width: 100%;
	}
}
</style>
