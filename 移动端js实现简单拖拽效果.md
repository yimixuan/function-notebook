```
var touchDownX,touchDownY,initX,initY,flag = false;
         $('#myImg').bind('touchstart',function(e){
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          touchDownX=touch.pageX;
          touchDownY=touch.pageY;
          initX = parseFloat($('#myImg').css('left'));  
          initY = parseFloat($('#myImg').css('top')); 
          flag = true;
         })

        $('#myImg').bind('touchmove',function(e){
          e.preventDefault();
          if(flag){
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var touchMoveX = touch.pageX;
            var touchMoveY = touch.pageY;
            var _left = parseInt(touchMoveX) - parseInt(touchDownX) + parseInt(initX);
            var _top = parseInt(touchMoveY) - parseInt(touchDownY) + parseInt(initY);
  //            if(_left >= 0){
  //               _left=0;
  //            }else if(_left <= -($(this).outerWidth()-$('.dragWrap').outerWidth())){
  //               _left = -($(this).outerWidth()-$('.dragWrap').outerWidth());
  //            }
  //            if(_top >= 0){
  //               _top = 0;
  //            }else if(_top<=-($(this).outerHeight()-$('.dragWrap').outerHeight())){
  //               _top = -($(this).outerHeight()-$('.dragWrap').outerHeight());
  //            }
            $(this).css('left', _left+'px');
            $(this).css('top', _top+'px');
           }
        });
        $('#myImg').bind('touchend',function(e){
          flag = false;
        })
 ```
 [参考地址：JS拖拽原来及实现代码](http://blog.csdn.net/qczxl/article/details/50159555)
