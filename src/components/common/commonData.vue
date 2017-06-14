<script type="text/javascript">
const url = "http://192.168.0.230:88/api/";
/*const url = "http://weixin.sspp.co/api/";*/
function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
function getCookie(name)
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
} 
function checkLoginStatus(_this){
	/*if(getCookie("micoLogKey")){
		return true;
	}else{
		_this.$router.push({ name: 'changeLoginStatus'})
	}*/
  if (!_this) {
    _this=window._this;
  }
  if (sessionStorage.getItem("isLogin")==1 && window.localStorage.curType==window.localStorage.type) {
    //状态为登录并且不用更改身份
    return true;
  }else if (sessionStorage.getItem("isLogin")==1) {
    //状态为登录但是需要更改身份
    _this.$router.push({ name: 'changeLoginStatus'});
  }else{
    //没登录,跳改变身份页面
      _this.$router.push({ name: 'changeLoginStatus'});
  }
}
export default
{
  url,
  setCookie,
  getCookie,
  checkLoginStatus,
}
</script>