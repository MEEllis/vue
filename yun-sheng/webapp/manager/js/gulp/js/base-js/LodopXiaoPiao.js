;!function () {
    var RetailBillPrintHeight; //零售小票打印区域高度，从而预计零售小票打印时间，再加上5秒触发打印聚合收款（商户存根联）
    var LODOP;


    //打印小票  flag: 是否打印存根联
    function LodoXiaoPiaopPrint(flag) {
        var printResult;
        CreateOneFormPage();
        LODOP.On_Return_Remain = true;
        LODOP.On_Return = function (TaskID, Value) {
            //if (Value) alert("已发出实际打印命令！"); else alert("放弃打印！");
            console.log("显示return信息", TaskID, Value);

            if (TaskID == printResult && Value && flag == true) {
                console.log('RetailBillPrintHeight:' + RetailBillPrintHeight);
                //若开始正式打印零售小票，且此单据有聚合收款信息，则需要延时打印聚合收款商户存根联
                delayPrintUnionPayMerchantBill((RetailBillPrintHeight / 45) * 1000 + 5000); //延时打印聚合收款商户联 （大概1秒打印40px高度，拟定间隔5秒）
            } else {
                ClearDom()
            }
        };

        printResult = LODOP.PRINTA();
        console.log("printa done;");
    };


    //云打印 ：小票
    function YUNLodoXiaoPiaopPrint(flag,printerName) {
        var printResult;
        CreateOneFormPage();
        LODOP.On_Return_Remain = true;
        LODOP.On_Return = function (TaskID, Value) {
            console.log("显示return信息", TaskID, Value);
            if (TaskID == printResult && Value && flag == true) {
                console.log('RetailBillPrintHeight:' + RetailBillPrintHeight);
                //若开始正式打印零售小票，且此单据有聚合收款信息，则需要延时打印聚合收款商户存根联
                delayPrintUnionPayMerchantBill((RetailBillPrintHeight / 45) * 1000 + 5000); //延时打印聚合收款商户联 （大概1秒打印40px高度，拟定间隔5秒）
            } else {
                ClearDom()
            }
        };

        LODOP.SET_PRINTER_INDEX(printerName)
        printResult = LODOP.PRINT();
    }

    //云打印 ：A4
    function YUNLodoA4Print(printerName) {
        var printResult;
        LODOP = getLodop();
        LODOP.PRINT_INIT("云盛零售A4"); //实际开发打印任务名称请用这
        LODOP.SET_PRINT_PAGESIZE(3, 0, 0,"A4");
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);

        var printHtml = document.getElementById("billsDIV").innerHTML;
        RetailBillPrintHeight = document.getElementById("billsDIV").offsetHeight;

        LODOP.ADD_PRINT_HTM("0mm", "0mm", "100%", "100%", printHtml);
        LODOP.On_Return_Remain = true;
        LODOP.On_Return = function (TaskID, Value) {
            ClearDom()
        };
        LODOP.SET_PRINTER_INDEX(printerName)
        printResult = LODOP.PRINT();
        console.log("云盛零售A4");
    }

    function CreateOneFormPage() {
        LODOP = getLodop();

        LODOP.PRINT_INIT("云盛零售小票"); //实际开发打印任务名称请用这
        LODOP.SET_PRINT_PAGESIZE(3, 760, 0, "76mm roll paper"); //设置纸张大小（注意:3---纵向打印，宽度固定，高度按打印内容的高度自适应）CreateCustomPage
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);

        var printHtml = document.getElementById("billsDIV").innerHTML;
        RetailBillPrintHeight = document.getElementById("billsDIV").offsetHeight;


        LODOP.ADD_PRINT_HTM("0mm", "0mm", "76mm", "100%", printHtml); //ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)

        console.log("开始打印云盛零售小票");
    };

    //打印 聚合收款信息
    function LodoUnionPayMerchantPrint(flag) {

        LODOP = getLodop();
        LODOP.PRINT_INIT("云盛聚合收款商户存根联"); //实际开发打印任务名称请用这

        LODOP.SET_PRINT_PAGESIZE(3, 760, 0, "76mm roll paper"); //设置纸张大小（注意:3---纵向打印，宽度固定，高度按打印内容的高度自适应）CreateCustomPage
        LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);

        var printHtml = document.getElementById("unionPayPrintDIV").innerHTML;
        console.log(document.getElementById("unionPayPrintDIV").offsetHeight);
        //console.log(printHtml);

        LODOP.ADD_PRINT_HTM("0mm", "0mm", "76mm", "100%", printHtml); //ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)

        console.log("开始打印云盛聚合收款商户联");
        LODOP.On_Return = function (TaskID, Value) {
            //if (Value) alert("已发出实际打印命令！"); else alert("放弃打印！");
            console.log("显示return信息", TaskID, Value);
            ClearDom()
        };
        if (flag !== 1) {
            LODOP.PRINTA()
        }
    }

    //打印  聚合收款信息（延迟）
    function delayPrintUnionPayMerchantBill(ms) {
        setTimeout("LodoUnionPayMerchantPrint(1);LODOP.PRINT();", ms); //延时直接打印聚合收款（商户存根联）
    }

    //清除dom
    function ClearDom() {
        var billsDIVWrap = document.getElementsByClassName('billsDIVWrap');
        for (var i = 0; i < billsDIVWrap.length; i++) {
            var child = document.getElementsByClassName('billsDIVWrap')[i];
            child.parentNode.removeChild(child)
        }
    }

    //抛出方法
    window.LodoXiaoPiaopPrint = LodoXiaoPiaopPrint;//打印小票
    window.LodoUnionPayMerchantPrint = LodoUnionPayMerchantPrint;//打印 聚合收款信息
    window.YUNLodoXiaoPiaopPrint = YUNLodoXiaoPiaopPrint;//云打印小票
    window.YUNLodoA4Print = YUNLodoA4Print;//云打印A4

    function showMyComponent() {
        var lodopObj = getLodopObj();
        var LODOP = null;
        var mes = '';
        var printerNameList = [];
        LODOP = lodopObj.LODOP;
        mes = $.trim(lodopObj.retMes);
        if (LODOP) {
            var printerCount = CLODOP.GET_PRINTER_COUNT();
            for (var i = 0; i < printerCount; i++) {
                printerNameList.push(CLODOP.GET_PRINTER_NAME(i));
            }
            getComputerCode(function (Infos) {
                var componentIdDesc = '';
                var componentIdInfo = '';
                var computerCode = '';
                if (!LODOP) {
                    componentIdDesc = '（您需按照下方文字提示安装插件来绑定您的电脑）';
                    componentIdInfo = mes;
                } else {
                    componentIdDesc = mes;
                    componentIdInfo = Infos;
                    computerCode = Infos;
                }
                showModal(componentIdDesc, componentIdInfo, computerCode)
            })


        } else {
            var componentIdDesc = '（您需按照下方文字提示安装插件来绑定您的电脑）';
            var componentIdInfo = mes;
            showModal(componentIdDesc, componentIdInfo)
        }
        //获取电脑编码
        function getComputerCode(callback) {

            getSystemInfo('DiskDrive.1.SerialNumber', function (SerialNumber) {
                getSystemInfo('NetworkAdapter.1.PhysicalAddress', function (PhysicalAddress) {
                    var componentIdInfo = SerialNumber.replace(/-/g, '') + PhysicalAddress.replace(/-/g, '');
                    if (callback) {
                        callback(componentIdInfo)
                    }
                })
            })

            function getSystemInfo(strINFOType, callback) {
                if (LODOP.CVERSION) {
                    CLODOP.On_Return = function (TaskID, Value) {
                        if (callback) {
                            callback(Value)
                        }
                    }
                }
                var strResult = LODOP.GET_SYSTEM_INFO(strINFOType);
                if (!LODOP.CVERSION) return strResult; else return "";
            }
        }
        function showModal(componentIdDesc, componentIdInfo, computerCode) {
            var message = `<div>
                            <input type="hidden" name="id" value="" > 
                                <div style="height: 24px;line-height: 24px;margin-bottom:8px;">
                                    <div style="display:inline-block;background-color: #5184f0;
                                   width: 6px;height: 24px;float: left;"></div>
                                    <label style="color: #333333;font-size: 14px;margin-left: 14px;font-weight: 600;">我的电脑ID</label>
                                    <label style="	color: #ff3b30;font-size: 12px;word-break: break-all;">${componentIdDesc}</label>
                                </div>
                                <p style="margin-left: 20px;word-break: break-all;">${componentIdInfo}</p>
                                <div style="	height: 24px;line-height: 24px;margin-top:20px;margin-bottom:8px;">
                                    <div style="display:inline-block;background-color: #fe9f45;
                                   width: 6px;height: 24px;float: left;"></div>
                                    <label style="color: #333333;font-size: 14px; margin-left: 14px;font-weight: 600;">门店云打印设置</label>
                                </div>
                               <div style="margin-left: 20px;">
                                    <div  style="margin-bottom: 10px;">
                                        <label style="font-size: 14px;" for="ifC01002">
                                           <input type="checkbox" name="status" id="ifC01002" > 
                                           让【云盛店员助手】使用此台电脑打印零售单
                                         </label>
                                    </div>
                                    <div class="eui-cell" style="margin-bottom: 10px;">
                                        <label style="font-size: 12px;width: 97px;text-align: left;">
                                            电脑所在门店：
                                         </label>
                                        <div class="eui-flex__item" style="max-width: 285px;">
                                         <select name="sectionId" class="form-control"></select>
                                        </div>
                                    </div>
                                    <div  class="eui-cell"  style="margin-bottom: 10px;">
                                        <label style="font-size: 12px;width: 97px;text-align: left;">
                                            零售单打印机：
                                         </label>
                                        <div class="eui-flex__item" style="max-width:285px;">
                                            <select name="printerName" class="form-control"></select>
                                        </div>
                                    </div>
                                     <div  class="eui-cell"  style="margin-bottom: 10px;">
                                        <label style="font-size: 12px;width: 97px;text-align: left;">
                                           零售单打印纸张：
                                         </label>
                                        <div class="eui-flex__item" style="max-width:285px;">
                                            <select name="paperType" class="form-control">
                                                <option value="小票76mm">小票76mm</option>
                                                <option value="A4">A4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div  class="company-success-wrap"  style="margin-bottom: 10px;">
                                                                         </div> 
                               </div>
                            </div>`;
            var dialogInstance1 = new BootstrapDialog({
                title: '我的电脑',
                message: message.replace(/\n/g, ""),
                onshow: function (dialog) {
                    dialog.$modalDialog.css({width: 435});
                    var $printerName = dialog.$modalDialog.find('select[name="printerName"]');
                    var $sectionId = dialog.$modalDialog.find('select[name="sectionId"]');
                    var printerStr = '';
                    for (var i = 0; i < printerNameList.length; i++) {
                        printerStr += ` <option value="${printerNameList[i]}">${printerNameList[i]}</option>`
                    }
                    $printerName.append(printerStr);
                    $.ajax({
                        type: 'post',
                        url: '/manager/component/section/getAccessSectionVoList',
                        async: false,
                        success: function (data) {
                            var dataList = data.data.dataList;
                            if ($.isArray(dataList)) {
                                var printerStr = '';
                                for (var i = 0; i < dataList.length; i++) {
                                    printerStr += ` <option value="${dataList[i].dataId}">${dataList[i].name}</option>`
                                }
                                $sectionId.append(printerStr);
                            }
                        }
                    })
                    if (!LODOP) {
                        dialog.$modalBody.find('select,input').attr({'disabled': 'disabled'})
                        dialog.getButton('saveComponentConfig').disable();
                    }
                },
                onshown: function (dialog) {
                    if (!!computerCode) {
                        $.ajaxPackage({
                            url: '/manager/inventory/common/getSectionPrintParamVo',
                            data: {computerCode: computerCode},
                            success: function (data) {
                                var paramVo = data.data.paramVo || {};
                                if (paramVo.computerCode) {
                                    var $printerName = dialog.$modalDialog.find('select[name="printerName"]');
                                    var $sectionId = dialog.$modalDialog.find('select[name="sectionId"]');
                                    var $paperType = dialog.$modalDialog.find('select[name="paperType"]');
                                    var $status = dialog.$modalDialog.find('input[name="status"]');
                                    var $id = dialog.$modalDialog.find('input[name="id"]');
                                    $status.prop('checked', !paramVo.status)
                                    $id.val(paramVo.id)
                                    $sectionId.val(paramVo.sectionId)
                                    $printerName.val(paramVo.printerName)
                                    $paperType.val(paramVo.paperType)
                                    var sectionName = $sectionId.find("option:selected").text();
                                    if (paramVo.status == 0) {
                                        dialog.$modalDialog.find('.company-success-wrap').append(`
                                           <p class="company-success-desc">已成功配置让【云盛店员助手】使用此台电脑打印【${sectionName}】的零售单。</p>
                                        <p class="company-success-desc">为保证云打印功能正常运行，门店日常营业期间，请此门店人员在这台电脑上保存登录哦！</p>
                                        `);
                                    }
                                }
                            }
                        })
                    }
                },
                buttons: [{
                    id: 'saveComponentConfig',
                    label: '保存(Enter)',
                    cssClass: 'erp-btn-bg',
                    hotkey: 13,
                    action: function (dialog) {
                        var $printerName = dialog.$modalDialog.find('select[name="printerName"]');
                        var $sectionId = dialog.$modalDialog.find('select[name="sectionId"]');
                        var $paperType = dialog.$modalDialog.find('select[name="paperType"]');
                        var $status = dialog.$modalDialog.find('input[name="status"]');
                        var id = dialog.$modalDialog.find('input[name="id"]').val().trim();
                        var addData = {
                            sectionId: $sectionId.val(),
                            printerName: $printerName.val(),
                            paperType: $paperType.val(),
                            computerCode: componentIdInfo,
                            status: $status.is(':checked') ? '0' : '1'
                        }
                        if (id != '') {
                            addData.id = id;
                        }

                        $.ajaxPackage({
                            url: '/manager/inventory/common/saveSectionPrintParams',
                            data: addData,
                            success: function () {
                                $.zxsaas_plus.showalert("success", '保存成功');
                                setTimeout(function () {
                                    dialog.close();
                                }, 1500)
                            }
                        })


                    }
                },
                    {
                        label: '取消(Esc)',
                        cssClass: 'erp-btn-lab',
                        hotkey: 27,
                        action: function (dialog) {
                            dialog.close();
                        }
                    }]
            });

            dialogInstance1.open()
        }
    }



    window.showMyComponent = showMyComponent;
}();