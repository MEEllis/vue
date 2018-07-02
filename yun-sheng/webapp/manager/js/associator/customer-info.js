var emp="";
var giftRule=[];
var isGift=0;
var ids;

//设置表格
$(window).on("resize",function(){
	if($(window).width()<1769){
	   $(".right-table").find(".ui-jqgrid-bdiv").height($("#jqGrid_custom").parents(".grid-wrap").height()*0.84);
	}else{
	   $(".right-table").find(".ui-jqgrid-bdiv").height($("#jqGrid_custom").parents(".grid-wrap").height()*0.87);
	}
});
function setGrid(tn){	
	$(tn).setGridWidth($(tn).parents(".grid-wrap").width());
}

function initial(){
	init();
	Tree();	
	//initDataGrid2();
	drawTable("#jqGrid_custom","#jqGridCustom","0");//客户信息管理主表
	drawTable("#jqGrid_wldw","#jqGridPagerWldw","1");//发展人(往来单位)
	drawTable("#jqGrid_sortSign","","4"); //类别标签
 	//drawTable("#jqGrid_mkCardPile","#jqGridPagermkCardPile","1");//批量制卡
 	//drawTable("#jqGrid_cardChoose","#jqGridPagerjqGrid_cardChoose","2");//类型变更
    // loadmodal({TableName: "#jqGrid_cardInfo",pager:"#jqGridPagercI",TableInfo:"0",LoadTableUrl: "../../json/associator/typemanager.json"});
}

/*global var*/
var newRowId ="";

