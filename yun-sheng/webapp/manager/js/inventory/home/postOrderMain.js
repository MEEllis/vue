$(document).ready(function(){
    init()
	function init() {
        initTopForm()
        initTable()
    }
	function initTopForm() {
        $('.startTime,.endTime').datetimepicker({
            lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
            format:"Y-m-d",      //格式化日期
            timepicker:false,    //关闭时间选项
        });
        // $('#company').contactUnitPlu({
        //     checkMore: true,
        // })
        $("input[name='sectionName']").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$("input[name='sectionName']").data('sectionId');
                //设置编辑器值
                $("input[name='sectionId']").val(id);
            }
        });
        $('.startTime,.endTime').blur(function(){
            var s = $('.startTime').val();
            var e = $('.endTime').val();
            if(e !=='' && s>e){
                $('.startTime').val(e)
            }
        })
        //		查询
        $('.search').click(function(){
            var obj = {
                page: 1,
                rows: 100,
                sectionIds: $('#sectionName').data('sectionId'),
                billsBeginDateStr: $('.startTime').val(),
                billsEndDateStr: $('.endTime').val(),
                queryKey: $(".keyWord").val(),
                queryBillsType: $('.billType').val()
            }
            $("#dataGrid").jqGrid("setGridParam",{
                datatype:'json',
                page: 1,
                postData: obj
            }).trigger("reloadGrid");
        });
		//	过账
        $('.post').click(function(){
            var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
            var row = $("#dataGrid").getRowData(ids);
            if(ids.length<1){
                $.zxsaas_plus.showalert("提示","请选择需要过账的数据");
                return
            }
            var sign = row.billsTypeName;
            if(sign == '采购入库单'){
                postSave({id:row.orderId},"/manager/IbillsMain/saveCheckOrder/cgrk_gz");
            }else if(sign == '采购换货单'){
                postSave({id:row.orderId},"/manager/IbillsMain/saveCheckOrder/cghh_gz");
            }else if(sign == '采购退货单'){
                postSave({id:row.orderId},"/manager/IbillsMain/saveCheckOrder/cgth_gz");
            }else if(sign == '批发单'){
                postSave2({pi_bills_id:row.orderId,pi_bus_opr:'1',type:'19'},"/manager/salesCommon/postOrInvalidBills/xsck_gz");
            }else if(sign == '批发换货单'){
                postSave2({pi_bills_id:row.orderId,pi_bus_opr:'1',type:'20'},"/manager/salesCommon/postOrInvalidBills/xshh_gz");
            }else if(sign == '批发退货单'){
                postSave2({pi_bills_id:row.orderId,pi_bus_opr:'1',type:'21'},"/manager/salesCommon/postOrInvalidBills/xsth_gz");
            }else if(sign == '商品移库单'){
                postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/storage/products/move/executeDraftOrder");
            }else if(sign == '其他入库单'){
                postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/storage/stock/other/incoming/executeDraftOrder");
            }else if(sign == '其他出库单'){
                postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/storage/stock/other/removal/executeDraftOrder");
            }else if(sign == '成本调整单'){
                postSave({billsId:row.orderId,isDraft:'1'},"/manager/inventory/storage/cost/adjustment/executePostOrder");
            }else if(sign == '供应商保价单'){
                postSave({mainIds:row.orderId},"/manager/inventory/fund/supplier/reprice/excutePost");
            }else if(sign == '同价调拨发货单'){   // 发货操作 及是 过账
            	postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/storage/samePrice/transfer/executeDraftOrder");
            }else if(sign == '变价调拨发货单'){
            	postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/storage/changePrice/transfer/executeDraftOrder");
            }else if(sign == '供应商返利单'){
            	 postSave({billsId:row.orderId,isDraft:'1',billsType:'32'},"/manager/IcashMain/executePostSupplierRebateBills");
            }else if(sign == '客户价保单'){
            	postSave({billsId:row.orderId,isDraft:'1',type:'33'},"/manager/IcashMain/executePostClientReprice");
            }else if(sign == '客户返利单'){
            	postSave({billsId:row.orderId,isDraft:'1'},"/manager/IcashMain/executePostClientRebateBills");
            }else if(sign == '已售成本调整单'){
            	postSave({billsId:row.orderId,isDraft:'1'},"/manager/inventory/storage/sold/cost/adjustment/executePostOrder");
            }else if(sign == '付款单'){
            	postSave({billsId:row.orderId,isDraft:'1',type:'18'},"/manager/funds/payment/excutePost/fk_post");
            }else if(sign == '收款单'){
            	postSave({billsId:row.orderId,isDraft:'1',type:'19'},"/manager/funds/payment/excutePost/sh_post");
            }else if(sign == '收入单'){
            	postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/income/postBill");
            }else if(sign == '费用单'){
            	postSave({id:row.orderId,isDraft:'1'},"/manager/inventory/expend/postBill");
            }else if(sign == '内部转账单'){
            	postSave({billsId:row.orderId},"/manager/funds/innerTransfer/excutePost");
            }else if(sign == '资金调整单'){
            	postSave({billsId:row.orderId},"/manager/inventory/fund/adjust/excutePost");
            }else if(sign == '预付退款单'){
            	postSave({billsId:row.orderId,isDraft:'1',billsType:'81'},"/manager/inventory/fund/inPayment/refund/excutePost/yftk_post");
            }else if(sign == '预收退款单'){
            	postSave({billsId:row.orderId,isDraft:'1',billsType:'80'},"/manager/inventory/fund/inPayment/refund/excutePost/ystk_post");
            }else if(sign == '预付款单'){
            	postSave({billsId:row.orderId,isDraft:'1',type:'20'},"/manager/funds/payment/excutePost/yf_post");
            }else if(sign == '预收款单'){
            	postSave({billsId:row.orderId,isDraft:'1',type:'21'},"/manager/funds/payment/excutePost/ys_post");
            }else if(sign == '往来结算单'){
            	postSave({id:row.orderId},"/manager/funds/settlement/saveAndPost");
            }else if(sign == '往来调整单'){
            	postSave({billsId:row.orderId},"/manager/funds/adjust/executePost");
            }
        });
        var billtype = getBillType()
		var billtypeCon='<option value="">所有</option>'
		for(var i in billtype){
            billtypeCon+='<option value="'+i+'">'+billtype[i].name+'</option>'
		}
		$("#billType").append(billtypeCon)
    }
	function initTable(){
        //    	表格参数
        var option = {
            LoadTableUrl: basePath + '/inventory/main/getToPostOrderPageList',
            TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
            pager: "#jqGridPager",
            colNames : ['id','部门id','单据类型','单据日期','往来单位','部门','经办人','单据总金额','备注','制单人','制单时间','单据类型id',],
            colModel : [
                {name:'orderId',index:'orderId',width:80,align:'center',hidden:true},
                {name:'sectionIds',index:'sectionIds',width:80,align:'center',hidden:true},
                {name:'billsTypeName',index:'billsTypeName', width:150,align:'center','classes':'billsCodecss'},
                {name:'billsDateStr',index:'billsDateStr', width:200,align:'center', sorttype:'string'},
                {name:'contactUnitName',index:'contactUnitName', width:150,align:'left'},
                {name:'sectionName',index:'sectionName', width:150,align:'left',sorttype:'string'},
                {name:'managerName',index:'managerName', width:150,align:'left', sorttype:'string'},
                {name:'billsAmount',index:'billsAmount', width:150,align:'right', sorttype:'string',
                    formatter:function(cellvalue, options, rowObject){

                        var links=''
                         if($.trim(rowObject.billsAmount)=='CBTZD'||$.trim(rowObject.billsAmount)=='YSCBTZD'){
                            links='请查看单据详情'

                        }else{
                        	if(cellvalue == null){
                        		cellvalue=links;
                        	}else{
                        		links=cellvalue;
                        	}
                             
                         }

                        return  links
                }
                },
                {name:'remark',index:'remark', width:150,align:'left', sorttype:'string'},
                {name:'createByName',index:'createByName', width:150,align:'left', sorttype:'string'},
                {name:'createDateStr',index:'createDateStr', width:200,align:'center', sorttype:'string'},
                {name:'billsType',hidden:true},
            ]
        };
        loadmodal(option)
        function loadmodal(options) {
            $.jgrid.defaults.width = 1280;
            $.jgrid.defaults.responsive = true;
            $.jgrid.defaults.styleUI = 'Bootstrap';

            $(options.TableName).jqGrid({
                url: options.LoadTableUrl,
                mtype: "GET",
                datatype: "json",
                jsonReader: {
                    root: "data.orderVoList",
                    total: "data.total",
                    records: "data.records",
                    repeatitems: false
                },
                colNames: options.colNames,
                colModel: options.colModel,
                sortable: false,
                multiselect : true,	//复选框属性
                rownumbers:true,	//显示行号
                footerrow: true,//分页上添加一行，用于显示统计信息
                rowNum: 100,
                rowList: [100, 200, 500],
                pager: options.pager,
                viewrecords: true,
                //cellEdit:true,
                width: "100%",
                height: $(window).height() * 0.6,
                autowidth: true,
                rownumWidth: 35, // the width of the row numbers columns
                shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
                gridComplete: function() {
                    $("#dataGrid").footerData("set", {billsTypeName:"合计"},false);
                    var billsAmount = $("#dataGrid").getCol('billsAmount', false, 'sum');
                    $("#dataGrid").footerData("set", {billsAmount:billsAmount.toFixed(2)},false);
                },
                beforeSelectRow: function(rowid,e){
                    $('#dataGrid').jqGrid('resetSelection');
                    return(true);
                },
                loadComplete:function(){
                    $("td:contains('请查看单据详情')").css({"color":"blue","cursor":" pointer"});
                },
                onSelectAll:function(aRowids,status){
                    $('#dataGrid').jqGrid('resetSelection');
                    $.zxsaas_plus.showalert("提示","只能单选，请重新选择");
                    return(true);
                },
                onCellSelect:function(rowid, index, contents, event){
                    if($(event.target).attr('aria-describedby') == 'dataGrid_billsTypeName'){
                        var info = $("#dataGrid").getRowData(rowid)
                        var billtype = getBillType()
                        //当前单据类型
                        var currentBilltype = billtype[info.billsType];
                        if(currentBilltype){
                            currentBilltype.url+="?bId="+info.orderId+"&billsId="+info.orderId+"&from="+$('title').text()
                            window.parent.openWorkBoxByMenutext(currentBilltype.name,currentBilltype.url,true)
                        }
                    }
                    if($($(event.target).attr('aria-describedby') == 'dataGrid_billsAmount')){
                        var info = $("#dataGrid").getRowData(rowid)
                        var billtype = getBillType()
                        //当前单据类型
                        var currentBilltype = billtype[info.billsType];
                        if(currentBilltype== billtype[44]||currentBilltype== billtype[100]){
                            currentBilltype.url+="?bId="+info.orderId+"&billsId="+info.orderId+"&from="+$('title').text()
                            window.parent.openWorkBoxByMenutext(currentBilltype.name,currentBilltype.url,true)
                        }
                    }
                    function goTo(){

                    }

                },
            })
        }
	}

	//获取单据类型
	function getBillType() {
        return {
        	'2':{
                'url':'/manager/inventory/purchase/delivery/main',
                'name':'采购入库单',
            },
            '3':{
                'url':'/manager/inventory/purchase/exchange/main',
                'name':'采购换货单',
            },
            '4':{
                'url':'/manager/inventory/purchase/refund/main',
                'name':'采购退货单',
            },
            '7':{
                'url':'/manager/inventory/storage/samePrice/transfer/main',
                'name':'同价调拨发货单',
            },
            '8':{
                'url':'/manager/inventory/storage/changePrice/transfer/main',
                'name':'变价调拨发货单',
            },
            '9':{
                'url':'/manager/inventory/storage/stock/other/incoming/main',
                'name':'其他入库单',
            },
            '10':{
                'url':'/manager/inventory/storage/stock/other/removal/main',
                'name':'其他出库单',
            },
            '11':{
                'url':'/manager/inventory/storage/products/move/main',
                'name':'商品移库单',
            },
            '16':{
                'url':'/manager/funds/payment/initPayment',
                'name':'付款单',
            },
            '17':{
                'url':'/manager/funds/payment/initPayee',
                'name':'收款单',
            },
            '19':{
                'url':'/manager/salesOut/show',
                'name':'批发单',
            },
            '20':{
                'url':'/manager/salesExchange/show',
                'name':'批发换货单',
            },
            '21':{
                'url':'/manager/salesRefund/show',
                'name':'批发退货单',
            },
            '25':{
                'url':'/manager/funds/payment/planPayment',
                'name':'预付款单',
            },
            '26':{
                'url':'/manager/funds/payment/planPayee',
                'name':'预收款单',
            },
            '29':{
                'url':'/manager/funds/innerTransfer/initInnerTransfer',
                'name':'内部转账单',
            },
            '31':{
                'url':'/manager/inventory/fund/supplier/reprice/main',
                'name':'供应商保价单',
            },
            
            '32':{
                'url':'/manager/funds/supplierRebate',
                'name':'供应商返利单',
            },
            '33':{
                'url':'/manager/funds/clientReprice',
                'name':'客户价保单',
            },
            '34':{
                'url':'/manager/funds/clientRebate',
                'name':'客户返利单',
            },
            '44':{
                'url':'/manager/inventory/storage/cost/adjustment/main',
                'name':'成本调整单',
            },
            '48':{
                'url':'/manager/inventory/fund/inPayment/refund/payRefund/main',
                'name':'预付退款单',
            },
            '49':{
                'url':'/manager/inventory/fund/inPayment/refund/recRefund/main',
                'name':'预收退款单',
            },
            '51':{
                'url':'/manager/funds/settlement/initSettlement',
                'name':'往来结算单',
            },
            '56':{
                'url':'/manager/funds/adjust/initAdjust',
                'name':'往来调整单',
            },
            '67':{
                'url':'/manager/inventory/income/incomeBill',
                'name':'收入单',
            },
            '68':{
                'url':'/manager/inventory/expend/expendBill',
                'name':'费用单',
            },
            '79':{
                'url':'/manager/inventory/fund/adjust/main',
                'name':'资金调整单',
            },
            '100':{
                'url':'/manager/inventory/storage/sold/cost/adjustment/main',
                'name':'已售成本调整单',
            },
		}
    }
    function postSave(obj,url){
        $.request({
            url: url,
            type : "post",
            dataType : 'json',
            data:obj,
            success:function(data){
                if(data.result == 1) {
                    $.zxsaas_plus.showalert("success","过账成功");
                    $("#dataGrid").trigger("reloadGrid");
                }else{
                    $.zxsaas_plus.showalert("error",data.desc);
                }
            },
            error: function(){
                $.zxsaas_plus.showalert("error",'error');
            }
        });
    }
    function postSave2(obj,url){
        $.request({
            url: url,
            type : "post",
            dataType : 'json',
            contentType: "application/json",
            data:JSON.stringify(obj),
            success:function(data){
                if(data.result == 1) {
                    $.zxsaas_plus.showalert("success","过账成功");
                    $("#dataGrid").trigger("reloadGrid");
                }else{
                    $.zxsaas_plus.showalert("error",data.desc);
                }
            },
            error: function(){
                $.zxsaas_plus.showalert("error",'error');
            }
        });
    }
});
    

    

