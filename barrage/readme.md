## 使用方法

该插件命名为：Barrage。
初始化方法如下：
```
var barrage = new Barrage(options);
```

> 其中，options是一个配置参数，接下来，就来看看options支持的一些属性和方法：
### 1 options.wrapper{jQuery}

> 必须
> 弹幕所在的容器，必须传入，不传入会报错的。
> 有一点需要注意，就是，在给wrapper设置css的时候，必须有要设置：position:relative;因为内部的弹幕，都是绝对定位的。
### 2 options.speed{Number}

> 可选
> 弹幕的速度，默认为2px，表示每一帧的移动距离，设置的数值越大越快。
### 3 options.distance{Number}

> 可选
> 水平一条线上的，两条弹幕之间的最小距离，默认值为10px；
## 4 options.circle{Boolean}

> 可选
> 因为有时候弹幕的数据量有限，不能因为播完一遍之后，就直接没有弹幕了，所以数据量有限的时候，支持轮播，但是为了能使用户看起来不是轮播，就把原有的数据，打乱之后，进行轮播。
默认会轮播，如果要关闭轮播功能，要设置该属性为false。
## 5 options.data{Array}

> 必须
> 弹幕数据的数据体格式，每一条弹幕数据，需要以下的格式：

```
{
    "id" : "1",
    // 该条弹幕的id，这个数据不是必须的

    "txt" : "弹幕信息"
    // 弹幕的文本消息
}
```

> 当然，除了上述的两个属性之外，您也可以自定义的去扩展属性，因为在初始化化时，还提供了一个options.tmp的方法，可以处理自定义的数据格式，设置自定义的HTML格式，这个后面我们再来看一下吧。
但是依然建议使用这个统一的数据格式。
## 6 options.rank{Number}

> 必须
> 表示弹幕的行数，就是在同一时刻，上下最多显示多少行的弹幕，比如在上面的例子中，是三行弹幕，所以这里的rank值，就设置为3。
> 它会在每一条弹幕的HTML元素上，添加一个data-rank的属性。
比如：
```
<li class="barrage-item" data-rank="0">这是第一行的弹幕</li>
<li class="barrage-item" data-rank="1">这是第二行的弹幕</li>
<li class="barrage-item" data-rank="2">这是第三行的弹幕</li>
```

> 这里data-rank的取值，是根据options.rank的设置来，比如rank=3，那么data-rank的值，就会被设置为，0,1,2这三个数据。
定义完该属性之后，在CSS中，也要使用属性选择器，做定制化的定制，就按上面的设置来说，那么总共有三行弹幕的话，就要添加以下的CSS
```
.barrage-item[data-rank = "0"]{
    top:10%;
}
.barrage-item[data-rank = "1"]{
    top:40%;
}
.barrage-item[data-rank = "2"]{
    top:70%;
}
```

## 7 options.tmp{Function}

> 可选
> 弹幕的HTML模板，如果有定义该方法，那么弹幕的每一条HTML就是这个方法的返回值，就比如，这里我们的每一条弹幕的HTML格式就是上面的默认格式：

```
<li class="barrage-item" data-rank="0">这是第一行的弹幕</li>
```

> 那么我们这里，我们不使用插件自带的tmp方法，而是直接定义一个options.tmp，使用自定义的模板，那么options.tmp可以如下的实现：
```
options.tmp = function(data,rank){
    return '<li class = "barrage-item" data-rank = "'+rank+'">'+data.txt+'</li>';
}
```

> 其中，该模板方法，会固定的传入两个参数，data数据，就是这条弹幕的数据格式，可以参考options.data中的格式，rank就是当前的这条数据，会被插入到第几条去，可以参考options.rank小节中的介绍。
既然这里说是自定义的了，那么就不能只是接受之前完全固定的东西，所以，通过options.tmp与options.data，可以完全支持您产品的自定义格式，比如我做下面这样的一个例子：

