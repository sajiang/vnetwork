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
		this.type=window.localStorage.type=="gooder"?2:1;
		/*this.redictUrl=JSON.parse(this.$route.params.loginInfo).redirect_url;*/
	},
	methods:{
		getMobileCode(){
			var userType=this.type;
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
	    	var wxcode=this.getUrlParam("code");
	    	//如果有微信授权
	    	if (wxcode) {
	    		var userType=this.type;
				var postData={
					Mobile:this.telphone,
					userType,
					msgId:this.msgId,
					vCode:this.code,
					openId:sessionStorage.getItem("openId")
				}
				var _this=this;
				this.$http.post(commonData.url+'userInfo/exeBindUser', postData)
		      	.then(function (response) {
		      		console.log(response.data.RetCode==0);
		      		if(response.data.RetCode==0){
		      			sessionStorage.setItem("isLogin",1);
		      			//_this.$store.isLogin=1;
		      			sessionStorage.setItem("company",response.data.RetData.company);
			      		sessionStorage.setItem("icon",response.data.RetData.icon);
			      		sessionStorage.setItem("theTrue",response.data.RetData.theTrue);
		      			sessionStorage.setItem("userId",response.data.RetData.userId);
		      			sessionStorage.setItem("userInfoName",response.data.RetData.userInfoName);
		      			sessionStorage.setItem("userType",response.data.RetData.userType);
		      			window.localStorage.curType=response.data.RetData.userType==1?"shipper":"gooder";
		      			console.log(_this.$router);
		      			_this.$router.go(-2);
		      		}
				});
	    	}else{
	    		var userType=this.type;
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
		      			sessionStorage.setItem("isLogin",1);
		      			sessionStorage.setItem("company",response.data.RetData.company);
			      		sessionStorage.setItem("icon",response.data.RetData.icon);
			      		sessionStorage.setItem("theTrue",response.data.RetData.theTrue);
		      			sessionStorage.setItem("userId",response.data.RetData.userId);
		      			sessionStorage.setItem("userInfoName",response.data.RetData.userInfoName);
		      			sessionStorage.setItem("userType",response.data.RetData.userType);
		      			window.localStorage.curType=response.data.RetData.userType==1?"shipper":"gooder";
		      			_this.$router.go(-2);
		      		}else{
		      			alert(response.data.RetMsg);
		      		}
				});
	    	}
	    	
	    },
	    getUrlParam(name) {  
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r != null) {
			   return unescape(r[2]);  //返回参数值
			} else {
			   return null; 
			}
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
	width: 90%;
	background-image: url(../../static/img/search.png);
	background-repeat :no-repeat;
	background-size: 1.1em 1.1em;
	background-position: 0.4em 0.4em;
	height: 3em;
	background-color: @grey;
	border: none;
	.rounded-corners(2px);
}
.codeInput{
	display: inline-block;
	padding-left: 2em;
	width: 90%;
	background-image: url(../../static/img/search.png);
	background-repeat :no-repeat;
	background-size: 1.1em 1.1em;
	background-position: 0.4em 0.4em;
	height: 3em;
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
	top: 0.8em;
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
	width: 90%;
	padding:0.5em 1em;
}
</style>
