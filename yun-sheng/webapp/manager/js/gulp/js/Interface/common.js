/*
 公共接口
*/

!function ($) {
    var common={
        //获取用户填制单据默认参数
        getDefaultValues:function(obj){
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/getDefaultValues",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },
        //验证菜单权限
        validateAccessToken:function(obj){
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/validateAccessToken",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },
        //获取往来单位的往来资金对象
        getContactUnitAmountVo:function (obj) {
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/getContactUnitAmountVo",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },
        //通过设置的采购价格提取策略,获取采购类单据的商品价格
        getPurchaseGoodsPrice:function (obj) {
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/getPurchaseGoodsPrice",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },
        //入库方式
        getOtherOutInStorageClassVoList:function (obj) {
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/getOtherOutInStorageClassVoList",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },

        getGoodsBranchVoPageList:function (obj) {
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/component/goods/getGoodsBranchVoPageList",
                data:obj.data||{},
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },
        //获取调整原因
        getCostAdjustmentReasonVoList:function (obj) {
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/getCostAdjustmentReasonVoList",
                data:obj.data||{},
                async:obj.async=undefined?true:obj.async,
                success:function(data){
                    if(obj.success){
                        obj.success(data);
                    }
                }
            });
        },
        //获取默认仓库
        getDefaultStorgeList:function (obj) {
            obj = obj ||{};
            $.ajaxPackage({
                url:"/manager/inventory/common/getDefaultStorgeList",
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
    window.InterfaceInventory.common=common
}(jQuery);