
!function ($) {
    var SystemTemplate={
        //**********************************************短信模板加载 右边树******************************************
        getMsgField:function (obj) {
            obj = obj ||{};
            $.ajax({
                type : "post",
                dataType : 'json',
                url:"/manager/inventory/common/getMsgField",
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
    window.InterfaceInventory.SystemTemplate=SystemTemplate
}(jQuery);

!function ($) {
    var signature={
        //**********************************************短信配置加载 左边树******************************************
        getSectionTreeNodeVoList:function (obj) {
            obj = obj ||{};
            $.ajax({
                type : "post",
                dataType : 'json',
                url:"/manager/inventory/common/getSectionTreeNodeVoList",
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
    window.InterfaceInventory.signature=signature
}(jQuery);