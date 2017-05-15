<template>
	<div class="findGoods">
		<div class="clearfix searchOption" :class="headerZIndex==6?'headerZ6':'headerZ4'">
	        <div @click="showSearchOption('loadGoodsPort')" class="wh25p textCenter">
	          	<span :class="searchOption.loadGoodsPort.show?'blue':'fontGrey'">{{searchOption.loadGoodsPort.showstr}}</span>
	          	<img class="arrow" :src="searchOption.loadGoodsPort.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
	        </div>
	        <div @click="showSearchOption('unloadGoodsPort')" class="wh25p textCenter">
	          	<span :class="searchOption.unloadGoodsPort.show?'blue':'fontGrey'">{{searchOption.unloadGoodsPort.showstr}}</span>
	          	<img class="arrow" :src="searchOption.unloadGoodsPort.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
	        </div>
	        <div @click="showSearchOption('weightRange')" class="wh25p textCenter">
	          	<span :class="searchOption.weightRange.show?'blue':'fontGrey'">{{searchOption.weightRange.showstr}}</span>
	          	<img class="arrow" :src="searchOption.weightRange.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
	        </div>
	        <div @click="showSearchOption('loadGoodsDate')" class="wh25p textCenter">
	          	<span :class="searchOption.loadGoodsDate.show?'blue':'fontGrey'">{{searchOption.loadGoodsDate.showstr}}</span>
	          	<img class="arrow" :src="searchOption.loadGoodsDate.show?imgPath+'/arrowUp.png':imgPath+'/arrowDown.png'">
	        </div>
	        <div class="mgt10">
		    	<div class="weightRange pd10" v-show="searchOption.weightRange.show">
					<div>
						<div @click="replaceWeightRange(-1)" :class="-1==searchOption.weightRange.curIndex?'blue':''">全部</div>
						<!-- <div class="mgt10" v-for="(range,index) in tonageAreaList" :class="index==searchOption.weightRange.curIndex?'blue':''" @click="replaceWeightRange(index)">{{range.theStartVal}}吨-{{range.theEndVal}}吨</div> -->
					</div>
					<div class="mgt10">
						<input class="rangeInput" v-model="searchOption.weightRange.theStartVal" type="number" placeholder="输入最低区间">
						<span class="fontGrey">-</span>
						<input class="rangeInput" v-model="searchOption.weightRange.theEndVal" type="number" placeholder="输入最高区间">
						<span class="blueBackBtnsm fr" @click="replaceWeightRange()">确定</span>
					</div>
	        	</div>
	        	<div class="loadGoodsDate pd10" v-show="searchOption.loadGoodsDate.show">
		        	<input class="rangeInput" v-model="searchOption.loadGoodsDate.startDate"  type="date" placeholder="选择时间">
		          	<span class="fontGrey">-</span>
		          	<input class="rangeInput" v-model="searchOption.loadGoodsDate.endDate" type="date" placeholder="选择时间">
		          	<span class="blueBackBtnsm fr" @click="replacLoadGoodsDate">确定</span>
		        </div>
		    </div>
	    </div>
	    <div>
	    	<div class="emptyShipPort" v-show="searchOption.loadGoodsPort.show" >
		      	<v-port-select v-on:selectportdone="replacePort1" :portlist="portList"></v-port-select>
		    </div>
		    <div class="emptyShipPort" v-show="searchOption.unloadGoodsPort.show" >
		      	<v-port-select v-on:selectportdone="replacePort2" :portlist="portList"></v-port-select>
		    </div>
	    </div>
	    
	    <div class="goodsList pd5">
	    	<div>
	    		<v-goods-item class="mgt5"></v-goods-item>
	    		<v-goods-item class="mgt5"></v-goods-item>
	    	</div>
	    </div>
    	<v-shade v-show="shadeShow" @click.native="hideShade()"></v-shade>
	</div>
	
</template>

