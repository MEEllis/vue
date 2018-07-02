$(function() {
//	$("input[data-src]").Input2select();
	String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
	};
//	$("input[data-comsrc]").autocom();
	//-------------------流量------------------------------------
	//现金流量表
	$("#cashFlowTop").jqGrid({
		datatype : "local",
		colNames : ['现金流量科目', '方向', '金额'],
		colModel : [
			{name : 'cashFlowSubjectName',index : 'cashFlowSubjectName',align:'center',width:150},
			{name : 'direction',index : 'direction',align:'center',width:150},
			{name : 'amount',index : 'amount',align:'center',width:150}
		],
		rownumbers:true,
		rowNum : 10,
		cellEdit:true,
		rowList : [ 10, 50, 100 ],
		sortname : 'id',
		styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
		viewrecords : true,
		autowidth : true,
//			multiselect : true,//首列select
//			multiboxonly : true,
		sortorder : "asc",
		caption : "",
		footerrow:true,
		height:245,
//			pager:"#cashFlowTopPager",
	});
//	$.getJSON('../../html/cw/SubTable.json',function(t){
//		var data=[];
//		$.each(t, function (e, val) {
//			data.push(t[e])
//		});
//		for(var i=0;i<=data.length;i++)
//			$("#cashFlowTop").jqGrid('addRowData',i+1,data[i]);
//	});
	$("#cashFlowTop").footerData("set", { "id":'合计：<font color="red" style="height:40px;"></font>',"accounttype":'金额合计：<font color="red" >元</font>'},false);
//	$('#cashFlowTop').jqGrid('navGrid', '#cashFlowTopPager', {edit : false,add : false,del : false});
	var lastrow2 = ""; 
	var lastcell2 = "";
	$(document).on('focusout','#cashFlowBottom input',function(){
		$("#cashFlowBottom").jqGrid("saveCell",lastrow2,lastcell2);
	})
	var BottomSelectId=null;
	$("#cashFlowBottom").jqGrid({
		datatype : "local",
		colNames : ['id','操作','流量项目', '方向', '金额'],
		colModel : [
        	{name : 'flowItemId',index :'flowItemId',hidden:true},
			{name : 'handle',index : 'handle',align:'center',width:60,sortable:false,formatter:function(cellvalue, options, rowObjec){
				return '<div class=""><span class="glyphicon glyphicon-plus ADDROW" title="添加行"></span><span class="glyphicon glyphicon-trash DELROW" title="删除行"></span></div>';
			}},
			{name : 'flowItemName',index : 'flowItemName',align:'center',width:400,sortable:false},
			{name : 'direction',index : 'direction',align:'center',sortable:false},
			{name : 'amount',index : 'amount',align:'center',sortable:false,editable:true}
		],
		rownumbers:true,
		rowNum : 10,
		cellEdit:true,
		cellsubmit: 'clientArray',
		rowList : [ 10, 50, 100 ],
		sortname : 'id',
		styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
		viewrecords : true,
		autowidth : true,
//		multiselect : true,//首列select
//		multiboxonly : true,
		sortorder : "asc",
		caption : "",
		footerrow:true,
		height:245,
//		pager:"#cashFlowTopPager",
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow2 = iRow; 
			lastcell2 = iCol;
		},
		onCellSelect:function(id,index,name){//点击单元格事件
			if(index==3){
				BottomSelectId=id;
				$("#smflowTable").trigger("reloadGrid");
				$("#myModal_smflow").modal('show');
				flowtree()
				flowTable()
			}
		},
	});
	$("#cashFlowBottom").footerData("set", { "id":'合计：<font color="red" style="height:40px;"></font>',"accounttype":'金额合计：<font color="red" >元</font>'},false);
	//流量辅助弹窗确认按钮
	$('#smflow_sure').click(function(){
		var selectID=$("#smflowTable").getGridParam("selrow");//选中行ID
		if(selectID!=null){
			var rowData=$("#smflowTable").jqGrid("getRowData",selectID);
			$("#cashFlowBottom").jqGrid("setCell",BottomSelectId,"flowItemId",rowData['id']);//改变单元格的值
			$("#cashFlowBottom").jqGrid("setCell",BottomSelectId,"flowItemName",rowData['flowItemName']);//改变单元格的值
			$("#cashFlowBottom").jqGrid("setCell",BottomSelectId,"direction",rowData['flowDirectionName']);//改变单元格的值
			$("#cashFlowBottom").jqGrid("setCell",BottomSelectId,"amount",' ');//改变单元格的值
		}else{
			alert('未选择')
			return false
		}
	})
	//流量增
	$(document).on('click', '.ADDROW',function(){
		var id = $("#cashFlowBottom").jqGrid("getGridParam", "selrow");//index
		var ids = $('#cashFlowBottom').jqGrid('getDataIDs');//[0,1,2,3]
		var maxid=(ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		$('#cashFlowBottom').jqGrid('addRowData',maxid+1, {'handle':'','flowItemName':'','direction':'','amount':''},'after',id);
	})
	//流量删
	$(document).on('click','.DELROW',function(){
		var rowId=$("#cashFlowBottom").jqGrid("getGridParam", "selrow");//index
		if($('#cashFlowBottom tbody tr').length==2) {
			$.zxsaas_plus.showalert("错误","至少保留一条数据!")
			return false;
		}
		$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
			$("#cashFlowBottom").jqGrid('delRowData', rowId);
		},function(){});
	})
	//流量树
	function flowtree(){//科目树
		//公司选择树
		var nodes;
		$.ajax({
			type:'post',
	    	url:basePath+'/cw/pz/searchCashFlowItemClassifyTree',
	    	dataType:'json',
	    	success:function(data){
//			console.log(data)
				nodes = data.data.rows;
				$.fn.zTree.init($("#smflowTree"),{
					data: {simpleData: {enable: true}},
					 view: {
		        		showLine: true
		        	 },
		             callback:{
			             onClick: function(event, treeId, treeNode){
			        		 $("#smflowTable").jqGrid('setGridParam', {  
			     			    datatype:'json',  
			     		        postData:{flowTypeCode:treeNode.id}, //发送数据  
			        		 }).trigger("reloadGrid");
			        	 }
		             }
	            },nodes);
			},
			error:function(){
				alert('请求失败！')
			}
		})
	}
	function flowTable(){
		$("#smflowTable").jqGrid({
			url: basePath + '/cw/pz/searchCashFlowItemList',
	        datatype : "json",
	        colNames : [ 'ID',  '流量类别编码', '流量项目编码', '流量项目名称','流向'],
	        colModel : [ 
	                     {name : 'id',index : 'id',align:'center',width:90,hidden:true},
	                     {name : 'flowTypeCode',index : 'flowTypeCode',align:'center',width:150}, 
	                     {name : 'flowItemCode',index : 'flowItemCode',align:'center',width:150}, 
	                     {name : 'flowItemName',index : 'flowItemName',align:'center',width:400},
	                     {name : 'flowDirectionName',index : 'flowDirectionName',align:'center',width:150},
	                   ],
	        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
//	        pager : '#smflow',
	        jsonReader: {
	            root: "data.itemList",
//	            page: "data.page",
//	            total: "data.total",
//	            records: "data.records",
	            repeatitems: false
	        },
	        mtype: "POST",
	        viewrecords : true,
	        autowidth : true,
	        multiselect : false,
	        multiboxonly : false,
	        caption : "",
	        height:500,
	        ondblClickRow:function(rowid,iRow,iCol,e){
			},
//	        postData:{},
	        loadComplete:function(data){
//				console.log(data)
	        	try {
//	        		console.log(data);
				} catch (e) {

				}
	        }
	      });
	}
	
	//-------------------主页面处理----------------------------------------------------------------------------------------------------------
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//TODO URL需要后台提供，返回数据格式[{"id":1,"order":13,"accountcode":10020,"accountname":"货币资金","accounttype":"资产","mnemonic":"MDFNCN","balancedirection":"借方","auxiliaryaccount":"往来单位","quantityaccount":"否","quantityunit":"元","stoped":"否"},...]
	$(window).resize(function(){
		$("#accountTable").setGridWidth($("#accountTable").parents(".jqGrid_wrapper").width());
	});
	//新增、修改窗口打开时
	$('#newModal').on('show.bs.modal', function (event) {
	  	var button = $(event.relatedTarget);
	  	var recipient = button.data('type');
	  	var modal = $(this);
	  	if(recipient=="new"){
	  		$("#newModal input").val('');
	  	}else if(recipient=="modify"){
	  		
	  	}
	  	
	});
	//-------------------科目对照页面处理------------------------------------
	var lastsel='';
	var grid = $("#kmdzb").jqGrid(
	      {
	        datatype : "local",
	        cellsubmit:"clientArray",
	        colNames : [ '序号', '科目编号', '科目名称', '科目编号', '科目名称'],
	        colModel : [ 
	                     {name : 'id',index : 'id',align:'center',sorttype:"int",width:50}, 
	                     {name : 'kmbh1',index : 'kmbh1',align:'center',width:150}, 
	                     {name : 'kmmc1',index : 'kmmc1',align:'center',width:150}, 
	                     {name : 'kmbh2',index : 'kmbh2',align:'center',width:150}, 
	                     {name : 'kmmc2',index : 'kmmc2',align:'center',width:150,editable:true,sortable:false,edittype:'custom',editoptions:{
				            	custom_element: myelem, 
				            	custom_value:myvalue,
				            	dataInit:function(){
				            		$("#"+lastsel+"_kmmc2").data("autocompletetablesrc","listtable.json");
				            		$("#"+lastsel+"_kmmc2").data("type","table");
				            		$("#"+lastsel+"_kmmc2").data("valin","zyid");
				            		$("#"+lastsel+"_kmmc2").data("namecol","md");
				            		$("#"+lastsel+"_kmmc2").data("valcol","id");
				            		console.log($("#"+lastsel+"_kmmc2").data("valcol"));
				            		$("#"+lastsel+"_kmmc2").autCompleteTable({
				            			thead:'<thead><tr><th>序号</th><th>店名</th></tr></thead>\n',
						  		        tbody:'<tr><td>{{xh}}</td><td>{{md}}</td></tr>\n',
						  		        ontrclick:function(obj,self,valself){
						  		        	console.log(obj);
						  		        	console.log(self);
						  		        	console.log(valself);
						  		        }
				            		});
	
				            	}
						,
            			editable: true // must set editable to true if you want to make the field editable
       					 },
}
	                   ],
	        rowNum : 20000,
	        sortname : 'id',
	        cellEdit:true,
	        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
	        viewrecords : true,
	        sortorder : "asc",
	        height : '100%',
	        caption : "",
	        onCellSelect:function(id,index,e){
	        	lastsel=id;
	        }
	      });
	      
	$("#kmdzb").jqGrid('setGroupHeaders', 
			{ 
				useColSpanStyle: true, 
				groupHeaders:[ 
					{
						startColumnName: 'kmbh1', 
						numberOfColumns: 2, 
						titleText: '2015'
					}, 
					{
						startColumnName: 'kmbh2', 
						numberOfColumns: 2, 
						titleText: '2016'
					} ] 
			});
	var data = {"id":1,"kmbh1":13,"kmmc1":"货币资金","kmbh2":13,"kmmc2":"货币资金"};
	
	var tableData = [];
	for(var i=0;i<100;i++){
		var newData = clone(data);
		newData.id=i+1;
		tableData.push(newData);
	}
	for(var i=0;i<=tableData.length;i++){
		$("#kmdzb").jqGrid('addRowData',i+1,tableData[i]);
	} 
	function clone(obj){  
	    function Fn(){}  
	    Fn.prototype = obj;  
	    var o = new Fn();  
	    for(var a in o){  
	        if(typeof o[a] == "object") {  
	            o[a] = clone(o[a]);  
	        }  
	    }  
	    return o;  
	}
	$("#kmdzb").setGridHeight($(window).height()*0.6 - 40);
	function getData(){
		
	}
	
	//-------------------集团引用页面处理------------------------------------
	var setting = {  
        data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		}
   };
   //jqGrid  custom 列
	function myelem (value, options) {
	  var el = document.createElement("input");
	  el.type="text";
	  el.value = value;
	  return el;
	}
	//jqGrid  custom 列
	function myvalue(elem, operation, value) {
	    if(operation === 'get') {
	       return $(elem).val();
	    } else if(operation === 'set') {
	       $('input',elem).val(value);
	    }
	}
	$.getJSON("../../html/cw/kmTree.json",function(data){
		$.fn.zTree.init($("#jtyrTree"),setting, data);
	});
	
	var grid = $("#jtyr").jqGrid(
	      {
	        datatype : "local",
	        colNames : [ '序号', '级次', '科目编号', '科目名称', '科目类型', '余额方向'],
	        colModel : [ 
	                     {name : 'id',index : 'id',align:'center',sorttype:"int",width:50}, 
	                     {name : 'order',index : 'order',align:'center',width:50}, 
	                     {name : 'accountcode',index : 'accountcode',align:'center',width:80}, 
	                     {name : 'accountname',index : 'accountname',align:'center',width:100}, 
	                     {name : 'accounttype',index : 'accounttype',align:'center',width:80}, 
	                     {name : 'balancedirection',index : 'balancedirection',align:'center',width:100}
	                   ],
	        sortname : 'id',
	        rowNum : 20000,
	        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
	        viewrecords : true,
	        autowidth : true,
	        multiselect : true,
	        multiboxonly : true,
	        sortorder : "asc",
	        height : '100%',
	        caption : ""
	      });
	var data = {"id":1,"order":13,"accountcode":10020,"accountname":"货币资金","accounttype":"资产","balancedirection":"借方"};
	
	var tableData = [];
	for(var i=0;i<100;i++){
		var newData = clone(data);
		newData.id=i+1;
		tableData.push(newData);
	}
	for(var i=0;i<=tableData.length;i++){
		$("#jtyr").jqGrid('addRowData',i+1,tableData[i]);
	} 
	function clone(obj){  
	    function Fn(){}  
	    Fn.prototype = obj;  
	    var o = new Fn();  
	    for(var a in o){  
	        if(typeof o[a] == "object") {  
	            o[a] = clone(o[a]);  
	        }  
	    }  
	    return o;  
	} 
	$("#jtyr").setGridHeight($(window).height()*0.6 - 22);
	
});