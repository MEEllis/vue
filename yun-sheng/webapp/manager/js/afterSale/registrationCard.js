$(document).on('click','.YFsave',function(){
    var yeSelect1=$(".YFselect1 option:selected").val();
	var yeSelect2=$(".YFselect2 option:selected").val();
    if(yeSelect1==5 && yeSelect2==5){
     	var ts =$('.TSverify').val()
		console.log(ts)
		if(ts==''){
			$.zxsaas_plus.showalert("错误","销售部门必须选择!")
		}
   }
});
$(document).on('change',function(){
	var yeSelect1=$(".YFselect1 option:selected").val();
	var yeSelect2=$(".YFselect2 option:selected").val();
   if(yeSelect1==5 && yeSelect2==5){
   	 $('.TShide').show();
   }else{
   	 $('.TShide').hide();
   }
});
var curr_goodsclass_tree_selectId = "";
function wangTree(options){
	
	var defaults = {
	    url:'/manager/Tgoodsclass/findTree2?groupId='+groupId,
	    TreeName:"#spmcDataTree"
	};
	
	var options =$.extend(defaults,options);
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
				onClick: zTreeOnCheck
			},
			view: {
				showIcon: false
			},
			check: {
				enable: false,
				chkStyle: "checkbox",
				chkboxType: { "Y": "ps", "N": "ps" }
			}
	    }; 
     	var ids = [];//选中节点id的集合
	    var names = [];//选中节点名字的集合
		function zTreeOnCheck(event, treeId, treeNode) {
			var id = treeNode.id;//获取数据的Id
			var tName = treeNode.name;
			curr_goodsclass_tree_selectId = (id==-1?"":id);
			quickGoods();
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
//			$(document).on('click','.saveZtree',function(e){
//				
//				var zTree = $.fn.zTree.getZTreeObj(treeId);
//				nodes = zTree.getSelectedNodes();
//				var node = nodes[0];
//				if(node.isParent){
//				    //判断后做操作
//				    $.zxsaas_plus.showalert("错误","只能选择子节点数据!")
//				}else{
//					$('.' + options.depName).val(tName);
//					
//					
//				}
//			});
			
		}; 
	$.request({
        type: 'Get',
        url: options.url,
         //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
        	//debugger;
            $.fn.zTree.init($(options.TreeName), setting, data);
            var str = $(options.TreeName+'_1_switch').attr('class');
            var zTree = $.fn.zTree.getZTreeObj(options.TreeName.replace("#",""));
        	zTree.expandAll(true);//展开全部节点
         
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}
function loadmodal(options){
	
	//初始化参数
	var colName = [];
	//主表，可用增值服务 ，不可增加
	var colName0 =['id','服务流水号','服务名称','开始日期','截止日期','办理部门','经办人','可用次数','已用次数'];
	colName[0] = colName0;
	//历史维修记录，不可增加
	var colName1 =['id','业务流水号','受理时间','取机时间','检测人','处理方式','是否返修','报称故障','检测故障','维修费用','所属分类','名称型号','原串号','新串号'];
	colName[1] = colName1;
	//批量模式，主表 ，可增加
	var colName2 =['id','操作','商品编码','商品名称','所属类别','品牌','型号','颜色','串号','故障说明','外观描述',
	               '建议处理方式','随机附件','备注','供应商','销售时间','业务流水号','售后类型','供应商id','goodsId'];
	colName[2] = colName2;
	//串号备用机，不可增加
	var colName3 =  ['ID','串号','辅助串号','备注'];
	colName[3] = colName3; 
	//往来单位 ，不可增加
	var colName5 = ['ID','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别','所属地区id'];
	colName[5] = colName5;
	//商品名称，不可增加
	var colName6 = ['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号',
	                '颜色ID','商品类别id','商品品牌id','网络制式id'];
	colName[6] = colName6;
	
	//供货商 ，不可增加
	var colName7 = ['ID','供货商编码','供货商名称','助记码','所属地区','供货商类型','供货商类别'];
	colName[7] = colName7;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'serviceInstanceNo',index:'serviceInstanceNo', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'serviceName',index:'serviceName', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'effectDateString',index:'effectDateString', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'invalidDateString',index:'invalidDateString', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'peploe',index:'peploe', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'fs',index:'fs', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'fx',index:'fx', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'usedTimes',index:'usedTimes', width:100,align:'center',sorttype:'string',sortable:false}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'flowNo',index:'flowNo', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'dealDate',index:'dealDate', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'upDate',index:'upDate', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'testByName',index:'testByName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'handleMode',index:'handleMode', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'repairFlag',index:'repairFlag', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'faultExplain',index:'faultExplain', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'fx',index:'fx', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'repairCost',index:'repairCost', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'name',index:'name', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newImei',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false}
		                   ];
	JqGridColModel[1]=JqGridColModel1;

	var JqGridColModel2 =[
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false,formatter: addAndDelete},
		                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'name',index:'name', width:200,align:'center',sorttype:'string',sortable:false,formatter:goodsModel},
		                   {name:'goodsCategoryId',index:'goodsCategoryId', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsBrandId',index:'goodsBrandId', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'color',index:'color', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'imei',index:'imei', width:170,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_batchModel').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.inputNum(this,20)"}},
		                   {name:'falutDesc',index:'falutDesc', width:180,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_batchModel').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
		                   {name:'exteriorDesc',index:'exteriorDesc', width:180,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_batchModel').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
		                   {name:'suggestHandleMode',index:'suggestHandleMode', width:100,align:'center',sorttype:'string',sortable:false,formatter:offerYF},
		                   {name:'randomEnclosure',index:'randomEnclosure', width:150,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_batchModel').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkNotChars(this,32)"}},
		                   {name:'remark',index:'remark', width:100,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_batchModel').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
		                   {name:'supplyBy',index:'supplyBy', width:180,align:'center',sorttype:'string',sortable:false,formatter:supplierYF,editoptions:{dataEvents:[{type:"blur",fn:saveCell}]}},
		                   {name:'fx',index:'fx', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'flowNo',index:'flowNo', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'serviceType',index:'serviceType', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'supplierId',index:'supplierId', width:50,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   {name:'goodsId',index:'goodsId', width:50,align:'center',sorttype:'string',sortable:false,hidden:true}
		                   ];
	JqGridColModel[2]=JqGridColModel2;

	var JqGridColModel3 =[
						{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
						{name:'imei',index:'imei', width:160,align:'center', sorttype:'string',sortable:false,formatter:numberCheck},
						{name:'auxiliaryImei',index:'auxiliaryImei', width:160,align:'center', sorttype:'string',sortable:false},
						{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable:false}
	   					 ];
	JqGridColModel[3]=JqGridColModel3;

	var JqGridColModel5=[
						{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false,formatter: cLink},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'districtName',index:'districtName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'contactunitTypeCode',index:'contactunitTypeCode', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'typeId',index:'typeId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'districtId',index:'districtId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true}
		                ];
    JqGridColModel[5]=JqGridColModel5;
    
    var JqGridColModel6 =[
    					{name:'id',index:'id', width:55,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false,formatter:spmcCheck},
						{name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'goodsColorName',index:'goodsColorName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'networkStandardName',index:'networkStandardName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'ifManageImei',index:'ifManageImei', width:120,align:'center', sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"true:是;false:否"}},
						{name:'goodsColorId',index:'goodsColorId', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
						{name:'goodsCategoryId',index:'goodsCategoryId', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
						{name:'goodsBrandId',index:'goodsBrandId', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true},
						{name:'networkStandard',index:'networkStandard', width:20,align:'center', sorttype:'string',formatter:'select',sortable:false,hidden:true}
    					];
	JqGridColModel[6]=JqGridColModel6;
	
	var JqGridColModel7=[
							{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
							{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
							{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false,formatter: gongH},
							{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
							{name:'districtId',index:'districtId', width:100,align:'center', sorttype:'string',sortable:false},
							{name:'contactunitTypeCode',index:'contactunitTypeCode', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
							{name:'typeId',index:'typeId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true}
			                ];
    JqGridColModel[7]=JqGridColModel7;
	
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	//LoadTableUrl: "../../json/afterSale/registrationCard.json",
	LoadTableUrl:"/manager/afterSalesService/receiveRecord/queryHistory?imei=null",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_appreciationYF", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_appreciationYF",
	TableInfo:"0",
	choose:false
	
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	}).on('blur',function(ev){
		//var mytime=myDate.toLocaleDateString();   
		tableInput.thisTime('#datetimepickerStart','#datetimepickerStart');
		refreshValidatorField("datetimepickerStart",'#verifYF');//刷新验证信息
	});
	$("#datetimepickerStart1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	}).on('blur',function(ev){
		tableInput.thisTime('#datetimepickerStart1','#datetimepickerStart1');
		refreshValidatorField("govJIdate",'#verifYF');//刷新验证信息
	});
	$("#datetimepickerStart2").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	}).on('blur',function(ev){
		tableInput.thisTime('#datetimepickerStart2','#datetimepickerStart2');
		refreshValidatorField("datetimepickerStart2",'#batchValidator');//刷新验证信息
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
		//console.log("&&&&"+c);
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		
	//加载表格
		var jsonTemp={};
	if(options.TableName==='#jqGrid_roleMsgAdd'||options.TableName==='#jqGrid_supplier'){
		jsonTemp={
				root: "data.contactsunitList",
				repeatitems: false
		}
	}else{
		jsonTemp={
				root: "rows",
				repeatitems: false
		}
	}
	loadtable();
	
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  :jsonTemp,
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 20, 40],
		            pager:options.pager,
		            viewrecords: true,
		            sortable:false,	
		           //  cellEdit:true,
		            width: "100%" ,
		            height: $(window).height()*0.45,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
//				      	if(options.TableInfo==2){
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
					//	alert('a')
					},
					loadComplete:function(data){
						if(options.TableName=="#jqGrid_batchModel"){
							if(data.data.list==0){
								$("#jqGrid_batchModel").jqGrid('addRowData',0, {"id":"","deliveryDo":"","code":"","name":"","goodsCategoryId":"","goodsBrandId":"","goodsModel":"","color":"","imei":"",
									"falutDesc":"","exteriorDesc":"","suggestHandleMode":"","randomEnclosure":"","remark":"","supplyBy":"","fx":"","flowNo":"","serviceType":"售后"}, 'last' );
							}
						}
						
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		function saveCell(){
			 $("#jqGrid_batchModel").jqGrid("saveCell",lastrow,lastcell);
		}
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" id="add_row" title="新增"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		};
		
		//商品名称修改
		function goodsModel(cellvalue, options, rowObject){
			return '<input type="text" class="goodsRid' + options.rowId +'" style="border:0;text-align:center;width:150px;height:30px;"  disabled/><span class="goodsFilter glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsFilter" data-rId="' + options.rowId +'"></span>';
			
		};
		
		//供应商
		function supplierYF(cellvalue, options, rowObject){
			return '<input type="text" class="supplier' + options.rowId +'" style="border:0;text-align:center;width:150px;height:30px;"  disabled/><span class="supplier glyphicon glyphicon-plus" data-toggle="modal" data-target="#supplierChoose" data-rId="' + options.rowId +'"></span>';
			
		};
		
		//批量模式，建议处理方式
		function suggestYF(cellvalue,options,rowObjec){
			return '<textarea class="textYF">'+cellvalue+'</textarea>';
		}
		//建议处理方式
		function offerYF(cellvalue, options, rowObject){
			return '<select class="suggestHandleMode offerYF' + options.rowId +'" style="border:0;text-align:center;width:80px;height:30px;"><option value="1">自修</option><option value="2">返厂</option><option value="3">外修</option></select>';
		};
}

//押金预收款
$(document).ready(function(){
//	var ad=$(document.body).width();
//	
//	$('.widthyf1').attr("width",ad);
//	$('.widthYF2').attr("width",ad);
//	$('.widthYF3').attr("width",ad);
	
	getStorageWEI();//维修部门下拉
	entrepotYF();//仓库下拉
	detectionYF();//检测人下拉
	categoryYF();//所属分类下拉
	departmentYF();//品牌下拉
	colorSYF();//颜色下拉
	
	
	//往来单位
	loadmodal({"TableName":"#jqGrid_roleMsgAdd","pager":"#jqGridpager_roleMsgAdd","LoadTableUrl":"/manager/afterSalesCommon/getContactsunits","TableInfo":"5"});
	//供货商
	loadmodal({"TableName":"#jqGrid_supplier","pager":"#jqGridpager_supplier","LoadTableUrl":"/manager/afterSalesCommon/getContactsunits","TableInfo":"7"});

	inputYF("#verifYF");
	inputYF2("#fourTier");
	chooseYF("#beiYF");//备用机
	batchValidator("#batchValidator");//批量模式
//	var mytime=myDate.toLocaleDateString();  
//	console.log(mytime)
	
});

$(document).on('change','.weixiuYFT',function(){
	accountYF();//资金账户
	$('.moneyCh').val('');
	$('.YFhideIn4').val('');
});

var accountYF = function(){
	var sectionId=$('.weixiuYFT').val();
	$.request({
        type: 'Get',
        url: '/manager/afterSalesCommon/getAccounts?sectionId='+sectionId,
        dataType: "json",
        success: function (data) {
			var moneyList = data.data.accountList;
			var str1 = '<tr><th>付款类别</th><th>账户名称</th><th>付款金额</th></tr>';
	 		var str2 = '';
	 		var str3 = '<tr><td>合计</td><td colspan="2" style="text-align: right;" class="totalMoney" value="0.00"></td></tr>';
	 		for(var i = 0,len = moneyList.length; i < len;i ++){
	 			str2 += '<tr><td>'+moneyList[i].customer+'</td><td>'+moneyList[i].name+'</td><td><input type="text" class="money mon'+i+'" data-accId='+moneyList[i].id+' value="" onkeyup="this.value=this.value.replace(/[^\\d\\.]$/g,\'\') " onafterpaste="this.value=this.value.replace(/[^\\d\\.]$/g,\'\') "></td></tr>';
	 		}
	 		
	 		var moneyListYJ = data.data.accountList;
	 		var str1YJ = '<tr><th>付款类别</th><th>账户名称</th><th>付款金额</th></tr>';
	 		var str2YJ = '';
	 		var str3YJ = '<tr><td>合计</td><td colspan="2" style="text-align: right;" class="totalMoneyYJ" value="0.00"></td></tr>';
	 		for(var i = 0,len = moneyListYJ.length; i < len;i ++){
	 			str2YJ += '<tr><td>'+moneyListYJ[i].customer+'</td><td>'+moneyListYJ[i].name+'</td><td><input type="text" class="moneyYJ mon'+i+'" data-accId='+moneyListYJ[i].id+' value="" onkeyup="this.value=this.value.replace(/[^\\d\\.]$/g,\'\') " onafterpaste="this.value=this.value.replace(/[^\\d\\.]$/g,\'\') "></td></tr>';
	 		}
	 		var tab = str1 + str2 + str3;
	 		var tabYJ = str1YJ + str2YJ + str3YJ;
	 		$('.moneyTab').html('');
	 		$('.moneyTab').append(tab);
	 		$('.moneyTabYJ').html('');
	 		$('.moneyTabYJ').append(tabYJ);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}


$(document).on('blur','.moneyYJ',function(e){
	var totalYJ = 0;0
	$('.moneyYJ').each(function(){
		totalYJ += ((($(arguments[1]).val() * 1).toFixed(2)) * 1);
	});
	$('.totalMoneyYJ').html(totalYJ);
});
$(document).on('blur','.money',function(e){
	var total = 0;0
	$('.money').each(function(){
		total += ((($(arguments[1]).val() * 1).toFixed(2)) * 1);
	});
	$('.totalMoney').html(total);
});
$(document).on('click','.saveMoneyYJ',function(e){
	var totalYJ = $('.totalMoneyYJ').html();
	$('.YFhideIn4').val(totalYJ);
});
$(document).on('click','.saveMoney',function(e){
	var total = $('.totalMoney').html();
	$('.moneyCh').val(total);
});
//新增一行
$(document).on('click', '.glyphicon-plus-sign',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	var dataIdList=$(this).parents('table').getDataIDs();
	var maxId=Math.max.apply(null,dataIdList);
	$("#jqGrid_batchModel").jqGrid('addRowData', maxId+1, {}, 'last' );
	$('#jqGrid_batchModel').jqGrid('setCell',maxId+1,'serviceType','售后');
});
//删除一行
$(document).on('click', '.glyphicon-trash',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	if(thisTitle == "删除行"){
		if($("#jqGrid_batchModel"+' tbody tr').length === 2) {
			$.zxsaas_plus.showalert("错误","至少保留一条数据!")
			return false;
		}
		$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
			$("#jqGrid_batchModel").jqGrid('delRowData', rowId);
		},function(){
			
		});

	}
});

//查询习惯输入文本
var da="";
var daid="";
var datayf=[];
var habitImport = function(ty){
	var type=ty;
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/getUsedRecord?type="+type,
    	type:'GET',
    	dataType:'JSON',
    	contentType:'application/json;charset=utf-8',
    	async:false,
    	success:function(data){
			datayf=data.data.records;
			for(var i=0,len=datayf.length;i<len;i++){
				da =datayf[i].content;
				daid=datayf[i].id;
			}
			
	    },
	    error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    });
}
	
$(document).on('click','.looksDesc',function(){
	$('.description').empty();
	var a=$(this).data('type');
	habitImport(a);
	for(var i=0,len=datayf.length;i<len;i++){
		da =datayf[i].content;
		daid=datayf[i].id;
		$('.description').append('<p><span class="yfVAR" data-id="'+daid+'">'+da+'</span> <span class="glyphicon glyphicon-trash yfdelect"></span></p>');
	}
	$('.YFshui').hide();
	$('.guDiv').hide();
});
$(document).on('click','.randomAttachment',function(){
	$('.YFshui').empty();
	var a=$(this).data('type');
	habitImport(a);
	for(var i=0,len=datayf.length;i<len;i++){
		da =datayf[i].content;
		daid=datayf[i].id;
	$('.YFshui').append('<p><span class="yfVAR" data-id="'+daid+'">'+da+'</span> <span class="glyphicon glyphicon-trash yfdelect"></span></p>');
	}
	$('.description').hide();
	$('.guDiv').hide();
});
$(document).on('click','.faultExplain',function(){
	$('.guDiv').empty();
	var a=$(this).data('type');
	habitImport(a);
	for(var i=0,len=datayf.length;i<len;i++){
		da =datayf[i].content;
		daid=datayf[i].id;
	$('.guDiv').append('<p><span class="yfVAR" data-id="'+daid+'">'+da+'</span> <span class="glyphicon glyphicon-trash yfdelect"></span></p>');
	}
	$('.YFshui').hide();
	$('.description').hide();
});

//查询维修卡会员卡查询
var memberYF = function(){
	var cardNum=$(".cardNo").val();
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/queryByCard?cardNum="+cardNum,
    	type:'GET',
    	dataType:'JSON',
    	contentType:'application/json;charset=utf-8',
    	async:false,
    	success:function(data){
			if(data.result==1){
				var dataList1=data.data.member.phone;
				var dataList2=data.data.member.name;
				var dataList3=data.data.member.contactUnitId;
				var dataList4=data.data.member.contactUnitName;
				$('.telephone').val(dataList1);
				$('.customId').val(dataList2);
				$('.unitSearchYF1').val(dataList3);
				$('.wanglai1').val(dataList4);
				
				$('.customId').attr({"disabled":"disabled"});
				$('.telephone').attr({"disabled":"disabled"});
			}else{
				$('.customId').val('');
				$('.telephone').val('');
				$('.cardNo').val('');
				$('.customId').removeAttr("disabled");
				$('.telephone').removeAttr("disabled");
				$.zxsaas_plus.showalert("提示","会员卡号不存在!")
			}
			
			
	    },
	    error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    });
}

$(document).on('blur','.cardNo',function(){
	if($.trim($('.cardNo').val())!=""){
		memberYF();
		keYONG();
	}else{
		$('.customId').val('');
		$('.telephone').val('');
		$('.customId').removeAttr("disabled");
		$('.telephone').removeAttr("disabled");
	}
});

//查询维修卡串号查询
var numberYF = function(){
	var imei=$(".imei").val();
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/queryImei?imei="+imei,
    	type:'GET',
    	dataType:'JSON',
    	contentType:'application/json;charset=utf-8',
    	async:false,
    	success:function(data){
			if(data.result==1){
				var data1=data.data.goods.goodsBrandId;
				var data2=data.data.goods.goodsBrandName;
				var data3=data.data.goods.goodsCategoryId;
				var data4=data.data.goods.goodsCategoryName;
				var data5=data.data.goods.attrs.auxiliaryImei;
				
				var data6=data.data.goods.id;
				var data7=data.data.goods.name;
				var data8=data.data.goods.goodsModel;
				var data9=data.data.goods.goodsColorId;
				var data10=data.data.goods.goodsColorName;
				var data11=data.data.goods.attrs.sectionId;
				var data12=data.data.goods.attrs.sectionName;
				var data13=data.data.goods.attrs.billsDate;
				var data14=data.data.goods.attrs.billsCode;
				
				$('.brandId').val(data1);
				$('.categoryId').val(data3);
				$('.auxiliaryImei').val(data5);
				$('.nameModle').val(data7);
				$('.nameModleid').val(data6);
				$('.editionNo').val(data8);
				$('.color').val(data9);
				$('#datetimepickerStart1').val(data13);
				$('.xiaosuo').val(data12);
				$('.add_tree_ids').val(data11);
				$('.salesNo').val(data14);
			}
			
			
	    },
	    error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    });
}

