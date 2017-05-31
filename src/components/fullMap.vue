<template>
  <div class="fullMap">
   
    <div id="fullMap"></div>
  </div>
</template>

<script>
import AMap from 'AMap';
import commonData from '@/components/common/commonData'
export default {
  	name: 'fullMap',
  	data () {
    	return {
      		map: {},
    	}
  	},
  	mounted(){
		this.initMap();
	},
	activated() {
	    this.initMap();
	},
	methods:{
		initMap(){
			this.shipInfo=JSON.parse(this.$route.params.shipInfo);
			var map = new AMap.Map('fullMap', {
	      		resizeEnable: true,
	      		zoom:5,
	      		center: [this.shipInfo.longitude, this.shipInfo.latitude]
	    	});
	    	var info = [];
	        var curposition=this.shipInfo.positionText?this.shipInfo.positionText:"暂无"
	        info.push("当前所在位置："+curposition);
	        info.push("经度:"+this.shipInfo.longitude.substring(0,8));
	        info.push("纬度:"+this.shipInfo.latitude.substring(0,7));

	        var infoWindow = new AMap.InfoWindow({
	           content: info.join("<br>")  //使用默认信息窗体框样式，显示信息内容
	        });
	        infoWindow.open(map, [this.shipInfo.longitude,this.shipInfo.latitude]);
	        var marker = new AMap.Marker({
				position: [this.shipInfo.longitude, this.shipInfo.latitude]
			});
			marker.setMap(map);
		},
	}
}
</script>

<style scoped>
#fullMap{
	width: 100%;
	height: 50em;
}
</style>
