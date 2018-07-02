var	lastrow = "";
var lastcell = "";
function loadmodal(options){
	//初始化参数
	var colName = [];
	//主表，外修及返厂 ，不可增加
	var colName0 =['id','业务流水号','手机串号','往来单位','客户姓名','联系电话','商品名称','处理方式','故障说明',
	               '外观描述','预报价','商品分类','是否返修','备注','商品id','往来单位id','仓库id','handleMode','sourceTabId','sourceTabName','串号id','服务类型'];
	colName[0] = colName0;
	//主表下的附表，不可增加
	var colName1 =['操作','id','业务流水号','手机串号','往来单位','客户姓名','联系电话','商品名称','处理方式','故障说明',
	               '外观描述','预报价','商品分类','是否返修','备注','商品id','handleMode','往来单位id','仓库id','handleMode','sourceTabId','sourceTabName','串号id','服务类型'];
	colName[1] = colName1;
	
	var colName2=['ID','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别'];
	colName[2] = colName2;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string',sortable:false},
	                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'contactsunitName',index:'contactsunitName', width:120,align:'center',sorttype:'string',sortable:false},
	                   {name:'customId',index:'customId', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'telephone',index:'telephone', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsName',index:'goodsName', width:150,align:'center',sorttype:'string',sortable:false,},
	                   {name:'handleMode',index:'handleMode', width:150,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"2:返厂;3:外修;4:换机;5:退货"}},
	                   {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'looksDesc',index:'looksDesc', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'quotePrice',index:'quotePrice', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsClassName',index:'goodsCategoryName', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'returnFalg',index:'returnFalg', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:是;0:否"}},
	                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false},
	                   
	                   {name:'goodsId',index:'goodsId', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'contactsunitId',index:'contactsunitId', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'storageId',index:'storageId', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'handleMode',index:'handleMode', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'sourceTabId',index:'sourceTabId', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'sourceTabName',index:'sourceTabName', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'imeiId',index:'imeiId', width:70,align:'center',sorttype:'string',hidden:true},
	                   {name:'serviceType',index:'serviceType', width:70,align:'center',sorttype:'string',hidden:true},
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
							{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false,formatter: addAndDelete},
							{name:'id',index:'id',width:70,align:'center',hidden:true},
							{name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string',sortable:false},
		                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'contactsunitName',index:'contactsunitName', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'customId',index:'customId', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'telephone',index:'telephone', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsName',index:'name', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'handleMode',index:'handleMode', width:150,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"2:返厂;3:外修;4:换机;5:退货"}},
		                   {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'looksDesc',index:'looksDesc', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'quotePrice',index:'quotePrice', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsClassName',index:'goodsCategoryName', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'returnFalg',index:'returnFalg', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:是;0:否"}},
		                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false},
		                   
		                   {name:'goodsId',index:'goodsId', width:150,align:'center',sorttype:'string',hidden:true},
		                   {name:'handleMode',index:'handleMode', width:50,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   {name:'contactsunitId',index:'contactsunitId', width:50,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   {name:'storageId',index:'storageId', width:70,align:'center',sorttype:'string',hidden:true},
		                   {name:'handleMode',index:'handleMode', width:70,align:'center',sorttype:'string',hidden:true},
		                   {name:'sourceTabId',index:'sourceTabId', width:70,align:'center',sorttype:'string',hidden:true},
		                   {name:'sourceTabName',index:'sourceTabName', width:70,align:'center',sorttype:'string',hidden:true},
		                   {name:'imeiId',index:'imeiId', width:70,align:'center',sorttype:'string',hidden:true},
		                   {name:'serviceType',index:'serviceType', width:70,align:'center',sorttype:'string',hidden:true}
		                   ];
	JqGridColModel[1]=JqGridColModel1;
	
	var JqGridColModel2 =[
							{name:'id',index:'id', width:150,align:'center', sorttype:'string',hidden:true},
							{name:'code',index:'code', width:150,align:'center', sorttype:'string',sortable:false},
							{name:'name',index:'name', width:150,align:'center', sorttype:'string',sortable:false,formatter:cLink},
							{name:'remCode',index:'remCode', width:150,align:'center', sorttype:'string',sortable:false},
							{name:'districtId',index:'districtId', width:100,align:'center', sorttype:'string',sortable:false},
							{name:'contactunitTypeCode',index:'contactunitTypeCode', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
							{name:'typeId',index:'typeId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true}
	                      ];
	JqGridColModel[2]=JqGridColModel2;
	
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
//	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
//	//LoadTableUrl: "../../json/afterSale/registrationCard.json",
	LoadTableUrl:"/manager/afterSalesService/wxfc/selectWxfcDataGrid",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_benefitPeople", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
//	pager:"#jqGridPager_benefitPeople",
	TableInfo:"0",
	choose:true,
	height: $(window).height()*0.2,
	footerrow:false,
	userDataOnFooter:false
	
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false,//关闭选择今天按钮
	      value:new Date(),
	      minDate:new Date()
		}).on('blur',function(ev){
			tableInput.thisTime('#datetimepickerStart','#datetimepickerStart');
		});
	$("#datetimepickerStart1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false  ,  //关闭选择今天按钮
	      value:new Date(),
	      maxDate:new Date()
		}).on('blur',function(ev){
			tableInput.thisTime('#datetimepickerStart1','#datetimepickerStart1');
		});
	var options = $.extend(defaults,options);
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		//var toggleflag=false;//冻结时候切换用
		var c=options.TableInfo;//参数index
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		loadtable();
	//加载表格
	
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"post",
					datatype: "json",
					jsonReader  : options.jsonReader,
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            viewrecords: true,
		            rownumbers:true,
		            rowNum:options.rowNum ? options.rowNum : -1,
		            sortable:false,
		            width: "100%" ,
		            height:options.height,
		            pager:options.pager,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					//footerrow:true,  //设置表格显示表脚
					//userDataOnFooter:true,//设置userData 显示在footer里
					footerrow:options.footerrow,
					userDataOnFooter:options.userDataOnFooter,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
//						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
//				      	select_name=colName
//				      	select_index=index;
//				      	rowid=id;
//				      	if(options.TableInfo == 1 || options.TableInfo == 2){
//					      	var ids = $(options.TableName).jqGrid('getDataIDs');
//							//获得当前最大行号（数据编号）
//							var maxid;
//							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//							//当用户点击表格最后一行时,自动增加一行
//							
//							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
//						}
				     
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
												lastrow = iRow;
												lastcell = iCol;
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
                         
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");
						
                   
					},
