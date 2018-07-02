var curr_goodsclass_tree_selectId = "";
function wangTree(options){
	
	var defaults = {
	    url:'/manager/Tgoodsclass/findTree2?groupId='+gl_groupId,
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
//				function (event, treeId, treeNode, msg) {
//					controllAdd(treeNode.id);//通过id调用对应方法 重构表格
//				}
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
			quick();
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
	var colName0 =['id','业务流水号','服务名称','生效日期','有无期限','服务期限','预计失效日期','有无次数限制','效期内可服务次数',
	               '已使用次数','失效日期','预设定价','会员价','是否关联串号','手机串号','备注','服务流水号','零售单号','停用',
	               '增值服务ID','停用ID','有无期限ID','服务期限ID','有无次数限制ID'];
	colName[0] = colName0;
	//商品表，可增加
	var colName1 =['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号',
	                '颜色ID','商品类别id','商品品牌id','网络制式id'];
	colName[1] = colName1;
	
	var colName2 =['id','增值服务名称','是否关联串号','预设定价','服务期限','有效次数','备注'];
	colName[2] = colName2;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
							{name:'id',index:'id', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
							{name:'serviceInstanceNo',index:'serviceInstanceNo', width:200,align:'center',sorttype:'string',sortable:false},
							{name:'serviceName',index:'serviceName', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'effectDate',index:'effectDate', width:100,align:'center',sorttype:'string',sortable:false},
							{name:'isDueID',index:'isDueID', width:100,align:'center',sorttype:'string',sortable:false},
							{name:'serviceDueID',index:'serviceDueID', width:120,align:'center',sorttype:'string',sortable:false},
							{name:'invalidDate',index:'invalidDate', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'isTimesLimitID',index:'isTimesLimitID', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'residueTimes',index:'residueTimes', width:180,align:'center',sorttype:'string',sortable:false},
							{name:'usedTimes',index:'usedTimes', width:120,align:'center',sorttype:'string',sortable:false},
							{name:'invalidDate',index:'invalidDate', width:120,align:'center',sorttype:'string',sortable:false},
							{name:'setPrice',index:'setPrice', width:100,align:'center',sorttype:'string',sortable:false},
							{name:'memberPrice',index:'memberPrice', width:100,align:'center',sorttype:'string',sortable:false},
							{name:'ifIm',index:'ifIm', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'imei',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'remark',index:'remark', width:120,align:'center',sorttype:'string',sortable:false},
							{name:'serviceInstanceNo',index:'serviceInstanceNo', width:180,align:'center',sorttype:'string',sortable:false},
							{name:'retailMainId',index:'retailMainId', width:150,align:'center',sorttype:'string',sortable:false},
							{name:'enableFalgID',index:'enableFalgID', width:100,align:'center',sorttype:'string',sortable:false},
							
							{name:'maddServiceId',index:'maddServiceId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
							{name:'enableFalg',index:'enableFalg', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
							{name:'isDue',index:'isDue', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
							{name:'serviceDue',index:'serviceDue', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
							{name:'isTimesLimit',index:'isTimesLimit', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
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
	JqGridColModel[1]=JqGridColModel1;
	
	var JqGridColModel2=[
						{name:'id',index:'id',width:70,align:'center',hidden:true,formatter:fuwuID},
	                   {name:'serviceName',index:'serviceName', width:150,align:'center',sorttype:'string',sortable:false,formatter:fuwuCheck},
	                   {name:'ifIm',index:'ifIm', width:120,align:'center',sorttype:'string',sortable:false},
	                   {name:'setPrice',index:'setPrice', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'serviceDue',index:'serviceDue', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'userNum',index:'userNum', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'remark',index:'remark', width:120,align:'center',sorttype:'string',sortable:false}
						];
	JqGridColModel[2]=JqGridColModel2;
	
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
//	LoadTableUrl: "/manager/addValue/conditionsFind",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_appreciationManage", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_appreciationManage",
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
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							root: "data.addValueVoList",
							repeatitems: false,
							page:"data.page",
							total:"data.pageCount",
							records:"data.totalCount",
							id:"0"
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [5,10, 20, 40],
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
												success(rowid);
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
//						$(options.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
//					     return(true);   
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");
						
                   
					},
					loadComplete:function(data){
						$.request({
					    	url:'/manager/addValue/conditionsFind',
					    	dataType:'json',
					    	contentType:'application/json;charset=utf-8',
					    	success:function(data,rowid){
								var dataList = data.data.addValueVoList;
								
								for(var i = 0,len = dataList.length;i<len;i ++){
									//服务期限 : -1则显示永久有效
									var enableFalg = dataList[i].enableFalg;
									var isDue = dataList[i].isDue;
									var serviceDue = dataList[i].serviceDue;
									var isTimesLimit = dataList[i].isTimesLimit;
									if(enableFalg==1){
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'enableFalgID','启用');
									}
									if(enableFalg==0){
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'enableFalgID','停用');
									}
									if(isDue==1){
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'isDueID','有');
									}
									if(isDue==0){
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'isDueID','无');
									}
									if(serviceDue==-1){
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'serviceDueID','永久有效');
									}else{
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'serviceDueID',serviceDue);
									}
									if(isTimesLimit==-1){
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'isTimesLimitID','不限次数');
									}else{
										$('#jqGrid_appreciationManage').jqGrid('setCell',i+1,'isTimesLimitID',isTimesLimit);
									}
									
								}
					    	},
					    	error:function(){
					    		$.zxsaas_plus.showalert("","error!")
					    	}
					    	
					    })
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		//删除一行
			$(document).on('click', '.glyphicon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					//console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
					if($(options.TableName+' tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
		
		function addAndDelete(cellvalue, options, rowObjec){
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
		//单选按钮
		function radioYF(cellvalue,options,rowObject){
			return '<input type="radio" name="tableRad" />';
		}
}

//新增一行
$(document).on('click', '.glyphicon-plus-sign',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	$(options.TableName).jqGrid('addRowData', rowId+1, {}, 'last' );
});

//服务名称
$(document).on('click','.serverName',function(){
	//wangTree();
	loadmodal({"TableName":"#jqGrid_serverName","pager":"#jqGridPager_serverName",'url':'/manager/addValue/alladdValueService',"choose":false,"TableInfo":"2","height": $(window).height()*0.2});
	$.request({
    	url:'/manager/addValue/alladdValueService',
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	
    	type:'GET',
    	data:{
		page:1,
		pageSize:10
	},
    	success:function(data,rowid){
			var dataList = data.data.servicelist;
			$("#jqGrid_serverName").jqGrid('clearGridData');
			
			for(var i = 0,len = dataList.length;i<len;i ++){
				//服务期限 : -1则显示永久有效
				var serviceDue = dataList[i].serviceDue;
				var userNum = dataList[i].userNum;
				var arr ={
					'id':dataList[i].id,
					'serviceName':dataList[i].serviceName,
					'ifIm':dataList[i].ifIm,
					'setPrice':dataList[i].setPrice,
					'serviceDue':dataList[i].serviceDue,
					'userNum':dataList[i].userNum,
					'remark':dataList[i].remark	
				}
				$("#jqGrid_serverName").jqGrid('addRowData',(i+1),arr,'last');
				if(serviceDue==-1){
					$('#jqGrid_serverName').jqGrid('setCell',i+1,'serviceDue','永久有效');
				}
				if(userNum==-1){
					$('#jqGrid_serverName').jqGrid('setCell',i+1,'userNum','不限次数');
				}
				
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
});
function fuwuCheck(cellvalue, options, rowObject){
	return '<span class="fuwu" data-dismiss="modal">' + cellvalue + '</span>';
};
function fuwuID(cellvalue, options, rowObject){
	return '<span class="fuwuID">' + cellvalue + '</span>';
};
$(document).on('click','.fuwu',function(e){
	var a=$(this).html();
	$('.fuwuName').val(a);
	var b =$(this).parent().prev().text();
	$('.fuwuIDYY').val(b);
	
	var idss=$(this).parents('tr').attr('id');
	var serviceDue=$('#jqGrid_serverName').getCell(idss,'serviceDue');
	var setPrice=$('#jqGrid_serverName').getCell(idss,'setPrice');
	
	$('.serviceDue').val(serviceDue);
	$('.setPrice').val(setPrice);
});

//商品名称
$(document).on('click','.spmcChoose',function(){
	wangTree();
	loadmodal({"TableName":"#jqGrid_tranSpmc","pager":"#gridpager_tran","TableInfo":"1","choose":false,"LoadTableUrl":"/manager/Tgoodsname/page"});
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
//					'goodsColorId':dataList[i].goodsColorId,
//					'networkStandard':dataList[i].networkStandard,
//					'ifManageImei':dataList[i].ifManageImei,
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
function spmcCheck(cellvalue, options, rowObject){
	return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
};
function goodsId(cellvalue, options, rowObject){
	return '<span class="goodsId">' + cellvalue + '</span>';
};
$(document).on('click','.spmcCheck',function(e){
	var a=$(this).html();
	$('.smpcYF').val(a);
	var b=$(this).parent().prev().prev().text();
	$('.goodsIdY').val(b);
	var idss=$(this).parents('tr').attr('id');
	var goodsId=$('#jqGrid_tranSpmc').getCell(idss,'id');
	var goodsCategoryName=$('#jqGrid_tranSpmc').getCell(idss,'goodsCategoryName');
	var model=$('#jqGrid_tranSpmc').getCell(idss,'goodsModel');
	var color=$('#jqGrid_tranSpmc').getCell(idss,'goodsColorName');
	
	$('.goodsId').val(goodsId);
	$('.goodsCategoryName').val(goodsCategoryName);
	$('.model').val(model);
	$('.color').val(color);
});

//回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
	    quick();
	}
});
function quick(){
	var fasttips = $('.fasttips').val();
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
//				var arr ={
//					'id':dataList[i].id,
//					'code':dataList[i].code,
//					'name':dataList[i].name,
//					'goodsCategoryId':dataList[i].goodsCategoryId,
//					'goodsBrandId':dataList[i].goodsBrandId,
//					'goodsModel':dataList[i].goodsModel,
//					'goodsColorId':dataList[i].goodsColorId,
//					'networkStandard':dataList[i].networkStandard,
//					'ifManageImei':dataList[i].ifManageImei
//				}
				$("#jqGrid_tranSpmc").jqGrid('addRowData',i,dataList[i],'last');
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
}

//押金预收款
$(document).ready(function(){
	sectionYF();//部门
	var ad=$(document.body).width();
	$('.widthYF2').attr("width",ad);
	
	appreciationVer('#appreciationVer');
	appreciationVer2('#appreciationVer2');
	
});
$(document).on('change','.section',function(){
	accountYF();
})
$(document).on('click','.moneyCHU',function(){
	if($('.section').val()!=''&& $('.section').val()!=null){
		$('#moneyChoose').modal('show');
		accountYF();
	}else{
		$.zxsaas_plus.showalert("错误","没有选择部门无法显示账户!")
	}
	
})
var accountYF = function(){
	var sectionId=$('.section').val();
	$.request({
        type: 'Get',
        url: '/manager/addValue/usableCapitalAccount',
        dataType: "json",
        success: function (data) {
			var moneyList = data.data.avptvList;
			var str1 = '<tr><th>付款类别</th><th>账户名称</th><th>付款金额</th></tr>';
	 		var str2 = '';
	 		var str3 = '<tr><td>合计</td><td colspan="2" style="text-align: right;" class="totalMoney"></td></tr>';
	 		for(var i = 0,len = moneyList.length; i < len;i ++){
	 			str2 += '<tr><td>'+moneyList[i].payTypeName+'</td><td>'+moneyList[i].accountName+'</td><td><input type="text" class="money mon'+i+'" data-accId='+moneyList[i].id+' value="" onkeyup="this.value=this.value.replace(/[^\\d\\.]$/g,\'\') " onafterpaste="this.value=this.value.replace(/[^\\d\\.]$/g,\'\') "></td></tr>';
	 		}
	 		var tab = str1 + str2 + str3;
	 		$('.moneyTab').html('');
	 		$('.moneyTab').append(tab);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

$(document).on('blur','.money',function(e){
	var total = 0;
	$('.money').each(function(){
		total += ((($(arguments[1]).val() * 1).toFixed(2)) * 1);
	});
	$('.totalMoney').html(total);
});


$(document).on('click','.saveMoney',function(e){
	var total = $('.totalMoney').html();
	$('.moneyCh').val(total);
	//$.zxsaas_plus.showalert("","保存成功!");
});

//查询按钮
$(document).on('click','.kuaiButton',function(){
	$.request({
    	url:'/manager/addValue/conditionsFind',
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	type:'GET',
    	data:{
			imei:$('#imei').val(),
			cardNo:$('#cardNo').val(),
			memberName:$('#memberName').val(),
			telephone:$('#telephone').val()
			},
    	success:function(data){
			var dataList = data.data.addValueVoList;
			$("#jqGrid_appreciationManage").jqGrid('clearGridData');
			for(var i = 0,len = dataList.length;i<len;i ++){
				$("#jqGrid_appreciationManage").jqGrid('addRowData',i,dataList[i],'last');
				
				//服务期限 : -1则显示永久有效
				var enableFalg = dataList[i].enableFalg;
				var isDue = dataList[i].isDue;
				var serviceDue = dataList[i].serviceDue;
				var isTimesLimit =dataList[i].isTimesLimit;
				if(enableFalg==1){
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'enableFalgID','启用');
				}
				if(enableFalg==0){
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'enableFalgID','停用');
				}
				if(isDue==1){
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'isDueID','有');
				}
				if(isDue==0){
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'isDueID','无');
				}
				if(serviceDue==-1){
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'serviceDueID','永久有效');
				}else{
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'serviceDueID',serviceDue);
				}
				if(isTimesLimit==-1){
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'isTimesLimitID','不限次数');
				}else{
					$('#jqGrid_appreciationManage').jqGrid('setCell',i,'isTimesLimitID',isTimesLimit);
				}
			}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
});

var valList=function(){
	var arr2=[];
	var rowIds =$('#jqGrid_appreciationManage').jqGrid('getGridParam','selarrrow');
 	for(var i = 0 ;i < rowIds.length;i++){
 		var rows= $("#jqGrid_appreciationManage").jqGrid("getRowData", rowIds[i]);
 		console.log(JSON.stringify(rows)+'==========')
 	   arr2.push(rows);
 	}
 	return JSON.stringify(arr2);
};

//停用启用
$(document).on('click','.blockUp',function(){
	var val = valList();
	$.request({
    	url:'/manager/addValue/beginOrStop',
    	dataType:'json',
    	//contentType:'application/json;charset=utf-8',
//    	data:JSON.stringify(data),
    	data:{
			imei:$('#imei').val(),
			cardNo:$('#cardNo').val(),
			memberName:$('#memberName').val(),
			telephone:$('#telephone').val(),
			valList:val
		},
    	type:'POST',
    	success:function(data){
			$("#jqGrid_appreciationManage").trigger("reloadGrid");  
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
});


//保存新购服务
$(document).on('click','.newFuwu',function(){
	$("#jqGrid_appreciationManage").jqGrid('clearGridData');
	var data = xingSave();
	$("#appreciationVer2").data('bootstrapValidator').validate();
	if(!($("#appreciationVer2").data('bootstrapValidator').isValid())){
		refreshValidator("#appreciationVer2");
		$.zxsaas_plus.showalert("","保存失败!")
		return;
	}
	
	$.request({
    	url:'/manager/addValue/buyService',
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'GET',
    	success:function(data){
			$('.imei,.smpcYF,.serviceInstanceNo,.buyDate,.model,.color,.cardNo,.memberName,.goodsCategoryName,.fuwuName,.XGtelephone,.setPrice,.serviceDue,.effectDate,.moneyCh').val('');
			(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
});

var xingSave = function(){
	var addValueVo ={
			 'serviceInstanceNo':$('.serviceInstanceNo').val(),
			 'buyDate':$('.buyDate').val(),
			 'imei':$('.imei').val(),
			 'goodsName':$('.smpcYF').val(),
			 'model':$('.model').val(),
			 'color':$('.color').val(),
			 'cardNo':$('.cardNo').val(),
			 'memberName':$('.memberName').val(),
			 'goodsCategoryName':$('.goodsCategoryName').val(),
			 'serviceName':$('.fuwuName').val(),
			 'telephone':$('.XGtelephone').val(),
			 'setPrice':$('.setPrice').val(),
			 'serviceDue':$('.serviceDue').val(),
			 'effectDate':$('.effectDate').val(),
			 'actualAmount':$('.moneyCh').val(),
			 
			 'goodsId':$('.goodsIdY').val(),
			 'maddServiceId':$('.fuwuIDYY').val()
	   }
	
	var getSave ={
		'parameter':addValueVo
	}
	return getSave;
}


//部门下拉
function sectionYF(){
	//var countries = {};
	$.request({  
	 	url: '/manager/addValue/usableSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			countries = data.data.sectionList[i];
	 			$('.section').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};



