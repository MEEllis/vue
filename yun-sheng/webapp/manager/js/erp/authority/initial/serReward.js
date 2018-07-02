var companyName = '';
var goodsClassKong = {
    code:"" ,
    id:"" ,
    name:"" ,
    pId:"" ,
    remark:""
}
$(function(){
	initialObj = new InitialObj(basePath);	
	loadmodal();
//	findContactUnit();
	initFindOterator();
    loadDataTreeDom();
	//业务编码、业务名称获取焦点时，擦掉'必填!'
	$("#bizCode,#bizName").focus(function(e){
		$(this).next().html('');
	});
	
	//运营商名称选择时，擦掉'必填!'businessClassId
	$('#contactsunitId,#operatorCode').change(function(){
		$(this).next().html('');
	});


});

/***init 往来单位***/
var callBack;
//打开往来单位引用对话框
function selectContactUnitReferenceOpen(str) {
	$('#contactUnitReferenceModal').modal('show');
	callBack = function() {
		if (arguments[0].length == 0) {
			$.zxsaas_plus.showalert("", "未选中任何行!");
			$('#contactUnitReferenceModal').modal('hide');
			return;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$('#contactName').val(contactUnit.name);
		$('#contactsunitId').val(contactUnit.id);
		
		$('#contactUnitReferenceModal').modal('hide');
	};
}
/***init 所属类别***/
$("#businessClassName").combobox({
    id:'businessClassId',
    url: '/manager/inventory/operator/getOperatorClassTreeNodeVoList',
    param:{

    },
    placeholder:'所属类别',
    checkType:'radio',
    search:true,
    callback:function(){

    }
})
//function findContactUnit(){
//	var htmlConTactUnit = '';
//	initialObj.findContactUnit(function(data){
//		var list = data.data.rows;
//		$(list).each(function(index,element){
//			htmlConTactUnit += '<option value="'+element.id+'">'+element.conTactUnitName+'</option>';
//		});
//	});
//	$('#contactsunitId').append(htmlConTactUnit);
//}

$('#addGoodsClassParentIdTree').combobox({
    id:'GoodsClassParentIdTree',
    url: '/manager/inventory/operator/getOperatorClassTreeNodeVoList',
    param:{

    },
    placeholder:'所属类别',
    checkType:'radio',
    search:true,
})
/***init 运营商***/
function initFindOterator(){
	var selectHtml = '';
	initialObj.initFindOterator(function(data){
		var list = data.data.rows;
		$(list).each(function(index,yu){
			selectHtml += '<option value="'+yu.operatorCode+'">'+yu.operatorName+'</option>'
		});
	});
	$('#operatorCode').append(selectHtml);
}


		
/***************************清空表单初始化***********************************/
function initClearForm(){
	$('#companyName').val('自动生成');
	$('#operatorCode').val(null);
	$('#bizCode').val('');
	$('#bizName').val('');
	$('#remark').val('');
	$('#status').prop("checked",false);
	$('#serRewardId').val(null);
	$('#groupId').val(null);
	$('#companyId').val(null);
	$('#createUid').val(null);
	$('#createTimeStr').val(null);
}

/************************新增、修改弹窗********************************/
function modalsaveOrUpdate(num){
	$('#contactsunitId').next().html('');
	$('#bizCode').next().html('');
	$('#bizName').next().html('');
	$('#saveOrUpdateForm .ztree').html('')
    $('#saveOrUpdateForm input').removeData("id");

	//num  1.新增     2.修改
	if(num == 1){
		//清空表单
		$('#saveOrUpdateForm').clearForm(true);
		$('#companyName').val(companyName);

		$('#saveOrUpdateModal').modal('show');
		$('#myModalLabel').html('业务档案新增');

        if(curr_class_node!=null) {
            $('#businessClassName').data('id',accounTypeCode)
            $('#businessClassName').val(curr_class_node.name)
        }
		$('.butHide').show();
	}else if(num == 2){
		//修改
		$('#myModalLabel').html('业务档案修改');
		$('.butHide').hide();
		//判断选中
		var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行id
		var len = ids.length;
		if(len == 0){
			$.zxsaas_plus.showalert("错误","请勾选一行数据!");
			return false;
		}else if(len > 1){
			$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
			return false;
		}else if(len == 1){
			var gridData = $("#jqGrid_blocMessage").jqGrid("getRowData",ids);//获取被选中的一行数据
			//赋值表头
			var params = $('#saveOrUpdateForm').formToArray();
			$(params).each(function(index,element){
				var key = element.name; 
				var value = eval("gridData."+key);
				$('#'+key).val(value);
			});
			if($('#contactsunitId').val() == '' || $('#contactsunitId').val() == null){
				$('#contactsunitId').val(gridData.contactsunitId);
			}
            if($('#businessClassId').val() == '' || $('#businessClassId').val() == null){
                $('#businessClassName').val(gridData.className);
            }
			if($('#operatorCode').val() == '' || $('#operatorCode').val() == null){
				$('#operatorCode').val(gridData.operatorCode);
			}

            $('#businessClassName').data('id',gridData.businessClassId)


			if(gridData.status == '√'){
				$('#status').prop('checked',true);
			    $('#status').val('1');
			}else{
				$('#status').prop('checked',false);
			    $('#status').val('0');
			}
			if(gridData.contactsunitName){
				$("#contactName").val(gridData.contactsunitName);
			}
			$('#saveOrUpdateModal').modal('show');
		}
	}
}
/*****************************保存并新增**********************************/
function saveAndAddSerReward(){
    saveSerReward()
}
/*****************************保存并关闭**********************************/
function saveAndCloseSerReward(){
    saveSerReward(1)
}

function saveSerReward(key) {
    var	na = $('#bizName').val(),
        cla = $('#contactsunitId').val(),
        bus = $('#businessClassName').data("id"),
        code = $('#bizCode').val(),
        operatorCode = $('#operatorCode').val();
    if(operatorCode == null || operatorCode == ''){
        $('#operatorCode').next().html('必填!');
        return;
    }
    if(cla == null || cla == ''){
        $('#contactsunitId').next().html('必填!');
        return;
    }
    if(bus == null || bus == ''){
        $('#businessClassName').next().html('必填!');
        return;
    }
    if(code == ''){
        $('#bizCode').next().html('必填!');
        return;
    }
    if(na == ''){
        $('#bizName').next().html('必填!');
        return;
    }

    //调用存储方法
    var param = $('#saveOrUpdateForm').toJsonObject();
    param.businessClassId=bus
    if($('#status').prop("checked") == true){param.status = 1}else{param.status = 0}
    var ac_jc = param.id == '' ? 'auth_add' : 'auth_update';
    initialObj.saveAndCloseSerReward(param,ac_jc,function(data){
        if($.ac_jc(data)) return false;  //判断权限

        var str = data.data.str;
        if(str == undefined){
            $.zxsaas_plus.showalert("提示","异常操作!");
        }else{
            if(str == 'noPass'){
                $.zxsaas_plus.showalert("提示信息","业务编码不能重复!");
                return false;
            }
            $.zxsaas_plus.showalert("提示信息",str);
            querySerReward();

            if(key==1){
                $('#saveOrUpdateModal').modal('hide');
            }else {
                //清空表单
                $('#saveOrUpdateForm').clearForm(true);
                $('#companyName').val(companyName);
			}
        }



    });
}



/*******************************条件查询***********************************/
function querySerReward(){
	var param = new Object();
	param.queryText = $.trim($("#queryText").val());
	if($("#selStatus").prop("checked") == true){param.selStatus = 1}else{param.selStatus = 0}
	$("#jqGrid_blocMessage").jqGrid('setGridParam',{ 
        url:basePath + '/jxc/authority/iserReward/findIserReward',
        postData:param, //发送数据
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}

/*******************************启用、禁用、删除**********************************/
function disOrEnSerReward(num){
	//批量启用0、禁用1、删除2
	//修改对应标志
	var status;
	if(num == 0){ status = 0; }else if(num == 1){ status = 1; }else if(num == 2){ status = 2;}
	var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//选中的行ids
	var len = ids.length;
	//至少选中一行
	if(len == 0){
		if(num == 0){
			$.zxsaas_plus.showalert("错误","请勾选公司后再启用!");
		}else if(num == 1){
			$.zxsaas_plus.showalert("错误","请勾选公司后再禁用!");
		}else if(num == 2){
			$.zxsaas_plus.showalert("错误","请勾选仓库后再删除!");
		}
		return false;
	}else{
		//弹窗提醒
		if(num == 0){
			$.zxsaas_plus.showconfirm("","是否确定启用选中数据?",function(){
				initialObj.disOrEnSerReward(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				querySerReward();
			},function(){
				
			});
		}else if(num == 1){
			$.zxsaas_plus.showconfirm("","是否确定禁用选中数据?",function(){
				initialObj.disOrEnSerReward(ids,status,'auth_update', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				querySerReward();
			},function(){
				
			});
		}else if(num == 2){
			$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
				initialObj.disOrEnSerReward(ids,status,'auth_delete', function(data){
					if($.ac_jc(data)) return false;  //判断权限
					
					var str = data.data.str;
					$.zxsaas_plus.showalert("",str);
				});
				querySerReward();
			},function(){
				
			});
		}
	}
}

//加载 左边树
var accounTypeCode='';
var curr_class_node =null;
var curr_class_code=''
function loadDataTreeDom(){
    var obj={

        success:function(data){
            var nodes = data.data.dataList||[];
            for(var i=0;i<nodes.length;i++){
                nodes[i].pId=nodes[i].parentId
            }
            var treeObj = $.fn.zTree.init($("#TreeDom"),
                {data: {simpleData: {enable: true}},
                    view: {
                        showLine: true
                    },
                    callback:{
                        onClick: function(event, treeId, treeNode){
                            accounTypeCode=$.trim(treeNode.id);
                            curr_class_node = treeNode;
                            curr_class_code=treeNode.code;
                            AquerySerReward({

                                businessClassId:accounTypeCode
							});
                        }
                    }
                },nodes);
            treeObj.expandAll(true);
        }
    }
    InterfaceInventory.serReward.getOperatorClassTreeNodeVoList(obj);
}
function AquerySerReward(obj){


    $("#jqGrid_blocMessage").jqGrid('setGridParam',{
        url:basePath + '/jxc/authority/iserReward/findIserReward',
        postData:obj, //发送数据
        page:1
    }).trigger("reloadGrid"); //重新载入
}
function loadmodal(){
	var options = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: basePath + '/jxc/authority/iserReward/findIserReward',
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager"
	};
	
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		var mydata;
		var hid=false;
		var lock=false;
		var myobj=[];
		var colNames = ['公司名称','业务编码','业务名称','运营商名称','所属类别','往来单位','预估佣金','是否禁用','备注','新增人','新增时间','修改人','修改时间','id','集团id','公司id','运营商编码','新增人id','往来单位id','所属类别id'];
		var JqGridColModel=[
							{name:'companyName',index:'companyName',align:'center',sortable:false},
							{name:'bizCode',index:'bizCode',align:'center',sortable:false},
							{name:'bizName',index:'bizName',align:'center',sortable:false},
							{name:'operatorName',index:'operatorName',align:'center',sortable:false},
                            {name:'className',index:'className',align:'center',sortable:false},
							{name:'contactsunitName',index:'contactsunitName',align:'center',sortable:false},
            				{name:'commission',index:'commission',align:'right',formatter:'number' ,sortable:false},
							{name:'status',index:'status',align:'center',formatter:formatStatus ,sortable:false},
							{name:'remark',index:'remark',align:'center',sortable:false},
							{name:'createName',index:'createName',align:'center',sortable:false},
							{name:'createTimeString',index:'createTimeString',align:'center',sortable:false},
							{name:'updateName',index:'updateName',align:'center',sortable:false},
							{name:'updateTimeString',index:'updateTimeString',align:'center',sortable:false},
							{name:'id',index:'id',align:'center', hidden:true ,sortable:false},
							{name:'groupId',index:'groupId',align:'center', hidden:true ,sortable:false},
							{name:'companyId',index:'companyId',align:'center', hidden:true ,sortable:false},
							{name:'operatorCode',index:'operatorCode',align:'center', hidden:true ,sortable:false},
							{name:'createUid',index:'createUid',align:'center', hidden:true ,sortable:false},
							{name:'contactsunitId' , index: 'contactsunitId' ,hidden:true,sortable:false},
			                {name:'businessClassId' , index: 'businessClassId' ,hidden:true,sortable:false}
		                ];
		
		loadtable();
	//加载表格
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"POST",
					datatype: "json",
					jsonReader  : {	
						root:"data.rows",
						page: "data.page",
				        total: "data.total",
				        records: "data.records",
						repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            sortable:false,			            
		            rowNum: 20,
		            rowList: [2,20, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		           
		            multiselect:true,
		            width: "100%" ,
		            height: $(window).height()*0.65,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
		   				
					},
					onCellSelect:function(id,index,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
						//后续可以通过点击的列名称来弹框等
					},
					onSelectRow:function(id){
						if(id!=lastsel&&lastsel!=''){
							$(options.TableName).jqGrid('saveRow',lastsel,{
								aftersavefunc:function(rowid,response ){
								}
								});
						}
						lastsel=id;
					var rec = $(options.TableName).jqGrid('getRowData', id);
					
					},
					
					beforeSelectRow:function(rowid,e){
	
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后
	
					},
					gridComplete: function() {
						var ids=$(options.TableName).jqGrid("getDataIDs");
	
					},
					loadComplete:function(data){
						if($.ac_jc(data)) return false;  //判断权限
						
						companyName = data.data.companyName;
					},
					loadError:function(xhr,status,error){
					}
					})
	
		}
		
		//格式禁用、启用
		function formatStatus(cellvalue, options, rowObjec){
			return cellvalue == 1?"√":"";
		}
		
		$(window).bind('click', function saveEdit(e) {
			var rowId = $(e.target).parent("tr").attr("id");
			if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
				if ($(e.target).closest(options.TableName).length == 0) { 
					$(options.TableName).jqGrid('saveRow', lastsel);						
					lastsel='';
				}
			}
		})
		
		//显示隐藏禁用
		//  0 : 禁用       
		//  1 : 不禁用
		$(document).on('click','.double',function(e){
			var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
			var len = selectedRowIds.length;  
			if($('input.double').prop('checked')){
				for(var i = 1;i <= len ;i ++) {  
					var gridData = $(options.TableName).jqGrid("getRowData",i);
					if(gridData.depDouble == '0'){
						$(options.TableName).setRowData(i,null,{display: 'table-row'});//显示禁用
					}
				}  
			}else{
				for(var i = 1;i <= len ;i ++) {  
					var gridData = $(options.TableName).jqGrid("getRowData",i);
					if(gridData.depDouble == '0'){
						$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
					}
				}  
			}
		});
		
		
		
		//列表    重置密码
		function rePwd(cellvalue, options, rowObjec)
		{
			return '<span class="rePwd" data-blocId="' + rowObjec.blocId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
		}
		
		//列表复选框
		function checkBox(cellvalue, options, rowObjec)
		{
			return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
		}
		
	//查询
	$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
		if(flag==true){
		$.jgrid.GridDestroy(options.TableName);
		loadtable();
		}else{
			flag=true;
		}
		
	});
	
	
	$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
		$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
		
	});
	$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
		$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
		
	});
}

