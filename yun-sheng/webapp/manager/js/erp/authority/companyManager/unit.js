
(function(){
	init();
	initModel();
	loadmodalSendManage();
	$(".nameCheck,.codeCheck,.nameCheckUp,.codeCheckUp,.addr,.addrU,.telph,.telphU,.uaddr,.utelph,.uCodeCheck,.uNameCheck,.uCodeCheckUp,.uNameCheckUp").focus(function(e){
		$(this).next().html('');
	});
	
	  //导出
    $("#export").click(function(){
    	 window.location.href= "/manager/authority/contactInfo/export?keyWord"+$.trim($("#keyword").val());
    });
	
})();
//点击地区
$(".area").click(function(){
	loadmodalAreaManage();
});

/**
 * 新增和修改的时候初始化窗口预选数据
 * @return
 */
function initModel(){
	 $.request({
         type: 'Get',
         url: '/manager/authority/contactInfo/initContact',
         dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
         success: function (data) {
			  //公司名称
	         companyName=data.data.companyName;
	         $(".companyName").val(companyName);
		 	 //所属区域
             $(".districtId").html("<option value=''>----请选择----</option>");
			 if (data.data.rlist) {
			 	for (var i = 0; i < data.data.rlist.length; i++) {
			 		$(".districtId").append("<option value='" + data.data.rlist[i].id + "'>" + data.data.rlist[i].name + "</option>");
			 	}
			 }
             //单位类型
             $(".typeId").html("<option value='-1'>----请选择----</option>");
			 if (data.data.endList) {
			 	for (var i = 0; i < data.data.endList.length; i++) {
			 		$(".typeId").append("<option value='" + data.data.endList[i].id + "'>" + data.data.endList[i].name + "</option>");
			 	}
			 }
             //业务员
             $(".salesmanId").html("");
			 if (data.data.elist) {
			 	for (var i = 0; i < data.data.elist.length; i++) {
			 		$(".salesmanId").append("<option value='" + data.data.elist[i].id + "'>" + data.data.elist[i].name + "</option>");
			 	}
			 }
             //开户行
             $(".brankNameCode").html("");
			 if (data.data.plist) {
			 	for (var i = 0; i < data.data.plist.length; i++) {
			 		$(".brankNameCode").append("<option value='" + data.data.plist[i].code + "'>" + data.data.plist[i].content1 + "</option>");
			 	}
			 }
             //类型的所属上级
			$(".parentLayeerCode").html("");
			$(".parentLayeerCode").append("<option value='-1'><默认无上级></option>");
			 if (data.data.uclist){
			 	for (var i = 0; i < data.data.uclist.length; i++) {
			 		$(".parentLayeerCode").append("<option value='" + data.data.uclist[i].id + "'>" + data.data.uclist[i].name + "</option>");
			 	}
			 }
             
             //是否合并往来单位
             $(".hbwldw").html("");
			 if (data.data.hbwldw) {
			 	for (var i = 0; i < data.data.hbwldw.length; i++) {
			 		$(".hbwldw").append("<option value='" + data.data.hbwldw[i].id + "'>" + data.data.hbwldw[i].name + "</option>");
			 	}
			 }
         },
         error: function (msg) {
         }
     });
}


$(document).on('click','.add',function(e){
	$('#myModal').modal('show');
	$('.nameCheck').next().html('');
	$('.codeCheck').next().html('');
	$(".edAdd").next().html('');
	$(".zqAdd").next().html('');
	$(".addCheckCon").prop("checked") && $(".addCheckCon").prop("checked",false);
	$("#myModal .demo").hasClass("hidden") || $("#myModal .demo").addClass("hidden");
	$('.data').map(function(){
		$(arguments[1]).val('');
	});
	$(".zqAdd").val(0)
	$('#addpurchaseOrderRequired,#addsalesOrderRequired').prop('checked',false)
	
});

$(document).on('click','.addChe',function(e){
	$('#modalAddrManageAdd').modal('show');
	$('.addr').val('');
	$('.telph').val('');
	$('.addr').next().html(''),
	$('.telph').next().html('');
});
$(document).on('click','.upChe',function(e){
	$('#modalAddrUpAdd').modal('show');
	$('.addrU').val('');
	$('.telphU').val('');
	$('.addrU').next().html(''),
	$('.telphU').next().html('');
});
$(document).on('click','.unitAdd',function(e){
	$('#modalEmpManageAdd').modal('show');
	$('.uCodeCheck').val('');
	$('.uNameCheck').val('');
	$('.uCodeCheck').next().html(''),
	$('.uNameCheck').next().html('');
});