//					onSelectRow:function(){//当选择行时触发此事件
//						var rowIds = $("#jqGrid_benefitPeople").jqGrid('getGridParam', 'selarrrow'); 
//						//console.log(rowIds)
//					},
					loadComplete:function(data){
					//	console.log(data.data.main.id)
						
//						 if(data.data.details){
//	   							$(this).jqGrid('addRowData',0, {"id":"","imei":"","contactsunitId":"","customId":"","telephone":"","name":""
//	   								,"falutDesc":"","looksDesc":"","quotePrice":"","goodsCategoryName":"","returnFalg":"","remark":"","goodsId":""}, 'last' );
//	                       }	
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash delete" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		
		// 列表复选框
		function checkBox(cellvalue, options, rowObjec){
			return '<input type="checkbox" class="checkBoxNum'+options.rowId+'" data-id="' + rowObjec.deliveryId + '"  data-rId="' + options.rowId + '" />';
		}
}

//选项卡主表
$(document).ready(function(){
	var jsonReader  = {	
		root: "data.list",
		repeatitems: false
	}
	loadmodal({"TableName":"#jqGrid_benefitPeople","TableInfo":"0",choose:true,"LoadTableUrl": "/manager/afterSalesService/wxfc/selectWxfcDataGrid",'rowNum':'-1',"jsonReader":jsonReader});
	loadmodal({"TableName":"#jqGrid_selectedYF","TableInfo":"1",choose:true});
	
	//执行维修部门的下拉接口
//	departmentYF();
	
	var ad=$(document.body).width();
	
	$('.widthyf1').attr("width",ad);
	$('.widthYF2').attr("width",ad);
	
	outer('#outer');
	
});
//往来单位
$(document).on('click','.unitChoose',function(){
	var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: null
				}
			},
			callback: {
				onCheck:zTreeOnCheck,
				onClick: zTreeOnClick
			},
			view: {
				showIcon: false
			}
	    }; 
		//点击节点查询
		function zTreeOnClick(event, treeId, treeNode) {
//		    alert(treeNode.id + ", " + treeNode.name);
		    $('.unitIdOly').val(treeNode.id);//存放点击的节点Id
		    var sUrl = '/manager/afterSalesCommon/getContactsunits?typeId=' + treeNode.id;
		    if(treeNode.id == 0){
		    	sUrl = '/manager/afterSalesCommon/getContactsunits';
		    }
		    $.request({
		    	url:sUrl,
		    	type:'GET',
		    	dataType:'JSON',
		    	contentType:'application/json;charset=utf-8',
		    	async:false,
		    	success:function(data){
		    		$('#jqGrid_roleMsgAdd').jqGrid('clearGridData');
		    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i++){
		    			$('#jqGrid_roleMsgAdd').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
		    		}
			    }
		    });
		};
	    
	    var ids = [];//选中节点id的集合
	    var names = [];//选中节点名字的集合
		function zTreeOnCheck(event, treeId, treeNode) {
			var id = treeNode.id;//获取数据的Id
			var tName = treeNode.name;
			if(treeNode.checked){
				ids.push(id);
				names.push(tName);
			}else{
				for(var i = 0;i<ids.length;i++){
					(ids[i] == id) && (ids.splice(i,1));
				}
				for(var i = 0;i<names.length;i++){
					(names[i] == tName) && (names.splice(i,1));
				}
			}
			
//			$('.' + idChoose).val(ids);//ids存放于此 可以通过此隐藏域获取选中项id   $('.add_tree_ids').val();
//			$('.' + nameChoose).val(names);//显示已勾选的name
		}; 
		
		 $.request({
	            type: 'Get',
	            url: '/manager/TunitClass/findTree?groupId=8888888',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($('#unitDataTree'), setting, data);
	                var zTree = $.fn.zTree.getZTreeObj("#unitDataTree");
	             //   zTree.expandAll(true);//展开全部节点
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
	
		 
	 var jsonReader  = {	
				root: "data.contactsunitList",
				page:"data.page",
				total:"data.pageCount",
				records:"data.totalCount",
				repeatitems: false
			}
	loadmodal({"TableName":"#jqGrid_roleMsgAdd","pager":"#jqGridPager_roleMsgAdd","TableInfo":"2","height": $(window).height()*0.45,choose:false,"LoadTableUrl": "/manager/afterSalesCommon/getContactsunits","jsonReader":jsonReader,"rowNum":10});
//	$.request({
//    	url:"/manager/afterSalesCommon/getContactsunits",
//    	dataType:'json',
//    	contentType:'application/json;charset=utf-8',
//    //	data:JSON.stringify(data),
//    	type:'POST',
//    	success:function(data){
//    		$("#jqGrid_roleMsgAdd").jqGrid('clearGridData');
//    		var dataList =data.data.contactsunitList;
//    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//    			$('#jqGrid_roleMsgAdd').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//    		}
//    		
//    	},
//    	error:function(){
//    		$.zxsaas_plus.showalert("","error!")
//    	}
//    })
});
function cLink(cellvalue, options, rowObject){
   return '<span class="unitCh" data-dismiss="modal">' + cellvalue + '</span>';
};

