!function ($) {

    //在插件中使用 组件对象
    $.validateImeiExisting = function (options) {
        options = options || {}
        if ($.trim(options.queryKey) == '' || $.trim(options.menuCode) == '' || $.trim(options.sectionId) == '') {
            return;
        }
        $.ajaxPackage({
            url: '/manager/inventory/common/validateImeiExistingBeforeInStock',
            data: {queryKey: options.queryKey, menuCode: options.menuCode},
            success: function (resData) {
                var imeiChangedVoList = resData.data.imeiChangedVoList;
                //验证是否有已经存在过的串号
                if ($.isArray(imeiChangedVoList)&&imeiChangedVoList.length>0) {
                    creatModal(imeiChangedVoList)
                } else {
                    //如果没有，直接走保存操作
                    save()
                }
            }
        })

        function save() {
            //保存草稿单
            if (options.save) {
                options.save()
            }
        }

        function creatModal(imeiChangedVoList) {

            var GenNonDuplicateID = functionObjExtent.GenNonDuplicateID();
            var gridId = `grid${GenNonDuplicateID}`;
            var gridPagerId = `gridPager${GenNonDuplicateID}`;
            var message = `<div>
                            <p style="color: #ffaf23;font-size: 14px;">系统检测到曾录入过以下串号，是否确定使用本次录入新串？</p>
                          <div>
                               <table id="${gridId}"></table>
                               <div id="${gridPagerId}"></div>
                          </div>
                           <p style="color: #b0b0b0;font-size: 12px;margin-top: 10px;">(温馨提示：表格中红色显示的内容，原串号存在多条需要手工变更) </p>
                       </div>`;
            var dialogInstance1 = new BootstrapDialog({
                title: '提示',
                message: message.replace(/\n/g, ""),
                onshown: function (dialog) {
                    //这里使用延时， 是由于显示动画的缘故
                    setTimeout(function () {
                        $(`#${gridId}`).jqGrid(
                            {
                                url: '/manager/inventory/common/validateImeiExistingBeforeInStock',
                                shrinkToFit: false,
                                styleUI: 'Bootstrap',
                                datatype: "local",
                                responsive: true,
                                data: imeiChangedVoList,
                                jsonReader: {
                                    root: "data.dataList",
                                    total: "data.total",
                                    records: "data.records",
                                    repeatitems: false
                                },
                                colNames: ['imeiId', '新串(主)', '新串(辅)', '旧串(主)', '旧串(辅)', '合法性标志'],
                                colModel: [
                                    {name: 'imeiId', hidden: true},
                                    {name: 'newImei', sortable: false, align: 'left', width: 125},
                                    {name: 'newAuxiliaryImei', sortable: false, align: 'left', width: 125},
                                    {name: 'oldImei', sortable: false, align: 'left', width: 125},
                                    {name: 'oldAuxiliaryImei', sortable: false, align: 'left', width: 125},
                                    {name: 'successFlag', hidden: true},
                                ],
                                sortable: false,
                                rownumbers: true,	//显示行号
                                rowNum: 100,
                                rowTotal: 10000000,
                                rowList: [100, 200, 500],
                                pager: gridPagerId,
                                viewrecords: true,
                                width: '100%',
                                height: 200,
                                autowidth: true,
                                rownumWidth: 50,
                                gridComplete: function () {
                                    $(`#${gridPagerId}_left`).remove()
                                },
                                loadComplete: function (data) {
                                    if (data.rows) {
                                        var $grid = $(`#${gridId}`);
                                        var ids = $grid.getDataIDs();
                                        //表格加载完成后 默认隐藏禁用行  var ids = $grid.getDataIDs();
                                        $.each(ids, function (i, keyId) {
                                            var currRow = $grid.jqGrid('getRowData', keyId);
                                            if (currRow.successFlag == 0) {
                                                //设置单元格高亮
                                                var curTr = $(`#${gridId} #${keyId}`);
                                                curTr.css({color:'red'})
                                            }
                                        })
                                    }
                                }
                            });
                    }, 180)
                },
                buttons: [{
                    label: '使用当前录入新串(Enter)',
                    cssClass: 'erp-btn-bg',
                    hotkey: 13,
                    action: function (dialog) {
                        var jsonData = [];
                        for (var j = 0; j < imeiChangedVoList.length; j++) {
                            var itemItem = imeiChangedVoList[j];
                            if (itemItem.successFlag == 1) {
                                jsonData.push({
                                    sourceImeiId: itemItem.imeiId,
                                    newImei: itemItem.newImei,
                                    newAuxiliaryImei: itemItem.newAuxiliaryImei,
                                })
                            }
                        }
                        if (jsonData.length > 0) {
                            $.ajaxPackage({
                                url: '/manager/imei/change/saveAndExecuteOrder',
                                data: {
                                    menuCode: options.menuCode,
                                    jsonData:JSON.stringify({
                                        detailList: jsonData,
                                        sectionId: options.sectionId,
                                    })
                                },
                                success: function (resData) {
                                    dialog.close();
                                    $.zxsaas_plus.showalert("success", "变更成功!");
                                    setTimeout(function () {
                                        save()
                                    },1500)
                                }
                            })
                        } else {
                            dialog.close();
                            save()
                        }

                    }
                }, {
                    label: '取消(Esc)',
                    cssClass: 'erp-btn-lab',
                    hotkey: 27,
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
            dialogInstance1.open();
        }

    }
}(jQuery);