//新增信息模态框弹出后
var  currentNode={};
$("#myModal").on("show.bs.modal",function(){
	if(currentNode.id){
		var dom =$(".tAdd>option:contains('"+currentNode.name+"')");
		var len =$(dom).length;
	    if(len>0){//存在于新增信息往来单位列表中（非末级往来单位类别）
	        $(".tAdd").val($(dom).val());
	    }else{
	    	$(".tAdd").val(-1);
	    }
	}else{
		$(".tAdd").val(-1);
	}
	currentNode={};
});
//初始化
var companyName="";
var groupName="";
function init(){
	var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				}
			},
			//树的点击事件
			callback: {
				onClick: function (event, treeId, treeNode, msg) {
					if(treeNode.id==-1){
						$("#jqGrid_blocMessage").jqGrid('setGridParam',{  
					        datatype:'json',
					        postData:{"typeCode":""}
					    }).trigger("reloadGrid"); //重新载入
					  }
					else{
						$("#jqGrid_blocMessage").jqGrid('setGridParam',{  
					        datatype:'json',  
					        postData:{"typeCode":treeNode.id}, //发送数据  
					    }).trigger("reloadGrid"); //重新载入
						currentNode=treeNode;
					}
				}
			},
			view: {
				showIcon: true
			}
	    }; 
	 $.request({
         type: 'Get',
         url: '/manager/authority/contactInfo/initContact',
         dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
         success: function (data) {
             //树形结构
             var obj=[];
             var bumen={};
 			 bumen.name=data.data.companyName;
 			 bumen.id=-1;
 			 obj.push(bumen);
			 if (data.data.clist) {
			 	for (var i = 0; i < data.data.clist.length; i++) {
			 		var bumen = {};
			 		bumen.id = data.data.clist[i].layerrCode;
			 		bumen.name = data.data.clist[i].name;
			 		bumen.pId = data.data.clist[i].parentLayeerCode;
			 		obj.push(bumen);
			 	}
			 }
             $.fn.zTree.init($("#publicModelTree"), setting, obj);
             var zTree = $.fn.zTree.getZTreeObj("publicModelTree");
             zTree.expandAll(true);//展开全部节点
         },
         error: function (msg) {
             alert(" 数据加载失败！" + msg);
         }
     });
}

//查看详细信息
function xiangxi(obj){
	$.request({
        url: '/manager/authority/contactInfo/selectOne',
        type: "POST",
	    data:{"id":obj},
	    traditional: true,
        success: function (data) {
			var obj=data.data.obj;
			if(data.data){
				if(data.data.obj){
					$(".xlinkman").html(obj.linkman);
					$(".xdevelopDay").html(obj.developDay);
					$(".xcontact").html(obj.contact);
					$(".xcompanyAddr").html(obj.companyAddr);
					$(".xbrankNameCode").html(obj.brankName);
					$(".xcustomer").html(obj.customer);
					$(".xbrankAmount").html(obj.brankAmount);
					$(".xlimit").html(obj.limit);
					$(".xpaymentDays").html(obj.paymentDays);
					$(".xsalesmanName").html(obj.salesmanName);
					$(".xremark").html(obj.remark);
				}
			}else{
				$.zxsaas_plus.showalert("提示",data.desc);
			}
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}


function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/contactInfo/selectContactUnitList",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
		};
		$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
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
			var colNames = ['ID','往来单位名称','往来单位编码','助记码','往来单位类别','所属区域','是否禁用','新增人','新增时间','修改人','修改时间','查看详细'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:true},
								{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'code',index:'code', width:150,align:'center', sorttype:'string',sortable:true},
								{name:'remCode',index:'REM_CODE', width:100,align:'center', sorttype:'string',sortable:true},
								{name:'typeName',index:'TYPE_NAME', width:100,align:'center', sorttype:'string',sortable:true},
								{name:'districtName',index:'DISTRICT_NAME', width:100,align:'center', sorttype:'string',sortable:true},
								{name:'status',index:'status', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"},sortable:true},
								{name:'empCreateName',index:'ADD_NAME', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'addTimeStr',index:'CREATE_TIME', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'empUpdateName',index:'UPDATE_NAME', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'updateTimeStr',index:'UPDATE_TIME', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'depDouble',index:'depDouble', width:100,align:'center', sorttype:'string',formatter:detail,sortable:false}
			                ];
			loadtable();
		//加载表格
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
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",	            
			            rowNum: 20,
			            rowList: [20, 25, 40],
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
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");
						},
						loadComplete:function(data){
						},
						loadError:function(xhr,status,error){
						}
						})
		
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
			
			//查看详细 列表
			function detail(cellvalue, options, rowObjec)
			{
				return '<a onclick="xiangxi('+options.rowId+')" class="detail" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalDetail" style="color:#00CCFF;cursor:pointer">详细信息</a>';
			}
			
			
//批量删除
$(document).on('click', '.btnDeleteRow',function(e){
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选往来单位后再删除!");
					return false;
				}else{
					$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
						$.request({
						    url:"/manager/authority/contactInfo/delete",
						    type: "POST",
						    data: {"checkedIdList": ids},
						    traditional: true,
						    success: function(data) {
						    	$.zxsaas_plus.showalert("提示",data.desc);
						    	if(data.result==1){
						    	 $(options.TableName).trigger("reloadGrid"); //重新载入
						    	}
						    }
						});
					},function(){
						
					});
				}
			});
			