$(document).on('click','.unitCh',function(e){
      var val=$(this).text();
      var ids=$(this).parent().prev().prev().text();
      $('.unitYF').val(val);
      $('.unitHIDE').val(ids);
});
//删除一行
$(document).on('click', '.delete',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	if(thisTitle == "删除行"){
		console.log('条数:' + $('#jqGrid_selectedYF tbody tr').length);
		$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
			
			var data=$("#jqGrid_selectedYF").jqGrid('getRowData',rowId);
			//console.info(data);
			var getData={
					'id':data.id,
					'flowNo':data.flowNo,
					'imei':data.imei,
					'contactsunitName':data.contactsunitName,
					'contactBy':data.contactBy,
					'telephone':data.telephone,
					'goodsName':data.goodsName,
					'falutDesc':data.falutDesc,
					'looksDesc':data.looksDesc,
					'quotePrice':data.quotePrice,
					'goodsClassName':data.goodsClassName,
					'returnFalg':data.returnFalg,
					'remark':data.remark,
					'goodsId':data.goodsId,
					'handleMode':data.handleMode,
					'contactsunitId':data.contactsunitId,
					'customId':data.customId,
					'storageId':data.storageId,
					'serviceType':data.serviceType,
					'sourceTabId':data.sourceTabId,
					'sourceTabName':data.sourceTabName
			}	
			$("#jqGrid_benefitPeople").jqGrid('addRowData',1,getData);
			$("#jqGrid_selectedYF").jqGrid('delRowData', rowId);
		},function(){
			
		});
		
	}
});
$(document).on('click','.addTable',function(options){
    var ids=$("#jqGrid_benefitPeople").jqGrid("getGridParam","selarrrow");
    var len =ids.length;
    if(len!=0){
		for(var i=0;i<len;i++){
			var rowid = ids[0];
		   // console.log(ids+"#####");
		    var data=$("#jqGrid_benefitPeople").jqGrid('getRowData',rowid);
//		    data.handleMode = $('.handleMode option:selected').val();
		   // console.log("*****"+JSON.stringify(data));
			var ids2 = $("#jqGrid_selectedYF").jqGrid('getDataIDs');
			var maxid;
			maxid = (ids2.length ==0 ) ? 0 : Math.max.apply(Math,ids2);
			$("#jqGrid_selectedYF").jqGrid('addRowData', maxid+1, data );
			$("#jqGrid_benefitPeople").jqGrid('delRowData',rowid);
		}
	}else{
		$.zxsaas_plus.showalert("错误","至少选中一条数据!")
	}
});

