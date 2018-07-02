$(function(){
	
})
function save(i){
    var obj = {}
    if(i==0){
    	var emp=false;
    	$('#form1 input').each(function(i,val){
    		if($(this).val()==''){
    			emp=true;
    		}
    	})
    	if(!emp){
    		obj.business=$("#business1").val();
    		obj.shopNum=$("#shopNum1").val();
    		obj.regionName=$("#regionName1").val();
    		obj.contacts=$("#contacts1").val();
    		obj.telnum=$("#telnum1").val();
    		obj.isFlag=0;
    	}else{
    		$.zxsaas_plus.showalert("提示",'请将表单填写完整！');
    	}
    }
    else{
    	var emp=false;
    	$('#form2 input').each(function(i,val){
    		if($(this).val()==''){
    			emp=true;
    		}
    	})
    	if(!emp){
    		obj.business=$("#business2").val();
    		obj.shopNum=$("#shopNum2").val();
    		obj.regionName=$("#regionName2").val();
    		obj.contacts=$("#contacts2").val();
    		obj.telnum=$("#telnum2").val();
    		obj.isFlag=1;
    	}else{
    		$.zxsaas_plus.showalert("提示",'请将表单填写完整！');
    	}
    }
	$.ajax({
		type: 'Get',
		url: '/buy/save',
		type: "POST",
		datatype : "json",
		contentType: "application/json",
		data: JSON.stringify(obj),
		traditional: true,
		success: function (data) {
			if(data.result==1){
				$.zxsaas_plus.showalert("提示",data.desc);
			}else{
				$.zxsaas_plus.showalert("错误",data.desc);
			}
		},
		error: function (msg) {
			$.zxsaas_plus.showalert("错误","服务器正忙");
		}
	});
}