<template>
  <div class="loadPrice">
   
    <div class="info">
    	<span>货盘目前正在审核，审核通过即推送成功</span>
    </div>
    <div class="goodPrice pd10">
		<div class="clearfix ">
			<div class="clearfix mgt5">
				<div class="wh20p">
					<div class="city">{{"福州"}}</div>
				</div>
				<div class="wh25p textCenter">
					<div>{{"沙河"}}</div>
					<div>
						<img class="arrowRight" :src="imgPath+'/arrowRight.png'">
					</div>
					<div>{{"5000-7000"}}</div>
				</div>
				<div class="wh20p textRight">
					<div class="city">
						<span>{{"北海"}}</span>
					</div>
				</div>
				<div class="wh20p textCenter price">
					<span class=" orange">¥24</span>
				</div>
				<div class="wh15p textCenter tendency">
					<span class="orange">+6.3%</span>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'loadPrice',
  data () {
    return {
      imgPath:"../../static/img",
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
.goodPrice{
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
		margin-top: 1.3
		em;
	}
}
</style>
