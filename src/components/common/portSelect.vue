<template>
  <div class="portSelect">
    <div class="titles">
      <div class="title wh30p">省份</div>
      <div class="title wh30p">市级</div>
      <div class="title wh40p">港口</div>
    </div>
    <div class=" clearfix list height100">
      <div class="wh30p height100">
      
      <div @click="chosen('0',index)" v-if="index>0" class="item" :class="item.selected?'selected':''" v-for="(item,index) in curProvices">{{item.proviceName}}</div> 
    </div>
    <div class="wh30p height100">
      
      <div @click="chosen('1',index)" v-if="index>0" class="item" :class="item.selected?'selected':''"  v-for="(item,index) in curCitys">{{item.cityName}}</div>
    </div>
    <div class="wh40p height100">
      
      <div @click="chosen('2',index)" v-if="index>0" class="item" :class="item.selected?'selected':''" v-for="(item,index) in curPorts">{{item.portName}}</div>
    </div>
    </div>
    <div class="clearfix bottom">
      <div class="wh50p reset" @click="reset">重置</div>
      <div class="wh50p confirmSelect" @click="confirmSelect">确定</div>
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
      pros:{},
    }
  },
  props:["portlist"],
  computed:{
    curProvices(){
      if (this.portlist&&this.portlist.length>0) {
        var obj=JSON.parse( JSON.stringify( this.portlist ) );
        return obj;
      }
    },
    curCitys(){
      if (this.portlist&&this.portlist.length>0) {
        return this.curProvices[this.proviceIndex].citys;
      }
    },
    curPorts(){
      if (this.portlist&&this.portlist.length>0) {
        return this.curProvices[this.proviceIndex].citys[this.cityIndex].ports;
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
        this.confirmSelect();
      }
    },
    reset(){
      this.proviceIndex=0;
      this.cityIndex=0
      this.portIndex=0
      for (var i = this.curProvices.length - 1; i >= 0; i--) {
          this.curProvices[i].selected=false;
      }
      for (var i = this.curProvices[this.proviceIndex].citys.length - 1; i >= 0; i--) {
        this.curProvices[this.proviceIndex].citys[i].selected=false;
      }
    },
    confirmSelect(){
      this.$emit("selectportdone",[this.proviceIndex,this.cityIndex,this.portIndex]);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/common.less';
.portSelect{
	background-color: white;
	
	position: fixed;
	width: 80%;
	height: 100%;
	top:0em;
	z-index: 10;
  .titles{
    padding-left: 0.5em;
    .title{
      padding: 0.5em 0em;
      border-bottom: 1px @grey solid;
    }
  }
  
  .list{
    padding-left: 0.5em;
    
  }
}
.height100{
	height: 100%;
	overflow: scroll;
}
.item{
	margin-top: 1.3em;
}
.selected{
	color:@orange !important;
}
.bottom{
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0em;
  width: 100%;
  background-color: red;
  .reset{
    .linearToRight(#ff9000,#ff620c);
     padding: 0.7em 0em;
  }
  .confirmSelect{
    .linearToRight(#ea461a,#ed1e08);
    padding: 0.7em 0em;
  }
}
</style>