/*global vari*/
var baseAftEditCellRowId ="";
var baseAftEditCellCellName ="";
var baseAftEditTableName ="";
$(document).on("blur","td>input",function(){
	saveLstCell();
});
function saveLstCell(){
	$(baseAftEditTableName).jqGrid("saveCell",baseAftEditCellRowId,baseAftEditCellCellName);
}
$(function(){
	loadmodal();
	initTree();
});

function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
            url: "/manager/Tgoodsclass/findTree2?groupId="+$("#groupId").val(),
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
        	onClick:function(event, treeId, treeNode){
        	if(treeNode.name=='商品资料'){
				$("#mainGrid").jqGrid('setGridParam',{  
			        datatype:'json',
			        page:1,
			        postData:{"goodsType":""}
			    }).trigger("reloadGrid"); //重新载入
			  }
        	else{
        		$("#mainGrid").jqGrid('setGridParam',{  
			        datatype:'json',
			        page:1,
			        postData:{"goodsType":treeNode.id}
			    }).trigger("reloadGrid"); //重新载入
        	}
        }
			
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#goodsClassify"), setting);
	var zTree = $.fn.zTree.getZTreeObj("goodsClassify");
    zTree.expandAll(true);  
};





/***************************表格******************************/
function loadmodal(){
	                		var options = {
	                		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	                		LoadTableUrl: "/manager/jxc/authority/barCode/selectList",
	                		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	                		DelRowUrl: "", // 删除信息接口地址
	                		isSub:"",//是否有子级表格
	                		subLoadTableUrl:"",//子级表格数据来源地址
	                		TableName: "#mainGrid", //显示表格名称。遵照css选择器书写
	                		iconJsonUrl:"../json/icon.json",
	                		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	                		pager:"#mainPager"
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
	                		    var colNames= ["商品id","条码id","商品编码","商品名称","型号","颜色","条码","备注","零售价","售价一","售价二","售价三","售价四","售价五","修改人","修改时间"];          
	                			var JqGridColModel=[				
	                			          				{name:"id",index:"id",align:"center",width:100,hidden:true},
	                			          				{name:"sid",index:"sid",align:"center",width:100,hidden:true},
	                									{name:"code",index:"code",align:"center",width:90,sortable:false},
	                									{name:"name",index:"name",align:"center",width:90,sortable:false},
	                									{name:"goodsModel",index:"goodsModel",align:"center",width:90,sortable:false},
	                									{name:"colorName",index:"colorName",align:"center",width:100,sortable:false},
	                									{name:"no",index:"no",align:"center",width:100,sorttype:'string'},
	                									{name:"remark",index:"remark",align:"center",width:100,sorttype:'string'},
	                									{name:"price",index:"price",align:"center",width:100,sortable:false},
	                									{name:"price1",index:"price1",align:"center",width:100,sortable:false},
	                									{name:"price2",index:"price2",align:"center",width:100,sortable:false},
	                									{name:"price3",index:"price3",align:"center",width:100,sortable:false},
	                									{name:"price4",index:"price4",align:"center",width:100,sortable:false},
	                									{name:"price5",index:"price5",align:"center",width:100,sortable:false},
	                									{name:"empName",index:"empName",align:"center",width:100,sortable:false},
	                									{name:"timeStr",index:"timeStr",align:"center",width:100,sortable:false}
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
	                			            cellEdit:true,
	                			            cellsubmit:'clientArray',
	                			            editurl: 'clientArray',
	                			            sortable:false,			            
	                			            rowNum: 20,
	                			            rowList: [20, 25, 40,100],
	                			            pager:options.pager,
	                			            viewrecords: true,		           
	                			            multiselect:true,
	                			            width: "100%" ,
	                			            height: $(window).height()*0.65,
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
	                						afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
	                							baseAftEditTableName=options.TableName;
	                							baseAftEditCellRowId =iRow;
	                							baseAftEditCellCellName = iCol;
	                						},
	                						gridComplete: function() {
	                							var ids=$(options.TableName).jqGrid("getDataIDs");

	                						},
	                						loadComplete:function(data){
	                							companyName = data.data.companyName;
	                							groupName = data.data.groupName;
	                						},
	                						loadError:function(xhr,status,error){
	                						}
	                						})
	                		
	                			}
	                }


//查询
$(document).on('click', '.selectBtn',function(e){
	$("#mainGrid").jqGrid('setGridParam',{  
        datatype:'json',
        postData:{"keyword":$("#selectQuery").val()}
    }).trigger("reloadGrid"); //重新载入
});
				

//导出全部
function exportAllCode(){
	window.location.href="/manager/jxc/authority/barCode/export/1";	
}

//导出选中部分
function exportCode(){
	
	var checkedIdList= $("#mainGrid").jqGrid('getGridParam','selarrrow');//获取选中行的id
	if(checkedIdList.length==0){
		 $.zxsaas_plus.showalert("提示","请选择要导出的数据");
	}
	else{
		window.location.href= '/manager/jxc/authority/barCode/export/2?ids='+checkedIdList;	
	}
}

/*点击修改可编辑*/
$(document).on("click",".modify",function(){
	 $.zxsaas_plus.showalert("提示","页面已处于可修改状态");
	$("#mainGrid").setColProp('no',{editable:true});   
	$("#mainGrid").setColProp('remark',{editable:true});  
	  
});   
/*点击保存不可编辑*/
$(document).on("click",".save",function(){
	$("#mainGrid").setColProp('no',{editable:false});   
	$("#mainGrid").setColProp('remark',{editable:false});  
	
	var objList=[];
	var ids = $("#mainGrid").jqGrid("getDataIDs");
	
	for(var i=0;i<ids.length;i++){
	    var rowData = $("#mainGrid").jqGrid("getRowData",ids[i]);
		var obj={};
		obj.id = rowData.id;
		obj.sid = rowData.sid;
		obj.no = rowData.no;
		obj.remark = rowData.remark;
		objList.push(obj);
	}

	
	 $.ajax({
         type: 'POST',
         url: '/manager/jxc/authority/barCode/save',
         datatype : "json",
		 contentType: "application/json",
		 data: JSON.stringify(objList),
		 traditional: true,
         success: function (data) {
			 $("#mainGrid").trigger("reloadGrid");
			 $.zxsaas_plus.showalert("提示",data.desc);
		          },
         error: function (msg) {
             alert(" 数据加载失败！" + msg);
         }
     });
});   