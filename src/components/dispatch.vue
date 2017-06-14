<template>
  <div class="dispatch">
   
    正在转发中....
  </div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
	name: 'dispatch',
	data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	},
	created:function(){
		var code=this.getUrlParam("code");   
		var userType=window.localStorage.type=="gooder"?2:1;
		var postData={code,userType};
		var _this=this;
		this.$http.post(commonData.url+'userInfo/isBindUser', postData)
      	.then(function (response) {
			if (response.data.RetCode==0) {
				console.log("isbind"+response.data.RetData.isBind)
				if(response.data.RetData.isBind==1){
					sessionStorage.setItem("isLogin",1);
					console.log("userType"+response.data.RetData.userType);
					sessionStorage.setItem("userId",response.data.RetData.userId);
		      		sessionStorage.setItem("userInfoName",response.data.RetData.userInfoName);
		      		sessionStorage.setItem("userType",response.data.RetData.userType);
					_this.$router.go(-3);
				}else{
					_this.$router.push({ name: 'bandPhoneNumber'});
				}
				sessionStorage.setItem("openId",response.data.RetData.openId);
			}
		});
	},
  	methods:{
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

<style scoped>

</style>
