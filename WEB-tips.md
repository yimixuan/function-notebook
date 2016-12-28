### 优酷视频自动播放设置
```
<embed src="http://player.youku.com/player.php/sid/填写视频ID处/v.swf?VideoIDS=填写视频ID处&embedid=&isAutoPlay=true&embedid" allowFullScreen="true" quality="high" width="426" height="341" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
```
### webstorm以及sublime使用less
- 两个都需要先全局安装less，它们都需要lessc文件。在cmd中输入
```
npm install less -g
```    
- 在webstorm里面配置less
  + 打开webstorm——File——Settings——Tools——File Watchers，点那个绿色的 + 添加按钮进行设置。
    - [参考文章1](http://www.tuicool.com/articles/aeye6rY)  
    - [参考文章2](http://blog.csdn.net/xuanwuziyou/article/details/48132167)  
    
### sublime中使用less2css遇到的问题
  - sublime中下载less2css插件，当保存less文件时，总是弹出报错提示框（其实less已经在同级上生成了css文件），解决办法是在less2css的settings-User中写入{"minify":false},提示错误弹窗的原因是在压缩代码的时候发生了错误
  - [参考博客地址](http://www.cnblogs.com/ip128/p/4506633.html)
