<template>
	<div class="telphonePanel">
		<div class="blue textCenter">
			<div class="panel">{{telphonenumber}}</div>
			<div class="btns clearfix">
				<div class="wh50p" @click="canel">取消</div>
				<div class="wh50p">
					<a :href="'tel:'+telphonenumber">拨打</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'telphonePanel',
	data () {
		return {
		  	msg: 'Welcome to Your Vue.js App'
		}
	},
	props:["telphonenumber"],
	methods:{
		canel(){
			this.$emit('canel');
		}
	}
}
</script>

<style scoped>
.telphonePanel{
	width: 20em;
	position: fixed;
	top: 35%;
	left: 50%;
	margin-left: -10em;
	background-color: white;
	z-index: 1000;
	box-shadow: 5px 5px 50px #CCCCCC;

}
.panel{
	padding:2em 0em;
}
.btns{
	padding:1em 0em;
}
</style>
