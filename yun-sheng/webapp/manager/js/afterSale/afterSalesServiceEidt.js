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
			$(document).on('click','.saveZtree',function(e){
				
				var zTree = $.fn.zTree.getZTreeObj(treeId);
				nodes = zTree.getSelectedNodes();
				var node = nodes[0];
				if(node.isParent){
				    //判断后做操作
				    $.zxsaas_plus.showalert("错误","只能选择子节点数据!")
				}else{
					$('.' + options.depName).val(tName);
					
					
				}
			});
			
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

var	lastrow = "";
var lastcell = "";
function loadmodal(options){
	//初始化参数
	var colName = [];
	//主表，售后处理，转至售后 ，不可增加
	var colName0 =['操作','id','商品编码','仓库id','仓库','商品名称','所属类别','品牌','型号','颜色','串号',
	               '故障说明','外观描述','建议处理方式','备注','入库时间','供应商','业务流水号','服务类型','手机状态','商品类别id','品牌id'];
	colName[0] = colName0;
	//主表下的选项卡表 ，维修项目，可增加
	var colName1 =['操作','id','售后部门','送修部门','入库仓库','售后处理单号','业务流水号','商品名称','型号','品牌','新颜色',
	           	'原颜色','外观描述','新主串号','原主串号','新辅串号','原辅串号','故障说明','商品id','备注','送修部门id','品牌Id','售后Id'];;
	colName[1] = colName1;
	
	var colName2 =['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号',
	               '商品类别id','商品品牌id','网络制式id'];
	colName[2] = colName2;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
						{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false,formatter: addAndDelete},
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
	                   
	                   {name:'storageNa',index:'storageNa', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'storageId',index:'storageId', width:150,align:'center',sorttype:'string',sortable:false,editable:true,edittype:'select',editoptions: {
	                	 //  value: getStorageCK(),
	                	   dataEvents:[{
	                		   type:"blur",fn:function(rowsid){
	                		   $(this).parent().prev().html($(this).val())
	                	     	//选择商品
	                	     	$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow ,lastcell );
	                	   		}
	                		   }]}},
	                   {name:'name',index:'name', width:180,align:'center',sorttype:'string',sortable:false,formatter:goodsModel},
	                   {name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center',sortable:false,sorttype:'string'},
	                   {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center',sortable:false,sorttype:'string'},
	                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sortable:false,sorttype:'string'},
	                   {name:'goodsColorName',index:'goodsColorName', width:100,align:'center',sortable:false,sorttype:'string'},
	                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_YFtab1').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.inputNum(this,20)"}},
	                   {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_YFtab1').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
	                   {name:'looksDesc',index:'looksDesc', width:130,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{onblur:"(function(){$('#jqGrid_YFtab1').jqGrid('saveCell',lastrow,lastcell)})()",onkeyup:"tableInput.checkStr(this,100)"}},
	                   {name:'suggestHandleMode',index:'suggestHandleMode', width:120,align:'center',sorttype:'string',sortable:false,formatter:selectYF},
	                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false,editable:true,editoptions:{dataEvents:[{type:"blur",fn:saveCell}]}},
	                   {name:'purchaseDateString',index:'purchaseDateString', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'supplierName',index:'supplierName', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'flowNo',index:'flowNo', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'fwu',index:'fwu', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'repairStatus',index:'repairStatus', width:100,align:'center',sorttype:'string',sortable:false},
	                   
	                   {name:'goodsCategoryId',index:'goodsCategoryId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'goodsBrandId',index:'goodsBrandId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
	                   
	                   
	                   ];
	JqGridColModel[0]=JqGridColModel0;

	var JqGridColModel1 =[
	                      {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',sortable:false,formatter: Delete},
		                  {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'repairSectionName',index:'repairSectionName', width:120,align:'center',sorttype:'string',sortable:false},
		                   {name:'giveSectionName',index:'giveSectionId', width:120,align:'center',sorttype:'string',sortable:false},
		                   {name:'storageId',index:'storageId', width:120,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   {name:'handleBillsNo',index:'handleBillsNo', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'flowNo',index:'flowNo', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsName',index:'goodsName', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsModel',index:'goodsModel', width:120,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsBrandName',index:'goodsBrandName', width:120,align:'center',sorttype:'string',sortable:false},
		                   {name:'newColor',index:'newColor', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsColorName',index:'goodsColorName', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'looksDesc',index:'looksDesc', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newImei',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'oldImei',index:'oldImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'oldAuxiliaryImei',index:'oldAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsId',index:'goodsId',width:70,align:'center',hidden:true},
		                   {name:'remark',index:'remark',width:70,align:'center',hidden:false},
		                   //
		                   {name:'giveSectionId',index:'giveSectionId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   //增加的数据
		                   //ping'pai
		                   {name:'goodsBrandId',index:'goodsBrandId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
		                   //售后id
		                   {name:'repairSectionId',index:'repairSectionId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
		                   ];
	JqGridColModel[1]=JqGridColModel1;
	
	var JqGridColModel2=[
						 {name:'id',index:'id', width:55,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false,formatter:spmcCheck},
						{name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'goodsColorName',index:'goodsColorName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'networkStandardName',index:'networkStandardName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'ifManageImei',index:'ifManageImei', width:120,align:'center', sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"true:是;false:否"}},
						
						{name:'goodsCategoryId',index:'goodsCategoryId', width:120,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'goodsBrandId',index:'goodsBrandId', width:120,align:'center', sorttype:'string',sortable:false,hidden:true},
						{name:'networkStandard',index:'networkStandard', width:120,align:'center', sorttype:'string',sortable:false,hidden:true},
						
						];
	JqGridColModel[2]=JqGridColModel2;
	
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
//	LoadTableUrl: "../../json/afterSale/registrationCard.json",
	LoadTableUrl: "/manager/afterSalesService/receiveRecord/queryHistory?imei=null",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_YFtab1", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_YFtab1",
	TableInfo:"0",
	choose:true,
	height: $(window).height()*0.45,
	footerrow:false,
	userDataOnFooter:false
	
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#datetimepickerStart1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	$("#datetimepickerStart2").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	$("#datetimepickerStart3").datetimepicker({
		lang:"ch",           //语言选择中文
		format:"Y-m-d",      //格式化日期
		timepicker:false,    //关闭时间选项
		todayButton:false    //关闭选择今天按钮
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
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 20, 40],
		            pager:options.pager,
		            viewrecords: true,
		        
		           //  cellEdit:true,
		            width: "100%" ,
		           // height: $(window).height()*0.45,
		            height:options.height,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					//footerrow:true,  //设置表格显示表脚
					//userDataOnFooter:true,//设置userData 显示在footer里
					footerrow:options.footerrow,
					userDataOnFooter:options.userDataOnFooter,
					formatCell:function(rowid, cellname, value, iRow, iCol){
//								var param=$('#jqGrid_goodsRef').getRowData(rowid);
								$('#jqGrid_YFtab1').setColProp('storageId',{editoptions:{
									dataUrl:'/manager/afterSalesCommon/getStorages?sectionId='+$('.outstorSectionId').val(),
									buildSelect:function(data){
										
										var data=JSON.parse(data);
										var str='';
										var list=data.data.storageList;
										 str+='<select class="form-control shouhXIA">'
											  $.each(list,function(index,item){
												  str+='<option  value='+item.id+' >'+item.name+'</option>'
											  })
											  str+='</select>'
										return str;
									}
								}})	
								},

					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
//				      	if(options.TableInfo == 0){
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
						$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_fwu]').html("售前")
						$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_repairStatus]').html("未接收")
                   
					},
					loadComplete:function(data){
						$(options.TableName).jqGrid("saveCell",lastrow,lastcell);
						if(options.TableName=="#jqGrid_YFtab1"){
							if(data.data.list==0){
								$("#jqGrid_YFtab1").jqGrid('addRowData',0, {"deliveryDo":"","id":"","code":"","name":"","goodsCategoryName":"","goodsBrandName":"","goodsModel":"","goodsColorName":"","imei":"",
									"falutDesc":"","looksDesc":"","suggestHandleMode":"","remark":"","purchaseDateString":"","supplierName":"","flowNo":"","fwu":"售前","repairStatus":"未接收","goodsCategoryId":"","goodsBrandId":""}, 'last' );
							}
						}
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		function saveCell(){
			$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow ,lastcell );
			//$("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
		}
		
		function Delete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash delete" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" id="add_row" title="新增"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		
		
		
		// 列表复选框
		function checkBox(cellvalue, options, rowObjec){
			return '<input type="checkbox" class="checkBoxNum" data-id="' + rowObjec.deliveryId + '"  data-rId="' + options.rowId + '" />';
		}
		
		//商品名称
		function goodsModel(cellvalue, options, rowObject){
			return '<input type="text" class="godYF goodsRid' + options.rowId +'" style="border:0;text-align:center;width:150px;height:30px;" disabled/><span class="spmcChoose glyphicon glyphicon-plus" data-toggle="modal" data-target="#spmcChoose" data-rId="' + options.rowId +'"></span>';
			
		};
		//select下拉框
		function selectYF(cellvalue, options,rowObject){
			return '<select class="offerYF" style="border:0;text-align:center;width:100px;height:30px;"><option value="1">自修</option><option value="2">返厂</option><option value="3">外修</option><option value="4">换机</option><option value="5">退货</option></select>';
		};
}
$(document).ready(function(){
	var ad=$(document.body).width();
	
	$('.widthYF1').attr("width",ad);
	$('.widthYF2').attr("width",ad);
	
	loadmodal({"TableName":"#jqGrid_YFtab2","pager":"jqGridPager_YFtab2","TableInfo":"1","choose":false});
	getStorageWEI();//入库仓库下拉
	departmentYF(); //送修部门下拉
	
	peopleYF();//经手人下拉
	
	$('.hidde5').hide();
	$('.hidde6').hide();
	
	afterSales("#afterSales");//验证
});
//新增一行
$(document).on('click', '.glyphicon-plus-sign',function(e){
	 var a= $('#YFtab1').is(':hidden');
	var b=$('#YFtab2').is(':hidden');
	if(!a){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		var dataIdList=$(this).parents('table').getDataIDs();
		var maxId=Math.max.apply(null,dataIdList);
		$("#jqGrid_YFtab1").jqGrid('addRowData', maxId+1, {}, 'last' );
	}
	
});
//删除一行
$(document).on('click', '.glyphicon-trash',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	
    var a= $('#YFtab1').is(':hidden');
	var b=$('#YFtab2').is(':hidden');
	if(!a){
	//	alert('没有隐藏')
		if(thisTitle == "删除行"){
			if($("#jqGrid_YFtab1"+' tbody tr').length === 2) {
				$.zxsaas_plus.showalert("错误","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				$("#jqGrid_YFtab1").jqGrid('delRowData', rowId);
			},function(){
				
			});
		}
	}else if(!b){
	//	alert('已经隐藏')
		if(thisTitle == "删除行"){
			if($("#jqGrid_YFtab2"+' tbody tr').length === 2) {
				$.zxsaas_plus.showalert("错误","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				$("#jqGrid_YFtab2").jqGrid('delRowData', rowId);
			},function(){
				
			});
		}
	}else{
		alert('错误')
	}
});


$(document).on('click','.changeYF2',function(){
	loadmodal({"TableName":"#jqGrid_YFtab2","pager":"jqGridPager_YFtab2","url":"/manager/afterSalesService/acceptMachine/query","TableInfo":"1","choose":false});
	
	$('.hidde5').show();
    $('.hidde5').css({"border-left":"1px solid #cfcfcf"});
    $('.hidde1').hide();
    $('.hidde2').hide();
    $('.hidde3').hide();
    $('.hidde4').hide();
    $('.demandYF').hide();
    $('.hidde6').show();
    $('.hiddeXIN').hide();
    
});
$(document).on('click','.changeYF1',function(){
	loadmodal({"TableName":"#jqGrid_YFtab1","pager":"jqGridPager_YFtab1","TableInfo":"0"});
	
	$('.hidde5').hide();
    
    $('.hidde1').show();
    $('.hidde2').show();
    $('.hidde3').show();
    $('.hidde4').show();
    $('.demandYF').show();
    $('.hidde6').hide();
    $('.hiddeXIN').show();
});
$(document).on('click','.demandYF',function(){
	window.location.href="/manager/afterSalesService/serviceHandle/page";
})

//商品名称
var rowsId ="";
$(document).on('click','.spmcChoose',function(){
	wangTree();
	rowsId = $(this).data('rid');
	loadmodal({"TableName":"#jqGrid_tranSpmc","pager":"#gridpager_tran","TableInfo":"2","choose":false,"LoadTableUrl":"/manager/Tgoodsname/page"});
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
//				var arr ={
//					'id':dataList[i].id,
//					'code':dataList[i].code,
//					'name':dataList[i].name,
//					'goodsCategoryId':dataList[i].goodsCategoryId,
//					'goodsBrandId':dataList[i].goodsBrandId,
//					'goodsModel':dataList[i].goodsModel,
//					'goodsColorName':dataList[i].goodsColorName,
//					'networkStandard':dataList[i].networkStandard,
//					'ifManageImei':dataList[i].ifManageImei
//					//'goodsId':dataList[i].goodsId
//				}
				$("#jqGrid_tranSpmc").jqGrid('addRowData',i,dataList[i],'last');
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
});
$(document).on('click','.spmcCheck',function(cellvalue, options,rowObject){
	var a=$(this).html();
	
	var ids=$(this).parents('tr').attr('id');
	var a1=$('#jqGrid_tranSpmc').getCell(ids,'id');
	var a2=$('#jqGrid_tranSpmc').getCell(ids,'code');//商品编码
	var a3=$('#jqGrid_tranSpmc').getCell(ids,'name');
	var a4=$('#jqGrid_tranSpmc').getCell(ids,'goodsCategoryName');//商品类别
	var a5=$('#jqGrid_tranSpmc').getCell(ids,'goodsCategoryId');
	var a6=$('#jqGrid_tranSpmc').getCell(ids,'goodsModel');//商品型号
	var a7=$('#jqGrid_tranSpmc').getCell(ids,'goodsBrandId');
	var a8=$('#jqGrid_tranSpmc').getCell(ids,'goodsBrandName');//商品品牌
	var a9=$('#jqGrid_tranSpmc').getCell(ids,'goodsColorName');//商品颜色
	
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_goodsBrandId]').html(a7);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_goodsBrandName]').html(a8);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_goodsCategoryId]').html(a5);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_goodsCategoryName]').html(a4);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_goodsModel]').html(a6);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_goodsColorName]').html(a9);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_id]').html(a1);
	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_code]').html(a2);
