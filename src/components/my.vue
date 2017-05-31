<template>
  <div class="my">
   
    <div :class="type">
    	<div class="clearfix header">
    		<div class="wh30p textCenter">
    			<div class="avatar">
    				<img :src="icon?icon:imgPath+'/deleteLater.png'">
	    			<span class="label fontBold">{{type=="gooder"?"货主":"船东"}}</span>
    			</div>
    		</div>
    		<div class="wh40p">
    			<div class="name">{{userInfoName}} {{company}}</div>
    			<div class="mgt5" v-if="type=='gooder'">
    				<img class=" certification" :src="theTrue==2?imgPath+'/certification.png':imgPath+'/uncertification.png'">
    				<img class="IDCard" :src="imgPath+'/unIDCard.png'">
    			</div>
    		</div>
    		<div class="wh30p mgt10">
    			<span class="fr mgt10 switch" @click="switchType">切换身份</span>
    		</div>
    	</div>
    	<div class="tab" @click="toMyFollow"> 
    		<img class="icon" :src="imgPath+'/myFollow.png'">
    		<span>我关注的</span>
    		<img class=" fr icon" :src="imgPath+'/smallArrow.png'">
    	</div>
    	<div class="greySeparate"></div>
    	<router-link to="/my/message" tag="div">
	    	<div class="tab">
	    		<img class="icon" :src="imgPath+'/notice.png'">
	    		<span>消息通知</span>
	    		<img class=" fr icon" :src="imgPath+'/smallArrow.png'">
	    	</div>
    	</router-link>
    	<div class="tab"> 
    		<img class="icon" :src="imgPath+'/contact.png'">
    		<span @click="showServiceNumber">联系客服</span>
    		<img class=" fr icon" :src="imgPath+'/smallArrow.png'">
    	</div>
    </div>
    <div v-show="telphonePanelShow" class="telphonePanel">
        <v-telphone-panel telphonenumber="4001151356" @canel="canel"></v-telphone-panel>
     </div>
  </div>
</template>

<script>
import commonData from '@/components/common/commonData';
import telphonePanel from '@/components/common/telphonePanel';
export default {
  name: 'my',
  data () {
    return {
      imgPath:"../../static/img",
      type:"",
      company:"",
      icon:"",
      theTrue:"",
      userId:"",
      userInfoName:"",
      userType:"",
      telphonePanelShow:false,
    }
  },
  components: {
    "v-telphone-panel":telphonePanel
  },
  created(){
  	this.type=window.localStorage.curType;
  	this.bindInfo();
  },
  activated(){
  	this.type=window.localStorage.curType;
  	this.bindInfo();
  },
  methods:{
  	switchType(){
  		var _this=this;
  		this.$http.post(commonData.url+'/userInfo/switchIdentity')
        	.then(function (response) {
  			if (response.data.RetCode==0) {
  				//_this.$store.state.isLogin=1;
          sessionStorage.setItem("isLogin",1);
          sessionStorage.setItem("company",response.data.RetData.company);
          sessionStorage.setItem("icon",response.data.RetData.icon);
          sessionStorage.setItem("theTrue",response.data.RetData.theTrue);
          sessionStorage.setItem("userId",response.data.RetData.userId);
          sessionStorage.setItem("userInfoName",response.data.RetData.userInfoName);
          sessionStorage.setItem("userType",response.data.RetData.userType);
          window.localStorage.curType=response.data.RetData.userType==1?"shipper":"gooder";
          _this.type=window.localStorage.curType;
          _this.company=response.data.RetData.company;
          _this.icon=response.data.RetData.icon;
          _this.theTrue=response.data.RetData.theTrue;
          _this.userId=response.data.RetData.userId;
          _this.userInfoName=response.data.RetData.userInfoName;
  			}
  		});
  	},
  	toMyFollow(){
  		if(this.type=="gooder"){
  			this.$router.push('/my/myFollowShip');
  		}else{
  			this.$router.push('/my/myFollowGoods');
  		}
  	},
  	bindInfo(){
  		this.company=sessionStorage.getItem("company");
  		this.icon=sessionStorage.getItem("icon");
  		this.theTrue=sessionStorage.getItem("theTrue");
  		this.userId=sessionStorage.getItem("userId");
  		this.userInfoName=sessionStorage.getItem("userInfoName");
  		this.userType=sessionStorage.getItem("userType");
  	},
  	showServiceNumber(){
  		this.telphonePanelShow=true;
  	},
  	canel(){
      this.telphonePanelShow=false;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.gooder,.shipper{
	.header{
		color: white;
		.linearToRight(#389B8C,#D9DEC0);
		height: 6em;
		padding: 2em 0em;
		.avatar{
			display: inline-block;
			.circleImg;
			border: 0.2em white solid;
			width: 5em;
			height: 5em;
			overflow: hidden;
			.label{
				display: block;
				position: relative;
				top: -1.5em;
				width: 5em;
				height: 2em;
				padding-top: 0.1em;
				.textCenter;
				.linearToRight(#ED7856,#CDB555);
			}img{
				width: 5em;
				height: 5em;
			}
		}
		.name{
			margin-top: 1em;
			font-size: 1.2em;
		}
		.certification,.IDCard{
			height: 1.3em;
		}
		.switch{
			.linearToRight(#EC9658,#5DAECC);
			display: inline-block;
			padding: 0.5em 1em;
			border-top-left-radius: 5em;
			-webkit-border-top-left-radius: 5em;
			-moz-border-top-left-radius:5em;
			border-bottom-left-radius: 5em;
			-webkit-border-bottom-left-radius: 5em;
			-moz-border-bottom-left-radius:5em;
		}

	}
	.tab{
		border-bottom: 1px @grey solid;
		color: @fontGrey;
		font-size: 1.1em;
		padding: 0.5em 1em;
		.icon{
			width: 1.2em;
			height: 1.2em;
			vertical-align: middle;
		}
	}
	
}
.gooder{
	.header{
		.linearToRight(#389B8C,#D9DEC0);
	}
}
.shipper{
	.header{
		.linearToRight(#619ED1,#5AC0C2);
	}
}

</style>
