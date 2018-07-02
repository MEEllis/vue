var updateCode="";
var sid='';
//初始化信息
(function(){
		tree(2);
		initCompanyDataTree();
		$(".depCheckName,.depCheckCode,.depCheckNameUp,.depCheckCodeUp,#updateAttrName,#updateAttrCode,#addAttrName,#addAttrCode").focus(function(e){
			$(this).next().html('');
		});
		//以下为图形菜单专用
		/*开始*/
		if(window.location.search.indexOf('showMenuModal') > -1 ){
			$('#dataPowerModalDialog').modal('show')
		}
		/*结束*/


	//新版资金账户
	$(".addMultiple").combobox({
		url:'/manager/inventory/common/getAccountVoTree',
		id:'addMultipleTree',
		placeholder:'请选择资金账户'
	})

	 //导出
    $("#export").click(function(){
    	var obj;
    	if($('#xsjy').is(':checked')){ 
    		obj=1
    	}
    	else{
    		obj=2
    	}
    	 window.location.href= "/manager/authority/sectionInfo/export?keyword="+$.trim($("#selectInfo").val())
    	 +"&xsjy="+obj;
    });
})();




/*启用时间*/
$("#usedDate").datetimepicker({//发卡日期
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});


$(document).on('click','.add',function(e){
	$('#myModal').modal('show');

	$('.depCheckName').next().html('');
	$(".depCheckCode").next().html('');
});
//部门新增弹框显示
var current={};
$("#myModal").on("show.bs.modal",function(e){
	if(current.id){
	   if(current.id>-1){//非公司结点
	       $("#myModal .shangji").val(current.id);
	   }else{
		   $("#myModal .shangji").val(-1);
	   }
	}else{
		 $("#myModal .shangji").val(-1);
	}
	current={};
});

//通过树的id重新生成表格
function controll(str){
	 if($('#xsjy').is(':checked')){  
			var type=1;
	}else{ 
			var type=2;
	}
	$("#jqGrid_metaData").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:{"xsjy":type,"cjbm":str}, //发送数据  
    }).trigger("reloadGrid"); //重新载入
}

function tree(xsjy){
	var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				}
			},
			callback: {
				onClick: function (event, treeId, treeNode, msg) {
					controll(treeNode.id);//通过id调用对应方法 重构表格
					current=treeNode;
				}
			},
			view: {
				showIcon: true
			}
	    }; 
	$.request({
        type: 'POST',
        url: '/manager/authority/sectionInfo/initSection',
        data:{"xsjy":xsjy},
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
			var obj=[];
			var bumen={};
			bumen.name=data.data.companyName;
			bumen.id=-1;
			obj.push(bumen);
			//上级部门
			if (data.data.plist) {
				for (var i = 0; i < data.data.plist.length; i++) {
					var bumen = {};
					bumen.id = data.data.plist[i].layerCode;
					bumen.name = data.data.plist[i].name;
					bumen.pId = data.data.plist[i].parentLayerCode;
					obj.push(bumen);
				}
			}
            $.fn.zTree.init($("#publicModelTree"), setting, obj);
            var str = $('#publicModelTree_1_switch').attr('class');
            var Class = str.replace('roots','center');
            $('#publicModelTree_1_switch').attr('class',Class);
            //集团名称
            $(".groupName").val(data.data.groupName);
            $(".companyName").val(data.data.companyName);
            //所属地区
            $(".ssqy").html("");
            $(".ssqy").append("<option value=''><默认:空></option>");
			if (data.data.rlist) {
				for (var i = 0; i < data.data.rlist.length; i++) {
					$(".ssqy").append("<option value='" + data.data.rlist[i].id + "'>" + data.data.rlist[i].name + "</option>");
				}
			}
            //部门属性
            $(".bmsx").html("");
            $(".bmsx").append("<option value=''><默认:空></option>");
			if (data.data.alist) {
				for (var i = 0; i < data.data.alist.length; i++) {
					$(".bmsx").append("<option value='" + data.data.alist[i].id + "'>" + data.data.alist[i].name + "</option>");
				}
			}
            //上级部门
            $(".shangji").html("");
            $(".shangji").append("<option value='-1'><默认第一级></option>");
			if (data.data.plist) {
				for (var i = 0; i < data.data.plist.length; i++) {
					$(".shangji").append("<option value='" + data.data.plist[i].layerCode + "'>" + data.data.plist[i].name + "</option>");
				}
			}


            // //可选资金账户
            // var dataList=[];
			// if (data.data.acclist) {
				// for (var i = 0; i < data.data.acclist.length; i++) {
				// 	if (data.data.acclist[i].status != 1) {
				// 		//	objLength++;
				// 		var obj = {};
				// 		obj.id = data.data.acclist[i].id;
				// 		obj.text = data.data.acclist[i].code + "-" + data.data.acclist[i].name;
				// 		dataList.push(obj);
				// 	}
				// }
			// }
            // $(".addMultiple").select2({
            //     data: dataList,
            //     placeholder:'请选择',//默认文字提示
            //     language: "zh-CN"//汉化
            //  /*   allowClear: true//允许清空*/
            // });
            // $(".modifyMultiple").select2({
            //     data: dataList,
            //     placeholder:'请选择',//默认文字提示
            //     language: "zh-CN"//汉化
            //  /*   allowClear: true//允许清空*/
            // });
        },
        error: function (msg) {
           /* alert(" 数据加载失败！" + msg);*/
        }
    });
}	

