/*
 根据日期过滤商品
*/

!function ($) {

    // 构造函数
    var comModalsStoreFilterGoods = function (el, option) {
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
                            <div class="input-group col-sm-2">
                                采购日期:
                            </div>
                            <div class="input-group col-sm-4">
                                <input type="text" class="form-control date-time-icon modalStartDate"  readonly="" placeholder="请选择开始日期">
                            </div>
                            --
                            <div class="input-group col-sm-4">
                                <input type="text" class="form-control date-time-icon modalEndDate"  readonly="" placeholder="请选择结束日期">
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
                        'purchaseDateStart':filterTemp.find('.modalStartDate').val(),
                        'purchaseDateEnd':filterTemp.find('.modalEndDate').val(),
                    },
                    page:1
                }).trigger("reloadGrid"); //重新载入
            })
            //解绑搜索
            filterWrap.find('.searchInput').unbind("input propertychange");
            //重置
            filterTemp.find('.modalReset').on("click", function (e) {
                filterTemp.find('.modalStartDate').val('')
                filterTemp.find('.modalEndDate').val('')
                filterWrap.find('.searchInput').val('')
                $grid.jqGrid('setGridParam',{
                    postData:{
                        'queryKey':'',
                        'purchaseDateStart':'',
                        'purchaseDateEnd':'',
                    },
                })
            })
            filterWrap.append(filterTemp)

            filterTemp.find('.modalStartDate').datetimepicker({
                lang: "ch",
                format: "Y-m-d",
                timepicker: false,
                todayButton: false,
            });
            filterTemp.find('.modalEndDate').datetimepicker({
                lang: "ch",
                format: "Y-m-d",
                timepicker: false,
                todayButton: false,
            });
            filterTemp.find('.modalEndDate,modalStartDate').on('blur', function () {
                var startDate = filterTemp.find('.modalStartDate').val();
                var endDate = filterTemp.find('.modalEndDate').val();
                var $this = $(this);
                //两个日期都不为""
                if (startDate != "" && endDate != "") {
                    var startTime = new Date(startDate.replace(/\-/g, '/'));
                    var endTime = new Date(endDate.replace(/\-/g, '/'));
                    var flag = (endTime < startTime) ? false : true;
                    if (!flag) {
                        $.zxsaas_plus.showalert("提示", "前后日期不合法!");
                        $this.val('');
                    }
                }
            })
        }

        return retObj
    };
    //在插件中使用  组件对象
    $.fn.comModalsStoreFilterGoods = function (options) {
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
            var retObj = new comModalsStoreFilterGoods(this, options);
            return retObj
        })
    }


}(jQuery);