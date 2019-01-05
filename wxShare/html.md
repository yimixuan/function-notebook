```
<%@ page contentType="text/html; charset=UTF-8" language="java" import="java.sql.*" errorPage="" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <title>测试年报分享</title>
</head>
<script src="${basePath}/resources/js/activity/edu/jweixin-1.0.0.js"></script>
<script src="${basePath}/resources/js/common/jquery-1.8.3.min.js" type="text/javascript"></script>
<script src="${basePath}/resources/js/common/commont.js" type="text/javascript"></script>
<body>
<div></div>
    <!--获得红包分享弹框-->
    <div class="share">
        <H1>测试年报分享</H1>
    </div>
<p class="noWeixin" hidden>不是来自微信内置浏览器</p>
<p class="main" hidden>是来自微信内置浏览器</p>
<div class="musicCtrl on"></div>
</body>
<script>
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    if(isWeiXin()){
        console.log(" 是来自微信内置浏览器");
        initialize();
        $('.main').show();
    }else{
        $('.noWeixin').show();
        // 这里警告框会阻塞当前页面继续加载
        alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
        // 以下代码是用javascript强行关闭当前页面
        var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
        console.log("不是来自微信内置浏览器")
    }
    function initialize(){
        var signUrl=location.href.split('#')[0];
        $.ajax({
            url :"http://accounttitle.imwork.net/annals/weChatShare.do",
            data : {"shareUrl":signUrl},
            dataType :'json',
            type : 'GET',
            cache : false,
            async : true,
            success : function(data){
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp:data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature:data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
                });
            }
        });
    }

    wx.ready(function(){
        // 分享朋友圈
        wx.onMenuShareTimeline({
            title:  "年报", // 分享标题
            link: "http://accounttitle.imwork.net/toWeChatBannerView.do"  , // 分享链接
            imgUrl: 'http://accounttitle.imwork.net/resources/image/zzr.jpg', // 分享图标
            success: function () {
                alert("分享成功")
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                alert("分享取消")
                // 用户取消分享后执行的回调函数
            }
        });
        // 分享朋友
        wx.onMenuShareAppMessage({
            title:"年报", // 分享标题
            desc:"年报详情分析", // 分享描述
            link: "http://accounttitle.imwork.net/toWeChatBannerView.do", // 分享链接
            imgUrl: 'http://accounttitle.imwork.net/resources/image/zzr.jpg', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                alert("分享成功")
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                alert("分享取消")
                // 用户取消分享后执行的回调函数
            }
        });

    });
</script>
</html>

```
