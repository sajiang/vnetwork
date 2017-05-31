<template>
	<div class="myFollowGoods">
		
		<div class="goodsList pd10"  @touchmove="lazyLoading($event)">
			<div v-if="goodsList.length==0" class="textCenter">
				您暂无关注货盘。
			</div>
			<div v-for="(item,index) in goodsList" class="goodsItem clearfix mgb10">
				<div class="wh90p">
					<v-goods-item :item="item"></v-goods-item>
				</div>
				<div class="wh10p mgt20">
					<img class="star" :src="imgPath+'/follow.png'" @click="unstar(item.goodsListId)">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import commonData from '@/components/common/commonData'
import goodsItem from '@/components/common/goodsItem'
export default {
	name: 'myFollowGoods',
	data () {
	return {
		  	imgPath:"../../static/img",
		  	goodsList:[],
		  	pageIndex:1,
		  	curTotalPage:1,
		  	lazyLoadingCount:0,
		}
	},
  	components: {
	    'v-goods-item':goodsItem,
  	},
  	created(){
  		this.getGoodsList();
  	},
  	activated(){
  		this.getGoodsList();
  	},
  	methods:{
  		lazyLoading(event){
	    	this.lazyLoadingCount++;
	      	if (this.lazyLoadingCount==10) {
		        var totalHeight=document.getElementsByClassName("goodsList")[0].scrollHeight;
		        var itemHeight=document.getElementsByClassName("goodsItem")[0].scrollHeight;
		        var scrollHeight=window.pageYOffset;
		        var screenHeight=window.screen.availHeight;
	        	if (totalHeight-scrollHeight-screenHeight-itemHeight<0) {
	          		if(++this.pageIndex<=this.curTotalPage){
	            		this.getGoodsList(this.pageIndex);
	         		}else{
	           			alert("没有更多数据啦");
	          		}
	        	}
	        	this.lazyLoadingCount=0;
	      	}
	    },
  		getGoodsList(page){
  			var _this=this;
  			var page=page?page:1;
  			var postData={
  				page,
  				pageSize:10
  			}
			this.$http.post(commonData.url+'goods/readGoodsAttentionList',postData)
      		.then(function (response) {
				if (response.data.RetCode==0) {
					_this.curTotalPage=response.data.TotalPage;
					if (page==1) {
						_this.goodsList=response.data.RetData;
					}else{
						_this.goodsList=_this.goodsList.concat(response.data.RetData);
					}
				}
			});
  		},
  		unstar(goodsListId){
  			if (window.localStorage.isNoticedFollowCancel!=1) {
  				window.localStorage.isNoticedFollowCancel=1;
  				if(!confirm("是否取消关注？")){
  					return;
  				}
  			}
  			var _this=this;
        	var postData={
          		goodsListId,
          		type:2   //取消关注
        	};
        	this.$http.post(commonData.url+'goods/exeGoodsAttention',postData)
        	.then(function (response) {
          		if (response.data.RetCode==0) {
            		_this.getGoodsList();
          		}
        	});
  		}
  	}
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';
.goodsList{
	background-color: @grey;
	.goodsItem{
		background-color: white;
	}
}
.star{
	width: 2em;
	height: 2em;
}
</style>
