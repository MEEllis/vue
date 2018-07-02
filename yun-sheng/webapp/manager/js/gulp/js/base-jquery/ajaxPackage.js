//ajax 的 2次封装  .  对错误码进行统一的处理
!function ($) {
    $.ajaxPackage = function(option){
        //默认值
        var parameter ={
            url:"",
            type:"POST",
            dataType:"json",
            async:true,
            data:{}
        };
        $.loading();
        $.extend(true,parameter,option);
        $.ajax({
            url:parameter.url,
            type : parameter.type,
            dataType: parameter.dataType,
            data:parameter.data,
            async:parameter.async,
            contentType :parameter.contentType,
            success:function(data){
                $.loading(true);
                if(data.result>=1){
                    if(parameter.success){
                        parameter.success(data);
                    }
                }else{
                    $.zxsaas_plus.showalert("提示",data.desc);
                    if(parameter.error){
                        parameter.error(data);
                    }
                }
            },
            error: function (msg) {
                $.loading(true);
                $.zxsaas_plus.showalert("提示","服务器繁忙,请稍后重试!");
            }
        })
    }
}(jQuery);