//批量启动或禁用
$(document).on('click', '.enableOrDisable',function(e){
	var id=e.target.id;
	var checkedIdList= $("#jqGrid_metaData").jqGrid('getGridParam','selarrrow');//获取选中行的id
	if(checkedIdList.length==0){
		if(id==1){
			$.zxsaas_plus.showalert("提示","请勾选部门后再禁用!");
		}else{
			$.zxsaas_plus.showalert("提示","请勾选部门后再启用!");
		}
		return;
	}else{
		$.request({
		    url:"/manager/authority/sectionInfo/startSection",
		    type: "POST",
		    data: {"checkedIdList": checkedIdList,"status":id},
		    traditional: true,
		    success: function(data) {
		    	if(data.result==1){
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    	}else{
		    		$.zxsaas_plus.showalert("错误",data.desc);
		    	}
		    if($('#xsjy').is(':checked')){  
					tree(1);
			}else{ 
					tree(2);
			}
		    	$("#jqGrid_metaData").trigger("reloadGrid");
		    }
		});
	}
});

function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/sectionInfo/selectSectionList",//查询集团信息接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_metaData", //显示表格名称。遵照css选择器书写
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
			//var toggleflag=false;//冻结时候切换用
			var colNames = ['ID','公司名称','部门编码','部门名称','所属区域','部门属性','启用日期','是否为门店','是否禁用','是否公开库存量','电话','地址','备注','新增人','新增时间','修改人','修改时间'];
			var JqGridColModel=[
								{name:'id',index:'id', width:50,align:'center', sorttype:'string',hidden:true,key: true,sortable:true},
								{name:'companyName',index:'companyName', width:200,align:'center', sorttype:'String',sortable:true},
								{name:'code',index:'code', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'regionName',index:'region_name', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'attrName',index:'attr_name', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'usedDateString',index:'USED_DATE', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'ifStore',index:'IF_STORE', width:200,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},
								{name:'status',index:'status', width:200,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},
								{name:'isKcflag',index:'IS_KCFLAG', width:130,align:'center',sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},//备注
								{name:'tel',index:'TEL', width:100,align:'center',sortable:false},//备注
								{name:'address',index:'ADDRESS', width:100,align:'center',sortable:false},//备注
								{name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'empCreateName',index:'createname', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'addTimeStr',index:'CREATE_TIME', width:200,align:'center',formatter:"string",sortable:true},
								{name:'empUpdateName',index:'updatename', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'updateTimeStr',index:'UPDATE_TIME', width:200,align:'center', sorttype:'date',sortable:true},
			                ];
			
			loadtable();
		//加载表格
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
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
			            rownumbers:true,
			            rowNum: 10,
			            rowList: [10, 20, 30],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.65,
			            multiselect:true,//定义是否可以多选
			            multiboxonly:false,
			            multiselectWidth:40,
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
						beforeSelectRow : function(rowid, e) {
//						  var check = $(e.target).is('input[type=checkbox]');
//						  if (check) {
//							$(options.TableName).jqGrid('setSelection', rowid);
//						  }
//						    return check;
					  },
						loadComplete:function(data){
					      if (data.data.rows) {
						  	if (data.data.rows.length > 0) {
										$('.companyName').val(data.data.rows[0].companyName);
									}
								}
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
			
			
$(document).on("show.bs.modal","#modalUpdate",function(){
			$('.depCheckNameUp').next().html('');
			$(".depCheckCodeUp").next().html('');
				var checkedList = [];//存放已勾选行id
				var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
				if(ids.length != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					$('.modifyMultiple').parent().find('.ComboBox,.showComboBox').remove()
					sid = ids[0]
					//新版资金账户
					$(".modifyMultiple").combobox({
						url:'/manager/inventory/common/getAccountVoTree?sid='+sid,
						id:'modifyMultipleTree',

						placeholder:'请选择资金账户'
					})


					$.request({
				            url: '/manager/authority/sectionInfo/selectOne',
				            type: "POST",
						    data:{"id":ids},
						    traditional: true,
				            success: function (data) {

						        updateCode=data.data.obj.code;
						 		$('#id').val(data.data.obj.id);
						 		$('#name').val(data.data.obj.name);
						 		$('#code').val(data.data.obj.code);
						 		$('#remark').val(data.data.obj.remark);
						 		$('#usedDate_modify').val(data.data.obj.usedDateString);
						 		$('#tel').val(data.data.obj.tel);
						 		$('#address').val(data.data.obj.address);
								(data.data.obj.ifStore == 0) ? ($('#depStore').prop({'checked':''})) : ($('#depStore').prop({'checked':'checked'}));
								(data.data.obj.isKcflag == 0) ? ($('#isKcflag').prop({'checked':''})) : ($('#isKcflag').prop({'checked':'checked'}));
								
								   
								 //所属上级
								 var sssj = document.getElementById("sssj").options;
								 $(".shangji option[value='"+data.data.obj.layerCode+"']").remove();
								  for (i=0; i<sssj.length; i++){
								      if (sssj[i].value == data.data.obj.parentLayerCode)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
								      {
								    	  sssj[i].selected = true;
								      }
								   }
								 //所属区域
								  var ssqy = document.getElementById("ssqy").options;
								  for (i=0; i<ssqy.length; i++){
								      if (ssqy[i].value == data.data.obj.regionId)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
								      {
								    	  ssqy[i].selected = true;
								      }
								   }
								 //部门属性
								  var bmsx = document.getElementById("bmsx").options;
								  for (i=0; i<bmsx.length; i++){
								      if (bmsx[i].value == data.data.obj.attrId)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
								      {
								    	  bmsx[i].selected = true;
								      }
								   }



								//可选择资金账户多选框
								  var ids="",idsT=[];

								  if(null!=data.data.obj.ksyList&&"undefined"!=data.data.obj.ksyList){
									  ids = data.data.obj.ksyName;//获取ids
								  }
								  idsT=ids.split(";");
								  $(".modifyMultiple").val(idsT).attr('title', idsT);
								  if(data.data.obj.ksyList){
									  $(".modifyMultiple").data('id',data.data.obj.ksyList.split(';').join(','))
								  }
							
				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
				        });
				}
				
			});
			
//修改模态框关闭
$(document).on("hide.bs.modal","#modalUpdate",function(){
	tree(2);
});		
			
			
//查询按钮
$(".btn-success").click(function(){
				var obj;
				if($('#xsjy').is(':checked')){ 
					obj=1
				}
				else{
					obj=2
				}
				tree();
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:{"keywork":$.trim($("#selectInfo").val()),"xsjy":obj}, //发送数据  
			    }).trigger("reloadGrid"); //重新载入
			});	
			
