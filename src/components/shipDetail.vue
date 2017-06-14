T<template>
  <div class="shipDetail">
    <div class="header clearfix">
      <div class="avatar wh25p"><img class="circleImg" :src="shipInfo.icon?shipInfo.icon:imgPath+'/deleteLater.png'"></div>
      <div class="basicInfo wh50p">
        <div>
          <span class="bigName">{{shipInfo.soName}}</span>
          <span class="darkerGrey">|</span>
          <span class="bigName">{{shipInfo.cnShipName}}</span>
          <img v-if="shipInfo.theTrue" class="vip" :src="imgPath+'/vip.png'">
          <img v-else class="vip" :src="imgPath+'/unvip.png'">
        </div>
        <div>{{shipInfo.loadTon}}T</div>
        <div class="darkerGrey">{{shipInfo.company}}</div>
      </div>
      <div class="follow wh25p">
        <span class="blueBackSpan" @click="followShip">
          <img class="star" :src="isFollow?imgPath+'/star.png':imgPath+'/unstar.png'">
          <span>{{isFollow?'已关注':'关注'}}</span>
        </span>
      </div>
    </div>
    <div class="greySeparate"></div>
    <div class="shipItem">
      <div class="clearfix pd10">
        <div>
          <div>
            <span class="darkerGrey">{{shipInfo.addDate?shipInfo.addDate.replace("T"," "):"暂无发布时间"}}</span>
            <span class="fr date">{{shipInfo.loadDate?shipInfo.loadDate.substr(5):""}}</span>
          </div>
          <div class="clearfix mgt5">
            <div class="wh33p">
              <div class="city">{{shipInfo.startPortName}}</div>
              <!-- <div>{{shipInfo.startCityName}}</div> -->
            </div>
            <div class="wh33p textCenter">
              <div>{{shipInfo.goodsName?shipInfo.goodsName:"其他"}}</div>
              <div>
                <img class="arrowRight" :src="imgPath+'/arrowRight.png'">
              </div>
            </div>
            <div class="wh33p textRight">
              <div class="city">
                <span class="circle">空</span>
                <span>{{shipInfo.endPortName}}</span>
              </div>
              <!-- <div>{{shipInfo. endCityName}}</div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="navigationInfo clearfix">
        <div class="wh50p borderLeft mgt10 ">
          <div class="darkerGrey mgl10 ">目前位置</div>
          <span class="bigName mgl10">{{shipInfo.positionText}}</span>
        </div>
        <div class="wh40p mgt10 ">
          <div class="darkerGrey mgl10">船速</div>
          <div class="bigName mgl10">{{shipInfo.speed}}节</div>
        </div>
      </div>
      <div class="progress">
        
        <div class="background">
          <div class="undo" :style="{width:undoLength+'px'}"></div>
        </div> 
        <div class="">
          <img class="shipIcon" :style="{marginLeft:marginLeft+'px'}" :src="imgPath+'/shipIcon.png'">
        </div> 
      </div>
    </div>
    <div class="greySeparate"></div>
    <div class="mapComponents">
      
      <div id="mapContainer"   v-show="this.shipInfo.longitude&&this.shipInfo.latitude"></div>
      <div class="mapMask" @click="toFullMap">
      
      </div>
    </div>
    
    <div class="clearfix">
      <div class="wh50p borderLeft mgt10 ">
        <div class="darkerGrey mgl10 ">目前抵达港</div>
        <span class="bigfont mgl10">{{shipInfo.dest_port}}</span>
      </div>
      <div class="wh40p mgt10 ">
        <div class="darkerGrey mgl10">预计抵达时间</div>
        <div class="bigfont mgl10">{{shipInfo.eta}}</div>
      </div>
    </div>
    <div class="greySeparate"></div>
    <div>
      <div class="clearfix">
        <div class="wh30p borderLeft mgt10 mgb10">
          <div class="darkerGrey mgl10 ">状态</div>
          <span class="bigfont mgl10">{{shipInfo.navStatus}}</span>
        </div>
        <div class="wh33p borderLeft mgt10 mgb10">
          <div class="darkerGrey mgl10">船舶呼号</div>
          <div class="bigfont mgl10">{{shipInfo.mmsi}}</div>
        </div>
        <div class="wh30p mgt10 mgb10">
          <div class="darkerGrey mgl10">仓容</div>
          <div class="bigfont mgl10">{{shipInfo.shipCapacity}}</div>
        </div>
      </div>
      <div class="subInfo clearfix mgb10">
        <div class="wh30p borderLeft mgt10 ">
          <div class="darkerGrey mgl10 ">类型</div>
          <span class="bigfont mgl10">{{shipInfo.TypeName}}</span>
        </div>
        <div class="wh33p borderLeft mgt10 ">
          <div class="darkerGrey mgl10">船籍港</div>
          <div class="bigfont mgl10">{{shipInfo.regPort}}</div>
        </div>
        <div class="wh30p mgt10 ">
          <div class="darkerGrey mgl10">建造年份</div>
          <div class="bigfont mgl10">{{shipInfo.Makedate}}</div>
        </div>
      </div>
      <div class="subInfo clearfix mgb10">
        <div class="wh30p borderLeft mgt10 ">
          <div class="darkerGrey mgl10 ">吃水</div>
          <span class="bigfont mgl10">{{shipInfo.emptyDraft}}</span>
        </div>
        <div class="wh33p borderLeft mgt10 ">
          <div class="darkerGrey mgl10">船宽</div>
          <div class="bigfont mgl10">{{shipInfo.shipWidth}}米</div>
        </div>
        <div class="wh30p mgt10 ">
          <div class="darkerGrey mgl10">船长</div>
          <div class="bigfont mgl10">{{shipInfo.shipLong}}米</div>
        </div>
      </div>
    </div>
    <div class="contact">
      <!-- <router-link :to="{ name: 'changeLoginStatus', params: { loginInfo: {type:'nomination',to:'gooder'} }}"  tag="div"> -->
        <a :href="'tel:'+telphonenumber" v-if="telphonePanelShow" class="linearBtn">
          <span>
            <img :src="imgPath+'/tel.png'" class="tel">
            <span>联系该船东</span>
          </span>
        </a>
        <span v-else  @click="contactShipper" class="linearBtn">
            <img :src="imgPath+'/tel.png'" class="tel">
            <span>联系该船东</span>
          </span>
        </span>
     <!--  </router-link> -->
    </div>
    <div class="greySeparate"></div>
    <div class="placeholder">
    <!-- <div v-show="telphonePanelShow">
      <v-telphone-panel :telphonenumber="telphonenumber" @canel="canel"></v-telphone-panel>
    </div> -->
    </div>
  </div>