//批量启动或禁用
$(document).on('click', '.enableOrDisable',function(e){
					var id=e.target.id;
					var checkedIdList= $("#jqGrid_blocMessage").jqGrid('getGridParam','selarrrow');//获取选中行的id
					if(checkedIdList.length==0){
						if(id==1){
							$.zxsaas_plus.showalert("提示","请勾选往来单位后再禁用!");
						}else{
							$.zxsaas_plus.showalert("提示","请勾选往来单位后再启用!");
						}
						return;
					}else{
						$.request({
						    url:"/manager/authority/contactInfo/startContact",
						    type: "POST",
						    data: {"checkedIdList": checkedIdList,"status":id},
						    traditional: true,
						    success: function(data) {
						    	if(data.result==1){
						    		$.zxsaas_plus.showalert("提示",data.desc);
						    	}else{
						    		$.zxsaas_plus.showalert("错误",data.desc);
						    	}
						    	 $(options.TableName).jqGrid('setGridParam',{  
								        datatype:'json',  
								        postData:{"keyword":$("#keyword").val(),
						    		 "xsjy":($('#xsjy').is(':checked')==true)?1:0}, //发送数据  
								    }).trigger("reloadGrid"); //重新载入
						    }
						});
					}
				});	
			//显示禁用框
			$("#xsjy").click(function(){
				if($('#xsjy').is(':checked')){
			        $(options.TableName).jqGrid('setGridParam',{  
				        datatype:'json',  
				        postData:{"keyword":$("#keyword").val(),"xsjy":1}, //发送数据  
				    }).trigger("reloadGrid"); //重新载入

			}else{ 
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:{"keyword":$("#keyword").val(),"xsjy":2}, //发送数据  
			    }).trigger("reloadGrid"); //重新载入
				
			}
		});
			
			
//修改信息
$('.updateBloc').click(function(){
			$('#modalUpdateDelte').modal('show');
			$('.nameCheckUp').next().html('');
			$('.codeCheckUp').next().html('');
			$(".zqUp").next().html('');
			$(".edUp").next().html('');
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					$.request({
				         url: '/manager/authority/contactInfo/selectOne',
				         type: "POST",
						 data:{"id":ids},
						 traditional: true,
				         success: function (data) {
							if(data.result==1||data.result=="1"){
								$('#modalUpdate').modal('show');
								if(data.data.obj){
								$("#modalUpdate").writeJson2Dom(data.data.obj);
                                    $('.edUp').val(Number(data.data.obj.limit).toFixed(2))
								if(data.data.obj.mergeCurrentAccount){
									if(data.data.obj.mergeCurrentAccount==1){
								    	$(".modifyCheckCon").prop("checked",true);
										$('#modalUpdate .demo').removeClass('hidden');
									    if(data.data.obj.mergeContactsUnit){
									    	$("#modalUpdate select[name='mergeContactsUnit'] option[value='"+data.data.obj.mergeContactsUnit+"']").attr("selected","selected");
									    }
									}
								}else{
									$(".modifyCheckCon").prop("checked",false);
								    $('#modalUpdate .demo').addClass('hidden');
								}
								$("#jqGrid_sendManage").jqGrid('setGridParam',{  
							            url:"/manager/authority/contactInfo/selectAddrList/"+ids
							      }).trigger("reloadGrid"); //重新载入
								//loadmodalSendManage(ids);
								}
							}else{
								$.zxsaas_plus.showalert("提示",data.desc);
							}
				         },
				         error: function (msg) {
				             alert(" 数据加载失败！" + msg);
				         }
				     });
				}
			});
			
			
//员工属性管理
$('.empManage').click(function(){loadmodalEmpManage();});
			
//查询
$(document).on("click",".btn-success",function(event){			
			 jQuery("#jqGrid_blocMessage").jqGrid('setGridParam', {  
				    datatype:'json',  
			        postData:{"keyWord":$.trim($("#keyword").val())}, //发送数据  
			    }).trigger("reloadGrid");  
		});
		
//$(document).on('click','.addCheckCon',function(){alert($(this).val())});
//保存新增
$(document).on('click','.saveContact',function(){
			var na = $('.nameCheck').val().trim(),
				a = $('.areaAdd').val(),
				t = $('.tAdd').val(),
				e = $('.edAdd').val(),
				zq =Number($.trim($('.zqAdd').val())) ;
			if(na == ''){
				$('.nameCheck').next().html('必填!');
				return;
			}
			if(zq<0){
				$('.zqAdd').next().html('大于等于0的整数!');
				return;
			}
			var obj=$("#myModal").toJsonObject();
			var obj1=$("#myModal").toJsonObject2();
			//是否启用
			if(obj.status==null){
				obj.status=0
			}
			if(obj.limit==""){
				obj.limit=0
			}
			if(obj1.mergeCurrentAccount&&obj1.mergeCurrentAccount!="false"){
				 obj.mergeCurrentAccount=1;
				 obj.mergeContactsUnit=$("#myModal select[name='mergeContactsUnit']").find("option:selected").val();//value?
				
			}else{
				obj.mergeCurrentAccount=0;
				delete obj.mergeContactsUnit;
			}
			//必须引入采购订单
			if(obj.purchaseOrderRequired===undefined){
                obj.purchaseOrderRequired=0
			}else{
                obj.purchaseOrderRequired=1
			}
			//必须引入销售订单
			if(obj.salesOrderRequired===undefined){
				obj.salesOrderRequired=0
			}else{
				obj.salesOrderRequired=1
			}

			//地址
			var ids = jQuery("#jqGrid_empManage").jqGrid('getDataIDs'); 
			var addrlist=[];
			for(var i=0;i<ids.length;i++){
				var updateObj={};
				var rowData = $("#jqGrid_empManage").jqGrid("getRowData",ids[i]);
				updateObj.contactPerson = rowData.contactPerson;
				updateObj.deliveryAddr =  rowData.deliveryAddr;
				updateObj.contactNum = rowData.contactNum;
				updateObj.remark = rowData.remark;
				addrlist.push(updateObj);
			}
			
			obj.addrList=addrlist;
			
			if(e == ''){
				obj.limit = 0;
			}
			if(zq == ''){
				obj.paymentDays = 0;
			}
			var test=JSON.stringify(obj);
			if(obj.typeId!=-1){
				$.request({
				    url:"/manager/authority/contactInfo/saveContact/auth_add",
				    type: "POST",
				    datatype : "json",
				    contentType: "application/json",
				    data: test,
				    traditional: true,
				    success: function(data) {
				    	if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    		$(".data").val("");
					    	$("#jqGrid_blocMessage").trigger("reloadGrid");
					    	$('#jqGrid_empManage').jqGrid('clearGridData');
				    		$('#myModal').modal('hide');
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    }
				});
			}else{
				$.zxsaas_plus.showalert("提示","往来单位类别必填！");
				
			}
		});
		
