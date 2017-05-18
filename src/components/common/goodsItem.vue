<template>
	<router-link :to="{ name: 'goodsDetail',params: { goodsInfo: JSON.stringify(item) }}"  tag="div">
		<div class="shipItem pd10">
			<div class="clearfix ">
				<div class="clearfix mgt5">
					<div class="wh33p">
						<div class="city">{{item.startParentPort}}</div>
						<div>{{item.startPort}}</div>
					</div>
					<div class="wh33p textCenter">
						<div>{{item.goodsName}}</div>
						<div>
							<img class="arrowRight" :src="imgPath+'/arrowRight.png'">
						</div>
						<div>{{item.cargoVolume+"±"+item.addVolume}}</div>
					</div>
					<div class="wh33p textRight">
						<div class="city">
							<span>{{item.endParentPort}}</span>
						</div>
						<div>{{item.endPort}}</div>
					</div>
				</div>
			</div>
			<div class="bottom clearfix">
				<span class="date">{{item.loadDate?item.loadDate.substr(5):""}}{{"±"+item.loadAddDay}}</span>
				<span class="darkerGrey">受载</span>
				<span class="fr darkerGrey">{{item.dr_unit?"元/天":"元/吨/天"}}{{item.Tax?"含税":"不含税"}}</span>
				<span class="fr money">{{"¥"+item.price}}</span>
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'shipItem',
	data () {
		return {
			imgPath: '../../../static/img'
		}
	},
	props: ['item'],
	mounted(){
	},
	methods:{
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
.money{
	color: @orange;
	font-weight: bold;
	font-size: 1.2em;
	vertical-align: middle;
}
.city{
	font-size: 1.2em;
	vertical-align: middle;
	margin-bottom: 0.2em;
}


.arrowRight{
	width: 6em;
	vertical-align: top;
	height: 0.5em;
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



</style>