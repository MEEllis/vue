/*
 公共接口
*/

!function ($) {
    var account={
        //获取资金账户类别集合(树结构返回)
        getAccountClassTreeNodeVoList:function(obj){
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/component/account/getAccountClassTreeNodeVoList",
                data:obj.data||{},
                success:function(data){
                    if(obj){
                        obj.success(data);
                    }
                }
            });
        }
    }
    window.InterfaceInventory = window.InterfaceInventory||{};
    window.InterfaceInventory.account=account
}(jQuery);