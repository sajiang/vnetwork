<template>
	<div class="findGoods">
		<div class="clearfix searchOption">
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
	    </div>
	    <div>
	    	<div class="emptyShipPort" v-show="searchOption.loadGoodsPort.show" >
		      	<v-port-select v-on:selectportdone="replacePort" :portlist="portList"></v-port-select>
		    </div>
		    <div class="emptyShipPort" v-show="searchOption.unloadGoodsPort.show" >
		      	<v-port-select v-on:selectportdone="replacePort" :portlist="portList"></v-port-select>
		    </div>
	    </div>
	    <div class="goodsList">
	    	<div>
	    		<v-goods-item></v-goods-item>
	    	</div>
	    </div>
	</div>
	
</template>

<script>
import shade from '@/components/common/shade'
import portSelect from '@/components/common/portSelect'
import goodsItem from '@/components/common/goodsItem'
export default {
	name: 'findGoods',
	data () {
		return {
			imgPath:"../../static/img",
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
	      	/*if (name=="emptyShipPort") {
	        	this.headerZIndex=4;
	      	}else{
	        	this.headerZIndex=6;
	      	}*/
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
	}
}
</script>

<style lang="less" scoped>
.searchOption{
	padding: 0.5em;
	.arrow{
		width: 1em;
		height: 1em;
		float: right;
		margin-right: 0.5em;
	}
}

</style>