//显示禁用框
$("#xsjy").click(function(){
				if($('#xsjy').is(':checked')){  
					tree(1);
			        $(options.TableName).jqGrid('setGridParam',{  
				        datatype:'json',  
				        postData:{"keywork":$("#selectInfo").val(),"xsjy":1}, //发送数据  
				    }).trigger("reloadGrid"); //重新载入

			}else{ 
				tree(2);
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:{"keywork":$("#selectInfo").val(),"xsjy":2}, //发送数据  
			    }).trigger("reloadGrid"); //重新载入
				
			}
		});
			
//删除按钮
$(".btnDeleteRow").click(function(){
				var checkedList = [];//存放已勾选行id
				var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
				if(ids.length == 0){
					$.zxsaas_plus.showalert("错误","请选择需要删除的部门");
					return false;
				}else{
					$.zxsaas_plus.showconfirm("删除","是否确定删除选中的部门信息?",function(){
					$.request({
					    url:"/manager/authority/sectionInfo/delete",
					    type: "POST",
					    data: {"ids":ids},
					    traditional: true,
					    success: function(data) {
					    	if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
					    	 if($('#xsjy').is(':checked')){  
									tree(1);
							}else{ 
									tree(2);
							}
					    	$("#jqGrid_metaData").trigger("reloadGrid");
					    }
					});
					},function(){
						
					});
				}
			});
			