/**
 * 保存
 */
$(document).on('click','.saveData',function(){
	
	
	$("#outer").data('bootstrapValidator').validate();
	if(!($("#outer").data('bootstrapValidator').isValid())){
		refreshValidator("#outer");
		return;
	}
	if(!$('.unitYF').val()){
		$.zxsaas_plus.showalert("提示","请先选择往来单位!");
		return 
	}else{
		if(!$('.repairSectionName').val()){
			$.zxsaas_plus.showalert("提示","请先选择维修部门!");
			return 
		}
	}
	
		
	var param=$('#outer').toJsonObject();
	
	var ids= $("#jqGrid_selectedYF").jqGrid("getDataIDs");
	if(ids.length==0){
		$.zxsaas_plus.showalert("提示","未选中任何数据!");
		return;
	}
	var wxfcDetailList=new Array();
	$.each(ids, function (i,value) {
		var row = $("#jqGrid_selectedYF").jqGrid('getRowData', value);
		delete row.imei;
		delete row.deliveryDo;
		//是否返修0否，1是
		row.returnFalg=0;
		wxfcDetailList.push(row);
	 });
	
	param.wxfcDetailList=wxfcDetailList;
	$.request({
    	url:"/manager/afterSalesService/wxfc/saveWxfcDataGrid",
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(param),
    	type:'POST',
    	success:function(data){
		   $.zxsaas_plus.showalert("提示",data.desc);
		   $("#jqGrid_selectedYF").jqGrid('clearGridData');
		   
    	}
    })
});


$(document).on('keyup','.fasttips',function(e){
	var searchText = $(this).val().trim();
	var checkType=$('.radquery:checked').val();
	var tObj = document.getElementById('jqGrid_benefitPeople');
	var rowLens = tObj.rows.length;
	var flag = true;
	for(var i = 0;i<rowLens;i++){
		var rText1 = tObj.rows[i].cells[3].innerHTML;//业务流水号
		var rText2 = tObj.rows[i].cells[4].innerHTML;//手机串号
		var rText3 = tObj.rows[i].cells[7].innerHTML;//手机号
		//var color = tObj.rows[i].style.backgroundColor;
		var top = (i-1) * 36 + 'px';
		if(flag){
			if(searchText != '' && (rText1.match(searchText) || rText2.match(searchText) || rText3.match(searchText))){
				//tObj.rows[i].style.backgroundColor = 'lightgray';
				$(".ui-jqgrid-bdiv").animate({scrollTop:top},"slow"); //定位tr 
				flag = false;
			}
		}
	}
});

//回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
		
		 var a=$('#unitChoose').is(":hidden");
         if(!a){
         	quickUnit();
         }else{
         	quick();
         }
	}
});

