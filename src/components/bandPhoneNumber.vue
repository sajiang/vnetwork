<template>
	<div class="bandPhoneNumber">
   
   		<div>
   			<input class="telInput" type="" name="" placeholder="输入手机号码" v-model="telphone">
   		</div>
   		<div class="clearfix mgt10 inputwapper">
   			<input class="codeInput" type="" name="" placeholder="输入验证码" v-model="code">
   			<span class="blueBorderBtnsm" @click="getMobileCode">获取验证码</span>
   		</div>
   		<div>
   			<span class="linearBtn" @click="checkCode">确认绑定</span>
   		</div>
    
  </div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
	name: 'my',
	data () {
		return {
		  msg: 'Welcome to Your Vue.js App',
		  telphone:"",
		  code:"",
		  type:"goods",
		  msgId:"",
		  redictUrl:"",
		}
	},
	created(){
		this.type=this.$route.params.loginInfo.to=="goods"?2:1;
		this.redictUrl=this.$route.params.loginInfo.redirect_url;
	},
	methods:{
		getMobileCode(){
			var userType=this.type=="gooder"?2:1;
			var postData={
				Mobile:this.telphone,
				userType,
				Type:1
			}
			var _this=this;
			this.$http.post(commonData.url+'userInfo/readMobileCode', postData)
	      	.then(function (response) {
				alert(response.data.RetMsg);
				if (response.data.RetCode==0) {
					_this.msgId=response.data.RetData.msgId;
				}
			});
	    },
	    checkCode(){
	    	var userType=this.type=="gooder"?2:1;
			var postData={
				Mobile:this.telphone,
				userType,
				msgId:this.msgId,
				code:this.code
			}
			var _this=this;
			this.$http.post(commonData.url+'userInfo/userLoginByMobile', postData)
	      	.then(function (response) {
	      		if(response.data.RetCode==0){
	      			commonData.setCookie("micoLogKey",response.data.RetData.micoLogKey);
	      			commonData.setCookie("userType",response.data.RetData.userType);
	      			console.log(commonData.getCookie("micoLogKey"));
	      			/*window.location.href=_this.redictUrl;*/
	      			_this.$router.go(-2);
	      		}
			});
	    }
	}
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.bandPhoneNumber{
	padding: 2em 1em;
	text-align: center;
}
.telInput{
	display: inline-block;
	padding-left: 2em;
	width: 18em;
	background-image: url(../../static/img/search.png);
	background-repeat :no-repeat;
	background-size: 1.1em 1.1em;
	background-position: 0.4em 0.4em;
	height: 2.5em;
	background-color: @grey;
	border: none;
	.rounded-corners(2px);
}
.codeInput{
	display: inline-block;
	padding-left: 2em;
	width: 18em;
	background-image: url(../../static/img/search.png);
	background-repeat :no-repeat;
	background-size: 1.1em 1.1em;
	background-position: 0.4em 0.4em;
	height: 2.5em;
	background-color: @grey;
	border: none;
	.rounded-corners(2px);
}
.blueBorderBtnsm{
	.rounded-corners(1em);
	display: inline-block;
	border: 1px @blue solid;
	color: @blue;
	text-align: center;
	vertical-align: middle;
	padding: 0.2em 0.5em;
	position: absolute;
	top: 0.4em;
	right: 2.5em;
}
.inputwapper{
	position: relative;
}
.linearBtn{
	margin-top: 1em;
	display: inline-block;
	.linearToRight(#28d7d5,#3191d8);
	color: white;
	width: 18.5em;
	padding: 1em;
}
</style>
