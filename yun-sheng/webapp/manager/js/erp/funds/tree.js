

//获取默认值
function getDefaultSectionAccount(){
    $.ajaxPackage({
        url:"/manager/inventory/common/getDefaultValues",
        async:false,
        success:function(data){
            var deSe=data.data.defaultSection;
            var deEm=data.data.defaultEmployee;
            $('#sectionName').val(deSe.name).data('id',deSe.sectionId)
            $('#sectionId').val(deSe.sectionId).data('texts',deSe.name)
            $('#managerUname').val(deEm.name).data('id',deEm.employeeId)
            $('#managersUid').val(deEm.employeeId)
			if(type==18||type==19||type==20||type==21){
			}else{
                getAccountBySectionId(deSe.sectionId)
			}

        }
    });

}


$(function(e){
	var formId = $('body').find('form').eq(0).attr('id');//表单Id
});

var sectionName="";
var sectionId="";
var layerrCode="";//往来单位类别层级编码
var remCode="";//往来单位助记码
var positionId="";//职位id
var ifFilterClick=false;//是否是过滤弹出框






//部门模态框
function showSectionModal(cellInfo){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	    zTreeClick(treeId,treeNode,cellInfo);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.ajax( {
		type : 'Get',
		url:'/manager/jxc/storage/authorityAndTree/findTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
			$.fn.zTree.init($("#sectionTreeData"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("sectionTreeData");
			zTree.expandAll(true);// 展开全部节点
			$("#sectionModal").modal("show");
		},
		error : function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
}

//往来单位模态框
function showContactunitModal(){
	$("#contactunitRemCode").val("");
	layerrCode="";
	remCode="";
	reloadContactunitGrid();
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "id",pIdKey: "pid",layerrCode:"layerrCode",rootPId: null}
	        },
	        async: {//从后台获取数据
	            enable: true,
	    		dataType: "json",
	    		url:'/manager/jxc/storage/tree/findContactunitTree',
	            autoParam:[],
	            dataFilter: null
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	    zTreeClick(treeId,treeNode,null);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	
	$.fn.zTree.init($("#contactunitTreeData"), setting);
	var zTree = $.fn.zTree.getZTreeObj("contactunitTreeData");
    zTree.expandAll(true);  
    $("#contactunitModal").modal("show");
}
var lastrow="",lastcell="";
//树点击事件
function zTreeClick(treeId,treeNode,cellInfo){
	//往来单位树
	if(treeId=="contactunitTreeData"){
		layerrCode=treeNode.obj.layerrCode;
		reloadContactunitGrid();
	}
	
	//部门树
	if(treeId=="sectionTreeData" && !ifFilterClick){
		//只能选择最末级
		if(treeNode.children.length != 0) return false;
		   if(cellInfo!=null && cellInfo!=undefined){
			 //设置编辑器值
				$("#"+cellInfo.gridId+" #"+cellInfo.cellInputId).val(treeNode.name);
				$("#"+cellInfo.gridId).jqGrid('setCell', cellInfo.rowId ,"wlSectionId" ,treeNode.obj.id);
				
				$("#"+cellInfo.gridId).jqGrid('setCell', cellInfo.rowId ,"sectionId" ,treeNode.obj.id);
				if($("#"+cellInfo.gridId).attr("data-sectionManagerFlag")=="-999"){
					console.log("不需要清空职员");
				}
				else{
                    //清空职员
                    $("#"+cellInfo.gridId).jqGrid('setCell', cellInfo.rowId ,"wluserId" ,null);
                    $("#"+cellInfo.gridId).jqGrid('setCell', cellInfo.rowId ,"wluserName" ,null);
				}

				setTimeout('MyEiditGrid.getFocus('+'"#'+cellInfo.cellInputId+'")',200);
				$("#"+cellInfo.gridId).jqGrid("saveCell",lastrow,lastcell);
		   }else{
			    $("#sectionName").val(treeNode.name);
			    $("#sectionId").val(treeNode.obj.id).data("sectionId",treeNode.obj.id);
				$("#managerUname").val("");
				$("#managersUid").val("");
				//todo ：  有些地方需要点击后加载表格，有些地方不需要。  
				if($("#sectionName").attr("data-isclickload")==="false"){
					
				}else{
					getAccountBySectionId(treeNode.obj.id);
				}
				if(type==67 || type==68){
					$("#prepaymentAmount").val("0.00");
				}
				refreshValidatorField("sectionName",'#' + formId);//刷新验证信息
		   }
		$("#sectionModal").modal("hide");
	}
	
	if(treeId=="sectionTreeData" && ifFilterClick){
		$("#filterSearchForm input[name='sectionName']").val(treeNode.name);
		ifFilterClick=false;
		$("#sectionModal").modal("hide");
	}
}

//通过部门id获取该公司可使用资金账户的付款明细
function getAccountBySectionId(sectionId){
		$.ajax({
			url:"../../funds/payment/findAccountName/"+type,
			type : 'GET',  
			dataType: "json",
			data:{"sectionId":sectionId},
			async:false,
			contentType :'application/json', 
			success:function(data){
			  if(data.result==1){
				  jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
				  var accountList=data.data.rows.payReceiptDetailList;
				  if(accountList.length>0){
					  if(type==27 || type==28){
						  for(var i=0;i<accountList.length;i++){
							  //增加是否禁用的判断
							  if(!accountList[i].status){
								  dataGrid.addRowData(i+1,accountList[i]);
							  }
						  }
					  }else{
						  if(type==18 || type==19 || type==20 || type==21){
							  for(var i=0;i<accountList.length;i++){
								//增加是否禁用的判断
								  if(!accountList[i].status){
									  $("#jqGrid_SubjectBalance").jqGrid('addRowData', i+1,accountList[i], 'last' );
								  }
							  }
							  footerData();
						  }
						  if(type==67 || type == 68 ){
							  jQuery("#paymentWayModalGrid").jqGrid("clearGridData");
							  for(var i=0;i<accountList.length;i++){
								//增加是否禁用的判断
								  if(!accountList[i].status){
									  $("#paymentWayModalGrid").jqGrid('addRowData', i+1,accountList[i], 'last' );
								  }
							  }
						  }
					  }
				  }
			  }else{
				  $.zxsaas_plus.showalert("错误","服务器出错，请稍后重试");
			  }
		    }
		});
}
var gridEmployee="";
//grid表格行双击事件
function gridRowDbclick(gridId,rowid,name){
	if(gridId=="#contactunitModalGrid"){//往来单位表格
		if(!ifFilterClick){
			$("#contactsunitId").val(rowid);
			$("#contactUnitName").val(name);
			if(type!=67 && type!=68){
				if(adjustType!=""){
					selectAdjustType();
				}else{
					getBankByContactunitId(rowid);
				}
			}
		}else{
			$("#filterSearchForm input[name='contactUnitName2']").val(name);
			ifFilterClick=false;
		}
		
		//往来结算应付，预付单位弹出模态框
		if(unitModalId=="inUnitModal"){//预付，转出，业务开始单位
			$("#inUnit").val(rowid);
			$("#inUnitName").val(name);
			if(index==0 || index==2 || index==4){
				$("#jqGrid_tab_down").jqGrid('clearGridData');
			}
		}else if(unitModalId=="outUnitModal"){
			$("#outUnit").val(rowid);
			$("#outUnitName").val(name);
			if(index==0 || index==2 || index==4){
				$("#jqGrid_tab_up").jqGrid('clearGridData');
			}else if(index==1  || index==3){
				$("#jqGrid_tab_down").jqGrid('clearGridData');
			}
		}
		//refreshValidatorField("contactUnitName",'#' + formId);//刷新验证信息
		$("#contactunitModal").modal("hide");
	}
    if(gridId=="#managerModalGrid"){//经手人表格
    	if(gridEmployee){
    		$("#"+gridIdAccount+" #"+inptid).val(name);
    		$("#"+gridIdAccount).jqGrid('setCell', rowidRig ,"wluserId" ,rowid);
    		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
    		$("#"+gridIdAccount).jqGrid("saveCell",lastrow,lastcell);
    	}else{
    		$("#managersUid").val(rowid);
    		$("#managerUname").val(name);
    		//refreshValidatorField("managerUname",'#' + formId);//刷新验证信息
    	}
    	gridEmployee=false;
		$("#managerModal").modal("hide");
	}
}

//获取往来单位余额等信息
function getBankByContactunitId(id){
    var obj={
        data:{
            contactUnitId:id,
        },
        success:function (data) {
            var contactInfo=data.data.contactUnitAmountVo;
            $("#brankName").val(contactInfo.bankName);
            $("#customer").val(contactInfo.bankAccountName);
            $("#brankAmount").val(contactInfo.bankAccountNumber);
            if(type==18 || type==20){//付款单，预付款
                $("#receivableAmount").val(contactInfo.shouldPayBalance);
                $("#planReceAmount").val(contactInfo.prePayBalance);
            }else if(type==19 || type==21){//收款单,预收款
                $("#receivableAmount").val(contactInfo.shouldReceiptBalance);
                $("#planReceAmount").val(contactInfo.preReceiptBalance);
            }
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}


//加载往来单位grid
function reloadContactunitGrid(){
	 $("#contactunitModalGrid").jqGrid('setGridParam', {
	    url:'../../tree/getContactList',
		datatype : 'json',
		postData :{"layerrCode":layerrCode,"remCode":remCode},
		page : 1
	}).trigger("reloadGrid").resize();
}

//加载经手人grid
function reloadManagerGrid(sectionId){
	 $("#managerModalGrid").jqGrid('setGridParam', {
	    url:'/manager/tree/getManagerList',
		datatype : 'json',
		postData :{"positionId":positionId,"remCode":remCode,"sectionId":sectionId},
		page : 1
	}).trigger("reloadGrid").resize();
}

//弹出经手人模态框
function showManagerModal(){
	$("#positionSelect").val("");
	$("#managerRemCode").val("");
	positionId="";
	remCode="";
	var sectionId=$("#sectionId").val();
	if(sectionId==""){
		$.zxsaas_plus.showalert("提示","请先选择部门名称!");
		return;
	}
	reloadManagerGrid(sectionId);
	$("#managerModal").modal("show");
}



//往来单位助记码模糊搜索
$(document).delegate("#contactunitRemCode", "input propertychange", function(e){
	remCode=$(this).val();
	reloadContactunitGrid();
});

//经办人查询参数改变事件
$(document).delegate("#positionSelect,#managerRemCode", "input propertychange", function(e){
	var id=e.target.id
	if(id=="positionSelect"){
		positionId=$(this).val();
	}else if(id=="managerRemCode"){
		remCode=$(this).val();
	}
	reloadManagerGrid();
});


//获取职位信息
function getPosition(){
	$.ajax({
		type: 'Get',
        url: '../../tree/getPositionList',
        dataType: "json",
        success: function (data) {
          var positionList=data.data.positionList;
          if(positionList.length>0){
        	  $.each(positionList,function(i,value){
        		  $("#positionSelect").append("<option value='"+value.id+"'>"+value.name+"</option>")
        	  });
          }
        },
        error: function (msg) {
        	$.zxsaas_plus.showalert("提示","数据加载失败,请稍后重试!");
        }
	});
}


//往来单位grid
function contactunitGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#contactunitModalGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'../../tree/getContactList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#contactunitGridpager",
	};
	
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别'];
	var JqGridColModel=[
						{name:'id',index:'id', width:55,align:'center', sorttype:'id',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'districtName',index:'districtName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'contactTypeName',index:'contactTypeName', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'contactCategoryName',index:'contactCategoryName', width:100,align:'center', sorttype:'string',sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "600px" ,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow:function(rowid,iRow,iCol,e){
					var name=$(options.TableName).getRowData(rowid).name;
					gridRowDbclick(options.TableName,rowid,name);		
				}
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}

//经手人grid
function managerGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#managerModalGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'../../tree/getManagerList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#managerGridpager",
	};
	
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['ID','员工编码','员工名称','所属部门','职位名称','助记码','备注'];
	var JqGridColModel=[
						{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'positionName',index:'positionName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'remark',index:'remark', width:100,align:'center', sorttype:"string",sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "600px" ,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow:function(rowid,iRow,iCol,e){
					var name=$(options.TableName).getRowData(rowid).name;
					gridRowDbclick(options.TableName,rowid,name);		
				}
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}


//转出、转入，应付、预付单位对话框
var unitModalId="";
function showInOrOutModal(unitBtnId){
	unitModalId=unitBtnId;
	showContactunitModal();
}

$(document).on('dblclick','#contactunitModalGrid>tbody>tr.active',function(){
	refreshValidatorField("contactUnitName",'#billsHeaderForm');//刷新验证信息
})
$(document).on('dblclick','#managerModalGrid>tbody>tr.active',function(){
	refreshValidatorField("managerUname",'#billsHeaderForm');//刷新验证信息
})

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
                data:{'billsId':mainIds,'billsType':type,},
                success:function(data){
                    isDraft=1
                    billsId=''
                    setTimeout(function(){
                        location.href =location.href.substring(0,location.href.indexOf('?'));
                    },1500)
                    $.zxsaas_plus.showalert('提示',data.desc || "删除成功");
                }
            })
        });
  }
}
//打开账户名称引用对话框
function selectAccountReferenceOpen(cellInfo) {
    var sectionId = $("#sectionId").val();
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
function paymentGrid(){
    //配置
    var paras = {
        gridId: 'jqGrid_SubjectBalance',
        colNames: ['id','账户名称','账户类别','金额','备注',"资金账户id","资金账户类型code"],
        colModel: [
            {name:'id',index:'id', width:0,align:'center',key:true,sortable:false,hidden:true},
            {name:'accountName',index:'account_name',  width: '200px',align:'left', sorttype:'integer',sortable:false,
                edittype: 'custom_bt_input',
                custom_element_bt_click: "selectAccountReferenceOpen",
                editable: true,},
            {name:'accountTypeName',index:'account_id',  width: '200px',align:'left', sorttype:'string'
                ,sortable:false,
            },
            {name:'payreceiptAmout',index:'payreceiptAmout',   width: '100px',align:'right', sorttype:'Long'
                ,formatter:"number",editable:true,editoptions:{readonly:false,
                onkeyup:"checkInput.checkNum(this,12);",
                dataEvents: [{
                    type: "blur",
                    fn: function(){
                        $("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
                    }
                },{
                    type: "focus",
                    fn: function(){
                        this.select()
                    }
                }
                ]
            },sortable:false},
            {name:'remark',index:'remark',  width: '200px',align:'left', sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur()",onkeyup:"checkInput.clearNoText(this,100)"},sortable:false},
            {name:'accountId',index:'accountId', width:15,align:'center',hidden:true,sortable:false},
            {name:'accountType',index:'accountType', width:15,align:'center',hidden:true,sortable:false}
        ],
        shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        onCellSelect: function (rowid, iCol, cellcontent, e) {
        },
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            footerData();
        },
        getGridDataList: function (rows) {
        }
    };
    jqGrid_SubjectBalance = new MyEiditGrid(paras, callBackList);
    jqGrid_SubjectBalance.addKongRow();
    $('#dataGridAccountName').comModalsAccount({
        clickback:function(goodsList){
            var $grid = jqGrid_SubjectBalance.$grid;
            var ids = $grid.getDataIDs();
            var hasRepetGood=false //是否有重复商品，默认是没有
            var gridSelDataRow=$grid.jqGrid("getRowData",jqGrid_SubjectBalance.lastrow);  //主表选中的行 数据
            var hasCurRow=false;//是否有当前行选中的重复商品，默认是没有
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
                $("#jqGrid_SubjectBalance").jqGrid('saveCell',lastrow,lastcell);
                var  selRowId=$("#jqGrid_SubjectBalance").jqGrid('getGridParam','selrow');
                var cIndex;
                for(var i=0;i<goodsList.length;i++){
                    var goods = goodsList[i];
                    var dataRow = {
                        accountId: goods.dataId,
                        accountName: goods.name,
                        accountType: goods.accountTypeCode,
                        accountTypeName: goods.accountTypeName,
                    };
                    if(i==0&&hasCurRow==false){
                        $grid.jqGrid('setRowData', selRowId, dataRow, {});
                        cIndex=selRowId;
                    }else{
                        cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                        $grid.jqGrid('addRowData', cIndex, dataRow);
                    }
                }
                $grid.delRowData('jqGrid_SubjectBalance_addRowId');
                jqGrid_SubjectBalance.addKongRow();
                $grid.delRowData(MyEiditGrid.getMaxRowid($grid));
                footerData();
            }
            $("#dataGridAccountName").removeData();
        }
    })
}