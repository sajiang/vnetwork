<template>
  <div class="portSelect">
    <div class="wh30p height100">
    	<div @click="chosen('0',index)" class="item" :class="item.selected?'selected':'false'" v-for="(item,index) in curProvices">{{item.proviceName}}</div> 
    </div>
    <div class="wh30p height100">
    	<div @click="chosen('1',index)" class="item" :class="item.selected?'selected':'false'"  v-for="(item,index) in curCitys">{{item.cityName}}</div>
    </div>
    <div class="wh40p height100">
    	<div @click="chosen('2',index)" class="item" :class="item.selected?'selected':'false'" v-for="(item,index) in curPorts">{{item.portName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portSelect',
  data () {
    return {
      proviceIndex:0,
      cityIndex:0,
      portIndex:0,
    }
  },
  props:["portlist"],
  computed:{
    curProvices(){
      if (this.portlist&&this.portlist.length>0) {
        return this.portlist;
      }
    },
    curCitys(){
      if (this.portlist&&this.portlist.length>0) {
        return this.portlist[this.proviceIndex].citys;
      }
    },
    curPorts(){
      if (this.portlist&&this.portlist.length>0) {
        return this.portlist[this.proviceIndex].citys[this.cityIndex].ports;
      }
    }
  },
  methods:{
    chosen(type,index){
      //选择省份
      if (type==0) {
        this.proviceIndex=index;
        this.cityIndex=0
        this.portIndex=0
        for (var i = this.curProvices.length - 1; i >= 0; i--) {
          this.curProvices[i].selected=false;
        }
        for (var i = this.curProvices[this.proviceIndex].citys.length - 1; i >= 0; i--) {
          this.curProvices[this.proviceIndex].citys[i].selected=false;
        }
        this.curProvices[index].selected=true;

      }
      //选择市
      else if (type==1) {
        this.cityIndex=index;
        this.portIndex=0;
        for (var i = this.curProvices[this.proviceIndex].citys.length - 1; i >= 0; i--) {
          this.curProvices[this.proviceIndex].citys[i].selected=false;
        }
        for (var i = this.curProvices[this.proviceIndex].citys[this.cityIndex].ports.length - 1; i >= 0; i--) {
          this.curProvices[this.proviceIndex].citys[this.cityIndex].ports[i].selected=false;
        }
        this.curProvices[this.proviceIndex].citys[index].selected=true;
      }
      //选择港口
      else{
        this.portIndex=index;
        for (var i = this.curProvices[this.proviceIndex].citys[this.cityIndex].ports.length - 1; i >= 0; i--) {
          this.curProvices[this.proviceIndex].citys[this.cityIndex].ports[i].selected=false;
        }
        this.curProvices[this.proviceIndex].citys[this.cityIndex].ports[index].selected=true;

        this.$emit("selectportdone",[this.proviceIndex,this.cityIndex,this.portIndex]);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/color.less';
.portSelect{
	background-color: white;
	padding-left: 0.5em;
	position: fixed;
	width: 80%;
	height: 100%;
	top:0em;
	z-index: 10;
}
.height100{
	height: 100%;
	overflow: scroll;
}
.item{
	margin-top: 1.3em;
}
.selected{
	color:@blue !important;
}
</style>