//主表的回车查询事件
function quick(){
	var reUrl=function(sUrl){
		$.request({  
		 	url:sUrl,//请求路径  
		 	async: false,  
		 	success: function(data) { 
			    var dataList = data.data.pageList;
				$("#jqGrid_benefitPeople").jqGrid('clearGridData');
				for(var i = 0,len = dataList.length;i<len;i ++){
					var arr={//contactunitName此字段数据库传过来的不一致，不可一次性放入表格
							'id':dataList[i].id,
							'flowNo':dataList[i].flowNo,
							'imei':dataList[i].imei,
							'contactsunitName':dataList[i].contactunitName,
							'contactBy':dataList[i].contactBy,
							'telephone':dataList[i].telephone,
							'goodsName':dataList[i].goodsName,
							'falutDesc':dataList[i].falutDesc,
							'looksDesc':dataList[i].looksDesc,
							'quotePrice':dataList[i].quotePrice,
							'goodsCategoryName':dataList[i].goodsCategoryName,
							'returnFalg':dataList[i].returnFalg,
							'remark':dataList[i].remark,
							'goodsId':dataList[i].goodsId,
							'contactsunitId':dataList[i].contactsunitId,
							'customId':dataList[i].customId,
							'storageId':dataList[i].storageId
					}
					$("#jqGrid_benefitPeople").jqGrid('addRowData',i+1,arr,'last');
				}
		 	},
		 	error:function(){
		 		
		 	}
	 	});
	}
	var zonghe =$('.zonghe').val();
	
	var a =$('.radquery:checked').val();
	var repairSectionId=$('.repairSectionId').val();
	switch(a){
		case '1':
			var url = '/manager/afterSalesService/wxfc/query?repairSectionId='+repairSectionId+'&flowNo='+zonghe;
			reUrl(url);
			break;
		case '2':
			var url = '/manager/afterSalesService/wxfc/query?repairSectionId='+repairSectionId+'&imei='+zonghe;
			reUrl(url);
			break;
		case '3':
			var url = '/manager/afterSalesService/wxfc/query?repairSectionId='+repairSectionId+'&telephone='+zonghe;
			reUrl(url);
			break;
	}
}
//往来单位的回车事件查询
function quickUnit(){
	var name = $('.wangL').val();
	$.request({  
	 	url: '/manager/afterSalesCommon/getContactsunits?name='+name,//请求路径  
	 	async: false,  
	 	success: function(data) { 
			$("#jqGrid_roleMsgAdd").jqGrid('clearGridData');
			var dataList =data.data.contactsunitList;
			for(var i = 0,len = dataList.length;i<len;i ++){
				var getData={
	    				'id':dataList[i].id,
	    				'code':dataList[i].code,
	    				'name':dataList[i].name,
	    				'remCode':dataList[i].remCode,
	    				'districtId':dataList[i].districtId,
	    				'contactunitTypeCode':dataList[i].contactunitTypeCode,
	    				'typeId':dataList[i].typeId
	    		}	
				$("#jqGrid_roleMsgAdd").jqGrid('addRowData',i+1,getData);
			}
	 	},
	 	error:function(){
	 		
	 	}
 	});
}

//处理方式修改
$(document).on('click','.handleModeSave',function(){
	var ids= $("#jqGrid_selectedYF").jqGrid('getGridParam', 'selarrrow');
	if(ids.length==0){
		return;
	}
	var data=[];
	$.each(ids, function (i,value) {
		var row = $("#jqGrid_selectedYF").jqGrid('getRowData', value);
		var param={};
		param.sourceTabId=row.sourceTabId;
		param.handleMode=$(".handleMode").val();
		param.sourceTabName=row.sourceTabName;
		data.push(param);
	 });
	
	$.request({  
	 	url: '/manager/afterSalesService/wxfc/changeHandleMode',//请求路径  
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'POST',
	 	success: function(data) { 
			$.zxsaas_plus.showalert("提示",data.desc);
			$('#jqGrid_selectedYF').jqGrid('clearGridData');
			$.request({  
			 	url: '/manager/afterSalesService/wxfc/selectWxfcDataGrid',//请求路径  
			 	dataType:'json',
			 	contentType:'application/json;charset=utf-8',
		    	type:'POST',
			 	success: function(data) { 
					$('#jqGrid_benefitPeople').jqGrid('clearGridData');
					  var billInfo=data.data.list
					  $.each(billInfo,function(i,v){
						  $('#jqGrid_benefitPeople').jqGrid('addRowData',[i],v);
					  })
			 	}
			 });
	 	}
	 });
})