//修改保存
$(".updateContact").click(function(){
			var na = $('.nameCheckUp').val().trim(),
				eu = $('.edUp').val(),
				zq = Number($('.zqUp').val().trim());
			if(na == ''){
				$('.nameCheckUp').next().html('必填!');
				return;
			}
			if(zq<0){
				$('.zqUp').next().html('大于等于0的整数!');
				return;
			}
			var obj=$("#modalUpdate").toJsonObject();
			var obj1=$("#modalUpdate").toJsonObject2();
			//是否启用
			if(obj.status==null){
				obj.status=0
			}
			if(obj.limit==""){
				obj.limit=0
			}

			if(eu == ''){
				obj.limit = 0;
			}

			//必须引入采购订单
			if(obj.purchaseOrderRequired===undefined){
				obj.purchaseOrderRequired=0
			}else{
				obj.purchaseOrderRequired=1
			}
			//必须引入销售订单
			if(obj.salesOrderRequired===undefined){
				obj.salesOrderRequired=0
			}else{
				obj.salesOrderRequired=1
			}
			//地址
			var ids = jQuery("#jqGrid_sendManage").jqGrid('getDataIDs'); 
			var addrlist=[];
			for(var i=0;i<ids.length;i++){
				var updateObj={};
				var rowData = $("#jqGrid_sendManage").jqGrid("getRowData",ids[i]);
				updateObj.contactPerson = rowData.contactPerson;
				updateObj.deliveryAddr =  rowData.deliveryAddr;
				updateObj.contactNum = rowData.contactNum;
				updateObj.remark = rowData.remark;
				addrlist.push(updateObj);
			}
			
			obj.addrList=addrlist;
			if(obj1.mergeCurrentAccount&&obj1.mergeCurrentAccount!="false"){
				 obj.mergeCurrentAccount=1;
				 obj.mergeContactsUnit=$("#modalUpdate select[name='mergeContactsUnit']").find("option:selected").val();//value?
				
			}else{
				obj.mergeCurrentAccount=0;
				delete obj.mergeContactsUnit;
			   
			}
			var test=JSON.stringify(obj);
			if(obj.typeId!=-1){
				$.request({
				    url:"/manager/authority/contactInfo/saveContact/auth_update",
				    type: "POST",
				    datatype : "json",
				    contentType: "application/json",
				    data: test,
				    traditional: true,
				    success: function(data) {
				    	if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    		$(".data").val("");
					    	$("#jqGrid_blocMessage").trigger("reloadGrid");
				    		$('#modalUpdate').modal('hide');
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    }
				});
			}else{
				$.zxsaas_plus.showalert("提示","往来单位类别必填！");
				
			}
			
		});
}


/*******************************************新增类别弹出窗**********************************************
**********************************************************************************************************
***********************************************************************************************************/
$(".typeSaveBtn").click(function(){
	var obj=$("#typeMoal").toJsonObject();
	if(obj.name==''){
		$.zxsaas_plus.showalert("提示","名称不能为空");
		return;
	}
	if(obj.code==''){
		$.zxsaas_plus.showalert("提示","编码不能为空");
		return;
	}
	$.request({
	    url:"/manager/authority/contactInfo/saveContactType/auth_add",
	    type: "POST",
	    datatype : "json",
	    contentType: "application/json",
	    data: JSON.stringify(obj),
	    traditional: true,
	    success: function(data) {
	    	if(data.result==1){
	    		$.zxsaas_plus.showalert("提示",data.desc);
	    	}else{
	    		$.zxsaas_plus.showalert("错误",data.desc);
	    	}
	    	$(".sectionData").val("");
	    	$("#jqGrid_metaData").trigger("reloadGrid");
	    }
	});
});


/*******************************************新增送货地址弹出窗**********************************************
**********************************************************************************************************
***********************************************************************************************************/
//全局地址
var addressList=[]


