<template>
  <div class="loadPrice">
   
    <div class="info">
    	<span>{{new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()-1)}}沿海租船运价参考表</span>
    </div>
    <div class="goodsList">
		<div class="clearfix goodPrice" v-for="item in priceList">
			<div class="clearfix">
				<div class="wh20p">
					<div class="city">{{item.CourseStart}}</div>
				</div>
				<div class="wh30p textCenter">
					<div class="goodsType">{{item.GoodType}}</div>
					<div>
						<img class="arrowRight" :src="imgPath+'/arrowRight.png'">
					</div>
					<div>{{item.MinTonnage+"-"+item.MaxTonnage}}</div>
				</div>
				<div class="wh20p textRight">
					<div class="city">
						<span>{{item.CourseEnd}}</span>
					</div>
				</div>
				<div class="wh15p textCenter price">
					<span class=" orange">¥{{item.StartPrice}}</span>
				</div>
				<div class="wh15p textCenter tendency">
					<span :class="(!item.radio.startsWith('-'))?'orange':'blue'">{{item.radio=="0.00%"?"持平":item.radio}}</span>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import commonData from '@/components/common/commonData'
export default {
  name: 'loadPrice',
  data () {
    return {
      imgPath:"../../static/img",
      priceList:[],
    }
  },
  created(){
  	this.getPrice();
  },
  methods:{
  	getPrice(){
  		
  		var _this=this;
        this.$http.get(commonData.url+'goods/readGoodsTodayPrice')
        .then(function (response) {
			if (response.data.RetCode==0) {
				_this.priceList=response.data.RetData;
			}
        });
  	}
  }
}
</script>

<style lang="less" scoped>

.info{
	text-align: center;
	background-color: #D4E6F2;
	padding: 0.5em;
}
.goodsList{
	margin: 0em 0.5em;
}
.goodPrice{
	padding:1em 0em;
	border-bottom: 1px #EEE solid;
	.city{
		font-weight: bold;
		font-size: 1.1em;
		margin-top: 1em;
	}
	.arrowRight{
		width: 100%;
	}
	.price{
		font-weight: bold;
		font-size: 1.2em;
		margin-top: 1em;
	}
	.tendency{
		margin-top: 1.3em;
	}
	.goodsType{
		margin-bottom: -0.5em;
	}
}
</style>
