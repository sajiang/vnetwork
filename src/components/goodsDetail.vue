<template>
  	<div class="goodsDetail">
	   
	    <div class="header clearfix">
	      	<div class="avatar wh25p"><img class="circleImg" :src="goodsInfo.icon?goodsInfo.icon:imgPath+'/deleteLater.png'"></div>
	      	<div class="basicInfo wh50p">
	        	<div>
	          		<span class="bigName">{{goodsInfo.goName}}</span>
	          		<img class="vip" :src="goodsInfo.theTrue?imgPath+'/vip.png':imgPath+'/unvip.png'">
	          		<img class="star" :src="imgPath+'/unstar.png'">
	        	</div>
	        	<div class="darkerGrey">{{goodsInfo.company}}</div>
	      	</div>
	      	<div class="follow wh25p">
            <span class="blueBackSpan" @click="followGoods">
              <img class="star" :src="isFollow?imgPath+'/star.png':imgPath+'/unstar.png'">
              {{isFollow?'已关注':'关注'}}
            </span>
          </div>
	    </div>
	    <div class="greySeparate"></div>
	    <div class="borderBottom darkerGrey pd10 mgl10 mgr10">
	    	<span>发布于</span>
	    	<span>{{goodsInfo.addDate?goodsInfo.addDate.replace("T"," "):''}}</span>
	    </div>
	    <div class="borderBottom mgl10 mgr10">
	    	<v-goods-item :item="goodsInfo"></v-goods-item>
	    </div>
	    <div class="borderBottom mgl10 mgr10 mgt10">
	    	<div class="clearfix">
	    		<div class="wh40p">
	    			<span class="darkerGrey">装卸天数：</span>
	    			<span class="fr">{{goodsInfo.Layday}}</span>
	    		</div>
	    		<div class="wh20p">&nbsp</div>
	    		<div class="wh40p">
	    			<span class="darkerGrey">滞期费：</span>
	    			<span class="fr">{{goodsInfo.demurrage}}{{goodsInfo.dr_unit?"元/天":"元/天/吨"}}</span>
	    		</div>
	    	</div>
	    	<div class="clearfix mgt10 mgb10">
	    		<div class="wh50p">
	    			<span class="darkerGrey">付款条件：</span>
	    			<span class="fr">{{goodsInfo.paidoff?"卸后付清":"卸前付清"}}</span>
	    		</div>
	    	</div>
	    </div>
	    <div class="contact">
	        <span @click="contactGooder" class="linearBtn">
	          	<a :href="'tel:'+telphonenumber" v-if="telphonePanelShow">
                <img :src="imgPath+'/tel.png'" class="tel">
                <span>联系该货主</span>
              </a>
              <span v-else>
                <img :src="imgPath+'/tel.png'" class="tel">
                <span>联系该货主</span>
              </span>
	        </span>
	    </div>
      <!-- <div v-show="telphonePanelShow" class="telphonePanel">
        <v-telphone-panel :telphonenumber="telphonenumber" @canel="canel"></v-telphone-panel>
      </div> -->
  	</div>
</template>

<script>
import goodsItem from '@/components/common/goodsItem'
import commonData from '@/components/common/commonData'
import telphonePanel from '@/components/common/telphonePanel';
export default {
  name: 'goodsDetail',
  data () {
    return {
       imgPath:"../../static/img", 
       goodsInfo:{},
       isFollow:false,
       telphonePanelShow:false,
       telphonenumber:"",
    }
  },
  components: {
    'v-goods-item':goodsItem,
    "v-telphone-panel":telphonePanel
  },
  activated() {
    window.scrollTo(0,0)
    this.bandData();
    this.getFollowState();
    this.getPhoneNumber();
  },
  mounted(){
    window.scrollTo(0,0)
    this.bandData();
    this.getFollowState();
    this.getPhoneNumber();
  },
  methods:{
    contactGooder(){
      //没登录
      window.localStorage.pageType='nomination';
      window.localStorage.type='shipper';
      window.localStorage.redirectUrl=window.location.href;

      if(commonData.checkLoginStatus(this)){
        //身份是船东
        //发获取电话的请求
        
      }
    },
    getPhoneNumber(){
      var postData={goodsListId:this.goodsInfo.goodsListId}
      var _this=this;
      this.$http.post(commonData.url+'goods/readGoodserMonile',postData)
      .then(function (response) {
        if (response.data.RetCode==0) {
          _this.telphonePanelShow=true;
          _this.telphonenumber=response.data.RetData.mobilePhone;
        }
      });
    },
    bandData(){
      this.goodsInfo=JSON.parse(this.$route.params.goodsInfo);
    },
    getFollowState(){
      var postData={goodsListId:this.goodsInfo.goodsListId};
      var _this=this;
      this.$http.post(commonData.url+'goods/readFollowState',postData)
      .then(function (response) {
        if (response.data.RetCode==0) {
          //未关注
          if (response.data.RetData.followId==0) {
            _this.isFollow=false;
          }else{
            _this.isFollow=true;
          }
        }
      });
    },
    followGoods(){
      window.localStorage.pageType='nomination';
      window.localStorage.type='shipper';
      window.localStorage.wantToGo=window.location.href;
      if(commonData.checkLoginStatus(this)){
        var _this=this;
        var postData={
          goodsListId:this.goodsInfo.goodsListId,
          type:this.isFollow?2:1   //关注的话就取消关注，没关注就关注
        };
        this.$http.post(commonData.url+'goods/exeGoodsAttention',postData)
        .then(function (response) {
          if (response.data.RetCode==0) {
            _this.isFollow=!_this.isFollow;
          }
        });
      }
    },
    canel(){
      this.telphonePanelShow=false;
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