//所属类别添加按钮点击
function addGoodsClassBtnClick(){
    $("#classSaveAndAdd").show();

    //清空表单
    $(".codeCla").next().html('');
    $(".nameCla").next().html('');
    $("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
    $('#addAndEiditGoodsClassModalDialog').modal('show');
    $('#addAndEiditGoodsClassModalDialog').find('.modal-title').html('新增所属类别窗口');

    if(curr_class_node!=null) {
        $('#addGoodsClassParentIdTree').data('id',accounTypeCode)
        $('#addGoodsClassParentIdTree').val(curr_class_node.name)
    }
}

//所属类别修改按钮点击
function eiditGoodsClassBtnClick(){

    //判断是否选择某个要编辑的所属类别
    $(".codeCla").next().html('');
    $(".nameCla").next().html('');
    if(accounTypeCode == -1||accounTypeCode == -2||accounTypeCode == -3||accounTypeCode == -4){
        $.zxsaas_plus.showalert('提示消息',"此类别不能修改")
    }
    else  if(accounTypeCode !=''){
        $("#classSaveAndAdd").hide();
        $('#addAndEiditGoodsClassModalDialog').modal('show');
        $('#addAndEiditGoodsClassModalDialog').find('.modal-title').html('修改所属类别窗口');

        $("#addAndEiditGoodsClassModalDialog").writeJson2Dom(curr_class_node);
        var treeObj = $.fn.zTree.getZTreeObj("TreeDom");
        $('#addGoodsClassParentIdTree').val( treeObj.getNodeByParam("id", curr_class_node.pId, null).name).data('id',curr_class_node.pId)
    }else{
        $.zxsaas_plus.showalert("操作提示","未选中类别或类别不允许操作");

    }
}

//删除所属类别
function delGoodsClass(){
    if(accounTypeCode == -1||accounTypeCode == -2||accounTypeCode == -3||accounTypeCode == -4){
        $.zxsaas_plus.showalert('提示消息',"此类别不能删除")
	}
   else if(accounTypeCode != ""){
        $.zxsaas_plus.showconfirm('提示消息',"请确认是否删除",function(){
            //删除
            $.request({
                type:'post',
                url:'/manager/inventory/operator/deleteOperatorClassVo',
                data:{dataId:accounTypeCode},
                dataType:'json',
                success:function(data){
                    if(data.result == 1){
                        $.zxsaas_plus.showalert('提示消息','删除成功');
                        loadDataTreeDom();
                    }else{
                        $.zxsaas_plus.showalert('提示消息',data.desc);
                    }
                }
            });

        },function(){});
    }else{
        $.zxsaas_plus.showalert('提示消息',"未选中类别或类别不允许操作");
    }
}
//保存所属类别
function addOrEiditGoodsClassSave(op){
    //新增验证非空
    var area = $('.codeCla').val().trim(),
        na = $('.nameCla').val().trim();
    if(area == ''){
        $(".codeCla").next().html('必填!');
        return;
    }
    if(na == ''){
        $('.nameCla').next().html('必填!');
        return;
    }
    var model = getAddAndEiditGoodsClassFormData();
    //保存后新增
    if(op== 1){
        //添加
        $.request({
            type:'post',
            url:'/manager/inventory/operator/saveOperatorClassVo/auth_add',
            data:model,
            dataType:'json',
            success:function(data){
                if(data.result == 1){
                    $.zxsaas_plus.showalert('提示消息','保存成功');
                    clearGoodsClassModalForm()

					$(".codeCla").next().html('');
					$(".nameCla").next().html('');
					$("#addGoodsClassParentIdTree").val('');

					$("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
					$('#addAndEiditGoodsClassModalDialog').find('.modal-title').html('新增所属类别窗口');


                }else{
                    $.zxsaas_plus.showalert('提示消息',data.desc);
                }
            }
        });

    }
    //保存后关闭
    else{
        $.request({
            type:'post',
            url:'/manager/inventory/operator/saveOperatorClassVo/auth_update',
            data:model,
            dataType:'json',
            success:function(data){
                if(data.result == 1){
                    $('#addAndEiditGoodsClassModalDialog').modal('hide');
                    $.zxsaas_plus.showalert('提示消息','保存成功');
                    clearGoodsClassModalForm()
                }else{
                    $.zxsaas_plus.showalert('提示消息',data.desc);
                }
            }
        });

    }

}

//清空 所属类别窗口 的表单
function clearGoodsClassModalForm() {
    //清空表单
    $("#addAndEiditGoodsClassModalDialog").writeJson2Dom(goodsClassKong);
    loadDataTreeDom();
    $('#addAndEiditGoodsClassModalDialog .ztree').html('')
    $('#addAndEiditGoodsClassModalDialog input').removeData("id");

}

function getAddAndEiditGoodsClassFormData(){

    var obj = $("#addAndEiditGoodsClassModalDialog").toJsonObject();
    obj.parentId=$('#addGoodsClassParentIdTree').data('id')
    obj.dataId=obj.id
    delete obj.id;
    return obj;
}