function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];//'发卡公司','发卡部门','发卡人',
		var colName0 = ['id','是否会员','等级','类别标签','客户名称','手机号1','其他联系方式','会员卡号','往来单位','E-mail','QQ','微信账号','支付宝账号','身份证号','出生日期','通讯地址','新增人','新增时间','修改人','修改时间'];  //客户信息管理主表
		colNamec[0]=colName0;
		var colName1 = ['id','往来单位编码','往来单位名称'];  //发展人1(往来单位)
		colNamec[1]=colName1;
		var colName2 = ['id','员工编码','员工名称'];  //发展人2(员工)
		colNamec[2]=colName2;
		var colName3 = ['id','会员卡号','持卡人','手机号'];  //发展人3(会员)
		colNamec[3]=colName3;
		var colName4 = ['操作','编码','标签名称','备注'];  //类别标签
		colNamec[4]=colName4;
		var colName5 = ['增值服务','运营商业务','客户姓名','联系电话','单据类型','单据编号','业务日期','商品类别','商品名称','品牌','型号','颜色','标价','折后价','数量','折后金额','第三方单位','第三方折扣','分期商','首付','分期数','分期余额','主串号','辅串号'];  //消费记录
		colNamec[5]=colName5;
		var JqGridColModelc = [];
		     //客户信息管理主表
		var JqGridColModel0 =[	
                                {name:'id',index:'id', width:100,align:'center',sortable:true,hidden:true},
                                {name:'isVip',index:'is_vip', width:200,align:'center',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},//是否会员
                                {name:'grade',index:'grade', width:100,align:'center',sortable:true},//等级
                                {name:'classLabelName',index:'classLabelName', width:100,align:'center',sortable:true},//类别标签
                                {name:'cardholder',index:'cardholder', width:100,align:'center',sortable:true},//客户名称
								{name:'tel1',index:'tel_1', width:200,align:'center',sortable:true},
								{name:'tel2',index:'tel_2', width:200,align:'center',sortable:true},
								{name:'cardNum',index:'card_num', width:100,align:'center',sortable:true},//会员卡号
								{name:'unitName',index:'unitName', width:100,align:'center',sortable:true},//往来单位
								{name:'emmail',index:'emmail', width:200,align:'center',sortable:true},//E-mail
								{name:'qq',index:'qq', width:200,align:'center',sortable:true},//QQ
								{name:'wechat',index:'wechat', width:200,align:'center',sortable:true},//微信账号
								{name:'alipay',index:'alipay', width:200,align:'center',sortable:true},//支付宝账号
								{name:'certificateno',index:'certificateno', width:100,align:'center',sortable:true},//证件号
								{name:'birthString',index:'birth', width:200,align:'center', sorttype:'string',sortable:true},//出生日期
								{name:'address',index:'address', width:200,align:'center', sortable:true},//通讯地址
								{name:'addName',index:'addName', width:200,align:'center',sortable:true},//新增人
								{name:'createDateString',index:'createDate', width:200,align:'center',sortable:true},//新增时间
								{name:'updateName',index:'updateName', width:200,align:'center',sortable:true},//修改人
								{name:'updateDateString',index:'updateDate', width:200,align:'center',sortable:true},//修改时间
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//发展人1(往来单位)
		var JqGridColModel1 =[
                              {name:'id',index:'id', width:200,align:'center',sortable:false,hidden:true},
							  {name:'code',index:'code', width:200,align:'center',sortable:false},
							  {name:'name',index:'name', width:200,align:'center',sortable:false}
								
			                ];
		JqGridColModelc[1]=	JqGridColModel1;   
		//发展人2(员工)
		var JqGridColModel2 =[
                              {name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
							  {name:'code',index:'code', width:100,align:'center',sortable:false},
							  {name:'name',index:'name', width:100,align:'center',sortable:false}
								
			                ];
		JqGridColModelc[2]=	JqGridColModel2;   
		
		//发展人3(会员) 
		var JqGridColModel3 =[
                              {name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
							  {name:'cardNum',index:'cardNum', width:100,align:'center',sortable:false},
							  {name:'cardholder',index:'cardholder', width:100,align:'center',sortable:false},
							  {name:'tel1',index:'tel1', width:100,align:'center',sortable:false}
								
			                ];
		JqGridColModelc[3]=	JqGridColModel3; 
		
		//类别标签
		var JqGridColModel4 =[
                              {name:'ope',index:'ope', width:100,align:'center',sortable:false,formatter:manage},
							  {name:'code',index:'code', width:100,align:'center',sortable:false},
							  {name:'name',index:'name', width:100,align:'center',sortable:false},
							  {name:'remark',index:'remark', width:100,align:'center',sortable:false}
						
			                ];
		JqGridColModelc[4]=	JqGridColModel4; 
		var JqGridColModel5 =[	
                             {name:'id',index:'id', width:100,align:'center',sortable:true,hidden:true},
                             {name:'order',index:'order', width:100,align:'center',sortable:true},//序号
                             {name:'classS',index:'classS', width:100,align:'center',sortable:true},//等级
                             {name:'signs',index:'signs', width:100,align:'center',sortable:true},//类别标签
                             {name:'clientName',index:'clientName', width:100,align:'center',sortable:true},//客户名称
							{name:'tel1',index:'tel_1', width:200,align:'center',sortable:true},
							{name:'tel2',index:'tel_2', width:200,align:'center',sortable:true},
							{name:'assoNot',index:'assoNot', width:200,align:'center',sortable:true},//是否会员
							{name:'cardNum',index:'card_num', width:100,align:'center',sortable:true},//会员卡号
							{name:'units',index:'units', width:100,align:'center',sortable:true},//往来单位
							{name:'peopS',index:'units', width:100,align:'center',sortable:true},//发展人类型
							{name:'peop',index:'units', width:100,align:'center',sortable:true},//发展人
							{name:'devolpDate',index:'devolpDate', width:200,align:'center',sortable:true},//发展日期
							{name:'email',index:'email', width:200,align:'center',sortable:true},//E-mail
							{name:'qq',index:'qq', width:200,align:'center',sortable:true},//QQ
							{name:'weChat',index:'weChat', width:200,align:'center',sortable:true},//微信账号
							{name:'ipay',index:'ipay', width:200,align:'center',sortable:true},//支付宝账号
							{name:'cardSort',index:'cardSort', width:100,align:'center',sortable:true},//证件类型
							{name:'cardNum',index:'card_num', width:100,align:'center',sortable:true},//证件号
							{name:'birthDay',index:'birthDay', width:200,align:'center', sorttype:'string',sortable:true},//出生日期
							{name:'address',index:'address', width:200,align:'center', sortable:true},//通讯地址
							{name:'newPeo',index:'newPeo', width:200,align:'center',sortable:true},//新增人
							{name:'newTime',index:'newTime', width:200,align:'center',sortable:true},//新增时间
							{name:'modifyPeo',index:'amount', width:200,align:'center',sortable:true}//修改人
			                ];
		JqGridColModelc[5]=	JqGridColModel5;    
		
		//全局当前选择的rowid colid
		var rowid='';
		var colid='';
		var select_name='';
		var defaults = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/associator/typemanager.json",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"",
		TableInfo:"",
		choose:false,
		celledit:false,
		parsHeight:$(window).height()*0.8,
		shrinkFit:true
		};
		var options = $.extend(defaults,options);
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
			var c=options.TableInfo;//参数index
				
			var colNames = colNamec[c];
			var JqGridColModel = JqGridColModelc[c];
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
			            cellEdit:options.celledit,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width:"100%" ,
			            height: options.parsHeight,
						autowidth:true,
						rownumWidth: 35,
						shrinkToFit:options.shrinkFit, 
						multiselect:options.choose,
						multiboxonly:false,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						onCellSelect:function(id,index,cellcontent,e){
						/*	var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
					      	rowid=id;
					      	var ids = $(options.TableName).jqGrid('getDataIDs');
							//获得当前最大行号（数据编号）
							var maxid;
							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
							//当用户点击表格最后一行时,自动增加一行
							
							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );*/
							lastrow = id;
						
						},
						onSelectRow:function(rowid,status){
						},
						beforeSelectRow:function(rowid,e){
							  if(options.TableInfo==3){
                            	  var id=$(options.TableName).jqGrid('getGridParam','selrow');
                            	  if(id==rowid){
                            		  return false;
                            	  }else{
                            	     $(options.TableName).jqGrid("resetSelection");//设置单选   只选中一行
                            	     return true;
                            	  }
                             }
							  else if(options.TableInfo==1){
                            	 var id=$(options.TableName).jqGrid('getGridParam','selrow');
	                           	  if(id==rowid){
	                           		  return false;
	                           	  }else{
	                           	     $(options.TableName).jqGrid("resetSelection")//设置单选   只选中一行
	                           	     return(true);
	                           	  }
                            	 
                             }else if(options.TableInfo==2){
                            	 var id=$(options.TableName).jqGrid('getGridParam','selrow');
	                           	  if(id==rowid){
	                           		  return false;
	                           	  }else{
	                           	     $(options.TableName).jqGrid("resetSelection")//设置单选   只选中一行
	                           	     return(true);
	                           	  }
                            	 
                             }
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
                               
						},
						gridComplete: function() {
						//	var ids=$(options.TableName).jqGrid("getDataIDs");

						},
					
						loadComplete:function(data){
//						    if(options.TableInfo==1){
//						    	$(options.TableName).jqGrid('addRowData', "1", {},'last' );
//						    }
						  if(options.TableName=="#jqGrid_cardInfo"){
							 var h =$(".content2 .right-table").height();
							 $(".content2 .left-tree").css({"height":h});
						  }
						  setGrid(options.TableName);
						},
						loadError:function(xhr,status,error){
						}
						})
		
		}
			
			  function addAndDelete(cellvalue, options, rowObjec){
					var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-edit" id="icon-edit" title="修改" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
					return addAndDel;
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


		    //类别标签修改  删除按钮
		    function manage(cellvalue, options, rowObjec) {
		        return '<span class="update"  data-code="' + rowObjec.code + '" data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '" data-remark="' + rowObjec.remark + '" data-toggle="modal" data-target="#modalSignUpdate" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteSort" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
		    }
     
			 //消费记录查看按钮(增值服务/运行商业务)
		    function search(cellvalue, options, rowObjec) {
		        return '<span class=""  data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '"  data-toggle="modal" data-target="#" style="color:#00CCFF;cursor:pointer;margin-right:40px;">查看</span>';
		    }

		   
		
}
var lastrow="";
var lastcell=""; 