</template>

<script>
import AMap from 'AMap';
import commonData from '@/components/common/commonData';
import telphonePanel from '@/components/common/telphonePanel';
export default {
  name: 'shipDetail',
  data () {
    return {
      imgPath:"../../static/img",
      marginLeft:"",
      undoLength:"",
      shipInfo:{},
      isFollow:false,
      telphonenumber:"",
      telphonePanelShow:false,
    }
  },
  components:{
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
    bandData(){
      this.shipInfo=JSON.parse(this.$route.params.shipInfo);
    
      if (this.shipInfo.stage<0) {
        this.shipInfo.stage=0;
      }
      var total=document.getElementsByClassName("progress")[0].offsetWidth;
      var ship=document.getElementsByClassName("shipIcon")[0].offsetWidth;
      this.marginLeft= (total-ship)*this.shipInfo.stage/100;
      this.undoLength= total-(total-ship)*this.shipInfo.stage/100-ship/2;
      if (this.shipInfo.longitude&&this.shipInfo.latitude) {
        var map = new AMap.Map('mapContainer', {
          resizeEnable: false,
          dragEnable:false,
          zoom:5,
          center: [this.shipInfo.longitude, this.shipInfo.latitude]
        });
        var info = [];
        var curposition=this.shipInfo.positionText?this.shipInfo.positionText:"暂无"
        info.push("当前所在位置："+curposition);
        info.push("经度:"+this.shipInfo.longitude.substring(0,8));
        info.push("纬度:"+this.shipInfo.latitude.substring(0,7));

        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -25),
           content: info.join("<br>")  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, [this.shipInfo.longitude,this.shipInfo.latitude]);
        var marker = new AMap.Marker({
          position: [this.shipInfo.longitude, this.shipInfo.latitude],
          icon:this.shipInfo.shipPic
        });
        marker.setMap(map);
      }
    },
    toFullMap(){
      this.$router.push({ name: 'fullMap',param:JSON.stringify(this.shipInfo)});
    },
    getFollowState(){
      var postData={shipListId:this.shipInfo.shipListId};
      var _this=this;
      this.$http.post(commonData.url+'ship/readFollowState',postData)
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
    followShip(){
      window.localStorage.pageType='nomination';
      window.localStorage.type='gooder';
      window.localStorage.wantToGo=window.location.href;
      if(commonData.checkLoginStatus(this)){
        var _this=this;
        var postData={
          shipId:this.shipInfo.shipId,
          type:this.isFollow?2:1   //关注的话就取消关注，没关注就关注
        };
        this.$http.post(commonData.url+'ship/exeShipAttention',postData)
        .then(function (response) {
          if (response.data.RetCode==0) {
            _this.isFollow=!_this.isFollow;
          }
        });
      }
    },
    getPhoneNumber(){
      var postData={shipId:this.shipInfo.shipId}
      var _this=this;
      this.$http.post(commonData.url+'ship/readShipownerMonile',postData)
      .then(function (response) {
        if (response.data.RetCode==0) {
          _this.telphonePanelShow=true;
          _this.telphonenumber=response.data.RetData.mobilePhone;
        }
      });
    },
    contactShipper(){
      //没登录
      window.localStorage.pageType='nomination';
      window.localStorage.type='gooder';
      window.localStorage.wantToGo=window.location.href;
      if(commonData.checkLoginStatus(this)){
        //发获取电话的请求
        this.getPhoneNumber();
      }
    },
    canel(){
      this.telphonePanelShow=false;
    }
  }
}
</script>

