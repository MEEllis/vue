$.mergeJsonObject = function (jsonbject1, jsonbject2) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

var progressTime;
$.progress = function (color, during) {
    $('#progressContent').remove();
    var html = '<div id="progressContent" style="width: 100%;height:8px;"><span id="progressBack" style="border-radius:10px;height: 100%;display: block;width: 0;background:' + color + '"></span></div>';
    $('#alertModal .modal-footer').html(html);
    clearInterval(progressTime);
    var n = 0;
    var dur = during;
    var add = 2;
    progressTime = setInterval(function () {
        n += add;
        if (n >= 100) {
            clearInterval(progressTime)
        }
        $('#progressBack').css({
            'width': n + '%'
        });
    }, dur / (100 / add));
};


$(document).on("show.bs.modal", "#alertModal", function () {
    var title = $(this).find(".modal-title").text();
    if (title == "success") {
        $('#alertModal .modal-content').css({"background-color": "#BBF4BB", 'color': '#000'});
        $('#alertModal.modal-header,#alertModal .modal-body').css('borderBottom', 0).click(function () {
            $('#alertModal').modal('hide')
        });
        $('#alertModal .modal-footer').css({
            "padding": "0px",
            "border": 0
        });
        $.progress('#fff', 1500);
        $('#alertModal .modal-header').hide();
    } else if (title == "error") {
        $('#alertModal .modal-content').css({"background-color": "#d9534f", 'color': '#fff'});
        $('#alertModal .modal-header,#alertModal .modal-body').css('borderBottom', 0);
        $('#alertModal .modal-footer').css({
            "padding": "0px",
            "border": 0,
            'textAlign': 'right'
        });
        $('#alertModal button').css({'background': '#d9534f', 'border': 0});
        $('#alertModal .modal-header').hide();
    } else if (title == "warning") {
        $('#alertModal .modal-content').css({"background-color": "#f0ad4e", 'color': '#fff'});
        $('#alertModal .modal-header,#alertModal .modal-body').css('borderBottom', 0);
        $('#alertModal .modal-footer').css({
            "padding": "0px",
            "border": 0,
            'textAlign': 'right'
        });
        $('#alertModal button').css({'background': '#f0ad4e', 'border': 0});
        $('#alertModal .modal-header').hide()
    } else {
        $('#alertModal .modal-header').show()
    }
});
$(document).on("shown.bs.modal", "#alertModal", function () {
    var title = $(this).find(".modal-title").text();
    if (title == "success") {
        $("#alertModal").find(".path_one").css({"strokeDashoffset": "0"});
        setTimeout(function () {
            $("#alertModal").modal('hide');
        }, 1500);
    }
});
/*%格式变换成小数*/
$(document).on("input propertychange", ".DataFormat", function () {
    if ($(this).val().indexOf("%") > -1) {
        $(this).attr("maxLength", $(this).val().length);
        $(this).val($(this).val().replaceAll("%", "").valueOf() / 100)
    }
    if ($(this).val() == "") {
        $(this).removeAttr("maxLength");
    }
});
$(document).on('keypress', 'form input', function (e) {//阻止boot验证插件form表单回车默认事件
    if (e.keyCode == 13) {
        e.preventDefault()
    }
});
/*********************模态框不能滚动调整**********************************/
$(window).resize(function () {
    toggleScroll();
});

$(document).on("hidden.bs.modal", ".modal", function (e) {
    toggleScroll();
});

function toggleScroll() {
    var len = $(".modal:visible").length;
    var lenBack = $("body").find(".modal-backdrop").length || 0;
    if (len > 0) {
        $("body").hasClass("modal-open") || $("body").addClass("modal-open");
        lenBack == 0 && $("body").append('<div class="modal-backdrop fade in"></div>');
    } else {
        if (lenBack > 0) {
            $(".modal-backdrop").remove();
        }
    }
}
(function ($) {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    $.fn.select = function () {
        return this.each(function () {
            var self = $(this);
            var src = self.data("src");
            var dft = self.data("default");
            if (src) {
                $.getJSON(src, function (res) {
                    var str = "";
                    $.each(res.data.rows, function (i, item) {
                        if (item.value == dft) {
                            str += "<option value='" + item.id + "' selected='selected'>" + item.name + "</option>";
                        } else {
                            str += "<option value='" + item.id + "'>" + item.name + "</option>";
                        }
                    });
                    self.html(str);
                });
            }
        });
    };
    $(document).on('mouseover', '.modal-header', function (e) {
        $(this).css('cursor', 'move')
    });
    $(document).on('mouseout', '.modal-header', function (e) {
        $(this).css('cursor', 'default');
    });
    $(document).on('mousedown', '.modal-header', function (e) {
        var _this = $(this);
        var _thisCon = $(this).closest('.modal-content');
        var _thisConW = _thisCon.outerWidth();
        var _thisConH = _thisCon.outerHeight();
        var _thisDia = $(this).closest('.modal-dialog');
        var l = e.clientX - parseInt(_thisCon.offset().left);
        var t = e.clientY - parseInt(_thisCon.offset().top);
        $(document).mousemove(function (e) {
            _thisCon.css({
                'width': _thisConW,
                'height': _thisConH
            });
            _thisDia.css({
                'margin': 0,
                'padding': 0,
                'position': 'absolute'
            });
            _thisCon.css('position', 'absolute');
            var ox = e.clientX - l;
            var oy = e.clientY - t;
            var w = $(window).width() - _thisCon.width();
            var h = $(window).height() - _thisCon.height();
			if (oy <= 0) {
				oy = 0;
			}

			// else if (oy > h) {
			// 	oy = h;
			// }
			if (ox <= 0) {
                ox = 0;
            }
            // else if (ox > w) {
			// 	ox = w;
			// }
            _thisCon.css({
                top: oy,
                left: ox
            });
            e.stopPropagation();
            e.preventDefault();
        })
    });
    $(document).mouseup(function (e) {
        $(this).unbind("mousemove");
        $('.modal-content').css({
            'height': 'auto'
        })
    });
})(jQuery);
$.zxsaas_plus = {
    getinput2json: function (item) {
        var tr = {};
        $.each($(item).find("input"), function (j, input) {
            if ($(input).hasClass("json")) {
                tr[$(input).prop("name")] = JSON.parse($(input).val());
            } else {
                tr[$(input).prop("name")] = $(input).val();
            }
        });
        return tr;
    },
    showloading: function () {
        $("body").append('<div class="loadingbox"><i class="icon-spinner icon-spin"></i>加载中...	</div>');
    },
    hideloading: function () {
        $("body").find('.loadingbox').remove();
    },
    filebox2button: function () {
        $.each($("input[type='file']"), function (i, item) {
            var item_t = $(item).position().top;
            var item_l = $(item).position().left;
            var item_w = $(item).outerWidth();
            var item_h = $(item).outerHeight();
            var input_w = item_w - 100;
            $(item).addClass('fileboxhide');
            $(item).after('<div class="filebox" style="width:' + item_w + 'px;left:' + item_l + 'px;top:' + item_t + 'px;"><input type="text" class="form-control" style="width:' + input_w + 'px" /><button class="btn btn-primary btn-sm pull-right">选择文件</button></div>');

        });
        $(document).on("change", "input[type='file']", function () {
            $(this).next().find("input[type='text']").val($(this).val());
        });
    },
    treeload: function (jsonurl, obj) {
        $.getJSON(jsonurl, function (r) {
            obj.treeview({
                data: r,
                emptyIcon: "glyphicon glyphicon-list-alt",
                expandIcon: "glyphicon glyphicon-folder-close",
                collapseIcon: "glyphicon glyphicon-folder-open"
            });
        });
    },
    showTip: function (title, msg) {
        var boxstr = '<div class="modal fade" id="alertModal" data-keyboard="true" data-backdrop="static" >' +
            '<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
            ' <div class="modal-content" >' +
            '  <div class="modal-header">' +
            '   <h4 class="modal-title">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' + msg +
            '</div>' +
            '</div>' +
            ' </div>';
        $("body").append(boxstr);
        $("#alertModal").modal("show");
        $(document).on("click", "#yesBta", function () {
            delmodal();
        });

        function delmodal() {
            $("#alertModal").modal("hide");
            setTimeout(function () {
                $("#alertModal").remove();
                $(".modal-backdrop").remove();
            }, 600);
            $(document).off("click", "#yesBta");
        }
    },
    showalert: function (title, msg, callback) {
        var boxstr = '<div class="modal fade" id="alertModal" data-keyboard="true" style="z-index: 999999;">' +
            '<div class="modal-dialog" style="width: 400px;" >' +
            ' <div class="modal-content" >' +
            '  <div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '   <h4 class="modal-title">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' + msg +
            '</div>' +
            '<div class="modal-footer" style="text-align: center;">' +
            '<button type="button" class="btn btn-warning" id="yesBta">确定</button>' +
            '  </div>' +
            '</div>' +
            '</div>' +
            ' </div>';
        $("#alertModal").remove();
        $(".modal-backdrop").remove();
        $("body").append(boxstr);
        $("#alertModal").modal("show");
        $(document).on("click", "#yesBta", function () {
            delmodal();
            if (callback) callback();
        });
        function delmodal() {
            $("#alertModal").modal("hide");
            $(document).off("click", "#yesBta");
        }
    },
    showconfirm: function (title, msg, funyes, funno) {
        var boxstr = '<div class="modal fade" id="confirmModal" data-keyboard="true" data-backdrop="static">' +
            '<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
            ' <div class="modal-content" >' +
            '  <div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '   <h4 class="modal-title">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' + msg +
            '</div>' +
            '<div class="modal-footer" style="text-align: center;">' +
            '<button type="button" class="btn btn-warning" id="yesBtn">确定</button>' +
            '  <button type="button" class="btn btn-primary" data-dismiss="modal" id="noBtn">取消</button>' +
            '  </div>' +
            '</div>' +
            '</div>' +
            ' </div>';
        $("#confirmModal").remove();
        $(".modal-backdrop").remove();
        $("body").append(boxstr);
        $("#confirmModal").modal("show");
        $(document).off("click", "#yesBtn");
        $(document).on("click", "#yesBtn", function () {
            if (funyes) funyes();
            delmodal();
        });
        $(document).off("click", "#noBtn");
        $(document).on("click", "#noBtn", function () {
            if (funno) funno();
            delmodal();
        });
        function delmodal() {
            $("#confirmModal").modal("hide");
            $(document).off("click", "#yesBtn");
            $(document).off("click", "#noBtn");
        }
    },
    showconfirmsure: function (title, msg, funyes) {
        var boxstr = '<div class="modal fade" id="confirmModalsure" data-keyboard="true" data-backdrop="static">' +
            '<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
            ' <div class="modal-content" >' +
            '  <div class="modal-header">' +
            '   <h4 class="modal-title">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' + msg +
            '</div>' +
            '<div class="modal-footer" style="text-align: center;">' +
            '<button type="button" class="btn btn-warning" id="yessBtn">确定</button>' +
            '  </div>' +
            '</div>' +
            '</div>' +
            ' </div>';
        $("#confirmModalsure").remove();
        $(".modal-backdrop").remove();
        $("body").append(boxstr);
        $("#confirmModalsure").modal("show");
        $(document).off("click", "#yessBtn");
        $(document).on("click", "#yessBtn", function () {
            funyes();
            delmodal();
        });
        function delmodal() {
            $("#confirmModalsure").modal("hide");
            $(document).off("click", "#yessBtn");
        }
    }
};

//比较日期
function CompareDate(d1,d2){
	return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}

var _authList = {};
function getAuthList(callback) {

    _authList.menuCode = $('#AUTH').attr('data-code');
    if (_authList.menuCode) {
        $.ajax({
            url: '/manager/inventory/common/getInventoryBillsDate',
            type: 'post',
            dataType: 'json',
            data: {
                'menuCode': _authList.menuCode
            },
            success: function (data) {
                var data = data.data;
                _authList.maxDate = data.maxDate;
                _authList.hasPermissions = data.hasPermissions;
                _authList.minDate = data.minDate;
                if(callback){
                    callback();
                }
            }
        })
    }
}

//加法函数，用来得到精确的加法结果
//说明：JavaScript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
//动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n)
}

//给Number类型增加一个add方法，调用起来更加方便，以下类似
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
}


//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}


