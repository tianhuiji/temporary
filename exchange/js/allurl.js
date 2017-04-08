// window.location.host    获取当前域名
var loc = window.location.host;
//
var ishttps = 'https:' == document.location.protocol ? true: false;
var allurl1 = '';
var allurl2 = "http://sjs.miaoa.com:1000/";
if(ishttps){

 allurl1 = "https://" + loc + "/";


}else{

 allurl1 = "http://" + loc + "/";


}



