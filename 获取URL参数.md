```
function getUrlparam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
```
 例如：`www.baidu.com?arg=123&par=456;getUrlparam(arg)；`结果是`123`
