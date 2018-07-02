//资金往来的 公共（复用:多个地方使用）接口
$(function () {
    var fundCommonInterface = {
        //根据单据ID修改单据 （预付/预收退款单）
        updateRemarkAjax: function (obj) {
            obj = obj ||{};
            var actionCode="";
            if(obj.data.billsType=='27'){
            	actionCode='nbfk_update';
            }else if(obj.data.billsType=='28'){
            	actionCode='nbsk_update';
            }else if(obj.data.billsType=='80'){
            	actionCode='ystk_update';
            }else if(obj.data.billsType=='81'){
            	actionCode='yftk_update';
            }
            $.ajaxPackage({
                url:"/manager/inventory/fund/inPayment/updateRemark/"+actionCode,
                data:JSON.stringify(obj.data),
                contentType:"application/json",
                success:function(data){
                    if(obj){
                    	$.zxsaas_plus.showalert("提示","修改成功");
                        obj.success(data);
                    }
                }
            });

          /*
                id true number 单据ID
                billsType true string 单据类型 27:内部付款单，28:内部收款单，80:预收退款单，81:预付退款单
                remark false string 备注
                detailList false array[object] 单据明细集合
                id true number 明细ID
                 remark false string 明细备注
           */
        },
        //往来类型接口
        findInpayClassAjax:function(obj){
        	 obj = obj ||{};
             $.ajaxPackage({
                 url:"/manager/inventory/fund/inPayment/findInpayClass",
                 data:obj.data,
                 success:function(data){
                     if(obj){
                         obj.success(data);
                     }
                 }
             });
        },
        //获取单据日志集合（预付/预收退款单）
        getBillsLogAjax:function(obj){
        	obj = obj ||{};
        	$.ajaxPackage({
        		url:"/manager/inventory/fund/inPayment/getBillsLog",
        		data:obj.data,
        		success:function(data){
        		if(obj){
        			obj.success(data);
        		}
        	}
        	});
			        	
			/*        	
			 * 参数名称是否必须类型默认值描述
			        	billsId true number 单据ID
			        	billsType true number 单据类型 27:内部收款单，28:内部付款单，80:预收退款单，81:预付退款单
			        	*/
        	
        	
        },
        //打印
        print:function(type,Obj){
        	var Obj = Obj || {
   			 title:""   //标题
   			};
        	if(type==18){
    			actionCode="fk_print";
    		}else if(type==19){
    			actionCode="sh_print";
    		}else if(type==20){
    			actionCode="yf_print";
    		}else if(type==21){
    			actionCode="ys_print";
    		}else if(type==27){
    			actionCode="qtfk_print";
    		}else if(type==28){
    			actionCode="qtsk_print";
    		}else if(type==29){
    			actionCode="nbzz_print";
    		}else if(type==56 || type==57 || type==58 || type==59){
    			actionCode="yfystz_print";
    		}else if(type==51 || type==52 || type==53 || type==54 || type==55){
    			actionCode="wljs_print";
    		}
    		if(Obj.id==""){
    			$.zxsaas_plus.showalert("提示","打印单据不存在!");
    			return;
    		}

    		$.zxsaas_plus.showconfirm("提示",Obj.title || "确定打印此单据？",function(){
    			 todo();
    		},function(){
    			
    		});
    		
    		function todo(){
    		
    			$.printBills('/manager/funds/print/paymentDetail/'+actionCode, 
    					{
    				      id:Obj.id,//单据id
    				      type:type//单据类型
    				    }
    				);
    		}
        }
    };
    //todo,限制于系统成型。 这里只能把对象挂在windows对象下。把公共接口暴露出去
    window.fundCommonInterface = fundCommonInterface;
});

//删除草稿单
function delDraftBill(){
    var params = $("#billsHeaderForm").toJsonObject();
    var mainIds=  $.trim(params.id)
    var billsStatus=  $.trim(params.billsStatus)
    if(billsStatus!='1' || mainIds==""){
        $.zxsaas_plus.showalert('提示','只能删除草稿单!');
    }else{
        $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function(){
            $.ajaxPackage({
                type:'get',
                url:'/manager/inventory/fund/deleteBills',
                data:{'billsId':mainIds,'billsType':billsType,},
                success:function(data){
                    $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                    isDraft = 1;
                    setTimeout(function(){
                        if(billsType==79||billsType==80||billsType==81){
                            clearAndAdd()
                        }
                    },1500)
                }
            })
        });
    }
}