function drawTable(tn,pger,tableinfo){
	if(tableinfo == 0){//客户信息管理
	    loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,parsHeight:$(tn).parents(".grid-wrap").height()*0.87,shrinkFit:false,LoadTableUrl: "/manager/member/customer/selectList",choose:true});
	  //   $(tn).jqGrid('setLabel',1, '选择', 'labelstyle');
	}
	else if(tableinfo == 1){//发展人1(往来单位)
		loadmodal({TableName:tn,pager:pger,TableInfo:1,LoadTableUrl: "/manager/authority/contactInfo/selectContactUnitList",choose:true});
	}
	else if(tableinfo ==2){//发展人2
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
	}else if(tableinfo == 4){//类别标签
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/customer/selectClassLabelList"});	
	}else if(tableinfo == 5){//消费记录
	    loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
     }
}


/***************************************************************************************************/


/**
 * 树结构
*/
function Tree(){
	var ptId = $(this).parents("table").attr("id");
	var setting = {  
			callback: {
				onClick: function (event, treeId, treeNode, msg) {
					$("#jqGrid_custom").jqGrid('setGridParam',{  
				        datatype:'json',  
				        postData:{"cid":treeNode.id}, //发送数据  
				        page:1
				    }).trigger("reloadGrid"); //重新载入
				},
				onDblClick: function(event, treeId, treeNode){
			}
			},
			view: {
				showIcon: false
			}
	    }; 
	     $.request({
	            type: 'Get',
	            url: '/manager/member/customer/initTree',//树结构地址
	            dataType: "json", 
	            success: function (data) {
			    	 if(data.data.labelList){
			    		    $.fn.zTree.init($("#sort-tree"), setting, data.data.labelList);
			                var zTree1 = $.fn.zTree.getZTreeObj("sort-tree");
		                	zTree1.expandAll(true);//展开全部节点
		                	
		                	$("#classLabelId").html("");
		                	$("#classLabelId").append("<option value='' selected='selected'>--请选择类别标签--</option>");
		                	for(var i=0;i<data.data.labelList[0].children.length;i++){
		                		var obj =data.data.labelList[0].children[i];
		                		$("#classLabelId").append("<option value='"+obj.id+"'>"+obj.name+"</option>");
		                	}
			    	 }
	            },
	            error: function (msg) {
	            
	            }
	        });
}

