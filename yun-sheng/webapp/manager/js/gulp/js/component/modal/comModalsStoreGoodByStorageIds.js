/*
 根据仓库过滤商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreGoodByStorageIds = function (el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'store'
        var retObj = $(el).comModalsGoods(options);
        var modal = retObj[0].isObj
        if (modal) {
            var $grid=$('#'+modal.option.gridID)
            var filterWrap = modal.dom.find('.filterWrap')
            var filterTemp = $(`
            <div style="margin-top:10px;">
                <div class="form-group col-sm-8" style="padding: 0; margin: 0 !important;">
                     <div class="form-group col-sm-8">
                        <label class="width-25">部门仓库:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control storageIds" placeholder="">
                        </div>
                     </div>
                </div>
                <div class="form-group col-sm-4" style="padding: 0; margin: 0 !important;">
                    <button type="button" class="erp-btn-bg modalSearch">查询</button>
                    <button type="button" class="erp-btn-lab modalReset">重置</button>          
                </div>
            </div>
            `);
            //查询
            filterTemp.find('.modalSearch').on("click", function (e) {
                $grid.jqGrid('setGridParam',{
                    postData:{
                        'queryKey':filterWrap.find('.searchInput').val(),
                        'storageIds':filterTemp.find('.storageIds').data('id'),
                    },
                    page:1
                }).trigger("reloadGrid"); //重新载入
            })
            //解绑搜索
            filterWrap.find('.searchInput').unbind("input propertychange");
            //重置
            filterTemp.find('.modalReset').on("click", function (e) {
                filterTemp.find('.modalStartDate').val('')
                filterTemp.find('.storageIds').val('').data('id','')

                $grid.jqGrid('setGridParam',{
                    postData:{
                        'queryKey':'',
                        'storageIds':'',
                    },
                })
            })
            filterTemp.find('.storageIds').comModalsStorage({multiselect:true})
            filterWrap.append(filterTemp)
        }

        return retObj
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreGoodByStorageIds = function (options) {
        if (typeof options === 'string') {
            var fn = comModalsbox.prototype.getMethod(options);
            if (!fn) {
                throw ("comModalsbox - No such method: " + options);
            }
            var args = $.makeArray(arguments).slice(1);
            this.each(function () {
                return fn.apply(this.isObj, args);
            })
        }
        return this.each(function () {
            if (this.isObj) {
                return;
            }
            var retObj = new comModalsStoreGoodByStorageIds(this, options);
            return retObj
        })
    }


}(jQuery);