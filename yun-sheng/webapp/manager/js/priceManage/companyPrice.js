
initTree();
var globalID=null,
    globalName=null;
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
//            url: "/manager/priceManage/findTree?companyId="+$(".companySe option:selected").data("id"),
            url: "/manager/TunitClass/findTree?companyId="+$(".companyId").attr("id"),
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
        	onClick:function(event,treeID,treeNod){
        	  globalID=treeNod.id;
        	  globalName=treeNod.name;
//        	   $.request({
//           		url:"/manager/priceManage/contactsunitSaleList",
//           		type:"GET",
//           		dataType:"json",
//           		data:{
//        		    name:$(".filterInput").val(),
//		        	companyId:$(".companySe option:selected").data("id"),
//		        	contactsunitId:globalID,
//		        	contactsunitName:globalName
//		        	},
//           		success:function(data){
//           			
//           		 $("#mainGrid").jqGrid("clearGridData");
//           			 for(var i=0;i<data.data.contactsunitPriceVoList.length;i++){
//           				  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.contactsunitPriceVoList[i]);
//           			  }
//           			
//           		}
//           	})
        	  $("#mainGrid").setGridParam( //G,P要大写
        			    {
        			    url:'/manager/priceManage/contactsunitSaleList',
        			    postData:{
        			    	keyWord:$(".searchInput").val(),
        					companyId:$(".companyId").attr("id"),
        					typeId:globalID==0? null : globalID
        					},
        				page:1
        			    }
        			).trigger("reloadGrid");
        }
			
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#companyType"), setting);
	var zTree = $.fn.zTree.getZTreeObj("companyType");
    zTree.expandAll(true);  
};

(function(){
	 /**
	 * 表格初始化
	 */
	
				
				$.jgrid.defaults.width =500;
				$.jgrid.defaults.responsive = true;
				$.jgrid.defaults.styleUI = 'Bootstrap';	
				
						$("#mainGrid").jqGrid({
							url:"/manager/priceManage/contactsunitSaleList",
							mtype:"POST",
					//		datatype: "jsonstring",
					//        datastr: mydata,
							datatype: "json",
							//data:mydata,
							//datatype:"local",						
							jsonReader  : {	
									root: "data.contactsunitPriceVoList",
									repeatitems: false,
									page:"data.page",
									total:"data.pageCount",
									records:"data.totalCount"
										},
					       /* treeReader : {
					            //level_field: "level",
					            parent_id_field: "parentId",
					            leaf_field: "isLeaf"
					            //expanded_field: "expanded"
					        },*/
							colNames:["单位编码","单位名称","所属类型","联系人","联系方式","助记码","备注","预设售价","ID","往来单位价格ID","团队ID",'类型ID'],        
					        colModel:[
										
										{name:"code",index:"code",align:"center",sorttype:"string",width:100,sortable:false},
										{name:"name",index:"name",align:"center",sorttype:"string",width:100,sortable:false},
										{name:"typeName",index:"typeName",align:"center",sorttype:"string",sortable:false,width:100},
										{name:"linkman",index:"linkman",align:"center",sorttype:"string",width:100,sortable:false},
										{name:"contact",index:"contact",align:"center",sorttype:"number",width:100,sortable:false},
										{name:"remCode",index:"remCode",align:"center",sorttype:"string",width:100,sortable:false},
										{name:"remark",index:"remark",align:"center",sorttype:"string",width:100,sortable:false},
										{
											name:"newPresetPrice",
											index:"newPresetPrice",
											align:"center",
											sorttype:"string",
											edittype:"select",
											editable:true,
											width:100,
											editoptions:{
												value:'"售价一":售价一;"售价二":售价二;"售价三":售价三;"售价四":售价四;"售价五":售价五;"零售价":零售价'
												},sortable:false
												},
										{name:"id",index:"id",align:"center",sorttype:"number",width:100,hidden:true,hidedlg:true},
										{name:"contactunitPriceId",index:"contactunitPriceId",align:"center",sorttype:"number",width:100,hidden:true,hidedlg:true},
										{name:"groupId",index:"groupId",align:"center",sorttype:"number",width:100,hidden:true,hidedlg:true},
										{name:"typeId",index:"typeId",align:"center",sorttype:"number",width:100,hidden:true,hidedlg:true}
					                ],
					        //loadonce: false,
					        pager:"#mainPager",
							rowNum: 10,
							rowList: [10, 15, 20, 25, 40],		
					        sortable:false,			            
					        rownumbers:true,
					        prmNames : {  
					            page:'page',    // 表示请求页码的参数名称  
					            rows:'pageSize',    // 表示请求行数的参数名称  
					            sort: null, // 表示用于排序的列名的参数名称  
					            order: null, // 表示采用的排序方式的参数名称  
					            search:null, // 表示是否是搜索请求的参数名称  
					            nd:null, // 表示已经发送请求的次数的参数名称  
					            id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
					            
					        },
					        cellsubmit:"clientArray",
					        postData:{
					        	keyWord:$(".searchInput").val(),
					        	companyId:$(".companyId").attr("id"),
					        	contactsunitId:globalID,
					        	contactsunitName:globalName
					        },
					        viewrecords: true,		           
					//        multiselect:true,
					       	cellEdit:true,
					       	multiselect:true,
					        width: "100%" ,
					        height: $(window).height()*0.45,
					        //scroll:true,
					        //treeGrid: true,
					        //treeGridModel: 'adjacecncy',
					        //treedatatype: "local",
					       // ExpandColumn: 'subjectCode',
					        /*altRows:true,
					        altclass:'.grid-row-odd',*/
							autowidth:true,
							rownumWidth: 35, // the width of the row numbers columns
							shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
//							footerrow:true,  //设置表格显示表脚
							userDataOnFooter:true,//设置userData 显示在footer里
							
							ondblClickRow:function(id){
							
									
							},
							onCellSelect:function(id,index,e){
								
							},
							onSelectRow:function(id){
								
								
								
							
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
								//console.log(status)
							},
							beforeEditCell:function(rowid,cellname,v,iRow,iCol){
								lastrow = iRow;
								lastcell = iCol;
							}
							})
})();
/**
 * 公司改变后触发事件
 */
