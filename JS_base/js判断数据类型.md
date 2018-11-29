 #### js中的数据类型包括：
```
基本数据类型（5种）：number、string、 boolean、undefined、null

引用数据类型（3种）：object、array、function
```

> 其实js判断数据类型一共有四种方法，但能完全准确地识别出它们的只有一种。

> 主要是**typeof**、**instanceof**、 **Object.prototype.toString**

### 一. typeof
```
   typeof num //number
   typeif str //string
   typeof bool //boolean
   typeof arr //object
   typeof obj //object
   typeof func//function
   typeof und //undefined
   typeof nul //object
   typeof date //object
   tyepof reg //object
   tyoeof error //object
```
> 解析：typeof**可以识别基本类型值**(比如:number,string,boolean,undefined,除了null)，但对于复合类型(Object,Array,Function)却只能识别Function。
```
此处typeof `undefined`可以识别出正确的类型值，但null被归类到`Object`大家庭中。
对于此处的 date、reg 、error 类型都是实例后的对象，typeof并不会深入识别他们的`构造函数`(这里不是数据类型)。
显然typeof并不能处理这种复杂的类型。
```

### 二. instanceof

通过上面的typeof判断，我们知道它并**不能识别引用类型**一些内置构造函数创建的伪类型。
```
   num instanceof Number  //false
   str instanceof String   //false
   bool instanceof Boolean   //false
   und instanceof  Object   //false
    nul instanceof   Object  //false
    
   arr instanceof Array  //true
    obj instaneof Object  //true
    func instanceof Function  //true
    date instanceof Date //true
    reg instanceof RegExp //true
    error instanceof Error //true
 ```
> 解析:这里我们使用instanceof来复合判断**引用数据类型**是否为对应类型。instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置，基础数据类型不是对象，所以结果均为false。

### 三. constructor
```
  num.constructor .name    //Numer
  str.constructor.name  //String
  bool.constructor.name  //Boolean
  arr.constructor.name  //Array
  obj.constructor.name  //Objeact
  func.constructor.name  //Function
  und.constructor.name  // TypeError
  nul.constructor.name  //TypeError
  date.constructor.name //Date
  reg.constructor.name // RegExp
  error.constructor.name //Error
```
> 上面除了undefined 和 null 类型错误(两者都没有属性值)之外, 其他都可以获得我们想要的数据类型。
> 但实际真的如此吗？
``` 
  // 1
  var Structure =  function (){ }
  
  var ins = new Structure();
 
  ins.constructor.name  //Structure 
 
 //2
  
   var Person = function(){}
   var Student = function(){}
   
   Person.prototype = new Student();
   var obj = new Person();
   
   obj.constructor === Student
```

> 解析：由于对象的构造函数的原型链指向是`可变的`，`不准确的`，所以我们还是无法准确的通过constructor获得具体的类型.

### 四. [[class]]

> 解析：此[[class]]指的是隐藏在javascript内部的分类属性，它不可读，不可枚举，不可修改，不可配置。（两边出现__下划线__的属性都属于部分浏览器支持的属性。[[]]两个中括号括起来的属性属于JavaScript内部属性。），我记得上一章说过，JavaScript中一切皆为对象的理念,我们可以强制把它转换成字符串，使它暴露出内部的[[class]]属性。

```
Object.prototype.toString.call(num);   //  "[object Number]"
Object.prototype.toString.call(str);   //  "[object String]"
Object.prototype.toString.call(bool);  //  "[object Boolean]"
Object.prototype.toString.call(arr);   //  "[object Array]"
Object.prototype.toString.call(func);  //  "[object Function]"
Object.prototype.toString.call(und);   //  "[object Undefined]"
Object.prototype.toString.call(nul);   //  "[object Null]"
Object.prototype.toString.call(date);  //  "[object Date]"
Object.prototype.toString.call(reg);   //  "[object RegExp]"
Object.prototype.toString.call(error);  //  "[object Error]"
 
arr instanceof Array  //true
    obj instaneof Object  //true
    func instanceof Function  //true
        und instanceof  Object   //false
        nul instanceof   Object  //false
        date instanceof Date //true
    reg instanceof RegExp //true
    error instanceof Error //true
    
```

> 我们通过 Object 的 toString 方法来查看了当前对象的数据类型，我们看到使用这种方式可以完美的查看对应的数据类型，正是我们想要的，而且每个对象都有属于自己的[[class]]，我们可以理解为，它是JavaScript根据内置构造函数做出的内部分类。

> 对于这种经常使用原生js又难以需求的情况下，怎么能少得了jquery呢？

以下是与jQuery.type()函数相关的jQuery示例代码：
```
jQuery.type( undefined ); // "undefined"
jQuery.type( null ); // "null"
 
jQuery.type( true ); // "boolean"
jQuery.type( new Boolean(true) ); // "boolean"
 
jQuery.type( 3 ); // "number"
jQuery.type( new Number(3) ); // "number"
 
jQuery.type( "test" ); // "string"
jQuery.type( new String("test") ); // "string"
 
jQuery.type( function(){} ); // "function"
jQuery.type( new Function() ); // "function"
 
jQuery.type( [] ); // "array"
jQuery.type( new Array() ); // "array"
 
jQuery.type( new Date() ); // "date"
 
jQuery.type( new Error() ); // "error" // jQuery 1.9 新增支持
 
jQuery.type( /test/ ); // "regexp"
jQuery.type( new RegExp("\\d+") ); // "regexp"
 ```
> jquery内部也是通过我们刚才说到的 [[class]]的方式实现的，它返回一个字符串，固定为小写字母。
> 我们可以写行代码，来简单的实现jquery中的type方法
```
function type(o){
    var s  = Object.prototype.toString.call(o);
    return s.slice(s.indexOf(" ")+1,s.length-1).toLowerCase();
}
 
type(false) //boolean
type({}) //object
type([]) //array
type("") //string
type(/^/) //regexp
```

[原文链接地址：https://segmentfault.com/a/1190000009476174](https://segmentfault.com/a/1190000009476174)