//修改保存
$(".updateSection").click(function(){
			
			var na = $('.depCheckNameUp').val().trim();
			if(na == ''){
				$('.depCheckNameUp').next().html('必填!');
				return;
			}

				var obj=$("#modalUpdate").toJsonObject();

				obj.ksyList= $(".modifyMultiple").data('id');

				//是否为门店
				if(obj.ifStore==null||obj.ifStore==""){
					obj.ifStore=0
				}
				
						$.request({
							url:"/manager/authority/sectionInfo/saveSection/auth_update",
						    type: "POST",
						    datatype : "json",
						    contentType: "application/json",
						    data: JSON.stringify(obj),
						    traditional: true,
						    success: function(data) {
						    	if(data.result==1){
						    		$.zxsaas_plus.showalert("提示",data.desc);
						    		tree(2);
							    	$(".sectionData").val("");
							    	$("#jqGrid_metaData").trigger("reloadGrid");
							    	$("#modalUpdate").modal('hide');
						    	}else{
						    		$.zxsaas_plus.showalert("错误",data.desc);
						    	}
						    }
						});
				
			});
			
//新增保存（保存并关闭）
$(".saveSection").click(function(){
	
			var na = $('.depCheckName').val().trim();
			if(na == ''){
				$('.depCheckName').next().html('必填!');
				return;
			}
			
			if($("#usedDate").val()==""){
				$.zxsaas_plus.showalert("错误","请选择启用日期");
				return;
			}
	
				var obj=$("#myModal").toJsonObject();
				obj.ksyList=$(".addMultiple").data('id');

				
				//是否为门店
				if(obj.ifStore==null||obj.ifStore==""){
					obj.ifStore=0
				}
				else{
					obj.ifStore=1
				}
				
				if(obj.isKcflag==null||obj.isKcflag==""){
					obj.isKcflag=0
				}
				else{
					obj.isKcflag=1
				}

				$.request({
				    url:"/manager/authority/sectionInfo/saveSection/auth_add",
				    type: "POST",
				    datatype : "json",
				    contentType: "application/json",
				    data: JSON.stringify(obj),
				    traditional: true,
				    success: function(data) {
				    	if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    		$('#myModal').modal('hide');
				    		$('#myModal').removeData("bs.modal");
				    		$("#gkstore").prop("checked", false);
				    		$("#ifStore_add").prop("checked", false);
				    		$("#tel_add").val("");
				    		$("#addr_add").val("");
				    		tree(2);
					    	$(".sectionData").val("");
							$("#usedDate").val("");
					    	$("#jqGrid_metaData").trigger("reloadGrid");

				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    }
				});
			});

//新增保存（保存并新增）
$(".saveSectionAddnew").click(function(){
	
			var na = $('.depCheckName').val().trim();
			if(na == ''){
				$('.depCheckName').next().html('必填!');
				return;
			}
			
			if($("#usedDate").val()==""){
				$.zxsaas_plus.showalert("错误","请选择启用日期");
				return;
			}
	
				var obj=$("#myModal").toJsonObject();
				obj.ksyList =  $(".addMultiple").data('id')
				//是否为门店
				if(obj.ifStore==null||obj.ifStore==""){
					obj.ifStore=0
				}
				else{
					obj.ifStore=1
				}
				
				if(obj.isKcflag==null||obj.isKcflag==""){
					obj.isKcflag=0
				}
				else{
					obj.isKcflag=1
				}
				$.request({
				    url:"/manager/authority/sectionInfo/saveSection/auth_add",
				    type: "POST",
				    datatype : "json",
				    contentType: "application/json",
				    data: JSON.stringify(obj),
				    traditional: true,
				    success: function(data) {
				    	if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    		//$('#myModal').modal('hide');
				    		$('#myModal').removeData("bs.modal");
				    		$("#gkstore").prop("checked", false);
				    		$("#ifStore_add").prop("checked", false);
				    		$("#tel_add").val("");
				    		$("#addr_add").val("");
				    		tree(2);
					    	$(".sectionData").val("");
							$("#usedDate").val("");
					    	$("#jqGrid_metaData").trigger("reloadGrid");
							$(".addMultiple").val("").data('id','');
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    }
				});
				
			});


}


