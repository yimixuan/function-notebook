### 项目需求:首页弹窗每天用户首次进入出现一次
```
if(acSartTime<servertime && acEndTime>servertime){//活动范围内
        if(getCookie('activityFlag')!=null){//已经弹过
            $('.Dialog').hide();//业务逻辑
        }else{//没有弹过
            $('.Dialog').show();//业务逻辑

            var now = new Date();
            var h = now.getHours();
            var m = now.getMinutes();
            var s = now.getSeconds();
            var Onow = h*60*60*1000+m*60*1000+s*1000;//目前已过时间
            var long = 24*60*60*1000 - Onow;
            setCookie('activityFlag',1,long);//存储cookie并设置过期时间
        }
    };
    function setCookie(name,value,days){//设置cookie
        var d = new Date();
        d.setTime(d.getTime() + days);
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + "; path=/;" + expires;
    };
    function getCookie(key) {
        var str_cookie = document.cookie;
        var list = str_cookie.split("; ");
        for(var i in list) {
            var kvs = list[i].split("=");
            if(kvs[0]==key){
                return kvs[1];
            }
        }
        return null;
    };
```
