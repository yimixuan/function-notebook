```
/**
 * ajaxFileUpload.js
 */
$.extend({
    createUploadIframe: function(id){
        var frameId = 'jUploadFrame' + id;
        return $('<iframe>').attr({id:frameId,name:frameId}).css({top:'-9999px',left:'-9999px',position:'absolute'}).appendTo('body')[0];
    },
    createUploadForm: function(id, fileElementId){
        var formId = 'jUploadForm' + id,fileId = 'jUploadFile' + id,oldElement = $('#' + fileElementId),newElement = $(oldElement).clone(true);
        return $('<form>').attr({id:formId,name:formId}).append($(oldElement).attr('id', fileId).before(newElement)).css({position:'absolute',top:'-1200px',left:'-1200px'}).appendTo('body')[0];
    },
    addOtherRequestsToForm: function(form,data){
        var originalElement = $('<input type="hidden"/>');
        for (var key in data) originalElement.clone().attr({'name':key,'value':data[key]}).appendTo(form);
        return form;
    },
    ajaxFileUpload: function(s) {
        s = $.extend({}, $.ajaxSettings, s);
        var id = new Date().getTime(),io = $.createUploadIframe(id),form = $.createUploadForm(id, s.fileElementId),frameId = 'jUploadFrame' + id,formId = 'jUploadForm' + id,requestDone = false,xml = {};
        if ( s.data ) form = $.addOtherRequestsToForm(form,s.data);
        if ( s.global && ! $.active++ ) $.event.trigger( "ajaxStart" );
        if ( s.global ) $.event.trigger("ajaxSend", [xml, s]);
        var uploadCallback = function(isTimeout){
            var io = $('#'+frameId)[0];
            try{
            	var ioContent=io.contentWindow||io.contentDocument;
                if(ioContent)xml.responseText = ioContent.document.body?ioContent.document.body.innerHTML:null,xml.responseXML = ioContent.document.XMLDocument?ioContent.document.XMLDocument:ioContent.document;
            }catch(e){
                $.handleError(s, xml, null, e);
            }
            if ( xml || isTimeout == "timeout"){
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    if ( status != "error" ){
                        var data = $.uploadHttpData( xml, s.dataType );
                        if ( s.success ) s.success( data, status );
                        if( s.global )$.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        $.handleError(s, xml, status);
                } catch(e){
                    status = "error";
                    $.handleError(s, xml, status, e);
                }
                if( s.global )
                    $.event.trigger( "ajaxComplete", [xml, s] );
                if ( s.global && ! --$.active )
                    $.event.trigger( "ajaxStop" );
                if ( s.complete )
                    s.complete(xml, status);
                $(io).off()
                setTimeout(function(){
	                try{
		                $(io,form).remove();
		                $('#' + formId).remove();
	                } catch(e){
                        $.handleError(s, xml, null, e);
                    }
                }, 100)
                xml = null
            }
        }
        if ( s.timeout > 0 )
            setTimeout(function(){if( !requestDone ) uploadCallback( "timeout" );}, s.timeout);
        try{
            $('#' + formId).attr({action:s.url,method:'POST',target:frameId,encoding:'multipart/form-data',enctype:'multipart/form-data'}).submit();
        } catch(e){
            $.handleError(s, xml, null, e);
        }
        $('#'+frameId).on('load',uploadCallback);
        return {abort: function () {}};
    },
    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        if ( type == "script" ){
        	$.globalEval( data );
        }
        if ( type == "json" ){
        	data = $.parseJSON(data.replace(/<.*?>/ig,""));
        }
        if ( type == "html" ){
        	$("<div>").html(data).evalScripts();
        }
        return data;
    },
    handleError: function( s, xhr, status, e ){
        if ( s.error )
            s.error.call( s.context || s, xhr, status, e );
        if ( s.global )
            (s.context ? $(s.context) : $.event).trigger( 'ajaxError', [xhr, s, e] );
    }
});
```
## 使用方法
ajaxFileUpload是一个异步上传文件的jQuery插件

语法：$.ajaxFileUpload([options])

### options参数说明：

1. url　　　　　　　　　　  上传处理程序地址。　　
2. fileElementId　　　　　  需要上传的文件域的ID，即<input type="file">的ID。
3. secureuri　　　　　　　 是否启用安全提交，默认为false。 
4. dataType　　　　　　　 服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
5. success　　　　　　　　提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
6. error　　　　　　　　　 提交失败自动执行的处理函数。
7. data	　　　　　　　　　 自定义参数。这个东西比较有用，当有数据是与上传的图片相关的时候，这个东西就要用到了。
8. type	　　　　　　　　　  当要提交自定义参数时，这个参数要设置成post

### 错误提示:

1. SyntaxError: missing ; before statement错误
+ 如果出现这个错误就需要检查url路径是否可以访问
2. SyntaxError: syntax error错误
+ 如果出现这个错误就需要检查处理提交操作的服务器后台处理程序是否存在语法错误
3. SyntaxError: invalid property id错误
+ 如果出现这个错误就需要检查文本域属性ID是否存在
4. SyntaxError: missing } in XML expression错误
+　如果出现这个错误就需要检查文件name是否一致或不存在
5. 其它自定义错误
+　大家可使用变量$error直接打印的方法检查各参数是否正确，比起上面这些无效的错误提示还是方便很多。

[参考链接地址：http://www.cnblogs.com/kissdodog/archive/2012/12/15/2819025.html](http://www.cnblogs.com/kissdodog/archive/2012/12/15/2819025.html)