//公司数据权限树
function initCompanyDataTree(){

	//人员选择树
	var setting = {
		data: {//数据属性设置
		},
		check: {
	        enable: true
            //chkboxType : { "Y" : "", "N" : "" }
	    },	
        async: {//从后台获取数据
            enable: true,
            url: '/manager/Tgroup/findTree2?groupId='+$("#groupId").val(),
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
        		if(treeNode.objType == "Temployee"){
        			$("#rightTree").show();
            	    eid = treeNode.obj.id;
            	    $.fn.zTree.getZTreeObj("empDataPowerTree").checkAllNodes(false);
            		$.request({
            				url: '/manager/TemployeeData/findByModel',
            				type : "post",
            				dataType : 'json',
            				data:{'employeesId':eid,"typeCode":"KSYBM"},
            				success:function(data){
            					var cList = data.data.dataList;
            					if(cList.length==0){
            						$.fn.zTree.getZTreeObj("empDataPowerTree").checkAllNodes(true);
            					}
            					else{
            					//更新此员工的公司数据权限
            				    var treeObj = $.fn.zTree.getZTreeObj("empDataPowerTree");
            				    var nodes = treeObj.getNodes();
                                eachTree2(nodes,cList)

            					}
            			    }
            		});
        		}else{
        			$("#rightTree").hide();
        		}
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#empTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("empTree");
    zTree.expandAll(true);  
   
	//公司选择树
	var setting2 = {
		data: {//数据属性设置
		},
		check: {
	        enable: true ,
            chkboxType : { "Y" : "ps", "N" : "ps" },
            chkStyle : 'checkbox'
	    },	
        async: {//从后台获取数据
            enable: true,
            url: '/manager/authority/sectionInfo/sectionTree',
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
    
        	console.log($.fn.zTree.getZTreeObj("empDataPowerTree").getSelectedNodes());
			},
			onAsyncSuccess: function(event, treeId, treeNode, msg){
			    
			    var treeObj = $.fn.zTree.getZTreeObj("empDataPowerTree");
			    var nodes = treeObj.getNodes();
			    for(var i=0;i<nodes.length;i++){
			    	eachTree(nodes[i]);
			    }
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#empDataPowerTree"), setting2);
	var zTree2 = $.fn.zTree.getZTreeObj("empDataPowerTree");
    zTree2.expandAll(true); 

    //递归遍历树节点
    function eachTree(node){
    	
    		node.nocheck = false;
    		$.fn.zTree.getZTreeObj("empDataPowerTree").updateNode(node);
			for(var i=0;i<node.children.length;i++){
				eachTree(node.children[i]);
			}
    }
    //递归遍历树节点
    function eachTree2(nodes,cList){
        for (var i in nodes) {
			var node =nodes[i]
			var flag=true
            for ( var int = 0; int < cList.length; int++) {
                if((node.obj.id + "") == cList[int].valueCode){
                    flag=false

                    $.fn.zTree.getZTreeObj("empDataPowerTree").checkNode(node,true,true,true);
                    break;
                }
            }
            if(flag==true){
                eachTree2(node.children, cList);
			}
        }
    }
}	
		

//保存授权权限
function saveEmpDataPower(){
	 var treeObj=$.fn.zTree.getZTreeObj("empDataPowerTree"),
     nodes=treeObj.getCheckedNodes(true);
	 var list=[];
	
	 console.log(nodes);
   for(var i=0;i<nodes.length;i++){
	   if(nodes[i].objType=="Tcompany"){
		   if(nodes[i].check_Child_State==2){
			     var obj={};
			  	 obj.employeesId=eid;
			  	 obj.typeCode="KSYBM";
			  	 list.push(obj);
		   }
		 }
	   else{
		   for(var j=0;j<nodes.length;j++){
			   if(nodes[j].tId==nodes[i].parentTId){
				   if((nodes[i].check_Child_State==2||nodes[i].check_Child_State==-1)&&nodes[j].check_Child_State!=2){
						  var obj={};
				    	  obj.employeesId=eid;
				    	  obj.typeCode="KSYBM";
				    	  obj.valueCode=nodes[i].obj.id;
				    	  list.push(obj);
				   }
				
			   }
			  
		   }
	   }
	 }
   
   if(nodes.length==0){
  	 var obj={};
  	 obj.employeesId=eid;
  	 obj.typeCode="KSYBM";
  	 list.push(obj);
   }
    $.request({
        type: 'Post',
        url: '/manager/authority/storageInfo/saveData',
        contentType: "application/json",
        data:JSON.stringify(list),
        success: function (data) {
    		$.zxsaas_plus.showalert("提示",data.desc);
        },
        error: function (msg) {
           
        }
    });
}	

//点击属性
$(".empManage").click(function(){
	loadmodalEmpManage();
});
//点击地区
$(".area").click(function(){
	loadmodalAreaManage();
});

function updateAttr(){
	$.request({
      type: 'POST',
      url: '/manager/authority/sectionInfo/initSection',
      dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
      data:{"xsjy":2},
      success: function (data) {
          //所属地区
			$(".ssqy").html("");
	        $(".ssqy").append("<option value=''><默认:空></option>");
			if (data.data.rlist) {
				for (var i = 0; i < data.data.rlist.length; i++) {
					$(".ssqy").append("<option value='" + data.data.rlist[i].id + "'>" + data.data.rlist[i].name + "</option>");
				}
			}
          //部门属性
          $(".bmsx").html("");
          $(".bmsx").append("<option value=''><默认:空></option>");
		  if (data.data.alist) {
		  	for (var i = 0; i < data.data.alist.length; i++) {
		  		$(".bmsx").append("<option value='" + data.data.alist[i].id + "'>" + data.data.alist[i].name + "</option>");
		  	}
		  }
      },
      error: function (msg) {
         /* alert(" 数据加载失败！" + msg);*/
      }
  });
}


//地区修改  删除按钮
function dq(cellvalue, options, rowObjec)
{
	return '<span class="updateAreaManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalAreaUpdate" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteAreaManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
}

//属性修改  删除按钮
function sx(cellvalue, options, rowObjec)
{
	return '<span class="updateEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalEmpManageUpdate" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
}


//部门属性管理弹出窗
function loadmodalEmpManage(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/sectionInfo/initSectionAttr",
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
			var colNames = ['ID','属性名称','属性编码','操作'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'code',index:'code', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'storageName',index:'storageName', width:300,align:'center', sorttype:"string",formatter:sx,sortable:false}
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
										console.log(id);
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
						
						},
						loadError:function(xhr,status,error){
						}
				})
			}
			
			
			//删除      根据每行数据的id删除  而不是行id
			$(document).on('click', '.deleteEmpManage',function(e){
				
				var dId = $(this).data('id');//获取数据的id
				//调用接口删除数据
				$.zxsaas_plus.showconfirm("","是否确定删除此条数据?",function(){
					$.request({
					    url:"/manager/authority/sectionInfo/deleteOther",
					    type: "POST",
					    data:{"type":2,"id":dId},
					    traditional: true,
					    success: function(data) {
					    	if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
					    	updateAttr();
					    	$("#jqGrid_empManage").trigger("reloadGrid");
					    }
					});
					},function(){
						
					});
				
			});			
			//部门属性修改  删除按钮
			function manage(cellvalue, options, rowObjec)
			{
				return '<span class="updateEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalEmpManageAdd" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
			}
			
			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
			}
			$('.retailDetailTable div').css('width','auto');
	}