//	$('#jqGrid_YFtab1').find('td[aria-describedby=jqGrid_YFtab1_name]').html(a3);
	$('.goodsRid'+rowsId).val(a);
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


var da="";
var daid="";
var datayf=[];
var habitImport = function(ty){
	var imei=ty;
	var sectionId=$('.outstorSectionId').val();
	$.request({
    	url:"/manager/afterSalesCommon/findImei?imei="+imei+"&sectionId="+sectionId,
    	type:'GET',
    	dataType:'JSON',
    	contentType:'application/json;charset=utf-8',
    	async:false,
    	success:function(data){
			datayf=data.data.imeiList;
			for(var i=0,len=datayf.length;i<len;i++){
				da =datayf[i].imei;
				daid=datayf[i].id;
			}
			
	    },
	    error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    });
}

//串号右匹配
$(document).on('keyup','.quickSHOU1',function(){
	var a=$(this).val().length;
	var aa=$(this).val();
	if(a>=4){
		$('.kuanYF').empty();
		habitImport(aa);
		for(var i=0,len=datayf.length;i<len;i++){
			da =datayf[i].imei;
			daid=datayf[i].id;
			$('.kuanYF').append('<p><span class="yfVAR">'+da+'</span></p>');
		}
	}else{
	}
	
});
/**
 * 给input赋值
 */