$(".companySe").change(function(){
	lastrow!=undefined&&$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);

//	$.request({
//		url:'/manager/priceManage/contactsunitSaleList',
//		type:"POST",
//		dataType:'json',
//		data:{
//			keyWord:$(".filterInput").val(),
//			companyId:$(".companySe option:selected").data("id"),
//			contactsunitId:globalID,
//			contactsunitName:globalName,
//			page:1
//			},
//		success:function(data){
//		   
//			 $("#mainGrid").jqGrid("clearGridData");
//			 for(var i=0;i<data.data.contactsunitPriceVoList.length;i++){
//				  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.contactsunitPriceVoList[i]);
//			  }
//		}
//	})
	$("#mainGrid").setGridParam( //G,P要大写
		    {
		    url:'/manager/priceManage/contactsunitSaleList',
		    postData:{
		    	keyWord:$(".searchInput").val(),
				companyId:$(".companyId").attr("id"),
				typeId:null
				},
			page:1
		    }
		) .trigger("reloadGrid");
	
	initTree();
})
/**
 * 过滤的事件
 */
$(".searchInput").keyup(function(){
	lastrow!=undefined&&$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
//	$.request({
//		url:'/manager/priceManage/contactsunitSaleList',
//		type:"POST",
//		dataType:'json',
//		data:{
//			name:$(".filterInput").val(),
//			companyId:$(".companySe option:selected").data("id"),
//			contactsunitId:globalID,
//			contactsunitName:globalName
//			},
//		success:function(data){
//		   
//			 $("#mainGrid").jqGrid("clearGridData");
//			 for(var i=0;i<data.data.contactsunitPriceVoList.length;i++){
//				  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.contactsunitPriceVoList[i]);
//			  }
//		}
//	})
	$("#mainGrid").setGridParam( //G,P要大写
		    {
		    url:'/manager/priceManage/contactsunitSaleList',
		    postData:{
		    	keyWord:$(".searchInput").val(),
				companyId:$(".companyId").attr("id"),
				typeId:globalID
				},
			page:1
		    }
		).trigger("reloadGrid");
})
var lastrow;
$(document).on('click','.sureBtn',function(){
	var arrLen=$('#mainGrid').jqGrid('getGridParam', 'selarrrow');
	if(!arrLen.length){
		$.zxsaas_plus.showalert('warning','未选择数据');
		return;
	}
	
	lastrow!=undefined&&$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
	
	$("#mainGrid tr[aria-selected=true]").each(function(){
		$(this).find('td').eq(9).html($(".priceVal").val());
	})
	var arr=[];
	var temp=[];
	
	$("#mainGrid tr").each(function(){
		this.id&&temp.push(this.id);
	})
	for(var i=0,len=temp.length;i<len;i++){
		
		arr.push($("#mainGrid").jqGrid("getRowData",temp[i]))
	}
	
	$.request({
		url:'/manager/priceManage/saveContactsunitSale',
		type:"POST",
		dataType:'json',
		data:{
			keyWord:$(".searchInput").val(),
			companyId:$(".companyId").attr("id"),
	//				contactsunitId:globalID,
			typeId:globalID,
			valList:JSON.stringify(arr)
		},
		success:function(data){
			$.zxsaas_plus.showalert('success','保存成功');
			 $("#mainGrid").jqGrid("clearGridData");
			 var len=data.data.contactsunitPriceVoList.length
			 for(var i=0;i<len;i++){
				  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.contactsunitPriceVoList[i]);
			  }
		}
	})
//	$("#mainGrid").setGridParam( //G,P要大写
//		    {
//			    url:'/manager/priceManage/saveContactsunitSale',
//			    postData:{
//			    	keyWord:$(".filterInput").val(),
//					companyId:$(".companyId").attr("id"),
//	//				contactsunitId:globalID,
//					typeId:globalID,
//					valList:JSON.stringify(arr)
//					},
//				page:1
//				
//		    }
//		).trigger("reloadGrid");
})
//导出
$(document).on('click','#export',function(){
	var arr=[];
	var temp=[];
	$("#mainGrid tr").each(function(){
		this.id&&temp.push(this.id);
	})
	for(var i=0,len=temp.length;i<len;i++){
		
		arr.push($("#mainGrid").jqGrid("getRowData",temp[i]))
	}
	$("#valList").val(JSON.stringify(arr));
	$("#submitForm").attr("action","/manager/priceManage/exportContactsunitSale").submit();
	
})
//退出
$(document).on('click','#quit',function(){
	location.href="/manager/priceManage/showPriceManager";
})
//保存
$(document).on('click','#saveData',function(){
	lastrow!=undefined&&$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
	var arr=[];
	var temp=[];
	
	$("#mainGrid tr").each(function(){
		this.id&&temp.push(this.id);
	})
	for(var i=0,len=temp.length;i<len;i++){
		
		arr.push($("#mainGrid").jqGrid("getRowData",temp[i]))
	}
	
	$.request({
	url:'/manager/priceManage/saveContactsunitSale',
	type:"POST",
	dataType:'json',
	data:{
		keyWord:$(".searchInput").val(),
		companyId:$(".companyId").attr("id"),
//		contactsunitId:globalID,
		typeId:globalID,
		valList:JSON.stringify(arr)
	},
	success:function(data){
		$.zxsaas_plus.showalert('success','保存成功');
		 $("#mainGrid").jqGrid("clearGridData");
		 var len=data.data.contactsunitPriceVoList.length;
		 if(len){
			 for(var i=0;i<len;i++){
				 $("#mainGrid").jqGrid('addRowData', i + 1,data.data.contactsunitPriceVoList[i]);
			 }
		 }else{
			 
		 }
	}
})
	
//	$("#mainGrid").setGridParam( //G,P要大写
//		    {
//		    url:'/manager/priceManage/saveContactsunitSale',
//		    postData:{
//		    	keyWord:$(".filterInput").val(),
//				companyId:$(".companyId").attr("id"),
////				contactsunitId:globalID,
//				typeId:globalID,
//				valList:JSON.stringify(arr)
//				},
//			page:1,
//			success:function(){
//					alert('11')
//				},
//			
//		    }).trigger("reloadGrid");
	
})