function loadmodalEmpManage(){
		
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_empManage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_empManage"
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
			var colNames = ['id','联系人','送货地址','电话','备注','操作'];
			var JqGridColModel=[
			                    {name:'id',index:'id', width:200,align:'center', sorttype:'string',sortable:false,hidden:true},
								{name:'contactPerson',index:'contactPerson', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'deliveryAddr',index:'deliveryAddr', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'contactNum',index:'contactNum', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'do',index:'do', width:100,align:'center', sorttype:"string",formatter: addAndDelete,sortable:false},
			                ];
			
			loadtable();
		//加载表格
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.35,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
						
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");
						},
						})
			}
			
			$(document).on('click', '.addAddress',function(e){
				var add = $('.addr').val().trim(),
					con = $('.telph').val().trim();
				if(add == ''){
					$('.addr').next().html('必填!');
					return;
				}
				if(con == ''){
					$('.telph').next().html('必填!');
					return;
				}
				var ids = $(options.TableName).jqGrid('getDataIDs');
				var maxid,
				    flag;
				maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
				flag = $('.chec').prop('checked') ? 0 : 1;
				var arrData  =
				     {
				         "contactPerson" : $('.per').val(),
				         "deliveryAddr" : $('.addr').val(),
				         "contactNum" : $('.telph').val(),
				         "remark" : $('.info').val()
				     }
				var obj={};
				obj.contactPerson=$('.per').val();
				obj.deliveryAddr=$('.addr').val();
				obj.contactNum=$('.telph').val();
				obj.remark=$('.info').val();
				addressList.push(obj);
				$(options.TableName).jqGrid('addRowData', maxid+1, arrData, 'last' );
				$(options.TableName).jqGrid("setCell",maxid+1,"",maxid+1);	
				$('.clear').val('');
				$('#modalAddrManageAdd').modal('hide');
			});
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			function addAndDelete(cellvalue, options, rowObjec)
			{
				return '<span class="addUpdate" data-id="' + options.rowId + '" data-target="" style="color:#00CCFF;cursor:pointer;margin-right:20px;">修改</span><span class="addDel" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
			}
			
			//新增一行
			$(document).on('click', '.addAttr',function(e){
				var rData = {
				};
				var ids = $(options.TableName).jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
				$(options.TableName).jqGrid('addRowData', maxid+1, rData, 'last' );
				
			});
			
			//删除一行
			$(document).on('click', '.addDel',function(e){
				var rowId = $(this).data('id');
				$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
					$(options.TableName).jqGrid('delRowData',rowId);
				},function(){
					
				});

			});
			
			//修改
			$(document).on('click', '.addUpdate',function(e){
				$('#modalAddrManageUp').modal('show');
				$('.addUp').next().html('');
				$('.telUp').next().html('');
				var that = this;
				$('.addAddressUp').data('rid',$(this).data('id'));
				var rData = $(options.TableName).jqGrid('getRowData',$(this).data('id'));
				$('.salesmanIdUp').val(rData.id);
				$('.addUp').val(rData.deliveryAddr);
				$('.telUp').val(rData.contactNum);
				$('.infoUp').val(rData.remark);
				$('.perUp').val(rData.contactPerson);
			});
			
			//保存修改
			$(document).on('click','.addAddressUp',function(e){
				var add = $('.addUp').val().trim(),
					con = $('.telUp').val().trim();
				if(add == ''){
					$('.addUp').next().html('必填!');
					return;
				}
				if(con == ''){
					$('.telUp').next().html('必填!');
					return;
				}
				var sData = {
						"contactPerson" : $('.perUp').val(),
				         "deliveryAddr" : $('.addUp').val(),
				         "contactNum" : $('.telUp').val(),
				         "remark" : $('.infoUp').val()
				};
				$(options.TableName).jqGrid('setRowData',$(this).data('rid'),sData);
				$('#modalAddrManageUp').modal('hide');
			});
			
			$(document).on('click','saveUnit',function(e){
				 $(options.TableName).jqGrid("saveCell",lastrow,lastcell);
				
			});
}
/*******************************************修改送货地址弹出窗**********************************************
 **********************************************************************************************************
 **********************************************************************************************************/