<script>
import commonData from '@/components/common/commonData'
import shade from '@/components/common/shade'
import portSelect from '@/components/common/portSelect'
import goodsItem from '@/components/common/goodsItem'
export default {
	name: 'findGoods',
	data () {
		return {
			imgPath:"../../static/img",
			shadeShow:false,
			headerZIndex:4,
		  	searchOption:{
		        loadGoodsPort:{
		          	showstr:"装货港",
		          	show:false,
		          	loadPortId:0,
		          	loadPortType:0
		        },
		        unloadGoodsPort:{
		          	showstr:"卸货港",
		          	show:false,
		          	loadPortId:0,
		          	loadPortType:0
		        },	
		        weightRange:{
		          	showstr:"货量区间",
		          	show:false,
		          	curIndex:-2,
		          	theStartVal:"",
		          	theEndVal:""
		        },
		        loadGoodsDate:{
			        showstr:"装货日期",
			        startDate:"",
			        endDate:"",
			        show:false,
		        },
		    },
		    portList:[],
		}
	},
	components: {
	    'v-shade': shade,
	    'v-port-select':portSelect,
	    'v-goods-item':goodsItem,
  	},
  	created(){
  		var _this=this;
  		this.$http.get(commonData.url+'Common/readPortList')
    	.then(function (response) {
    		var data=response.data.RetData;

		var newData=data;
		newData.unshift({proviceName:"全部",proviceId:"0",selected:true,citys:[]});
		for (var i = data.length - 1; i >= 0; i--) {
			newData[i].selected=false;
		}

		for(var i = data.length - 1; i >= 0; i--) {
			newData[i].citys.unshift({cityName:"全部",cityId:"0",ports:[]});
			for (var j=data[i].citys.length - 1; j >= 0; j--) {
			  newData[i].citys[j].selected=false;
			}
		}
		for(var i = data.length - 1; i >= 0; i--) {
			for (var j=data[i].citys.length - 1; j >= 0; j--) {
				newData[i].citys[j].ports.unshift({portName:"全部",portId:"0"});
				for(var k=data[i].citys[j].ports.length - 1; k >= 0; k--){
			    	newData[i].citys[j].ports[k].selected=false;
			  	}
			}
		}
		_this.portList=newData;
    	})
    	.catch(function (error) {
	    	console.log(error);
	    });
  	},
	methods:{
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
	      	if (name=="loadGoodsPort"||name=="unloadGoodsPort") {
	        	this.headerZIndex=4;
	      	}else{
	        	this.headerZIndex=6;
	      	}
	    },
	    hideShade(){
      		this.shadeShow=false;
      		for (var key in this.searchOption) {
        		this.searchOption[key].show=false;
      		}
    	},
    	replacePort1(portInfo){
			this.hideShade();
			var replaceStr="全部";
			//港口有值
			if (portInfo[2]!=0) {
				replaceStr=this.portList[portInfo[0]].citys[portInfo[1]].ports[portInfo[2]].portName;
				this.searchOption.loadGoodsPort.loadPortId=this.portList[portInfo[0]].citys[portInfo[1]].ports[portInfo[2]].portId;
				this.searchOption.loadGoodsPort.loadPortType=0;
			}
			//城市有值
			else if(portInfo[1]!=0){
				replaceStr=this.portList[portInfo[0]].citys[portInfo[1]].cityName;
				this.searchOption.loadGoodsPort.loadPortId=this.portList[portInfo[0]].citys[portInfo[1]].cityId;
				this.searchOption.loadGoodsPort.loadPortType=1;
			}
			//省份有值
			else if (portInfo[0]!=0) {
				replaceStr=this.portList[portInfo[0]].proviceName;
				this.searchOption.loadGoodsPort.loadPortId=this.portList[portInfo[0]].proviceId;
				this.searchOption.loadGoodsPort.loadPortType=2;
			}
			this.searchOption.loadGoodsPort.showstr=replaceStr;
			//this.getShipList(2);
		},
		replacePort2(portInfo){
			this.hideShade();
			var replaceStr="全部";
			//港口有值
			if (portInfo[2]!=0) {
				replaceStr=this.portList[portInfo[0]].citys[portInfo[1]].ports[portInfo[2]].portName;
				this.searchOption.unloadGoodsPort.loadPortId=this.portList[portInfo[0]].citys[portInfo[1]].ports[portInfo[2]].portId;
				this.searchOption.unloadGoodsPort.loadPortType=0;
			}
			//城市有值
			else if(portInfo[1]!=0){
				replaceStr=this.portList[portInfo[0]].citys[portInfo[1]].cityName;
				this.searchOption.unloadGoodsPort.loadPortId=this.portList[portInfo[0]].citys[portInfo[1]].cityId;
				this.searchOption.unloadGoodsPort.loadPortType=1;
			}
			//省份有值
			else if (portInfo[0]!=0) {
				replaceStr=this.portList[portInfo[0]].proviceName;
				this.searchOption.unloadGoodsPort.loadPortId=this.portList[portInfo[0]].proviceId;
				this.searchOption.unloadGoodsPort.loadPortType=2;
			}
			this.searchOption.unloadGoodsPort.showstr=replaceStr;
			//this.getShipList(2);
		},
		replacLoadGoodsDate(){
			this.hideShade();
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
.searchOption{
	padding: 0.5em;
	.arrow{
		width: 1em;
		height: 1em;
		float: right;
		margin-right: 0.5em;
	}
}
.goodsList{
	margin-top: 1.5em;
	background-color: @grey;
}
</style>
