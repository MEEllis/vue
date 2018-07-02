
/*
 * 仓储    表单验证   重置验证样式
 */

;$(function(){
	$('.btnHundred button.btn,.slideThree').click(function(){
		if($(this).html() != '保存'){
			$("#ibillsHead").data('bootstrapValidator').resetForm();
		}
	});
});