function loadmodalSendManage(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/member/cardType/selectAll",
		TableName: "#jqGrid_sendManage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		pager:"#jqGridPager_sendManage"
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
			var colNames = ['ID','联系人','送货地址','电话','备注','操作'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'contactPerson',index:'contactPerson', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'deliveryAddr',index:'deliveryAddr', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'contactNum',index:'contactNum', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'storageName',index:'storageName', width:300,align:'center', sorttype:"string",formatter:rePwd,sortable:false},
			                ];
			
			loadtable();
		//加载表格
		
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
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.35,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");
						},
						loadComplete:function(data){
						}
						})
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
			
			
			//新增
			addAddressU = function(){
				var add = $('.addrU').val().trim(),
					con = $('.telphU').val().trim();
				if(add == ''){
					$('.addrU').next().html('必填!');
					return;
				}
				if(con == ''){
					$('.telphU').next().html('必填!');
					return;
				}
				var ids = $(options.TableName).jqGrid('getDataIDs');
				var maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
				var flag = $('.chec').prop('checked') ? 0 : 1;
				var arrData  =
				     {
				         "contactPerson" : $('.perU').val(),
				         "deliveryAddr" : $('.addrU').val(),
				         "contactNum" : $('.telphU').val(),
				         "remark" : $('.infoU').val()
				     }
				$(options.TableName).jqGrid('addRowData', maxid+1, arrData, 'last' );
				$('.clear').val('');
				$('#modalAddrUpAdd').modal('hide');
			};
			
			//删除一行
			$(document).on('click', '.deleteAddress',function(e){
				var rowId = $(this).data('id');
				$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
					$(options.TableName).jqGrid('delRowData',rowId);
				},function(){
					
				});

			});
			
			//修改
			$(document).on('click', '.updateAddress',function(e){
				$('#modalAddrUpUp').modal('show');
				$('.uaddr').next().html('');
				$('.utelph').next().html('');
				var that = this;
				$('.saveAddUp').data('rid',$(this).data('id'));
				var rData = $(options.TableName).jqGrid('getRowData',$(this).data('id'));
				$('.salesmanIdUp').val(rData.id);
				$('.uaddr').val(rData.deliveryAddr);
				$('.utelph').val(rData.contactNum);
				$('.uinfo').val(rData.remark);
				$('.uper').val(rData.contactPerson);
			});
			
			//保存修改
			$(document).on('click','.saveAddUp',function(e){
				var add = $('.uaddr').val().trim(),
					con = $('.utelph').val().trim();
				if(add == ''){
					$('.uaddr').next().html('必填!');
					return;
				}
				if(con == ''){
					$('.utelph').next().html('必填!');
					return;
				}
				var sData = {
						"contactPerson" : $('.uper').val(),
				         "deliveryAddr" : $('.uaddr').val(),
				         "contactNum" : $('.utelph').val(),
				         "remark" : $('.uinfo').val()
				};
				$(options.TableName).jqGrid('setRowData',$(this).data('rid'),sData);
				$('#modalAddrUpUp').modal('hide');
			});
			
			
			//修改  删除按钮
			function rePwd(cellvalue, options, rowObjec)
			{
				return '<span class="updateAddress" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalUpdateAddress" style="color:#00CCFF;cursor:pointer;margin-right:20px;">修改</span><span class="deleteAddress" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
			}
		
}

		
var lastrow='';
var lastcell='';
		
		
		
		
//往来单位类型新增弹出层
$(document).on('click','.unitShow',function(e){
			$('#modalUnit').modal('show');
			var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: "/manager/authority/contactInfo/selectType",
			TableName: "#jqGrid_unitManage", //显示表格名称。遵照css选择器书写
//			pager:"#jqGridPager_accredit"
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
				var colNames = ['ID','所属上级','所属上级','编码','名称','备注','操作'];
				var JqGridColModel=[
									{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
									{name:'parentName',index:'parentName', width:80,align:'center', sorttype:"string",sortable:false},
									{name:'parentId',index:'parentId', width:80,align:'center', sorttype:"string",sortable:false,hidden:true},
									{name:'code',index:'code', width:80,align:'center', sorttype:"string",sortable:false},
									{name:'name',index:'name', width:80,align:'center', sorttype:"string",sortable:false},
									{name:'remark',index:'remark', width:100,align:'center', sorttype:"string",sortable:false},
									{name:'do',index:'do', width:100,align:'center', sorttype:"string",formatter: addAndDelete,sortable:false}
				                ];
				loadtable();
			//加载表格
				function loadtable(){
						$(options.TableName).jqGrid({
							url:options.LoadTableUrl,
							mtype:"GET",
							datatype: "json",
							jsonReader  : {	
								root: "data.rows",
								repeatitems: false
										},
							colNames:colNames,          
				            colModel:JqGridColModel,
				            cellsubmit: 'clientArray',//单元格保存内容的位置		
				            editurl: 'clientArray',
				            cellEdit:true,
				            sortable:false,			            
				            rownumbers:true,
				            rowNum: 20,
				            rowList: [20, 25, 40],
				            pager:options.pager,
				            viewrecords: true,		           
//				            multiselect:true,
				            width: "100%" ,
				            height: $(window).height()*0.373,
							autowidth:true,
							rownumWidth: 35, // the width of the row numbers columns
							shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
							beforeEditCell:function(rowid,cellname,v,iRow,iCol){
								lastrow = iRow;
								lastcell = iCol;
							},
							loadComplete:function(data){
								$(".parentLayeerCode").html("");
								$(".parentLayeerCode").append("<option value='-1'><默认无上级></option>");
						    	if(data.result!=1){
						    		$.zxsaas_plus.showalert("错误",data.desc);
						    	    return
						    	}
						    	if (data.data.rows) {
									for (var i = 0; i < data.data.rows.length; i++) {
										$(".parentLayeerCode").append("<option value='" + data.data.rows[i].id + "'>" + data.data.rows[i].name + "</option>");
									}
								}
							},
							gridComplete: function() {
								var ids=$(options.TableName).jqGrid("getDataIDs");

							},
							})
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
				
				function addAndDelete(cellvalue, options, rowObjec)
				{
					return '<span class="updateAreaManage" data-id="' + options.rowId + '" data-target="" style="color:#00CCFF;cursor:pointer;margin-right:20px;">修改</span><span class="trashIn" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
				}
				
				
				//删除一行
				$(document).on('click', '.trashIn',function(e){
					var rowId = $(this).data('id');
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						 $.request({
					            url: '/manager/authority/contactInfo/deleteType',
					            type: "POST",
							    data:{"id":rowId},
							    traditional: true,
					            success: function (data) {
							 			$.zxsaas_plus.showalert("提示",data.desc);
							 			if(data.result==1){
									    	$("#jqGrid_unitManage").trigger("reloadGrid");
							 			}
							          },
					            error: function (msg) {
					                alert(" 数据加载失败！" + msg);
					            }
					        });
					},function(){
						
					});

				});
				
//修改
$(document).on('click', '.updateAreaManage',function(e){
					$('#modalEmpManageUpdate').modal('show');
					$('.uCodeCheckUp').next().html(''),
					$('.uNameCheckUp').next().html('');
					var that = this;
					$('.updateAttr').data('rid',$(this).data('id'));
					var rData = $(options.TableName).jqGrid('getRowData',$(this).data('id'));
					$('#attrIdUp').val(rData.id);
					$('.unitNameUp').val(rData.unitName);
					$('.companyNameUp').val(rData.companyName);
					$('#parentLayeerCodeUp').val(rData.parentId);
					$('.codeUp').val(rData.code);
					$('.nameUp').val(rData.name);
					$('.remarkUp').val(rData.remark);
					
				});
				
});	
		
