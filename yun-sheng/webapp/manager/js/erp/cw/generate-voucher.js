
//参数初始化
var listArr=[];
var billsList=[];
var sectionId,managersUids,billsDateBegin='',billsDateEnd='',contactsunitIds,selectAll=false;
var dataList,voucherList;
//初始化步骤
var step=0;
isGoBack(step);


//初始化时间
$("#startTimeStr").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false,    //关闭选择今天按钮
    //minDate:new Date().setDate(1),
    //maxDate:new Date(),
    value:new Date(parseInt(new Date().setDate(1))).toLocaleString()
})
$("#endTimeStr").datetimepicker({
	lang:"ch",           //语言选择中文
	format:"Y-m-d",      //格式化日期
	timepicker:false,    //关闭时间选项
	todayButton:false,    //关闭选择今天按钮
	//minDate:new Date().setDate(1),
	//maxDate:new Date(),
	value:new Date()
})

//初始化结束

//判断结束日期不能小于开始日期
$(document).on('blur','#startTimeStr,#endTimeStr',function(e){
	var startTime = new Date($('#startTimeStr').val().replace(/\-/g,'/'));
	var endTime = new Date($('#endTimeStr').val().replace(/\-/g,'/'));
	var flag = (endTime < startTime) ? false : true;
	if(!flag){  
	    $.zxsaas_plus.showalert("提示","结束日期必须晚于开始日期！");
		$(this).val('');
	    return;  
	}  
});

//判断能否回到上一步
function isGoBack(step){
	if(step==0){
		$('.lastStep').hide();
	}else{
		$('.lastStep').show();
	}
}
//上一步操作
function lastStep(step){
	
	
		
		//切换顶部进度条
		$('.stepList li:eq('+step+')').removeClass('nowStep');
		step--;
		isGoBack(step);
		$('.stepList li:eq('+step+')').addClass('nowStep');
		
		//执行操作
		
		if(step==0){
			$('.queryContainer').show();
			$('.receipts_list_tableBox').hide();
			$('.module_group_tableBox').show();
			$("#jqGrid_module_group").setGridParam({
		    }).trigger("reloadGrid");
			listArr=[]
			billsList=[]
		}
		if(step==1){
			$('.nextStep').show()
			$('.receipts_list_tableBox').show();
		}
	
}