$(document).on('click','.alterChoose',function(){
	if($("#jqGrid_selectedYF").getDataIDs().length && $("#jqGrid_selectedYF").jqGrid('getGridParam','selarrrow').length){
		$('#alterChoose').modal('show');
	}else{
		$.zxsaas_plus.showalert("提示","未选中任何数据!");
	}
})

function showSectionModal(data){
	
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
			   onDblClick:function(event, treeId, treeNode){
	            	if($(event.target).is('span')){
	            		if(treeNode.check_Child_State==-1){
            				$('.repairSectionName').val(treeNode.name);
            				$("#outer input[name='repairSectionId']").val(treeNode.obj.id);
	            			$("#sectionModal").modal('hide');
	            			$('#jqGrid_benefitPeople').setGridParam({
            		    	    postData:{repairSectionId:treeNode.obj.id}
            			    }).trigger("reloadGrid");
	                	}
	            	}
	            }
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


//查看单据
//$(document).on('click','.upDown',function(e){
//	 $.request({
//		   	url:'/manager/afterSalesService/wxfc/getBills',
//		   	dataType:'json',
//		   	contentType:'application/json;charset=utf-8',
//		   	type:'GET',
//		   	success:function(data){
//					var dataList = data.data.details;
//					$("#jqGrid_benefitPeople").jqGrid('clearGridData');
//					
//					$('.idYF').val(data.data.main.id);
//					$('.billsNo').val(data.data.main.billsNo);
//					$('.deliveryDate').val(data.data.main.deliveryDate);
//					$('.expressName option:selected').val(data.data.main.expressName);
//					$('.trackNo').val(data.data.main.trackNo);
//					$('.unitYF').val(data.data.main.contactsunitName);
//					$('.address').val(data.data.main.address);
//					$('.linkman').val(data.data.main.linkman);
//					$('.telephone').val(data.data.main.telephone);
//					$('.repairSectionId option:selected').val(data.data.main.repairSectionName);
//					for(var i = 0,len = dataList.length;i<len;i ++){
//						var arr ={
//							'id':dataList[i].id,
//							'flowNo':dataList[i].flowNo,
//							'imei':dataList[i].imei,
//							'contactsunitId':dataList[i].contactsunitId,
//							'customId':dataList[i].customId,
//							'telephone':dataList[i].telephone,
//							'name':dataList[i].attrs.goods.name,
//							'falutDesc':dataList[i].falutDesc,
//							'looksDesc':dataList[i].looksDesc,
//							'quotePrice':dataList[i].quotePrice,
//							'goodsCategoryName':dataList[i].attrs.goods.goodsCategoryName,
//							'returnFalg':dataList[i].returnFalg,
//							'remark':dataList[i].remark,
//							'goodsId':dataList[i].goodsId
//						}
//						$("#jqGrid_benefitPeople").jqGrid('addRowData',(i+1),arr,'last');
//					}
//		   	},
//		   	error:function(){
//		   		$.zxsaas_plus.showalert("","error!")
//		   	}
//		   	
//	   })
//});

/**
 * 显示相应div
 */
$(document).on('click',function(e){
	$('.kd').hide();
	e.stopPropagation();
});
$(document).on('click','.input-none',function(e){
	var prevText = $(this).parent().prev().html();
	$('.kd').show();
	e.stopPropagation();
});

/**
 * 给input赋值
 */
$(document).on('click','.kd p',function(e){
	var vale = $(this).children().html();
	var dataid=$(this).data('id');
	$('.expressName').val(vale);
	$('.none-cx').hide();
});

$(document).on('click','.expressName',function(){
	$('.kd').empty();
	//var a=$(this).data('type');
	var a=['顺丰','中通','圆通','申通','韵达','天天','全峰','宅急送','EMS','百世汇通']
	for(var i=0,len=a.length;i<len;i++){
		$('.kd').append('<p><span class="yfVAR">'+a[i]+'</span></p>');
	}
	
});



$(document).on('click','.referYF',function(){
	window.location.href="/manager/afterSalesService/wxfc/queryPage";
});






















