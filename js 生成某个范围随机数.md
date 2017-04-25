js中 **Math.random()** 这个函数可以生成 [0,1) 的一个随机数。
利用它，我们就可以生成指定范围内的随机数。
而涉及范围的话，就有个边界值的问题。这样就包含四种情况：
+ min ≤ r ≤ max  (一般这种比较常见)
+ min ≤ r < max
+ min < r ≤ max
+ min < r < max

### 一、min ≤ r ≤ max

```
function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}
```

### 二、min ≤ r < max
```
function RandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.floor(Rand * Range); //舍去
      return num;
}
```
### 三、min < r ≤ max
```
function RandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      if(Math.round(Rand * Range)==0){       
        return Min + 1;
      }
      var num = Min + Math.round(Rand * Range);
      return num;
}
```
### 四、min < r < max 
```
function RandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      if(Math.round(Rand * Range)==0){
        return Min + 1;
      }else if(Math.round(Rand * Max)==Max)
      {
        index++;
        return Max - 1;
      }else{
        var num = Min + Math.round(Rand * Range) - 1;
        return num;
      }
 }
 ```
 [原文地址](http://www.jb51.net/article/82747.htm)
 