```
// 这里，我只定义data属性和tmp属性

options.data = [{
    id : "1",
    msg : "这个是弹幕信息"，
    img : "../img.jpg"
    // 弹幕的左侧，添加一个头像
}];

// 假设我的弹幕的数据格式是如上述所示，这个时候，就不能使用默认的options.tmp的模板了，
// 所以定义如下的自定义模板
options.tmp = function(data,rank){
    return '<li class = "your-classname" data-rank = "'+rank+'"><img src = "'+data.img+'">'+data.msg+'</li>';
};

// 其中，data就是options.data中的数据
```
## 实例化之后

> 前面，我们把Barrage进行了实例化，就等于这个弹幕就算是跑起来了，但是当中，我需要对这个弹幕进行操作呢？
所以，我们也必须提供一些方法，来操作这个已经正在跑着的弹幕，就比如开启和关闭弹幕。
比如，我们如下的进行了初始化：

```
var barrage = new Barrage({
    wrapper : $(".barrage-area").eq(0),
    rank : 3,
    tmp : function(data,rank){
        return '<li class = "barrage-item" data-rank = "'+rank+'">'+data.txt+'</li>';
    },
    data : [{
        "id" : "1",
        "txt" : "这是第一条弹幕这是第一条弹幕这是第一条弹幕"
    },{
        "id" : "2",
        "txt" : "这是第二条弹幕条弹幕"
    },{
        "id" : "3",
        "txt" : "这是第三条弹幕这是第三条弹幕"
    },{
        "id" : "4",
        "txt" : "这是第三条弹幕"
    }],
    speed : 2,
    rank : 3
});
```

> 在接下来的，我们就假设Barrage的实例化对象是barrage，这里只是初始化了，但是整个弹幕还没有运行起来，所以，还需要调用一个方法，才能运行起来，接下来，我们就一个个的看看，哪些是我们常用到的方法。
### 1 barrage.begin

> 开始弹幕。
> 初始化之后，整个弹幕是还没有跑起来的状态，只有执行了barrage.begin();之后，整个弹幕才跑起来。
### 2 barrage.stop

> 停止弹幕。
> 既然前面提供了开始的弹幕，那么就必须有停止的弹幕，barrage.stop();用于停止整个弹幕。
### 3 barrage.show和barrage.hide

> 显示弹幕和关闭弹幕
> 显示弹幕和关闭弹幕，就是把整个弹幕区域隐藏起来，和显示出来，与开始和停止是有区别的，开始和停止的时候，弹幕的区域是还在的，只是没有弹幕滚动了，而显示和隐藏，是对整个弹幕区域的控制。
如果隐藏的话，弹幕不在滚动的同时，整个弹幕的区域，也隐藏起来了。
相对而言，显示的话，就是整个弹幕区域显示出来，并且继续开始滚动弹幕。
> 调用方法很简单：barrage.show();和barrage.hide();
### 4 barrage.insert插入一条新的弹幕

使用方法：
`
barrage.insert(data,once);
`

> 其中data的值，与options.data中，每一条数据的结构一样的，因为这里也是要插入的一条弹幕的数据，data不支持以数组的形式传入，需要循环传入（插件没有做这个处理）。
once（默认为true）表示，当前插入的这条数据，是显示一次，还是会多次显示（只有在弹幕轮播的时候，多次显示的设置才有效）。
至于使用，接下来我们在示例中会整理一个示例。
### 4 barrage.reset更新所有的弹幕数据

使用方法：
`
barrage.reset(data);
`

> 这里的data就与options.data完全一样了，是弹幕数据的一个集合，是一个数组。
> 它会把原有的弹幕数据都清除掉，然后更新为当前这里传入的弹幕。
> 如果不是要把老的弹幕去掉，而是在原有的基础上增加新的弹幕的话，那么就使用barrage.insert方法即可。

> [弹幕DEMO1](http://www.zhangyunling.com/study/2017/20170209/mobile-index.html)
> [弹幕DEMO2](http://www.zhangyunling.com/study/2017/20170209/index-1.html)
> [原文地址:http://www.zhangyunling.com/731.html](http://www.zhangyunling.com/731.html)
