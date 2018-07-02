/*
 根据建议补货量过滤商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreNeedGoods = function (el, option) {
        var options = $.extend(true, {}, option);
        options.sign = 'need'
		options.enter = true
        var retObj = $(el).comModalsGoods(options);
        var modal = retObj[0].isObj
        if (modal) {
            var $grid=$('#'+modal.option.gridID)
            var filterWrap = modal.dom.find('.filterWrap')
            var filterTemp = $(`
            <div style="margin-top: 10px;">
                <div class="form-group" style="padding: 0; margin: 0 !important;">
					<div class="input-group">
						<input type="checkbox" class="modalFilter" /> 只看建议补货量大于0的数据
						<sapn style="color:red;padding-left: 10px;">说明：门店库存含调入在途，发货部门不含</sapn>
					</div>
                </div>
            </div>
            `);
			
            //重置
            filterTemp.find('.modalFilter').on("click", function (e) {
                $grid.jqGrid('setGridParam',{
                    postData:{
                        'flag': $(this).is(':checked')?'1':'0'
                    },
                }).trigger("reloadGrid");
            })
            filterWrap.append(filterTemp)
        }

        return retObj
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreNeedGoods = function (options) {
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
            var retObj = new comModalsStoreNeedGoods(this, options);
            return retObj
        })
    }


}(jQuery);