//初始化数据
function init(){
	  $.request({
          type: 'Get',
          url: '/manager/member/cardInfo/initCardInfo',//树结构地址
          dataType: "json", 
          success: function (data) {
          		$(".sectionName").val(data.data.sectionName);
          		$(".typeNamePiles").html("");
          		$("#ywy").html("");
          		for(var i=0;i<data.data.empList.length;i++){
          			$("#ywy").append("<option value='"+data.data.empList[i].id+"'>"+data.data.empList[i].code+"-"+data.data.empList[i].name+"</option>");
          		}
          		emp=data.data.perName;
          		for(var i=0;i<data.data.clist.length;i++){
          			$(".typeNamePiles").append("<option value='"+data.data.clist[i].id+"'>"+data.data.clist[i].typeName+"</option>");
          		}
          },
          error: function (msg) {
              
          }
      });
}



/***新增/修改***********************/
//发展日期
$("#devolopDate").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});
//出生日期
	$("#birthDate").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});
//往来单位弹窗
$(document).on("click",".unitCome",function(){
	 loadmodal({TableName:"#jqGrid_wldw2",pager:"#jqGridPagerWldw2",TableInfo:1,LoadTableUrl: "/manager/authority/contactInfo/selectContactUnitList",choose:true});
	 if($(this).closest("div").attr("disabled")!="disabled"){
		 $("#wldw2").modal('show');
	 }
});


//往来单位保存
$(document).on("click",".saveWLDW2",function(e){
	  var id=$("#jqGrid_wldw2").jqGrid('getGridParam','selrow');
	  if(id){
	  var rowData =$("#jqGrid_wldw2").jqGrid('getRowData',id);
	 		 $("#unitComeId").val(rowData.id);
			 $("#unitCome").val(rowData.name);
	  }
});
//grid-wrap
$(document).on("shown.bs.modal","#wldw2",function(){
	 $("#jqGrid_wldw2").setGridWidth($(this).find(".grid-wrap").width());
	 $(this).find(".ui-jqgrid-bdiv").height($(this).find(".modal-body").height()*0.78);
	 $("#cb_jqGrid_wldw2").hide();
});

//发展类型  发展人
$(document).on("change","#fzrType",function(){
	 $("#fzrId").val("");
	 $("#fzrName").val("");
});