//保存修改
$(document).on('click','.updateAttr',function(e){
					
					var uc = $('.uCodeCheckUp').val(),
						un = $('.uNameCheckUp').val();
					if(uc == ''){
						$('.uCodeCheckUp').next().html('必填!');
						return;
					}
					if(un == ''){
						$('.uNameCheckUp').next().html('必填!');
						return;
					}
					var obj=$("#modalEmpManageUpdate").toJsonObject();
					delete obj.companyName; 
					if(obj.limit==""){
						obj.limit=0;
					}
					 $.request({
				            type: 'POST',
				            url: '/manager/authority/contactInfo/saveContactType/auth_update',
				            datatype : "json",
						    contentType: "application/json",
				            data:JSON.stringify(obj),
						    traditional: true,
				            success: function (data) {
						 			$.zxsaas_plus.showalert("提示",data.desc);
						 			if(data.result==1){
						 			initModel();
						 			init();
						 			$('#modalEmpManageUpdate').modal('hide');
							    	$("#jqGrid_unitManage").trigger("reloadGrid");
						 			}
						          },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
				        });
				});

//新增保存
$(document).on('click','.addAttr',function(e){
	var uc = $('.uCodeCheck').val(),
		un = $('.uNameCheck').val();
	if(uc == ''){
		$('.uCodeCheck').next().html('必填!');
		return;
	}
	if(un == ''){
		$('.uNameCheck').next().html('必填!');
		return;
	}
	var obj=$("#modalEmpManageAdd").toJsonObject();
			 $.request({
		         type: 'POST',
		         url: '/manager/authority/contactInfo/saveContactType/auth_add',
		         datatype : "json",
				 contentType: "application/json",
		         data:JSON.stringify(obj),
				 traditional: true,
		         success: function (data) {
				 			$.zxsaas_plus.showalert("提示",data.desc);
				 			if(data.result==1){
				 				 $('#modalEmpManageAdd').modal('hide');
				 				initModel();
				 				init();
					 			$(".attrData").html("");
						    	$("#jqGrid_unitManage").trigger("reloadGrid");
				 			}
				          },
		         error: function (msg) {
		             alert(" 数据加载失败！" + msg);
		         }
     });
});

		
//地区管理弹出窗
function loadmodalAreaManage(){
	var options = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: "/manager/authority/contactInfo/initUnitRegion",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_areaManage", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_areaManage"
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
	var colNames = ['ID','地区编码','地区名称','备注','操作'];
	var JqGridColModel=[
						{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'storageName',index:'storageName', width:100,align:'center', sorttype:"string",formatter:dq,sortable:false}
	                ];
	
	loadtable();
//加载表格
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
	            rowNum: 10,
	            rowList: [10, 20, 30],
	            pager:options.pager,
	            viewrecords: true,		           
	            width: "100%" ,
	            height: $(window).height()*0.25,
				autowidth:true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
			    	if(data.result!=1){
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	    return
			    	}
					if (data.data.rows) {
						var len = data.data.rows.length;
						//表格加载完成后 默认隐藏禁用行
						for (var i = 1; i <= len; i++) {
							var gridData = $(options.TableName).jqGrid("getRowData", i);
							if (gridData.depDouble == '0') {
								$(options.TableName).setRowData(i, null, {
									display: 'none'
								});//隐藏禁用
							}
						}
					}
				},
				loadError:function(xhr,status,error){
				}
				})

	}	
	//删除      根据每行数据的id删除  而不是行id
	$(document).on('click', '.deleteAreaManage',function(e){
		var dId = $(this).data('id');//获取数据的id
		//调用接口删除数据
		$.zxsaas_plus.showconfirm("","是否确定删除此条数据?",function(){
				$.request({
				    url:"/manager/authority/contactInfo/deleteOther",
				    type: "POST",
				    data:{"id":dId},
				    traditional: true,
				    success: function(data) {
				    	if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    	init();
				    	//tree(2);
				    	$("#jqGrid_areaManage").trigger("reloadGrid");
				    }
			});
			},function(){
				
			});
		
	});
	
	//地区修改  删除按钮
	function dq(cellvalue, options, rowObjec)
	{
		return '<span class="updateAreaManage" data-remark="'+rowObjec.remark+'" data-code="'+ rowObjec.code +'" data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '" data-toggle="modal" data-target="#modalAreaUpdate" style="color:#00CCFF;cursor:pointer;margin-right:20px;">修改</span><span class="deleteAreaManage" data-depId="' 
		+ rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
	}
}

//弹出修改框     
$(document).on('click', '.updateAreaManage',function(e){
	var id=$(this).data('id');
	var name = $(this).data('name');//获取数据的id
	var code =$(this).data('code');
	var remark= $(this).data('remark');
	$("#areId").val(id);
	$("#updateCode").val(code);
	$("#updateName").val(name);
	$("#updateRemark").val(remark);
});