//减法函数，用来得到精确的减法结果
//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSubtr(arg1,arg2)
//返回值：arg1减去arg2的精确结果
function accSubtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
//动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个subtr 方法，调用起来更加方便。
Number.prototype.subtr = function (arg) {
    return accSubtr(arg, this);
}
//功能模块封装
;(function ($) {
    $.fn.imeiPlu = function (opt) {
        var def = {
            sectionId: '',
            callback: ''
        }
        opt = $.extend({}, def, opt);

        return this.each(function () {

            var _this = $(this);
            _this.parent().append('<div class="imeiErrorBox" style="display: none;color: red;position:absolute;top:33px;" >我错了</div>')
            _this.parent().append(
                '<div class="imeiBox" style="width:500px;position: absolute;background: #fff;z-index: 5;top:33px;"><table id="imeiGrid"></table><div id="imeiGridPager"></div></div>'
            );
            $('#imeiGrid').jqGrid({
                scroll: 1,
                url: "/manager/component/goods/getGoodsVoList",
                mtype: "POST",
                datatype: "json",
                jsonReader: {
                    root: 'data.goodsVoList',
                    total: 'data.total'
                },
                colNames: [
                    '主串号', '辅串号', '条码', '名称', '编码', '仓库', 'auxiliaryImeiLength', 'barcodeId', 'brandName', 'categoryName',
                    'color', 'goodsId', 'ifEnableAuxiliaryImei', 'ifManageImei', 'imeiId', 'models', 'retailPrice', 'status', 'stockCount',
                    'storageId', 'valuationMethods'
                ],
                colModel: [
                    {name: 'imei', index: 'imei', sortable: true, align: 'center'},
                    {name: 'auxiliaryImei', index: 'auxiliaryImei', sortable: false, align: 'center', width: 100},
                    {name: 'barcode', index: 'barcode', sortable: false, align: 'center', width: 100},
                    {name: 'name', index: 'name', sortable: false, align: 'center', width: 100},
                    {name: 'code', index: 'code', sortable: false, align: 'center', width: 100},
                    {name: 'storageName', index: 'storageName', sortable: false, align: 'center', width: 100},
                    {
                        name: 'auxiliaryImeiLength',
                        index: 'auxiliaryImeiLength',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                    {name: 'barcodeId', index: 'barcodeId', sortable: false, align: 'center', width: 100, hidden: true},
                    {name: 'brandName', index: 'brandName', sortable: false, align: 'center', width: 100, hidden: true},
                    {
                        name: 'categoryName',
                        index: 'categoryName',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                    {name: 'color', index: 'color', sortable: false, align: 'center', width: 100, hidden: true},
                    {name: 'goodsId', index: 'goodsId', sortable: false, align: 'center', width: 100, hidden: true},
                    {
                        name: 'ifEnableAuxiliaryImei',
                        index: 'ifEnableAuxiliaryImei',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                    {
                        name: 'ifManageImei',
                        index: 'ifManageImei',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                    {name: 'imeiId', index: 'imeiId', sortable: false, align: 'center', width: 100, hidden: true},
                    {name: 'models', index: 'models', sortable: false, align: 'center', width: 100, hidden: true},
                    {
                        name: 'retailPrice',
                        index: 'retailPrice',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                    {name: 'status', index: 'status', sortable: false, align: 'center', width: 100, hidden: true},
                    {
                        name: 'stockCount',
                        index: 'stockCount',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                    {name: 'storageId', index: 'storageId', sortable: false, align: 'center', width: 100, hidden: true},
                    {
                        name: 'valuationMethods',
                        index: 'valuationMethods',
                        sortable: false,
                        align: 'center',
                        width: 100,
                        hidden: true
                    },
                ],
                gridview: true,
                pager: '#imeiGridPager',
                sortable: false,
                viewrecords: true,
                cellEdit: false,		//点击行勾选复选框
                rowNum: 1500,
                autowidth: true,
                heihgt: $(window).height() * 0.2,
                width: "100%",
                shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                loadComplete: function (data) {
                    $('table th').css('text-align', 'center');
                    console.log(data)
                    if (_this.val().length > 4) {
                        if (!data.data.goodsVoList.length) {
                            $(".imeiErrorBox").html('无结果').show();
                            $('.imeiBox').hide();
                        } else {
                            if(data.data.goodsVoList.length == 1){
								opt.callback(data.data.goodsVoList[0]);
                            }else{
								$('.imeiBox').show();
								$(".imeiErrorBox").hide();
                            }

                        }
                    } else {
                        $('.imeiBox').hide();
                    }

                },
                onSelectRow: function (rowid) {
                    event.stopPropagation();
                    var info = $('#imeiGrid').getRowData(rowid);
                    opt.callback(info);
                    _this.val('')
                    $('.imeiBox').hide();
                    $(".imeiErrorBox").hide();

                }
            })


            _this.keyup(function (e) {
                if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                    if (_this.val().trim().length < 5) {
                        $(".imeiErrorBox").text('至少输入5位').show();

                    } else {

                        $('#imeiGrid').jqGrid('setGridParam', {
                            postData: {
                                'sectionId': $(opt.sectionId).data('sectionId'),
                                'queryKey': _this.val().trim(),
//		                            'page':1,
                            },
                        }).trigger("reloadGrid")
                    }
                }
                if (e.keyCode == 8) {
                    $(".imeiErrorBox").hide();
                    $('.imeiBox').hide();

                }

            })

            $(document).click(function () {
                $(".imeiBox").hide();
            });

        })


    }


    //日期組件
    $.fn.datePlu = function (opt) {
        dft = {
            ajaxOpt: {
                url: '/manager/inventory/common/getInventoryBillsDate',
                type: 'post',
                dataType: 'json',
                data: {
                    'menuCode': $('#AUTH').data('code')
                }
            },
            isOneDay:false,
            endDate: true,     //结束时间对象
            defaultTime:null, //默认时间
            minTime:null,   //最小时间
            maxTime:null,    //最大时间
            ifPermissions:true, //是否走权限验证
            changeDateBack: null //日期改变回调
        };
        opt = $.extend(true, dft, opt);
        //创建一个失去时间焦点的事件
        function createBlurEvent(_this, opt, bindEventObj) {
            bindEventObj.on('blur', function (ev) {
            	if(opt.endDate!=true){
            		return;
            	}
                var startTime = new Date(_this.val().replace(/\-/g, '/'));
                var endTime = new Date($(opt.dateEnd).val().replace(/\-/g, '/'));
                var flag = (endTime < startTime) ? false : true;
                if (!flag) {
                    $.zxsaas_plus.showalert("提示", "前后日期不合法!");
                    _this.val('');
                    $(opt.dateEnd).val('');
                    return false;
                }
            });
        }

        return this.each(function () {
            var _this = $(this);
            _this.prop('readonly', true);
            var dateTimeIcon='date-time-icon'
            _this.addClass(dateTimeIcon);//添加图标的样式
            if (opt.endDate && $(opt.dateEnd).length > 0) {
                $(opt.dateEnd).addClass(dateTimeIcon);//添加图标的样式
            }
            $.ajax(opt.ajaxOpt)
                .done(function (data) {
                    if (data.result == 1) {
                        // 有权限
                        if (data.data.hasPermissions == 1 ) {
                            var initValue = 0;
                            var minDateTime = opt.minTime || data.data.minDate;
                            var maxDateTime = opt.maxTime || data.data.maxDate;
                            //是否有结束时间
                            if (opt.endDate && $(opt.dateEnd).length > 0) {
                                $(opt.dateEnd).prop('readonly', true).datetimepicker({
                                    lang: "ch",
                                    format: "Y-m-d",
                                    timepicker: false,
                                    todayButton: false,
                                    value: maxDateTime,
                                    minDate: minDateTime,
                                    maxDate: maxDateTime
                                });
                                createBlurEvent(_this, opt, $(opt.dateEnd));
                                //优先级：默认时间 >  查询一天 >  查询本月的

                                //第一步  判断是否是本月
                                var minDate = new Date(minDateTime.replace(/-/g,"/"));
                                var maxDate =  new Date(maxDateTime.replace(/-/g,"/"));

                                //同月,取minDate
                                if(minDate.getFullYear()==maxDate.getFullYear() && minDate.getMonth()==maxDate.getMonth()){
                                    initValue = minDateTime;
                                }
                                //不同月 ，取 maxDate 的第一天
                                else{
                                    var oneDayMaxDate =new Date(maxDate);
                                    initValue = new Date(oneDayMaxDate.setDate(1)).format('yyyy-MM-dd');
                                }
                                //前一天
                                if(opt.isOneDay){
                                    initValue = new Date(maxDate.getTime() - 86400000).format('yyyy-MM-dd');
                                }
                                //默认时间
                                if(opt.defaultTime){
                                	initValue=opt.defaultTime;
                                }
                                if(!!opt.maxDateFlag){
                                    initValue=data.data.maxDate;
                                }
                            }

                            if (initValue == 0) {
                                initValue = data.data.maxDate;
                            }
                            
                            //默认时间
                            if(opt.defaultTime){
                            	initValue=opt.defaultTime;
                            }
                            
                            //开始时间初始化
                            _this.datetimepicker({
                                lang: "ch",
                                format: "Y-m-d",

                                timepicker: false,
                                todayButton: false,
                                value: initValue,
                                minDate: minDateTime,
                                maxDate: maxDateTime

                            });
                            createBlurEvent(_this, opt, _this);
                        }
                        else {
                        	if( opt.ifPermissions ){
                        		  _this.val(data.data.maxDate).css({'pointer-events':'none'});
                                  _this.parent().parent().find('input').val(data.data.maxDate).css({'pointer-events':'none'});
                        	}else{
								_this.val(data.data.maxDate).css({'pointer-events':''});
								_this.parent().parent().find('input').val(data.data.maxDate).css({'pointer-events':''});
                        		 var initValue = 0;
                        		 var changeDateBack = opt.changeDateBack || null;
                                 var minDateTime = opt.minTime || data.data.minDate;
                                 var maxDateTime = opt.maxTime || data.data.maxDate;
                        		 if (opt.endDate && $(opt.dateEnd).length > 0) {

                                     $(opt.dateEnd).prop('readonly', true).datetimepicker({
                                         lang: "ch",
                                         format: "Y-m-d",
                                         timepicker: false,
                                         todayButton: false,
                                         value: maxDateTime,
                                         minDate: minDateTime,
                                         maxDate: maxDateTime
                                     });
                                     createBlurEvent(_this, opt, $(opt.dateEnd));
                                     //优先级：默认时间 >  查询一天 >  查询本月的

                                     //第一步  判断是否是本月
                                     var minDate = new Date(minDateTime.replace(/-/g,"/"));
                                     var maxDate =  new Date(maxDateTime.replace(/-/g,"/"));

                                     //同月,取minDate
                                     if(minDate.getFullYear()==maxDate.getFullYear() && minDate.getMonth()==maxDate.getMonth()){
                                         initValue = minDateTime;
                                     }
                                     //不同月 ，取 maxDate 的第一天
                                     else{
                                         var oneDayMaxDate =new Date(maxDate);
                                         initValue = new Date(oneDayMaxDate.setDate(1)).format('yyyy-MM-dd');
                                     }
                                     //前一天
                                     if(opt.isOneDay){
                                         initValue = new Date(maxDate.getTime() - 86400000).format('yyyy-MM-dd');
                                     }
                                     //默认时间
                                     if(opt.defaultTime){
                                     	initValue=opt.defaultTime;
                                     }
                                 }

                                 if (initValue == 0) {
                                     initValue = data.data.maxDate;
                                 }
                                 
                                 //默认时间
                                 if(opt.defaultTime){
                                 	initValue=opt.defaultTime;
                                 }

                                 //日期回调
                                 if(opt.changeDateBack){
                                     changeDateBack=opt.changeDateBack;
                                 }
                                 
                                 //开始时间初始化
                                 _this.datetimepicker({
                                     lang: "ch",
                                     format: "Y-m-d",
                                     timepicker: false,
                                     todayButton: false,
                                     value: initValue,
                                     minDate: minDateTime,
                                     maxDate: maxDateTime,
									 onSelectDate: changeDateBack,

                                 });
                                 createBlurEvent(_this, opt, _this);
                        	}
                          
                        }
                    } else {
                        alert('error')
                    }
                })
                .fail(function () {
                    alert('error')
                })


        })
    }


    //会员
    // 如有修改，请注意修改会员模块下积分流水页面
    $.fn.vipPlu = function (opt) {

        //默认参数
        var def = {
            search: true, // 是否具有搜索功能
            isVipBox: true,// 是否显示会员卡
            TelPhoneGrid: true,
            defaultBtnText:"会员卡" //默认按钮的文本
        };
        //参数合并
        var options = $.extend({}, def, opt);

        return this.each(function () {
            //调用者对象 ，这里是指文本框
            var _this = $(this);
            init();
            //初始化
            function init() {
                initDom();
            }

            //初始化dom 载入
            function initDom() {
                loadUserDom();
                createThisEvent();
                createVipBixEvent();
            }

            //载入用户信息
            function loadUserDom() {
                _this.parent().parent().after(
                    `
                		 <div class="form-group col-sm-3 vipName">
    	 				    <label for="retailCardNum" class='width-25'>客户姓名:</label>
    	 				    <div class="input-group col-sm-8">
    	 				      <input type="text" class="form-control" id="vipName" readonly>
    	 				    </div>	
    	 			    </div>
    	 			    <span style="display:none;height:34px;line-height:34px;" id="vipInfoBox" >
    	 			    	
    			 			<div class="form-group">
    						    <label for="retailCardNum" >会员类型:</label>
    						    <div style="display:inline-block;">
    						      <span style="padding:6px;" id="vipType" ></span>
    						    </div>	
    					    </div>
    					    <div class="form-group">
    						    <label for="retailCardNum" >会员卡号:</label>
    						    <div style="display:inline-block;">
    						      <span style="padding:6px;" id="vipCode" ></span>
    						    </div>	
    					    </div>
    					    <div class="form-group">
    						    <label for="retailCardNum" >会员积分:</label>
    						    <div style="display:inline-block;">
    						      <span style="padding:6px;" id="vipScore" ></span>
    						    </div>	
    					    </div>
    					    <div class="form-group">
    						    <label for="retailCardNum" >储值金额:</label>
    						    <div style="display:inline-block;">
    						      <span style="padding:6px;" id="vipAmount" ></span>
    						    </div>	
    					    </div>
    				    </span>
    	 			    <span style="display:none;height:34px;line-height:34px;" id="vipInfoTip" >
    	 			    	
    				    </span>
    	 			    `
                );
            }

            //创建当前对象(文本框)的 默认事件
            function createThisEvent() {
                if (options.search) {
                    var $phoneBox = $('#phoneBox');
                    if ($phoneBox.size() < 1) {
                        //添加表格和提示
                        _this.parent().append(
                            `
    			             <div id="hint" style="background:#fff;z-index:5;width:100%;color:#e4393c;display:none;position:absolute;top:35px;"></div>
    			             <div id="phoneBox" style="background: #fff;z-index:1150;top:33px;display:none;position:absolute;">
    			                        <table id="phoneGrid"></table>
    			                        <div id="phoneGridPager"></div>
    			            </div>
    			            
                        `);
                        $('#phoneBox').css(opt.gridLocation, '0');
                    }
                    _this.on('focus', function () {
                        _this[0].select();
                    });
                    _this.on('blur', function () {
                        if (_this.val().trim() == "") {
                            _this.css({"border-color": "red"});
                            if(options.error){
                                options.error();
                            }
                        } else {
                            _this.css({"border-color": ""});
                        }
                    });

                    _this.on('keyup', function (e) {
                        var txt = _this.val().trim();
                        $("#pointArrived").val(0).attr("disabled",true); //偷懒操作外层零售开单的积分抵现用
                        ClearData();
                        $("#vipInfoBox").hide();
                        opt.changeVip();
                        $('#vipName').val('');
                        $('#vipType').text('');
                        $('#vipCode').text('');
                        $('#vipScore').text('');
                        $('#vipAmount').text('');
                        $('#vipName').prop('readonly', true);
                        if (txt.length < 4) {
                            $('#hint').show().html('至少输入4位！');
                            $('#phoneBox').hide();
                            if(options.error){
                                options.error();
                            }
                        }
                        else if (txt.length >= 4) {
                            $('#hint').hide().html('');
                            tableGrid(txt,
                                $('#phoneGrid'),
                                {
                                    loadComplete: function (data) {
                                        if (data.data.dataList.length == 0) {
                                            $("#hint").html('请输入正确的手机号！').show();
                                            $('#phoneBox').hide();
                                            if (_this.val().trim().length >= 4) {
                                                $('#vipName').prop('readonly', true);
                                            }

                                            if (_this.val().length == 11) {
                                                $('#hint').hide().html('');
                                                $('#vipName').prop('readonly', false).focus();
                                            }
                                        } else {
                                            if (_this.val().length >= 4) {
                                                $('#phoneBox').show();
                                            }
                                            $('#vipName').prop('readonly', true);
                                        }
                                        if(options.error){
                                            options.error();
                                        }
                                    }
                                }
                            );

                        }

                    })
                }
            }

            //创建会员卡的 默认事件
            function createVipBixEvent() {
                var $vipBox = $('#vipBox');
                var fisrtclickVip = 0;
                if ($vipBox.size() < 1 && options.isVipBox == true) {
                    _this.parent().append('<span class="input-group-btn showVipBox"><button data-toggle="modal" data-target="#myModalP" id="vipBox" class="btn btn-default"        type="button">'+options.defaultBtnText+'</button></span>');
                    loadModalDom();
                    //绑定会员卡点击事件
                    $('.showVipBox').click(function () {

                        $('#vipTable').resize();
                        var obj = $('#vipTable');
                        var txt = $('#search').val();
                        if (fisrtclickVip == 0) {
                            fisrtclickVip = 1;
                            tableGrid(txt, obj);
                        } else {

                        }


                        setTimeout(function () {
                            $("#searchVip").focus();
                        }, 40);
                    });

                    //会员页面的模糊搜索
                    $('#searchVip').on('keyup', function () {
                        var txt = $(this).val();

                        $('#vipTable').jqGrid('setGridParam', {
                            postData: {
                                'cardNum': txt,
                                'page': 1,
                                // 'rows': 10
                            },
                        }).trigger("reloadGrid")
                    });
                }
            }

            //表格控件的封装
            function tableGrid(txt, obj, callback) {

                $.jgrid.defaults.width = 1280;
                $.jgrid.defaults.responsive = true;
                $.jgrid.defaults.styleUI = 'Bootstrap';
                obj.jqGrid({
                    url: "/manager/component/vip/getVipVoList",
                    mtype: "POST",
                    datatype: "json",
                    jsonReader: {
                        root: 'data.dataList',
                        total: 'data.total'
                    },
                    postData: {vipPhone: txt},
                    colNames: ['id', '姓名', '电话号码', '会员卡号', '会员类型', '会员积分', '会员储值', 'isAmount', 'isScore','status'],
                    colModel: [
                        {name: 'id', index: 'id', sortable: true, align: 'center', hidden: true},
                        {name: 'vipName', index: 'vipName', sortable: false, align: 'center', width: 100},
                        {name: 'vipPhone', index: 'vipPhone', sortable: false, align: 'center', width: 100},
                        {name: 'cardNum', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
                        {name: 'cardTypeName', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
                        {name: 'score', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
                        {name: 'amount', index: 'cardTypeName', sortable: false, align: 'center', width: 100},
                        {
                            name: 'isAmount',
                            index: 'isAmount',
                            sortable: false,
                            align: 'center',
                            width: 100,
                            hidden: true
                        },
                        {name: 'isScore', index: 'isScore', sortable: false, align: 'center', width: 100, hidden: true},
                        {name: 'status', index: 'status', sortable: false, align: 'center', width: 100, hidden: true},
                    ],
                    sortable: false,
                    viewrecords: true,
                    rowNum: 9999,
                    rownumWidth: 35,
                    cellEdit: false,		//点击行勾选复选框
                    width: "100%",
                    autowidth: true,
                    shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                    loadComplete: function (data) {
                        if (callback && callback.loadComplete) {
                            callback.loadComplete(data);
                        }


                    },

                    ondblClickRow: function (rowid) {
                        var info = obj.getRowData(rowid);
                        fillData(obj,info,rowid);


                    },
                    //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
                    gridComplete: function () {
                        //第一行選中
                        obj.setRowData(1, false, {'background': '#DFF0D8'});

                    }
                });
                //obj.jqGrid('clearGridData');  //清空表格
                // 重新加载数据
                obj.jqGrid('setGridParam', {
                    url: "/manager/component/vip/getVipVoList",
                    mtype: "POST",
                    datatype: "json",
                    jsonReader: {
                        root: 'data.dataList',
                        total: 'data.total'
                    },
                    postData: {vipPhone: txt},

                }).trigger("reloadGrid");
            }

            function clearTabelBg(obj) {
                var ids = obj.getDataIDs();
                $.each(ids, function (idx, rowIds) {
                    obj.setRowData(rowIds, false, {background: ""});

                });
            }
            //填充数据
            function  fillData(obj,info,rowid) {
                if(info.isScore == 1){   //偷懒操作外层零售开单的积分抵现用
                    $("#pointArrived").val(0).removeAttr("disabled");
                }
                if(info.status == 1){
                    $('#vipInfoTip').show().text("会员卡号：{"+ info.cardNum + "}已禁用，不享有相应会员类型服务");
                    $("#pointArrived").attr("disabled",true);
                    $('#vipInfoBox').hide();
                }else{
                    $("#hint").hide();
                    $('#vipInfoTip').hide().text('');
                    $('#vipType').text(info.cardTypeName);
                    $('#vipCode').text(info.cardNum);
                    $('#vipScore').text(info.score);
                    $('#vipAmount').text(info.amount);
                    $('#vipInfoBox').show();
                }
                $('#vipName').val(info.vipName).prop('readonly', true);
                _this.val(info.vipPhone).data('vipId', info.id);
                $('#phoneBox,#hint').hide();
                $('#myModalP').modal('hide');
                clearTabelBg(obj);
                obj.setRowData(rowid, false, {'background': '#DFF0D8'});
                opt.changeVip(info)
            }
            //清空 data 数据
            function ClearData() {
                _this.removeData("vipId");
            };

            // 载入模态窗口 dom
            function loadModalDom() {
                $(document.body).append(
                    `
                        <div id="myModalP" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog" role="document" style="width:650px">
                           <div class="modal-content">
                               <div class="modal-header" style="background:#199ED8;">
                                   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                   <h4 class="modal-title">会员信息</h4>       
                               </div>
                               <div class="modal-body">
                               		<div class="row" style="height:35px;line-height:35px;">
                               			<div class="col-sm-8">
                               				<div class="row">                   	
                               					<div class="col-sm-2" style="text-align:right;" >搜&nbsp;索</div>
                               					<div class="col-sm-10"><input type="text" class="form-control" id="searchVip" placeholder="会员卡号,刷卡" id='search'></div>
                               				</div>                                                                                     
                               			</div>
                               			<div class="col-sm-4">
                               				<button type="button" class="btn btn-primary" data-dismiss="modal" id='entry'>确定</button>
                               				<button type="button" class="btn btn-default vipCancleE" data-dismiss="modal">取消</button>
                               			</div>
                               		</div>	
                                    <div class="row" id="vipRow" style="text-align:center;margin-left:10px;">
                                    	<div style="width:100%;height:auto;margin-top:10px;" id="vipContainer">
                                    		<table id="vipTable" style="width:100%;"></table>
                                    		<div id="vipPager"></div>
                                    	</div>
                                    </div>
                               </div>
                           </div>
                        </div>
                   </div>
                        `
                );


                $("#entry").on("click",function () {
                    var rowid=$("#vipTable").jqGrid("getGridParam","selrow");
                    if(rowid=="" || rowid==undefined){
                        $.zxsaas_plus.showalert("提示", "请选择一行!");
                        return false;
                    }else{
                        var info =$("#vipTable").getRowData(rowid);
                        fillData($("#vipTable"),info,rowid);
                    }
                });
                $(".vipCancleE").on("click",function () {
                    $('#myModalP').modal('hide');
                });
            }
        })
    }


//    营业员
    $.fn.storeSales = function (opt) {
        var ms = Math.floor(Math.random() * 10000)
        var def = {
            search: true,
            storeGrid: true,
            ifStore: false,
            listBox: true,
            checkMore: false,
            gridConfig: {
                colNames: ['id', '编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId', 'dataId', '备注'],
                colModel: [
                    {name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true},
                    {name: 'code', index: 'code', width: 100, align: 'left', sorttype: "string", sortable: false},
                    {name: 'name', index: 'name', width: 150, align: 'left', sorttype: 'string', sortable: false},
                    {
                        name: 'sectionName',
                        index: 'sectionName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: false
                    },
                    {
                        name: 'positionName',
                        index: 'positionName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: false
                    },
                    {
                        name: 'telephone',
                        index: 'telephone',
                        width: 150,
                        align: 'center',
                        sorttype: 'string',
                        sortable: false
                    },
                    {name: 'attrName', index: 'attrName', width: 100, align: 'left', sortable: false},
                    {name: 'sectionId', index: 'sectionId', width: 10, hidden: true},
                    {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                    {name: 'remark', index: 'remark', width: 100, align: 'left', sortable: false},

                ],
            },
            searchFun: function (e,queryKey) {
                if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                    $('.searchSaleMan').blur()
                } else {
                    $("#saleManModalGrid" + ms).jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {
                            'sectionIds': $('#' + opt.sectionId).data('sectionId'),
                            'queryKey': queryKey
                        },
                        page: 1
                    }).trigger("reloadGrid"); //重新载入
                }
            }
        }
        opt = $.extend({}, def, opt);
        return this.each(function () {
            var _this = $(this), t;
            _this.data('employeeId', '');
            _this.parent().append(`<div class="saleManerrorBox" style="display: none;color: red;position:absolute;top:33px;" >无结果</div>`)
            if (opt.search) {
                _this.parent().append(
                    '<div class="assistantBox" style="position: absolute;background: #fff;z-index: 5;width:100%;top:33px;"><table id="assistantGrid' + ms + '"></table><div id="assistantGridPager' + ms + '"></div></div>'
                );

                $.jgrid.defaults.width = 1280;
                $.jgrid.defaults.responsive = true;
                $.jgrid.defaults.styleUI = 'Bootstrap';
                $('#assistantGrid' + ms).jqGrid({
                    url: "/manager/component/employee/getEmployeeVoList",
                    mtype: "POST",
                    datatype: "json",
                    jsonReader: {
                        root: "data.employeeVoList",
                        repeatitems: false
                    },
                    postData: {
                        'sectionIds': ''
                    },
                    colNames: ['sectionId', '员工编码', '员工姓名', '所属部门'],
                    colModel: [
                        {name: 'employeeId', index: 'employeeId', sortable: false, align: 'center', hidden: true},
                        {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                        {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                        {name: 'sectionName', index: 'sectionName', sortable: false, align: 'center', width: 125}
                    ],
                    sortable: false,
                    viewrecords: true,
                    cellEdit: false,		//点击行勾选复选框
                    width: "100%",
                    autowidth: true,
                    shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                    loadComplete: function (data) {
                        if (data.result > 0) {
                            if (data.data.employeeVoList.length <= 0) {
                                _this.parent().find('.assistantBox').hide();
                                _this.parent().find('.saleManerrorBox').text('无结果').show();
                            } else {
                                if (_this.val() == '') {
                                    _this.parent().find('.assistantBox').hide();
                                    _this.parent().find('.saleManerrorBox').hide()
                                } else {

                                    _this.parent().find('.assistantBox').show();
                                    $('#assistantGrid' + ms).resize()
                                    _this.parent().find('.saleManerrorBox').hide()

                                }
                            }
                        } else {
                            _this.parent().find('.assistantBox').hide();
                            _this.parent().find('.saleManerrorBox').hide()
                        }


                    },
                    onSelectRow: function (rowid) {
                        var storeInfo = $('#assistantGrid' + ms).getRowData(rowid);
                        _this.val(storeInfo.name).data('employeeId', storeInfo.employeeId)
                        $(opt.salesPersonName).val(storeInfo.name).data('employeeId', storeInfo.employeeId)
                        $('.assistantBox').hide();
                        $('.saleManerrorBox').hide();
                    }
                });
                _this.keyup(function (e) {
                    if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                        _this.blur()
                    } else {
                        if (t) clearTimeout(t)
                        t = setTimeout(function () {
                            $('#assistantGrid' + ms).jqGrid('setGridParam', {
                                postData: {
                                    sectionIds: $('#' + opt.sectionId).data('sectionId'),
                                    queryKey: _this.val().trim()
                                }
                            }).trigger("reloadGrid")
                            _this.data('employeeId', '')
                        }, 300)
                    }
                })

                _this.focus(function () {
                    if ($('#' + opt.sectionId).data('sectionId') == '') {
                        $.zxsaas_plus.showalert("提示", "请先选择门店!");
                        _this.blur()
                    } else {
                        if (_this.val().trim() != '') {
                            if (t) clearTimeout(t)
                            t = setTimeout(function () {
                                $('#assistantGrid').jqGrid('setGridParam', {
                                    postData: {
                                        sectionIds: $('#' + opt.sectionId).data('sectionId'),
                                        queryKey: _this.val().trim()
                                    }
                                }).trigger("reloadGrid")

                            }, 300)
                        }
                    }


                })

//                $(document).on("click",function(event){
//                    if($(event.target).parents(".assistantBox").length==0 && !$(event.target).hasClass("assistantBox") && $(event.target).attr("id")!=_this.attr('id')){
//                        $('.assistantBox').hide();
//                        if(_this.data('employeeId') == ''){
//                            _this.parent().find('.saleManerrorBox').text('请选择营业员').show()
//                        }
//                    }
//                });

                $(document).on("keyup", function (e) {
                    if ((e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13)) {
                        return;
                    }
                    if ($("#assistantBox").is(":visible")) {
                        var selid = $('#assistantGrid').jqGrid('getGridParam', 'selrow');//获取行号
                        switch (e.keyCode) {
                            // up arrow
                            case 40:
                                $('#assistantGrid').jqGrid('setSelection', $("#assistantBox tr.jqgrow[id=" + selid + "]").next().attr("id") || $("#assistantBox tr.jqgrow:first").attr("id"), false);
                                break;
                            // down arrow
                            case 38:
                                $('#assistantGrid').jqGrid('setSelection', $("#assistantBox tr.jqgrow[id=" + selid + "]").prev().attr("id") || $("#storeBox tr.jqgrow:last").attr("id"), false);
                                break;
                            case 13 :
                                var storeInfo = $('#assistantGrid').getRowData(selid);
                                _this.val(storeInfo.name).data('employeeId', storeInfo.employeeId)
                                $('#assistantBox').hide();
                                $('.saleManerrorBox').hide();
                        }
                    }
                    if ($('#saleMan-modal').is(':visible')) {
                        var selid = $("#saleManModalGrid").jqGrid('getGridParam', 'selrow');//获取行号
                        switch (e.keyCode) {
                            // up arrow
                            case 40:
                                $("#saleManModalGrid").jqGrid('setSelection', $("#saleMan-modal tr.jqgrow[id=" + selid + "]").next().attr("id") || $("#saleMan-modal tr.jqgrow:first").attr("id"), false);
                                break;
                            // down arrow
                            case 38:
                                $("#saleManModalGrid").jqGrid('setSelection', $("#saleMan-modal tr.jqgrow[id=" + selid + "]").prev().attr("id") || $("#saleMan-modal tr.jqgrow:last").attr("id"), false);
                                break;
                            case 13 :
                                var storeInfo = $("#saleManModalGrid").getRowData(selid);
                                _this.val(storeInfo.name).data('employeeId', storeInfo.sectionId)
                                $dialog.modal('hide');
                                $('.saleManerrorBox').hide();
                        }
                    }
                });
            } else {
                $(this).prop('readonly', 'readonly');

            }

            if (opt.listBox) {
                if (_this.parent().find('.showSaleManBox').size() < 1) {
                    _this.parent().append(`<span class="input-group-btn showSaleManBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>`)
                }

                _this.parent().find('.showSaleManBox').click(function () {
                    $('.assistantBox').hide()
                    if ($('#saleMan-modal' + ms).size() < 1) {
                        $(document.body).append(
                            `<div id="saleMan-modal${ms}" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    <h4 class="modal-title">营业员选择</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="col-md-12">
                                                    	<div class='row'>
                                                        	<div class="col-md-5" style='padding-left:0'>
                                                            	<input type="text" class="form-control searchSaleMan"  placeholder="请输入编码,姓名,助记码">
                                                            </div>
                                                        </div>    
                                                        <div class="row gridBox" style='margin-top:8px;'></div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                	<button type="button" class="btn btn-default sureSaleMan" data-dismiss="modal">确认</button>
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                   
                                                </div>
                                            </div>
                                         </div>
                                    </div>`);
                        $dialog = $('#saleMan-modal' + ms);
                        $dialog.find('.gridBox').append('<table id="saleManModalGrid' + ms + '" class="zxsaastable"></table><div id="gridpager_saleMan' + ms + '"></div>')
                        $dialog.find('.searchSaleMan').on('keyup', function (e) {
                            opt.searchFun(e,$(this).val().trim())
                        })

                        // $dialog.find('.storeSale').on('click', function () {
                        //     window.top.openWorkBoxByMenutext2('员工档案', '/manager/authority/employeeInfo/toEmployee')
                        // })
                        if (!opt.checkMore) {
                            $('.sureSaleMan').hide()
                        }
                        $('.sureSaleMan').click(function () {
                            var ids = $("#saleManModalGrid" + ms).jqGrid('getGridParam', 'selarrrow')
                            var employeeIds = [];
                            var employeeName = [];
                            for (var i = 0; i < ids.length; i++) {
                                var employeeInfo = $("#saleManModalGrid" + ms).jqGrid('getRowData', ids[i])
                                employeeIds.push(employeeInfo.dataId)
                                employeeName.push(employeeInfo.name)
                            }
                            _this.val(employeeName.join(',')).data('employeeId', employeeIds.join(','))


                        })
                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';
                       
                        $("#saleManModalGrid" + ms).jqGrid({
                            url: "/manager/component/employee/getEmployeeVoPageList",
                            mtype: "post",
                            datatype: "json",
                            postData: {
                                'sectionIds': $('#' + opt.sectionId).data('sectionId'),
                                'page': 1,
                                'rows': 10
                            },
                            jsonReader: {
                                root: "data.dataList",
                                total: "data.total",
                                records: "data.records",
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            sortable: false,
                            rownumbers: true,	//显示行号
                            rowNum: 10,
                            rowList: [20, 25, 40],
                            pager: "#gridpager_saleMan" + ms,
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            multiselect: opt.checkMore,
                            rownumWidth: 50,
                            shrinkToFit: false,
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                var storeInfo = $("#saleManModalGrid" + ms).jqGrid('getRowData', rowid);
                                _this.val(storeInfo.name).data('employeeId', storeInfo.dataId)
                                $(opt.salesPersonName).val(storeInfo.name).data('employeeId', storeInfo.dataId)
                                $('#saleMan-modal' + ms).modal('hide')
                                $('.saleManerrorBox').hide()
                            },
                            gridComplete: function () {
                                $("#saleManModalGrid" + ms).setLabel(0, '序号')
                            },
                            loadComplete: function (data) {
                                console.log(data);
                            }

                        })
                       
                        if ($('#' + opt.sectionId).data('sectionId')) {
                        	 $("#saleManModalGrid" + ms).resize();
                             $('#saleMan-modal' + ms).modal('show')	 
                        } else {
                            $.zxsaas_plus.showalert("提示", "请先选择门店!");
                        }
                    } else {
                        if ($('#' + opt.sectionId).data('sectionId')) {
                            $("#saleManModalGrid" + ms).jqGrid('setGridParam', {
                                datatype: 'json',
                                postData: {
                                    'sectionIds': $('#' + opt.sectionId).data('sectionId'),
                                },
                                page: 1
                            }).trigger("reloadGrid"); //重新载入
                            $("#saleManModalGrid" + ms).resize();
                            $('#saleMan-modal' + ms).modal('show')
                        } else {
                            $.zxsaas_plus.showalert("提示", "请先选择门店!");
                        }
                    }
                })

            }
        })
    }

    //门店

    $.fn.storePlu = function (opt) {
        var id =GenNonDuplicateID();
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var def = {
            isStoreShow:true,//是否展示 底部的部门，按钮
            search: true,		//是否带搜索功能，默认为true
            storeGrid: true,		//是否有表格，默认为true
            ifStore: true,		//是否为门店，默认为false
            ifSaleMan: true,		//是否关联员工，默认为true
            listBox: true,		//是否有搜索按钮，默认为true
            checkMore: false,	//是否多选，默认为false
            isLoadDefaultName:true,  // 是否加载默认的名称
            saleManId: '',
            nodeIds: '',
            moduleCode: 'retail',
            gridId:'storePluGridId'+id,
            treeId:'storePluTreeId'+id,
            gridConfig: {
                colNames: ['id', '编码', '名称', '部门属性', '所属上级', '所属地区', '启用日期', 'dataId', '备注'],
                colModel: [
                    {name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true},
                    {name: 'code', index: 'code', width: 150, align: 'center', sorttype: "string", sortable: true},
                    {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: true},
                    {
                        name: 'attrName',
                        index: 'attrName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: true
                    },
                    {
                        name: 'parentName',
                        index: 'parentName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: true
                    },
                    {
                        name: 'regionName',
                        index: 'regionName',
                        width: 150,
                        align: 'left',
                        sorttype: 'string',
                        sortable: true
                    },
                    {name: 'usedDateStr', index: 'usedDateStr', width: 100, sortable: true},
                    {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                    {name: 'remark', index: 'remark', width: 100, sortable: true},
                ],
            },
            searchFun: function (e) {
                if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                    $('#searchStore').blur()
                } else {
                    $("#"+opt.gridId).jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {
                            'sectionIsStore': opt.ifStore ? '1' : '0',
                            'rootId': opt.nodeIds,
                            'queryKey': $('#searchStore').val().trim()
                        },
                        page: 1
                    }).trigger("reloadGrid"); //重新载入
                }
            },

            treeSetOption: {

                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: null}},
                callback: {
                    onClick: function (event, treeId, treeNode, msg) {
                        opt.nodeIds = treeNode.id;
                        $("#"+gridId).jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                'sectionIsStore': opt.ifStore ? '1' : '0',
                                'typeId': opt.nodeIds,
                                'queryKey': $('#searchStore').val().trim()
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }

                },
                view: {showIcon: false}
            },
            treeFun: function (setOption) {
                $.ajax({
                    type: 'post',
                    url: "/manager/component/section/getAccessSectionTreeNodeVoList",
                    data: {
                        'sectionIsStore': opt.ifStore ? '1' : '0'
                    },
                    dataType: "json",
                    success: function (data) {
                        $.fn.zTree.init($("#"+opt.treeId), opt.treeSetOption, data.data.dataList);
                        var zTree = $.fn.zTree.getZTreeObj(opt.treeId);
                        zTree.expandAll(false);
                        var nodes = zTree.getNodes();
                        for (var i = 0; i < nodes.length; i++) { //设置节点展开
                            zTree.expandNode(nodes[i], true, false, true);
                        }
                    }
                });
            },
            changeStore: function () {//改变门店时的回调函数

            },
            getFundAccount: function () {//初始化时根据门店获取资金账户

            }
        }

        opt = $.extend(def, opt);

        return this.each(function () {
            var _this = $(this), t
            _this.parent().append('<div class="errorBox" style="display: none;color: red;position:absolute;top:33px;" >我错了</div>')
            $.ajax({
                type: 'post',
                async:false,
                url: "/manager/component/section/getDefaultValue",
                data: {
                    'moduleCode': 'retail',
                    'sectionIsStore': '1'
                    //           			'sectionIsStore':opt.ifStore ? '1' : '0'
                },
                dataType: "json",
                success: function (data) {
                    data.data.sectionVo = data.data.sectionVo ||{}
                    // 是否加载默认的名称
                    if(opt.isLoadDefaultName){
                       _this.val(data.data.sectionVo.name ? data.data.sectionVo.name : '').data('sectionId', data.data.sectionVo.dataId ? data.data.sectionVo.dataId : '');
                    }
                    opt.getFundAccount(data.data.sectionVo.dataId);//获取资金账户
                    $('#storeBox').hide();
                    //待接口返回信息后决定是否展示门店新增或修改
                    if (data.data.addPermission) {
                        $('.addStore').show()
                    } else {
                        $('.addStore').hide()
                    }

                    if (data.data.updatePermission) {

                        $('.changeStore').show()
                    } else {
                        $('.changeStore').hide()
                    }
                }
            });

            if (opt.search) {
                var $storeBox = $('#storeBox');
                if ($storeBox.size() < 1) {
                    _this.parent().append([
                        '<div id="storeBox" style="position: absolute;background: #fff;z-index: 5;width:100%;top:33px;">',
                        '<table id="storeGrid" ></table>',
                        '<div id="storeGridPager"></div>',
                        '</div>',

                    ].join('\n'))
                    $('#storeGrid').jqGrid({
                        url: "/manager/component/section/getAccessSectionVoList",
                        mtype: "POST",
                        datatype: "json",
                        jsonReader: {
                            root: "data.sectionVoList",
                            repeatitems: false
                        },
                        postData: {
                            'sectionIsStore': opt.ifStore ? '1' : '0'
                        },
                        colNames: ['sectionId', '门店编码', '门店名称'],
                        colModel: [
                            {name: 'sectionId', index: 'sectionId', sortable: false, align: 'center', hidden: true},
                            {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                            {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},

                        ],
                        sortable: false,
                        viewrecords: true,
                        cellEdit: false,		//点击行勾选复选框
                        width: "100%",
                        autowidth: true,
                        shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                        gridComplete: function () {

                        },
                        loadComplete: function (data) {

                            if (!data.data.dataList.length) {
                                $('#storeBox').hide();
                                $('.errorBox').text('未搜索到相关数据').show()
                            } else {
                                if (_this.val() == '') {
                                    $('#storeBox').hide();
                                    $('.errorBox').hide()
                                } else {
                                    if (_this.data('sectionId') != '') {

                                    } else {
                                        $('#storeBox').show();
                                        $('#storeBox').resize()
                                        $('.errorBox').hide()
                                    }
                                }

                            }
                        },
                        onSelectRow: function (rowid) {
                            var storeInfo = $('#storeGrid').getRowData(rowid);

                            _this.val(storeInfo.name).data('sectionId', storeInfo.sectionId)
                            opt.getFundAccount(storeInfo.sectionId);//获取资金账户
                            $('#' + opt.saleManId).val('').data('employeeId', '');
                            $('#storeBox').hide();
                            $('.errorBox').hide();
                        }

                    })
                }
                _this.keyup(function (e) {
                    if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                        _this.blur()

                    } else {
                        if (t) clearTimeout(t)
                        t = setTimeout(function () {
                            $('#storeGrid').jqGrid('setGridParam', {
                                postData: {
                                    queryKey: _this.val().trim()
                                }
                            }).trigger("reloadGrid")
                            _this.data('sectionId', '');
                            opt.changeStore();//门店改变时调用的回调
                            $('#' + opt.saleManId).val('').data('employeeId', '');
                        }, 300)
                    }
                })

                _this.focus(function () {
                    if (_this.val().trim() != '') {
                        if (t) clearTimeout(t)
                        t = setTimeout(function () {
                            $('#storeGrid').jqGrid('setGridParam', {
                                postData: {
                                    queryKey: _this.val().trim()
                                }
                            }).trigger("reloadGrid")

                        }, 300)
                    }

                })

                $(document).on("click", function (event) {
                    if ($(event.target).parents("#storeBox").length == 0 && !$(event.target).hasClass("storeBox") && $(event.target).attr("id") != _this.attr('id')) {
                        $('#storeBox').hide();
                        if (_this.data('sectionId') == '') {
                            $('.errorBox').text('请选择门店').show()
                        }
                    }
                });

                $(document).on("keyup", function (e) {
                    if ((e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13)) {
                        return;
                    }
                    if ($("#storeBox").is(":visible")) {
                        var selid = $('#storeGrid').jqGrid('getGridParam', 'selrow');//获取行号
                        switch (e.keyCode) {
                            // up arrow
                            case 40:
                                $('#storeGrid').jqGrid('setSelection', $("#storeBox tr.jqgrow[id=" + selid + "]").next().attr("id") || $("#storeBox tr.jqgrow:first").attr("id"), false);
                                break;
                            // down arrow
                            case 38:
                                $('#storeGrid').jqGrid('setSelection', $("#storeBox tr.jqgrow[id=" + selid + "]").prev().attr("id") || $("#storeBox tr.jqgrow:last").attr("id"), false);
                                break;
                            case 13 :
                                var storeInfo = $('#storeGrid').getRowData(selid);
                                _this.val(storeInfo.name).data('sectionId', storeInfo.sectionId)
                                $('#storeBox').hide();
                                $('.errorBox').hide();
                        }
                    }
                    if ($('#store-modal').is(':visible')) {
                        var selid = $("#storeModalGrid").jqGrid('getGridParam', 'selrow');//获取行号
                        switch (e.keyCode) {
                            // up arrow
                            case 40:
                                $("#storeModalGrid").jqGrid('setSelection', $("#store-modal tr.jqgrow[id=" + selid + "]").next().attr("id") || $("#store-modal tr.jqgrow:first").attr("id"), false);
                                break;
                            // down arrow
                            case 38:
                                $("#storeModalGrid").jqGrid('setSelection', $("#store-modal tr.jqgrow[id=" + selid + "]").prev().attr("id") || $("#store-modal tr.jqgrow:last").attr("id"), false);
                                break;
                            case 13 :
                                var storeInfo = $("#storeModalGrid").getRowData(selid);
                                _this.val(storeInfo.name).data('sectionId', storeInfo.sectionId)
                                $('#store-modal').modal('hide');
                                $('.errorBox').hide();
                        }
                    }
                });
            } else {
                $(this).prop('readonly', true);
            }

            if (opt.listBox) {
                _this.parent().append('<span class="input-group-btn showBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
                var $dialog = $('#modal'+opt.gridId);
                _this.parent().find('.showBox>button').click(function () {
                    $('#storeBox').hide()
                    if ($dialog.size() < 1) {
                        var testIfSotre=opt.ifStore?'门店':'部门';
                    	$(document.body).append([
                            '<div id="modal'+opt.gridId+'" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">',
                            '<div class="modal-dialog modal-lg" role="document">',
                            '<div class="modal-content">',
                            '<div class="modal-header">',
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                            '<h4 class="modal-title">' + (testIfSotre +"选择" ) + '</h4>',
                            '</div>',
                            '<div class="modal-body">',
                            '<div class="col-xs-3"></div>',
                            '<div class="col-xs-9">',
                            '<div class="row"><input type="text" class="form-control" id="searchStore" placeholder="请输入'+testIfSotre+'名称或'+testIfSotre+'编码"></div>',
                            '<div class="row gridBox"></div>',
                            '</div>',
                            '</div>',
                            '<div class="modal-footer">',
                            '<button type="button" class="btn btn-default sureStore" data-dismiss="modal">确定</button>',
                            '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>',
                            // '<div style="float:left;" class="addStoreWrap"><button type="button" class=" addStore storeAuth">' + testIfSotre + '新增</button><button type="button" class="changeStore storeAuth">' + (opt.ifStore ? " 门店" : "部门" ) + '修改</button></div>',
                            '</div>',
                            '</div>',
                            '</div>',
                            '</div>',
                        ].join('\n'));
                        $dialog = $('#modal'+opt.gridId);
                        if(opt.isStoreShow===false){
                            $dialog.find('.addStoreWrap').hide()
                        }
                        $dialog.find('.col-xs-3').append('<ul id="'+opt.treeId+'" class="ztree"></ul>')
                        $dialog.find('.gridBox').append('<table id="'+opt.gridId+'" class="zxsaastable"></table><div id="gridpager_'+opt.gridId+'"></div>')
                       opt.treeSetOption.callback = {
                           onClick: function (event, treeId, treeNode, msg) {
                           opt.nodeIds = treeNode.id;
                           $("#"+opt.gridId).jqGrid('setGridParam', {
                               datatype: 'json',
                               postData: {
                                   'sectionIsStore': opt.ifStore ? '1' : '0',
                                   'typeId': opt.nodeIds,
                                   'queryKey': $('#searchStore').val().trim()
                               },
                               page: 1
                           }).trigger("reloadGrid"); //重新载入
                       }

                   }
                        opt.treeFun()
                        if (!opt.checkMore) {
                            $('.sureStore').hide()
                        }
                        $('.sureStore').click(function () {
                            var ids = $("#"+opt.gridId).jqGrid('getGridParam', 'selarrrow')
                            var sectionIds = [];
                            var sectionName = [];
                            for (var i = 0; i < ids.length; i++) {
                                var storeInfo = $("#"+opt.gridId).jqGrid('getRowData', ids[i])
                                sectionIds.push(storeInfo.dataId)
                                sectionName.push(storeInfo.name)
                            }
                            _this.val(sectionName.join(',')).data('sectionId', sectionIds.join(','))
							$('#' + opt.saleManId).val('').data('employeeId', '');
                             opt.changeStore();//门店改变时调用的回调

                        })
                        $('#searchStore').on('input propertychange', function (e) {
                            opt.searchFun(e)
                        })

                        $('.storeAuth').on('click', function () {
                            window.top.openWorkBoxByMenutext2('部门信息', '/manager/authority/sectionInfo/toSection')
                        })

                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';
                        $("#"+opt.gridId).jqGrid({
                            url: "/manager/component/section/getAccessSectionVoPageList",
                            mtype: "post",
                            datatype: "json",
                            postData: {
                                'sectionIsStore': opt.ifStore ? '1' : '0'
                            },
                            jsonReader: {
                                root: "data.dataList",
                                total: "data.total",
                                records: "data.records",
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            sortable: false,
                            rownumbers: true,	//显示行号
                            rowNum: 100,
                            rowList: [100, 200, 500],
                            pager: "#gridpager_"+opt.gridId,
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            rownumWidth: 50,
                            multiselect: opt.checkMore,
                            shrinkToFit: false,
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                console.log(_this);
                                var storeInfo = $("#"+opt.gridId).jqGrid('getRowData', rowid);
                                _this.parent().find('input').val(storeInfo.name).data('sectionId', storeInfo.dataId)
                                opt.getFundAccount(storeInfo.dataId);//获取资金账户
                                opt.changeStore();//门店改变时调用的回调
                                $('#' + opt.saleManId).val('').data('employeeId', '');
                                $dialog.modal('hide')
                                $('.errorBox').hide()
                            },
                            gridComplete: function () {
                                $("#"+opt.gridId).setLabel(0, '序号')
                                $("#gridpager_"+opt.gridId+"_left").remove()
                                $("#gridpager_"+opt.gridId+"_center").attr('colspan',2)
                            },
                            loadComplete:function(){
                                setTimeout(function(){
                                    $('#searchStore').focus()
                                },400)
                            }

                        })


                        $("#"+opt.gridId).resize();
                        $dialog.modal('show')


                    } else {
                        $("#"+opt.gridId).resize();
                        $dialog.modal('show')
                        $dialog.find('#searchStore').val('').trigger('input')
                    }
                })


            }

        })


    }


    $.fn.goodsPlu = function (opt) {
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var def = {
            search: true,		//是否带搜索功能，默认为true
            storeGrid: true,		//是否有表格，默认为true
            ifStore: false,		//是否为门店，默认为false
            ifSaleMan: true,		//是否关联员工，默认为true
            listBox: true,		//是否有搜索按钮，默认为true
            checkMore: false,		//是否多选，默认为false
            saleManId: '',
            sectionId: '',       //获取门店id元素
            nodeIds: '',
            moduleCode: 'retail',
            gridConfig: {
                colNames: ['goodsId', '商品编码', '商品名称', '条码', '商品类别', '品牌', '型号', '颜色', '配置'],
                colModel: [
                    {name: 'goodsId', index: 'dataId', sortable: false, align: 'center', hidden: true},
                    {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                    {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                    {name: 'barcode', index: 'barcode', sortable: false, align: 'center', width: 125},
                    {name: 'categoryName', index: 'categoryName', sortable: false, align: 'center', width: 125},
                    {name: 'brandName', index: 'brandName', sortable: false, align: 'center', width: 125},
                    {name: 'models', index: 'models', sortable: false, align: 'center', width: 125},
                    {name: 'color', index: 'color', sortable: false, align: 'center', width: 125},
                    {name: 'name', index: 'name', sortable: false, align: 'center', width: 125, hidden: true},
                ],
            },
            searchFun: function (e) {
                if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                    $('#searchStore').blur()
                } else {
                    $("#goodsModalGrid").jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {
                            'sectionIds': $(opt.sectionId).data('sectionId'),
                            'queryKey': $('#searchgoods').val().trim(),
                            'typeId': opt.nodeIds
                        },
                        page: 1
                    }).trigger("reloadGrid"); //重新载入
                }
            },

            treeSetOption: {
                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: null}},
                callback: {
                    onClick: function (event, treeId, treeNode, msg) {
                        opt.nodeIds = treeNode.id;
                        $("#goodsModalGrid").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                'sectionId': $(opt.sectionId).data('sectionId'),
                                'queryKey': $('#searchgoods').val().trim(),
//                                'typeId': treeNode.id
                                'goodsCategoryIds': treeNode.id
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }
                },
                view: {showIcon: false}
            },
            treeFun: function (setOption) {
                $.ajax({
                    type: 'post',
                    url: "/manager/component/goods/getGoodsClassTreeNodeVoList",
                    dataType: "json",
                    success: function (data) {
                        $.fn.zTree.init($("#goodsTreeData"), def.treeSetOption, data.data.dataList);
                        var zTree = $.fn.zTree.getZTreeObj("goodsTreeData");
//					    zTree.expandAll(true);//展开全部节点
                    }
                });
            },
            changeStore: function () {//改变门店时的回调函数

            },
            getFundAccount: function () {//初始化时根据门店获取资金账户

            }
        }

        opt = $.extend(def, opt);

        return this.each(function () {
            var _this = $(this), t
            _this.parent().append('<div class="goodsErrorBox" style="display: none;color: red;position:absolute;top:33px;" >我错了</div>')

            if (opt.search) {
                var $goodsBox = $('#goodsox');
                if ($goodsBox.size() < 1) {
                    _this.parent().append([
                        '<div id="goodsBox" style="position: absolute;background: #fff;z-index: 5;top:33px;">',
                        '<table id="goodsGrid" style="width:650px;"></table>',
                        '<div id="goodsGridPager"></div>',
                        '</div>',

                    ].join('\n'))

                    $('#goodsGrid').jqGrid({
                        url: "/manager/component/goods/getGoodsStockVoPageList",
                        mtype: "POST",
                        datatype: "json",
                        jsonReader: {
                            root: "data.goodsVoList",
                            repeatitems: false
                        },
                        postData: {
                            'sectionId': ''
                        },
                        colNames: ['goodsId', '商品编码', '商品名称', '条码', '商品类别', '品牌', '型号', '颜色', '配置'],
                        colModel: [
                            {name: 'goodsId', index: 'sectionId', sortable: false, align: 'center', hidden: true},
                            {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                            {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                            {name: 'barcode', index: 'barcode', sortable: false, align: 'center', width: 125},
                            {name: 'categoryName', index: 'categoryName', sortable: false, align: 'center', width: 125},
                            {name: 'brandName', index: 'brandName', sortable: false, align: 'center', width: 125},
                            {name: 'models', index: 'models', sortable: false, align: 'center', width: 125},
                            {name: 'color', index: 'color', sortable: false, align: 'center', width: 125},
                            {name: 'name', index: 'name', sortable: false, align: 'center', width: 125, hidden: true},
                        ],
                        sortable: false,
                        viewrecords: true,
                        cellEdit: false,		//点击行勾选复选框
                        width: "100%",
                        autowidth: true,
                        shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                        gridComplete: function () {

                        },
                        loadComplete: function (data) {

                            if (data.result < 0) {

                                $('#goodsBox').hide();
                                $('.goodsErrorBox').hide()


                            } else {
                                if (data.data.goodsVoList.length > 0) {
                                    $('#goodsBox').show();
                                    $('#goodsBox').resize()
                                    $('.goodsErrorBox').hide()
                                } else {
                                    if (_this.data('goodsId')) {

                                    } else {
                                        $('.goodsErrorBox').text('未查询到相关数据').show()
                                    }


                                }

                            }
                        },
                        onSelectRow: function (rowid) {
                            var goodsInfo = $('#goodsGrid').getRowData(rowid);

                            _this.val(goodsInfo.name).data('goodsId', goodsInfo.goodsId)
                            $('#goodsBox').hide();
                            $('.goodsErrorBox').hide();
                        }

                    })
                }
                _this.keyup(function (e) {
                    if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                        _this.blur()

                    } else {
                        if (_this.val().trim().length >= 0) {
                            if (t) clearTimeout(t)
                            t = setTimeout(function () {
                                $('#goodsGrid').jqGrid('setGridParam', {
                                    postData: {
                                        sectionId: $(opt.sectionId).data('sectionId'),
                                        queryKey: _this.val().trim()
                                    }
                                }).trigger("reloadGrid")
                                _this.data('goodsId', '');
                                $('#' + opt.saleManId).val('').data('employeeId', '');
                            }, 300)
                        }

                    }
                })

                _this.focus(function () {
                    if (_this.val().trim() != '') {
                        if (t) clearTimeout(t)
                        t = setTimeout(function () {
                            $('#goodsGrid').jqGrid('setGridParam', {
                                postData: {
                                    queryKey: _this.val().trim()
                                }
                            }).trigger("reloadGrid")

                        }, 300)
                    }

                })

                $(document).on("click", function (event) {
                    if ($(event.target).parents("#goodsBox").length == 0 && !$(event.target).hasClass("goodsBox") && $(event.target).attr("id") != _this.attr('id')) {
                        $('#goodsBox').hide();
                        if (_this.data('goodsId') == '') {
                            $('.goodsErrorBox').text('请选择商品').show()
                        } else {
                            $('.goodsErrorBox').hide()
                        }
                    }
                });
            } else {
                $(this).prop('disabled', true);
            }

            if (opt.listBox) {
                _this.parent().append('<span class="input-group-btn goodsBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
                var $dialog = $('#goods-modal');
                $('.goodsBox').click(function () {
                    $('#goodsBox').hide()
                    if ($dialog.size() < 1) {
                        $(document.body).append([
                            '<div id="goods-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">',
                            '<div class="modal-dialog modal-lg" role="document">',
                            '<div class="modal-content">',
                            '<div class="modal-header">',
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                            '<h4 class="modal-title">商品选择</h4>',
                            '</div>',
                            '<div class="modal-body">',
                            '<div class="col-xs-3" style="overflow:auto;"></div>',
                            '<div class="col-xs-9">',
                            '<div class="row"><input type="text" class="form-control" id="searchgoods" placeholder="请输入编码，名称，条码，助记码，型号"></div>',
                            '<div class="row gridBox"></div>',
                            '</div>',
                            '</div>',
                            '<div class="modal-footer">',
                            '<button type="button" class="btn btn-default sureGoods" data-dismiss="modal">确定</button>',
                            '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>',
//            					      '<div style="float:left;"><button type="button" class=" addStore storeAuth">'+(opt.ifStore ? " 门店" : "部门" )+ '新增</button><button type="button" class=" changeStore storeAuth">'+(opt.ifStore ? " 门店" : "部门" )+ '修改</button></div>',
                            '</div>',
                            '</div>',
                            '</div>',
                            '</div>',
                        ].join('\n'));
                        $dialog = $('#goods-modal');
                        $dialog.find('.col-xs-3').append('<ul id="goodsTreeData" class="ztree"></ul>')
                        $dialog.find('.gridBox').append('<table id="goodsModalGrid" class="zxsaastable"></table><div id="gridpager_goods"></div>')
                        opt.treeFun()
                        if (!opt.checkMore) {
                            $('.sureGoods').hide()
                        }
						$dialog.modal('show')
                        $('.sureGoods').click(function () {
                            var ids = $("#goodsModalGrid").jqGrid('getGridParam', 'selarrrow')
                            var goodsIds = [];
                            var goodsName = [];
                            for (var i = 0; i < ids.length; i++) {
                                var goodsInfo = $("#goodsModalGrid").jqGrid('getRowData', ids[i])
                                goodsIds.push(goodsInfo.goodsId)
                                goodsName.push(goodsInfo.name)
                            }
                            _this.val(goodsName.join(',')).data('goodsId', goodsIds.join(','))

                        })
                        $('#searchgoods').on('keyup', function (e) {
                            opt.searchFun(e)
                        })

                        $('.storeAuth').on('click', function () {
                            window.top.openWorkBoxByMenutext2('部门信息', '/manager/authority/sectionInfo/toSection')
                        })

                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';
                        $("#goodsModalGrid").jqGrid({
                            scroll: 1,
                            url: "/manager/inventory/common/getGoodsVoPageList",
                            mtype: "post",
                            datatype: "json",
                            postData: {
                                sectionId: $(opt.sectionId).data('sectionId'),
                            },
                            jsonReader: {
                                root: "data.goodsVoList",
                                total: "data.total",
                                records: "data.records",
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            gridview: true,
                            sortable: false,
                            rownumbers: true,	//显示行号 
                            rowNum: 100,
                            rowList: [20, 25, 40],
                            pager: "#gridpager_goods",
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            rownumWidth: 50,
                            multiselect: opt.checkMore,
                            shrinkToFit: false,
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                var storeInfo = $("#goodsModalGrid").jqGrid('getRowData', rowid);
                                _this.val(storeInfo.name).data('goodsId', storeInfo.goodsId)
                                $dialog.modal('hide')
                                $('.goodsErrorBox').hide()
                            },
                            gridComplete: function () {
                                $("#goodsModalGrid").setLabel(0, '序号')
                            },
                            loadComplete:function(){
								setTimeout(function(){
									$("#goodsModalGrid").resize();


								},500)
                            }

                        })



                    } else {
                        $dialog.modal('show')

                    }
                })

            }

        })
    }

    //资金账户组件
    $.fn.accountPlu = function (opt) {
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var def = {
            search: true,		//是否带搜索功能，默认为true
            storeGrid: true,		//是否有表格，默认为true
            containsVipAccount: '0',		//是否包含会员的账户(1:是;0:否)
            listBox: true,		//是否有搜索按钮，默认为true
            checkMore: false,		//是否多选，默认为false
            sectionId: '',       //获取门店id元素
            nodeIds: '',
            gridConfig: {
                colNames: ['dataId', '账户编码', '账户名称', '账户类型', '开户行', '账号'],
                colModel: [
                    {name: 'dataId', index: 'dataId', sortable: false, align: 'center', hidden: true},
                    {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                    {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                    {name: 'accountTypeName', index: 'accountTypeName', sortable: false, align: 'center', width: 125},
                    {name: 'bankCode', index: 'bankCode', sortable: false, align: 'center', width: 125},
                    {name: 'bankCard', index: 'bankCard', sortable: false, align: 'center', width: 125},
                ],
            },
            searchFun: function (e) {
                if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                    $('#searchAccount').blur()
                } else {
                    $("#accountModalGrid").jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {
                            'sectionIds': $(opt.sectionId).data('sectionId'),
                            'queryKey': $('#searchaccount').val().trim(),
                            'accounTypeCode': opt.nodeIds
                        },
                        page: 1
                    }).trigger("reloadGrid"); //重新载入
                }
            },

            treeSetOption: {
                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: null}},
                callback: {
                    onClick: function (event, treeId, treeNode, msg) {
                        opt.nodeIds = treeNode.code;
                        $("#accountModalGrid").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                'sectionId': $(opt.sectionId).data('sectionId'),
                                'queryKey': $('#searchaccount').val().trim(),
                                'typeId': treeNode.code
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }
                },
                view: {showIcon: false}
            },
            treeFun: function (setOption) {
                $.ajax({
                    type: 'post',
                    url: "/manager/component/account/getAccountClassTreeNodeVoList",
                    dataType: "json",
                    data: {
                        containsVipAccount: opt.containsVipAccount
                    },
                    success: function (data) {
                        $.fn.zTree.init($("#accountTreeData"), def.treeSetOption, data.data.dataList);
                        var zTree = $.fn.zTree.getZTreeObj("accountTreeData");
                        zTree.expandAll(true);//展开全部节点
                    }
                });
            },
        }

        opt = $.extend(def, opt);

        return this.each(function () {
            var _this = $(this) ;
            _this.parent().append('<div class="accountErrorBox" style="display: none;color: red;position:absolute;top:33px;" >我错了</div>')

            if (opt.search) {
                var $accountBox = $('#accountBox');
                if ($accountBox.size() < 1) {
                    _this.parent().append([
                        '<div id="accountBox" style="position: absolute;background: #fff;z-index: 5;top:33px;">',
                        '<table id="accountGrid" style="width:650px;"></table>',
                        '<div id="accountGridPager"></div>',
                        '</div>',

                    ].join('\n'))

                    $('#accountGrid').jqGrid({
                        url: "/manager/component/account/getAccountVoList",
                        mtype: "POST",
                        datatype: "json",
                        jsonReader: {
                            root: "data.goodsVoList",
                            repeatitems: false
                        },
                        postData: {
                            'sectionId': ''
                        },
                        colNames: ['accountId', '账户编码', '账户名称', '账户类型'],
                        colModel: [
                            {name: 'accountId', index: 'sectionId', sortable: false, align: 'center', hidden: true},
                            {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                            {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                            {name: 'barcode', index: 'barcode', sortable: false, align: 'center', width: 125},
//                	              	{name:'categoryName',index:'categoryName',sortable:false,align:'center',width:125},
//                	              	{name:'brandName',index:'brandName',sortable:false,align:'center',width:125},
//                	              	{name:'models',index:'models',sortable:false,align:'center',width:125},
//                	              	{name:'color',index:'color',sortable:false,align:'center',width:125},
//                	              	{name:'name',index:'name',sortable:false,align:'center',width:125,hidden:true},
                        ],
                        sortable: false,
                        viewrecords: true,
                        cellEdit: false,		//点击行勾选复选框
                        width: "100%",
                        autowidth: true,
                        shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                        gridComplete: function () {

                        },
                        loadComplete: function (data) {

                            if (data.result < 0) {

                                $('#accountBox').hide();
                                $('.accountErrorBox').hide()


                            } else {
                                if (data.data.goodsVoList.length > 0) {
                                    $('#accountBox').show();
                                    $('#accountBox').resize()
                                    $('.accountErrorBox').hide()
                                } else {
                                    if (_this.data('accountId')) {

                                    } else {
                                        $('.accountErrorBox').text('未查询到相关数据').show()
                                    }


                                }

                            }
                        },
                        onSelectRow: function (rowid) {
                            var goodsInfo = $('#accountGrid').getRowData(rowid);

                            _this.val(goodsInfo.name).data('goodsId', goodsInfo.goodsId)
                            $('#accountBox').hide();
                            $('.accountErrorBox').hide();
                        }

                    })
                }
                _this.keyup(function (e) {
                    if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                        _this.blur()

                    } else {
                        if (_this.val().trim().length >= 0) {
                            if (t) clearTimeout(t)
                            t = setTimeout(function () {
                                $('#accountGrid').jqGrid('setGridParam', {
                                    postData: {
                                        sectionId: $(opt.sectionId).data('sectionId'),
                                        queryKey: _this.val().trim()
                                    }
                                }).trigger("reloadGrid")
                                _this.data('accountId', '');

                            }, 300)
                        }

                    }
                })

                _this.focus(function () {
                    if (_this.val().trim() != '') {
                        if (t) clearTimeout(t)
                        t = setTimeout(function () {
                            $('#goodsGrid').jqGrid('setGridParam', {
                                postData: {
                                    queryKey: _this.val().trim()
                                }
                            }).trigger("reloadGrid")

                        }, 300)
                    }

                })

//           	$(document).on("click",function(event){
//        		if($(event.target).parents("#goodsBox").length==0 && !$(event.target).hasClass("goodsBox") && $(event.target).attr("id")!=_this.attr('id')){
//        			$('#goodsBox').hide();
//        			if(_this.data('goodsId') == ''){
//        				$('.goodsErrorBox').text('请选择商品').show()
//        			}else{
//        				$('.goodsErrorBox').hide()
//        			}
//        		}
//        	});
            } else {
                $(this).prop('disabled', true);
            }

            if (opt.listBox) {
                _this.parent().append('<span class="input-group-btn accountBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
                var $dialog = $('#account-modal');
                $('.accountBox').click(function () {
                	if($(opt.sectionId).data('sectionId') == ''){
                		$.zxsaas_plus.showalert("提示","请先选择部门!");
                		return 
                	}
                    $('#accountBox').hide()
                    if ($dialog.size() < 1) {
                        $(document.body).append([
                            '<div id="account-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">',
                            '<div class="modal-dialog modal-lg" role="document">',
                            '<div class="modal-content">',
                            '<div class="modal-header">',
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                            '<h4 class="modal-title">资金账户选择</h4>',
                            '</div>',
                            '<div class="modal-body">',
                            '<div class="col-xs-3" style="overflow:auto;"></div>',
                            '<div class="col-xs-9">',
                            '<div class="row"><input type="text" class="form-control" id="searchaccount" placeholder="请输入账户名称或账户编码"></div>',
                            '<div class="row gridBox"></div>',
                            '</div>',
                            '</div>',
                            '<div class="modal-footer">',
                            '<button type="button" class="btn btn-default sureAccount" data-dismiss="modal">确定</button>',
                            '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>',
//            					      '<div style="float:left;"><button type="button" class=" addStore storeAuth">'+(opt.ifStore ? " 门店" : "部门" )+ '新增</button><button type="button" class=" changeStore storeAuth">'+(opt.ifStore ? " 门店" : "部门" )+ '修改</button></div>',
                            '</div>',
                            '</div>',
                            '</div>',
                            '</div>',
                        ].join('\n'));
                        $dialog = $('#account-modal');
                        $dialog.find('.col-xs-3').append('<ul id="accountTreeData" class="ztree"></ul>')
                        $dialog.find('.gridBox').append('<table id="accountModalGrid" class="zxsaastable"></table><div id="gridpager_account"></div>')
                        opt.treeFun()
                        if (!opt.checkMore) {
                            $('.sureAccount').hide()
                        }
                        $('.sureAccount').click(function () {
                            var ids = $("#accountModalGrid").jqGrid('getGridParam', 'selarrrow')
                            var accountIds = [];
                            var accountName = [];
                            for (var i = 0; i < ids.length; i++) {
                                var accountInfo = $("#accountModalGrid").jqGrid('getRowData', ids[i])
                                accountIds.push(accountInfo.dataId)
                                accountName.push(accountInfo.name)
                            }
                            _this.val(accountName.join(',')).data('accountId', accountIds.join(','))

                        })
                        $('#searchaccount').on('keyup', function (e) {
                            opt.searchFun(e)
                        })

                        $('.storeAuth').on('click', function () {
                            window.top.openWorkBoxByMenutext2('部门信息', '/manager/authority/sectionInfo/toSection')
                        })

                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';
                        $("#accountModalGrid").jqGrid({
                            url: "/manager/component/account/getAccountVoList",
                            mtype: "post",
                            datatype: "json",
                            postData: {
                        		sectionIds: $(opt.sectionId).data('sectionId'),
                            },
                            jsonReader: {
                                root: "data.dataList",
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            sortable: false,
                            rownumbers: true,	//显示行号
                            rowNum: 100,
                            rowList: [100, 200, 500],
                            pager: "#gridpager_account",
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            rownumWidth: 50,
                            multiselect: opt.checkMore,
                            shrinkToFit: false,
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                var accountInfo = $("#accountModalGrid").jqGrid('getRowData', rowid);
                                _this.val(accountInfo.name).data('accountId', accountInfo.dataId)
                                $dialog.modal('hide')
                                $('.accountErrorBox').hide()
                            },
                            gridComplete: function () {
                                $("#accountModalGrid").setLabel(0, '序号')
                                $("#gridpager_account_left").remove()
                                $("#gridpager_account_center").attr('colspan',2)
                            },

                        })
                        $("#accountModalGrid").resize();
                        $dialog.modal('show')


                    } else {
                    	$("#accountModalGrid").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                'sectionIds': $(opt.sectionId).data('sectionId'),
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                        $("#accountModalGrid").resize();
                        $dialog.modal('show')

                    }
                })

            }

        })
    }


    //往来单位组件
    $.fn.contactUnitPlu = function (opt) {
        $.jgrid.defaults.styleUI = 'Bootstrap';
        var def = {
            search: true,		//是否带搜索功能，默认为true
            storeGrid: true,		//是否有表格，默认为true
            listBox: true,		//是否有搜索按钮，默认为true
            checkMore: false,		//是否多选，默认为false
            nodeIds: '',
            gridConfig: {
                colNames: ['dataId', '往来单位编码', '往来单位名称', '往来单位类型'],
                colModel: [
                    {name: 'dataId', index: 'dataId', sortable: false, align: 'center', hidden: true},
                    {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                    {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                    {
                        name: 'contactUnitClassName',
                        index: 'accountTypeName',
                        sortable: false,
                        align: 'center',
                        width: 125
                    },
                ],
            },
            searchFun: function (e) {
                if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                    $('#searchContactUnit').blur()
                } else {
                    $("#ContactUnitModalGrid").jqGrid('setGridParam', {
                        datatype: 'json',
                        postData: {
                            'queryKey': $('#searchContactUnit').val().trim(),
                        },
                        page: 1
                    }).trigger("reloadGrid"); //重新载入
                }
            },

            treeSetOption: {
                data: {simpleData: {enable: true, idKey: "id", pIdKey: "parentId", rootPId: null}},
                callback: {
                    onClick: function (event, treeId, treeNode, msg) {
                        opt.nodeIds = treeNode.id;
                        $("#ContactUnitModalGrid").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                'queryKey': $('#searchContactUnit').val().trim(),
                                'typeId': treeNode.id
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }
                },
                view: {showIcon: false}
            },
            treeFun: function (setOption) {
                $.ajax({
                    type: 'post',
                    url: "/manager/component/contactUnit/getContactUnitClassTreeNodeVoList",
                    dataType: "json",
                    success: function (data) {
                        $.fn.zTree.init($("#ContactUnitTreeData"), def.treeSetOption, data.data.dataList);
                        var zTree = $.fn.zTree.getZTreeObj("ContactUnitTreeData");
                        zTree.expandAll(true);//展开全部节点
                    }
                });
            },
        }

        opt = $.extend(def, opt);

        return this.each(function () {
            var _this = $(this);
            var t = null;
            _this.data('contactUnitId','')
            _this.parent().append('<div class="accountErrorBox" style="display: none;color: red;position:absolute;top:33px;" >我错了</div>')

            if (opt.search) {
                var $accountBox = $('#accountBox');
                if ($accountBox.size() < 1) {
                    _this.parent().append([
                        '<div id="accountBox" style="position: absolute;background: #fff;z-index: 5;top:33px;">',
                        '<table id="accountGrid" style="width:650px;"></table>',
                        '<div id="accountGridPager"></div>',
                        '</div>',

                    ].join('\n'))

                    $('#accountGrid').jqGrid({
                        url: "/manager/component/account/getAccountVoList",
                        mtype: "POST",
                        datatype: "json",
                        jsonReader: {
                            root: "data.goodsVoList",
                            repeatitems: false
                        },
                        postData: {
                            'sectionId': ''
                        },
                        colNames: ['accountId', '账户编码', '账户名称', '账户类型'],
                        colModel: [
                            {name: 'accountId', index: 'sectionId', sortable: false, align: 'center', hidden: true},
                            {name: 'code', index: 'code', sortable: false, align: 'center', width: 125},
                            {name: 'name', index: 'name', sortable: false, align: 'center', width: 125},
                            {name: 'barcode', index: 'barcode', sortable: false, align: 'center', width: 125},
//                	              	{name:'categoryName',index:'categoryName',sortable:false,align:'center',width:125},
//                	              	{name:'brandName',index:'brandName',sortable:false,align:'center',width:125},
//                	              	{name:'models',index:'models',sortable:false,align:'center',width:125},
//                	              	{name:'color',index:'color',sortable:false,align:'center',width:125},
//                	              	{name:'name',index:'name',sortable:false,align:'center',width:125,hidden:true},
                        ],
                        sortable: false,
                        viewrecords: true,
                        cellEdit: false,		//点击行勾选复选框
                        width: "100%",
                        autowidth: true,
                        shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                        gridComplete: function () {

                        },
                        loadComplete: function (data) {

                            if (data.result < 0) {

                                $('#accountBox').hide();
                                $('.accountErrorBox').hide()


                            } else {
                                if (data.data.goodsVoList.length > 0) {
                                    $('#accountBox').show();
                                    $('#accountBox').resize()
                                    $('.accountErrorBox').hide()
                                } else {
                                    if (_this.data('accountId')) {

                                    } else {
                                        $('.accountErrorBox').text('未查询到相关数据').show()
                                    }


                                }

                            }
                        },
                        onSelectRow: function (rowid) {
                            var goodsInfo = $('#accountGrid').getRowData(rowid);

                            _this.val(goodsInfo.name).data('goodsId', goodsInfo.goodsId)
                            $('#accountBox').hide();
                            $('.accountErrorBox').hide();
                        }

                    })
                }
                _this.keyup(function (e) {
                    if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                        _this.blur()

                    } else {
                        if (_this.val().trim().length >= 0) {
                            if (t) clearTimeout(t)
                            t = setTimeout(function () {
                                $('#accountGrid').jqGrid('setGridParam', {
                                    postData: {
                                        sectionId: $(opt.sectionId).data('sectionId'),
                                        queryKey: _this.val().trim()
                                    }
                                }).trigger("reloadGrid")
                                _this.data('accountId', '');

                            }, 300)
                        }

                    }
                })

                _this.focus(function () {
                    if (_this.val().trim() != '') {
                        if (t) clearTimeout(t)
                        t = setTimeout(function () {
                            $('#goodsGrid').jqGrid('setGridParam', {
                                postData: {
                                    queryKey: _this.val().trim()
                                }
                            }).trigger("reloadGrid")

                        }, 300)
                    }

                })

//           	$(document).on("click",function(event){
//        		if($(event.target).parents("#goodsBox").length==0 && !$(event.target).hasClass("goodsBox") && $(event.target).attr("id")!=_this.attr('id')){
//        			$('#goodsBox').hide();
//        			if(_this.data('goodsId') == ''){
//        				$('.goodsErrorBox').text('请选择商品').show()
//        			}else{
//        				$('.goodsErrorBox').hide()
//        			}
//        		}
//        	});
            } else {
                $(this).prop('disabled', true);
            }

            if (opt.listBox) {

                _this.parent().append('<span class="input-group-btn ContactUnitBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
                var $dialog = $('#ContactUnit-modal');
                $('.ContactUnitBox button').click(function () {
                    $('#ContactUnitBox').hide()
                    if ($dialog.size() < 1) {
                        $(document.body).append([
                            '<div id="ContactUnit-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">',
                            '<div class="modal-dialog modal-lg" role="document">',
                            '<div class="modal-content">',
                            '<div class="modal-header">',
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                            '<h4 class="modal-title">往来单位选择</h4>',
                            '</div>',
                            '<div class="modal-body">',
                            '<div class="col-xs-3" style="overflow:auto;"></div>',
                            '<div class="col-xs-9">',
                            '<div class="row"><input type="text" class="form-control" id="searchContactUnit" placeholder="请输入单位名称或单位编码"></div>',
                            '<div class="row gridBox"></div>',
                            '</div>',
                            '</div>',
                            '<div class="modal-footer">',
                            '<button type="button" class="btn btn-default sureContactUnit" data-dismiss="modal">确定</button>',
                            '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>',
//            					      '<div style="float:left;"><button type="button" class="addStore storeAuth">'+(opt.ifStore ? " 门店" : "部门" )+ '新增</button><button type="button" class=" changeStore storeAuth">'+(opt.ifStore ? " 门店" : "部门" )+ '修改</button></div>',
                            '</div>',
                            '</div>',
                            '</div>',
                            '</div>',
                        ].join('\n'));
                        $dialog = $('#ContactUnit-modal');
                        $dialog.find('.col-xs-3').append('<ul id="ContactUnitTreeData" class="ztree"></ul>')
                        $dialog.find('.gridBox').append('<table id="ContactUnitModalGrid" class="zxsaastable"></table><div id="gridpager_ContactUnit"></div>')
                        opt.treeFun()
                        if (!opt.checkMore) {
                            $('.sureContactUnit').hide()
                        }
                        $('.sureContactUnit').click(function () {
                            var ids = $("#ContactUnitModalGrid").jqGrid('getGridParam', 'selarrrow')
                            var ContactUnitIds = [];
                            var ContactUnitName = [];
                            for (var i = 0; i < ids.length; i++) {
                                var ContactUnitInfo = $("#ContactUnitModalGrid").jqGrid('getRowData', ids[i])
                                ContactUnitIds.push(ContactUnitInfo.dataId)
                                ContactUnitName.push(ContactUnitInfo.name)
                            }
                            _this.val(ContactUnitName.join(',')).data('contactUnitId', ContactUnitIds.join(','))

                        })
                        $('#searchContactUnit').on('keyup', function (e) {
                            opt.searchFun(e)
                        })

                        $('.storeAuth').on('click', function () {
                            window.top.openWorkBoxByMenutext2('部门信息', '/manager/authority/sectionInfo/toSection')
                        })

                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';
                        $("#ContactUnitModalGrid").jqGrid({
                            url: "/manager/component/contactUnit/getContactUnitVoPageList",
                            mtype: "post",
                            datatype: "json",
                            jsonReader: {
                                root: "data.dataList",
                                records: 'data.records',
                                total: 'data.total',
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            sortable: false,
                            rownumbers: true,	//显示行号
                            rowNum: 10,
                            rowList: [20, 25, 40],
                            pager: "#gridpager_ContactUnit",
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            rownumWidth: 50,
                            multiselect: opt.checkMore,
                            shrinkToFit: true,
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                var ContactUnitInfo = $("#ContactUnitModalGrid").jqGrid('getRowData', rowid);
                                _this.val(ContactUnitInfo.name).data('contactUnitId', ContactUnitInfo.dataId);
                                if(opt.getCouponName){
                                	opt.getCouponName(ContactUnitInfo.dataId);
                                }
                                
                                $dialog.modal('hide')
                                $('.ContactUnitErrorBox').hide()
                            },
                            gridComplete: function () {
                                $("#ContactUnitModalGrid").setLabel(0, '序号')
                                $('table th').css('text-align', 'center');
                            },

                        })
                        $("#ContactUnitModalGrid").resize();
                        $dialog.modal('show')


                    } else {
                        $("#ContactUnitModalGrid").resize();
                        $dialog.modal('show')

                    }
                })

            }

        })
    }

    /**
     * 生成一个用不重复的ID (时间戳 随机数前置 36进制 加入随机数长度控制);
     */
    function GenNonDuplicateID(randomLength){
        return Number(Math.random().toString().substr(3,randomLength||3) + Date.now()).toString(36)
    }
})(jQuery, window, document)





;(function ($) {
	
	  //1.定义jquery的扩展方法combobox
  $.fn.combobox = function (options, param) {
      if (typeof options == 'string') {
          return $.fn.combobox.methods[options](this, param);
      }
      //2.将调用时候传过来的参数和default参数合并
      options = $.extend({}, $.fn.combobox.defaults, options || {});
      //3.添加默认值
      var target = $(this);
      target.data('id','');
      target.empty();
      target.prop('disabled',true)
      target.attr('placeholder', options.placeholder);
      
      target.parent().append(
          '<div class="ComboBox" style="position: absolute;background: #fff;z-index: 5;top:34px;display:none;width:100%;">'+
				'<ul id="'+options.id+'" class="ztree" style="max-height:250px;overflow:auto;"></ul>'+
				// '<div style="margin-top:10px;text-align:center;"><button type="button" class="btn btn-default sureOptBtn">确定</button><button type="button" class="btn btn-default ml15 cancelOptBtn">取消</button></div>'+
			'</div>'+
				
			'<span class="input-group-btn showComboBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-triangle-bottom"></span></button></span>'	
      );
      
      function treeFun(url,params){
      	options.treeSetOption.callback = {
				onCheck:function(event, treeId, treeNode){
					options.treeId = treeId
					var ids = [];
					var names = [];
					var ztree = $.fn.zTree.getZTreeObj(options.id);
					var nodes = ztree.getCheckedNodes();
					if(nodes && nodes.length>0){
						$.each(nodes,function(idx,node){
							var halfCheck = node.getCheckStatus().half;
							if(options.checkType == 'radio'){//如果是单选，就不剔除父元素节点了.......此处省略好多字
								if(!halfCheck){
									ids.push(options.id =='OrganizationTree' ? node.typeAndId : node.id);
									names.push(node.name);
                                    $('#'+options.id).parent().siblings(".showComboBox").trigger("click");
								}
							}else{
								if(!halfCheck && !node.isParent ){ // && !node.isParent  剔除父元素节点又要了，第五次修改
									ids.push(options.id =='OrganizationTree' ? node.typeAndId : node.id);
									names.push(node.name);
								}
							}

						});
					}

					target.val(names.join(',')).attr('title',names.join(',')).change()
					if(options.id =='OrganizationTree'){
						target.data('id',ids.join('-'))
					}else{
						target.data('id',ids.join(','))
					}

					// changeComboBox()
					if(options.callback){
						var data = ids.join(',');
						options.callback(data)
					}
					                 
				}
      	}
      	if(options.checkType == 'radio'){
      	    options.treeSetOption.check = {
                enable: true,
                chkStyle: "radio",  //单选框
                radioType: "all"   //对所有节点设置单选
            }
        }else{
			options.treeSetOption.check = {
				enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "ps" }
			}
        }
      	$.ajax({
				type: 'post',
				url: url,
				data:params,
				dataType: "json",
				success: function(data) {
					$.fn.zTree.init($("#"+options.id), options.treeSetOption,data.data.dataList);
					var zTree = $.fn.zTree.getZTreeObj(options.id);
				    zTree.expandAll(true);//展开全部节点
                    loadCheckData()
				}
			});
      }
     
      if(options.search){
		  target.prop('disabled',false)
		  //监听关键字input输入框文字变化事件
		  target.bind('input propertychange', function() {
			  var _keywords = $(this).val().trim();
              searchNodeLazy(_keywords); //调用延时处理
		  });

		  var timeoutId = null;
		  // 有输入后定时执行一次，如果上次的输入还没有被执行，那么就取消上一次的执行
		  function searchNodeLazy(_keywords) {
			  if (timeoutId) { //如果不为空,结束任务
				  clearTimeout(timeoutId);
			  }
			  timeoutId = setTimeout(function() {
			      if(target.parent().find('.ComboBox').is(':hidden')){
					  changeComboBox()
                  }
                  treeFun(options.url,{queryKey:_keywords})
				  target.focus();//输入框重新获取焦点
			  }, 500);
		  }
      }
      //点击确认取消或下拉图标时进行操作
      function changeComboBox(){
      	target.parent().find('.glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-top')
      	target.parent().find('.ComboBox').toggle()
      }
      //点击下拉图标
      target.parent().find('.showComboBox').unbind("click").on("click", function (e) {
          var treeId= $('#'+options.id)
          var len =treeId.children().length
          changeComboBox()
          if(len <= 0){
              treeFun(options.url,options.param)
          }else{
              loadCheckData()
          }
      });

      function loadCheckData() {
          var id=$.trim(target.data('id'))
          var ids=id.split(',')
          var treeObj = $.fn.zTree.getZTreeObj(options.id);
          treeObj.checkAllNodes(false);
          for(var i=0;i<ids.length;i++){
              var item=ids[i]
              if($.trim(item)!=""){
                  var nodes=treeObj.getNodes();
                  var selectedNode=treeObj.getNodeByParam("id", item)
                  treeObj.checkNode(selectedNode, true, true);
              }
          }
      }

	  $(document).mouseup(function(e){
		  var _con = $('.ComboBox,.showComboBox');   // 设置目标区域
		  if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
			  $('.glyphicon-triangle-bottom').removeClass('glyphicon-triangle-top')
			  $('.ComboBox').hide()
		  }
	  });

      //根据产品需求，取消确认功能按钮及确认事件。
      //确定按钮点击事件
      // target.parent().find('.sureOptBtn').unbind("click").on("click", function (e) {
      // 	    var ids = [];
		// 	var names = [];
		// 	var ztree = $.fn.zTree.getZTreeObj(options.id);
		// 	var nodes = ztree.getCheckedNodes();
		// 	if(nodes && nodes.length>0){
		// 		$.each(nodes,function(idx,node){
		// 			var halfCheck = node.getCheckStatus().half;
		// 			if(options.checkType == 'radio'){//如果是单选，就不剔除父元素节点了.......此处省略好多字
		// 				if(!halfCheck){
		// 					ids.push(options.id =='OrganizationTree' ? node.typeAndId : node.id);
		// 					names.push(node.name);
		// 				}
      //               }else{
		// 				if(!halfCheck && !node.isParent ){ // && !node.isParent  剔除父元素节点又要了，第五次修改
		// 					ids.push(options.id =='OrganizationTree' ? node.typeAndId : node.id);
		// 					names.push(node.name);
		// 				}
      //               }
	  //
		// 		});
		// 	}
		//
		// 	target.val(names.join(',')).attr('title',names.join(',')).change()
		// 	if(options.id =='OrganizationTree'){
		// 		target.data('id',ids.join('-'))
		// 	}else{
		// 		target.data('id',ids.join(','))
		// 	}
		//
		// 	changeComboBox()
      //       if(options.callback){
		// 	    var data = ids.join(',');
		// 	    options.callback(data)
      //       }
      //
      // });
      //
      // target.parent().find('.cancelOptBtn').unbind("click").on("click", function (e) {
      // 	changeComboBox()
      // });
  }

  //5.如果传过来的是字符串，代表调用方法。
  $.fn.combobox.methods = {
  	//获取值	
      getValue: function (jq) {
          return jq.data('id');
      },
      //设置值
      setValue: function (jq, param) {
          jq.val(param);
      },
      //重新加载
      load: function (jq, url) {
          
      }
  };

  //6.默认参数列表
  $.fn.combobox.defaults = {
      url: null,
      param: null,
      data: null,
      id:null,
      valueField: 'value',
      textField: 'text',
      placeholder: '请选择',
      treeId:null,
      onBeforeLoad: function (param) { },
      onLoadSuccess: function () { },
      onChange: function (value) { },
      checkType:'checkbox',
      treeSetOption:{
      	check: {
				enable: true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "ps", "N": "ps" }
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: null
            }
        },

        view: {showIcon: false}
	    },
	   
  };
  
  //1.定义jquery的扩展方法modalsbox
  $.fn.modalsbox = function (options, param) {
      if (typeof options == 'string') {
          return $.fn.modalsbox.methods[options](this, param);
      }
      //2.将调用时候传过来的参数和default参数合并
      options = $.extend({}, $.fn.modalsbox.defaults, options || {});
      //3.添加默认值
      var target = $(this);
      target.data('id','');
      target.empty();
      target.prop('readonly',true)
//      target.attr('placeholder', options.placeholder);
     
      target.parent().append([
          '<div class="modal" tabindex="-1" role="dialog" aria-hidden="true">',
          '<div class="modal-dialog modal-lg" role="document">',
          '<div class="modal-content">',
          '<div class="modal-header">',
          '<button type="button" class="close closeModalBtn" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
          '<h4 class="modal-title" style="text-align: left">'+options.placeholder+'选择</h4>',
          '</div>',
          '<div class="modal-body">',
          '<div>',
          '<div class="row" style="margin:0 0 10px 0;"><input type="text" style="width:50%;" class="form-control searchInput" placeholder="请输入'+options.placeholder+'编码，名称"></div>',
          '<div class="row gridBox" style="margin:0 0 10px 0;"></div>',
          '</div>',
          '</div>',
          '<div class="modal-footer">',
          '<button type="button" class="btn btn-default sureModalBtn">确定</button>',
          '<button type="button" class="btn btn-default closeModalBtn" data-dismiss="modal">关闭</button>',
          '</div>',
          '</div>',
          '</div>',
          '</div>',
      ].join('\n'));
	  if(target.parent().find('.showModalBtn').length == 0){
		  target.parent().append('<span class="input-group-btn showModalBtn"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
      }

      if(options.tree.id != null){
          target.parent().find('.modal').find('.modal-body').prepend('<div class="col-xs-3 treeBox" style="overflow:auto;"><ul id="'+options.tree.id+'" class="ztree" style="overflow:auto;max-height:380px;"></ul></div>')
          target.parent().find('.modal').find('.gridBox').parent().addClass('col-xs-9')
      }
      target.parent().find('.modal').find('.gridBox').append('<table id="'+options.grid.id+'" class="zxsaastable"></table><div id="gridpager_'+options.grid.id+'"></div>')
      
      function treeFun(url,params){
      	options.treeSetOption.callback = {
  			 onClick: function(event, treeId, treeNode, msg) {
	                $("#"+options.grid.id).jqGrid('setGridParam',{
	                    datatype:'json',
	                    postData:{
	                        'typeId':treeNode.id
	                    },
	                    page:1
	                }).trigger("reloadGrid"); //重新载入
	            }
      	}
      	$.ajax({
				type: 'post',
				url: url,
				data:params,
				dataType: "json",
				success: function(data) {
					$.fn.zTree.init($("#"+options.tree.id), options.treeSetOption,data.data.dataList);
					var zTree = $.fn.zTree.getZTreeObj(options.tree.id);
				    zTree.expandAll(true);//展开全部节点
				}
			});
      }
      function gridLoad(id,colNames,colModel){
      	 $("#"+id).jqGrid({
      		   url:'',
               mtype: "post",
               styleUI : 'Bootstrap',
               datatype: "json",
               jsonReader  : {
                   root:"data.dataList",
                   repeatitems: false
               },
               colNames: colNames,
               colModel: colModel,
               sortable: false,
               rownumbers:true,	//显示行号
               rowNum: 1000,
               rowList: [20, 25, 40],
//               pager: "#gridpager_"+id,
               viewrecords: true,
               width:'100%',
               height: $(window).height() == 0 ? 250 :  $(window).height() * 0.4,
               autowidth: true,
               rownumWidth:50,
               multiselect:options.multiselect ,
               shrinkToFit: false,
               gridComplete:function(){
                   $("#"+id).setLabel(0,'序号')
                   $('table th').css('text-align','center')
                   if(!options.multiselect){
					   target.parent().find('.modal-footer button').hide()
                   }
               },
               ondblClickRow: function (rowid, iRow, iCol, e) {
              	 if(!options.multiselect){
              		 var info = $("#"+options.grid.id).jqGrid('getRowData',rowid)
                     // 此处判断赋值仅用在会员客户资料下
                     if(info.name == undefined){
                         info.name = info.vipName;
                     }
              		 target.val(info.name).data('id',info.dataId).change()
              		 target.parent().find('.modal').modal('hide')
                     if(options.callback){
                         options.callback(info);
                     }
              	 }
               },

           })
          $("#"+id).jqGrid('setFrozenColumns')
      }


      //点击下拉图标
      target.parent().find('.showModalBtn').unbind("click").on("click", function (e) {
      	
      	var len = target.parent().find('#'+options.grid.id).find('tbody').children().length
      	if(len <= 1){
			gridLoad(options.grid.id,getGridConfig(options.grid.id).colNames,getGridConfig(options.grid.id).colModel)
      		if(options.tree.id != null){
      			treeFun(options.tree.url,options.tree.param)
      		}
			options.grid.param.queryKey = ''
      		setTimeout(function(){
				$('#'+options.grid.id).jqGrid('setGridParam',{
					url:options.grid.url,
					postData:options.grid.param,
					page:1
				}).trigger("reloadGrid").resize(); //重新载入
            },500)

      	}
      	target.parent().find('.modal').modal('show')
      	$('#'+options.grid.id).resize()
      });
      
      //点击确认取消或下拉图标时进行操作
      function changeComboBox(){
      	target.parent().find('.glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-top')
      	target.parent().find('.ComboBox').toggle()
      }
      
      //点击其他区域操作
      $(document).mouseup(function(e){
   	   var _con = $('.ComboBox,.showComboBox');   // 设置目标区域
   	   if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
   		  $('.glyphicon-triangle-bottom').removeClass('glyphicon-triangle-top')
   		  $('.ComboBox').hide()
   	   }
      });
      
      //确定按钮点击事件
      target.parent().find('.modal').find('.sureModalBtn').unbind("click").on("click", function (e) {
      	 var ids = $("#"+options.grid.id).jqGrid('getGridParam', 'selarrrow')
           var Ids = [];
           var Names = [];
		  var info = []
           for(var i = 0 ; i<ids.length;i++){
               var dataInfo = $("#"+options.grid.id).jqGrid('getRowData',ids[i])
               Ids.push(dataInfo.dataId)
               Names.push(dataInfo.name)
               info.push({
				   dataId:dataInfo.dataId,
                   name:dataInfo.name
               })
           }
           target.val(Names.join(',')).data('id',Ids.join(',')).change()

		  if(options.callback){
			  options.callback(info);
		  }
          $(this).closest('.modal').modal('hide');
          return false;
      });
    //关闭事件
      target.parent().find('.modal').find('.closeModalBtn').unbind("click").on("click", function (e) {
          $(this).closest('.modal').modal('hide');
          return false;
      });

      //搜索事件
      target.parent().find('.modal').find('.searchInput').unbind("keyup").on("keyup", function (e) {
      	  if( (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)){
                $(this).blur()
            }else{
                $("#"+options.grid.id).jqGrid('setGridParam',{
                    datatype:'json',
                    postData:{
                        'queryKey':$(this).val().trim(),
                    },
                    page:1
                }).trigger("reloadGrid"); //重新载入
            }
      	  
      	
     });
      
     
  }

  //5.如果传过来的是字符串，代表调用方法。
  $.fn.modalsbox.methods = {
  	//获取值	
      getValue: function (jq) {
          return jq.data('id');
      },
      //设置值
      setValue: function (jq, param) {
          jq.val(param);
      },
      //重新加载
      load: function (jq, url) {
          
      }
  };

  //6.默认参数列表
  $.fn.modalsbox.defaults = {
  	tree:{
  		id:null,
  		url:null,
  		param:null
  	},
  	grid:{
  		id:null,
  		url:null,
  		param:null
  	},
  	search:{
  		placrholder:null
  	},
      treeSetOption:{

            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parentId",
                    rootPId: null
                }
            },
            view: {showIcon: false}
        },
        multiselect:true,
      callback: null,
	   
  };

	
	
})(jQuery)

