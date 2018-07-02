var projectId
var alignArr = ['', 'left', 'center', 'right'];

var allBillsList = [];
$(function () {

    init()

    // 初始化 顶部表单
    function initTopForm(){
        //载入日期组件
        $('#startDate').datePlu({
            dateEnd:'#endDate',
            endDate:true,
            minTime:"1970-01-01",
            ifPermissions:false,
        });

        //载入 部门组件
        $('#sectionName').storePlu({
            isStoreShow:false,
            checkMore: true,
            search: false,
            isLoadDefaultName:false,
            ifStore: false // 控制部门选项
        });

        //载入 制单人
        $("#createByName").comModalsEmployee({
            multiselect: true,
            girdParam:{
                empIsOperator:1  //制单人
            }
        });
        //稽核人：和制单人同一数据源
        $("#auditByName").comModalsEmployee({
            multiselect: true,
            girdParam:{
                empIsOperator:1
            }
        });

        //查询
        $('#searchQuery .search').click(function () {
			searchDetail()
        })
        //重置
        $('#searchQuery .reset').click(function () {
            $("#searchQuery")[0].reset();
			$('#startDate').datePlu({
				dateEnd: '#endDate',
				ifPermissions:false,
			})
            $("#searchQuery input").data({'id':'',sectionId:''})
        })
    }
	function init() {
		initTopForm()
        initTable()
        initTree()
	}
	function initTable() {
        $("#rpGrid").jqGrid({
            styleUI: 'Bootstrap',
            mtype: "POST",
            url: '/manager/cw/voucher/pageBills',
            datatype: "local",
            jsonReader: {
                root:"data.rows",
                page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            rowNum: 100,
            rowList: [100, 200, 500],
            viewrecords: true,
            shrinkToFit:false,
            autowidth: true,
            rownumWidth: 50, // the width of the row numbers columns
            rownumbers: true,	//显示行号
            width: '100%',
            height: $(window).height() * 0.6,
            pager: '#rpGridPager',
            colNames: ['稽核','单据状态','单据类型','单据日期','单据编号','往来单位','部门','经手人','制单人','制单时间','过账人','过账时间','红冲人','红冲时间',
				'id','companyId','contactsunitId','sectionId','managersUid','createBy','billsTypeCode'],
            colModel: [
                {name:'auditStatus',width:100,align:'center',formatter :"select",editoptions:{value: "0:未稽核;1:已稽核;"}},
                {name:'billsStatus',width:100,align:'center',formatter :"select",
                    editoptions:{value: "1:草稿;2:已审核;3:入库中;4:已完成;5:强制完成;6:已过账;7:已红冲;8:已发货;9:作废;10:已接收;11:拒收;12:出库中"}},
                {name:'billsType',index:'billsType',width:150,align:'center', sorttype:'string',sortable:false},
                {name:'billsDateStr',index:'billsDateStr', width:100,align:'center', sorttype:'string',sortable:false},
                {name:'billsCode',index:'billsCode',classes:'billsCodeStyle', width:250,align:'center', sorttype:'string',sortable:false},
                {name:'contactsunitName',index:'contactsunitName', width:100,align:'left', sorttype:'integer',sortable:false},
                {name:'sectionName',index:'sectionName', width:100,align:'left', sorttype:'integer',sortable:false},
                {name:'managersName',index:'managersName', width:100,align:'left', sorttype:'integer',sortable:false},
                {name:'createName',index:'createName', width:100,align:'left', sorttype:'integer',sortable:false},
                {name:'createDateStr',index:'createName', width:200,align:'center', sorttype:'integer',sortable:false},
                {name:'postByName', width:100,align:'left', sorttype:'integer',sortable:false},
                {name:'postDateStr', width:200,align:'center', sorttype:'integer',sortable:false},
                {name:'redByName', width:100,align:'left', sorttype:'integer',sortable:false},
                {name:'redDateStr', width:200,align:'center', sorttype:'integer',sortable:false},

                {name:'id',index:'id',hidden:true},
                {name:'companyId',index:'companyId',hidden:true},
                {name:'contactsunitId',index:'contactsunitId',hidden:true},
                {name:'sectionId',index:'sectionId',hidden:true},
                {name:'managersUid',index:'managersUid',hidden:true},
                {name:'createBy',index:'createBy',hidden:true},
                {name:'billsTypeCode',hidden:true},
			],
            userDataOnFooter: true,
            multiselect: true,
            multiboxonly : true,
            cellEdit: false,
            gridComplete:function(){

            },
            onSelectRow: function (id, status) {
                $('#cb_rpGrid').prop('checked',false)
                hidecheckBoxInfo()
            },
            loadComplete: function (reData) {
                var $table= $('#rpGrid')
                var ids = $table.getDataIDs();
                if(ids.length>0){
                    $.each(ids,function(i,keyId){
                        var row = $table.getRowData(keyId);
                        var curTr= $("#rpGrid #"+keyId);
                        if(row.billsStatus == 7){
                            curTr.css("color","red");
                        }else{
                            curTr.css("color","");
                        }
                        // 草稿单 要清除
                        if(row.billsStatus == 1) {
                            $table.setCell(keyId,"auditStatus",' ')
                        }
                        if(row.auditStatus == 0) {
                            $table.setCell(keyId,"auditStatus",'','no-auditStatus')
                        }else{
                            $table.setCell(keyId,"auditStatus",'','yes-auditStatus')
                        }

                    })
                }
                else{
                    if(('result' in reData) && reData.result!=1){
                       $.zxsaas_plus.showalert("提示", reData.desc);
                    }
                }

                if(allBillsList.length>0){
                    $.each(reData.data.rows,function (k,v) {
                        $('#rpGrid').jqGrid('setSelection' , v.id ,true)
                    })
                    $('#cb_rpGrid').prop('checked',true)
                    $('.checkLen').text('本页'+reData.data.rows.length)
                }else{
                    $('.checkBoxInfo').hide()
                }

                //全选
                $('#cb_rpGrid').off('change.one').on('change.one',function (e) {
                    if(e.target.checked){
                        $('.checkLen').text('本页'+reData.data.rows.length)
                        $('.checkBoxInfo').show();
                        if(reData.data.total >= 1){
                            $('.checkAllLen').text(reData.data.records)
                            $('.checkinfoBox').show()
                            // 全选
                            $('.checkAllInfo').unbind('click').on('click',function () {
                                $.ajaxPackage({
                                    url: "/manager/cw/voucher/getAllBillsCode",
                                    data:{queryPara:JSON.stringify(getSearchParam())},
                                    success:function (data) {
                                        $('.hasCheckedBox ').show()
                                        $('.checkinfoBox').hide()

                                        allBillsList = data.data.billsCodeList;
                                        //取消勾选
                                        $('.qxCheck').unbind('click').on('click',function () {
                                            $('.checkinfoBox').show()
                                            $('.hasCheckedBox').hide()
                                            allBillsList = []
                                        })
                                    }
                                })
                            })
                        }else{

                        }

                        var rowsId,lastId;
                        $.each(reData.data.rows,function (k,v) {
                            lastId = v.id;
                            if(rowsId == lastId){

                            }else{
                                if(!$('#rpGrid tr:eq('+(k+1)+')').attr('aria-selected')){
                                    rowsId = lastId
                                    $('#rpGrid').jqGrid('setSelection' , k+1 )
                                }

                            }
                        })

                    }
                    else{
                        hidecheckBoxInfo()
                        $('#rpGrid').trigger("reloadGrid");
                    }
                })
            },
            onCellSelect:function (rowid, index, contents, event) {
                var info = $("#rpGrid").getRowData(rowid)
                var tarName=$(event.target).attr('aria-describedby')||'';
                var goto=functionObjExtent.getGoInfo(info);
                var gotoUrl = goto.gotoUrl;
                var gotoName = goto.gotoName;
                if ( tarName== 'rpGrid_billsCode' ) {
                    if(gotoName==="零售退定单"){
                        window.top.openWorkBoxByMenutext(gotoName,gotoUrl+'?billsCode=' + info.billsCode+ '&billsId=' + info.id+ '&urlParam=' + info.billsTypeCode, true)
                    }else{
                        window.top.openWorkBoxByMenutext(gotoName,gotoUrl+'?bId=' + info.id + '&billsCode=' + info.billsCode+ '&billsId=' + info.id+ '&urlParam=' + info.billsTypeCode, true)
                    }

                }
            },
        });

        function hidecheckBoxInfo() {
            $('.checkBoxInfo').hide();
            allBillsList = []
        }
        //生成凭证
        $("#voucherGo").click(function () {
            var billsTypeArr=[]
            var billsCodeArr=[]
            var $table= $('#rpGrid')
            var ids = $table.jqGrid('getGridParam','selarrrow');
            if(ids.length==0){
                $.zxsaas_plus.showalert("success", "请选择一行!");
                return
            }else{
                //全选多页
                if(allBillsList.length>0){
                    $.each(allBillsList,function(i,keyId){
                        var row = allBillsList[i];
                        billsCodeArr.push(row.billsCode)
                        billsTypeArr.push(row.billsTypeCode)
                    })
                }else{
                    $.each(ids,function(i,keyId){
                        var row = $table.getRowData(keyId);
                        billsCodeArr.push(row.billsCode)
                        billsTypeArr.push(row.billsTypeCode)
                    })
                }
                var addData={
                    isMerge: $("#isMerge").is(":checked") ? "1" : "0",
                    billsDateEnd:$('#endDate').val()+" 23:59:59",
                    billsType:functionObjExtent.unique(billsTypeArr).join(','),
                    billsCode:functionObjExtent.unique(billsCodeArr).join(','),
                };
                clearVoucherInfo()
                $.ajaxPackage({
                    url:'/manager/cw/voucher/generateVoucher',
                    data:addData,
                    success:function (data) {
                        $("#voucherGo-modal").modal('show')
                        if(data.result==1){
                            //失败的个数
                            var failNum=0;
                            //成功的个数
                            var succNum=0;
                            if(data.data.vocherIds==-1){
                                failNum=ids.length
                            }else{
                            	var str=data.desc.split("--")[0];
                            	var billsCountStr=str.split(",")[1];
                            	succNum = billsCountStr.split(":")[1];
                                failNum=ids.length-succNum;
                            }
                            $('#voucherInfo').text("本次共选择"+ids.length+"张单据，"+succNum
                                +"张单据生成凭证成功，"+failNum+"张单据生成凭证失败。")
                             if(failNum!=0){
                            	 $('#voucherDescList').val(data.desc.split("--")[1])
                             }
                            searchDetail(1)
                        }

                    }
                })
            }
        })
        //查看结果
        $("#voucherResult").click(function () {
            $("#voucherGo-modal").modal('show')
        })
    }
	function initTree() {
        var timeoutId
        var setting = {
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { "Y": "s", "N": "ps" }
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback:{
                onCheck:function(event, treeId, treeNode){
                   if(timeoutId){
                       clearTimeout(timeoutId)
                   }
                    timeoutId = setTimeout(function () {
                        searchDetail()
                    },1500)
                }
            }
        };
        var zNodes =[
            { id:-111, pId:'', name:"单据类型"},

            { id:-1, pId:-111, name:"采购类单据"},
            { id:1, pId:-1, name:"采购订单"},
            { id:2, pId:-1, name:"采购入库单"},
            { id:3, pId:-1, name:"采购换货单"},
            { id:4, pId:-1, name:"采购退货单"},

            { id:-2, pId:-111, name:"批发类单据"},
            { id:18, pId:-2, name:"销售订单"},
            { id:19, pId:-2, name:"批发出库单"},
            { id:20, pId:-2, name:"批发换货单"},
            { id:21, pId:-2, name:"批发退货单"},

            { id:-3, pId:-111, name:"零售类单据"},
            { id:45, pId:-3, name:"零售出库单"},
            { id:46, pId:-3, name:"零售退货单"},
            { id:48, pId:-3, name:"零售定金单"},
            { id:50, pId:-3, name:"零售退定单"},
            { id:74, pId:-3, name:"营业缴款"},

            { id:-4, pId:-111, name:"仓储类单据"},
            { id:7, pId:-4, name:"同价调拨发货单"},
            { id:8, pId:-4, name:"变价调拨发货单"},
            { id:9, pId:-4, name:"其它入库单"},
            { id:10, pId:-4, name:"其它出库单"},
            { id:44, pId:-4, name:"成本调整单"},

            { id:-5, pId:-111, name:"资金往来单据"},
            { id:79, pId:-5, name:"资金调整单"},
            { id:26, pId:-5, name:"预收款单"},
            { id:80, pId:-5, name:"预收退款单"},
            { id:25, pId:-5, name:"预付款单"},
            { id:81, pId:-5, name:"预付退款单"},
            { id:16, pId:-5, name:"付款单"},
            { id:17, pId:-5, name:"收款单"},
            { id:29, pId:-5, name:"内部转账单"},
            { id:68, pId:-5, name:"费用单"},
            { id:67, pId:-5, name:"收入单"},
            { id:31, pId:-5, name:"供应商保价单"},
            { id:32, pId:-5, name:"供应商返利单"},
            { id:33, pId:-5, name:"客户保价单"},
            { id:34, pId:-5, name:"客户返利单"},

            { id:51, pId:-5, name:"往来结算单-预付冲应付"},
            { id:52, pId:-5, name:"往来结算单-应付冲应付"},
            { id:53, pId:-5, name:"往来结算单-预收冲应收"},
            { id:54, pId:-5, name:"往来结算单-应收冲应收"},
            { id:55, pId:-5, name:"往来结算单-应收冲应付"},

            { id:56, pId:-5, name:"往来调整单-应收款增加"},
            { id:57, pId:-5, name:"往来调整单-应收款减少"},
            { id:58, pId:-5, name:"往来调整单-应付款增加"},
            { id:59, pId:-5, name:"往来调整单-应付款减少"},

            { id:84, pId:-5, name:"往来调整单-预收款增加"},
            { id:85, pId:-5, name:"往来调整单-预收款减少"},
            { id:86, pId:-5, name:"往来调整单-预付款增加"},
            { id:87, pId:-5, name:"往来调整单-预付款减少"},
        ];
        $.fn.zTree.init($("#dataTree"), setting, zNodes);
        var treeObj  = $.fn.zTree.getZTreeObj("dataTree")
        treeObj.checkAllNodes(true);
        var nodes = treeObj.getNodes()[0].children;
        for(var i=0;i<nodes.length;i++){
            treeObj.expandNode(nodes[i]);
        }
    }

	function searchDetail(flag) {
        allBillsList=[]
        var params=getSearchParam()
        if(flag!=1){
            clearVoucherInfo()
        }
		$("#rpGrid").setGridParam({
			datatype: 'json',
			postData: {queryPara:JSON.stringify(params)},
		}).trigger("reloadGrid");
    }

    function clearVoucherInfo() {
        $('#voucherInfo').text('')
        $('#voucherDescList').val('')
    }
    //获取查询参数
    function getSearchParam(){
        var treeObj = $.fn.zTree.getZTreeObj("dataTree")
        var checkedNodesList = treeObj.getCheckedNodes();
        var billsType=[]
        for(var i=0;i<checkedNodesList.length;i++){
            var checkedbillsTypeId=checkedNodesList[i].id
            if(checkedbillsTypeId>0){
                billsType.push(checkedbillsTypeId)
            }
        }

        return {
            billsDateBegin:$("#searchQuery input[name='billsDateBegin']").val()+" 00:00:00",
            billsDateEnd:$("#searchQuery input[name='billsDateEnd']").val()+" 23:59:59",
            sectionIds:$.trim($("#sectionName").data("sectionId")),
            createBy:$("#createByName").data("id"),
            auditById:$("#auditByName").data("id"),
            billsType:billsType.join(','),
            containsRed : $("#searchQuery input[name='containsRed']").is(":checked") ? "1" : "0",
            containsNotAudit : $("#searchQuery input[name='containsNotAudit']").is(":checked") ? "1" : "0",
        };
    }


})