//保存地区修改数据
$(document).on('click', '.updateDq',function(e){
	var dId = $(this).data('id');//获取数据的id
	var obj={};
	obj.id=$("#areId").val();
	obj.name=$("#updateName").val();
	obj.code=$("#updateCode").val();
	obj.remark=$("#updateRemark").val();
	obj.status=0;
	
	if(obj.code==''){
  	  $.zxsaas_plus.showalert("提示", "编码不能为空");
  	  return;
  }
  if(obj.name==''){
  	  $.zxsaas_plus.showalert("提示", "名称不能为空");
  	  return;
  }
	//调用接口获取本id的数据  填充至表格
	$.request({
	    url:"/manager/authority/contactInfo/saveRegion",
	    type: "POST",
	    datatype : "json",
	    contentType: "application/json",
	    data: JSON.stringify(obj),
	    traditional: true,
	    success: function(data){
		$.zxsaas_plus.showalert("提示",data.desc);
		if(data.result!=0){
			$("#jqGrid_areaManage").trigger("reloadGrid");
			initModel();
			$(".areData").val("");
			$(".dxk").prop('checked','');
		}
	 }
});
	return true;
});

//保存地区新增数据
$(document).on('click', '.addDq',function(e){
	var obj={};
	obj.name=$("#addName").val();
	obj.code=$("#addCode").val();
	obj.remark=$("#addRemark").val();
	obj.status=0;
	
	    if(obj.code==''){
	    	  $.zxsaas_plus.showalert("提示", "编码不能为空");
	    	  return;
	    }
	    if(obj.name==''){
	    	  $.zxsaas_plus.showalert("提示", "名称不能为空");
	    	  return;
	    }
	//调用接口获取本id的数据  填充至表格
	$.request({
	    url:"/manager/authority/contactInfo/saveRegion",
	    type: "POST",
	    datatype : "json",
	    contentType: "application/json",
	    data: JSON.stringify(obj),
	    traditional: true,
	    success: function(data){
			$.zxsaas_plus.showalert("提示",data.desc);
			if(data.result!=0){
				initModel();
				$("#jqGrid_areaManage").trigger("reloadGrid");
				$(".areData").val("");
				$("#modalAreaAdd").modal('hide');
			}
	    }
});
	return true;
});	
		
/*前端模态框调整勿动*/
$(window).resize(function(){
	var modal=$(".modal:visible");
	if(modal.length>0){resizeModal(modal);}
});

//模态框大小调整
/*新增模态框*/
$(document).on("shown.bs.modal","#myModal",function(){
	resizeModal(this);
	setTable("jqGrid_empManage");

});
/*修改模态框*/
$(document).on("shown.bs.modal","#modalUpdate",function(){
	resizeModal(this);
	setTable("jqGrid_sendManage");
});
function resizeModal(modal){
	var  _width =$(window.parent).width()||$(window).width();//$(window.parent).width()||
	var  _height=$(window.parent).height()||$(window).height();//$(window.parent).height()||
	var modal_id=$(modal).attr("id");
	if(modal_id=="myModal"||modal_id=="modalUpdate"){
		if(_width<1200){
		    $("#"+modal_id).find(".modal-content").css({
			   "width":$(window).width()*0.85+"px",
			   "height":"auto",
			   "overflow-y":"hidden"
		    });

		    $("#"+modal_id).find(".modal-body").css({
		    	"height":$(window).height()*0.65+"px",
				"overflow":"auto"
		    });

		    $("#"+modal_id+" .fieLeft div").css({"width":"100%"});
		}else if(_width<1400){
		    $("#"+modal_id).find(".modal-content").css({
			   "width":"842px",
			   "height":"auto",
			   "overflow-y":"hidden"
		    });
		    $("#"+modal_id).find(".modal-body").css({
		    	"height":$(window).height()*0.65+"px",
				"overflow":"auto"
		    });
		    $("#"+modal_id+" .fieLeft div").css({"width":"50%"});
		}else{
			 $("#"+modal_id).find(".modal-content").css({
				   "width":"1100px",
				   "height":"auto",
				   "overflow-y":"hidden"
			  });
			 $("#"+modal_id).find(".modal-body").css({
			    	"height":"auto",
			    	"overflow-x": "hidden"
			    });
			 $("#"+modal_id+" .fieLeft div").css({"width":"50%"});
		}
		HorizontalMiddle(modal_id);//水平居中模态框
	}
}

function HorizontalMiddle(modal_id){
    var w =$(window).width();
    var modal_w=$("#"+modal_id+" .modal-content").width();
    if(w&&modal_w){
        var modal_l=(w-modal_w)/2;
        $("#"+modal_id+" .modal-dialog").css({"position":"absolute"});
        $("#"+modal_id+" .modal-content").css({"position":"absolute","left":modal_l});
    }
}
//新增送货地址表格调整
function setTable(tbleId){
	  $("#"+tbleId).setGridWidth($("#"+tbleId).closest(".grid-wrap").width());
}
$('.edAdd').blur(function(){
    var ed=Number($('.edAdd').val()).toFixed(2)
    $('.edAdd').val(ed)
});
$('.edAdd').keydown(function(e) {
    if (e.keyCode == 13) {
        var ed=Number($('.edAdd').val()).toFixed(2)
        $('.edAdd').val(ed)
        $(".edAdd").css('outline','none');
    }
});
$('.edUp').blur(function(){
    var ed=Number($('.edUp').val()).toFixed(2)
    $('.edUp').val(ed)

});
$('.edUp').keydown(function(e) {
    if (e.keyCode == 13) {
        var ed=Number($('.edUp').val()).toFixed(2)
        $('.edUp').val(ed)
        $(".edUp").css("outline","none");
    }
});