//（稽查[1]/取消稽查[0]） 单据[auditStatus：1稽查：0取消稽查]
function auditBill(auditStatus){
    var params = $("#billsHeaderForm").toJsonObject();
    var mainIds=  $.trim(params.id)
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    if(billsStatus!='1' && mainIds!="" && isAudit!=auditStatus){
        $.ajaxPackage({
            url:'/manager/inventory/fund/updateAuditStatus',
            data:{billsType:billsType,billsId:mainIds,'auditStatus':auditStatus},
            success:function (data) {
                isDraft = 0;
                pageAjax({'billsId': mainIds,billsType:billsType});
                if(auditStatus===1){
                    $.zxsaas_plus.showalert('success',data.desc || "稽核成功");
				}else{
                    $.zxsaas_plus.showalert('success',data.desc || "取消稽核成功");
				}
            }
        })
    }else{
        if(auditStatus===1){
            $.zxsaas_plus.showalert('提示','只能对正式且未稽核单据稽核!');
        }else{
            $.zxsaas_plus.showalert('提示','只能对已稽核单据取消稽核!');
        }
    }
}

// billsType=79   //单据类型 79:资金调整单 ,49:预收退款单,48:预付退款单,18:付款单 ,19:收款单,20:预付款单,21:预收款单,32:供应商返利单,33:客户保价单,34:客户返利单
function goHistory(){
	var title='',goUrl='';
	if(billsType==79){
        title='资金调整单单据据列表'
        goUrl=basePath + '/inventory/fund/adjust/historyMain'
	}else if(billsType==80){
        title='预收退款单单据列表'
        goUrl=basePath + '/inventory/fund/inPayment/refund/historyMain?billsType='+billsType
	}
    else if(billsType==81){
        title='预付退款单单据列表'
        goUrl=basePath + '/inventory/fund/inPayment/refund/historyMain?billsType='+billsType
    }
	if(title!=='' && goUrl!==''){
        window.parent.openWorkBoxByMenutext(title, goUrl, false);
	}
}
//重新载入菜单按钮
function reloadToolbar(){
    var updateKey = ['print', 'red', 'copy', 'update', 'next', 'end','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave'];
    var params = $("#billsHeaderForm").toJsonObject();
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp:isDraft,
        isAudit:isAudit,
        billsStatus:billsStatus,
        menuBtn:menuBtn,
        billsCode:params.billsCode,
        updateKey:updateKey,
        addkey:addkey,
    })
    //判断是否禁用
    if(isDraft == false){
        //单据：稽核状态
        if(isAudit==1){
            $('#auditImg').attr('src', '/manager/images/audit.png');
        }else{
            $('#auditImg').attr('src', '/manager/images/auditNo.png');
        }
    }else{
        $('#auditImg').attr('src','')
    }
}

