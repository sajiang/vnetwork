<template>
	<router-link :to="{ name: 'shipDetail', params: { shipInfo: JSON.stringify(item) }}"  tag="div">
		<div class="shipItem">
			<div class="clearfix pd10">
				<div class="wh90p">
					<div>
						<span class="bigName">{{item.cnShipName}}</span>
						<img v-if="item.theTrue" class="vip" :src="imgPath+'/vip.png'">
						<img v-else class="vip" :src="imgPath+'/unvip.png'">
						<span class="ton">{{item.loadTon}}T</span>
						<img v-show="item.Recommend" class="recommend" :src="imgPath+'/recommend.png'">
						<span class="fr date">{{item.loadDate}}</span>
					</div>
					<div class="clearfix mgt5">
						<div class="wh33p">
							<div class="city">{{item.startCityName}}</div>
							<div>{{item.startPortName}}</div>
						</div>
						<div class="wh33p textCenter">
							<div>{{item.goodsName}}</div>
							<div>
								<img class="arrowRight" :src="imgPath+'/arrowRight.png'">
							</div>
						</div>
						<div class="wh33p textRight">
							<div class="city">
								<span class="circle">空</span>
								<span>{{item.endCityName}}</span>
							</div>
							<div>{{item.endPortName}}</div>
						</div>
					</div>
				</div>
				<!-- 添加货盘的+号（下一版本再放出来） -->
				<!-- <div class="wh10p textCenter">
					<img @click.stop="chosenItem()" class="chosenItem" :src="item.chosen?imgPath+'/reduce.png':imgPath+'/add.png'">
				</div> -->
			</div>
			<div class="navigationInfo">
				<span>{{item.positionText}}</span>
				<img class="speed" :src="imgPath+'/speed.png'">
				<span>{{item.speed}}</span>
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
	</router-link>
</template>

<script>
export default {
	name: 'shipItem',
	data () {
		return {
			imgPath: '../../../static/img',
			marginLeft:"",
			undoLength:"",
		}
	},
	props: ['item'],
	mounted(){
		//根据progress算船的margin-left
		if (this.item.stage<0) {
			this.item.stage=0;
		}
     	var total=document.getElementsByClassName("progress")[0].offsetWidth;
		var ship=document.getElementsByClassName("shipIcon")[0].offsetWidth;
		this.marginLeft= (total-ship)*this.item.stage/100;
		this.undoLength= total-(total-ship)*this.item.stage/100-ship/2;

	},
	methods:{
		chosenItem(){
			this.item.chosen=!this.item.chosen;
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/common.less';
.shipItem{
	background-color: white;
	.rounded-corners(2px);
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
.speed{
	width: 0.7em;
	height: 0.7em;
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
	.textCenter;
	margin-top: -0.5em;
	border-top: 1px #E2E2E2 solid;
	padding-top: 0.4em;
	font-size: 0.8em;
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

</style>