<template>
	<div class="changeLoginStatus">
		<div class="title">
			切换身份
		</div>
		<div class="nomination" v-if="loginInfo.type='nomination'">
			<div v-if="loginInfo.to=='gooder'">
				<div>
					<img class="avatar" :src="imgPath+'/gooder.png'">
				</div>
				<div class="good">货主</div>
			</div>
			<div v-else-if="loginInfo.to=='shipper'">
				<div>
					<img class="avatar" :src="imgPath+'/shipper.png'">
				</div>
				<div class="ship">船东</div>
			</div>
		</div>
		<div class="chosen" v-else>
			
		</div>
		<div class="login" @click="bandPhoneNumber">
			<span class="blueBorderBtn">确定</span>
		</div>
		

	</div>
</template>

<script>
export default {
	name: 'changeLoginStatus',
	data () {
		return {
			imgPath: '../../../static/img',
	  		loginInfo: {}
		}
	},
	mounted() {
		this.loginInfo=this.$route.params.loginInfo;
	},
	methods:{
		bandPhoneNumber(){
			this.$router.push({ name: 'bandPhoneNumber', params: {loginInfo:this.loginInfo}});
		}
	}
}
</script>

<style lang="less" scoped>
@gooderColor:#18A187;
@shipperColor:#3E89C1;
.title{
	text-align: center;
	margin-top: 5em;
	font-size: 1.2em;
}
.nomination{
	text-align: center;
	margin-top: 4em;
	font-size: 1.1em;
	.avatar{
		width: 8em;
		height: 8em;
	}
	.good{
		margin-top: 1em;
		font-weight: bolder;
		color: @gooderColor;
	}
	.ship{
		margin-top: 1em;
		font-weight: bolder;
		color: @shipperColor;
	}
}
.login{
	text-align: center;
	margin-top: 3em;
	.blueBorderBtn{
		width: 50%;
	}
}
</style>