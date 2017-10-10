### Meta标签中的apple-mobile-web-app-capable属性及含义
> 删除默认的苹果工具栏和菜单栏。content有两个值”yes”和”no”,当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。
### Meta标签中的apple-mobile-web-app-status-bar-style属性及含义 
> 控制状态栏显示样式。
> 默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。
> 注意： 若值为“black-translucent”将会占据页面px位置，浮在页面上方（会覆盖页面20px高度–iphone4和itouch4的Retina屏幕为40px）。
### Meta标签中的format-detection属性及含义
> 格式检测”，顾名思义，它是用来检测html里的一些格式的，那关于meta的format-detection属性主要是有以下几个设置：
```
meta name="format-detection" content="telephone=no"
meta name="format-detection" content="email=no"
meta name="format-detection" content="address=no" 
meta name="format-detection" content="date=no"
也可以连写：meta name="format-detection" content="telephone=no,email=no,adress=no"
```
下面具体说下每个设置的作用：
1. telephone
> 你明明写的一串数字没加链接样式，而iPhone会自动把你这个文字加链接样式、并且点击这个数字还会自动拨号！想去掉这个拨号链接该如何操作呢？telephone=no就禁止了把数字转化为拨号链接！
telephone=yes就开启了把数字转化为拨号链接，要开启转化功能，这个meta就不用写了,在默认是情况下就是开启！
2. email
> 告诉设备不识别邮箱，点击之后不自动发送
email=no禁止作为邮箱地址！
email=yes就开启了把文字默认为邮箱地址，这个meta就不用写了,在默认是情况下就是开启！
3. adress
> adress=no禁止跳转至地图！
adress=yes就开启了点击地址直接跳转至地图的功能,在默认是情况下就是开启！
### 
[参考：https://stackoverflow.com/questions/28027330/html-email-ios-format-detection](https://stackoverflow.com/questions/28027330/html-email-ios-format-detection)