//公共合并方法
function Merger(gridName, CellName) {
	//得到显示到界面的id集合
	var mya = $("#" + gridName + "").getDataIDs();
	//当前显示多少条
	var length = mya.length;
	for (var i = 0; i < length; i++) {
		//从上到下获取一条信息
		var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
		//定义合并行数
		var rowSpanTaxCount = 1;
		var ifBreak = false;
		for (j = i + 1; j <= length; j++) {
			//和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
			var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
			//判断第一个是否一样，不一样就跳出循环
			if(before[CellName[0]] == end[CellName[0]]){
				rowSpanTaxCount++;
				if( CellName[0] != 'billsId'){
					$("#" + gridName + "").setCell(mya[j], CellName[0], '', { display: 'none' });
					$("#" + gridName + "").setCell(mya[j], 'cb', '', { display: 'none'});
					$("#" + CellName[0] + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount).css('line-height',rowSpanTaxCount*36+'px');
					$("#" + CellName[0] + "" + mya[i] + "").parent().find('td[aria-describedby=rpGrid_cb]').attr("rowspan", rowSpanTaxCount).css('line-height',rowSpanTaxCount*36+'px');
                }else{
					$("#" + gridName + "").setCell(mya[j], CellName[1], '', { display: 'none' });
					$("#" + gridName + "").setCell(mya[j], 'cb', '', { display: 'none'});
					$("#" + CellName[1] + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount).css('line-height',rowSpanTaxCount*36+'px');
					$("#" + CellName[1] + "" + mya[i] + "").parent().find('td[aria-describedby=rpGrid_cb]').attr("rowspan", rowSpanTaxCount).css('line-height',rowSpanTaxCount*36+'px');
                }


				//循环后面的，作对比，一样的合并，不一样的不操作
				for(var k=1;k<CellName.length;k++){
					if(before[CellName[k]] == end[CellName[k]] && before[CellName[k]] != '小计' && end[CellName[k]] != '小计' ){
						$("#" + gridName + "").setCell(mya[j], CellName[k], '', { display: 'none' });
						$("#" + CellName[k] + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount).css('line-height',rowSpanTaxCount*36+'px');
					}else{
//                    	 ifBreak = true;
//                    	 rowSpanTaxCount = 1;
						break
					}
				}
//                 if(ifBreak){
//                	 break
//                 }
			}else{

				break
			}


		}
	}
}




function getCustomProject(rpName,callback){
	$.ajax({
		type: 'post',
		url: '/manager/erp/projectAndColumn/getCustomProject',
		data:{
			'rpName':rpName
		},
		dataType: "json",
		success: function(data) {
			projectId = data.data.projectId
			if(callback){
				callback(data)
			}
		}
	});
}

//列设置确认
function sureLineSet(){
	var valList = $('#lineSetGrid').getRowData()
	var ids= $("#lineSetGrid").jqGrid('getDataIDs');
	var rowData = $("#lineSetGrid").jqGrid('getRowData',ids[ids.length-1]);
	valList.push(rowData)
	$.ajax({
		url:'/manager/erp/projectAndColumn/updateColumns',
		dataType:'json',
		type:'post',
		data:{
            'flag' : false,
			'valList' : JSON.stringify(valList)
		},
		success:function(data){
			if(data.data.status == '1'){
				$.jgrid.gridUnload("rpGrid");

				$("#searchQuery .search").click()
			}
		}
	})
}