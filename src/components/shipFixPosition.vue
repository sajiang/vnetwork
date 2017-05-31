<template>
 	<div class="shipFixPosition">
	   	<div class="header">
	   		<span class="searchInput"  @click="showKeywordSearchPage()">船舶搜索</span>
	   	</div>
	   	<div id="mapContainerFullScreen"></div>
  	
	  	<div class="keywordSearch" v-show="isShowKeywordSearch">
			<div class="header">
				<input type="text" v-model="keyword" @input="getMatched" class="searchInput" placeholder="船舶搜索">
				<span class="cross" @click="keyword=''">x</span>
				<span class="cancel" @click="hideKeywordSearchPage">取消</span>
			</div>
			<div class="body">
				<div v-if="historyRecord.length>0&&matchArr.length==0">
					<div class="title">历史搜索</div>
					<div>
						<span class="greyBackBtnsm" v-for="item in historyRecord" @click="recordAndSearch(item)">{{item}}</span>
					</div>
				</div>
				<div v-show="matchArr.length>0">
					<div class="borderBottom" @click="recordAndSearch(item.cnShipName)" v-for="item in matchArr">{{item.cnShipName}}</div>
				</div>
			</div>
	    </div>
	</div>
</template>

<script>
import AMap from 'AMap';
import commonData from '@/components/common/commonData'
export default {
	name: 'shipFixPosition',
	data () {
		return {
		  	isShowKeywordSearch: false,
		  	keyword:"",
		  	historyRecord:[],
		  	matchArr:[],
		  	map:{}
		}
	},
	mounted(){
		this.initMap();
		if (window.localStorage.historyShipRecord) {
			this.historyRecord=window.localStorage.historyShipRecord.split(",");
		}
	},
	methods:{
		showKeywordSearchPage(){
			this.isShowKeywordSearch=true;
	 		this.keyword="";
	 		this.matchArr=[];
		},
		hideKeywordSearchPage(){
	      	this.isShowKeywordSearch=false;
	    },
	    getMatched(){
			var _this=this;
   	 		this.$http.post(commonData.url+'ship/readMapShipName',{mapStr:this.keyword})
    		.then(function (response) {
      			_this.matchArr=response.data.RetData;
      
    		})
		    .catch(function (error) {
		      	console.log(error);
		    });
	    },
	    recordAndSearch(shipName){
	    	var _this=this;
   	 		this.$http.post(commonData.url+'ship/readShipLocation',{shipName})
    		.then(function (response) {
    			if (response.data.RetCode==0) {
    				var info = [];
	      			var data=response.data.RetData;
			        var curposition=data.positionText?data.positionText:"暂无"
			        info.push('<span class="bigName">'+shipName+'</span>');
			        info.push("当前所在位置："+curposition);
			        info.push("船速：<span class='blue'>"+data.speed+'节</span>');
			        info.push("经度:"+data.longitude.substring(0,8));
			        info.push("维度:"+data.latitude.substring(0,7));

			        var infoWindow = new AMap.InfoWindow({
			           content: info.join("<br>")  //使用默认信息窗体框样式，显示信息内容
			        });
			        infoWindow.open(_this.map, [data.longitude,data.latitude]);
    			}else{
    				alert(response.data.RetMsg);
    			}
    		})
		    .catch(function (error) {
		      	console.log(error);
		    });
		    if (window.localStorage.historyShipRecord) {
	        //搜索的值在历史记录中有出现
		        if (window.localStorage.historyShipRecord.indexOf(shipName)>-1) {
					//排在第一
					var historyRecord=window.localStorage.historyShipRecord.split(",");
					var index=historyRecord.indexOf(shipName);
					historyRecord.splice(index,1);
					historyRecord.unshift(shipName);
					window.localStorage.historyShipRecord=historyRecord.join(",");
		        }else{
		          	var historyRecord=window.localStorage.historyShipRecord.split(",");
		          	if (historyRecord.length<10) {
		            	window.localStorage.historyShipRecord=shipName+','+window.localStorage.historyShipRecord;
		          	}else{
			            window.localStorage.historyShipRecord=shipName+','+window.localStorage.historyShipRecord;
			            historyRecord=window.localStorage.historyShipRecord.split(",");
			            historyRecord.splice(-1,1);
			            window.localStorage.historyShipRecord=historyRecord.join(",");
		          	}
		        }
			}else{
				window.localStorage.historyShipRecord=shipName;
			}
		    this.historyRecord=window.localStorage.historyShipRecord.split(",");
	    	this.hideKeywordSearchPage();
	    },
	  /*  quickSearch(shipName){
	    	this.getShipList(1);
			this.hideKeywordSearchPage();
			var historyRecord=window.localStorage.historyRecord.split(",");
			var index=historyRecord.indexOf(shipName);
			historyRecord.splice(index,1);
			historyRecord.unshift(shipName);
			window.localStorage.historyRecord=historyRecord.join(",");
			this.historyRecord=window.localStorage.historyRecord.split(",");
	    },*/
		initMap(){
			this.map = new AMap.Map('mapContainerFullScreen', {
	      		resizeEnable: true,
	      		zoom:5
	    	});
		}
	}
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.header{
	position: fixed;
	top: 0em;
	left: 0em;
	width: 93%;
	padding: 1em;
	z-index: 10;
	background-color: white;
	text-align: center;
	.searchInput{
		text-align: left;
		line-height: 2em;
	    color: #909090;
	    width: 90%;
	}
}
#mapContainerFullScreen{
	padding: absolute;
	width: 100%;
	height: 50em;
}
.keywordSearch{
  position: fixed;
  top: 0;
  z-index: 120;
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
    text-align: left;
    .searchInput{
      width: 70%;
      height: 100%;
      font-size: 1em;
      line-height: 2em;
    }
    .cross{
      position: absolute;
      left: 70%;
      top: 1em;
    }
    .cancel{
    	margin-left: 0.5em;
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
.borderBottom{
	padding:0.5em;
	border-bottom: 1px #DDD solid;
}
</style>
