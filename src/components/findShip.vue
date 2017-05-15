<template>
  <div class="findShip">
    <div :class="headerZIndex==6?'headerZ6':'headerZ4'">
      <div class="pd10">
        <span class="searchInput"  @click="showKeywordSearchPage()">搜索港口/船舶</span>
        <!-- <span class="blueBorderBtn fr">发布货盘</span> -->
      </div>
      <div class="clearfix">
        <div @click="showSearchOption('seaArea')" class="wh25p textCenter">
          <span :class="searchOption.seaArea.show?'blue':'fontGrey'">{{searchOption.seaArea.showstr}}</span>
          <img class="arrow" :src="searchOption.seaArea.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
        </div>
        <div @click="showSearchOption('emptyShipPort')" class="wh25p textCenter">
          <span :class="searchOption.emptyShipPort.show?'blue':'fontGrey'">{{searchOption.emptyShipPort.showstr}}</span>
          <img class="arrow" :src="searchOption.emptyShipPort.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
        </div>
        <div @click="showSearchOption('weightRange')" class="wh25p textCenter">
          <span :class="searchOption.weightRange.show?'blue':'fontGrey'">{{searchOption.weightRange.showstr}}</span>
          <img class="arrow" :src="searchOption.weightRange.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
        </div>
        <div @click="showSearchOption('emptyShipDate')" class="wh25p textCenter">
          <span :class="searchOption.emptyShipDate.show?'blue':'fontGrey'">{{searchOption.emptyShipDate.showstr}}</span>
          <img class="arrow" :src="searchOption.emptyShipDate.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
        </div>
      </div>
      <div class="searchOption">
        <div class="seaArea" v-show="searchOption.seaArea.show">
          <div class="wh33p textCenter mgt10" v-for="(seaArea,index) in seaAreaList"><span :class="index==searchOption.seaArea.curIndex?'blueBackBtn':'greyBackBtn'" @click="replaceSeaArea(index)">{{seaArea.SeaareaName}}</span></div>
        </div>

        <div class="weightRange pd10" v-show="searchOption.weightRange.show">
          <div>
            <div @click="replaceWeightRange(-1)" :class="-1==searchOption.weightRange.curIndex?'blue':''">全部</div>
            <div class="mgt10" v-for="(range,index) in tonageAreaList" :class="index==searchOption.weightRange.curIndex?'blue':''" @click="replaceWeightRange(index)">{{range.theStartVal}}吨-{{range.theEndVal}}吨</div>
          </div>
          <div class="mgt10">
            <input class="rangeInput" v-model="searchOption.weightRange.theStartVal" type="number" placeholder="输入最低区间">
            <span class="fontGrey">-</span>
            <input class="rangeInput" v-model="searchOption.weightRange.theEndVal" type="number" placeholder="输入最高区间">
            <span class="blueBackBtnsm fr" @click="replaceWeightRange()">确定</span>
          </div>
        </div>
        <div class="emptyShipDate pd10" v-show="searchOption.emptyShipDate.show">
          <input class="rangeInput" v-model="searchOption.emptyShipDate.startDate"  type="date" placeholder="选择时间">
          <span class="fontGrey">-</span>
          <input class="rangeInput" v-model="searchOption.emptyShipDate.endDate" type="date" placeholder="选择时间">
          <span class="blueBackBtnsm fr" @click="replacEmptyShipDate">确定</span>
        </div>
      </div>
    </div>

    <div class="shipList pd5 mgt50 mgb30" @touchmove="lazyLoading($event)">
      <div v-for="(item,index) in shipList" class="mgt5">
        <v-ship-item :item="item"></v-ship-item>
      </div>
    </div>
    <div class="emptyShipPort" v-show="searchOption.emptyShipPort.show" >
      <v-port-select v-on:selectportdone="replacePort" :portlist="portList"></v-port-select>
    </div>
    <v-shade v-show="shadeShow" @click.native="hideShade()"></v-shade>
    <!-- 推送按钮（下一版本再放出来）-->
    <!-- <div class="pushBtn">
      <span class="chosenGoodsCount" :class="count>0?'':'nonvisible'">{{count}}</span>
      <span class="blueCircleBtn" @click="pushGoods()"><span>推送</span></span>
    </div> -->
    <div class="keywordSearch" v-show="isShowKeywordSearch">
      <div class="header">
        <input type="text" v-model="keyword" @input="getShipList(1)"  class="searchInput" placeholder="船舶搜索">
        <span class="cross">x</span>
        <span class="cancel" @click="hideKeywordSearchPage">取消</span>
      </div>
      <div class="body">
        <div>
          <div class="title">历史搜索</div>
          <div>
            <span class="greyBackBtnsm">海口xx港口</span>
            <span class="greyBackBtnsm">海口xx港口</span>
            <span class="greyBackBtnsm">上海xxxxxx港口</span>
            <span class="greyBackBtnsm">海口xx港口</span>
            <span class="greyBackBtnsm">海口xx港口</span>
          </div>
        </div>
        <div>
          <div class="title">热门搜索</div>
          <div>
            <span class="greyBackBtnsm">xx港口</span>
            <span class="greyBackBtnsm">xxxx港口</span>
            <span class="greyBackBtnsm">xx港口</span>
            <span class="greyBackBtnsm">xx港口</span>
            <span class="greyBackBtnsm">xx港口</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shade from '@/components/common/shade'
