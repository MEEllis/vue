/*
  旧接口
*/

!function ($) {
    var old={
        //获取资金账户类别集合(树结构返回)
        getTparam:function(obj){
            obj = obj ||{};
            $.ajaxPackage({
                type:'get',
                url:"/manager/Tparam/find",
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
    window.InterfaceInventory.old=old
}(jQuery);