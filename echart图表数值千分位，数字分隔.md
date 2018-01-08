> 当echart用来绘制金额图表的时候，要求金额3位一分隔，即金额千分位。
> 例如：399999→399,999
### 解决方法
```
series: [{  
  name : '万元',  
  type : 'bar',  
  stack : '万元',  
  label : {  
      normal : {  
          show : true,  
          position: 'top',  
          formatter:function(a,b,c){  
              var result = [ ], counter = 0;  
              var num_array = a.data.split('.');  
              var num = num_array[0];  
              var newstr = '';  
              for (var i = num.length - 1; i >= 0; i--) {  
                  counter++;  
                  result.unshift(num[i]);  
                  if (!(counter % 3) && i != 0) { result.unshift(','); }  
              }  
              if(num_array.length>1){  
                  newstr = result.join('');  
                  newstr += '.'+num_array[1];  
                  return newstr;  
              }else{  
                  return result.join('');  
              }  
          },  
      },  
  },  
```
[参考地址：echart金额千分位，数字分隔方法](http://blog.csdn.net/wu920604/article/details/53410706)
