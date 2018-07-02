/**********************权限控制按钮******************************************/
//权限按钮集合
var CODELIST = [];
$(function(){
	// 权限开关

	if($('#MENU_CODE').length > 0){
		$.ajax({
			url: '/manager/auth/queryAuthButtonVoList',
			type : "post",
			async: false,
			data : {
				"menuCode" : $('#MENU_CODE').text()
			},
			dataType : 'json',
			success:function(data){
				if(data.result == 1){

					var codeList = data.data.buttonVoList;
					$.each(codeList,function (k,v) {
						$('.'+v.code).show()
						CODELIST.push(v.code);
					})
				} else {
					alert(data.desc);
				}
			}
		});
	}
	else{
        if($('#AUTH').length > 0 && $('#AUTH').hasClass('none')===false){

           $.ajax({
                    url: '/manager/auth/queryAuthButtonVoList',
                    type : "post",
                    data : {
                        "menuCode" : $("#AUTH").data("code")
                    },
                    dataType : 'json',
                    success:function(data){
                        if(data.result == 1){
                            if(data.data.show == "all"){
                                $("#AUTH").find("button").show();
                            } else {
                                var a = $("#AUTH").find("button");
                                var hrefId = $("iframe[src='"+window.location.href+"']", parent.document).parent().attr("id");
                                var pageName = $("a[data-href='"+hrefId+"']", parent.document).text().replace("Χ","");
                                if (data.data.buttonVoList) {
                                    for (var i = 0; i < data.data.buttonVoList.length; i++) {
                                        a.each(function(){
                                            var c = $(this).text();
                                            if ($.trim(c) == data.data.buttonVoList[i].name) {
                                                $(this).show();
                                            }
                                        });
                                    }
                                }
                            }
                        } else {
                            alert(data.desc);
                        }
                    }
                });
		}


	}



});


!function ($) {
    var serReward={
        //**********************************************运营商业务档案加载 左边树******************************************
        getOperatorClassTreeNodeVoList:function (obj) {
            obj = obj ||{};
            $.ajax({
                type : "post",
                dataType : 'json',
                url:"/manager/inventory/operator/getOperatorClassTreeNodeVoList",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        }
    }
    window.InterfaceInventory = window.InterfaceInventory||{};
    window.InterfaceInventory.serReward=serReward
}(jQuery);

!function ($) {
    var inpayClass={
        //**********************************************收支类别加载 左边树******************************************
        getInpayClassTreeNodeVoList:function (obj) {
            obj = obj ||{};
            $.ajax({
                type : "post",
                dataType : 'json',
                url:"/manager/inventory/inpayClass/getInpayClassTreeNodeVoList",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        }
    }
    window.InterfaceInventory = window.InterfaceInventory||{};
    window.InterfaceInventory.inpayClass=inpayClass
}(jQuery);