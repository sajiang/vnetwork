<template>
  <div class="discover">
    <div class="clearfix">
    	<div class="box mgr10">
    		<router-link to="/discover/shipFixPosition" class="shipFixPosition" tag="div">
    			<span class="smallLine"></span>
                <img class="img" :src="imgPath+'/shipFixImg.png'">
    			<span class="text">船舶定位</span>
    		</router-link>
    	</div>
    	<div class="box mgl10">
    		<div class="queryPort">
    			<span class="smallLine"></span>
                <img class="img" :src="imgPath+'/queryPortImg.png'">
    			<span class="text">港口直查</span>
    		</div>
    	</div>
    	
    </div>
    <router-link class="banner clearfix" to="/discover/loadPrice" tag="div">
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
    </router-link>
    <div class="banner clearfix" @click="laterOpen">
        <div class="wh70p">
            <div class="mgt10">
                <span class="blue title">加油点</span>
                <span class="title">直查</span>
            </div>
            <div class="mgt10">
                <span class="darkerGrey subTitle">点击查看更多加油点</span>
            </div>
        </div>
        <div class="wh30p">
            <img class="pic" :src="imgPath+'/fillUpOil.png'">
        </div>
    </div>
    <div class="banner clearfix" @click="laterOpen">
        <div class="wh70p">
            <div class="mgt10">
                <span class="fontBold">我来给你</span>
                <span class="blue title">垫运费</span>
                <span class="orange title">垫油款</span>
            </div>
            <div class="mgt10">
                <span class="darkerGrey subTitle">成本低廉，操作灵活</span>
            </div>
        </div>
        <div class="wh30p">
            <img class="pic" :src="imgPath+'/spot.png'">
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
  },
  methods:{
    laterOpen(){
        alert("功能尚未开放，敬请期待")
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
		height: 1.7em;
        vertical-align: middle;
	}
	.text{
		color: transparent;
	    -webkit-background-clip: text;
	    font-weight: bolder;
	    font-size: 1.7em;
        vertical-align: middle;
	}
    .img{
        height: 2.5em;
        vertical-align: middle;
        position: relative;
        left: 0.2em;
    }
}
.shipFixPosition{
    .smallLine{
        background-color: #3689C5;
    }
    .text{
        .linearToRight(#28d7d5,#3191d8);
    }
}
.queryPort{
    .smallLine{
        background-color: #ED745C;
    }
    .text{
        .linearToRight(#ED745C,#3588C7);
    }
}
.banner{
	margin-top: 1em;
	height: 6em;
	background-color: white;
	padding: 1em;
	.rounded-corners(0.4em);
	.title{
		font-size: 1.5em;
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