//弹出修改框     
$(document).on('click', '.updateEmpManage',function(e){
	var dId = $(this).data('id');//获取数据的id
	//调用接口获取本id的数据  填充至表格
	$.request({
	    url:"/manager/authority/sectionInfo/selectOtherOne",
	    type: "POST",
	    data:{"type":2,"id":dId},
	    traditional: true,
	    success: function(data) {
		$("#modalEmpManageUpdate").writeJson2Dom(data.data.rows);
	 }
});
	return true;
});

//保存属性修改数据
$(document).on('click', '.updateAttr',function(e){
	var name=$("#attrNameUpdate").val();
	if(name==""){
		$.zxsaas_plus.showalert("提示","名称不能为空");
		return;
	}
	
	$.request({
	    url:"/manager/authority/sectionInfo/saveAttr",
	    type: "POST",
	    datatype : "json",
	    contentType: "application/json",
	    data: JSON.stringify($("#modalEmpManageUpdate").toJsonObject()),
	    traditional: true,
	    success: function(data){
			$.zxsaas_plus.showalert("提示",data.desc);
			updateAttr();
			$("#modalEmpManageUpdate").modal('hide');
			$("#modalEmpManageUpdate").cleanAllObj();
			$("#jqGrid_empManage").trigger("reloadGrid");
	   }
	});
	//return true;
});

