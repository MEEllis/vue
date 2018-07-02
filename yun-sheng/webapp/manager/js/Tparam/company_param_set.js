
//初始化
$(function(){
	initUi();
	initParamForm();//查询参数
})

//初始化界面
function initUi(){
	$("input[name='C02001']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("input[name='C03001']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("input[name='C03026']").on("click",function () {
		if ( $(this).is(":checked")) {
			$("input[name='C03027']").removeAttr("disabled");
			$("input[name='C03027']").val("10");
		} else {
			$("input[name='C03027']").val("");
			$("input[name='C03027']").attr("disabled", "disabled");
		}
	})
	

}


//启用，禁用编辑功能
var eiditStauts = false;
function enable(tag){
	eiditStauts = tag;
	if(tag){
		$('#kindTabContent').find('input,textarea,select').removeAttr("disabled");

       // 判断是否按业务部门核算可以修改
        $.request({
            type : "post",
            url:'/manager/Tparam/isCheckSectionSettle' ,
            contentType : 'application/json',//传输类型
            success:function(data){
                if(data.data.status ==true){
                    $('#C02003').attr({"disabled":"disabled"})
                }else{
                	$('#C02003').removeAttr("disabled")
                }

            }
        });
    }else{
		$('#kindTabContent').find('input,textarea,select').attr({"disabled":"disabled"});
	}	
}



//初始化参数
function initParamForm(){
	$.request({
		type: 'post',
		url: basePath+'/Tparam/find',
		dataType: "json",
		data:{},
		success: function(data) {
			 if(data.result != 1){$.MsgBox('查询错误提示',data.desc);return;};
			 var list = data.data.dataList;
			 var attr = {};
			 for (var int = 0; int < list.length; int++) {
				 attr[list[int].code] = list[int].value;
				 if(list[int].code == 'C03005'){
					 setContactUnitNameById(list[int].value,'C03005')
				 }
                 if(list[int].code == 'C03016'){
                     setContactUnitNameById(list[int].value,'C03016')
                 }

			 }
			 $("#kindTabContent").writeJson2Dom(attr);
			 
			 //特殊字段处理 带if的
			 $("input[name^='if']").each(function(){
				 var name = this.name.replace('if', '');
				 if(attr.hasOwnProperty(name)){
					 $(this).prop({'checked':true});
				 }else{
					 $(this).prop({'checked':false});
				 }
			 });
			 
			 enable(false);
		},error: function(e){
			console.log(e);
			
		}
	});


}

//保存参数
function saveParamForm(){
	if(!eiditStauts)return;
	var data = $("#kindTabContent").toJsonObjectCompanyParamSet();
    data.C02008 = $("input[name='C02008']:checked").val();
    data.C03004 = $("input[name='C03004']:checked").val();
    data.C03011 = $("input[name='C03011']").is(":checked") ? "1" : "0";
    data.C03012 = $("input[name='C03012']").is(":checked") ? "1" : "0";
    data.C03028=$("#C03028").val();
    if($("input[name='C03026']").is(":checked")){
    	if($("input[name='C03027']").val().length == 0){
			$.MsgBox('操作提示','请输入锁屏时间！');
			return;
		}
	}

    for(var key in data) {
    	//过滤 是否 值字段
    	if($("#if"+key).length > 0){
    		if(!$('#'+"if"+key).is(':checked')){
    			delete data[key];
    		}
    	}
    	
    	//字段值处理
    	if(data[key] == 'false')data[key] = 0;
    	if(data[key] == 'true')data[key] = 1;

    } 
    var models = [];
    for(var key in data) {
    	models.push({value:data[key],code:key});
    } 
	$.request({
	    type : "post",
		url: this.basePath + '/Tparam/save',
		data:JSON.stringify(models),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',//接收类型
		success:function(data){
			if(data.result != 1){$.MsgBox('查询错误提示',data.desc);return;};
			$.MsgBox('保存提示','保存成功');
			initParamForm();
		}
	}); 
}
var callBack = null;
//打开往来单位引用对话框
function selectContactUnitReferenceOpen(){
	if(!eiditStauts)return;
	
	//传入单选标志
	contactUnitReferenceFrame.mulSelect(false);
	$('#contactUnitReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$("#C03005").val(contactUnit.name);
		$("input[name='C03005']").val(contactUnit.id);

		$('#contactUnitReferenceModal').modal('hide');
	}; 
}

//打开往来单位引用对话框
function selectContactUnitReferenceOpen1(){
    if(!eiditStauts)return;

    //传入单选标志
    contactUnitReferenceFrame.mulSelect(false);
    $('#contactUnitReferenceModal').modal('show').find('.referenceFrame').css({
        height: $("html").height()/1.25,
    });
    callBack = function(){
        if(arguments[0].length == 0){
            $('#contactUnitReferenceModal').modal('hide');
            return ;
        }
        var contactUnit = arguments[0][0];

        //设置编辑器值
        $("#C03016").val(contactUnit.name);
        $("input[name='C03016']").val(contactUnit.id);

        $('#contactUnitReferenceModal').modal('hide');
    };
}

//获取往来单位名称
var contactUnitList = null;
function setContactUnitNameById(id,inputId){
	if(contactUnitList == null){
		$.request({
			type: 'post',
			url: basePath+'/TcontactUnit/listByModel',
			dataType: "json",
			data:{},
			success: function(data) {
				 if(data.result != 1){$.MsgBox('查询错误提示',data.desc);return;};
				 contactUnitList = data.data.dataList;
				 getName();
			},error: function(){}
		});
	}else{
		getName();
	}
	function getName(){
		for (var int = 0; int < contactUnitList.length; int++) {
			if((contactUnitList[int].id+'') == (id + '')){
				$('#'+inputId).val(contactUnitList[int].name);
				break;
			}
		}
	}
}

