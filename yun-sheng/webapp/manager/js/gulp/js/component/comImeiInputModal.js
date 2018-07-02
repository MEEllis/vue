/*
 组件:串号录入框
*/

!function ($) {


    // 构造函数
    var component = function (el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID();// 不重复的ID
        // 默认参数
        var defaults = {
            dataGrid: null, //表格对象
            nonDuplicateID: nonDuplicateID,//唯一标示
            goodsName: "",//商品名称
            goodsID: "",//商品ID
            imeiList: [],  //表格数据
            currImeiLength: -1, // 默认当前的串号长度
            currAuxliaryImeiLength: -1,   // 默认当前的辅助串号长度
            isImeiGood:true,//  是否： 双串号管理 （true：双串号  false: 单串号）
            isEnableAuxliaryImei: true,   // true:辅助串号， false :没有辅助串号
            isAutoImei: false,    // 是否展示 ：生成自动串号
            isEdit: true,   // true:编辑 ，false :查看
            colModel: 0, //0：'主串号', '辅助串号, '备注'()； 1：'主串号', '辅助串号','成本', '备注'
            lastrow: 0, //选择的行
            lastcell: 0, //选择的单元格
            //追加行（回调）
            appenRowCallback: function (imei1, imei2) {
                return true;
            },
            //确定按钮 （回调）
            saveImeiInputCallback: function (data) {

            },
            //导入按钮 （回调）
            exportImeiInputCallback: function (data) {
                return true;
            }
        };
        this.option = $.extend(true, defaults, option);

        this.element = $(el);
        this.dom = null;
        this.AutoImeiDom = null;
        this._init();
    };
    component.prototype = {
        _init: function () {
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var _self = this;
            //双串号商品有辅助串号
            this.option.isImeiGood=this.option.isEnableAuxliaryImei;
            _self.createEvent();
            var $_template = _self.dom;
            //是否显示 辅助串号
            if (_self.option.isEnableAuxliaryImei == true) {
                $_template.find('.EditImei').prop('checked',true)
                $_template.find(".imeiInput2").attr({
                    "placeholder": "请输入" + (_self.option.currAuxliaryImeiLength || '任意') + "位字符",
                });
                $_template.find(".auxliaryImeiGroup").show();
            }
            else {
                $_template.find('.EditImei').prop('checked',false)
                $_template.find(".auxliaryImeiGroup").hide();
            }

            getIsEditAuxiliaryImei(function (data) {
                var clickFlag=false
                data.data.dataList[0] = data.data.dataList[0]||{}
                if(data.data.dataList[0].value==1){
                    clickFlag=false;
                }else{
                    clickFlag=true;
                }
                $_template.find('.EditImei').prop('disabled',clickFlag)
            })

            $_template.find(".goodsnameTitle").html("商品名称：" + (_self.option.goodsName));
            $_template.find(".imeiInput1").attr({
                "placeholder": "请输入" + (_self.option.currImeiLength || '任意') + "位字符",
            }).val("");//清空输入框的值
            $_template.find(".imeiInput2").val("");
            //是否编辑状态
            if (_self.option.isEdit === false) {
                $_template.find(".addImeiInput").attr("disabled", 'disabled')
                $_template.find(".exportImeiInput").attr("disabled", 'disabled')
                $_template.find(".saveImeiInput").attr("disabled", 'disabled')

                $_template.find(".imeiInput1").attr("disabled", 'disabled')
                $_template.find(".imeiInput2").attr("disabled", 'disabled')
                $_template.find(".txtExportImei").attr("disabled", 'disabled')
                $_template.find(".btnAutoImei").prop('disabled', true)
                $_template.find(".EditImei").prop('disabled', true)
            }
            else {
                $_template.find(".addImeiInput").removeAttr("disabled")
                $_template.find(".exportImeiInput").removeAttr("disabled")
                $_template.find(".saveImeiInput").removeAttr("disabled")
                $_template.find(".imeiInput1").removeAttr("disabled")
                $_template.find(".imeiInput2").removeAttr("disabled")
                $_template.find(".txtExportImei").removeAttr("disabled")
                $_template.find(".btnAutoImei").prop('disabled', false)
                $_template.find(".EditImei").prop('disabled', false)
            }

            $_template.find(".txtExportImei").setTextareaCount({
                width: "30px",
                bgColor: "#f2f2f2",
                color: "red",
                display: "block"
            });

            //是否显示： 生成自动串号
            isShowAutoImei(_self,$_template)
        },
        //创建事件
        createEvent: function () {
            var _self = this;
            var $_template = $(_self.getTemplate());
            _self.dom = $_template;
            _self.addEvent();
            _self.ediImeiEvent();
            _self.importEvent();
            _self.autoImeiEvent();
        },
        //启用辅助串号
        ediImeiEvent:function(){
            var _self = this;
            var $_template = _self.dom;
            //启用辅助串号
            $_template.find('.EditImei').bind('click',function(){
                var $this=$(this);
                if($this.prop('checked')==true){
                    _self.dom.find('.auxliaryImeiGroup').show();
                    _self.option.isEnableAuxliaryImei=true;
                    //如果是单串号管理（若此商品在商品档案中仅是单串号管理，但在“串号导入”时，选择了启用辅助串号，则辅助串号的长度限制为5位及以上即可；）
                    if(_self.option.isImeiGood==false){
                        _self.dom.find(".imeiInput2").attr({
                            "placeholder": "请输入5位及以上字符",
                        });
                        _self.option.currAuxliaryImeiLength=-555;//这里搞一个特别的标记， 用于标识 ：5位及以上
                    }
                }else{
                    _self.dom.find('.auxliaryImeiGroup').hide();
                    _self.option.isEnableAuxliaryImei=false;
                }

                //是否显示： 生成自动串号
                isShowAutoImei(_self,$_template)
            })
        },
        //添加一行的相关事件
        addEvent: function () {
            var _self = this;
            var $_template = _self.dom;
            //绑定主串号事件
            $_template.find(".imeiInput1").bind('keyup', function (event) {
                var $this = $(this);
                var cur = $this.val().trim();
                if (_self.option.currImeiLength > 0) {
                    var label = $this.parent().next().find('label');
                    var numLen = _self.option.currImeiLength - cur.length;
                    if (numLen > 0) {
                        label.text('还应输入' + numLen + '位串号')
                    }
                    else if (numLen == 0) {
                        label.text("");
                    }
                    else {
                        label.text('串号超出' + Math.abs(numLen) + '位')
                    }
                    if (cur.length == 0) {
                        label.text("");
                    }
                }
                if (event.keyCode == "13") {
                    checkImeiInput1(cur);
                }
            });
            //绑定辅助串号事件
            $_template.find('.imeiInput2').bind('keyup', function (event) {
                var $this = $(this);
                if (_self.option.isEdit === false) {
                    return;
                }
                if (_self.option.currAuxliaryImeiLength > 0) {
                    var label = $this.parent().next().find('label');
                    var numLen = _self.option.currAuxliaryImeiLength - $this.val().trim().length;
                    if (numLen > 0) {
                        label.text('还应输入' + numLen + '位串号')
                    }
                    else if (numLen == 0) {
                        label.text("");
                    }
                    else {
                        label.text('串号超出' + Math.abs(numLen) + '位')
                    }
                    if ($this.val().trim().length == 0) {
                        label.text("");
                    }
                }
                if (event.keyCode == "13") {
                    checkImeiInput2($this.val());
                }
            });
            //添加按钮
            $_template.find('.addImeiInput').bind("click", function () {
                //是否有辅助串号
                if (_self.option.isEnableAuxliaryImei == true) {
                    checkImeiInput2($_template.find('.imeiInput2').val());
                } else {
                    checkImeiInput1($_template.find('.imeiInput1').val());
                }
            })
            //验证主串号是否合法
            function checkImeiInput1(Imei) {
                Imei = Imei.trim().toUpperCase()
                if (Imei != "") {
                    if ($.notEmpty(_self.option.currImeiLength) && Imei.length != _self.option.currImeiLength) {
                        $.MsgBox('验证提示', '串号长度为' + _self.option.currImeiLength + "位");
                        return false;
                    }
                    if (Imei.indexOf(',') > -1 || Imei.indexOf('，') > -1 || Imei.indexOf(';') > -1 || Imei.indexOf('；') > -1) {
                        $.MsgBox('验证提示', '串号不允许出现逗号或者分号');
                        return false;
                    }
                    //用于请求的时候，防止用户输入
                    $_template.find(".imeiInput1").blur()

                    var flag=inStorageImei(Imei, callBack)
                    if(flag==false){
                        return flag
                    }
                    function callBack() {
                        //判断是否有辅助串号
                        if (_self.option.isEnableAuxliaryImei) {
                            $_template.find(".imeiInput2").focus();
                        } else {
                            _self.appenRow3();
                            $_template.find(".imeiInput1").focus()
                        }

                    }
                }
            }
            //验证辅助串号是否合法
            function checkImeiInput2(Imei) {
                var flag =  checkImeiInput1($_template.find('.imeiInput1').val());
                if(flag==false){
                    return  flag
                }
                var imei1 = $_template.find('.imeiInput1').val().trim().toUpperCase();
                Imei = Imei.trim().toUpperCase();
                if ($.trim(imei1) == "") {
                    $.MsgBox('串号校验提示', '主串号不能为空');
                    return;
                }

                if ($.trim(Imei) == "" && Number(_self.option.currAuxliaryImeiLength) > 0) {
                    $.MsgBox('串号校验提示', '辅助串号不能为空');
                    return;
                }
                if ($.trim(Imei) == $.trim(imei1)) {
                    $.MsgBox('串号校验提示', '主串号和辅助串号重复');
                    return;
                }
                if(_self.option.currAuxliaryImeiLength==-555 && Imei.length<5){
                    $.MsgBox('验证提示', ' 辅助串号长度为5位及以上位字符');
                    return;
                }
                if ( _self.option.currAuxliaryImeiLength!=-555  &&   (
                        ($.notEmpty(_self.option.currImeiLength) && imei1.length != _self.option.currImeiLength)
                        || ($.notEmpty(_self.option.currAuxliaryImeiLength) && Imei.length != _self.option.currAuxliaryImeiLength)
                    )
                ) {
                    $.MsgBox('验证提示', '串号长度为' + _self.option.currImeiLength + "位" + ' 辅助串号长度为' + _self.option.currAuxliaryImeiLength + "位");
                    return;
                }

                if (Imei.indexOf(',') > -1 || Imei.indexOf('，') > -1 || Imei.indexOf(';') > -1 || Imei.indexOf('；') > -1) {
                    $.MsgBox('验证提示', '串号不允许出现逗号或者分号');
                    return;
                }
                //用于请求的时候，防止用户输入
                $_template.find(".imeiInput2").blur();
                inStorageImei(Imei, callBackyanzheng)

                function callBackyanzheng() {
                    _self.appenRow3();
                    $_template.find(".imeiInput1").focus();
                }
            }
        },
        //导入的相关事件
        importEvent: function () {
            var _self = this;
            var $_template = _self.dom;
            //导入文本框 监听 tab事件
            $_template.find('.txtExportImei').bind('keydown', function (event) {
                if (event.keyCode == 9) {
                    $(this).val($(this).val() + "\t");
                    return false;
                }
            })
            //取消按钮
            $_template.find('.canelSaveImeiInput , .close').bind("click", function () {
                _self.hideModal();
            })
            //确定按钮
            $_template.find('.saveImeiInput').bind("click", function () {
                saveData(_self)
                _self.hideModal();
            })
            //清空按钮
            $_template.find('.clearImeiInput').bind("click", function () {
                $_template.find('.txtExportImei').val("");
                $_template.find('.failedExportImei').val("");
                $_template.find(".txtExportImei").trigger('keydown')
            })
            //导入按钮
            $_template.find('.exportImeiInput').bind("click", function () {
                //导入串号组
                var exportTxt = $_template.find('.txtExportImei').val().trim().toUpperCase().replace(/，/g, ',').replace(/\t/g, ',');
                if (exportTxt == "") {
                    $_template.find('.failedExportImei').val('批量导入串号不能为空，请检查完数据再导入！\n');
                    return;
                }
                //验证 未启用辅助串号时， 主串号不能有 逗号
                if (_self.option.isEnableAuxliaryImei == false && (exportTxt.indexOf(',') > -1 || exportTxt.indexOf('，') > -1 || exportTxt.indexOf(';') > -1 || exportTxt.indexOf('；') > -1 )) {
                    $_template.find('.failedExportImei').val('批量导入，主串号不能有分号或者tab键隔，请检查完数据再导入！\n');
                    return;
                }
                //串号存为数组
                var exportArr = exportTxt.split("\n");
                //处理串号的前后空格
                for (var i in exportArr) {
                    if (exportArr[i].indexOf(',') > -1) {
                        exportArr[i] = exportArr[i].trim().replace(/(\s)*(,)(\s)*/, ',')
                    } else {
                        exportArr[i] = exportArr[i].trim();
                    }
                }
                var exportToString = ',' + exportArr.toString() + ',';
                var reLuru = "";
                // 验证 多行文本框是否输入重复
                for (var i in exportArr) {
                    //忽略空格行
                    if(exportArr[i] == '') {
                        continue;
                    }
                    var itme = exportArr[i];
                    //是否有是辅助串号
                    if (itme.indexOf(',') > -1) {
                        var cc = itme.split(",");
                        for (var m = 0; m < cc.length; m++) {
                            var oo = ',' + cc[m] + ',';
                            var firstIndex=exportToString.indexOf(oo)+1;
                            var secondIndex= exportToString.lastIndexOf(oo)+1;
                            if (firstIndex != secondIndex) {
                                reLuru +=  '序号['+firstIndex+'与'+secondIndex+'];串号:[' + cc[m] + ']重复，请检查完数据再导入！\n';
                            }
                        }
                    } else {
                        var firstIndex=exportArr.indexOf(itme)+1;
                        var secondIndex=exportArr.lastIndexOf(itme)+1;
                        if (firstIndex != secondIndex) {
                            reLuru += '序号['+firstIndex+'与'+secondIndex+'];串号:[' + itme + ']重复，请检查完数据再导入！\n';
                        }
                    }

                }
                if (reLuru != "") {
                    $_template.find('.failedExportImei').val(reLuru);
                    return;
                }
                var imeiInputData = '';
                var imeiGrid = _self.option.dataGrid;
                var ids = imeiGrid.getGridDataList()
                //合并表格 用的数据
                var objData = []
                if (ids.length > 0) {
                    for (var i = 0; i < ids.length; i++) {
                        objData.push($.trim(ids[i].imei).toUpperCase())
                        objData.push($.trim(ids[i].auxiliaryImei).toUpperCase())
                    }
                }
                // 验证左边表格是否存在重复数据
                for (var i in exportArr) {
                    //忽略空格行
                    if(exportArr[i] == '') {
                        continue;
                    }
                    var toval = exportArr[i];
                    var tovalArr = toval.split(',');
                    var flag = 1;
                    //验证 串号 在 左侧表格是否存在
                    for (var j = 0; j < tovalArr.length; j++) {
                        var tovalItem = tovalArr[j];
                        if (objData.indexOf(tovalItem) > -1) {
                            flag = 0;
                        }
                    }
                    if (flag == 1) {
                        imeiInputData += toval + ';'
                    } else {
                        reLuru += '串号:[' + toval + ']已导入\n';
                    }
                }
                //删除空格行
                for(var i = 0; i < exportArr.length; i++) {
                    if(exportArr[i] == '') {
                        exportArr.splice(i,1);
                        i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                                   // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
                    }
                }

                //验证是否存在
                var isExport = _self.option.exportImeiInputCallback(exportArr);
                if (isExport.result == 0) {
                    //清空对应的数据
                    for (var i = 0; i < isExport.reLuruArr.length; i++) {
                        imeiInputData = imeiInputData.replace(isExport.reLuruArr[i] + ";", '')
                    }
                    reLuru += isExport.reLuru;
                }
                $_template.find('.failedExportImei').val(reLuru);
                //去掉空格
                imeiInputData = imeiInputData.substring(0, imeiInputData.length - 1);
                if (imeiInputData == '') {
                    return
                }
                $.request({
                    url: '/manager/component/imei/validateInStockImei',
                    type: "POST",
                    dataType: 'json',
                    data: {
                        "goodsId": _self.option.goodsID,
                        "imeiInputData": imeiInputData,
                        'showCost': _self.option.colModel,
                        //是否勾选 启用辅助串号 0:否 1:是
                        'IfCheckedAuxiliaryImei':_self.option.isEnableAuxliaryImei==true?1:0,
                    },
                    success: function (data) {
                        if (data.result == 1) {
                            var failed = data.data.failedResultList;
                            var txt = $_template.find('.failedExportImei').val();
                            $.each(failed, function (i, item) {
                                txt += item + '\n';
                            })
                            //输出失败的 数据 了
                            $_template.find('.failedExportImei').val(txt);
                            var list = data.data.successResultList;
                            batchImport(_self, list);
                        }
                        else {
                            $.zxsaas_plus.showalert("error", data.desc);
                        }
                    },
                    error: function () {
                        $.zxsaas_plus.showalert("error", '请求超时！');
                    }
                });

            })
        },
        //生成自动串号的相关事件
        autoImeiEvent: function () {
            var _self = this;
            var $_template = _self.dom;
            //自动生成串号按钮
            $_template.find('.btnAutoImei').bind("click", function () {
                if (_self.AutoImeiDom == null) {
                    var $autoTemp = $(getTemplate());
                    var params = {
                        goodsName: _self.option.goodsName,
                        goodsID: _self.option.goodsID,
                    }
                    //取消按钮
                    $autoTemp.find('.btnAutoCanle  , .close').bind("click", function () {
                        $autoTemp.find('form')[0].reset();
                        _self.AutoImeiDom.modal('hide');
                    })
                    //确定按钮
                    $autoTemp.find('.btnAutoSave').bind("click", function () {
                        var remark = $autoTemp.find('.txtAutoRemark').val().trim();
                        var price = $autoTemp.find('.txtAutoPrice').val().trim();
                        var count = $autoTemp.find('.txtAutoCount').val().trim();
                        var countReg = /^([1-9]([0-9]{0,3})|10000)$/;
                        if (!countReg.test(count)) {
                            $.zxsaas_plus.showalert("提示", '数量格式错误，请输入1~10000的整数！');
                            return;
                        }
                        $.MsgBox('提示', '将为您自动生成' + count + '个串号，确定吗', function () {
                            var ajaxOp = {
                                goodsId: params.goodsID,
                                //是否勾选 启用辅助串号 0:否 1:是
                                'IfCheckedAuxiliaryImei':_self.option.isEnableAuxliaryImei==true?1:0,
                                retailPrice: price,
                                createCount: count,
                                remark: remark
                            };
                            saveAutoImei(ajaxOp, function (data) {
                                var list = data.data.successResultList;
                                batchImport(_self, list, remark);
                                $autoTemp.find('.btnAutoCanle').trigger('click');
                            })
                        }, function () {
                        });
                    })

                    $autoTemp.find('.labAutoGoodsName').text(params.goodsName);
                    _self.AutoImeiDom = $autoTemp;
                    //获取价格
                }
                //获取价格
                getGoodsPrice({
                    goodsIds: _self.option.goodsID,
                    //是否勾选 启用辅助串号 0:否 1:是
                    'IfCheckedAuxiliaryImei':_self.option.isEnableAuxliaryImei==true?1:0,
                }, function (data) {
                    _self.AutoImeiDom.find('.txtAutoPrice').val(data.data.goodsVoList[0].retailPrice)
                    if (data.data.hasPermissions == true) {
                        _self.AutoImeiDom.find('.txtAutoPrice').prop('readonly', false);
                    }
                    else {
                        _self.AutoImeiDom.find('.txtAutoPrice').prop('readonly', true);
                    }
                });
                setTimeout(function(){
                    _self.AutoImeiDom.modal('show');
                })

            })
            //打印所选串号标签
            $_template.find('.btnPrintAutoImei').bind("click", function () {
                var imeiGrid = _self.option.dataGrid;
                var selId = $.trim(imeiGrid.$grid.jqGrid('getGridParam', 'selrow'));
                if (selId == "") {
                    $.zxsaas_plus.showalert("提示", '请选择一行数据！');
                    return;
                }
                var selRowData = imeiGrid.$grid.jqGrid('getRowData', selId)
                var imei = selRowData.imei;
                var imeiReg = /^(YS)[\d]{12}$/
                if (!imeiReg.test(imei)) {
                    $.zxsaas_plus.showalert("提示", '只能打印自动生成YS开头的14位串号！');
                    return;
                }
                getGoodsPrice({goodsIds: _self.option.goodsID}, function (data) {
                    var goodsVo = data.data.goodsVoList[0];
                    var printData = {
                        goodName: _self.option.goodsName,
                        retailPrice: $.formatFloat(goodsVo.retailPrice, 2),
                        imei: selRowData.imei
                    }
                    try {
                        prn1_print([printData]);
                    } catch (e) {
                    }

                })
            })

            //获取当前商品的价格
            function getGoodsPrice(ajaxOp, callback) {
                $.ajax({
                    url: "/manager/component/imei/getGoodsRetailPrice",
                    type: 'POST',
                    dataType: "json",
                    async: false,
                    data: ajaxOp,
                    success: function (data) {
                        if (data.result == 1) {
                            callback(data)
                        } else {
                            $.MsgBox('错误提示', data.desc);
                        }
                    }
                });
            }

            //自动生成串号
            function saveAutoImei(ajaxOp, callback) {
                //后台查询数据
                $.request({
                    url: '/manager/component/imei/autoCreateImei',
                    type: "POST",
                    dataType: 'json',
                    data: ajaxOp,
                    success: function (data) {
                        if (data.result == 1) {
                            callback(data);
                        } else {
                            $.MsgBox('错误提示', data.desc);
                        }
                    },
                    error: function () {
                        $.MsgBox('错误提示', '服务繁忙！');
                    }
                });
            }

            //获取 自动生成串号 的模板
            function getTemplate() {
                var _template = '<!-- 自动生成串号 -->' +
                    '<div class="modal fade "  tabindex="-1" role="dialog"  aria-hidden="false">' +
                    '   <div class="modal-dialog" style="width:400px;">' +
                    '      <div class="modal-content">' +
                    '           <div class="modal-header">' +
                    '               <button type="button" class="close"  aria-hidden="true"> &times;</button>' +
                    '               <h4 class="modal-title">' +
                    '                   自动生成串号' +
                    '               </h4>' +
                    '           </div>' +
                    '            <!-- modal-body start  -->' +
                    '           <div class="modal-body" style="padding-bottom: 0px;padding-top: 0px;">' +
                    '               <div class="col-md-12" >' +
                    '                 <!-- /S 表单控件  -->' +
                    '                   <form class="form-horizontal" role="form"> ' +
                    '                       <div class="form-group mt20 ">' +
                    '                           <label class="col-sm-3 control-label">商品：</label>' +
                    '                           <label class=" control-label col-sm-9 labAutoGoodsName" style="text-align:left;padding-left:0px;">小米1</label>' +
                    '                       </div>' +
                    '                       <div class="form-group mt20">' +
                    '                           <label class="col-sm-3 control-label" >零售价：</label>' +
                    '                           <div class="col-sm-9 pl0" >' +
                    '                               <input type="text" class="form-control txtAutoPrice" name=""   placeholder="请输入零售价"  onkeyup="functionObjExtent.checkInput.checkNum(this,12)"  />' +
                    '                           </div>' +
                    '                       </div>' +
                    '                       <div class="form-group">' +
                    '                           <label class="col-sm-3 control-label" ><i style="color: red;">*</i>数量：</label>' +
                    '                           <div class="col-sm-9 pl0" >' +
                    '                               <input type="text" class="form-control txtAutoCount" name=""  onkeyup="functionObjExtent.checkInput.clearNoNum(this,12)"  placeholder="请输入1~10000的整数" />' +
                    '                           </div>' +
                    '                       </div>' +
                    '                       <div class="form-group">' +
                    '                           <label class="col-sm-3 control-label" >备注：</label>' +
                    '                           <div class="col-sm-9 pl0" >' +
                    '                               <input type="text" class="form-control txtAutoRemark" name=""   placeholder="请输入备注"   />' +
                    '                           </div>' +
                    '                       </div>' +
                    '                       <div class="form-group">' +
                    '                           <label class="col-sm-12 control-label" >系统将为您自动生成指定数量的14位YS前缀串号。</label>' +
                    '                       </div>' +
                    '                       <div class="form-group tc">' +
                    '                       <button type="button" class="erp-btn-bg btnAutoSave" style="margin-right: 20px;">确定</button>' +
                    '                       <button type="button" class="erp-btn-lab btnAutoCanle "  >取消</button>' +
                    '                       </div>' +
                    '                  </form>' +
                    '           </div> ' +
                    '          <!-- modal-body end  -->' +
                    '       </div>' +
                    '   </div>' +
                    '</div>';
                return _template;
            }
        },
        //加载dom
        loadDom: function () {
            $("body").append(this.dom);
            var _self = this;
            var colNames = ['主串号', '辅助串号', '备注'];
            var colModel = [
                {
                    name: 'imei',
                    index: 'imei',
                    align: 'left',
                    width: '150',
                    sortable: false,
                    hidden: false,
                    editable: false,
                    editoptions: {onkeyup: "checkInput.checkStrNum(this,20)"}
                },
                {
                    name: 'auxiliaryImei',
                    index: 'auxiliaryImei',
                    width: '150',
                    align: 'left',
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkStrNum(this,20)"}
                },
                {name: 'remark', width: '150', index: 'remark', align: 'left', editable: true, sortable: false}
            ];
            if (_self.option.colModel == 1) {
                colNames.splice(2, 0, '成本');
                colModel.splice(2, 0, {
                    name: 'cost',
                    width: '150',
                    index: 'cost',
                    align: 'center',
                    sortable: false,
                    formatter: 'number',
                    editable: true,
                    editoptions:{
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
                    }
                })
            }

            var pager='#dataGridPager'+_self.option.nonDuplicateID
            //配置
            var paras = {
                gridId: 'dataGrid' + _self.option.nonDuplicateID,
                noShowAdd: true,
                pager: pager,
                deleteLable: '确定要删除此行？注：将会一并删除草稿单据内此串号',
                colNames: colNames,
                colModel: colModel,
            };
            //回调函数
            var callBackList = {
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    if (_self.option.colModel == 1) {
                        var currRow = _self.option.dataGrid.$grid.jqGrid('getRowData', rowid);
                        //成本
                        if (iCol == 4) {
                            var imeiInputData=''
                            if(currRow.auxiliaryImei!=''){
                                imeiInputData=currRow.imei+','+currRow.auxiliaryImei
                            }else{
                                imeiInputData=currRow.imei
                            }
                            var cost = getCostPriceByImei({
                                "goodsId": _self.option.goodsID,
                                "imeiInputData":  imeiInputData,
                                'showCost': _self.option.colModel,
                                //是否勾选 启用辅助串号 0:否 1:是
                                'IfCheckedAuxiliaryImei':_self.option.isEnableAuxliaryImei==true?1:0,
                            });
                            if (cost == '') {
                                _self.option.dataGrid.$grid.jqGrid('setColProp', 'cost', {'editable': true});
                            } else {
                                _self.option.dataGrid.$grid.jqGrid('setColProp', 'cost', {'editable': false});
                            }
                        }
                    }
                },
                afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
                    _self.option.lastrow = iRow;
                    _self.option.lastcell = iCol;
                },
                afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
                    _self.option.lastrow = iRow;
                    _self.option.lastcell = iCol;
                },
                summary: function (rowid, name, val, iRow, iCol) {//统计处理
                    if (_self.option.colModel == 1) {
                        summaryCost(_self);
                    }

                },
                getGridDataList: function () {
                    var rows=_self.option.dataGrid.$grid.getGridParam().data
                    //筛出不合格行
                    return $.map(rows, function (row) {
                        delete row["op"];
                        if ($.notEmpty(row.imei)) {
                            return row;
                        }
                    });
                },
                deleteCallBack: function (info) {
                    var GridDataList=dataGrid.getGridDataList()
                    _self.dom.find('.currInputNum').html(GridDataList.length);
                    var imeiList=_self.option.imeiList||[];
                    if(imeiList.length>0){
                        var infoImei=info.imei.toUpperCase();
                        var infoAuxiliaryImei=info.auxiliaryImei.toUpperCase();
                        for(var i=0;i<imeiList.length;i++){
                            var imei=$.trim(imeiList[i].imei).toUpperCase()
                            var auxiliaryImei=$.trim(imeiList[i].auxiliaryImei).toUpperCase()
                            if((imei.length>0 && imei==infoImei) || (auxiliaryImei.length>0 && auxiliaryImei==infoAuxiliaryImei)){
                                imeiList.splice(i,1)
                                _self.option.saveImeiInputCallback(imeiList);
                            }
                        }

                    }
                    _self.option.dataGrid.$grid.setGridParam({data: GridDataList}).trigger('reloadGrid');
                },
                gridComplete:function(){
                    $(pager+"_left").remove()
                    $(pager+"_center").attr('colspan',2)
                }
            };
            var dataGrid = new MyEiditGrid(paras, callBackList);
            dataGrid.$grid.jqGrid("clearGridData");
           dataGrid.$grid.setGridParam({
                rowNum:100,
                rowTotal: 1000000,
            }).trigger('reloadGrid')
            if (_self.option.imeiList.length > 0) {
                _self.dom.find(".currInputNum").html(_self.option.imeiList.length);
                //这里id 会去填充表格的id， 这里要事先删除id
                for (var i = 0; i < _self.option.imeiList.length; i++) {
                    var imei = _self.option.imeiList[i];
                    delete imei.id;
                }
                dataGrid.$grid.setGridParam({data: _self.option.imeiList}).trigger('reloadGrid');
            } else {
                _self.dom.find(".currInputNum").html(0);
            }
            dataGrid.$grid.setGridParam({userDataOnFooter: true, autowidth: true, width: '100%'});
            dataGrid.$grid.setGridHeight(300);
            dataGrid.$grid.closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"}).next('.ui-jqgrid-sdiv').hide();
            if (_self.option.isEdit == true) {
                dataGrid.$grid.setGridParam({cellEdit: true});
                dataGrid.$grid.setGridParam().showCol("op");
            } else {
                dataGrid.$grid.setGridParam({cellEdit: false});
                dataGrid.$grid.setGridParam().hideCol("op");
            }
            _self.option.dataGrid = dataGrid;
            if (_self.option.colModel == 1) {
                dataGrid.$grid.closest(".ui-jqgrid-bdiv").next('.ui-jqgrid-sdiv').show()
                summaryCost(_self);
            }
        },
        reLoadDom: function () {
            this.clearDom();
            this._init();
        },
        //清空dom
        clearDom: function () {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
            if (this.AutoImeiDom !== null) {
                this.AutoImeiDom.remove();
                this.AutoImeiDom = null;
            }
        },
        showModal: function () {
            this.dom.modal('show');
        },
        hideModal: function () {
            this.dom.modal('hide');
        },
        //设置当前的参数
        setOption: function (data) {
            this.option = $.extend(false, this.option, data);
        },
        //追加一行数据
        appenRow3: function () {
            var _self = this;
            var imei1 = _self.dom.find(".imeiInput1").val().trim().toUpperCase();
            var imei2 = _self.dom.find(".imeiInput2").val().trim().toUpperCase();
            var imeiGrid = _self.option.dataGrid;

            if ($.trim(imei1) != '') {
                var ids = imeiGrid.getGridDataList()
                if (ids.length > 0) {
                    var objData = []
                    for (var i = 0; i < ids.length; i++) {
                        objData.push(ids[i])
                    }
                    for (var j = 0; j < objData.length; j++) {
                        if ($.trim(imei1) == objData[j].imei || $.trim(imei1) == objData[j].auxiliaryImei) {
                            $.MsgBox('重复校验提示', '串号:' + $.trim(imei1) + ' 在本窗口表格里第' + (j + 1) + '行已经存在');
                            return false;
                        }
                    }
                }
            }

            if ($.trim(imei2) != '') {
                var ids = imeiGrid.getGridDataList()
                if (ids.length > 0) {
                    var objData = []
                    for (var i = 0; i < ids.length; i++) {
                        objData.push(ids[i])
                    }
                    for (var j = 0; j < objData.length; j++) {
                        if ($.trim(imei2) == objData[j].imei || $.trim(imei2) == objData[j].auxiliaryImei) {
                            $.MsgBox('重复校验提示', '辅助串号:' + $.trim(imei2) + ' 在本窗口表格里第' + (j + 1) + '行已经存在');
                            return false;
                        }
                    }
                }
            }

            if (_self.option.appenRowCallback(imei1, imei2) == true) {
                var appendData = {
                    imei: imei1,
                    auxiliaryImei: imei2
                };
                if (_self.option.colModel == 1) {
                    var imeiInputData=''
                    if(imei2!=''){
                        imeiInputData=imei1+','+imei2
                    }else{
                        imeiInputData=imei1
                    }
                    appendData.cost =  getCostPriceByImei({
                        "goodsId": _self.option.goodsID,
                        "imeiInputData": imeiInputData,
                        'showCost': _self.option.colModel,
                        //是否勾选 启用辅助串号 0:否 1:是
                        'IfCheckedAuxiliaryImei':_self.option.isEnableAuxliaryImei==true?1:0,
                    });
                }
                imeiGrid.$grid.addRowData(MyEiditGrid.getMaxRowid($("#" + imeiGrid.gridId)) + 1, appendData);
                _self.dom.find('.currInputNum').html(imeiGrid.getGridDataList().length);
                _self.dom.find(".imeiInput1").val("");
                _self.dom.find(".imeiInput2").val("");
                //滚动条
                imeiGrid.$grid.parents(".ui-jqgrid-bdiv").scrollTop(imeiGrid.$grid.height());
            }
        },
        getTemplate: function () {
            // 默认模板
            var _template = '<!-- 串号录入 -->' +
                '<div class="modal fade imeiInputModal"  tabindex="-1" role="dialog"  aria-hidden="false">' +
                '   <div class="modal-dialog" style="width:990px;">' +
                '      <div class="modal-content">' +
                '     <div class="modal-header">' +
                '            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>' +
                '            <h4 class="modal-title">' +
                '               串号导入' +
                '            </h4>' +
                '         </div>' +
                '         <div class="modal-body" style="padding-bottom: 0px;padding-top: 0px;">' +

                '        <div class="form-horizontal" role="form"> ' +
                '<div class="form-group" style="background-color: #f2f2f2;line-height: 30px;" >' +
                '  <!-- 商品名称 -->' +
                '  <label class=" goodsnameTitle"   style="text-align: left;float:left;padding-left:20px;">  </label>' +
                '  <!-- 是否串号管理 -->' +

                '  <label class="isEnableAuxliaryImei"  style="text-align: left;float:left;padding-left:50px;" for="EditImei_'+this.option.nonDuplicateID+'" > <input id="EditImei_'+this.option.nonDuplicateID+'" type="checkbox" name="EditImei" class="EditImei" disabled="disabled">启用辅助串号</label>' +

                '</div>' +
                '</div>' +

                '         <div class="col-md-7" >' +

                '   <div class="form-group">' +
                '       <label class="" style="padding-right: 25px;">手工录入</label>' +
                '   </div>' +

                '        <div class="form-horizontal" role="form"> ' +
                '    <!-- /S 表单控件  -->' +
                '<div class="form-group">' +
                '  <label class="col-sm-2 control-label" style="font-weight: normal;">主串：</label>' +
                '  <div class="col-sm-4">' +
                '      <input type="text" class="form-control imeiInput1" name=""   />' +
                '      ' +
                '  </div>' +
                '  <div class="col-sm-4">' +
                '      <label style="color:red;" class=" control-label" ></label>' +
                '      ' +
                '  </div>' +
                '</div>' +
                '<div class="form-group auxliaryImeiGroup">' +
                '  <label class="col-sm-2 control-label" style="font-weight: normal;">辅串：</label>' +
                '  <div class="col-sm-4">' +
                '      <input type="text" class="form-control imeiInput2" name="imeiInput2"   />' +
                '      ' +
                '  </div>' +
                '  <div class="col-sm-4">' +
                '      <label style="color:red;" class=" control-label" ></label>' +
                '      ' +
                '  </div>' +
                '</div>' +
                '</div> ' +
                '<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;margin-left: 30px;">' +
                '<button class="erp-btn-lab addImeiInput" style="margin-left: 50px;">添加</button>' +
                '</div>' +
                '<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;    margin: 10px 0px;">' +
                '<span class="">已录入串号：<span class="currInputNum"  >0</span></span>' +
                '      <button type="button" class="fr erp-link-lab btnAutoImei" title="自动生成串号功能仅针对单串号管理商品，且串号长度为14位或不限位数！" >自动生成串号</button>' +
                '</div>' +
                '<!-- /S 表体 -->' +
                '<div style=" width:550px;overflow:auto;" class="jqGrid_wrapper">' +
                '<table  id="dataGrid' + this.option.nonDuplicateID + '"></table> ' +
                '<div id="dataGridPager' + this.option.nonDuplicateID + '"></div>'+
                '</div>' +
                '<!-- /E 表体 -->' +
                ' </div>' +
                '<div class="col-md-5" style="padding-bottom: 0px;" >' +
                '   <div class="form-group">' +
                '       <label class="" style="padding-right: 25px;">Excel粘贴：</label>' +
                '       <label class="" style="float: right;">格式：主串，辅串</label>' +
                '   </div>' +
                '   <div class="form-group clearfix txtExportImeiWrap" style="height: 100px;" >' +
                ' <textarea class=" col-sm-12 txtExportImei" style="resize:none;width:360px;height:100px;margin-left:30px;" placeholder="一行一串号，若双串号则左主右辅。例：\n' +
                '已启用辅助串号  \n' +
                'A8888888888888，868888888888888 \n' +
                'A9999999999999，869999999999999 \n' +
                '未启用辅助串号  \n' +
                'A8888888888888 \n' +
                'A9999999999999 \n' +
                ' "></textarea>' +
                '   </div>' +

                '   <div class="form-group">' +
                '      <button type="button" class="erp-btn-lab exportImeiInput"  style="margin-right: 25px;">导入</button>' +
                '      <button type="button" class="erp-btn-lab clearImeiInput"  >清空</button>' +
                '   </div>' +

                '   <div class="form-group">' +
                '       <label class="" style="font-weight: normal;margin-bottom: 10px;">错误提示</label>' +
                ' <textarea class="col-sm-12 form-control failedExportImei" readonly style="height: 330px;resize:none;color:#ff0000;"></textarea>' +
                '</div>' +

                ' </div>' +
                '         </div>' +
                '         <!-- 模态框底部部分 -->' +
                '         <div class="modal-footer">' +
                '            <button type="button" class="fl erp-btn-lab btnPrintAutoImei"  >打印所选串号标签</button>' +
                '            <button type="button" class="erp-btn-bg saveImeiInput" style="margin-right: 20px;">确定</button>' +
                '            <button type="button" class="erp-btn-lab canelSaveImeiInput"  >取消</button>' +
                '         </div>' +
                '  </div>' +
                '</div>' +
                '</div>';
            return _template;
        }
    };

    //是否显示： 生成自动串号
    function isShowAutoImei(_self,$_template){
        if (_self.option.isAutoImei == true) {
            $_template.find(".btnAutoImei").show();
            $_template.find(".btnPrintAutoImei").show();
            //(是辅助串号  或者  不是：任意，14位的串号  ）  , 禁用 按钮
            if (_self.option.isEnableAuxliaryImei == true || (Number(_self.option.currImeiLength) != 0 && Number(_self.option.currImeiLength) != 14)) {
                $_template.find(".btnAutoImei").prop('disabled', true)
                $_template.find(".btnPrintAutoImei").prop('disabled', true)
            }else{
                $_template.find(".btnAutoImei").prop('disabled', false)
                $_template.find(".btnPrintAutoImei").prop('disabled', false)
            }
        }
        else {
            $_template.find(".btnAutoImei").hide();
            $_template.find(".btnPrintAutoImei").hide();
        }
    }
    function batchImport(_self, list, remark) {
        _self.option.dataGrid.$grid.jqGrid("saveCell", _self.option.lastrow, _self.option.lastcell) //取消编辑状态
        var imeiGrid = _self.option.dataGrid;
        var ids = imeiGrid.getGridDataList()
        var jaData = []
        if (ids.length > 0) {
            for (var i = 0; i < ids.length; i++) {
                jaData.push(ids[i]);
            }
        }
        $.each(list, function (i, item) {
            var imei1 = "";
            var imei2 = "";
            if (_self.option.isEnableAuxliaryImei == true) {
                imei1 = item.imei
                imei2 = item.auxiliaryImei;
            } else {
                imei1 = item.imei;
            }
            var addJson = {
                imei: imei1,
                auxiliaryImei: imei2
            }
            if (_self.option.colModel == 1) {
                addJson.cost = item.costPrice || '';
            }
            if ($.trim(remark) != "") {
                addJson.remark = remark;
            }
            jaData.push(addJson);
        })
        if (jaData.length > 0) {
            imeiGrid.$grid.jqGrid('clearGridData');
            imeiGrid.$grid.setGridParam({data: jaData}).trigger('reloadGrid');
            //滚动条
            imeiGrid.$grid.parents(".ui-jqgrid-bdiv").scrollTop(imeiGrid.$grid.height());
        }
        jaData=null;
        _self.dom.find('.currInputNum').html(imeiGrid.getGridDataList().length);
    }

    //合计（成本）
    function summaryCost(_self) {
        var sumCost = _self.option.dataGrid.$grid.getCol('cost', false, 'sum');
        _self.option.dataGrid.$grid.footerData("set", {imei: "合计", cost: sumCost});
    }

    //查询在库串号
    function inStorageImei(Imei,callBack) {
        var flag=true;
        //后台查询数据
        $.request({
            url: '/manager/inventory/common/validateImeiBeforeInStock',
            type: "POST",
            dataType: 'json',
            async:false,
            data: {"queryKey": Imei},
            success: function (data) {
                if (data.result == 1) {
                    callBack()
                } else {
                    flag=false;
                    $.MsgBox('错误提示', data.desc);
                }
            }
        });
       return flag
    }

    //获取现存成本价格
    function getCostPriceByImei(data) {
        var cost = '';
        $.ajax({
            type:'post',
            url: "/manager/component/imei/validateInStockImei",
            dataType: "json",
            async: false,
            data: data,
            success: function (data) {
                if (data.result == 1) {
                    cost = $.trim(data.data.successResultList[0].costPrice);
                }
            }
        });
        return cost;
    }

    //获取是否可以编辑 启用辅助串号
    function getIsEditAuxiliaryImei(callback) {
        $.ajaxPackage({
            url: "/manager/Tparam/find?code=C03010",
            type: 'GET',
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {
                if (data.result == 1) {
                    if(callback){
                        callback(data)
                    }
                }
            }
        });
    }

    //保存数据
    function saveData(_self) {
        _self.option.dataGrid.$grid.jqGrid("saveCell", _self.option.lastrow, _self.option.lastcell) //取消编辑状态
        _self.option.saveImeiInputCallback(_self.option.dataGrid.getGridDataList());
    }

    window.comImeiInputModal = component;

    //在插件中使用  组件对象
    $.fn.comImeiInputModal = function (options) {
        //创建的实体
        var obj = new component(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);