//下一步操作
function nextStep(step){
	
		billsDateBegin=$('#startTimeStr').val();
		billsDateEnd=$('#endTimeStr').val();
		if(billsDateEnd==''){
			$.zxsaas_plus.showalert("提示","请先选择业务时间");
			return;
		}
		if(listArr.length==0){
			$.zxsaas_plus.showalert("提示","请先选择要查询的类型");
			return;
		}
		
		//判断起止日期是否是同一个月 2015-05-05 年度不同或者月份不同
		if(billsDateBegin.substring(5, 7) != billsDateEnd.substring(5, 7) || billsDateBegin.substring(0, 4) != billsDateEnd.substring(0, 4) ){
			$.zxsaas_plus.showalert("提示","起止日期必须在同一个月");
			return;
		}
		
		//切换顶部进度条
		$('.stepList li:eq('+step+')').removeClass('nowStep');
		step++;
		isGoBack(step);
		$('.stepList li:eq('+step+')').addClass('nowStep');
		
		//执行操作
		if(step==1){
			$('#jqGrid_receipts_list').setGridParam({
				postData:{queryPara:JSON.stringify({
					sectionId:sectionId,
					billsDateBegin:billsDateBegin+" 00:00:00",
					billsDateEnd:billsDateEnd+" 23:59:59",
					contactsunitIds:contactsunitIds,
					managersUids:managersUids,
					billsTypeList:listArr
				})}
		    }).trigger("reloadGrid");
			
			$('.queryContainer').hide();
			$('.module_group_tableBox').hide();
			$('.receipts_list_tableBox').show();
			$('#jqGrid_receipts_list').jqGrid({
				url: basePath+"/cw/voucher/pageBills",
				mtype:"POST",
		//		datatype: "jsonstring",
		//	    datastr: mydata,
				datatype: "json",
				//data:mydata,
				//datatype:"local",						
				jsonReader  : {	
					root:"data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
				},
				postData:{queryPara:JSON.stringify({
					sectionId:sectionId,
					billsDateBegin:billsDateBegin+" 00:00:00",
					billsDateEnd:billsDateEnd+" 23:59:59",
					contactsunitIds:contactsunitIds,
					managersUids:managersUids,
					billsTypeList:listArr
				})},
			   /* treeReader : {
			        //level_field: "level",
			        parent_id_field: "parentId",
			        leaf_field: "isLeaf"
			        //expanded_field: "expanded"
			    },*/
				colNames:['id','companyId','contactsunitId','sectionId','managersUid','createBy','单据前缀','合并号','单据类型','单据日期','单据编号','往来单位','部门','经手人','制单人','凭证日期'],          
			    colModel:[
			              	{name:'id',index:'id',hidden:true},
			              	{name:'companyId',index:'companyId',hidden:true},
			              	{name:'billsPrefixCode',index:'billsPrefixCode',hidden:true},
			              	{name:'contactsunitId',index:'contactsunitId',hidden:true},
			              	{name:'sectionId',index:'sectionId',hidden:true},
			              	{name:'managersUid',index:'managersUid',hidden:true},
			              	{name:'createBy',index:'createBy',hidden:true},
			              	{name:'hbHao',index:'hbHao',width:50,align:'center', sorttype:'string',sortable:false},
			              	{name:'billsType',index:'billsType',width:150,align:'center', sorttype:'string',sortable:false},
			              	{name:'billsDateStr',index:'billsDateStr', width:100,align:'center', sorttype:'string',sortable:false},
			              	{name:'billsCode',index:'billsCode', width:150,align:'center', sorttype:'string',sortable:false},
			              	{name:'contactsunitName',index:'contactsunitName', width:100,align:'center', sorttype:'integer',sortable:false},
			              	{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:'integer',sortable:false},
			              	{name:'managersName',index:'managersName', width:100,align:'center', sorttype:'integer',sortable:false},
			              	{name:'createName',index:'createName', width:100,align:'center', sorttype:'integer',sortable:false},
			              	{name:'voucherDate',index:'voucherDate', width:100,align:'center', sorttype:'integer',hidden:true,sortable:false,
			              		formatter:function(cellvalue, options, rowObject){
			              			return billsDateEnd;
			              	    }
			              	}
			              ],
			    //loadonce: false,
			    sortable:false,			            
			    rownumbers:true,
			    //loadonce: true,
			    rowNum: 15,
			    pager:"#jqGrid_maker_footer",
			    viewrecords: true,		           
			    multiselect:true,
			   	cellEdit:false,		//点击行勾选复选框
			    width: "100%" ,
			    height: $(window).height()*0.5,
			    //scroll:true,
			    //treeGrid: true,
			    //treeGridModel: 'adjacecncy',
			    //treedatatype: "local",
			   // ExpandColumn: 'subjectCode',
			    /*altRows:true,
			    altclass:'.grid-row-odd',*/
				autowidth:true,
				autoScroll:false,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				userDataOnFooter:true,//设置userData 显示在footer里
				onSelectRow:function(rowid,status){
					var list=$('#jqGrid_receipts_list').getRowData(rowid);
					Array.prototype.contains = function(obj) {
						  var i = this.length;
						  while (i--) {
						    if (this[i].id === obj.id) {
						      return i;
						    }
						  }
						
						}
					if(!status){
						billsList.splice(billsList.contains(list),1);
					}else{
						billsList.push(list);
					}
				},
				onSelectAll:function(aRowids,status){
					if(status){
						selectAll=true;
						billsList=[];
					}else{
						selectAll=false;
						billsList=[];
					}
					
				},
				gridComplete: function() {
		//			footerData();
				},
				loadComplete:function(data){
					voucherList=data.data.rows;
				},
				loadError:function(xhr,status,error){
					
				}
			})
			
		}
		
	
		if(step==2){
		//从后台请求部门数据
			$('.nextStep').hide();
			$.ajax( {
				type : 'post',
				url : basePath + '/cw/voucher/generate',
				dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				data:{param:JSON.stringify({
					selectAll:selectAll,
					query:{
						sectionId:sectionId,
						billsDateBegin:billsDateBegin+" 00:00:00",
						billsDateEnd:billsDateEnd+" 23:59:59",
						contactsunitIds:contactsunitIds,
						managersUids:managersUids,
						billsTypeList:listArr
					},
					billsList:billsList
				})},
				success : function(data) {
					if(data.result==1){
						$('.mainbody').hide();
						$('.resultBox').show();
						$('.resultBox .resultDesc').html(data.desc);
						$('#queryFine').show()
						$('#queryFine').click(function(){
							parent.openWorkBoxByMenutext2('凭证单据对照表','/manager/finance/voucherCertificate/toPage');
						})
					}else{
						$('.receipts_list_tableBox').hide();
						$('.resultBox').show();
						$('.resultDesc').text(data.desc);
						$('#queryFine').hide()
//						$.zxsaas_plus.showalert("提示","请先选择业务时间");
					}
					console.log(data);
					//打开模态框
	//				$('#branchModal').modal('show');
	//				$.fn.zTree.init($("#branchTree"), setting, data);
	//				var zTree = $.fn.zTree.getZTreeObj("branchTree");
	//				zTree.expandAll(true);// 展开全部节点
				},
				error : function(msg) {
					alert(" 数据加载失败！" + msg);
				}
		});
		}
//		return;
	
}


