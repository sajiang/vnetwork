<template>
	<div class="changeLoginStatus">
		<div class="title">
			切换身份
		</div>
		<div class="nomination" v-if="loginInfo.pageType=='nomination'">
			<div v-if="loginInfo.type=='gooder'">
				<div>
					<img class="avatar" :src="imgPath+'/gooder.png'">
				</div>
				<div class="good">货主</div>
			</div>
			<div v-else-if="loginInfo.type=='shipper'">
				<div>
					<img class="avatar" :src="imgPath+'/shipper.png'">
				</div>
				<div class="ship">船东</div>
			</div>
		</div>
		<div class="choose clearfix textCenter" v-else-if="loginInfo.pageType=='choose'">
			<div class="inlineBlock">
				<div>
					<img :class="gooderBig?'bigAvatar':'avatar'" :src="gooderBig?imgPath+'/gooder.png':imgPath+'/ungooder.png'" @click="changeType('gooder')">
				</div>
				<div class="good">货主</div>
			</div>
			<div class="inlineBlock">
				<div>
					<img :class="shipperBig?'bigAvatar':'avatar'" :src="shipperBig?imgPath+'/shipper.png':imgPath+'/unshipper.png'" @click="changeType('shipper')">
				</div>
				<div class="ship">船东</div>
			</div>
		</div>
		<div class="login" @click="bandPhoneNumber">
			<span class="blueBorderBtn">确定</span>
		</div>
		

	</div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
	name: 'changeLoginStatus',
	data () {
		return {
			imgPath: '../../../static/img',
	  		loginInfo: {
	  			pageType:"",
	  			type:""
	  		},
	  		gooderBig:true,
	  		shipperBig:false
		}
	},
	created() {
		this.loginInfo.pageType=window.localStorage.pageType;
		this.loginInfo.type=window.localStorage.type;
		/*this.loginInfo=JSON.parse(this.$route.params.loginInfo);*/
	},
	activated(){
		this.loginInfo.pageType=window.localStorage.pageType;
		this.loginInfo.type=window.localStorage.type;
	},
	methods:{
		bandPhoneNumber(){
			if (this.loginInfo.pageType=="choose") {
				if (this.gooderBig) {
					window.localStorage.type="gooder";
					window.localStorage.curType="gooder";
				}else{
					window.localStorage.type="shipper";
					window.localStorage.curType="shipper";
				}
			}
			if (sessionStorage.getItem("isLogin")==1) {
				//更换身份
				var _this=this;
				this.$http.post(commonData.url+'/userInfo/switchIdentity')
		      	.then(function (response) {
					if (response.data.RetCode==0) {
						//_this.$store.state.isLogin=1;
						sessionStorage.setItem("isLogin",1);
						sessionStorage.setItem("userId",response.data.RetData.userId);
			      		sessionStorage.setItem("userInfoName",response.data.RetData.userInfoName);
			      		sessionStorage.setItem("userType",response.data.RetData.userType);
			      		window.localStorage.curType=response.data.RetData.userType==1?"shipper":"gooder";
						//window.location.href=window.localStorage.wantToGo;
						_this.$router.go(-1);						
					}
				});
			}else{
				//没登录，跳授权页
				var ua = navigator.userAgent.toLowerCase();  
    			//没登录并且是微信浏览器则跳授权页
				if(ua.match(/MicroMessenger/i)=="micromessenger") {  
				  	window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx318ae0637e725068&redirect_uri=http%3a%2f%2fwww.92lvyou.net%2findex.html%23%2fdispatch&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
				}else
				{  //没登录并且是普通浏览器跳绑定登录页面
			      	this.$router.push({ name: 'bandPhoneNumber'});
			    }
			}
			
		},
		changeType(type){
			if (type=="gooder") {
				this.gooderBig=true;
				this.shipperBig=false;
			}else{
				this.gooderBig=false;
				this.shipperBig=true;
			}
		}
	}
}
</script>

<style lang="less" scoped>
@gooderColor:#18A187;
@shipperColor:#3E89C1;
.title{
	text-align: center;
	margin-top: 5em;
	font-size: 1.2em;
}
.nomination{
	text-align: center;
	margin-top: 4em;
	font-size: 1.1em;
	.avatar{
		width: 8em;
		height: 8em;
	}
	
}
.good{
	margin-top: 1em;
	font-weight: bolder;
	color: @gooderColor;
}
.ship{
	margin-top: 1em;
	font-weight: bolder;
	color: @shipperColor;
}
.login{
	text-align: center;
	margin-top: 3em;
	.blueBorderBtn{
		width: 50%;
	}
}
.bigAvatar{
	width: 10em;
	height: 10em;
}
.avatar{
	width: 8em;
	height: 8em;
}
</style>