import portSelect from '@/components/common/portSelect'
import shipItem from '@/components/common/shipItem'
import commonData from '@/components/common/commonData'

export default {
  name: 'findShip',
  data () {
    return {
      imgPath:"../../static/img",
      shadeShow:false,
      isShowKeywordSearch:false,
      keyword:"",
      headerZIndex:6,   //控制搜索条件的层叠顺序
      searchOption:{
        seaArea:{
          showstr:"海域",
          show:false,
          curIndex:-1,
        },
        emptyShipPort:{
          showstr:"空船港口",
          show:false,
          loadPortId:0,
          loadPortType:0
        },
        weightRange:{
          showstr:"吨位区间",
          show:false,
          curIndex:-2,
          theStartVal:"",
          theEndVal:""
        },
        emptyShipDate:{
          showstr:"空船日期",
          startDate:"",
          endDate:"",
          show:false,
        },
      },
      curRequestType:2,
      pageIndex:1,
      lazyLoadingCount:0,//不那么频繁触发touchmove的滚动
      curTotalPage:5, //当前搜索条件下，总页数
      portList:[],
      seaAreaList:[],
      tonageAreaList:[],
      shipList:[]
    }
  },
  components: {
    'v-shade': shade,
    'v-port-select':portSelect,
    'v-ship-item':shipItem
  },
  created(){
    var _this=this;
    this.$http.get(commonData.url+'Common/readSearchInfo')
    .then(function (response) {
      var data=response.data.RetData;
      
      _this.seaAreaList=data.seaAreaList;
      _this.tonageAreaList=data.tonageAreaList;

      var newData=data.portList;
      newData.unshift({proviceName:"全部",proviceId:"0",selected:true,citys:[]});
      for (var i = data.portList.length - 1; i >= 0; i--) {
        newData[i].selected=false;
      }

      for(var i = data.portList.length - 1; i >= 0; i--) {
        newData[i].citys.unshift({cityName:"全部",cityId:"0",ports:[]});
        for (var j=data.portList[i].citys.length - 1; j >= 0; j--) {
          newData[i].citys[j].selected=false;
        }
      }
      for(var i = data.portList.length - 1; i >= 0; i--) {
        for (var j=data.portList[i].citys.length - 1; j >= 0; j--) {
          newData[i].citys[j].ports.unshift({portName:"全部",portId:"0"});
          for(var k=data.portList[i].citys[j].ports.length - 1; k >= 0; k--){
            newData[i].citys[j].ports[k].selected=false;
          }
        }
      }
      _this.portList=newData;
    })
    .catch(function (error) {
      console.log(error);
    });
    this.getShipList(1);
  },
  computed:{
    count:function (argument) {
      var count=0;
      for(var i=0;i<this.shipList.length;i++){
        if (this.shipList[i].chosen) {
          count++;
        }
      }
      return count;
    }
  },
  methods:{
    lazyLoading(event){
      this.lazyLoadingCount++;
      if (this.lazyLoadingCount==10) {
        var totalHeight=document.getElementsByClassName("shipList")[0].scrollHeight;
        var itemHeight=document.getElementsByClassName("shipItem")[0].scrollHeight;
        var scrollHeight=window.pageYOffset;
        var screenHeight=window.screen.availHeight;
        if (totalHeight-scrollHeight-screenHeight-itemHeight<0) {
          if(++this.pageIndex<=this.curTotalPage){
            this.getShipList(this.curRequestType,this.pageIndex);
          }else{
            alert("没有更多数据啦");
          }
        }
        this.lazyLoadingCount=0
      }
    },
    getShipList(requestType,pageIndex){
      this.curRequestType=requestType;
      if(this.searchOption.seaArea.curIndex>=0){
        var seaAreaId=this.seaAreaList[this.searchOption.seaArea.curIndex].id
      }else{ 
        var seaAreaId=0
      }

      if (this.searchOption.weightRange.showstr=="吨位区间"||this.searchOption.weightRange.showstr=="全部") {
        var minTong=0,maxTong=0;
      }else{
        var arr=this.searchOption.weightRange.showstr.split("-");
        var minTong=arr[0];
        var maxTong=arr.length>0?arr[1]:0;
      }

      var portOrShipName="";
      //如果是选择检索
      if (requestType==2) {
        var temp= this.searchOption.emptyShipPort.showstr;
        if (temp!="空船港口"||temp!="全部") {
          portOrShipName=temp;
        }
      }//用户输入港口或者船舶搜索
      else{
        portOrShipName=this.keyword;
      }

      var loadPortId=this.searchOption.emptyShipPort.loadPortId;
      var loadPortType=this.searchOption.emptyShipPort.loadPortType;

      var minLoadDate=this.searchOption.emptyShipDate.startDate;
      var maxLoadDate=this.searchOption.emptyShipDate.endDate;
      var pageIndex=pageIndex?pageIndex:1;
      var postData={
        Page: pageIndex,
        PageSize: 10,
        portOrShipName,
        seaAreaId,
        loadPortId,
        loadPortType,//0 港口 1 市 2 省份
        minTong,
        maxTong,
        minLoadDate,
        maxLoadDate,
        requestType //1检索栏检索   2选择检索
      };
      var _this=this;
      this.$http.post(commonData.url+'ship/readShipList', postData)
      .then(function (response) {
        _this.curTotalPage=response.data.TotalPage;
        
        if (pageIndex==1) { //只要不是拖动，就覆盖掉之前的值
          _this.shipList=response.data.RetData;
        }else{
          _this.shipList=_this.shipList.concat(response.data.RetData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    showSearchOption(name) {
      //如果点击部分已经选中
      if (this.searchOption[name].show) {
        this.hideShade();
        return;
      }
      for (var key in this.searchOption) {
        this.searchOption[key].show=false;
      }
      this.searchOption[name].show=true;
      this.shadeShow=true;
      //如果是空船港口，变化层叠顺序
      if (name=="emptyShipPort") {
        this.headerZIndex=4;
      }else{
        this.headerZIndex=6;
      }
    },
    showKeywordSearchPage() {
      this.isShowKeywordSearch=true;
    },
    hideKeywordSearchPage(){
      this.isShowKeywordSearch=false;
    },
    hideShade(){
      this.shadeShow=false;
      for (var key in this.searchOption) {
        this.searchOption[key].show=false;
      }
    },
    replacePort(portInfo){
      this.hideShade();
      var replaceStr="全部";
      //港口有值
      if (portInfo[2]!=0) {
        replaceStr=this.portList[portInfo[0]].citys[portInfo[1]].ports[portInfo[2]].portName;
        this.searchOption.emptyShipPort.loadPortId=this.portList[portInfo[0]].citys[portInfo[1]].ports[portInfo[2]].portId;
        this.searchOption.emptyShipPort.loadPortType=0;
      }
      //城市有值
      else if(portInfo[1]!=0){
        replaceStr=this.portList[portInfo[0]].citys[portInfo[1]].cityName;
        this.searchOption.emptyShipPort.loadPortId=this.portList[portInfo[0]].citys[portInfo[1]].cityId;
        this.searchOption.emptyShipPort.loadPortType=1;
      }
      //省份有值
      else if (portInfo[0]!=0) {
        replaceStr=this.portList[portInfo[0]].proviceName;
        this.searchOption.emptyShipPort.loadPortId=this.portList[portInfo[0]].proviceId;
        this.searchOption.emptyShipPort.loadPortType=2;
      }
      this.searchOption.emptyShipPort.showstr=replaceStr;
      this.getShipList(2);
    },
    replaceSeaArea(index){
      this.hideShade();
      this.searchOption.seaArea.showstr=this.seaAreaList[index].SeaareaName;
      this.searchOption.seaArea.curIndex=index;
      this.getShipList(2);
    },
    replaceWeightRange(index){
      this.hideShade();
      if (index!=undefined) {
        if(index>-1){
          this.searchOption.weightRange.showstr=this.tonageAreaList[index].theStartVal+"-"+this.tonageAreaList[index].theEndVal;
        }else{
          this.searchOption.weightRange.showstr="全部";
        }
        this.searchOption.weightRange.curIndex=index;
        //清空手写字段
        this.searchOption.weightRange.theStartVal="";
        this.searchOption.weightRange.theEndVal="";
      }
      //手动输入
      else{
        this.searchOption.weightRange.showstr=this.searchOption.weightRange.theStartVal+"-"+this.searchOption.weightRange.theEndVal;
        this.searchOption.weightRange.curIndex=-2;
      }
      this.getShipList(2);
    },
    replacEmptyShipDate(){
      this.hideShade();
      this.getShipList(2);
    },
    pushGoods(){
      console.log(this.shipList)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.headerZ6{
  position: fixed;
  top: 0px;
  background-color: white;
  padding-bottom: 0.5em;
  width: 100%;
  z-index: 6;
  .searchInput{
    line-height: 2em;
    color: #909090;
    width: 60%;
  }
}
.headerZ4{
  position: fixed;
  top: 0px;
  background-color: white;
  padding-bottom: 0.5em;
  width: 100%;
  z-index: 4;
  .searchInput{
    line-height: 2em;
    color: #909090;
    width: 60%;
  }
}

.shipList{
  background-color: @grey;
}

.pushBtn{
  text-align: center;
  position: fixed;
  left: 36%;
  bottom: 4em;
  .chosenGoodsCount{
    position: relative;
    left: 4.8em;
    top: -1.5em;
    background-color: @orange;
    color: white;
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    line-height: 1.4em;
    .rounded-corners(0.7em);
  }
}

.arrow{
  width: 1em;
  height: 1em;
  float: right;
  margin-right: 0.5em;
}

.keywordSearch{
  position: fixed;
  top: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  background: #F0F0F0;
  .header{
    position: fixed;
    width: 100%;
    top:0;
    height: 2em;
    background-color: white;
    padding:0.5em 1em;
    .searchInput{
      width: 70%;
      height: 100%;
      font-size: 1em;
      line-height: 2em;
    }
    .cross{
      position: relative;
      left: -2em;
    }
    .cancel{
      font-size: 1.1em;
    }
  }
  .body{
    margin-top:4em;
    padding:0em 1em;
    .title{
      font-size: 1.1em;
      margin-top: 1em;
    }
    .greyBackBtnsm{
      margin-top: 0.5em;
      margin-right: 0.5em;
    }
  }
}
</style>