<style lang="less" scoped>
@import "https://webapi.amap.com/theme/v1.3/style1.3.26.1.css";
@import '../assets/common.less';
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
    top: 0.5em;
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

.date{
  color: @blue;
  font-weight: bold;
  font-size: 1.2em;
  vertical-align: middle;
}
.city{
  font-size: 1.2em;
  vertical-align: middle;
  margin-bottom: 0.2em;
}
.ton{
  color: @fontGrey;
  font-size: 1em;
  vertical-align: middle;
}
.vip{
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
.recommend{
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
}
.arrowRight{
  width: 6em;
  vertical-align: top;
}
.chosenItem{
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  margin-top: 1.5em;
}

.circle{
  vertical-align: top;
  display: inline-block;
  font-size: 0.4em;
  color: @fontGrey;
  height: 1.2em;
  width: 1.2em;
  border:1px @fontGrey solid;
  .rounded-corners(0.6em);
  text-align: center;
}
.navigationInfo{
  margin-top: -0.5em;
  border-top: 1px #E2E2E2 solid;
  padding-top: 0.4em;
  .bigName{
    font-weight: normal;
  }
  
}
.subInfo{
  border-top: 1px #E2E2E2 solid;
}
.borderLeft{
    border-right: 1px #E2E2E2 solid;
  }
.progress{
  position: relative;
  height: 1em;
  .shipIcon{
    width: 2.5em;
    position:absolute;
  }
  .background{
    height: 0.3em;
    position: absolute;
    width: 100%;
    top: 0.7em;
    .linearToRight(#28d7d5,#3191d8);
    .undo{
      background-color: #E1E1E1;
      height: 100%;
      float: right;
    }
  }
}
.mapComponents{
  position: relative;
  #mapContainer{
    height: 12em;
    width: 100%;
  }
  .mapMask{
    height: 12em;
    width: 100%;
    position: absolute;
    top: 0em;
  }
}

.placeholder{
  height: 3.5em;
}
.telphonePanel{
  
}
</style>