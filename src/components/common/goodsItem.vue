<template>
	<router-link :to="{ name: 'goodsDetail'}"  tag="div">
		<div class="shipItem pd10">
			<div class="clearfix ">
				<div class="clearfix mgt5">
					<div class="wh33p">
						<div class="city">{{"福州"}}</div>
						<div>{{"闽江口"}}</div>
					</div>
					<div class="wh33p textCenter">
						<div>{{"沙河"}}</div>
						<div>
							<img class="arrowRight" :src="imgPath+'/arrowRight.png'">
						</div>
						<div>{{"5000±500"}}</div>
					</div>
					<div class="wh33p textRight">
						<div class="city">
							<span>{{"北海"}}</span>
						</div>
						<div>{{"铁山港"}}</div>
					</div>
				</div>
			</div>
			<div class="bottom clearfix">
				<span class="date">{{"12-09±3"}}</span>
				<span class="darkerGrey">受载</span>
				<span class="fr darkerGrey">{{"元/吨"+"含税"}}</span>
				<span class="fr money">{{"¥15"}}</span>
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