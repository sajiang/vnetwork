<template>
  <div class="message">
   	<div v-if="msgList.length<1" class="textCenter">
		暂无消息
	</div>
	<div class="messageList">
		<div  class="messageItem clearfix" v-for="item in msgList" @click="clickMsg(item)">
	    	<div class="wh10p textCenter dotContainer">
	    		<span :class="isRead==0?'orangeDot':'blueDot'"></span>
	    	</div>
	    	<div class="wh80p body">
		    	<div class="title">
		    		{{item.PushTitle}}
		    	</div>
		    	<div class="infoText">
		    		{{item.PushAlert}}
		    	</div>
		    	<div class="time">
		    		{{item.PushDate}}
		    	</div>
	    	</div>
	    </div>
	</div>
    
        
  </div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
  	name: 'message',
  	data () {
    	return {
      		msgList:[],
    	}
  	},
  	created(){
  		this.getMessageList();
  	},
  	methods:{
	  	getMessageList(){
	  		var _this=this;
	  		var postData={
	  			page:1,
	  			pageSize:10
	  		};
   	 		this.$http.post(commonData.url+'Common/readMsgInfromList',postData)
    		.then(function (response) {
      			var data=response.data.RetData;
      			_this.msgList=data;
    		})
		    .catch(function (error) {
		      	console.log(error);
		    });
	  	},
	  	clickMsg(item){
	  		
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
		.blueDot{
			background-color:@blue;
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