$(document).on("click",".fzrName",function(){
	if(!$(this).parents(".field").attr("disabled"))
	   fzrModel();
});

//发展人模态框
function fzrModel(){
	var type=$("#fzrType").val();
	if(type==1){//往来单位
	    loadmodal({TableName:"#jqGrid_wldw",pager:"#jqGridPagerWldw",TableInfo:1,LoadTableUrl: "/manager/authority/contactInfo/selectContactUnitList",choose:true});
		$("#wldw").modal('show');
	}
	else if(type==2){//员工
		 loadmodal({TableName:"#jqGrid_yg",pager:"#jqGridPagerYg",TableInfo:2,LoadTableUrl: "/manager/authority/employeeInfo/selectEmployeeList",choose:true});
		$("#yg").modal('show');
	}
	else if(type==3){//会员
		 loadmodal({TableName:"#jqGrid_hy",pager:"#jqGridPagerHy",TableInfo:3,LoadTableUrl: "/manager/member/facardInfo/selectFzrCard",choose:true});
		 $("#hy").modal('show');
	}
	else{
		$.zxsaas_plus.showalert("提示","请选择发展人类型");
	}
}


//往来单位搜索
$(document).on("click","#wldwQuery2",function(e){
	 jQuery("#jqGrid_wldw2").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$.trim($(".search_wldw").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//往来单位搜索(发展人)
$(document).on("click","#wldwQuery",function(e){
	 jQuery("#jqGrid_wldw").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$.trim($(".search_fzwldw").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//会员搜索
$(document).on("click","#hyQuery",function(e){
	 jQuery("#jqGrid_hy").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyword":$.trim($(".search_hy").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//员工搜索
$(document).on("click","#ygQuery",function(e){
	 jQuery("#jqGrid_yg").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$.trim($(".search_yg").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//保存
var target="";
$(document).on("click",".saveWLDW",function(e){
	  var id=$("#jqGrid_wldw").jqGrid('getGridParam','selrow');
	  var rowData =$("#jqGrid_wldw").jqGrid('getRowData',id);
	 	if($(target).hasClass("unitCome")){
	 		 $("#unitComeId").val(id);
			 $("#unitCome").val(rowData.name);
		 }else{
			 $("#fzrId").val(id);
			 $("#fzrName").val(rowData.name);
		 }
});

$(document).on("click",".saveHY",function(e){
	 var id=$("#jqGrid_hy").jqGrid('getGridParam','selrow');
	 var rowData =$("#jqGrid_hy").jqGrid('getRowData',id);
	 $("#fzrId").val(id);
	 $("#fzrName").val(rowData.cardholder);
});
$(document).on("click",".saveYG",function(e){
	 var id=$("#jqGrid_yg").jqGrid('getGridParam','selrow');
	 var rowData =$("#jqGrid_yg").jqGrid('getRowData',id);
	 $("#fzrId").val(id);
	 $("#fzrName").val(rowData.name);
});

//调整表格
$("#wldw").on("shown.bs.modal",function(){
	 $("#jqGrid_wldw").setGridWidth($(this).find(".modal-content").width()-30);
	 $(this).find(".ui-jqgrid-bdiv").height($(this).find(".modal-body").height()*0.78);
	 var width=document.body.scrollWidth;
	 if(width>763||width==763){
		 $(this).find(".ui-jqgrid").css({"borderLeft":"1px solid #cfcfcf","borderRight":"1px solid #e3e3e3"});
	 }
	 $("#cb_jqGrid_wldw").hide();
});
$("#yg").on("shown.bs.modal",function(){
	 $("#jqGrid_yg").setGridWidth($(this).find(".modal-content").width()-30);
	 $(this).find(".ui-jqgrid-bdiv").height($(this).find(".modal-body").height()*0.78);
	 var width=document.body.scrollWidth;
	 if(width>763||width==763){
		 $(this).find(".ui-jqgrid").css({"borderLeft":"1px solid #cfcfcf","borderRight":"1px solid #e3e3e3"});
	 }
	 $("#cb_jqGrid_yg").hide();
});
$("#hy").on("shown.bs.modal",function(){
	 $("#jqGrid_hy").setGridWidth($(this).find(".modal-content").width()-30);
	 $(this).find(".ui-jqgrid-bdiv").height($(this).find(".modal-body").height()*0.78);
	 var width=document.body.scrollWidth;
	 if(width>763||width==763){
		 $(this).find(".ui-jqgrid").css({"borderLeft":"1px solid #cfcfcf","borderRight":"1px solid #e3e3e3"});
	 }
	 $("#cb_jqGrid_hy").hide();
});

/*会员禁用修改选项*/
function disable(flag){
	if(flag){
		$(".field").removeAttr("disabled");
		$(".inputWrap_add").removeAttr("disabled");
		$(".inputWrap_add #unitCome").removeAttr("disabled");
	}else{
		$(".field").attr("disabled","disabled");
		$(".inputWrap_add").attr("disabled","disabled");
		$(".inputWrap_add #unitCome").attr("disabled","disabled");
	}
}
//保存并新增/保存并修改
$("#addModify").on("show.bs.modal",function(e){
	disable(true);
	var t =e.relatedTarget;
	if($(t).hasClass("add")){//新增
		$(this).find("#addOrModify").html("新增");
		$(".wModal").val("1");
		$("#addModify").cleanAllObj();
		$("#documenttype").find("option:eq(0)").attr("selected","selected")
		$("#grade").find("option:eq(0)").attr("selected","selected")
	
	}else{//修改
		$(this).find("#addOrModify").html("修改");
		$(".wModal").val("2");
		var ids=$("#jqGrid_custom").jqGrid('getGridParam','selarrrow');
		if(ids.length != 1){
			$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
			return false;
		}else{
			var rowData = jQuery("#jqGrid_custom").jqGrid('getRowData',ids);
			 $.request({
		         url: '/manager/member/facardInfo/selectOne',
		         type: "POST",
				 data:{"id":ids},
				 traditional: true,
		         success: function (data) { 
					 if(data.data.rows){
						  if(data.data.rows.fzDate!=undefined||data.data.rows.fzDate!=null||data.data.rows.fzDate!=''){
							  data.data.rows.fzDate=format(new Date(data.data.rows.fzDate).getTime(),'yyyy-MM-dd');
						  }
						  if(data.data.rows.birth!=undefined||data.data.rows.birth!=null||data.data.rows.birth!=''){
							  data.data.rows.birth=format(new Date(data.data.rows.birth).getTime(),'yyyy-MM-dd');
						  }
					 	  $("#addModify").writeJson2Dom(data.data.rows);
					 }
				  },
		         error: function (msg) {
		         }
		     });
			if(rowData.isVip!=0){
				disable(false);
			}
		}
	}
})
//新增/修改模态框消失
$("#addModify").on("hide.bs.modal",function(){
	//重置表单验证
    $('#validateTopTest').bootstrapValidator('resetForm', false);
});


$(document).on("click",".saveAdd",function(){
      var  obj =$("#addModify").toJsonObject();
      var url = '/manager/member/customer/save';
	  if($(".wModal").val()=="1"){//新增保存
		    delete obj.id;
	  }
//	  else if(	$(".wModal").val()=="2"){//修改保存
//		  
//	  }
	  //saveAdd
	  $("#validateTopTest").data("bootstrapValidator").validate();
	  var flagTop = $("#validateTopTest").data("bootstrapValidator").isValid();
	  if(flagTop){
		$.request({
            type: 'POST',
            url: url,
            type: "POST",
            datatype: "json",
            contentType: "application/json",
            data: JSON.stringify(obj),
            traditional: true,
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("提示", data.desc);
                    $("#addModify").modal('hide');
                    $("#jqGrid_custom").trigger("reloadGrid");
                    $("#addModify").cleanAllObj();
                    $("#addModify").modal('hide');
                } else {
                    $.zxsaas_plus.showalert("错误", data.desc);
                }
            },
            error: function (msg) {
            }
        });
	  }
})


//模糊查询
	$(document).on("click",".find-out",function(event){			
			var vl =$(".qick-ipt").val();
				 jQuery("#jqGrid_custom").jqGrid('setGridParam', {  
					    datatype:'json',  
					    page:1,
				        postData:{"keyword":$.trim(vl)}, //发送数据  
				    }).trigger("reloadGrid");  
	});

/************************类别新增************************/
//类别模态框弹出
$(document).on("shown.bs.modal","#sortSign",function(){
	setGrid("#jqGrid_sortSign");
})
//保存新增
$(document).on('click','.saveSort', function (e) {
	//$('#attrAdd').bootstrapValidator('resetForm', false);//为true时清空表单内容
    //$('#attrAdd').data('bootstrapValidator').validate();
//    if (!$('#attrAdd').data('bootstrapValidator').isValid()) {
//        return false;
//    } else {
	    var obj = $("#modalSignAdd").toJsonObject();
	    if(obj.code==''){
	    	  $.zxsaas_plus.showalert("提示", "编码不能为空");
	    	  return;
	    }
	    if(obj.name==''){
	    	  $.zxsaas_plus.showalert("提示", "名称不能为空");
	    	  return;
	    }
    	$.request({
            type: 'POST',
            url: '/manager/member/customer/saveClassLabel',
            type: "POST",
            datatype: "json",
            contentType: "application/json",
            data: JSON.stringify(obj),
            traditional: true,
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("提示", data.desc);
                    $("#modalSignAdd").modal('hide');
                    $("#jqGrid_sortSign").trigger("reloadGrid");
                    $("#modalSignAdd").cleanAllObj();
                    Tree();
                } else {
                    $.zxsaas_plus.showalert("错误", data.desc);
                }
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
   // }
});

//保存修改
$(document).on('click','.updateSort', function (e) {
	  var obj = $("#modalSignUpdate").toJsonObject();
	    if(obj.code==''){
	    	  $.zxsaas_plus.showalert("提示", "编码不能为空");
	    	  return;
	    }
	    if(obj.name==''){
	    	  $.zxsaas_plus.showalert("提示", "名称不能为空");
	    	  return;
	    }
    $.request({
        type: 'POST',
        url: '/manager/member/customer/saveClassLabel',
        type: "POST",
        datatype: "json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        traditional: true,
        success: function (data) {
            if (data.result == 1) {
                $.zxsaas_plus.showalert("提示", data.desc);
                $("#modalSignUpdate").modal('hide');
                $("#jqGrid_sortSign").trigger("reloadGrid");
                $("#modalSignUpdate").cleanAllObj();
                Tree();
            } else {
                $.zxsaas_plus.showalert("错误", data.desc);
            }
        },
        error: function (msg) {
          //  alert(" 数据加载失败！" + msg);
        }
    });
});

//修改操作
$(document).on('click','.update', function (e) {
    var code = $(this).data('code');
    var name = $(this).data('name');
    var remark = $(this).data('remark');
    var id= $(this).data('id');
    $("#S_code").val(code);
    $("#S_name").val(name);
    $("#S_remark").val(remark);
    $("#S_id").val(id);
});
//删除操作
$(document).on('click','.deleteSort', function (e) {
    var dId = $(this).data('id');//获取数据的id
    //调用接口删除数据
    $.zxsaas_plus.showconfirm("提示", "是否确定删除此条数据?", function () {
        $.request({
            url: '/manager/member/customer/deleteClassLabel',
            type: "POST",
		    data:{"id":dId},
		    traditional: true,
            success: function (data) {
                $.zxsaas_plus.showalert("提示",data.desc);
                $("#jqGrid_sortSign").trigger("reloadGrid");
                Tree();
            },
            error: function (msg) {
              
            }
        });
    }, function () {

    });

});


/********合并********/
//合并模态框弹出
//$(".merge").on("click",function(){
//	 $(".mergeSelect").html("");
//	var ids = $("#jqGrid_custom").jqGrid('getDataIDs');
//	var record ={
//	  "id":null,
//	  "sign":0
//	};
//	if(ids.length>0){
//		for(var i=0;i<ids.length;i++){
//		   var rowData =$("#jqGrid_custom").jqGrid('getRowData',ids[i]);
//	
//			   if(rowData.isVip!=0){
//				  record.id=rowData.id;
//				  record.sign++;
//				  if(record.sign>1){
//					  $.zxsaas_plus.showalert("提示","选择会员不能为多个！");
//					   return false;
//				  }
//			   }else{
//				   $(".mergeSelect").append("<option  value='"+rowData.id+"'>"+rowData.name+rowData.tel+"</option>");
//				   
//			   }
//		}
//		if(record.sign>0){//存在会员
//			 var assoRowData =$("#jqGrid_custom").jqGrid('getRowData',record.id); 
//			 $(".mergeSelect").html("<option value='"+assoRowData.id+"'>"+assoRowData.name+assoRowData.tel+"</option>");
//			
//		}
//		//$("#mergeAssociate").modal('show');
//	}else{
//	  $.zxsaas_plus.showalert("提示","选择人员！");
//	  return false;	
//	}
//});
$("#mergeAssociate").on("show.bs.modal",function(){
	 $(".mergeSelect").html("");
		ids = $("#jqGrid_custom").jqGrid('getGridParam','selarrrow');
		var record ={
		  "id":null,
		  "sign":0
		};
		if(ids.length>0){
			for(var i=0;i<ids.length;i++){
			   var rowData =$("#jqGrid_custom").jqGrid('getRowData',ids[i]);
		
				   if(rowData.isVip!=0){
					  record.id=rowData.id;
					  record.sign++;
					  if(record.sign>1){
						  $.zxsaas_plus.showalert("提示","不能同时选择多个会员！");
						   return false;
					  }
				   }else{
					   $(".mergeSelect").append("<option  value='"+rowData.id+"'>"+rowData.cardholder+rowData.tel1+"</option>");
					   
				   }
			}
			if(record.sign>0){//存在会员
				 var assoRowData =$("#jqGrid_custom").jqGrid('getRowData',record.id); 
				 $(".mergeSelect").html("<option value='"+assoRowData.id+"'>"+assoRowData.cardholder+assoRowData.tel1+"</option>");
				
			}
			return true;
		}else{
		  $.zxsaas_plus.showalert("提示","请选择客户！");
		  return false;	
		}
});
//确定
$(document).on("click",".mergeSac",function(){
	    //调用接口删除数据
	    $.zxsaas_plus.showconfirm("提示", "是否要合并当前选择客户的消费记录?", function () {
	        $.request({
	            url: '/manager/member/customer/mergeRecord',
	            type: "POST",
			    data:{"id": $(".mergeSelect").val(),"ids":ids},
			    traditional: true,
	            success: function (data) {
	                $.zxsaas_plus.showalert("提示",data.desc);
	                $("#jqGrid_custom").trigger("reloadGrid");
	                $("#mergeAssociate").modal('hide');
	            },
	            error: function (msg) {
	              
	            }
	        });
	    }, function () {

	    });
});
//
$(document).on("click",".customRecord",function(){
	var ids = $("#jqGrid_custom").jqGrid('getGridParam','selarrrow');
	if(ids.length>1||ids.length==0){//没有选择数据
		 $.zxsaas_plus.showalert("提示","请选择一条数据！");
		 
	}else{//选择了一条数据
		 var rowData =$("#jqGrid_custom").jqGrid('getRowData',ids[0]);
		  window.parent.openWorkBoxByMenutext('消费记录','/manager/member/customer/toConsumptionRecordsPage?id='+rowData.id+'&name='+rowData.cardholder+'&phone='+rowData.tel1);
		
	}
})

/*****************根据筛选证件类型验证证件号码(勿删除)***********************/
//$('#validateTopTest').find('input[name="certificateno"]').on('blur', function(){  
//    var kind =$("select[name=documenttype]>option:selected").val();
//    var f =false;
//    if(kind=="身份证"||kind=="身份证号"){
//    	f=true;
//    }
//    $('#validateTopTest').bootstrapValidator('enableFieldValidators', 'certificateno', f);  
//    if (f) {  
//        $('#validateTopTest').bootstrapValidator('validateField', 'certificateno') ; 
//    }  
//});  
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
	    switch(a){
	        case 'yyyy':
	            return tf(t.getFullYear());
	            break;
	        case 'MM':
	            return tf(t.getMonth() + 1);
	            break;
	        case 'mm':
	            return tf(t.getMinutes());
	            break;
	        case 'dd':
	            return tf(t.getDate());
	            break;
	        case 'HH':
	            return tf(t.getHours());
	            break;
	        case 'ss':
	            return tf(t.getSeconds());
	            break;
	    }
   })
}

//导出商品资料
function exportInfo(){
	window.location.href="/manager/member/customer/export";
}