//加载 调整前金额
function loadBeforeAdjustAmount(){
    var $grid = dataGrid.$grid;
    var ids = $grid.getDataIDs();
    var accountIds=[]
    var goodsList=[]
    $.each(ids, function (m, keyId) {
        var rowData = $grid.jqGrid('getRowData', keyId);
        accountIds.push(rowData.accountId)
        goodsList.push({
            accountId:rowData.accountId,
            indexId:keyId
        })
    });
    if(accountIds.length>0){
        var sectionId = $("#sectionName").data("sectionId");
        //根据部门和资金账户获取资金账户对象
        $.request({
            url: "/manager/inventory/fund/adjust/getAccountByCon",
            type: 'POST',
            dataType: "json",
            data: {
                sectionId: sectionId,
                accountId: accountIds.join(',')
            },
            success: function (data) {
                if (data.result == 1) {
                    var accountVo = data.data.accountVo;
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        for(var j=0;j<accountVo.length;j++){
                            var item = accountVo[j];
                            if(goods.accountId==item.accountId){
                                goods.beforeAdjustAmount=item.beforeAdjustAmount
                            }
                        }
                    }
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        var dataRow = {
                            beforeAdjustAmount: goods.beforeAdjustAmount
                        };
                        $grid.jqGrid('setRowData', goods.indexId, dataRow, {});
                    }
                    footerData();

                } else {
                    $.zxsaas_plus.showalert("提示", data.desc);
                }
            }
        });
    }
}
function initTabAccountName(){
    $('#dataGridAccountName').comModalsAccount({
        clickback:function(goodsList){
            var $grid = dataGrid.$grid;
            $grid.jqGrid('saveCell',dataGrid.lastrow,dataGrid.lastcell);
            var ids = $grid.getDataIDs();
            var hasRepetGood=false //是否有重复商品，默认是没有
            var gridSelDataRow=$grid.jqGrid("getRowData",dataGrid.lastrow);  //主表选中的行 数据
            var hasCurRow=false;//是否有当前行选中的重复商品，默认是没有
            //获取 ： 弹出层选中的集合
            $.each(ids, function (m, keyId) {
                var rowData = $grid.jqGrid('getRowData', keyId);
                for(var i=0;i<goodsList.length;i++){
                    var goodsItem=goodsList[i];
                    if(goodsItem.dataId==rowData.accountId){
                        goodsList.splice(i, 1);
                        if(gridSelDataRow.accountId==goodsItem.dataId){
                            hasCurRow=true;
                            break;
                        }
                        hasRepetGood=true
                        break;
                    }
                }
            });
            if(hasRepetGood==true){
                $.zxsaas_plus.showalert('提示',"页面存在被选中的账户名称，已经去掉！");
            }
            var accountIds=[]
            for(var i=0;i<goodsList.length;i++){
                accountIds.push(goodsList[i].dataId)
            }
            if(accountIds.length>0){

                var sectionId = $("#sectionName").data("sectionId");
                var  selRowId=$("#dataGrid").jqGrid('getGridParam','selrow');
                //根据部门和资金账户获取资金账户对象
                $.request({
                    url: "/manager/inventory/fund/adjust/getAccountByCon",
                    type: 'POST',
                    dataType: "json",
                    data: {
                        sectionId: sectionId,
                        accountId: accountIds.join(',')
                    },
                    success: function (data) {
                        if (data.result == 1) {
                            var accountVo = data.data.accountVo;
                            var cIndex;
                            for(var i=0;i<goodsList.length;i++){
                                var goods = goodsList[i];
                                for(var j=0;j<accountVo.length;j++){
                                    var item = accountVo[j];
                                    if(goods.dataId==item.accountId){
                                        goods.beforeAdjustAmount=item.beforeAdjustAmount
                                    }
                                }
                            }
                            for(var i=0;i<goodsList.length;i++){
                                var goods = goodsList[i];
                                var dataRow = {
                                    accountId: goods.dataId,
                                    accountName: goods.name,
                                    accountType: goods.accountTypeCode,
                                    accountTypeName: goods.accountTypeName,
                                    beforeAdjustAmount: goods.beforeAdjustAmount,
                                    amount: "0.00"
                                };

                                if(i==0&&hasCurRow==false){
                                    $grid.jqGrid('setRowData', selRowId, dataRow, {});
                                    cIndex=selRowId;
                                }else{
                                    cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                                    $grid.jqGrid('addRowData', cIndex, dataRow);
                                }
                            }
                            $grid.delRowData('dataGrid_addRowId');
                            dataGrid.addKongRow();
                            $grid.delRowData(MyEiditGrid.getMaxRowid($grid));
                            footerData();

                        } else {
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            }
            $("#dataGridAccountName").removeData();
        }
    })
}
//打开账户名称引用对话框
function selectAccountReferenceOpen(cellInfo) {
    var sectionId = $("#sectionName").data("sectionId");
    if (sectionId == "") {
        $.zxsaas_plus.showalert("提示", "请选择部门名称!");
        return false;
    }
    $('#dataGridAccountName').comModalsAccount('setOption',{
        'girdParam':{
            'sectionIds':sectionId
        }
    })
    $('#dataGridAccountName').next(".showModalBtn").trigger('click')
}