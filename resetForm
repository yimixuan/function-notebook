# 重置表单元素
```
var resetForm = function(form_id){
	// 重置基本表单
	document.getElementById(form_id).reset(); 
	// 重置下拉列表
	$(".chosen-select").trigger("chosen:updated");
	// 重置多项选择框
	$(".i-checks").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green"});
	// 重置表单验证
	$("#"+form_id).validate().resetForm();
	// 重置特殊属性的隐藏框
	$('#'+form_id+' input[type="hidden"]').each(function(){
		if($(this).data("reset") == true || $(this).data("reset") == "true") {
			$(this).val('');
		}
	});
}

resetForm("form");
```