$(document).on('blur','.imei',function(){
	if($.trim($('.imei').val())!=""){
		numberYF();
		keYONG();
	}else{
		$('.nameModle').val('');
		$('.auxiliaryImei').val('');
		$('.editionNo').val('');
		$('.salesNo').val('');
	}
	
});

//回车查询
$(document).on('keydown','.cardNo',function(event){
	if(event.keyCode==13){
		if($.trim($('.cardNo').val())!=""){
			memberYF();
		}
	}
});
$(document).on('keydown','.imei',function(event){
	if(event.keyCode==13){
		if($.trim($('.imei').val())!=""){
			numberYF();
		}
	}
});

var rowsId="";
//供应商
$(document).on('click','.supplier',function(){
	 rowsId = $(this).data('rid');
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
		    $('.supplierGHS').val(treeNode.id);//存放点击的节点Id
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
		    		$('#jqGrid_supplier').jqGrid('clearGridData');
		    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
		    			$('#jqGrid_supplier').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
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
		}; 
		
		 $.request({
	            type: 'Get',
	            url: '/manager/TunitClass/findTree?groupId='+groupId,
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($('#supplierTree'), setting, data);
	                var zTree = $.fn.zTree.getZTreeObj("#supplierTree");
	             //   zTree.expandAll(true);//展开全部节点
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
});
//供货商
function gongH(cellvalue, options, rowObject){
   return '<span class="gongH" data-dismiss="modal">' + cellvalue + '</span>';
};
$(document).on('click','.gongH',function(cellvalue, options,rowObject){
	var a=$(this).text();
	var b=$(this).parent().prev().prev().text();
	$('.supplier'+rowsId).val(a);
	$('.supplierGHS').val(b);
	$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_supplierId]').html(b);
});
//品牌下拉
function departmentYF(){
	//var countries = {};
	$.request({  
	 	url: '/manager/afterSalesCommon/getBrands',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.list.length;i < len;i ++){
	 			countries = data.data.list[i];
	 			$('.brandId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};
//所属分类下拉
function categoryYF(){
	//var countries = {};
	$.request({  
	 	url: '/manager/afterSalesCommon/getCategory',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.list.length;i < len;i ++){
	 			countries = data.data.list[i];
	 			$('.categoryId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};
//可用增值服务
//$(document).on('click','.keYONG',function(){
var keYONG =function(){
	var cardNo =$('.cardNo').val();
	var imei =$('.imei').val();
	$.request({
	   	url:'/manager/afterSalesService/takeMachine/getAvaAddService?cardNo='+cardNo+'&imei='+imei,
	   	dataType:'json',
	   	contentType:'application/json;charset=utf-8',
	   	type:'GET',
	   	success:function(data){
				var dataList = data.data.list;
				$("#jqGrid_appreciationYF").jqGrid('clearGridData');
				for(var i = 0,len = dataList.length;i<len;i ++){
					var dataArr = dataList[i].attrs.addService;
					var arr ={
						'id':dataList[i].id,
						'serviceInstanceNo':dataList[i].serviceInstanceNo,
						'serviceName':dataArr.serviceName,
						'effectDateString':dataList[i].effectDateString,
						'invalidDateString':dataList[i].invalidDateString,
						'peploe':dataList[i].attrs.managerSectionName,
						'fs':dataList[i].attrs.managerName,
						'fx':dataList[i].enableTimes,
						'usedTimes':dataList[i].usedTimes
					}
					$("#jqGrid_appreciationYF").jqGrid('addRowData',(i+1),arr,'last');
				}
	   	}
//	   	error:function(){
//	   		$.zxsaas_plus.showalert("","error!")
//	   	}
	   	
	   })
}
//});

//历史维修记录
$(document).on('click','.history01',function(){
	loadmodal({"TableName":"#jqGrid_historyYF","pager":"#jqGridPager_historyYF","TableInfo":"1"});
	var imei =$('.imei').val();
	var phone=$('.telephone').val();
	$.request({
	   	url:'/manager/afterSalesService/receiveRecord/queryHistory?imei='+imei+'&phone='+phone,
	   	dataType:'json',
	   	contentType:'application/json;charset=utf-8',
	   	type:'GET',
	   	success:function(data){
	//	debugger;
			if(data.result==1){
				var dataList = data.data.list;
				$("#jqGrid_historyYF").jqGrid('clearGridData');
				for(var i = 0,len = dataList.length;i<len;i ++){
					var arr ={
						'id':dataList[i].id,
						'flowNo':dataList[i].flowNo,
						'dealDate':dataList[i].dealDate,
						'upDate':dataList[i].takeTime,
						'testByName':dataList[i].testByName,
						'handleMode':dataList[i].handleModeName,
						'repairFlag':dataList[i].repairFlag,
						'fx':dataList[i].testResult,
						'faultExplain':dataList[i].faultExplain,
						'repairCost':dataList[i].repairCost,
						'goodsCategoryName':dataList[i].goodsCategoryName,
						'name':dataList[i].goodsName,
						'imei':dataList[i].imei,
						'newImei':dataList[i].newImei
					}
					$("#jqGrid_historyYF").jqGrid('addRowData',(i+1),arr,'last');
					
					var repairFlag=dataList[i].repairFlag;
					if(repairFlag==0){
    					$('#jqGrid_historyYF').jqGrid('setCell',i+1,'repairFlag','否');
    				}
					if(repairFlag==1){
						$('#jqGrid_historyYF').jqGrid('setCell',i+1,'repairFlag','是');
					}
				}
			}
	   	},
	   	error:function(){
	   		$.zxsaas_plus.showalert("","error!")
	   	}
	   	
	   })
});

//批量模式主表
$(document).on('click','.batchModalY',function(){
	loadmodal({"TableName":"#jqGrid_batchModel","pager":"#jqGridPager_batchModel","TableInfo":"2","choose":true});
	
});
$(document).on('click','.scatYF',function(){
	$('.footYF').show();
});
$(document).on('click','.batchModalY',function(){
	$('.footYF').hide();
});

//弹出框
//串号备用机
$(document).on('click', '.numberChoose',function(e){
	loadmodal({"TableName":"#jqGrid_tranNumber","pager":"#gridpager_tranNumber","TableInfo":"3"});
	var goodsId=$('.spGOODS').val();
	var storageId=$('.YFhideIn1').val();
	$.request({
	   	url:'/manager/afterSalesCommon/getImeis?goodsId='+goodsId+'&storageId='+storageId,
	   	dataType:'json',
	   	contentType:'application/json;charset=utf-8',
	   	type:'GET',
	   	success:function(data){
				var dataList = data.data.imeiList;
				$("#jqGrid_tranNumber").jqGrid('clearGridData');
				for(var i = 0,len = dataList.length;i<len;i ++){
					var arr ={
						'id':dataList[i].id,
						'imei':dataList[i].imei,
						'auxiliaryImei':dataList[i].auxiliaryImei,
						'remark':dataList[i].remark
					}
					$("#jqGrid_tranNumber").jqGrid('addRowData',(i+1),arr,'last');
				}
	   	},
	   	error:function(){
	   		$.zxsaas_plus.showalert("","error!")
	   	}
	   	
	   })
});
$(document).on('click','.numberCheck',function(cellvalue, options,rowObject){
	var a=$(this).html();
	$('.YFhideIn3').val(a);
});
function numberCheck(cellvalue, options, rowObject){
	return '<span class="numberCheck" data-dismiss="modal">' + cellvalue + '</span>';
};
//销售部门
$(document).on('click','.depFilter',function(){
   var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "parentId",
					rootPId: null
				}
			},
			callback: {
				onClick: zTreeOnCheck
			},
			view: {
				showIcon: false
			},
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
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			nodes = zTree.getSelectedNodes();
			var node = nodes[0];
			if(node.isParent){
			    //判断后做操作
			    $.zxsaas_plus.showalert("错误","只能选择子节点数据!")
			}else{
				$('.xiaosuo').val(tName);
				$('.add_tree_ids').val(id);
				$("#depFilter").modal('hide')
			}
		}; 
	$.request({
       type: 'Get',
       url: '/manager/afterSalesCommon/getSections',
       dataType: "json",
       success: function (data) {
           $.fn.zTree.init($("#filterModelTree"), setting, data.data.sectionList);
          var zTree = $.fn.zTree.getZTreeObj("filterModelTree");
          zTree.expandAll(true);//展开全部节点
        
       },
       error: function (msg) {
           alert(" 数据加载失败！" + msg);
       }
   });
});
//商品名称
$(document).on('click','.goodsFilter',function(){
   wangTree();
   rowsId = $(this).data('rid');
   loadmodal({"TableName":"#jqGrid_tranSpmc","pager":"#gridpager_tranSpmc","TableInfo":"6","LoadTableUrl":"/manager/afterSalesCommon/getGoods"});
   $.request({
   	url:'/manager/Tgoodsname/page',
   	dataType:'json',
   	contentType:'application/json;charset=utf-8',
   	
   	type:'GET',
   	data:{
		page:1,
		rows:10
	},
   	success:function(data){
			var dataList = data.data.rows;
			$("#jqGrid_tranSpmc").jqGrid('clearGridData');
			for(var i = 0,len = dataList.length;i<len;i ++){
				$("#jqGrid_tranSpmc").jqGrid('addRowData',i,dataList[i],'last');
			}
   	},
   	error:function(){
   		$.zxsaas_plus.showalert("","error!")
   	}
   	
   })
});
function spmcCheck(cellvalue, options, rowObject){
	return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
};
$(document).on('keydown','.quickGoods',function(event){
	if(event.keyCode==13){
		quickGoods();
	}
});
function quickGoods(){
	var fasttips = $('.quickGoods').val();
	$.request({
    	url:'/manager/Tgoodsname/page',
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	
    	type:'GET',
    	data:{
		keyWord:fasttips,
		selectTreeClassId:curr_goodsclass_tree_selectId,
		page:1,
		rows:10
	},
    	success:function(data){
			var dataList = data.data.rows;
			$("#jqGrid_tranSpmc").jqGrid('clearGridData');
			for(var i = 0,len = dataList.length;i<len;i ++){
				$("#jqGrid_tranSpmc").jqGrid('addRowData',i,dataList[i],'last');
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
}
$(document).on('click','.spmcCheck',function(cellvalue, options,rowObject){
	var val=$(this).html();
	
	var ids=$(this).parents('tr').attr('id');
	var id=$('#jqGrid_tranSpmc').getCell(ids,'id');
	var code=$('#jqGrid_tranSpmc').getCell(ids,'code');//商品编码
	var name=$('#jqGrid_tranSpmc').getCell(ids,'name');
	var goodsCategoryName=$('#jqGrid_tranSpmc').getCell(ids,'goodsCategoryName');//商品类别
	var goodsCategoryId=$('#jqGrid_tranSpmc').getCell(ids,'goodsCategoryId');
	var goodsModel=$('#jqGrid_tranSpmc').getCell(ids,'goodsModel');//商品型号
	var goodsBrandId=$('#jqGrid_tranSpmc').getCell(ids,'goodsBrandId');
	var goodsBrandName=$('#jqGrid_tranSpmc').getCell(ids,'goodsBrandName');//商品品牌
	var goodsColorName=$('#jqGrid_tranSpmc').getCell(ids,'goodsColorName');//商品颜色
	
	var a= $('#scatteredModel').is(':hidden');
	var b=$('#batchModel').is(':hidden');
	if(!a){
		$('.YFhideIn2').val(val);
		$('.spGOODS').val(ids);
		$('.codeyf').val(bian);
		$('.ppyf').val(sppp);
		$('.coloryf').val(color);
		
		if($('.YFhideIn2').val()!=''){
			$('.tuYF2').removeClass('box_input');
			$('.YFhideIn3').removeAttr("disabled");
			$('.YFbtnHied2').show();
			refreshValidatorField("YFhideIn2",'#beiYF');//刷新验证信息
		}
	}else if(!b){
		$('.goodsRid'+rowsId).val(val);
		
		$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_goodsId]').html(ids);
		$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_code]').html(code);
		$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_goodsCategoryId]').html(goodsCategoryName);
		$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_goodsBrandId]').html(goodsBrandName);
		$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_goodsModel]').html(goodsModel);
		$('#jqGrid_batchModel').find('td[aria-describedby=jqGrid_batchModel_color]').html(goodsColorName);
		
		$('.goodsIDYF').val(ids);
	}else{
		alert('错误！')
	}
});


//判断复选框勾选显示
$(document).on('click','.YFcheckbox',function(){
	if($(this).prop('checked')){
		$('.YFhide').show();
		$('.YFhideIn1,.YFhideIn4').removeAttr("disabled");
		$('.YFhideIn2,.YFhideIn3').removeAttr("disabled");
		$('.YFbtnHied1,.YFbtnHied2,.YFbtnHied3').show();
		$('.tuYF1,.tuYF2,.tuYF3').removeClass('box_input');
	}else{
		$('.YFhide').hide();
		$('.YFhideIn1,.YFhideIn4').attr("disabled","disabled");
		$('.YFhideIn2,.YFhideIn3').attr("disabled","disabled");
		$('.YFbtnHied1,.YFbtnHied2,.YFbtnHied3').hide();
		$('.tuYF1,.tuYF2,.tuYF3').addClass('box_input');
		$('.YFhideIn1,.YFhideIn2,.YFhideIn3,.YFhideIn4,.ppyf,.codeyf,.coloryf').val('');
		refreshValidatorField("YFhideIn1",'#beiYF');//刷新验证信息
	}
	
	if($('.YFhideIn2').val()==''){
		$('.tuYF2').addClass('box_input');
		$('.YFhideIn3').attr("disabled","disabled");
		$('.YFbtnHied2').hide();
	}
});

//判断选择了商品和仓库才能选择串号
$(document).on('change','.YFhideIn2',function(){
	if($('.YFhideIn2').val()==''){
		$('.tuYF2').addClass('box_input');
		$('.YFhideIn3').attr("disabled","disabled");
		$('.YFbtnHied2').hide();
	}
});

//往来单位
$(document).on('click','.unitChoose',function(){
//	var aas=$('.tckWidth').width();
//	$('.tckWidth1').attr('width',aas);
//	console.log(aas)
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
		    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
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
		}; 
		
		 $.request({
	            type: 'Get',
	            url: '/manager/TunitClass/findTree?groupId='+groupId,
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
});

//往来单位新增
function cLink(cellvalue, options, rowObject){
   return '<span class="unitCh" data-dismiss="modal">' + cellvalue + '</span>';
};

$(document).on('click','.unitCh',function(e){
    var val=$(this).text();
    var id=$(this).parent().prev().prev().text();
	 var a= $('#scatteredModel').is(':hidden');
	var b=$('#batchModel').is(':hidden');
	if(!a){
		$('.wanglai1').val(val);
		$('.unitSearchYF1').val(id);
		refreshValidatorField("wanglai1",'#verifYF');//刷新验证信息
	}else if(!b){
		$('.wanglai2').val(val);
		$('.unitSearchYF2').val(id);
		refreshValidatorField("wanglai2",'#batchValidator');//刷新验证信息
	}else{
		alert('错误')
	}
	
});

$(document).on('keydown','.lingSUnit',function(event){
	if(event.keyCode==13){
		quickUnit();
	}
});
//往来单位的回车事件查询
function quickUnit(){
	var name = $('.lingSUnit').val();
	$.request({  
	 	url: '/manager/afterSalesCommon/getContactsunits?name='+name,//请求路径  
	 	async: false,  
	 	success: function(data) { 
			$("#jqGrid_roleMsgAdd").jqGrid('clearGridData');
			var dataList =data.data.contactsunitList;
			for(var i = 0,len = dataList.length;i<len;i ++){
				$("#jqGrid_roleMsgAdd").jqGrid('addRowData',i,dataList,'last');
			}
	 	},
	 	error:function(){
	 		
	 	}
 	});
}


//维修部门下拉
function getStorageWEI(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			countries = data.data.sectionList[i];
	 			$('.repairSectionId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

//仓库下拉
function entrepotYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getStorages',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.storageList.length;i < len;i ++){
	 			countries = data.data.storageList[i];
	 			$('.YFhideIn1').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

//检测人下拉
function detectionYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getManagers',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.managerList.length;i < len;i ++){
	 			countries = data.data.managerList[i];
	 			$('.testBy').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

//颜色下拉
function colorSYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getColor',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.list.length;i < len;i ++){
	 			countries = data.data.list[i];
	 			$('.color').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

/****零散模式*****/

$(document).on('click',function(e){
	var tar = $(e.target);
	if(tar.closest('.colorDiv').length == 0){
		$('.colorDiv').hide();
		e.stopPropagation();
	}
	if(tar.closest('.guDiv').length == 0){
		$('.guDiv').hide();
	}
	if(tar.closest('.description').length == 0){
		$('.description').hide();
	}
	if(tar.closest('.YFshui').length == 0){
		$('.YFshui').hide();
	}


});

/**
 * 显示相应div
 */
$(document).on('click','.input-none',function(e){
	var prevText = $(this).parent().prev().html();
	switch (prevText){
		case '颜色：':
			$('.colorDiv').show();
			e.stopPropagation();
			break;
		case '故障说明：':
			$('.guDiv').show();
			e.stopPropagation();
			break;
		case '外观描述：':
			$('.description').show();
			e.stopPropagation();
			break;
		case '随机附件：':
			$('.YFshui').show();
			e.stopPropagation();
			break;
		default:
			break;
	}
});
/**
 * 给input赋值
 */
$(document).on('click','.yfVAR',function(e){
		var vale = $(this).html();
		var dataid=$(this).data('id');
		$('.wgms').attr({"data-id":dataid});
		 var pText = $(this).parents(".Zpercent").find(".box_text");
		pText.next().find('input').val(vale)
		$('.none-cx').hide();
	});
/*删除*/
$(document).on('click','.yfdelect',function(){
	var dataid=$(this).prev().data('id');
	$('.wgms').attr({"data-id":dataid});
	var id=$('.wgms').data('id');
	 $.request({
	    	url:"/manager/afterSalesService/receiveRecord/deleteUsedRecord?id="+id,
	    //	type:'POST',
	    	dataType:'json',
	    	contentType:'application/json',
	   // 	data:JSON.stringify(data),
	    	traditional:true,
	    	success:function(data){
	    	},
	    	error:function(){
	    		$.zxsaas_plus.showalert("错误","error!")
	    	}
	    });
	 //$(".description").load(location.href+".description");
	 $(this).parent().hide();
});

var tableArr = [];//表格数据
/**
 * 调用保存方法
 */
//零散模式
var saveDoLing = function(e){
	var data = saveDataLing();
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/save",
    	type:'POST',
    	dataType:'json',
    	contentType:'application/json',
    	data:JSON.stringify(data),
    	traditional:true,
    	success:function(data){
    		(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
    		tableArr = [];
    		if(data.result == -999){
    			$.zxsaas_plus.showalert("错误","保存失败!")
    		}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("错误","保存失败!")
    	}
    	
    })
};
$(document).on('click','.saveData',function(e){
	
//	window.location.reload(true);
	var a= $('#scatteredModel').is(':hidden');
	var b=$('#batchModel').is(':hidden');
	var rowIds=$('#jqGrid_batchModel').jqGrid('getGridParam','selarrrow');
	if(!a){
		$("#verifYF").data('bootstrapValidator').validate();
		$("#fourTier").data('bootstrapValidator').validate();
		if(!($("#verifYF").data('bootstrapValidator').isValid())&&!($("#fourTier").data('bootstrapValidator').isValid())){
			refreshValidator("#verifYF");
			refreshValidator("#fourTier");
			return;
		}
		$("#beiYF").data('bootstrapValidator').validate();
		if($('.YFcheckbox').prop('checked')){
			if(!($("#beiYF").data('bootstrapValidator').isValid())){
				refreshValidator("#beiYF");
				return;
			}
		}
		saveDoLing();
	}else if(!b){
		$("#batchValidator").data('bootstrapValidator').validate();
		if(!($("#batchValidator").data('bootstrapValidator').isValid())){
			refreshValidator("#batchValidator");
			return;
		}
		if(rowIds!=''){
			saveDo();
		}else{
			$.zxsaas_plus.showalert("错误","登记失败!")
		}
		
	}else{
		alert('保存错误！')
	}
	saveFont();
});

//保存习惯输入文本
var saveFont = function(){
	var data=saveFO();
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/saveUsedRecord",
    	type:'POST',
    	dataType:'JSON',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	success:function(data){
	    },
	    error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    });
}
var saveFO = function(){
	var tab=[];
	tab.push({'type':$('.looksDesc').data('type'),'content':$('.looksDesc').val()},
			{'type':$('.randomAttachment').data('type'),'content':$('.randomAttachment').val()},
			{'type':$('.faultExplain').data('type'),'content':$('.faultExplain').val()});
	return tab;
}

/**
 * 保存
 */

//批量模式
var saveDo = function(e){
	var data = saveData();
	$.request({
    	url:"/manager/afterSalesService/batchReceive/save",
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'POST',
    	success:function(data){
    		(data.result == 1) && ($.zxsaas_plus.showalert("","登记成功!"))
    		tableArr = [];
    		if(data.result == -999){
    			$.zxsaas_plus.showalert("错误","登记失败!")
    		}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
};

/**
 * 获取数据
 */
//零散模式
var saveDataLing = function(){
	
	//特殊框取值
	var selectYOU= $('.jxType option:selected').val();
	var selectWEI=$('.repairSectionId option:selected').val();
	var selectPI=$('.brandId option:selected').val();
	var selectFENL=$('.categoryId option:selected').val();
	var selectBAO=$('.YFselect1 option:selected').val();
	
	var checkBEI= 0;
	if($('.YFcheckbox').prop("checked") == true) {
		checkBEI= 1;
	}
	
	var checkFANX= 0;
	if($('.repairFlag').prop("checked") == true) {
		checkFANX= 1;
	}
	
	var selectCANG=$('.YFhideIn1').val();
	var selectJIAN=$('.testBy').val();
	var selectCHULI=$('.YFselect2 option:selected').val();
	
	//input输入框值
	var oneInYF ={
			'jxType':selectYOU,
			'dealDate':$('#datetimepickerStart').val(),
			'repairSectionId':selectWEI,
			'managersUid':$('.managersUid').val(),
			'repairStatus':$('.repairStatus').val(),
			'cardNo':$('.cardNo').val(),
			'customId':$('.customId').val(),
			'telephone':$('.telephone').val(),
			'memberAddress':$('.memberAddress').val(),
			'contactsunitId':$('.unitSearchYF1').val(),
			'imei':$('.imei').val(),
			'brandId':selectPI,
			'categoryId':selectFENL,
			'nameModle':$('.nameModle').val(),
			'goodsId':$('.nameModleid').val(),
			'auxiliaryImei':$('.auxiliaryImei').val(),
			'insuranceType':selectBAO,
			'looksDesc':$('.looksDesc').val(),
			'randomAttachment':$('.randomAttachment').val(),
			'editionNo':$('.editionNo').val(),
			'color':$('.color').val(),
			'buyDate':$('#datetimepickerStart1').val(),
			'faultExplain':$('.faultExplain').val(),
			'salesSectionId':$('.add_tree_ids').val(),
			'locationAddress':$('.locationAddress').val(),
			'goodsPhone':$('.goodsPhone').val(),
			'salesNo':$('.salesNo').val(),
			'invoiceNo':$('.invoiceNo').val(),
			'spareFlag':checkBEI,
			'storageId':selectCANG,
			'spareImei':$('.YFhideIn3').val(),
			'spareGoodsId':$('.spGOODS').val(),
			'testBy':selectJIAN,
			'repairFlag':checkFANX,
			'handleMode':selectCHULI,
			'quotePrice':$('.quotePrice').val(),
			'remark':$('.remark').val()
	};
	//底部总金额
 	var monInputYJ = $('.moneyYJ');
 	var monArrYJ = [];//金额
 	$('.moneyYJ').each(function(){
 		if($.trim($(arguments[1]).val())!=''&&$.trim($(arguments[1]).val())!=0){
 			monArrYJ.push({'accountId':$(arguments[1]).data('accid'),'payreceiptAmout':$(arguments[1]).val()});
 		}
 	});
 	
 	var monInput = $('.money');
 	var monArr = [];//金额
 	$('.money').each(function(){
 		if($.trim($(arguments[1]).val())!=''&&$.trim($(arguments[1]).val())!=0){
 		monArr.push({'accountId':$(arguments[1]).data('accid'),'payreceiptAmout':$(arguments[1]).val()});
 		}
 	});
	//押金弹出框
	var twoYaJ ={
			"amount": $('.YFhideIn4').val(), 
	        "remark": '', 
	        "details": monArrYJ	
	};
	//预收款弹出框
	var yushouYF = {
			"amount": $('.moneyCh').val(), 
	        "remark": '', 
	        "details": monArr	
	};
	var getData ={
			"main":oneInYF,
			"depositPayreceipt":twoYaJ,
			"paymentPayreceipt":yushouYF
	};

	return getData;
}

//批量模式
var saveData = function(){
	
	//特殊取值
	var selectJIE =$('.jxType option:selected').val();
	var selectWEI =$('.repairSectionId option:selected').val();
	
	var rowIds=$('#jqGrid_batchModel').jqGrid('getGridParam','selarrrow');
//	var rowIds = $('#jqGrid_batchModel').jqGrid('getDataIDs');
	for(var i = 0;i< rowIds.length;i++){
		var rows = $('#jqGrid_batchModel').jqGrid('getRowData',rowIds[i]);
		var goodsId =$('.goodsIDYF').val();
		var suggestHandleMode =$('.suggestHandleMode option:selected').val();
		tableArr.push({'jxType':selectJIE,'acceptDate':$('#datetimepickerStart2').val(),'repairSectionId':selectWEI,'managerId':$('.managerId').val(),'contactsunitId':$('.unitSearchYF2').val(),'contactBy':$('.contactBy').val(),'contactPhone':$('.contactPhone').val(),'address':$('.address').val(),'goodsId':rows.goodsId,'imei':rows.imei,'falutDesc':rows.falutDesc,'exteriorDesc':rows.exteriorDesc,'suggestHandleMode':suggestHandleMode,'randomEnclosure':rows.randomEnclosure,'remark':rows.remark,'supplyBy':rows.supplierId});
	}
	return tableArr;
}


//快速查询

var tbQuery =function(){
	var imei=$('.tbQuery').val();
	 $.request({
	    	url:"/manager/afterSalesService/receiveRecord/queryImei?imei="+imei,
	    	type:'GET',
	    	dataType:'json',
	    	contentType:'application/json',
	   // 	data:JSON.stringify(data),
	    //	traditional:true,
	    	success:function(data){
		 		if(data.result==1){
		 			$('#jqGrid_batchModel').delRowData(0);
		 				var dataList = data.data.goods;
					//	$("#jqGrid_batchModel").jqGrid('clearGridData');
					//	for(var i=0;i< dataList.length;i++){
		 				var id=dataList.id.toString();
		 				var idList=$('#jqGrid_batchModel').getCol('id');
		 				var hang=$('#jqGrid_batchModel').getDataIDs();
		 				if(idList.indexOf(id)!=-1){
		 					$.zxsaas_plus.showalert('提示','已存在');
		 					return;
		 				}
						var arr={
								"id":dataList.id,
								"code":dataList.code,
								"name":dataList.name,
								"goodsCategoryId":dataList.goodsCategoryName,
								"goodsBrandId":dataList.goodsBrandName,
								"goodsModel":dataList.goodsModel,
								"color":dataList.goodsColorName,
								"imei":dataList.attrs.imei,
								"supplyBy":dataList.attrs.supplierName,//供应商
								"supplierId":dataList.attrs.supplierId,//供应商
								"fx":dataList.attrs.billsDate
								
						};
						// rowsId = $(this).data('rid');
						var name=dataList.name;
						var gong=dataList.attrs.supplierName;
						var max=idList.length==0?1:Math.max.apply(null,hang);
						$("#jqGrid_batchModel").jqGrid('addRowData',max+1,arr,'last');
						var temp=max+1;
						$("#jqGrid_batchModel").find('tr[id='+temp+']').children('td:eq(5)').find('input').val(name);
						$("#jqGrid_batchModel").find('tr[id='+temp+']').children('td:eq(16)').find('input').val(gong);
					//	$('.goodsRid'+rowsId).val(name);
						$('#jqGrid_batchModel').jqGrid('setCell',temp,'serviceType','售后');
						//}
		 		}
		 		
		 		
		 		if(data.result==-3){
		 			$.zxsaas_plus.showalert('提示','串号不存在');
		 		}
	    	},
	    	error:function(){
	    		$.zxsaas_plus.showalert("错误","error!")
	    	}
	    });
};
$(document).on('keydown','.tbQuery',function(event){
	if(event.keyCode==13){
		tbQuery();
	}
});

$(document).on('click','.qding',function(){
	window.parent.document.querySelector("[data-href=id_120101]").querySelector('span').click();

});


//设置表格
$(document).on("click","#myTab>li>a",function(){
	var t=$(this).attr("href");
	$(t).find("table").setGridWidth($(t).width());
	
});























