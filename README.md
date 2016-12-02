# function-notebook
## 倒计时
```
//servertiem 服务器时间  datatime 项目上线时间
		function timeCount(servertime,datatime,obj){
			
			if(datatime<servertime){
				$(".countdown").hide();
				clearInterval(timer);
				return false;
			} 
			var localtime = new Date();
			var timedifference = localtime-servertime;
			var timecount = interval(timedifference,datatime);
			obj.find("span").eq(0).html(timecount.charAt(0));
			obj.find("span").eq(1).html(timecount.charAt(1));
			obj.find("span").eq(2).html(timecount.charAt(2));
			obj.find("span").eq(3).html(timecount.charAt(3));
			obj.find("span").eq(4).html(timecount.charAt(4));
			obj.find("span").eq(5).html(timecount.charAt(5));
			var timer = setInterval(function(){
				timecount = interval(timedifference,datatime);
				if (!timecount){
					clearInterval(timer);
					$(".countdown").hide();
					return false;
				}
				else{
					obj.find("span").eq(0).html(timecount.charAt(0));
					obj.find("span").eq(1).html(timecount.charAt(1));
					obj.find("span").eq(2).html(timecount.charAt(2));
					obj.find("span").eq(3).html(timecount.charAt(3));
					obj.find("span").eq(4).html(timecount.charAt(4));
					obj.find("span").eq(5).html(timecount.charAt(5));	
				}
			},1000)	
		}
	 function interval(timedifference,datatime){
		var timecount = parseInt(datatime) + timedifference - new Date();
		if(timecount<=0)return false;
		var int_day, int_hour, int_minute, int_second;
		int_day = Math.floor(timecount/86400000);
		int_hour = Math.floor(timecount%86400000/3600000);
		int_minute = Math.floor(timecount%3600000/60000);
		int_second = Math.floor(timecount%60000/1000);
		 // 时分秒为单数时、前面加零站位
	        int_hour = int_day*24+int_hour;
	        if(int_hour < 10)
	        int_hour = "0" + int_hour;
	        if(int_minute < 10)
	        int_minute = "0" + int_minute;
	        if(int_second < 10)
	        int_second = "0" + int_second;
	    	var result = ""+int_hour+int_minute+int_second;
			return result;
	 }
   ```
## 文字轮播

   ```
   (function($){
	$.fn.myScroll = function(options){
	//默认配置
	var defaults = {
		speed:40,  //滚动速度,值越大速度越慢（定时器设置的时间）
		rowHeight:24 //每行的高度
	};
	
	var opts = $.extend({}, defaults, options);
	var intId = [];
	
	function marquee(obj, liHeight){
	
		obj.find("ul").animate({
			marginTop: '-=1'
		},0,function(){
				var ulMargintop = Math.abs(parseInt($(this).css("margin-top")));
			// $(this)指的是ul	
				if(ulMargintop >= liHeight){
					$(this).find("li").slice(0, 1).appendTo($(this));
					//将第一个li元素截取追加到ul末尾
					//（appendTo方法：如果是已存在的元素，它将从当前位置被移除，并在被选元素的结尾被插入）
					$(this).css("margin-top", 0);
				}
			});
		}
		// this表示ul父盒子
		this.each(function(i){
			var liHeight = opts["rowHeight"];
			var speed = opts["speed"];
			var _this = $(this);// this表示ul父盒子
			intId[i] = setInterval(function(){
				if(_this.find("ul").height()<=_this.height()){
					clearInterval(intId[i]);
				}else{
					marquee(_this, liHeight);
				}
			}, speed);

			//鼠标hover时清除定时器，移开继续
			_this.hover(function(){
				clearInterval(intId[i]);
			},function(){
				intId[i] = setInterval(function(){
					if(_this.find("ul").height()<=_this.height()){
						clearInterval(intId[i]);
					}else{
						marquee(_this, liHeight);
					}
				}, speed);
			});
		
		});

	}

})(jQuery);
```
