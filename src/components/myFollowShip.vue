<template>
	<div class="myFollowShip">
		<div class="shipList pd10"  @touchmove="lazyLoading($event)">
			<div v-if="shipList.length==0" class="textCenter">
				您暂无关注船舶。
			</div>
			<div v-for="(item,index) in shipList" class="shipItem mgb10 clearfix pd10" @click="toShipDetail(item)">
				<img class="shipIcon" :src="item.icon?item.icon:imgPath+'/deleteLater.png'">
				<span class="bigName">{{item.cnShipName}}</span>
				<img v-if="item.theTrue" class="vip" :src="imgPath+'/vip.png'">
				<img v-else class="vip" :src="imgPath+'/unvip.png'">
				<span class="darkerGrey">{{item.loadTon}}T</span>
				<img class=" star fr" :src="imgPath+'/follow.png'" @click.stop  ="unstar(item.shipId)">
			</div>
		</div>
		
	</div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
	name: 'myFollowShip',
	data () {
	return {
		  	imgPath:"../../static/img",
		  	shipList:[],
		  	pageIndex:1,
		  	curTotalPage:1,
		  	lazyLoadingCount:0,
		}
	},
	created(){
  		this.getShipList();
  	},
  	activated(){
  		this.getShipList();
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
	            		this.getShipList(this.pageIndex);
	         		}else{
	           			alert("没有更多数据啦");
	          		}
	        	}
	        	this.lazyLoadingCount=0;
	      	}
	    },
  		getShipList(page){
  			var _this=this;
  			var page=page?page:1;
  			var postData={
  				page,
  				pageSize:10
  			}
			this.$http.post(commonData.url+'ship/readShipAttentionList',postData)
      		.then(function (response) {
				if (response.data.RetCode==0) {
					_this.curTotalPage=response.data.TotalPage;
					if (page==1) {
						_this.shipList=response.data.RetData;
					}else{
						_this.shipList=_this.shipList.concat(response.data.RetData);
					}
				}
			});
  		},
  		unstar(shipId){
  			if (window.localStorage.isNoticedFollowCancel!=1) {
  				window.localStorage.isNoticedFollowCancel=1;
  				if(!confirm("是否取消关注？")){
  					return;
  				}
  			}
  			var _this=this;
        	var postData={
          		shipId,
          		type:2   //取消关注
        	};
        	this.$http.post(commonData.url+'ship/exeShipAttention',postData)
        	.then(function (response) {
          		if (response.data.RetCode==0) {
            		_this.getShipList();
          		}
        	});
  		},
  		toShipDetail(item){
  			this.$router.push({ name: 'shipDetail', params: { shipInfo: JSON.stringify(item) }})
  		}
  	}
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.shipIcon{
	.circleImg;
	height: 2em;
	width: 2em;
}
.vip{
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
.star{
	width: 1.5em;
	height: 1.5em;
}
.shipList{
	background-color: @grey;
	.shipItem{
		background-color: white;
	}
}
</style>