//保存属性新增数据
$(document).on('click', '.addAttr',function(e){
	var name=$("#attrNameAdd").val();
	if(name==""){
		$.zxsaas_plus.showalert("提示","名称不能为空");
		return;
	}
	
	$.request({
	    url:"/manager/authority/sectionInfo/saveAttr",
	    type: "POST",
	    datatype : "json",
	    contentType: "application/json",
	    data: JSON.stringify($("#modalEmpManageAdd").toJsonObject()),
	    traditional: true,
	    success: function(data){
				$.zxsaas_plus.showalert("提示",data.desc);
				updateAttr();
				$("#modalEmpManageAdd").modal('hide');
				$("#modalEmpManageAdd").cleanAllObj();
				$("#jqGrid_empManage").trigger("reloadGrid");
		 }
	});
	return true;
});
		
//部门地区
//地区管理弹出窗
function loadmodalAreaManage(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/sectionInfo/initSectionRegion",
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
								{name:'storageName',index:'storageName', width:300,align:'center', sorttype:"string",formatter:dq,sortable:false}
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
										console.log(id);
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
						},
						loadComplete:function(data){
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
						    url:"/manager/authority/sectionInfo/deleteOther",
						    type: "POST",
						    data:{"type":1,"id":dId},
						    traditional: true,
						    success: function(data) {
						    	if(data.result==1){
						    		$.zxsaas_plus.showalert("提示",data.desc);
						    	}else{
						    		$.zxsaas_plus.showalert("错误",data.desc);
						    	}
						    	updateAttr();
						    	$("#jqGrid_areaManage").trigger("reloadGrid");
						    }
					});
				});
			});
			$('.retailDetailTable div').css('width','auto');
}

		
//弹出修改框     
$(document).on('click', '.updateAreaManage',function(e){
			var dId = $(this).data('id');//获取数据的id
			//调用接口获取本id的数据  填充至表格
			$.request({
			    url:"/manager/authority/sectionInfo/selectOtherOne",
			    type: "POST",
			    data:{"type":1,"id":dId},
			    traditional: true,
			    success: function(data) {
				$("#modalAreaUpdate").writeJson2Dom(data.data.rows);
			 }
		});
			return true;
		});
		
//保存地区修改数据
$(document).on('click', '.updateDq',function(e){
			$.request({
			    url:"/manager/authority/sectionInfo/saveAre",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify($("#modalAreaUpdate").toJsonObject()),
			    traditional: true,
			    success: function(data){
				if(data.desc!=1){
					$.zxsaas_plus.showalert("错误",data.desc);
				}else{
					updateAttr();
					$.zxsaas_plus.showalert("提示",data.desc);
					$("#modalAreaUpdate").modal('hide');
					$("#modalAreaUpdate").cleanAllObj();
					$("#jqGrid_areaManage").trigger("reloadGrid");
				}
			 }
		});
			return true;
		});
		
//保存地区新增数据
$(document).on('click','.addDq',function(e){
			$.request({
			    url:"/manager/authority/sectionInfo/saveAre",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify($("#modalAreaAdd").toJsonObject()),
			    traditional: true,
			    success: function(data){
				if(data.desc!=1){
					$.zxsaas_plus.showalert("错误",data.desc);
				}else{
					updateAttr();
					$.zxsaas_plus.showalert("提示",data.desc);
					$("#modalAreaAdd").modal('hide');
					$("#modalAreaAdd").cleanAllObj();
					$("#jqGrid_areaManage").trigger("reloadGrid");
				}
			 }
		});
			return true;
		});