$(document).on('click','.yfVAR',function(e){
		var vale = $(this).html();
		var dataid=$(this).data('id');
	//	$('.wgms').attr({"data-id":dataid});
		 var pText = $(this).parents(".Zpercent").find(".box_text");
		pText.next().find('input').val(vale)
		$('.none-cx').hide();
		quickSHOU1();
});

//售后返回         回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
		 var a= $('#YFtab1').is(':hidden');
     	var b=$('#YFtab2').is(':hidden');
     	if(!a){
     		//quickSHOU1();
     	}else if(!b){
     		quickSHOU2();
     	}else{
     		alert('错误')
     	}
	}
});

//转至售后
function quickSHOU1(){
	var imei = $('.quickSHOU1').val();
	var sectionId=$('.outstorSectionId').val();
	$.request({
    	url:'/manager/afterSalesCommon/findImei?imei='+imei+'&sectionId='+sectionId,
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	async:true,
    	type:'GET',
    	success:function(data){
			var imeiList = data.data.imeiList;
			var tempList=[];
			var mainGridIdsList=$('#jqGrid_YFtab1').getDataIDs();
			$.each(mainGridIdsList,function(index,item){
				var data=$('#jqGrid_YFtab1').getRowData(item);
				if(data.id==""){
					$('#jqGrid_YFtab1').delRowData(item);
				}
			})
			var targetImei=imeiList[0].imei;
			var mainImeiListTemp=$('#jqGrid_YFtab1').getCol('imei');
			var mainImeiList=mainImeiListTemp.filter_(function(item,index){
				return item!="";
			})
			if(mainImeiList.legth!=0&&mainImeiList.indexOf(targetImei)!=-1){
				$.zxsaas_plus.showalert('提示','该串号已录入');
				return;
			}
		//	console.log(data) 
		//	$("#jqGrid_YFtab1").jqGrid('clearGridData');
			for(var i = 0,len = imeiList.length;i<len;i ++){
				var dataList=imeiList[i].attrs.goods;
				var name = dataList.name;
				var arr ={
					'id':dataList.id,
					'code':dataList.code,
					'name':dataList.name,
					'goodsCategoryId':dataList.goodsCategoryId,
					'goodsCategoryName':dataList.goodsCategoryName,
					'goodsBrandName':dataList.goodsBrandName,
					'goodsBrandId':dataList.goodsBrandId,
					'goodsModel':dataList.goodsModel,
					'goodsColorName':dataList.goodsColorName,
					
					'imei':imeiList[i].imei,
					'purchaseDateString':imeiList[i].purchaseDateString,
					'supplierName':imeiList[i].attrs.supplierName,
				}
//				var id=dataList.id.toString();
// 				var idList=$('#jqGrid_YFtab1').getCol('id');
//				var hang=$('#jqGrid_YFtab1').getDataIDs();
//				var max=idList.length==0?1:Math.max.apply(null,hang);
//				$("#jqGrid_YFtab1").jqGrid('addRowData',max+1,arr,'last');
				
				$("#jqGrid_YFtab1").jqGrid('addRowData',i+1,arr,'last');
				$('.goodsRid'+(i+1)).val(name);
				$('#jqGrid_YFtab1').jqGrid('setCell',i+1,'fwu','售前');
				$('#jqGrid_YFtab1').jqGrid('setCell',i+1,'repairStatus','未接收');
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
}
//售后返回
function quickSHOU2(){
	var giveSectionId = $('#giveSectionId').val();
	var imei = $('.quickSHOU2').val();
	$.request({
    	url:'/manager/afterSalesService/acceptMachine/query?imei='+imei+'&giveSectionId='+giveSectionId,
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	
    	type:'GET',
//    	data:{
//			keyWord:fasttips,
//			page:1,
//			rows:10
//		},
    	success:function(data){
		var dataList = data.data.pageList;
		$("#jqGrid_YFtab2").jqGrid('clearGridData');
		for(var i = 0,len = dataList.length;i<len;i ++){
			
			$("#jqGrid_YFtab2").jqGrid('addRowData',i,dataList[i],'last');
		}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
}


/**
 * 显示相应div
 */
$(document).on('click','.input-none',function(e){
	e.stopPropagation();
	$('.none-cx').show();
});
/**
 * 给input赋值
 */
$(document).on('click','.yfVAR',function(e){
		var va = $(this).html();
		$('.input-none').val(va);
		$('.none-cx').hide();
		//$('.input-none').attr('')
	});
/*删除*/
$(document).on('click','.yfdelect',function(){
	 $(this).parent().remove();
});
$(document).on('click',function(e){
	var tar = $(e.target);
	if(tar.closest('.none-cx').length == 0){
		$('.none-cx').hide();
	}
});

//部门模态框
function showSectionModal(){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	    zTreeClick(treeId,treeNode);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.ajax( {
		type : 'post',
		url:'/manager/storage/authorityAndTree/findTree',
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

function  zTreeClick(treeId,treeNode){
	if(treeNode.children.length != 0) return false;
	
}

//送修部门下拉
function departmentYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			countries = data.data.sectionList[i];
	 			$('.departmentYF').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};
//经手人下拉
function peopleYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getManagers',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.managerList.length;i < len;i ++){
	 			countries = data.data.managerList[i];
	 			$('.managerId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};
//入库仓库下拉
function getStorageWEI(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getStorages',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.storageList.length;i < len;i ++){
	 			countries = data.data.storageList[i];
	 			$('.entrepotYF').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

$(document).on('click','.hiddeXIN',function(){
	$('.outstorSectionId').removeAttr('disabled');
	$('.managerId').removeAttr('disabled');
	$('.aftersaleSectionId').removeAttr('disabled');
	$("#jqGrid_YFtab1").setColProp('storageId',{editable:true});
	$("#jqGrid_YFtab1").setColProp('imei',{editable:true});
	$("#jqGrid_YFtab1").setColProp('falutDesc',{editable:true});
	$("#jqGrid_YFtab1").setColProp('looksDesc',{editable:true});
	$("#jqGrid_YFtab1").setColProp('remark',{editable:true});
});
//查询按钮
$(document).on('click','.cxQueryYF',function(){
	$('.outstorSectionId').attr({"disabled":"disabled"});
	$('.managerId').attr({"disabled":"disabled"});
	$('.aftersaleSectionId').attr({"disabled":"disabled"});
	$("#jqGrid_YFtab1").setColProp('storageId',{editable:false});
	$("#jqGrid_YFtab1").setColProp('imei',{editable:false});
	$("#jqGrid_YFtab1").setColProp('falutDesc',{editable:false});
	$("#jqGrid_YFtab1").setColProp('looksDesc',{editable:false});
	$("#jqGrid_YFtab1").setColProp('remark',{editable:false});
	$("#jqGrid_YFtab1").setColProp('supplierName',{editable:false});
	
	$("#jqGrid_YFtab1").setColProp('name',{editable:false});
	
	var a = $('#YFtab1').is(':hidden');
	var b = $('#YFtab2').is(':hidden');
	
	var dateBegin=$('#datetimepickerStart3').val();//开始
	var dateEnd=$('#datetimepickerStart2').val();//结束
	var billsNoEnd=$('.billsNoEnd').val();
	var billsNoBegin=$('.billsNoBegin').val();
	if(!a){
		 $.request({
			   	url:'/manager/afterSalesService/serviceHandle/query?billsNoBegin='+billsNoBegin+'&billsNoEnd='+billsNoEnd+'&dateBegin='+dateBegin+'&dateEnd='+dateEnd,
			   	dataType:'json',
			   	contentType:'application/json;charset=utf-8',
			   	type:'GET',
			   	success:function(data){
						var dataList = data.data.list;
						$("#jqGrid_YFtab1").jqGrid('clearGridData');
						
						$('.outstorSectionId option:selected').val(data.data.outstorSectionId);
						$('.managerId option:selected').val(data.data.managerId);
						$('.billsNo').val(data.data.billsNo);
						$('.aftersaleSectionId option:selected').val(data.data.aftersaleSectionId);
						
						for(var i = 0,len = dataList.length;i<len;i ++){
							var good=dataList[i].attrs.goods;
							var dataUp=dataList[i].attrs.istockIm;
							var arr={
									'id':dataList[i].id,
									'code':good.code,
									'storageId':dataList[i].storageName,
									'name':good.name,
									'goodsCategoryName':good.goodsCategoryName,
									'goodsBrandName':good.goodsBrandName,
									'goodsModel':good.goodsModel,
									'goodsColorName':good.goodsColorName,
									'imei':dataList[i].imei,
									'falutDesc':dataList[i].falutDesc,
									'looksDesc':dataList[i].looksDesc,
									'suggestHandleMode':dataList[i].suggestHandleMode,
									'remark':dataList[i].remark,
									'purchaseDateString':dataUp.purchaseDateString,
									'supplierName':dataList[i].supplierName,
									'flowNo':dataList[i].flowNo,
									'goodsCategoryId':good.goodsCategoryId,
									'goodsBrandId':good.goodsBrandId
							}
							$("#jqGrid_YFtab1").jqGrid('addRowData',i+1,arr,'last');
						}
						if(data.result == -999){
			    			$.zxsaas_plus.showalert("错误","查询失败!")
			    		}
			   	},
			   	error:function(){
			   		$.zxsaas_plus.showalert("","查询失败!")
			   	}
		   })
	}else if(!b){
		//alert('b')
	}else{
		alert('查询失败！')
	}
	
});

//上一单，下一单
$(document).on('click','.upDown',function(e){
	
	var reUrl = function(sUrl){
		 $.request({
			   	url:sUrl,
			   	dataType:'json',
			   	contentType:'application/json;charset=utf-8',
			   	type:'GET',
			   	success:function(data){
						var dataList = data.data.list;
						$("#jqGrid_YFtab1").jqGrid('clearGridData');
						
						$('.outstorSectionId option:selected').val(data.data.outstorSectionId);
						$('.managerId option:selected').val(data.data.managerId);
						$('.billsNo').val(data.data.billsNo);
						$('.aftersaleSectionId option:selected').val(data.data.aftersaleSectionId);
						
						for(var i = 0,len = dataList.length;i<len;i ++){
							$("#jqGrid_YFtab1").jqGrid('addRowData',i,dataList[i],'last');
						}
			   	},
			   	error:function(){
			   		$.zxsaas_plus.showalert("","error!")
			   	}
			   	
		   })
	}
	var dateBegin=$('#datetimepickerStart3').val();//开始
	var dateEnd=$('#datetimepickerStart2').val();//结束
	var billsNoEnd=$('.billsNoEnd').val();
	var billsNoBegin=$('.billsNoBegin').val();
	
	var billsNo= $('.billsNo').val();
	var a=e.target.textContent;
	switch(a){
		case '首单':
			var url='/manager/afterSalesService/serviceHandle/query?billsNoBegin='+billsNoBegin+'&billsNoEnd='+billsNoEnd+'&dateBegin='+dateBegin+'&dateEnd='+dateEnd;
			reUrl(url);
			break;
		case '上一单':
			var url='/manager/afterSalesService/serviceHandle/query?billsNoBegin='+billsNoBegin+'&billsNoEnd='+billsNoEnd+'&dateBegin='+dateBegin+'&dateEnd='+dateEnd+'&billsNo='+billsNo+'&toPage=-1';
			reUrl(url);
			break;
		case '下一单':
			var url='/manager/afterSalesService/serviceHandle/query?billsNoBegin='+billsNoBegin+'&billsNoEnd='+billsNoEnd+'&dateBegin='+dateBegin+'&dateEnd='+dateEnd+'&billsNo='+billsNo+'&toPage=1';
			reUrl(url);
			break;
		case '末单':
			var url='/manager/afterSalesService/serviceHandle/query?billsNoBegin='+billsNoBegin+'&billsNoEnd='+billsNoEnd+'&dateBegin='+dateBegin+'&dateEnd='+dateEnd+'&billsNo='+billsNo+'&toPage=99';
			reUrl(url);
			break;
	}
	
});

//撤销按钮
$(document).on('click','.recallYF',function(){
	var idss=$('#jqGrid_YFtab1').jqGrid('getGridParam','selarrrow');
	var id=[];
	
	for(i=0;idss.length>i;i++){
		var a=$("#jqGrid_YFtab1").jqGrid("getCell",idss[i],'id');
		id.push(a)
	}
	var data=id;
	
	
	 $.request({
		 url:'/manager/afterSalesService/serviceHandle/undo',
		   	dataType:'json',
		   	contentType:'application/json;charset=utf-8',
		   	data:JSON.stringify(data),
		   	type:'POST',
		   	success:function(data){
					
					if(data.result == -999){
		    			$.zxsaas_plus.showalert("错误","撤销失败!")
		    		}
					if(data.result == 1){
						$.zxsaas_plus.showalert("","撤销成功!")
						for(var i=0;i<idss.length;){
							$('#jqGrid_YFtab1').jqGrid('delRowData',idss[i]);
						}
					}
					//(data.result == 1) && ($.zxsaas_plus.showalert("","撤销成功!"))
					
		   	},
		   	error:function(){
		   		$.zxsaas_plus.showalert("","error!")
		   	}
		   	
	   })
});

//转至售后

//保存查询
$(document).on('click','.referSave',function(){
	
	$("#afterSales").data('bootstrapValidator').validate();
	if(!($("#afterSales").data('bootstrapValidator').isValid())){
		refreshValidator("#afterSales");
		return;
	}
	
	var data ="";
	var rows = $('#jqGrid_YFtab1').jqGrid('getDataIDs');
	if(rows==""){
		$.zxsaas_plus.showalert("错误","转至失败!")
	}else{                               
		 data = saveData();
	}
	$.request({
		url:"/manager/afterSalesService/serviceHandle/save",
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		data:JSON.stringify(data),
		type:'POST',
		success:function(data){
			if(data.result == 1){
				$.zxsaas_plus.showalert("","转至成功!")
			}else{
				$.zxsaas_plus.showalert("错误","转至失败!")
			}
		},
  	error:function(){
  		$.zxsaas_plus.showalert("","error!")
  	}
	})	
});

//获取数据
var saveData = function(options){
	var aTable=[];
	var selectCHU=$('.outstorSectionId option:selected').val();
	var selectJING=$('.managerId option:selected').val();
	var selectSHOU=$('.aftersaleSectionId option:selected').val();
	
	var rowIds = $('#jqGrid_YFtab1').jqGrid('getDataIDs');
	var selectX=$('.offerYF option:selected').val();
	for(var i = 0;i< rowIds.length;i++){
		var rows = $('#jqGrid_YFtab1').jqGrid('getRowData',rowIds[i]);
		aTable.push({'storageId':rows.storageNa,'outstorSectionId':selectCHU,'managerId':selectJING,'aftersaleSectionId':selectSHOU,'goodsId':rows.id,'imei':rows.imei,'falutDesc':rows.falutDesc,'looksDesc':rows.looksDesc,'suggestHandleMode':selectX,'remark':rows.remark});
	}
	return aTable;
}

//售后返回     确认返回按钮

$(document).on('click','.saveReturn',function(){
	var data ="";
	var rows = $('#jqGrid_YFtab2').jqGrid('getDataIDs');
	if(rows==""){
		$.zxsaas_plus.showalert("错误","确认失败!")
	}else{
		 data = saveReturn();
		 console.log(JSON.stringify(data))
	}
	$.request({
		url:"/manager/afterSalesService/acceptMachine/accept",
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		data:JSON.stringify(data),
		type:'POST',
	  	success:function(data){
			(data.result == 1) && ($.zxsaas_plus.showalert("","确认成功!"))
	  		if(data.result == -999){
				$.zxsaas_plus.showalert("错误","确认失败!")
			}
	  	},
  	error:function(){
  		$.zxsaas_plus.showalert("","error!")
  	}
	})	
});

var saveReturn = function(){
	var table =[];
	var rowIds = $('#jqGrid_YFtab2').jqGrid('getDataIDs');
    var arr=$.map(rowIds,function(item,index){
    	var dataTemp=$('#jqGrid_YFtab2').getRowData(item);
    	var data={
    			 flowNo:dataTemp.flowNo, 
    			 repairSectionId:dataTemp.repairSectionId, 
    		     giveSectionId:dataTemp.giveSectionId, 
    		     billNo:dataTemp.handleBillsNo, 
    		     goodsId:dataTemp.goodsId, 
    		     newColor:dataTemp.newColor, 
    		     looksDesc:dataTemp.looksDesc, 
    		     oldImei:dataTemp.oldImei, 
    		     oldAuxiliaryImei:dataTemp.oldAuxiliaryImei, 
    		     newImei:dataTemp.newImei, 
    		     newAuxiliaryImei:dataTemp.newAuxiliaryImei, 
    		     falutDesc:dataTemp.falutDesc, 
    		     remark:dataTemp.remark,
    		     storageId:$('.entrepotYF').val()*1
    	}
     return data;
    })
	return arr;
}
Array.prototype.filter_=function(callback){
	var temp=[];
	for(var i=0,len=this.length;i<len;i++){
		callback(this[i],i,this)&&temp.push(this[i])
	}
	return temp;
}

//设置表格
$(document).on("click","#myTab>li>a",function(){
	var t=$(this).attr("href");
	$(t).find("table").setGridWidth($(t).width());
	
});