//初始化部门树

function branchTree(){
	
	//树设置参数
	var setting = {
		
		data : {
			simpleData : {
				enable : true,
				idKey : "code",
				pIdKey : "pCode",
				rootPId : null
			}
		},
		check : {
			enable : false
		},
		callback: {
            onClick: function (event, treeId, treeNode) {
            	if(treeNode.check_Child_State==-1){
//                		nodeId=treeNode.id;
//                		nodeName=treeNode.name;
            	}
            },
            onDblClick:function(event, treeId, treeNode){
            	if($(event.target).is('span')){
            		if(treeNode.check_Child_State==-1){
            			companyId=treeNode.obj.companyId;
            			$('.branch').val(treeNode.name);
            			sectionId=treeNode.obj.id;
            			$('.maker').val('');
            			$('#branchModal').modal('hide');
                	}
            	}
            }
        },
		view : {
			showIcon : false
		}
	};
	

	//从后台请求部门数据
	$.ajax( {
		type : 'Get',
		url : basePath + '/section/findTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:{
			status:0,
			companyId:companyId,
			opEmpId:opEmpId
		},
		success : function(data) {
			//打开模态框
			$('#branchModal').modal('show');
			$.fn.zTree.init($("#branchTree"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("branchTree");
			zTree.expandAll(true);// 展开全部节点
		},
		error : function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
};

function makerTree(){
	if(sectionId){
		$('#jqGrid_maker_list').jqGrid({
			url: basePath+"/Temployee/page",
			mtype:"POST",
			datatype: "json",
			jsonReader  : {	
				root:"rows",
				page: "page",
		        total: "total",
		        records: "records",
				repeatitems: false
			},
			postData:{
				sectionId:sectionId
			},
			colNames:['名称','编码','所属部门','职位'],          
		    colModel:[
		              	{name:'name',index:'name',align:'center',width:'300px', sorttype:'string',sortable:false},
		              	{name:'code',index:'code', align:'center',width:'300px', sorttype:'string',sortable:false},
		              	{name:'sectionName',index:'sectionName', width:'300px',align:'center', sorttype:'string',sortable:false},
		              	{name:'jobName',index:'jobName',align:'center',width:'300px', sorttype:'integer',sortable:false},
		              ],
		    sortable:false,			            
		    rownumbers:true,
		    rowNum: 15,
		    pager:"#jqGrid_maker_list_footer",
		    viewrecords: true,		           
		    multiselect:false,
		    width: "100%" ,
		    height: $(window).height()*0.3,
			autowidth:true,
			autoScroll:false,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			// userDataOnFooter:true,//设置userData 显示在footer里
		
			ondblClickRow:function(rowid,iRow,iCol,e){
				managersUids=rowid;
				$('.maker').val($("#jqGrid_maker_list").getRowData(rowid).name);
				$('#makerModal').modal('hide');
			},
	
			gridComplete: function() {
	//			footerData();
			},
			loadComplete:function(data){
				
			},
			loadError:function(xhr,status,error){
				
			}
		})
		$("#jqGrid_maker_list").setGridParam({
            		    	    postData:{sectionId:sectionId}
            			    }).trigger("reloadGrid").resize();
		$('#makerModal').modal('show');
	}else{
		$.zxsaas_plus.showalert("提示","请先选择对应部门");
	}	
	

//	//从后台请求部门数据
//	$.ajax( {
//		type : 'Get',
//		url : basePath + '/section/findTree',
//		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
//		success : function(data) {
//			//打开模态框
//			$('#branchModal').modal('show');
//			$.fn.zTree.init($("#branchTree"), setting, data);
//			var zTree = $.fn.zTree.getZTreeObj("branchTree");
//			zTree.expandAll(true);// 展开全部节点
//		},
//		error : function(msg) {
//			alert(" 数据加载失败！" + msg);
//		}
//	});
};

function btypeTree(){
	
	//树设置参数
	var setting = {
		
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "pid",
				rootPId : null
			}
		},
		check : {
			enable : false
		},
		callback: {
            onClick: function (event, treeId, treeNode) {
            	if(treeNode.check_Child_State==-1){
//                		nodeId=treeNode.id;
//                		nodeName=treeNode.name;
            	}
            },
            onDblClick:function(event, treeId, treeNode){
            	if($(event.target).is('span')){
            		if(treeNode.check_Child_State==-1){
            			$('.btype').val(treeNode.name);
            			
            			$('#btypeTreeModal').modal('hide');
                	}
            	}
            }
        },
		view : {
			showIcon : false
		}
	};
	

	//从后台请求部门数据
	$.ajax( {
		type : 'post',
		url : basePath + '/TunitClass/findTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:{
		   companyId:companyId
		},
		success : function(data) {
			//打开模态框
			$('#btypeTreeModal').modal('show');
			$.fn.zTree.init($("#btypeTreeTree"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("btypeTreeTree");
			zTree.expandAll(true);// 展开全部节点
		},
		error : function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
};

//更改模块
function changeModule(modelName){
	
	$("#jqGrid_module_group").setGridParam({
	    postData:{modelName:modelName}
    }).trigger("reloadGrid");
	listArr=[];
}

function changeGroup(groupName){
	
	$("#jqGrid_module_group").setGridParam({
	    postData:{groupName:groupName}
    }).trigger("reloadGrid");
	listArr=[];
}
//初始化表单
$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$('#jqGrid_module_group').jqGrid({
	url: basePath+"/cw/voucher/findBillsType",
	mtype:"POST",
//	datatype: "jsonstring",
//    datastr: mydata,
	datatype: "json",
	//data:mydata,
	//datatype:"local",						
	jsonReader  : {	
		root:"data.dataList",
		page: "data.page",
        total: "data.total",
        records: "data.records",
		repeatitems: false
			},
   /* treeReader : {
        //level_field: "level",
        parent_id_field: "parentId",
        leaf_field: "isLeaf"
        //expanded_field: "expanded"
    },*/
	colNames:['billsQz','模块','业务分组','单据类型','tableName'],          
    colModel:[
              	{name:'billsQz',index:'billsQz',hidden:true,sortable:false},
              	{name:'modelName',index:'modelName', width:50,align:'center', sorttype:'string',sortable:false},
              	{name:'groupName',index:'groupName', width:50,align:'center', sorttype:'string',sortable:false},
              	{name:'billsType',index:'billsType', width:50,align:'center', sorttype:'integer',sortable:false},
              	{name:'tableName',index:'tableName',hidden:true,sortable:false}
              ],
    //loadonce: false,
    sortable:false,			            
    rownumbers:true,
    //loadonce: true,
    rowNum: 0,
    viewrecords: true,		           
    multiselect:true,
   	cellEdit:false,		//点击行勾选复选框
//    width: "100%" ,
    height: $(window).height()*0.7,
    //scroll:true,
    //treeGrid: true,
    //treeGridModel: 'adjacecncy',
    //treedatatype: "local",
   // ExpandColumn: 'subjectCode',
    /*altRows:true,
    altclass:'.grid-row-odd',*/
	autowidth:true,
	autoScroll:false,
	rownumWidth: 35, // the width of the row numbers columns
	shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	userDataOnFooter:true,//设置userData 显示在footer里
	onSelectRow:function(rowid,status){
				var list=$('#jqGrid_module_group').getRowData(rowid);
				list.rowid=rowid;
				Array.prototype.contains = function(obj) {
					  var i = this.length;
					  while (i--) {
					    if (this[i].rowid === obj.rowid) {
					      return i;
					    }
					  }
					
					}
				if(!status){
					listArr.splice(listArr.contains(list),1);
				}else{
					listArr.push(list);
				}
	},
	
	onSelectAll:function(aRowids,status){
		if(status){
			listArr=dataList;
		}else{
			listArr=[];
		}
	},

	gridComplete: function() {
//		footerData();
	},
	loadComplete:function(data){
		dataList=data.data.dataList;
	},
	loadError:function(xhr,status,error){
		
	}
})

