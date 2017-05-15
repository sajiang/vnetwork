<script type="text/javascript">
const url = "http://192.168.0.230:88/api/"
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
function checkLoginStatus(_this,data){
	if(getCookie("micoLogKey")){
		return true;
	}else{
		_this.$router.push({ name: 'changeLoginStatus', params: {loginInfo:data}})
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