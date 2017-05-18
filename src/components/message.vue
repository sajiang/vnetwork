<template>
  <div class="message">
   
    <div  class="messageItem clearfix">
    	<div class="wh10p textCenter dotContainer">
    		<span class="orangeDot"></span>
    	</div>
    	<div class="wh80p body">
	    	<div class="title">
	    		系统推送
	    	</div>
	    	<div class="infoText">
	    		恒大轮5000吨已在广州空港哦。点击查看。
	    	</div>
	    	<div class="time">
	    		10月9日
	    	</div>
    	</div>
    </div>
        
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.message{
	background-color: @grey;
	padding: 1em;
}
.messageItem{
	margin-bottom: 1em;
	.dotContainer{
		margin-top: 2em;
		height: 100%;
		.orangeDot{
			background-color:@orange;
			display: inline-block;
			width: 1em;
			height: 1em;
			.rounded-corners(0.5em);
			vertical-align: middle;
		}
	}
	.body{
		.rounded-corners(0.5em);
		padding: 1em;
		background-color: white;
		.title{
			font-size: 1.1em;
			font-weight: bold;
		}
		.infoText,.time{
			color: @darkerGrey;
		}
		.infoText{
			margin-top: 0.5em;
		}
	}
	
}

</style>
